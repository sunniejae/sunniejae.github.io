import { auth } from "./firebase.js";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, setPersistence, browserSessionPersistence } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import * as store from "./admin-data.js";
import { quantity, parseRecipe } from "./inventory-model.mjs";

const $ = id => document.getElementById(id);
const states = ["new", "contacted", "accepted", "fulfilled", "cancelled"];
let data = { products: [], inventory: [], supplies: [], requests: [], movements: [] };
let session = 0;
let refreshVersion = 0;
let authorized = false;
let busy = false;
let stockAction;

function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = String(text);
  if (className) node.className = className;
  return node;
}
function status(message, error = false) {
  $("status").textContent = message;
  $("status").dataset.error = String(error);
  if ($("stockDialog").open) $("stockStatus").textContent = message;
}
function errorMessage(error) {
  if (error.code === "permission-denied") return "Access denied. Publish the inventory rules and check your staff access in Firebase.";
  const authErrors = {
    "auth/operation-not-allowed": "Email/Password sign-in is disabled. Enable it in Firebase Authentication → Sign-in method.",
    "auth/invalid-credential": "The email or password is incorrect. Check your Firebase Authentication user and try again.",
    "auth/user-not-found": "The email or password is incorrect. Check your Firebase Authentication user and try again.",
    "auth/wrong-password": "The email or password is incorrect. Check your Firebase Authentication user and try again.",
    "auth/network-request-failed": "Firebase sign-in could not connect. Check your connection and whether a browser extension is blocking Firebase.",
    "auth/too-many-requests": "Firebase temporarily limited sign-in attempts. Wait a few minutes before trying again.",
    "auth/web-storage-unsupported": "Your browser is blocking sign-in storage. Allow site storage, then reload and try again.",
    "auth/user-disabled": "This login has been disabled in Firebase Authentication. Contact the shop owner.",
    "auth/invalid-api-key": "Firebase rejected the app configuration. Check the project's web app API key and its restrictions.",
    "auth/unauthorized-domain": "This website's domain is not authorized. Add it in Firebase Authentication → Settings → Authorized domains."
  };
  if (authErrors[error.code]) return authErrors[error.code];
  if (error.code?.startsWith("auth/")) return `Unable to sign in (${error.code}). Check your Firebase Authentication settings.`;
  if (["unavailable", "deadline-exceeded"].includes(error.code)) return "Firebase is unavailable. Check your connection and try again.";
  return error.message || "The update failed. Try again.";
}
function withDeadline(promise, message) {
  let timer;
  return Promise.race([
    promise,
    new Promise((_, reject) => { timer = setTimeout(() => reject(new Error(message)), 15000); })
  ]).finally(() => clearTimeout(timer));
}
function button(text, action) {
  const node = element("button", text);
  node.type = "button";
  node.addEventListener("click", action);
  return node;
}
function empty(container, message) { container.append(element("p", message, "empty")); }
function timestamp(value) { return value?.toDate ? value.toDate().toLocaleString() : "—"; }
function textField(form, name) { return form.elements[name].value.trim(); }
function httpURL(value, label) {
  if (!value) return "";
  const url = new URL(value);
  if (!["https:", "http:"].includes(url.protocol)) throw new Error(`${label} must use https:// or http://.`);
  return url.href;
}

async function refresh() {
  const current = session;
  const version = ++refreshVersion;
  const loaded = await withDeadline(store.loadDashboard(), "Signed in, but shop data did not load. Check your connection, then use Refresh data to try again.");
  if (!authorized || session !== current || version !== refreshVersion) return;
  data = loaded;
  render();
}

async function action(callback, message) {
  if (!authorized || busy) return;
  busy = true;
  const current = session;
  document.querySelectorAll("#dashboard button, #dashboard input, #dashboard select, #dashboard textarea, #stockForm button, #stockForm input").forEach(node => node.disabled = true);
  status("Saving…");
  try {
    await callback();
    if (session !== current) return;
    status(message);
    try { await refresh(); } catch (error) { status(`Saved, but the view could not refresh. ${errorMessage(error)}`, true); }
  } catch (error) {
    if (session === current) status(errorMessage(error), true);
  } finally {
    busy = false;
    document.querySelectorAll("#dashboard button, #dashboard input, #dashboard select, #dashboard textarea, #stockForm button, #stockForm input").forEach(node => node.disabled = false);
  }
}

