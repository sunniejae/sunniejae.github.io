import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { JSDOM } from "jsdom";
import * as model from "../shop/inventory-model.mjs";
import { kpopGroupOptions, kpopVariants } from "../shop/kpop-import.mjs";
import { productShop, categoryPath, shopOptions } from "../shop/catalog-model.mjs";

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
    collectionTrail: model.collectionTrail, inCollection: model.inCollection,
    kpopGroupOptions, kpopVariants,
    productShop, categoryPath, shopOptions,
    browserSessionPersistence: {}, setPersistence: async () => {},
    signInWithEmailAndPassword: async () => ({ user: { uid: "staff", email: "staff@example.com" } }),
    onAuthStateChanged: (auth, callback) => { listener = callback; },
    signOut: async () => listener(null),
    store: {
      isAdmin: async () => allowed, loadDashboard: async () => sample,
      saveProduct: async (...args) => { calls.push(["product", ...args]); return "p"; },
      saveSupply: async (...args) => { calls.push(["supply", ...args]); return "s"; },
      adjustInventory: async (...args) => { calls.push(["adjust", ...args]); },
      makeProducts: async (...args) => { calls.push(["make", ...args]); },
      setRequestStatus: async (...args) => { calls.push(["request", ...args]); },
      saveRequestReply: async (...args) => { calls.push(["reply", ...args]); },
      saveShopCategory: async (...args) => { calls.push(["category", ...args]); },
      importKpopProducts: async (...args) => { calls.push(["kpop", ...args]); },
      deleteProduct: async id => { calls.push(["delete-product", id]); sample.products = sample.products.filter(item => item.id !== id); },
      deleteSupply: async id => { calls.push(["delete-supply", id]); sample.supplies = sample.supplies.filter(item => item.id !== id); },
      importCatalog: async () => calls.push(["import"])
    }
  });
  dom.window.HTMLDialogElement.prototype.showModal = function () { this.open = true; };
  dom.window.HTMLDialogElement.prototype.close = function () { this.open = false; };
  dom.window.eval(source);
  await listener({ uid: "staff", email: "staff@example.com" });
  return { dom, calls, listener, sample };
}

test("stock numbers omit units while supply metadata retains its unit", async () => {
  const { dom } = await setup(); const d = dom.window.document;
  assert.equal(d.querySelector("#supplyList .stock").textContent, "8");
  assert.equal(d.querySelector("#productList .stock").textContent, "2");
  d.querySelector("#supplyList button").click();
  assert.equal(d.getElementById("supplyForm").elements.unit.value, "sheets");
  dom.window.close();
});

test("collection navigation filters both stock lists and assigns new products to the current subcollection", async () => {
  const { dom, sample } = await setup(); const d = dom.window.document;
  sample.collections = [{ id: "a", name: "Crafts", parentId: "" }, { id: "b", name: "Paper", parentId: "a" }];
  sample.inventory[0].collectionId = "b"; sample.supplies[0].collectionId = "b";
  d.getElementById("refresh").click(); await tick();
  [...d.querySelectorAll("#collectionChildren button")].find(button => button.textContent.includes("Crafts")).click();
  assert.equal(d.querySelectorAll("#productList .item").length, 0);
  d.getElementById("includeSubcollections").checked = true;
  d.getElementById("includeSubcollections").dispatchEvent(new dom.window.Event("change"));
  assert.equal(d.querySelectorAll("#productList .item").length, 1);
  assert.equal(d.querySelectorAll("#supplyList .item").length, 1);
  d.querySelector("#collectionChildren button").click();
  d.getElementById("newProduct").click();
  assert.equal(d.getElementById("productForm").elements.collectionId.value, "b");
  assert.match(d.getElementById("collectionBreadcrumbs").textContent, /Crafts.*Paper/);
  d.getElementById("allStock").click();
  assert.equal(d.querySelectorAll("#productList .item").length, 1);
  dom.window.close();
});

