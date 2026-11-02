import { test, before, beforeEach, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { initializeTestEnvironment, assertSucceeds, assertFails } from "@firebase/rules-unit-testing";
import { doc, getDoc, getDocs, collection, setDoc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";

let environment;
const product = { title: "Planner", price: "$25", image: "", description: "", link: "", type: "exclusive", available: true };
const supply = { name: "Paper", unit: "sheets", quantity: 3, unitCost: 1, supplier: "", notes: "", reorderLevel: 1, active: true, updatedAt: serverTimestamp() };
const inventory = { sku: "P1", stock: 0, reorderLevel: 1, recipe: { paper: 2 }, updatedAt: serverTimestamp() };
function request(uid = "customer") {
  return { name: "Customer", email: "customer@example.com", message: "Blue please", items: [{ productId: "p", title: "Planner", quantity: 1 }], customerId: uid, status: "new", createdAt: serverTimestamp() };
}
const staffDB = () => environment.authenticatedContext("staff").firestore();

before(async () => {
  if (!process.env.FIRESTORE_EMULATOR_HOST) throw new Error("Run this suite with the Firebase Firestore emulator; see tests/README.md.");
  environment = await initializeTestEnvironment({
    projectId: "demo-sunniejae-inventory",
    firestore: { rules: await fs.readFile(new URL("../firestore.rules", import.meta.url), "utf8") }
  });
});
beforeEach(async () => {
  await environment.clearFirestore();
  await environment.withSecurityRulesDisabled(async context => {
    const db = context.firestore();
    await Promise.all([
      setDoc(doc(db, "admins", "staff"), { role: "owner" }),
      setDoc(doc(db, "products", "p"), product),
      setDoc(doc(db, "supplies", "paper"), supply),
      setDoc(doc(db, "productInventory", "p"), inventory),
      setDoc(doc(db, "saleRequests", "request"), request())
    ]);
  });
});
after(async () => environment?.cleanup());

test("public catalog is readable; private records and customer requests are not", async () => {
  for (const context of [environment.unauthenticatedContext(), environment.authenticatedContext("customer")]) {
    const db = context.firestore();
    await assertSucceeds(getDoc(doc(db, "products", "p")));
    for (const name of ["supplies", "productInventory", "saleRequests", "inventoryMovements", "admins", "stockCollections"]) {
      await assertFails(getDocs(collection(db, name)));
    }
    await assertFails(setDoc(doc(db, "products", "bad"), product));
    await assertFails(setDoc(doc(db, "admins", "customer"), { role: "owner" }));
  }
});

test("collections stay private and reject missing parents, reparenting, deletion, and invalid assignments", async () => {
  const db = staffDB();
  const group = (name, parentId = "") => ({ name, parentId, updatedAt: serverTimestamp() });
  await assertSucceeds(setDoc(doc(db, "stockCollections", "root"), group("Materials")));
  await assertSucceeds(setDoc(doc(db, "stockCollections", "child"), group("Paper", "root")));
  await assertSucceeds(setDoc(doc(db, "stockCollections", "deep"), group("Blue", "child")));
  await assertFails(setDoc(doc(db, "stockCollections", "bad"), group("Orphan", "missing")));
  await assertFails(setDoc(doc(db, "stockCollections", "self"), group("Self", "self")));
  await assertFails(updateDoc(doc(db, "stockCollections", "root"), { parentId: "deep", updatedAt: serverTimestamp() }));
  await assertSucceeds(updateDoc(doc(db, "stockCollections", "child"), { name: "Cardstock", updatedAt: serverTimestamp() }));
  await assertFails(deleteDoc(doc(db, "stockCollections", "child")));
  await assertSucceeds(updateDoc(doc(db, "supplies", "paper"), { collectionId: "deep", updatedAt: serverTimestamp() }));
  await assertFails(updateDoc(doc(db, "supplies", "paper"), { collectionId: "missing", updatedAt: serverTimestamp() }));
  await assertSucceeds(updateDoc(doc(db, "productInventory", "p"), { collectionId: "deep", updatedAt: serverTimestamp() }));
});

test("requests require authentication, owner identity, valid items, and a server timestamp", async () => {
  const guest = environment.unauthenticatedContext().firestore();
  const customer = environment.authenticatedContext("customer").firestore();
  await assertFails(setDoc(doc(guest, "saleRequests", "guest"), request()));
  await assertSucceeds(setDoc(doc(customer, "saleRequests", "valid"), request()));
  for (const [name, values] of Object.entries({
    wrongOwner: { customerId: "staff" }, wrongStatus: { status: "fulfilled" },
    invalidItems: { items: [{ productId: "p", title: "Planner", quantity: -1 }] },
    emptyItems: { items: [] }, noEmail: { email: "bad" },
    extraField: { privateNote: "unexpected" }, fakeTime: { createdAt: new Date(0) }
  })) await assertFails(setDoc(doc(customer, "saleRequests", name), { ...request(), ...values }));
});

test("staff can edit inventory and request status but cannot grant access or alter customers", async () => {
  const db = staffDB();
  for (const name of ["supplies", "productInventory", "saleRequests"]) await assertSucceeds(getDocs(collection(db, name)));
  await assertSucceeds(setDoc(doc(db, "products", "new"), product));
  await assertSucceeds(updateDoc(doc(db, "saleRequests", "request"), { status: "contacted" }));
  await assertFails(updateDoc(doc(db, "saleRequests", "request"), { email: "changed@example.com" }));
  await assertFails(setDoc(doc(db, "admins", "someone"), { role: "staff" }));
  await assertFails(updateDoc(doc(db, "supplies", "paper"), { quantity: -1, updatedAt: serverTimestamp() }));
  await assertFails(updateDoc(doc(db, "productInventory", "p"), { stock: 0.5, updatedAt: serverTimestamp() }));
  await assertFails(setDoc(doc(db, "products", "private"), { ...product, supplierCost: 1 }));
});

async function backend() {
  const db = staffDB();
  globalThis.inventoryTestContext = { db, auth: { currentUser: { uid: "staff" } } };
  const source = (await fs.readFile(new URL("../shop/admin-data.js", import.meta.url), "utf8"))
    .replace('import { db, auth } from "./firebase.js";', 'const { db, auth } = globalThis.inventoryTestContext;')
    .replace('"https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js"', JSON.stringify(import.meta.resolve("firebase/firestore")))
    .replace('"./inventory-model.mjs"', JSON.stringify(new URL("../shop/inventory-model.mjs", import.meta.url).href))
    .replace('"./products.js"', JSON.stringify(new URL("../shop/products.js", import.meta.url).href));
  return { db, api: await import(`data:text/javascript;base64,${Buffer.from(source + `\n// ${Math.random()}`).toString("base64")}`) };
}

test("competing production batches cannot overspend supplies and log only committed changes", async () => {
  const { db, api } = await backend();
  const results = await Promise.allSettled([api.makeProducts("p", 1, "Batch A"), api.makeProducts("p", 1, "Batch B")]);
  assert.equal(results.filter(result => result.status === "fulfilled").length, 1);
  assert.equal((await getDoc(doc(db, "supplies", "paper"))).data().quantity, 1);
  assert.equal((await getDoc(doc(db, "productInventory", "p"))).data().stock, 1);
  const logs = await getDocs(collection(db, "inventoryMovements"));
  assert.equal(logs.size, 2);
  await assertFails(updateDoc(logs.docs[0].ref, { reason: "Edited" }));
  await assertFails(deleteDoc(logs.docs[0].ref));
});

test("metadata saves preserve stock, imports preserve existing products, and failed batches do not write", async () => {
  const { db, api } = await backend();
  const { quantity, updatedAt, ...values } = supply;
  await api.saveSupply("paper", { ...values, name: "New paper name" });
  assert.equal((await getDoc(doc(db, "supplies", "paper"))).data().quantity, 3);
  await api.adjustInventory("supply", "paper", 5, "Receipt");
  assert.equal((await getDoc(doc(db, "supplies", "paper"))).data().quantity, 8);
  await assert.rejects(api.adjustInventory("supply", "paper", -9, "Too much"));
  await assert.rejects(api.makeProducts("p", 5, "Too many"));
  assert.equal((await getDoc(doc(db, "supplies", "paper"))).data().quantity, 8);
  assert.equal((await getDoc(doc(db, "productInventory", "p"))).data().stock, 0);
  await api.importCatalog();
  await updateDoc(doc(db, "products", "1"), { title: "Custom title" });
  await api.importCatalog();
  assert.equal((await getDoc(doc(db, "products", "1"))).data().title, "Custom title");
});
