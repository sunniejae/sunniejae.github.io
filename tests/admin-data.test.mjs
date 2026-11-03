// An in-memory transactional adapter verifies client write orchestration.
// Real Firestore permissions and retry behavior belong to rules.test.mjs.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";

async function setup() {
  const records = new Map([
    ["products/p", { title: "Planner", price: "$25", type: "exclusive" }],
    ["productInventory/p", { stock: 4, sku: "P", reorderLevel: 1, recipe: { paper: 2 } }],
    ["supplies/paper", { name: "Paper", quantity: 3, unit: "sheets", active: true }]
  ]);
  let nextId = 0;
  const db = {};
  const reference = path => ({ path, id: path.split("/").at(-1) });
  const snapshot = ref => ({ ...ref, ref, exists: () => records.has(ref.path), data: () => structuredClone(records.get(ref.path)) });
  const sdk = {
    doc: (parent, name, id) => name ? reference(`${name}/${id}`) : reference(`${parent.path}/auto-${++nextId}`),
    collection: (db, name) => reference(name),
    serverTimestamp: () => "server-time",
    getDoc: async ref => snapshot(ref),
    getDocs: async ref => ({ docs: [...records.keys()].filter(path => path.startsWith(ref.path + "/")).map(path => snapshot(reference(path))) }),
    getDocsFromServer: async ref => ({ docs: [...records.keys()].filter(path => path.startsWith(ref.path + "/")).map(path => snapshot(reference(path))) }),
    query: ref => ref, orderBy: () => {}, limit: () => {},
    runTransaction: async (db, callback) => {
      const writes = [];
      const transaction = {
        get: async ref => { assert.equal(writes.length, 0, "Transactions must finish reading before writing"); return snapshot(ref); },
        set: (ref, values) => writes.push([ref, values, false]),
        update: (ref, values) => writes.push([ref, values, true]),
        delete: ref => writes.push([ref, null, false])
      };
      const result = await callback(transaction);
      for (const [ref, values, merge] of writes) {
        if (values === null) records.delete(ref.path);
        else records.set(ref.path, { ...(merge ? records.get(ref.path) : {}), ...structuredClone(values) });
      }
      return result;
    }
  };
  const key = `inventoryTest${Math.random().toString().slice(2)}`;
  globalThis[key] = { sdk, db, auth: { currentUser: { uid: "staff" } } };
  const source = (await fs.readFile(new URL("../shop/admin-data.js", import.meta.url), "utf8"))
    .replace('import { db, auth } from "./firebase.js";', `const { db, auth } = globalThis.${key};`)
    .replace(/import \{([\s\S]*?)\} from "https:\/\/www.gstatic.com\/firebasejs\/12.0.0\/firebase-firestore.js";/,
      (_, names) => `const {${names}} = globalThis.${key}.sdk;`)
    .replace('"./inventory-model.mjs"', JSON.stringify(new URL("../shop/inventory-model.mjs", import.meta.url).href))
    .replace('"./products.js"', JSON.stringify(new URL("../shop/products.js", import.meta.url).href))
    .replace('"./kpop-import.mjs"', JSON.stringify(new URL("../shop/kpop-import.mjs", import.meta.url).href))
    .replace('"./catalog-model.mjs"', JSON.stringify(new URL("../shop/catalog-model.mjs", import.meta.url).href));
  const api = await import(`data:text/javascript;base64,${Buffer.from(source).toString("base64")}`);
  delete globalThis[key];
  return { records, api };
}

test("metadata edits and catalog imports preserve existing quantities and products", async () => {
  const { records, api } = await setup();
  await api.saveSupply("paper", { name: "New paper", unit: "sheets", active: true });
  assert.equal(records.get("supplies/paper").quantity, 3);
  await api.saveProduct("p", { title: "Updated planner", price: "$30" }, { sku: "NEW", reorderLevel: 2, recipe: { paper: 1 } });
  assert.equal(records.get("productInventory/p").stock, 4);
  await api.importCatalog();
  records.get("products/1").title = "Customized original";
  records.get("productInventory/1").stock = 9;
  await api.importCatalog();
  assert.equal(records.get("products/1").title, "Customized original");
  assert.equal(records.get("productInventory/1").stock, 9);
});

