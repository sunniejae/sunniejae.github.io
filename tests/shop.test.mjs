import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { JSDOM } from "jsdom";
import { fallbackProducts } from "../shop/products.js";
import { productShop, categoryPath, catalogMatches } from "../shop/catalog-model.mjs";

const html = await fs.readFile(new URL("../shop/home.html", import.meta.url), "utf8");
const source = (await fs.readFile(new URL("../shop/shophome.js", import.meta.url), "utf8"))
  .replace(/^import .*;$/gm, "")
  .replace('import("./firebase.js?v=catalog-resilience-1")', 'Promise.resolve(window.shopAPI)');
const tick = () => new Promise(resolve => setTimeout(resolve, 15));
const product = { id: "p", title: "Custom planner", price: "$25", type: "exclusive", image: "https://example.com/planner.png" };

async function setup(overrides = {}, storedCart) {
  const dom = new JSDOM(html, { runScripts: "outside-only", url: "https://example.com/shop/home.html" });
  const calls = [];
  const errors = [];
  dom.window.console.error = (...args) => errors.push(args);
  dom.window.fallbackProducts = fallbackProducts;
  Object.assign(dom.window, { productShop, categoryPath, catalogMatches });
  dom.window.shopAPI = {
    loadProducts: async () => ({ exclusive: [product], direct: [] }),
    loadShopCategories: async () => [],
    saveSaleRequest: async request => { calls.push(request); return { id: "request-123" }; },
    loadMyRequests: async () => [],
    customerAccount: async () => ({ user: null, emailEnabled: false, emailUpdates: false }), ...overrides
  };
  dom.window.HTMLDialogElement.prototype.showModal = function () { this.open = true; };
  dom.window.HTMLDialogElement.prototype.close = function () { this.open = false; };
  if (storedCart !== undefined) dom.window.localStorage.setItem("sj_wishlist", JSON.stringify(storedCart));
  dom.window.eval(source); await tick();
  return { dom, calls, errors, d: dom.window.document };
}
function addAndOpen(dom) {
  const d = dom.window.document;
  d.querySelector("#exclusiveProducts .btn").click();
  d.getElementById("wishlistBtn").click();
  return d.getElementById("saleRequestForm");
}
function submit(dom, form) { form.dispatchEvent(new dom.window.Event("submit", { cancelable: true })); }

test("guest request checkout needs no email and confirms the saved reference", async () => {
  const { dom, calls, d } = await setup();
  const form = addAndOpen(dom); form.elements.message.value = "Purple cover";
  submit(dom, form); await tick();
  assert.equal(calls.length, 1); assert.equal(calls[0].name, "Guest customer"); assert.equal(calls[0].email, "");
  assert.equal(calls[0].items[0].productId, "p"); assert.equal(calls[0].message, "Purple cover");
  assert.equal(d.getElementById("requestConfirmation").hidden, false);
  assert.match(d.getElementById("confirmationReference").textContent, /request-123/);
  assert.equal(d.getElementById("saleRequestForm").hidden, true);
  assert.deepEqual(JSON.parse(dom.window.localStorage.getItem("sj_wishlist")), []);
  dom.window.close();
});

test("cart review supports quantities and blocks duplicate submission while confirmation is pending", async () => {
  let resolveWrite; const requests = [];
  const { dom, d } = await setup({ saveSaleRequest: request => { requests.push(request); return new Promise(resolve => { resolveWrite = resolve; }); } });
  const form = addAndOpen(dom);
  d.querySelector('[data-action="increase"]').click();
  assert.equal(d.getElementById("wishlistCount").textContent, "2");
  submit(dom, form); submit(dom, form); await tick();
  assert.equal(requests.length, 1); assert.equal(requests[0].items[0].quantity, 2);
  assert.equal(d.getElementById("checkoutFields").disabled, true);
  assert.equal(d.querySelector('[data-action="remove"]').disabled, true);
  resolveWrite({ id: "saved" }); await tick();
  assert.equal(d.getElementById("requestConfirmation").hidden, false);
  dom.window.close();
});

test("failed saves preserve the cart and notes, and do not claim success", async () => {
  const { dom, d } = await setup({ saveSaleRequest: async () => { throw Error("denied"); } });
  const form = addAndOpen(dom); form.elements.message.value = "Keep this note";
  submit(dom, form); await tick();
  assert.match(d.getElementById("requestStatus").textContent, /could not be confirmed/);
  assert.equal(d.getElementById("requestConfirmation").hidden, true);
  assert.equal(form.elements.message.value, "Keep this note");
  assert.equal(JSON.parse(dom.window.localStorage.getItem("sj_wishlist")).length, 1);
  assert.equal(d.getElementById("checkoutFields").disabled, false);
  dom.window.close();
});

