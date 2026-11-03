import { db, auth } from "./firebase.js";
import {
  collection, doc, getDoc, getDocs, getDocsFromServer, query, orderBy, limit,
  runTransaction, serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { adjustedStock, planProduction } from "./inventory-model.mjs";
import { fallbackProducts } from "./products.js";
import { selectedKpopVariants } from "./kpop-import.mjs";
import { productShop } from "./catalog-model.mjs";

export async function isAdmin(user) {
  return !!user && (await getDoc(doc(db, "admins", user.uid))).exists();
}

const rows = snapshot => snapshot.docs.map(item => ({ ...item.data(), id: item.id }));
export async function loadDashboard() {
  const [products, inventory, supplies, requests, movements, groups, categories] = await Promise.all([
    getDocs(collection(db, "products")), getDocs(collection(db, "productInventory")),
    getDocs(collection(db, "supplies")),
    getDocs(query(collection(db, "saleRequests"), orderBy("createdAt", "desc"), limit(100))),
    getDocs(query(collection(db, "inventoryMovements"), orderBy("createdAt", "desc"), limit(30))),
    getDocs(collection(db, "stockCollections")), getDocs(collection(db, "shopCategories"))
  ]);
  return { products: rows(products), inventory: rows(inventory), supplies: rows(supplies), requests: rows(requests), movements: rows(movements), collections: rows(groups), categories: rows(categories) };
}

export async function saveShopCategory(id, name, shop, parentId = "") {
  name = name.trim();
  if (!name || name.length > 100 || !["sunnie-jae", "studio-ken"].includes(shop)) throw new Error("Choose a shop and enter a category name of 1 to 100 characters.");
  const ref = id ? doc(db, "shopCategories", id) : doc(collection(db, "shopCategories"));
  return runTransaction(db, async transaction => {
    const existing = await transaction.get(ref);
    if (id && !existing.exists()) throw new Error("This category no longer exists.");
    if (existing.exists()) { shop = existing.data().shop; parentId = existing.data().parentId; }
    if (parentId) {
      const parent = await transaction.get(doc(db, "shopCategories", parentId));
      if (!parent.exists() || parent.data().shop !== shop) throw new Error("The parent category must belong to the same shop.");
    }
    transaction.set(ref, { name, shop, parentId, updatedAt: serverTimestamp() });
    return ref.id;
  });
}

async function checkCollection(transaction, id) {
  if (id && !(await transaction.get(doc(db, "stockCollections", id))).exists()) throw new Error("The selected collection no longer exists.");
}

// Parent links are immutable: collections cannot form cycles or orphan their children.
export async function saveCollection(id, name, parentId = "") {
  name = name.trim();
  if (!name || name.length > 100) throw new Error("Enter a collection name of 1 to 100 characters.");
  const ref = id ? doc(db, "stockCollections", id) : doc(collection(db, "stockCollections"));
  await runTransaction(db, async transaction => {
    const existing = await transaction.get(ref);
    if (id && !existing.exists()) throw new Error("This collection no longer exists.");
    const parent = existing.exists() ? existing.data().parentId : parentId;
    await checkCollection(transaction, parent);
    transaction.set(ref, { name, parentId: parent, updatedAt: serverTimestamp() });
  });
  return ref.id;
}

function movement(transaction, kind, itemId, delta, reason) {
  transaction.set(doc(collection(db, "inventoryMovements")), {
    kind, itemId, delta, reason, createdBy: auth.currentUser.uid, createdAt: serverTimestamp()
  });
}

export async function saveProduct(id, product, settings) {
  const ref = id ? doc(db, "products", id) : doc(collection(db, "products"));
  const inventoryRef = doc(db, "productInventory", ref.id);
  await runTransaction(db, async transaction => {
    const inventory = await transaction.get(inventoryRef);
    if (id && !(await transaction.get(ref)).exists()) throw new Error("This product was deleted. Refresh before editing.");
    await checkCollection(transaction, settings.collectionId);
    if (product.categoryId) {
      const category = await transaction.get(doc(db, "shopCategories", product.categoryId));
      if (!category.exists() || category.data().shop !== productShop(product)) throw new Error("Choose a category belonging to this product’s shop.");
    }
    const supplySnapshots = await Promise.all(Object.keys(settings.recipe).map(supplyId => transaction.get(doc(db, "supplies", supplyId))));
    if (supplySnapshots.some(item => !item.exists() || item.data().active === false)) throw new Error("Every recipe supply must exist and be active.");
    // Coordinate recipe creation with supply deletion through the supply document.
    for (const supply of supplySnapshots) transaction.update(supply.ref, { updatedAt: serverTimestamp() });
    transaction.set(ref, product);
    transaction.set(inventoryRef, {
      ...settings, stock: inventory.exists() ? inventory.data().stock : 0, updatedAt: serverTimestamp()
    });
  });
  return ref.id;
}

export async function saveSupply(id, values) {
  const ref = id ? doc(db, "supplies", id) : doc(collection(db, "supplies"));
  await runTransaction(db, async transaction => {
    const existing = await transaction.get(ref);
    if (id && !existing.exists()) throw new Error("This supply was deleted. Refresh before editing.");
    await checkCollection(transaction, values.collectionId);
    transaction.set(ref, { ...values, quantity: existing.exists() ? existing.data().quantity : 0, updatedAt: serverTimestamp() });
  });
  return ref.id;
}

export async function deleteProduct(id) {
  await runTransaction(db, async transaction => {
    const productRef = doc(db, "products", id);
    const inventoryRef = doc(db, "productInventory", id);
    const product = await transaction.get(productRef);
    await transaction.get(inventoryRef);
    if (!product.exists()) throw new Error("This product was already deleted. Refresh the inventory.");
    transaction.delete(productRef);
    transaction.delete(inventoryRef);
  });
}

export async function deleteSupply(id) {
  await runTransaction(db, async transaction => {
    const ref = doc(db, "supplies", id);
    const supply = await transaction.get(ref);
    if (!supply.exists()) throw new Error("This supply was already deleted. Refresh the inventory.");
    // Query again on every retry. Recipe saves touch the supply so a concurrent
    // addition forces this transaction to retry and inspect the new reference.
    const inventory = await getDocsFromServer(collection(db, "productInventory"));
    const current = await Promise.all(inventory.docs.map(item => transaction.get(item.ref)));
    if (current.some(item => item.exists() && Object.hasOwn(item.data().recipe || {}, id))) {
      throw new Error("This supply is used in a product recipe. Remove it from every recipe before deleting it.");
    }
    transaction.delete(ref);
  });
}

export async function adjustInventory(kind, id, delta, reason) {
  const isProduct = kind === "product";
  const ref = doc(db, isProduct ? "productInventory" : "supplies", id);
  await runTransaction(db, async transaction => {
    const snapshot = await transaction.get(ref);
    if (!snapshot.exists()) throw new Error("Save this item before adjusting its stock.");
    const data = snapshot.data();
    const field = isProduct ? "stock" : "quantity";
    const next = adjustedStock(data[field], delta, isProduct);
    transaction.update(ref, { [field]: next, updatedAt: serverTimestamp() });
    movement(transaction, `${kind}-adjustment`, id, next - data[field], reason);
  });
}

export async function makeProducts(id, count, reason) {
  const ref = doc(db, "productInventory", id);
  await runTransaction(db, async transaction => {
    const inventory = await transaction.get(ref);
    if (!inventory.exists()) throw new Error("Save the product inventory first.");
    const data = inventory.data();
    const refs = Object.keys(data.recipe || {}).map(supplyId => doc(db, "supplies", supplyId));
    const snapshots = await Promise.all(refs.map(supply => transaction.get(supply)));
    const supplies = Object.fromEntries(snapshots.filter(supply => supply.exists()).map(supply => [supply.id, supply.data()]));
    const plan = planProduction(data, supplies, count);
    transaction.update(ref, { stock: plan.stock, updatedAt: serverTimestamp() });
    for (const supply of snapshots) {
      transaction.update(supply.ref, { quantity: plan.remaining[supply.id], updatedAt: serverTimestamp() });
      movement(transaction, "supply-adjustment", supply.id, plan.remaining[supply.id] - supply.data().quantity, `Production ${id}: ${reason}`);
    }
    movement(transaction, "production", id, Number(count), reason);
  });
}

export async function setRequestStatus(id, status) {
  await runTransaction(db, async transaction => {
    const ref = doc(db, "saleRequests", id);
    const request = await transaction.get(ref);
    if (!request.exists()) throw new Error("This request no longer exists.");
    transaction.update(ref, { status });
  });
}

export async function saveRequestReply(id, message) {
  const shopMessage = message.trim();
  if (shopMessage.length > 2000) throw new Error("Shop messages can contain at most 2,000 characters.");
  await runTransaction(db, async transaction => {
    const ref = doc(db, "saleRequests", id);
    const request = await transaction.get(ref);
    if (!request.exists()) throw new Error("This request no longer exists.");
    transaction.update(ref, { shopMessage });
  });
}

// Explicit import creates missing records only; it never replaces saved products.
export async function importCatalog() {
  const products = [...fallbackProducts.exclusive, ...fallbackProducts.direct];
  await runTransaction(db, async transaction => {
    const refs = products.map(product => doc(db, "products", String(product.id)));
    const inventoryRefs = products.map(product => doc(db, "productInventory", String(product.id)));
    const existing = await Promise.all([...refs, ...inventoryRefs].map(ref => transaction.get(ref)));
    products.forEach((product, index) => {
      if (!existing[index].exists()) {
        const { id, ...values } = product;
        transaction.set(refs[index], { description: "", link: "", ...values, available: true });
      }
      if (!existing[products.length + index].exists()) {
        transaction.set(inventoryRefs[index], { sku: "", stock: 0, reorderLevel: 0, recipe: {}, updatedAt: serverTimestamp() });
      }
    });
  });
}

export async function importKpopProducts(ids, { collectionId = "", available = false } = {}) {
  const variants = selectedKpopVariants(ids);
  if (available && variants.some(item => !item.canPublish)) throw new Error("Some designs need a real retailer link. Transfer them as drafts, then add the link before publishing.");
  return runTransaction(db, async transaction => {
    await checkCollection(transaction, collectionId);
    const refs = variants.map(item => doc(db, "products", item.id));
    const inventoryRefs = variants.map(item => doc(db, "productInventory", item.id));
    const snapshots = await Promise.all([...refs, ...inventoryRefs].map(ref => transaction.get(ref)));
    let imported = 0;
    variants.forEach((item, index) => {
      if (!snapshots[index].exists()) {
        transaction.set(refs[index], { ...item.product, available });
        imported++;
      }
      if (!snapshots[variants.length + index].exists()) transaction.set(inventoryRefs[index], {
        sku: item.sku, stock: 0, reorderLevel: 0, recipe: {}, collectionId, updatedAt: serverTimestamp()
      });
    });
    return imported;
  });
}