test("stock receipts record staff history and rejected removals leave no writes", async () => {
  const { records, api } = await setup();
  await api.adjustInventory("supply", "paper", 5, "Receipt");
  assert.equal(records.get("supplies/paper").quantity, 8);
  const movement = [...records.entries()].find(([key]) => key.startsWith("inventoryMovements/"))[1];
  assert.equal(movement.delta, 5); assert.equal(movement.createdBy, "staff");
  const before = structuredClone(records);
  await assert.rejects(api.adjustInventory("supply", "paper", -9, "Too much"));
  assert.deepEqual(records, before);
});

test("production deducts supplies and adds stock together; shortages preserve all records", async () => {
  const { records, api } = await setup();
  await api.makeProducts("p", 1, "First batch");
  assert.equal(records.get("productInventory/p").stock, 5);
  assert.equal(records.get("supplies/paper").quantity, 1);
  assert.equal([...records.keys()].filter(key => key.startsWith("inventoryMovements/")).length, 2);
  const before = structuredClone(records);
  await assert.rejects(api.makeProducts("p", 1, "Not enough supplies"));
  assert.deepEqual(records, before);
});

test("invalid recipe references cannot partially create a product", async () => {
  const { records, api } = await setup(); const before = structuredClone(records);
  await assert.rejects(api.saveProduct("new", { title: "New item" }, { sku: "", reorderLevel: 0, recipe: { missing: 1 } }));
  assert.deepEqual(records, before);
});

test("copies create separate product and supply records with zero stock", async () => {
  const { records, api } = await setup();
  const originalInventory = structuredClone(records.get("productInventory/p"));
  const originalSupply = structuredClone(records.get("supplies/paper"));
  const productId = await api.saveProduct("", { title: "Planner variation", price: "$25", type: "exclusive" }, { sku: "", reorderLevel: 1, recipe: { paper: 2 } });
  assert.notEqual(productId, "p");
  assert.equal(records.get(`productInventory/${productId}`).stock, 0);
  assert.deepEqual(records.get(`productInventory/${productId}`).recipe, { paper: 2 });
  const supplyId = await api.saveSupply("", { name: "Blue paper", unit: "sheets", active: true });
  assert.notEqual(supplyId, "paper"); assert.equal(records.get(`supplies/${supplyId}`).quantity, 0);
  assert.deepEqual(records.get("productInventory/p"), originalInventory);
  assert.deepEqual(records.get("supplies/paper"), { ...originalSupply, updatedAt: "server-time" });
});

test("collections can nest and rename; assignment preserves quantities and rejects missing destinations", async () => {
  const { records, api } = await setup();
  const parent = await api.saveCollection("", "Materials");
  const child = await api.saveCollection("", "Paper", parent);
  await api.saveCollection(child, "Colored paper");
  assert.equal(records.get(`stockCollections/${child}`).parentId, parent);
  await api.saveSupply("paper", { name: "Paper", unit: "sheets", active: true, collectionId: child });
  assert.equal(records.get("supplies/paper").quantity, 3);
  assert.equal(records.get("supplies/paper").collectionId, child);
  const before = structuredClone(records);
  await assert.rejects(api.saveSupply("paper", { name: "Paper", collectionId: "missing" }));
  await assert.rejects(api.saveCollection("", "Orphan", "missing"));
  assert.deepEqual(records, before);
});

test("staff replies change only the shop message and preserve the original request", async () => {
  const { records, api } = await setup();
  records.set("saleRequests/r", { name: "Guest", customerId: "guest", status: "accepted", message: "Blue please" });
  await api.saveRequestReply("r", "  Your colors are available.  ");
  assert.deepEqual(records.get("saleRequests/r"), { name: "Guest", customerId: "guest", status: "accepted", message: "Blue please", shopMessage: "Your colors are available." });
  await assert.rejects(api.saveRequestReply("r", "x".repeat(2001)));
});