test("new subcollections are created under the selected collection", async () => {
  const { dom, sample, calls } = await setup(); const d = dom.window.document;
  sample.collections = [{ id: "a", name: "Crafts", parentId: "" }];
  dom.window.store.saveCollection = async (...args) => {
    calls.push(["collection", ...args]); sample.collections.push({ id: "b", name: args[1], parentId: args[2] }); return "b";
  };
  d.getElementById("refresh").click(); await tick();
  d.querySelector("#collectionChildren button").click();
  const form = d.getElementById("collectionForm"); form.elements.name.value = "Paper";
  form.dispatchEvent(new dom.window.Event("submit", { cancelable: true })); await tick();
  assert.deepEqual(calls[0], ["collection", "", "Paper", "a"]);
  assert.match(d.getElementById("collectionBreadcrumbs").textContent, /Crafts.*Paper/);
  dom.window.close();
});

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

test("staff can save a reply for the customer's in-shop request history", async () => {
  const { dom, calls } = await setup(); const d = dom.window.document;
  const form = d.querySelector(".request-reply-form");
  form.querySelector("textarea").value = "Your custom colors are available.";
  form.dispatchEvent(new dom.window.Event("submit", { cancelable: true })); await tick();
  assert.deepEqual(calls[0], ["reply", "r", "Your custom colors are available."]);
  assert.match(d.getElementById("status").textContent, /customer can see it in My requests/);
  dom.window.close();
});

test("Studio Ken is a product inventory option while supplies remain shared", async () => {
  const { dom, sample, calls } = await setup(); const d = dom.window.document;
  sample.categories = [{ id: "art", name: "Art", shop: "studio-ken", parentId: "" }];
  sample.products.push({ id: "ken", title: "Ken artwork", price: "$20", type: "exclusive", shop: "studio-ken", categoryId: "art", available: true });
  d.getElementById("refresh").click(); await tick();
  const filter = d.getElementById("inventoryShopFilter"); filter.value = "studio-ken"; filter.dispatchEvent(new dom.window.Event("change"));
  assert.equal(d.querySelectorAll("#productList .item").length, 1);
  d.querySelector("#productList button").click();
  const form = d.getElementById("productForm"); assert.equal(form.elements.shop.value, "studio-ken"); assert.equal(form.elements.categoryId.value, "art");
  form.dispatchEvent(new dom.window.Event("submit", { cancelable: true })); await tick();
  assert.equal(calls[0][2].shop, "studio-ken"); assert.equal(calls[0][2].categoryId, "art");
  assert.equal(d.getElementById("supplyForm").elements.shop, undefined);
  assert.equal(d.querySelectorAll("#supplyList .item").length, 1);
  dom.window.close();
});

test("staff can create a Studio Ken subcategory in the public taxonomy", async () => {
  const { dom, sample, calls } = await setup(); const d = dom.window.document;
  sample.categories = [{ id: "art", name: "Art", shop: "studio-ken", parentId: "" }];
  d.getElementById("refresh").click(); await tick();
  const form = d.getElementById("shopCategoryForm"); form.elements.shop.value = "studio-ken";
  form.elements.shop.dispatchEvent(new dom.window.Event("change"));
  form.elements.parentId.value = "art"; form.elements.name.value = "Prints";
  form.dispatchEvent(new dom.window.Event("submit", { cancelable: true })); await tick();
  assert.deepEqual(calls[0], ["category", "", "Prints", "studio-ken", "art"]);
  dom.window.close();
});

test("delete actions require confirmation and reset the deleted item's editor", async () => {
  const { dom, calls } = await setup(); const d = dom.window.document;
  dom.window.confirm = () => false;
  [...d.querySelectorAll("#productList button")].find(item => item.textContent === "Delete product").click(); await tick();
  assert.equal(calls.length, 0);
  d.querySelector("#productList button").click();
  dom.window.confirm = message => { assert.match(message, /Current stock/); return true; };
  [...d.querySelectorAll("#productList button")].find(item => item.textContent === "Delete product").click(); await tick();
  assert.deepEqual(calls[0], ["delete-product", "p"]);
  assert.equal(d.getElementById("productForm").elements.id.value, "");
  d.querySelector("#supplyList button").click();
  [...d.querySelectorAll("#supplyList button")].find(item => item.textContent === "Delete supply").click(); await tick();
  assert.deepEqual(calls[1], ["delete-supply", "s"]);
  assert.equal(d.getElementById("supplyForm").elements.id.value, "");
  dom.window.close();
});