test("checkout rechecks availability and blocks products removed after adding to cart", async () => {
  const { dom, calls, d } = await setup(); const form = addAndOpen(dom);
  dom.window.shopAPI.loadProducts = async () => ({ exclusive: [], direct: [] });
  submit(dom, form); await tick();
  assert.equal(calls.length, 0); assert.match(d.getElementById("requestStatus").textContent, /no longer available/);
  assert.equal(d.getElementById("checkoutFields").disabled, true);
  d.querySelector('[data-action="remove"]').click();
  assert.equal(d.getElementById("saleRequestForm").hidden, true);
  dom.window.close();
});

test("My requests shows status and safe shop messages without an email workflow", async () => {
  const { dom, d } = await setup({ loadMyRequests: async () => [{ id: "r", status: "accepted", items: [{ title: "Planner", quantity: 2 }], message: "Purple", shopMessage: '<img src=x onerror="alert(1)">' }] });
  d.getElementById("requestsBtn").click(); await tick();
  assert.match(d.getElementById("myRequestsList").textContent, /Accepted/);
  assert.match(d.getElementById("myRequestsList").textContent, /Planner × 2/);
  assert.match(d.querySelector(".shop-reply").textContent, /<img/);
  assert.equal(d.querySelectorAll("#myRequestsList img").length, 0);
  dom.window.shopAPI.loadMyRequests = async () => { throw Error("offline"); };
  d.getElementById("refreshRequests").click(); await tick();
  assert.match(d.getElementById("requestsStatus").textContent, /couldn’t load/);
  assert.equal(d.getElementById("myRequestsList").children.length, 0);
  dom.window.close();
});

test("catalog outage keeps a saved cart and disables request checkout until a successful retry", async () => {
  const { dom, d } = await setup({ loadProducts: async () => { throw Error("offline"); } }, [{ ...product, qty: 1 }]);
  d.getElementById("wishlistBtn").click();
  assert.equal(d.getElementById("checkoutFields").disabled, true);
  assert.equal(d.getElementById("retryCatalog").hidden, false);
  dom.window.shopAPI.loadProducts = async () => ({ exclusive: [product], direct: [] });
  d.getElementById("retryCatalog").click(); await tick();
  assert.equal(d.getElementById("checkoutFields").disabled, false);
  dom.window.close();
});

test("old wishlist entries migrate into the cart and product HTML cannot execute", async () => {
  const unsafe = { ...product, id: "1", title: '<img onerror="alert(1)">', image: "javascript:alert(1)" };
  const { dom, d } = await setup({ loadProducts: async () => ({ exclusive: [unsafe], direct: [] }) }, [{ id: 1, title: "Old name", qty: 2 }]);
  d.getElementById("wishlistBtn").click();
  assert.equal(d.getElementById("wishlistCount").textContent, "2");
  assert.equal(d.querySelector(".wishlist-item-title").textContent, unsafe.title);
  assert.equal(d.querySelectorAll("[onerror]").length, 0);
  assert.equal(d.querySelector(".product-image").hasAttribute("src"), false);
  dom.window.close();
});

test("cart sign-up is optional, saves email consent only when available, and preserves the cart", async () => {
  let state = { user: null, emailEnabled: true, emailUpdates: false };
  const registrations = [];
  const { dom, d } = await setup({
    customerAccount: async () => state,
    registerCustomer: async (email, password, updates) => {
      registrations.push({ email, password, updates });
      state = { user: { email, verified: false }, emailEnabled: true, emailUpdates: updates };
    }
  });
  addAndOpen(dom); await tick();
  const form = d.getElementById("customerAccountForm");
  assert.equal(form.elements.emailUpdates.checked, false);
  form.elements.accountEmail.value = "buyer@example.com"; form.elements.accountPassword.value = "test-password"; form.elements.emailUpdates.checked = true;
  submit(dom, form); await tick();
  assert.deepEqual(registrations, [{ email: "buyer@example.com", password: "test-password", updates: true }]);
  assert.equal(form.hidden, true); assert.equal(d.getElementById("signedInAccount").hidden, false);
  assert.match(d.getElementById("customerVerificationNote").textContent, /Verify your email/);
  assert.equal(JSON.parse(dom.window.localStorage.getItem("sj_wishlist")).length, 1);
  assert.equal(form.elements.accountPassword.value, "");
  dom.window.close();
});

test("unconfigured email delivery is shown honestly and never silently opts in", async () => {
  const { dom, d } = await setup(); addAndOpen(dom); await tick();
  assert.match(d.getElementById("emailAvailability").textContent, /aren’t available yet/);
  assert.equal(d.getElementById("customerAccountForm").elements.emailUpdates.disabled, true);
  assert.equal(d.getElementById("customerAccountForm").elements.emailUpdates.checked, false);
  assert.equal(d.getElementById("checkoutFields").disabled, false);
  dom.window.close();
});

