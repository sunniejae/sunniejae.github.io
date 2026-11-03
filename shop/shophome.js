import { fallbackProducts } from "./products.js";
import { productShop, categoryPath, catalogMatches } from "./catalog-model.mjs";

const $ = id => document.getElementById(id);
let products = fallbackProducts;
let cart = [];
let catalogReady = false;
let sending = false;
let clientPromise;
let requestLoad = 0;
let lastTrigger;
let accountBusy = false;
let accountMode = "signup";
let accountState = { user: null, emailEnabled: false, emailUpdates: false };
let autoEmail = "";
let accountLoad = 0;
let activeShop = new URLSearchParams(location.search).get("shop") === "studio-ken" ? "studio-ken" : "sunnie-jae";
let categories = [];
let selectedCategory = new URLSearchParams(location.search).get("category") || "";
let categoriesAvailable = true;
let catalogLoad = 0;
const stateLabels = { new: "Received", contacted: "In review", accepted: "Accepted", fulfilled: "Completed", cancelled: "Cancelled" };

function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = String(text);
  if (className) node.className = className;
  return node;
}
function button(text, callback, className) {
  const node = element("button", text, className); node.type = "button"; node.addEventListener("click", callback); return node;
}
function safeURL(value) {
  if (!value) return "";
  try { const url = new URL(value, location.href); return ["http:", "https:"].includes(url.protocol) ? url.href : ""; } catch { return ""; }
}
function image(src, title, className) {
  const node = element("img", undefined, className); const url = safeURL(src);
  if (url) node.src = url;
  node.alt = title || ""; node.loading = "lazy"; return node;
}
function client() {
  clientPromise ||= import("./firebase.js?v=catalog-resilience-1").catch(error => { clientPromise = undefined; throw error; });
  return clientPromise;
}
function deadline(promise) {
  let timer;
  return Promise.race([promise, new Promise((_, reject) => { timer = setTimeout(() => reject(new Error("Request timed out")), 15000); })]).finally(() => clearTimeout(timer));
}
function persistCart() {
  try { localStorage.setItem("sj_wishlist", JSON.stringify(cart)); }
  catch { $("cartNotice").textContent = "Browser storage is unavailable. Keep this tab open to retain your cart."; }
}
function loadCart() {
  try { cart = JSON.parse(localStorage.getItem("sj_wishlist") || "[]"); } catch { cart = []; }
  if (!Array.isArray(cart)) cart = [];
  const unique = new Map();
  for (const item of cart) {
    if (!item || !["string", "number"].includes(typeof item.id) || !String(item.id) || String(item.id).length > 200 || typeof item.title !== "string") continue;
    unique.set(String(item.id), { ...item, id: String(item.id), qty: Math.max(1, Math.min(99, Math.floor(Number(item.qty)) || 1)) });
  }
  cart = [...unique.values()].slice(0, 20);
}
function updateCart() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  $("wishlistCount").textContent = count;
  $("wishlistCount").style.display = count ? "flex" : "none";
  renderCart();
}
function currentProduct(id) { return products.exclusive.find(product => String(product.id) === String(id)); }
function filterURL() {
  const url = new URL(location.href);
  url.searchParams.set("shop", activeShop);
  if (selectedCategory) url.searchParams.set("category", selectedCategory); else url.searchParams.delete("category");
  if ($("shopSearch").value.trim()) url.searchParams.set("q", $("shopSearch").value.trim()); else url.searchParams.delete("q");
  history.replaceState(null, "", url);
}
function renderShop() {
  const ken = activeShop === "studio-ken";
  document.body.dataset.shop = activeShop;
  document.title = ken ? "Studio Ken Shop" : "Sunnie Jae Shop";
  $("shopBrand").textContent = ken ? "Shop Studio Ken" : "Shop Sunnie Jae";
  $("shopBrand").href = ken ? "/studio%20ken/home.html" : "/";
  $("shopEyebrow").textContent = ken ? "THE STUDIO KEN SHOP" : "THE SUNNIE JAE SHOP";
  $("shopTitle").textContent = ken ? "Art with a little edge." : "Something a little more you.";
  $("shopDescription").textContent = ken ? "Explore Studio Ken creations. Choose a piece and make your request here." : "Find a favorite, make it personal, and send your request right here.";
  $("switchShop").textContent = ken ? "Shop Sunnie Jae" : "Shop Studio Ken";
  document.querySelector('link[rel="icon"]').href = ken ? "/studio%20ken/assets/favicon.png" : "/assets/favicon.png";
}
function renderCategoryFilters() {
  const path = categoryPath(categories, selectedCategory, activeShop);
  if (catalogReady && selectedCategory && !path.length) selectedCategory = "";
  const area = $("categoryFilters"); area.replaceChildren();
  for (let depth = 0; depth <= path.length; depth++) {
    const parent = depth ? path[depth - 1].id : "";
    const children = categories.filter(item => item.shop === activeShop && item.parentId === parent).sort((a, b) => a.name.localeCompare(b.name));
    if (depth && !children.length) break;
    const label = element("label", depth ? "Subcategory" : "Category"); const select = element("select");
    select.disabled = !categoriesAvailable;
    const all = element("option", depth ? "All subcategories" : "All categories"); all.value = parent; select.append(all);
    for (const item of children) { const option = element("option", item.name); option.value = item.id; select.append(option); }
    select.value = path[depth]?.id || parent;
    select.addEventListener("change", () => { selectedCategory = select.value; renderCategoryFilters(); renderCatalog(); filterURL(); });
    label.append(select); area.append(label);
  }
}
function renderCatalog() {
  let count = 0;
  for (const [kind, gridId] of [["exclusive", "exclusiveProducts"], ["direct", "directProducts"]]) {
    const grid = $(gridId); grid.replaceChildren();
    for (const product of products[kind]) {
      if (!catalogMatches(product, { shop: activeShop, categoryId: selectedCategory, search: $("shopSearch").value, categories })) continue;
      count++;
      const card = element("article", undefined, "product-card");
      const info = element("div", undefined, "product-info");
      card.append(image(product.image, product.title, "product-image"), info);
      info.append(element("h3", product.title, "product-title"), element("p", product.price, "product-price"));
      if (product.description) info.append(element("p", product.description, "product-description"));
      if (kind === "exclusive") {
        const add = button(catalogReady ? "Add to cart" : "Shop temporarily unavailable", () => addToCart(product), "btn btn-wishlist");
        add.disabled = !catalogReady || sending; info.append(add);
      } else {
        const url = safeURL(product.link);
        if (url) { const link = element("a", "Shop at retailer ↗", "btn btn-secondary"); link.href = url; link.target = "_blank"; link.rel = "noopener noreferrer"; info.append(link); }
      }
      grid.append(card);
    }
    if (!grid.children.length) grid.append(element("p", selectedCategory || $("shopSearch").value.trim() ? "No products match these filters." : "New items are on their way. Check back soon.", "muted"));
  }
  $("catalogResults").textContent = `${count} ${count === 1 ? "product" : "products"} in ${activeShop === "studio-ken" ? "Studio Ken" : "Sunnie Jae"}`;
}
async function loadCatalog() {
  const version = ++catalogLoad;
  $("catalogStatus").textContent = "Checking the latest shop selections…"; $("retryCatalog").hidden = true;
  try {
    const api = await deadline(client());
    const [catalog, categoryResult] = await Promise.allSettled([
      deadline(api.loadProducts()), deadline(Promise.resolve().then(() => api.loadShopCategories()))
    ]);
    if (version !== catalogLoad) return;
    categoriesAvailable = categoryResult.status === "fulfilled";
    if (!categoriesAvailable) reportCatalogError("categories", categoryResult.reason);
    if (catalog.status === "rejected") throw catalog.reason;
    products = catalog.value; categories = categoriesAvailable ? categoryResult.value : []; catalogReady = true;
    renderCategoryFilters();
    filterURL();
    $("catalogStatus").textContent = categoriesAvailable ? "" : "Category filters are temporarily unavailable. You can still shop and search all products in this shop.";
    $("retryCatalog").hidden = categoriesAvailable;
    for (const item of cart) { const latest = currentProduct(item.id); if (latest) Object.assign(item, latest, { id: String(latest.id) }); }
    persistCart();
  } catch (error) {
    if (version !== catalogLoad) return;
    reportCatalogError("products", error);
    catalogReady = false;
    $("catalogStatus").textContent = "The shop is temporarily unavailable. Your cart is saved; try again to check availability.";
    $("retryCatalog").hidden = false;
  }
  renderCatalog(); updateCart();
}
function reportCatalogError(stage, error) {
  console.error(`Shop ${stage} could not load`, { code: error?.code || "unknown", message: error?.message || String(error) });
}
function addToCart(product) {
  if (!catalogReady || sending) return;
  const existing = cart.find(item => String(item.id) === String(product.id));
  if (existing && existing.qty >= 99) { $("cartNotice").textContent = "You can request up to 99 of each item."; return; }
  if (!existing && cart.length >= 20) { $("cartNotice").textContent = "Your cart can contain up to 20 different items."; return; }
  if (existing) existing.qty++; else cart.push({ ...product, id: String(product.id), qty: 1 });
  $("requestConfirmation").hidden = true;
  $("requestStatus").textContent = "";
  $("cartNotice").textContent = `${product.title} added to your cart.`;
  persistCart(); updateCart();
}
function renderCart() {
  const list = $("wishlistItems"); list.replaceChildren();
  for (const item of cart) {
    const latest = currentProduct(item.id);
    const available = catalogReady && !!latest;
    const row = element("article", undefined, "wishlist-item"); const info = element("div", undefined, "wishlist-item-info");
    row.append(image(item.image, item.title, "wishlist-item-image"), info);
    info.append(element("h3", item.title, "wishlist-item-title"), element("p", latest?.price || item.price, "wishlist-item-price"));
    info.append(element("p", productShop(item) === "studio-ken" ? "Studio Ken" : "Sunnie Jae", "muted"));
    if (catalogReady && !latest) info.append(element("p", "This item is no longer available. Remove it to continue.", "unavailable"));
    const controls = element("div", undefined, "qty-controls");
    for (const [label, change] of [["−", -1], ["+", 1]]) {
      const control = button(label, () => { item.qty += change; persistCart(); updateCart(); });
      control.setAttribute("aria-label", `${change > 0 ? "Increase" : "Decrease"} quantity for ${item.title}`);
      control.dataset.action = change > 0 ? "increase" : "decrease";
      control.disabled = sending || (change < 0 ? item.qty <= 1 : item.qty >= 99) || !available;
      if (change > 0) controls.append(element("span", item.qty));
      controls.append(control);
    }
    const remove = button("Remove", () => { cart = cart.filter(product => product.id !== item.id); persistCart(); updateCart(); }, "remove-btn");
    remove.disabled = sending; remove.dataset.action = "remove";
    controls.append(remove); info.append(controls); list.append(row);
  }
  if (!cart.length) list.append(element("p", "Your cart is empty. Add something you love to get started.", "empty-wishlist"));
  $("saleRequestForm").hidden = !cart.length;
  $("checkoutFields").disabled = sending || !catalogReady || cart.some(item => !currentProduct(item.id));
  if (accountBusy) $("checkoutFields").disabled = true;
  updateAccountControls();
}
function openModal(id) {
  document.querySelectorAll("dialog[open]").forEach(dialog => dialog.close());
  lastTrigger = document.activeElement;
  $(id).showModal();
  if (id === "wishlistModal") { renderCart(); loadAccount(); }
  if (id === "requestsModal") loadRequests();
}
function closeModal(id) { $(id).close(); lastTrigger?.focus?.(); }
async function submitRequest(event) {
  event.preventDefault();
  if (sending || accountBusy || !cart.length || !catalogReady) return;
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  sending = true; $("requestConfirmation").hidden = true; $("requestStatus").textContent = "Checking your items…";
  renderCatalog(); renderCart();
  let waiting;
  try {
    const api = await deadline(client());
    const latest = await deadline(api.loadProducts());
    products = latest;
    if (cart.some(item => !currentProduct(item.id))) throw new Error("unavailable-item");
    const request = {
      name: form.elements.customerName.value.trim() || "Guest customer",
      email: form.elements.email.value.trim(), message: form.elements.message.value.trim(),
      items: cart.map(item => ({ productId: String(item.id), title: currentProduct(item.id).title.slice(0, 200), quantity: item.qty }))
    };
    $("requestStatus").textContent = "Saving your request…";
    // Do not time out an uncertain write and invite a second submission.
    waiting = setTimeout(() => { $("requestStatus").textContent = "Still waiting for confirmation. Check your connection and keep this tab open; your cart is safe."; }, 15000);
    const saved = await api.saveSaleRequest(request);
    clearTimeout(waiting);
    cart = []; persistCart(); form.reset(); updateCart();
    $("requestStatus").textContent = "";
    $("cartNotice").textContent = "Request received! Open My requests to follow its progress.";
    $("confirmationReference").textContent = `Request reference: ${saved.id}`;
    $("requestConfirmation").hidden = false; $("requestConfirmation").focus();
  } catch (error) {
    $("requestStatus").textContent = error.message === "unavailable-item"
      ? "An item is no longer available. Remove it from your cart to continue."
      : "Your request could not be confirmed. Your cart is saved. Check My requests before trying again.";
  } finally { clearTimeout(waiting); sending = false; renderCatalog(); renderCart(); }
}
function updateAccountControls() {
  const locked = accountBusy || sending;
  $("accountFields").disabled = locked;
  $("customerAccountForm").elements.emailUpdates.disabled = locked || !accountState.emailEnabled;
  for (const id of ["saveCustomerPreference", "verifyCustomerEmail", "refreshCustomerAccount", "logoutCustomer"]) $(id).disabled = locked;
  $("customerEmailPreference").disabled = locked || (!accountState.emailEnabled && !accountState.emailUpdates);
}
function renderAccount() {
  const signedIn = !!accountState.user;
  $("cartAccount").querySelector("summary").textContent = signedIn ? "Your account · saved requests & email updates" : "Sign up to save your order and get email updates";
  $("customerAccountForm").hidden = signedIn; $("signedInAccount").hidden = !signedIn;
  $("emailAvailability").textContent = accountState.emailEnabled
    ? "Email updates are optional and require a verified email address."
    : "Email updates aren’t available yet. You can still save your requests to an account.";
  $("customerEmailPreference").checked = accountState.emailUpdates;
  if (!accountState.emailEnabled) $("customerAccountForm").elements.emailUpdates.checked = false;
  $("customerAccountIdentity").textContent = signedIn ? `Signed in as ${accountState.user.email}` : "";
  $("customerVerificationNote").textContent = signedIn && !accountState.user.verified ? "Verify your email before receiving order updates. Then use Refresh account." : "";
  $("verifyCustomerEmail").hidden = !signedIn || accountState.user.verified;
  $("checkoutIdentityNote").textContent = signedIn ? "Your requests are saved to your account. Sign in on another device to find them in My requests." : "Guest requests are linked to this browser. Sign up above to keep them across devices, or continue as a guest.";
  const field = $("saleRequestForm").elements.email;
  if (autoEmail && field.value === autoEmail) field.value = "";
  autoEmail = signedIn ? accountState.user.email : "";
  if (!field.value && autoEmail) field.value = autoEmail;
  updateAccountControls();
}
async function loadAccount() {
  const version = ++accountLoad;
  try {
    const loaded = await deadline(client().then(api => api.customerAccount()));
    if (version !== accountLoad) return false;
    accountState = loaded; renderAccount(); return true;
  } catch { if (version === accountLoad) $("customerAccountStatus").textContent = "Account options could not load. Check your connection; you can still browse and request as a guest."; return false; }
}
function accountError(error) {
  const messages = {
    "auth/email-already-in-use": "That email already has an account. Use Sign in instead. Guest requests are kept when creating a new account, not when switching to an existing one.",
    "auth/credential-already-in-use": "That email already has an account. Use Sign in instead.",
    "auth/invalid-credential": "The email or password is incorrect.",
    "auth/weak-password": "Choose a stronger password (at least six characters).",
    "auth/operation-not-allowed": "Account sign-up is unavailable right now. You can continue as a guest.",
    "auth/too-many-requests": "Too many attempts. Please wait a few minutes and try again.",
    "auth/network-request-failed": "Could not connect. Check your connection and try again."
  };
  return messages[error.code] || error.message || "The account update could not be completed.";
}
async function accountAction(operation, success) {
  if (accountBusy || sending) return;
  accountBusy = true; accountLoad++; renderCart(); $("customerAccountStatus").textContent = "Working…";
  try {
    const api = await deadline(client()); await deadline(operation(api));
    requestLoad++; $("myRequestsList").replaceChildren();
    const refreshed = await loadAccount(); $("customerAccountStatus").textContent = refreshed ? success : `${success} Account details could not refresh; try Refresh account or reload.`;
  } catch (error) { await loadAccount(); $("customerAccountStatus").textContent = accountError(error); }
  finally { accountBusy = false; $("customerAccountForm").elements.accountPassword.value = ""; renderCart(); }
}
async function loadRequests() {
  const version = ++requestLoad;
  $("requestsStatus").textContent = "Loading your requests…"; $("refreshRequests").disabled = true; $("myRequestsList").replaceChildren();
  try {
    const requests = await deadline(client().then(api => api.loadMyRequests()));
    if (version !== requestLoad) return;
    for (const request of requests) {
      const card = element("article", undefined, "saved-request");
      card.append(element("h3", stateLabels[request.status] || "In review"), element("p", `Reference: ${request.id}`, "request-reference"));
      if (request.createdAt?.toDate) card.append(element("p", request.createdAt.toDate().toLocaleString(), "muted"));
      const items = element("ul");
      for (const item of request.items || []) items.append(element("li", `${item.title} × ${item.quantity}`));
      card.append(items);
      if (request.message) card.append(element("p", `Your notes: ${request.message}`));
      if (request.shopMessage) { const reply = element("div", undefined, "shop-reply"); reply.append(element("h4", "From the shop"), element("p", request.shopMessage)); card.append(reply); }
      $("myRequestsList").append(card);
    }
    $("requestsStatus").textContent = requests.length ? "" : "No requests from this browser yet. Your saved requests will appear here.";
  } catch (error) { if (version === requestLoad) $("requestsStatus").textContent = error.code === "failed-precondition"
    ? "Your request history is being prepared. Try Refresh requests again shortly."
    : "We couldn’t load your requests. Check your connection and try Refresh requests."; }
  finally { if (version === requestLoad) $("refreshRequests").disabled = false; }
}
function init() {
  $("shopSearch").value = new URLSearchParams(location.search).get("q") || "";
  renderShop(); renderCategoryFilters(); loadCart(); renderCatalog(); updateCart();
  $("switchShop").addEventListener("click", () => {
    activeShop = activeShop === "studio-ken" ? "sunnie-jae" : "studio-ken";
    selectedCategory = ""; $("shopSearch").value = "";
    renderShop(); renderCategoryFilters(); renderCatalog(); filterURL();
  });
  $("shopSearch").addEventListener("input", () => { renderCatalog(); filterURL(); });
  $("clearShopFilters").addEventListener("click", () => { selectedCategory = ""; $("shopSearch").value = ""; renderCategoryFilters(); renderCatalog(); filterURL(); });
  $("wishlistBtn").addEventListener("click", () => openModal("wishlistModal"));
  $("requestsBtn").addEventListener("click", () => openModal("requestsModal"));
  $("infoBtn").addEventListener("click", () => openModal("infoModal"));
  for (const [id, close] of [["wishlistModal", "closeWishlist"], ["infoModal", "closeInfo"], ["requestsModal", "closeRequests"]]) {
    $(close).addEventListener("click", () => closeModal(id));
    $(id).addEventListener("click", event => { if (event.target === $(id)) { const box = $(id).getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) closeModal(id); } });
  }
  $("saleRequestForm").addEventListener("submit", submitRequest);
  $("retryCatalog").addEventListener("click", loadCatalog);
  $("refreshRequests").addEventListener("click", loadRequests);
  $("viewSavedRequest").addEventListener("click", () => openModal("requestsModal"));
  $("continueShopping").addEventListener("click", () => closeModal("wishlistModal"));
  $("customerAccountForm").addEventListener("submit", event => {
    event.preventDefault(); const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const email = form.elements.accountEmail.value.trim(); const password = form.elements.accountPassword.value;
    const updates = accountState.emailEnabled && form.elements.emailUpdates.checked;
    accountAction(api => accountMode === "signup" ? api.registerCustomer(email, password, updates) : api.loginCustomer(email, password),
      accountMode === "signup" ? "Account created! Your guest requests are saved. Check your inbox to verify your email." : "Signed in. Find your account’s saved requests in My requests.");
  });
  $("accountMode").addEventListener("click", () => {
    accountMode = accountMode === "signup" ? "signin" : "signup";
    $("accountHeading").textContent = accountMode === "signup" ? "Create your shop account" : "Sign in to your shop account";
    $("accountSubmit").textContent = accountMode === "signup" ? "Sign up & save my requests" : "Sign in";
    $("accountMode").textContent = accountMode === "signup" ? "Already have an account? Sign in" : "New here? Sign up";
    $("existingAccountNote").hidden = accountMode !== "signin"; $("resetCustomerPassword").hidden = accountMode !== "signin";
    $("customerAccountForm").elements.emailUpdates.closest("label").hidden = accountMode !== "signup";
    $("customerAccountForm").elements.accountPassword.autocomplete = accountMode === "signup" ? "new-password" : "current-password";
  });
  $("saveCustomerPreference").addEventListener("click", () => {
    const enabled = $("customerEmailPreference").checked;
    accountAction(api => api.saveEmailPreference(enabled), enabled ? "Email preference saved. Verify your address to receive order updates when available." : "Order email updates turned off.");
  });
  $("verifyCustomerEmail").addEventListener("click", () => accountAction(api => api.verifyCustomerEmail(), "Verification email sent. Check your inbox, then Refresh account."));
  $("refreshCustomerAccount").addEventListener("click", () => accountAction(api => api.refreshCustomerAccount(), "Account refreshed."));
  $("logoutCustomer").addEventListener("click", () => accountAction(async api => {
    await api.logoutCustomer(); accountState = { user: null, emailEnabled: accountState.emailEnabled, emailUpdates: false }; renderAccount();
  }, "Signed out. Sign in again to see your account’s requests."));
  $("resetCustomerPassword").addEventListener("click", () => {
    const email = $("customerAccountForm").elements.accountEmail.value;
    accountAction(api => api.resetCustomerPassword(email), "If an account exists for that email, a password reset email has been sent.");
  });
  loadCatalog();
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