test("staff can select K-pop designs and transfer directly to the live shop", async () => {
  const { dom, calls } = await setup(); const d = dom.window.document;
  d.querySelector('[data-panel="kpop"]').click();
  assert.equal(d.querySelectorAll(".kpop-design").length, 17);
  const select = d.querySelector('[data-kpop-id="kpop-oneus-1-v1"]');
  select.checked = true; select.dispatchEvent(new dom.window.Event("change"));
  assert.equal(d.getElementById("importKpopLive").disabled, false);
  d.getElementById("importKpopLive").click(); await tick();
  assert.equal(calls[0][0], "kpop");
  assert.deepEqual(Array.from(calls[0][1]), ["kpop-oneus-1-v1"]);
  assert.equal(calls[0][2].available, true);
  assert.match(d.getElementById("status").textContent, /live shop/);
  dom.window.close();
});

test("placeholder retailer designs can transfer as drafts but not publish", async () => {
  const { dom, calls } = await setup(); const d = dom.window.document;
  d.querySelector('[data-panel="kpop"]').click();
  const select = d.querySelector('[data-kpop-id="kpop-oneus-5-v1"]');
  select.checked = true; select.dispatchEvent(new dom.window.Event("change"));
  assert.equal(d.getElementById("importKpopLive").disabled, true);
  assert.equal(d.getElementById("importKpopDrafts").disabled, false);
  assert.match(d.getElementById("kpopPublishHint").textContent, /real links/);
  d.getElementById("importKpopDrafts").click(); await tick();
  assert.equal(calls[0][2].available, false);
  dom.window.close();
});

test("already transferred K-pop variants open the saved product editor on the same page", async () => {
  const { dom, sample } = await setup(); const d = dom.window.document;
  sample.products.push({ id: "kpop-oneus-1-v1", title: "Saved K-pop product", price: "$15", type: "exclusive", available: false });
  d.getElementById("refresh").click(); await tick();
  d.querySelector('[data-panel="kpop"]').click();
  assert.equal(d.querySelector('[data-kpop-id="kpop-oneus-1-v1"]'), null);
  [...d.querySelectorAll("#kpopList button")].find(button => button.textContent === "Edit saved product").click();
  assert.equal(d.getElementById("productsPanel").hidden, false);
  assert.equal(d.getElementById("productForm").elements.title.value, "Saved K-pop product");
  dom.window.close();
});

test("duplicating a product keeps its supply recipe but saves a new name and blank SKU", async () => {
  const { dom, calls, sample } = await setup(); const d = dom.window.document;
  [...d.querySelectorAll("#productList button")].find(button => button.textContent === "Duplicate").click();
  const form = d.getElementById("productForm");
  assert.equal(form.elements.id.value, ""); assert.equal(form.elements.sku.value, "");
  assert.equal(form.elements.price.value, "$25");
  assert.equal(form.elements.recipe.value, "s = 2");
  assert.equal(form.elements.reorderLevel.value, "3");
  assert.equal(calls.length, 0, "Duplicating is a draft until Save");
  form.elements.title.value = "New planner variation";
  form.dispatchEvent(new dom.window.Event("submit", { cancelable: true })); await tick();
  assert.equal(calls[0][0], "product"); assert.equal(calls[0][1], "");
  assert.equal(calls[0][2].title, "New planner variation");
  assert.deepEqual(calls[0][3].recipe, { s: 2 });
  assert.equal(sample.inventory[0].stock, 2);
  assert.equal(sample.products[0].title, "<script>bad</script>");
  dom.window.close();
});