function render() {
  const inventory = new Map(data.inventory.map(item => [item.id, item]));
  const lows = data.supplies.filter(item => item.active && item.quantity <= item.reorderLevel).length
    + data.products.filter(item => item.available && inventory.has(item.id) && inventory.get(item.id).stock <= inventory.get(item.id).reorderLevel).length;
  $("metrics").replaceChildren();
  for (const [label, value] of [["Products", data.products.length], ["Active supplies", data.supplies.filter(item => item.active).length], ["Low-stock items", lows], ["New requests (latest 100)", data.requests.filter(item => item.status === "new").length]]) {
    const metric = element("div", undefined, "metric");
    metric.append(element("span", label), element("strong", value));
    $("metrics").append(metric);
  }
  renderProducts(); renderSupplies(); renderRequests(); renderMovements();
}

function renderProducts() {
  const list = $("productList"); list.replaceChildren();
  const search = $("productSearch").value.toLowerCase();
  for (const product of [...data.products].sort((a, b) => a.title.localeCompare(b.title))) {
    const inventory = data.inventory.find(item => item.id === product.id);
    if (!`${product.title} ${inventory?.sku || ""}`.toLowerCase().includes(search)) continue;
    const item = element("article", undefined, "item");
    const heading = element("div", undefined, "item-header");
    heading.append(element("h3", product.title), element("span", product.available === false ? "Hidden" : "Visible", "badge"));
    item.append(heading, element("p", `${product.price} · ${inventory?.sku || "No SKU"}`, "muted"));
    item.append(element("p", inventory ? `${inventory.stock} in stock` : "Inventory not set up", "stock"));
    if (inventory && inventory.stock <= inventory.reorderLevel) item.append(element("span", "Low stock", "badge low"));
    const actions = element("div", undefined, "item-actions");
    actions.append(button("Edit product", () => editProduct(product.id)), button("Duplicate", () => editProduct(product.id, true)), button("Adjust stock", () => openStock("product", product.id, product.title)));
    if (inventory && Object.keys(inventory.recipe || {}).length) actions.append(button("Make a batch", () => openStock("production", product.id, product.title)));
    item.append(actions); list.append(item);
  }
  if (!list.children.length) empty(list, "No products found. Add a product or import your original catalog.");
}

function renderSupplies() {
  const list = $("supplyList"); list.replaceChildren();
  const search = $("supplySearch").value.toLowerCase();
  for (const supply of [...data.supplies].sort((a, b) => a.name.localeCompare(b.name))) {
    if (!`${supply.name} ${supply.supplier}`.toLowerCase().includes(search)) continue;
    const item = element("article", undefined, "item");
    const heading = element("div", undefined, "item-header");
    heading.append(element("h3", supply.name), element("span", supply.active ? "Active" : "Archived", "badge"));
    item.append(heading, element("p", `${supply.quantity} ${supply.unit}`, "stock"));
    item.append(element("p", `${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(supply.unitCost)} / ${supply.unit} · ${supply.supplier || "No supplier"}`, "muted"));
    if (supply.active && supply.quantity <= supply.reorderLevel) item.append(element("span", "Low stock", "badge low"));
    const actions = element("div", undefined, "item-actions");
    actions.append(button("Edit supply", () => editSupply(supply.id)), button("Duplicate", () => editSupply(supply.id, true)), button("Adjust stock", () => openStock("supply", supply.id, supply.name)));
    item.append(actions); list.append(item);
  }
  if (!list.children.length) empty(list, "No supplies found. Add your first material to start tracking it.");
}