test("account errors retain guest checkout and existing sign-in explains guest history", async () => {
  const { dom, d } = await setup({ registerCustomer: async () => { throw { code: "auth/email-already-in-use" }; } });
  addAndOpen(dom); await tick();
  const form = d.getElementById("customerAccountForm"); form.elements.accountEmail.value = "buyer@example.com"; form.elements.accountPassword.value = "test-password";
  submit(dom, form); await tick();
  assert.match(d.getElementById("customerAccountStatus").textContent, /already has an account/);
  assert.equal(d.getElementById("checkoutFields").disabled, false);
  d.getElementById("accountMode").click();
  assert.equal(d.getElementById("existingAccountNote").hidden, false);
  assert.match(d.getElementById("existingAccountNote").textContent, /aren’t transferred/);
  dom.window.close();
});

test("Studio Ken switching changes branding and products while keeping a shared cart", async () => {
  const ken = { ...product, id: "ken", title: "Ken art print", shop: "studio-ken" };
  const { dom, d } = await setup({ loadProducts: async () => ({ exclusive: [product, ken], direct: [] }) });
  d.querySelector("#exclusiveProducts .btn").click();
  d.getElementById("switchShop").click();
  assert.equal(d.body.dataset.shop, "studio-ken"); assert.equal(d.title, "Studio Ken Shop");
  assert.match(d.getElementById("exclusiveProducts").textContent, /Ken art print/);
  assert.doesNotMatch(d.getElementById("exclusiveProducts").textContent, /Custom planner/);
  d.querySelector("#exclusiveProducts .btn").click(); d.getElementById("wishlistBtn").click();
  assert.equal(d.querySelectorAll(".wishlist-item").length, 2);
  assert.match(dom.window.location.search, /shop=studio-ken/);
  dom.window.close();
});

test("nested categories and text search combine and can be cleared", async () => {
  const categories = [{ id: "gifts", name: "Gifts", parentId: "", shop: "sunnie-jae" }, { id: "paper", name: "Paper", parentId: "gifts", shop: "sunnie-jae" }];
  const { dom, d } = await setup({
    loadProducts: async () => ({ exclusive: [{ ...product, categoryId: "paper" }, { ...product, id: "other", title: "Keychain", categoryId: "" }], direct: [] }),
    loadShopCategories: async () => categories
  });
  let select = d.querySelector("#categoryFilters select"); select.value = "gifts"; select.dispatchEvent(new dom.window.Event("change"));
  assert.equal(d.querySelectorAll(".product-card").length, 1);
  assert.equal(d.querySelectorAll("#categoryFilters select").length, 2);
  const search = d.getElementById("shopSearch"); search.value = "missing"; search.dispatchEvent(new dom.window.Event("input"));
  assert.equal(d.querySelectorAll(".product-card").length, 0);
  assert.match(d.getElementById("catalogResults").textContent, /0 products/);
  d.getElementById("clearShopFilters").click(); assert.equal(d.querySelectorAll(".product-card").length, 2);
  dom.window.close();
});

test("category permission failure leaves products and checkout available and logs the cause", async () => {
  const { dom, d, errors } = await setup({ loadShopCategories: async () => { throw { code: "permission-denied", message: "Missing category read rule" }; } });
  assert.equal(d.querySelectorAll(".product-card").length, 1);
  assert.equal(d.querySelector("#exclusiveProducts .btn").disabled, false);
  assert.match(d.getElementById("catalogStatus").textContent, /still shop and search/);
  assert.equal(d.querySelector("#categoryFilters select").disabled, true);
  assert.equal(errors[0][1].code, "permission-denied");
  addAndOpen(dom); assert.equal(d.getElementById("checkoutFields").disabled, false);
  dom.window.shopAPI.loadShopCategories = async () => [];
  d.getElementById("retryCatalog").click(); await tick();
  assert.equal(d.getElementById("catalogStatus").textContent, "");
  assert.equal(d.querySelector("#categoryFilters select").disabled, false);
  dom.window.close();
});

test("product loading errors are logged and keep checkout disabled", async () => {
  const { dom, d, errors } = await setup({ loadProducts: async () => { throw { code: "unavailable", message: "Connection failed" }; } });
  assert.match(d.getElementById("catalogStatus").textContent, /shop is temporarily unavailable/);
  assert.equal(errors[0][0], "Shop products could not load");
  assert.equal(errors[0][1].code, "unavailable");
  assert.equal(d.querySelector("#exclusiveProducts .btn").disabled, true);
  dom.window.close();
});
