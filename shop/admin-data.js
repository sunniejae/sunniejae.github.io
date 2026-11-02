import { db, auth } from "./firebase.js";
import {
  collection, doc, getDoc, getDocs, query, orderBy, limit,
  runTransaction, serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { adjustedStock, planProduction } from "./inventory-model.mjs";
import { fallbackProducts } from "./products.js";

export async function isAdmin(user) {
  return !!user && (await getDoc(doc(db, "admins", user.uid))).exists();
}

const rows = snapshot => snapshot.docs.map(item => ({ ...item.data(), id: item.id }));
export async function loadDashboard() {
  const [products, inventory, supplies, requests, movements, groups] = await Promise.all([
    getDocs(collection(db, "products")), getDocs(collection(db, "productInventory")),
    getDocs(collection(db, "supplies")),
    getDocs(query(collection(db, "saleRequests"), orderBy("createdAt", "desc"), limit(100))),
    getDocs(query(collection(db, "inventoryMovements"), orderBy("createdAt", "desc"), limit(30))),
    getDocs(collection(db, "stockCollections"))
  ]);
  return { products: rows(products), inventory: rows(inventory), supplies: rows(supplies), requests: rows(requests), movements: rows(movements), collections: rows(groups) };
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
    await checkCollection(transaction, settings.collectionId);
    const supplySnapshots = await Promise.all(Object.keys(settings.recipe).map(supplyId => transaction.get(doc(db, "supplies", supplyId))));
    if (supplySnapshots.some(item => !item.exists() || item.data().active === false)) throw new Error("Every recipe supply must exist and be active.");
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
    await checkCollection(transaction, values.collectionId);
    transaction.set(ref, { ...values, quantity: existing.exists() ? existing.data().quantity : 0, updatedAt: serverTimestamp() });
  });
  return ref.id;
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