test("duplicating a supply preserves its settings without updating the original record", async () => {
  const { dom, calls, sample } = await setup(); const d = dom.window.document;
  [...d.querySelectorAll("#supplyList button")].find(button => button.textContent === "Duplicate").click();
  const form = d.getElementById("supplyForm");
  assert.equal(form.elements.id.value, ""); assert.equal(form.elements.unit.value, "sheets");
  assert.equal(form.elements.unitCost.value, "1"); assert.equal(form.elements.reorderLevel.value, "2");
  assert.equal(calls.length, 0);
  form.elements.name.value = "Blue paper";
  form.dispatchEvent(new dom.window.Event("submit", { cancelable: true })); await tick();
  assert.equal(calls[0][0], "supply"); assert.equal(calls[0][1], "");
  assert.equal(calls[0][2].name, "Blue paper");
  assert.equal(sample.supplies[0].name, "Paper"); assert.equal(sample.supplies[0].quantity, 8);
  dom.window.close();
});

function submitLogin(dom) {
  const form = dom.window.document.getElementById("loginForm");
  form.elements.email.value = "staff@example.com";
  form.elements.password.value = "test-only-password";
  form.dispatchEvent(new dom.window.Event("submit", { cancelable: true }));
  return form;
}
function fastDeadlines(dom) {
  const schedule = dom.window.setTimeout.bind(dom.window);
  dom.window.setTimeout = (callback, delay) => schedule(callback, Math.min(delay, 5));
}
const waitForDeadline = () => new Promise(resolve => setTimeout(resolve, 30));

test("an existing login rechecks newly granted staff access without an auth-change event", async () => {
  const { dom } = await setup(false); const d = dom.window.document;
  dom.window.store.isAdmin = async () => true;
  // The mocked sign-in returns the same user and deliberately emits no auth event.
  const form = submitLogin(dom); await tick();
  assert.equal(d.getElementById("dashboard").hidden, false);
  assert.match(d.getElementById("status").textContent, /Inventory loaded/);
  assert.equal(form.querySelector("button").disabled, false);
  assert.equal(form.elements.password.value, "");
  dom.window.close();
});

test("an unresponsive sign-in times out and restores the retry button", async () => {
  const { dom } = await setup(false); fastDeadlines(dom);
  dom.window.signInWithEmailAndPassword = () => new Promise(() => {});
  const form = submitLogin(dom); await waitForDeadline();
  assert.match(dom.window.document.getElementById("status").textContent, /Firebase sign-in did not respond/);
  assert.equal(form.querySelector("button").disabled, false);
  assert.equal(dom.window.document.getElementById("dashboard").hidden, true);
  dom.window.close();
});

test("blocked session storage stops sign-in with an actionable message", async () => {
  const { dom } = await setup(false); fastDeadlines(dom);
  dom.window.setPersistence = () => new Promise(() => {});
  let signInCalls = 0;
  dom.window.signInWithEmailAndPassword = async () => { signInCalls++; };
  const form = submitLogin(dom); await waitForDeadline();
  assert.match(dom.window.document.getElementById("status").textContent, /Allow site storage/);
  assert.equal(signInCalls, 0); assert.equal(form.querySelector("button").disabled, false);
  dom.window.close();
});

test("an unresponsive staff lookup cannot leave sign-in pending forever", async () => {
  const { dom } = await setup(false); fastDeadlines(dom);
  dom.window.store.isAdmin = () => new Promise(() => {});
  const form = submitLogin(dom); await waitForDeadline();
  assert.match(dom.window.document.getElementById("status").textContent, /staff access could not be checked/);
  assert.equal(form.querySelector("button").disabled, false);
  assert.equal(dom.window.document.getElementById("dashboard").hidden, true);
  dom.window.close();
});

test("Firebase authentication failures identify the disabled sign-in provider", async () => {
  const { dom } = await setup(false);
  dom.window.signInWithEmailAndPassword = async () => { throw { code: "auth/operation-not-allowed" }; };
  const form = submitLogin(dom); await tick();
  assert.match(dom.window.document.getElementById("status").textContent, /Email\/Password sign-in is disabled/);
  assert.equal(form.querySelector("button").disabled, false);
  dom.window.close();
});