function renderRequests() {
  const list = $("requestList"); list.replaceChildren();
  for (const request of data.requests) {
    if ($("requestFilter").value && request.status !== $("requestFilter").value) continue;
    const item = element("article", undefined, "request");
    item.append(element("h3", request.name), element("p", request.email), element("p", timestamp(request.createdAt), "muted"));
    const items = element("ul");
    for (const product of request.items || []) items.append(element("li", `${product.title} × ${product.quantity} (ID: ${product.productId})`));
    item.append(items, element("p", request.message));
    const label = element("label", "Request status"); const select = element("select");
    select.setAttribute("aria-label", `Status for request from ${request.name}`);
    for (const state of states) { const option = element("option", state); option.value = state; select.append(option); }
    select.value = request.status;
    select.addEventListener("change", () => {
      const next = select.value;
      select.value = request.status;
      action(() => store.setRequestStatus(request.id, next), "Request status saved. Stock was not changed.");
    });
    label.append(select); item.append(label); list.append(item);
  }
  if (!list.children.length) empty(list, "No matching sale requests.");
}

function renderMovements() {
  const list = $("movementList"); list.replaceChildren();
  for (const movement of data.movements) {
    const row = element("tr");
    const source = movement.kind === "supply-adjustment" ? data.supplies : data.products;
    const item = source.find(item => item.id === movement.itemId);
    for (const value of [timestamp(movement.createdAt), item?.name || item?.title || movement.itemId, `${movement.delta > 0 ? "+" : ""}${movement.delta}`, movement.reason, movement.createdBy]) row.append(element("td", value));
    list.append(row);
  }
  if (!list.children.length) { const row = element("tr"); const cell = element("td", "No stock movements yet."); cell.colSpan = 5; row.append(cell); list.append(row); }
}

function editProduct(id = "", duplicate = false) {
  const form = $("productForm"); form.reset();
  const product = data.products.find(item => item.id === id);
  const inventory = data.inventory.find(item => item.id === id);
  form.elements.id.value = id;
  $("productHeading").textContent = product ? "Edit product" : "New product";
  for (const key of ["title", "price", "image", "description", "type", "link"]) if (product?.[key] !== undefined) form.elements[key].value = product[key];
  form.elements.available.checked = product?.available !== false;
  form.elements.sku.value = inventory?.sku || "";
  form.elements.reorderLevel.value = inventory?.reorderLevel || 0;
  form.elements.recipe.value = Object.entries(inventory?.recipe || {}).map(([id, amount]) => `${id} = ${amount}`).join("\n");
  $("recipeRows").replaceChildren();
  for (const [id, amount] of Object.entries(inventory?.recipe || {})) addRecipeRow(id, amount);
  if (duplicate && product) {
    form.elements.id.value = "";
    form.elements.title.value = `${product.title} (copy)`.slice(0, 200);
    form.elements.sku.value = "";
    $("productHeading").textContent = "Duplicate product";
    status("Product settings copied. Enter the new product name, then Save product. The copy starts with zero stock and a blank SKU; the original is unchanged.");
    form.scrollIntoView?.({ behavior: "smooth", block: "start" });
    form.elements.title.focus({ preventScroll: true });
    form.elements.title.select();
  }
}
function addRecipeRow(id = "", amount = 1) {
  if ($("recipeRows").children.length >= 20) { status("A product can use at most 20 different supplies.", true); return; }
  const row = element("div", undefined, "recipe-row");
  const select = element("select"); select.setAttribute("aria-label", "Supply for product");
  const placeholder = element("option", "Choose supply"); placeholder.value = ""; select.append(placeholder);
  const supplies = data.supplies.filter(item => item.active || item.id === id);
  if (id && !supplies.some(item => item.id === id)) supplies.push({ id, name: "Missing supply", unit: "", active: false });
  for (const supply of supplies) {
    const option = element("option", `${supply.name} (${supply.unit})${supply.active ? "" : " · archived"}`);
    option.value = supply.id; select.append(option);
  }
  select.value = id;
  const input = element("input"); input.type = "number"; input.min = "0.000001"; input.max = "1000000"; input.step = "any"; input.value = amount;
  input.setAttribute("aria-label", "Amount per finished product");
  function syncRecipe() {
    $("productForm").elements.recipe.value = [...$("recipeRows").children].map(row => {
      const supply = row.querySelector("select").value;
      return supply ? `${supply} = ${row.querySelector("input").value}` : "";
    }).filter(Boolean).join("\n");
  }
  select.addEventListener("change", syncRecipe); input.addEventListener("input", syncRecipe);
  const remove = button("×", () => { row.remove(); syncRecipe(); }); remove.setAttribute("aria-label", "Remove supply from recipe");
  row.append(select, input, remove); $("recipeRows").append(row);
}
function editSupply(id = "", duplicate = false) {
  const form = $("supplyForm"); form.reset();
  const supply = data.supplies.find(item => item.id === id);
  form.elements.id.value = id;
  $("supplyHeading").textContent = supply ? "Edit supply" : "New supply";
  for (const key of ["name", "unit", "unitCost", "supplier", "notes", "reorderLevel"]) if (supply?.[key] !== undefined) form.elements[key].value = supply[key];
  form.elements.active.checked = supply?.active !== false;
  if (duplicate && supply) {
    form.elements.id.value = "";
    form.elements.name.value = `${supply.name} (copy)`.slice(0, 200);
    $("supplyHeading").textContent = "Duplicate supply";
    status("Supply settings copied. Enter the new name, then Save supply. The copy starts with zero stock; the original is unchanged.");
    form.scrollIntoView?.({ behavior: "smooth", block: "start" });
    form.elements.name.focus({ preventScroll: true });
    form.elements.name.select();
  }
}
function openStock(kind, id, title) {
  stockAction = { kind, id };
  $("stockForm").reset();
  $("stockStatus").textContent = "";
  $("stockHeading").textContent = kind === "production" ? `Make: ${title}` : `Adjust: ${title}`;
  $("stockHelp").textContent = kind === "production" ? "Enter the number of finished products. Their recipe supplies will be deducted together." : "Enter a positive amount to receive stock or a negative amount to remove stock. Stock cannot go below zero.";
  const amount = $("stockForm").elements.amount;
  amount.step = kind === "supply" ? "any" : "1";
  if (kind === "production") { amount.min = "1"; amount.max = "10000"; } else { amount.removeAttribute("min"); amount.removeAttribute("max"); }
  $("stockDialog").showModal();
}