test("K-pop transfers create drafts with separate stable IDs and preserve edits and stock on repeat", async () => {
  const { records, api } = await setup();
  const id = "kpop-oneus-1-v1";
  assert.equal(await api.importKpopProducts([id, id]), 1);
  assert.equal(records.get(`products/${id}`).available, false);
  assert.equal(records.get(`productInventory/${id}`).stock, 0);
  assert.equal(records.get("products/p").title, "Planner");
  records.get(`products/${id}`).title = "Edited name";
  records.get(`productInventory/${id}`).stock = 5;
  assert.equal(await api.importKpopProducts([id], { available: true }), 0);
  assert.equal(records.get(`products/${id}`).title, "Edited name");
  assert.equal(records.get(`products/${id}`).available, false);
  assert.equal(records.get(`productInventory/${id}`).stock, 5);
});

test("live K-pop transfers publish valid selections and reject placeholder retailer links atomically", async () => {
  const { records, api } = await setup();
  records.set("stockCollections/kpop", { name: "K-pop", parentId: "" });
  await api.importKpopProducts(["kpop-oneus-1-v1", "kpop-oneus-6-v1"], { available: true, collectionId: "kpop" });
  assert.equal(records.get("products/kpop-oneus-1-v1").available, true);
  assert.equal(records.get("productInventory/kpop-oneus-6-v1").collectionId, "kpop");
  const before = structuredClone(records);
  await assert.rejects(api.importKpopProducts(["kpop-oneus-2-v1", "kpop-oneus-5-v1"], { available: true }), /real retailer link/);
  assert.deepEqual(records, before);
  await api.importKpopProducts(["kpop-oneus-5-v1"]);
  assert.equal(records.get("products/kpop-oneus-5-v1").link, "");
  assert.equal(records.get("products/kpop-oneus-5-v1").available, false);
});

test("product deletion removes both records, keeps history, and cannot be undone by stale edits", async () => {
  const { records, api } = await setup();
  records.set("saleRequests/r", { items: [{ productId: "p", title: "Planner" }] });
  records.set("inventoryMovements/m", { itemId: "p", delta: 1 });
  await api.deleteProduct("p");
  assert.equal(records.has("products/p"), false);
  assert.equal(records.has("productInventory/p"), false);
  assert.equal(records.has("saleRequests/r"), true);
  assert.equal(records.has("inventoryMovements/m"), true);
  await assert.rejects(api.saveProduct("p", { title: "Old edit" }, { recipe: {}, sku: "", reorderLevel: 0 }), /deleted/);
  assert.equal(records.has("products/p"), false);
});

test("supplies used in recipes cannot be deleted, but unreferenced supplies can", async () => {
  const { records, api } = await setup();
  await assert.rejects(api.deleteSupply("paper"), /used in a product recipe/);
  assert.equal(records.has("supplies/paper"), true);
  records.get("productInventory/p").recipe = {};
  records.set("inventoryMovements/m", { itemId: "paper", delta: 3 });
  await api.deleteSupply("paper");
  assert.equal(records.has("supplies/paper"), false);
  assert.equal(records.has("inventoryMovements/m"), true);
  await assert.rejects(api.saveSupply("paper", { name: "Old edit" }), /deleted/);
});

test("public categories are shop-scoped and product assignment cannot cross brands", async () => {
  const { records, api } = await setup();
  const art = await api.saveShopCategory("", "Art", "studio-ken");
  const prints = await api.saveShopCategory("", "Prints", "studio-ken", art);
  await assert.rejects(api.saveShopCategory("", "Wrong shop", "sunnie-jae", art));
  const before = structuredClone(records);
  await assert.rejects(api.saveProduct("p", { title: "Wrong brand", shop: "sunnie-jae", categoryId: prints }, { sku: "", recipe: {}, reorderLevel: 0 }));
  assert.deepEqual(records, before);
  await api.saveProduct("p", { title: "Ken art", shop: "studio-ken", categoryId: prints }, { sku: "", recipe: {}, reorderLevel: 0 });
  assert.equal(records.get("products/p").shop, "studio-ken");
  assert.equal(records.get("productInventory/p").stock, 4);
  assert.equal(Object.hasOwn(records.get("supplies/paper"), "shop"), false);
});
