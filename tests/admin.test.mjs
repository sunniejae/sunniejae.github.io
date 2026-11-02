import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { JSDOM } from "jsdom";
import * as model from "../shop/inventory-model.mjs";

const html = await fs.readFile(new URL("../shop/admin.html", import.meta.url), "utf8");
const source = (await fs.readFile(new URL("../shop/admin.js", import.meta.url), "utf8"))
  .replace(/^import .*;$/gm, "");
const tick = () => new Promise(resolve => setTimeout(resolve, 10));

async function setup(allowed = true) {
  const dom = new JSDOM(html, { runScripts: "outside-only", url: "https://example.com/shop/admin.html" });
  const calls = [];
  const sample = {
    products: [{ id: "p", title: "<script>bad</script>", price: "$25", type: "exclusive", available: true }],
    inventory: [{ id: "p", stock: 2, sku: "P1", reorderLevel: 3, recipe: { s: 2 } }],
    supplies: [{ id: "s", name: "Paper", quantity: 8, unit: "sheets", unitCost: 1, reorderLevel: 2, active: true }],
    requests: [{ id: "r", name: "Customer", email: "customer@example.com", message: "<img onerror=bad>", status: "new", items: [{ productId: "p", title: "Planner", quantity: 1 }] }],
    movements: []
  };
  let listener;
  Object.assign(dom.window, {
    auth: {}, quantity: model.quantity, parseRecipe: model.parseRecipe,
    browserSessionPersistence: {}, setPersistence: async () => {}, signInWithEmailAndPassword: async () => {},
    onAuthStateChanged: (auth, callback) => { listener = callback; },
    signOut: async () => listener(null),
    store: {
      isAdmin: async () => allowed, loadDashboard: async () => sample,
      saveProduct: async (...args) => { calls.push(["product", ...args]); return "p"; },
      saveSupply: async (...args) => { calls.push(["supply", ...args]); return "s"; },
      adjustInventory: async (...args) => { calls.push(["adjust", ...args]); },
      makeProducts: async (...args) => { calls.push(["make", ...args]); },
      setRequestStatus: async (...args) => { calls.push(["request", ...args]); },
      importCatalog: async () => calls.push(["import"])
    }
  });
  dom.window.HTMLDialogElement.prototype.showModal = function () { this.open = true; };
  dom.window.HTMLDialogElement.prototype.close = function () { this.open = false; };
  dom.window.eval(source);
  await listener({ uid: "staff", email: "staff@example.com" });
  return { dom, calls, listener, sample };
}

test("unapproved accounts cannot open the admin dashboard", async () => {
  const { dom } = await setup(false);
  assert.equal(dom.window.document.getElementById("dashboard").hidden, true);
  assert.match(dom.window.document.getElementById("status").textContent, /does not have staff access/);
  dom.window.close();
});

test("staff can view safe inventory, edit products, and create supplies", async () => {
  const { dom, calls } = await setup(); const d = dom.window.document;
  assert.equal(d.getElementById("dashboard").hidden, false);
  assert.match(d.getElementById("productList").textContent, /<script>bad<\/script>/);
  assert.equal(d.querySelectorAll("#productList script, #requestList img").length, 0);
  assert.match(d.getElementById("productList").textContent, /Low stock/);
  d.querySelector("#productList button").click();
  const product = d.getElementById("productForm");
  product.elements.title.value = "New name";
  product.dispatchEvent(new dom.window.Event("submit", { cancelable: true })); await tick();
  assert.equal(calls[0][0], "product"); assert.equal(calls[0][1], "p"); assert.equal(calls[0][2].title, "New name");
  assert.deepEqual(calls[0][3].recipe, { s: 2 });
  const supply = d.getElementById("supplyForm"); supply.elements.name.value = "Ribbon"; supply.elements.unit.value = "meters";
  supply.dispatchEvent(new dom.window.Event("submit", { cancelable: true })); await tick();
  assert.equal(calls[1][0], "supply"); assert.equal(calls[1][2].name, "Ribbon");
  dom.window.close();
});

test("batch production, stock adjustment, and request status invoke the backend", async () => {
  const { dom, calls } = await setup(); const d = dom.window.document;
  [...d.querySelectorAll("#productList button")].find(button => button.textContent === "Make a batch").click();
  const form = d.getElementById("stockForm"); form.elements.amount.value = "2"; form.elements.reason.value = "Weekly batch";
  form.dispatchEvent(new dom.window.Event("submit", { cancelable: true })); await tick();
  assert.deepEqual(calls[0], ["make", "p", "2", "Weekly batch"]);
  [...d.querySelectorAll("#supplyList button")].find(button => button.textContent === "Adjust stock").click();
  form.elements.amount.value = "5"; form.elements.reason.value = "Receipt";
  form.dispatchEvent(new dom.window.Event("submit", { cancelable: true })); await tick();
  assert.deepEqual(calls[1], ["adjust", "supply", "s", "5", "Receipt"]);
  const select = d.querySelector("#requestList select"); select.value = "contacted";
  select.dispatchEvent(new dom.window.Event("change")); await tick();
  assert.deepEqual(calls[2], ["request", "r", "contacted"]);
  dom.window.close();
});

test("failed stock updates stay in the dialog and preserve the entered reason", async () => {
  const { dom } = await setup(); const d = dom.window.document;
  dom.window.store.makeProducts = async () => { throw Error("Not enough paper for this batch."); };
  [...d.querySelectorAll("#productList button")].find(button => button.textContent === "Make a batch").click();
  const form = d.getElementById("stockForm"); form.elements.amount.value = "99"; form.elements.reason.value = "Batch";
  form.dispatchEvent(new dom.window.Event("submit", { cancelable: true })); await tick();
  assert.equal(d.getElementById("stockDialog").open, true);
  assert.match(d.getElementById("stockStatus").textContent, /Not enough paper/);
  assert.equal(form.elements.reason.value, "Batch"); assert.equal(form.elements.amount.disabled, false);
  dom.window.close();
});

test("sign-out removes customer and inventory data from the interface", async () => {
  const { dom, listener } = await setup(); const d = dom.window.document;
  await listener(null);
  assert.equal(d.getElementById("dashboard").hidden, true);
  assert.doesNotMatch(d.getElementById("requestList").textContent, /customer@example.com/);
  assert.doesNotMatch(d.getElementById("supplyList").textContent, /Paper/);
  dom.window.close();
});
