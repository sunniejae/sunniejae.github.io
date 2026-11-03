import { fallbackProducts } from "./products.js";

const $ = id => document.getElementById(id);
let products = fallbackProducts;
let cart = [];
let catalogReady = false;
let sending = false;
let clientPromise;
let requestLoad = 0;
let lastTrigger;
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
  clientPromise ||= import("./firebase.js").catch(error => { clientPromise = undefined; throw error; });
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
function renderCatalog() {
  for (const [kind, gridId] of [["exclusive", "exclusiveProducts"], ["direct", "directProducts"]]) {
    const grid = $(gridId); grid.replaceChildren();
    for (const product of products[kind]) {
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
    if (!grid.children.length) grid.append(element("p", "New items are on their way. Check back soon.", "muted"));
  }
}
async function loadCatalog() {
  $("catalogStatus").textContent = "Checking the latest shop selections…"; $("retryCatalog").hidden = true;
  try {
    products = await deadline(client().then(api => api.loadProducts())); catalogReady = true;
    $("catalogStatus").textContent = "";
    for (const item of cart) { const latest = currentProduct(item.id); if (latest) Object.assign(item, latest, { id: String(latest.id) }); }
    persistCart();
  } catch {
    catalogReady = false;
    $("catalogStatus").textContent = "The shop is temporarily unavailable. Your cart is saved; try again to check availability.";
    $("retryCatalog").hidden = false;
  }
  renderCatalog(); updateCart();
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
}
function openModal(id) {
  document.querySelectorAll("dialog[open]").forEach(dialog => dialog.close());
  lastTrigger = document.activeElement;
  $(id).showModal();
  if (id === "wishlistModal") renderCart();
  if (id === "requestsModal") loadRequests();
}
function closeModal(id) { $(id).close(); lastTrigger?.focus?.(); }
async function submitRequest(event) {
  event.preventDefault();
  if (sending || !cart.length || !catalogReady) return;
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
  loadCart(); renderCatalog(); updateCart();
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
  loadCatalog();
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