$("productForm").addEventListener("submit", event => {
  event.preventDefault();
  action(async () => {
    const form = event.currentTarget;
    const product = Object.fromEntries(["title", "price", "description", "type"].map(key => [key, textField(form, key)]));
    if (!product.title || !product.price) throw new Error("Title and display price are required.");
    product.image = httpURL(textField(form, "image"), "Image URL");
    product.link = httpURL(textField(form, "link"), "Retailer URL");
    product.available = form.elements.available.checked;
    if (product.type === "direct" && !product.link) throw new Error("A retailer link is required for direct-order products.");
    const id = await store.saveProduct(form.elements.id.value, product, {
      sku: textField(form, "sku"), reorderLevel: quantity(form.elements.reorderLevel.value, "Threshold", true), recipe: parseRecipe(form.elements.recipe.value)
    });
    form.elements.id.value = id;
    $("productHeading").textContent = "Edit product";
  }, "Product saved. New products start with zero stock.");
});
$("supplyForm").addEventListener("submit", event => {
  event.preventDefault();
  action(async () => {
    const form = event.currentTarget;
    const values = Object.fromEntries(["name", "unit", "supplier", "notes"].map(key => [key, textField(form, key)]));
    if (!values.name || !values.unit) throw new Error("Supply name and unit are required.");
    values.unitCost = quantity(form.elements.unitCost.value, "Unit cost");
    values.reorderLevel = quantity(form.elements.reorderLevel.value, "Threshold");
    values.active = form.elements.active.checked;
    const id = await store.saveSupply(form.elements.id.value, values);
    form.elements.id.value = id;
    $("supplyHeading").textContent = "Edit supply";
  }, "Supply saved. Use Adjust stock to record a receipt.");
});
$("stockForm").addEventListener("submit", event => {
  event.preventDefault();
  action(async () => {
    const form = event.currentTarget;
    const reason = textField(form, "reason");
    if (!reason) throw new Error("Add a reason for this stock change.");
    const { kind, id } = stockAction;
    if (kind === "production") await store.makeProducts(id, form.elements.amount.value, reason);
    else await store.adjustInventory(kind, id, form.elements.amount.value, reason);
    $("stockDialog").close();
  }, "Stock updated and recorded in history.");
});
$("cancelStock").addEventListener("click", () => $("stockDialog").close());
$("stockDialog").addEventListener("cancel", event => { if (busy) event.preventDefault(); });
$("newProduct").addEventListener("click", () => editProduct());
$("addRecipeSupply").addEventListener("click", () => addRecipeRow());
$("newSupply").addEventListener("click", () => editSupply());
$("productSearch").addEventListener("input", renderProducts);
$("supplySearch").addEventListener("input", renderSupplies);
$("requestFilter").addEventListener("change", renderRequests);
$("importCatalog").addEventListener("click", () => action(() => store.importCatalog(), "Original catalog imported. Existing products were preserved."));
$("refresh").addEventListener("click", () => action(async () => {}, "Data refreshed."));
document.querySelectorAll("[data-panel]").forEach(tab => tab.addEventListener("click", () => {
  for (const name of ["products", "supplies", "requests", "movements"]) $(`${name}Panel`).hidden = name !== tab.dataset.panel;
  document.querySelectorAll("[data-panel]").forEach(button => button.setAttribute("aria-pressed", String(button === tab)));
}));

$("loginForm").addEventListener("submit", async event => {
  event.preventDefault();
  const form = event.currentTarget;
  const submit = form.querySelector("button");
  if (submit.disabled) return;
  submit.disabled = true;
  status("Preparing sign-in…");
  try {
    await withDeadline(setPersistence(auth, browserSessionPersistence), "Your browser did not finish preparing sign-in. Allow site storage, then reload and try again.");
    status("Signing in…");
    const credential = await withDeadline(
      signInWithEmailAndPassword(auth, textField(form, "email"), form.elements.password.value),
      "Firebase sign-in did not respond. Check your connection or browser blockers, then try again."
    );
    form.elements.password.value = "";
    // Signing in as the current user does not always emit onAuthStateChanged.
    // Always recheck access, including after an owner adds a missing admin record.
    await synchronizeUser(credential.user);
  } catch (error) { status(errorMessage(error), true); }
  finally { submit.disabled = false; }
});
$("signOut").addEventListener("click", async () => {
  try { await signOut(auth); } catch (error) { status(errorMessage(error), true); }
});
async function synchronizeUser(user) {
  const current = ++session;
  authorized = false;
  data = { products: [], inventory: [], supplies: [], requests: [], movements: [] };
  render(); editProduct(); editSupply();
  if ($("stockDialog").open) $("stockDialog").close();
  $("dashboard").hidden = true; $("loginPanel").hidden = false;
  $("signOut").hidden = !user || user.isAnonymous;
  $("accountEmail").textContent = user && !user.isAnonymous ? user.email || "Staff account" : "";
  if (!user || user.isAnonymous) { status(""); return; }
  status("Checking staff access…");
  try {
    const allowed = await withDeadline(store.isAdmin(user), "Signed in, but staff access could not be checked. Check your connection and Firebase database setup, then reload and try again.");
    if (current !== session) return;
    if (!allowed) { status("This account does not have staff access. Ask the shop owner to add your Firebase UID to the admins collection.", true); return; }
    authorized = true;
    $("loginPanel").hidden = true; $("dashboard").hidden = false;
    await refresh();
    if (current === session) status("Inventory loaded. Stock changes are saved to Firebase.");
  } catch (error) { if (current === session) status(errorMessage(error), true); }
}
onAuthStateChanged(auth, synchronizeUser, error => status(errorMessage(error), true));
