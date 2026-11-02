import { fallbackProducts } from "./products.js";

let products = fallbackProducts;
let firebaseClient;

/* ======================================================
   PRODUCT DATA
====================================================== */

/* ======================================================
   STATE
====================================================== */

let wishlist = [];

/* ======================================================
   STORAGE
====================================================== */

function saveWishlist() {
  localStorage.setItem("sj_wishlist", JSON.stringify(wishlist));
}

function loadWishlist() {
  const saved = localStorage.getItem("sj_wishlist");
  try { wishlist = saved ? JSON.parse(saved) : []; } catch { wishlist = []; }
  if (!Array.isArray(wishlist)) wishlist = [];

  wishlist = wishlist.filter(item => item && typeof item.title === "string" && ["string", "number"].includes(typeof item.id)).map(item => ({
    ...item,
    qty: Math.max(1, Math.min(99, Math.floor(Number(item.qty)) || 1))
  }));
}

/* ======================================================
   INIT
====================================================== */

async function init() {
  loadWishlist();
  renderProducts();
  updateWishlistCount();
  attachEventListeners();
  document.getElementById("saleRequestForm").addEventListener("submit", submitSaleRequest);
  try {
    firebaseClient = await import("./firebase.js");
    const saved = await firebaseClient.loadProducts();
    products = saved;
    renderProducts();
  } catch (error) {
    document.getElementById("catalogStatus").textContent = "Showing our standard catalog. Contact us to confirm availability.";
    console.warn("Firebase catalog unavailable", error.code);
  }
}

/* ======================================================
   PRODUCT RENDERING
====================================================== */

function renderProducts() {
  const exclusiveGrid = document.getElementById("exclusiveProducts");
  const directGrid = document.getElementById("directProducts");

  exclusiveGrid.innerHTML = "";
  directGrid.innerHTML = "";

  products.exclusive.forEach(p => exclusiveGrid.appendChild(createProductCard(p)));
  products.direct.forEach(p => directGrid.appendChild(createProductCard(p)));
}

function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";

  card.innerHTML = `
    <img class="product-image" src="${escapeHTML(safeURL(product.image))}" alt="${escapeHTML(product.title)}">
    <div class="product-info">
      <div class="product-title">${escapeHTML(product.title)}</div>
      <div class="product-price">${escapeHTML(product.price)}</div>
      ${product.description ? `<div class="product-description">${escapeHTML(product.description)}</div>` : ''}
      <div class="product-type">
        ${product.type === "exclusive" ? "Exclusive to Order" : "Direct Order"}
      </div>
      <div class="product-actions"></div>
    </div>
  `;

  const actions = card.querySelector(".product-actions");

  if (product.type === "exclusive") {
    const btn = document.createElement("button");
    btn.className = "btn btn-wishlist";
    btn.textContent = "Add to Wishlist";
    btn.addEventListener("click", () => addToWishlist(product));
    actions.appendChild(btn);
  } else {
    const link = document.createElement("a");
    link.className = "btn btn-secondary";
    link.textContent = "Order Now";
    link.href = safeURL(product.link);
    link.rel = "noopener noreferrer";
    link.target = "_blank";
    actions.appendChild(link);
  }

  return card;
}

/* ======================================================
   WISHLIST LOGIC
====================================================== */

function addToWishlist(product) {
  const existing = wishlist.find(item => String(item.id) === String(product.id));

  if (existing) {
    existing.qty = Math.min(99, existing.qty + 1);
  } else {
    wishlist.push({ ...product, qty: 1 });
  }

  saveWishlist();
  updateWishlistCount();

}

function removeFromWishlist(id) {
  wishlist = wishlist.filter(item => item.id !== id);
  saveWishlist();
  updateWishlistCount();
  renderWishlist();

}

function updateWishlistCount() {
  const el = document.getElementById("wishlistCount");
  el.textContent = wishlist.length;
  el.style.display = wishlist.length ? "flex" : "none";
}

/* ======================================================
   WISHLIST MODAL
====================================================== */
function renderWishlist() {
  const wishlistContainer = document.getElementById("wishlistItems");

  if (!wishlistContainer) {
    console.warn("wishlistItems container not found");
    return;
  }

  wishlistContainer.innerHTML = "";

  if (!wishlist.length) {
    wishlistContainer.innerHTML = `
      <p class="empty-wishlist">Your wishlist is empty.</p>
    `;
    return;
  }

  wishlist.forEach(item => {
    const div = document.createElement("div");
    div.className = "wishlist-item";

    div.innerHTML = `
      <img src="${escapeHTML(safeURL(item.image))}" class="wishlist-item-image" alt="${escapeHTML(item.title)}">
      <div class="wishlist-item-info">
        <div class="wishlist-item-title">${escapeHTML(item.title)}</div>
        <div class="wishlist-item-price">${escapeHTML(item.price)}</div>
        <div class="wishlist-item-description">${escapeHTML(item.description || "")}</div>

        <div class="qty-controls">
          <button data-action="decrease">−</button>
          <span>${item.qty}</span>
          <button data-action="increase">+</button>
          <button class="remove-btn" data-action="remove">Remove</button>
        </div>
      </div>
    `;

    div.querySelectorAll("[data-action]").forEach(button => button.addEventListener("click", () => {
      if (button.dataset.action === "remove") return removeFromWishlist(item.id);
      item.qty = Math.max(1, Math.min(99, item.qty + (button.dataset.action === "increase" ? 1 : -1)));
      saveWishlist(); renderWishlist();
    }));
    wishlistContainer.appendChild(div);
  });
}

/* ======================================================
   MODALS
====================================================== */

function openModal(id) {
  document.getElementById(id).classList.add("active");
  document.getElementById(id).setAttribute("aria-hidden", "false");

  if (id === "wishlistModal") {
    renderWishlist();

  }
}

function closeModal(id) {
  document.getElementById(id).classList.remove("active");
  document.getElementById(id).setAttribute("aria-hidden", "true");
}

/* ======================================================
   EVENTS
====================================================== */

function attachEventListeners() {
  document.getElementById("wishlistBtn")?.addEventListener("click", () => openModal("wishlistModal"));
  document.getElementById("closeWishlist")?.addEventListener("click", () => closeModal("wishlistModal"));
  document.getElementById("wishlistModal")?.addEventListener("click", e => {
    if (e.target.id === "wishlistModal") closeModal("wishlistModal");
  });

  document.getElementById("infoBtn")?.addEventListener("click", () => openModal("infoModal"));
  document.getElementById("closeInfo")?.addEventListener("click", () => closeModal("infoModal"));
  document.getElementById("infoModal")?.addEventListener("click", e => {
    if (e.target.id === "infoModal") closeModal("infoModal");
  });
}

/* ======================================================
   DOM READY
====================================================== */

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
}
function safeURL(value) {
  try { const url = new URL(value, location.href); return ["http:", "https:"].includes(url.protocol) ? url.href : ""; } catch { return ""; }
}
async function submitSaleRequest(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const status = document.getElementById("requestStatus");
  if (!wishlist.length) { status.textContent = "Add a product to your wishlist first."; return; }
  if (wishlist.length > 20) { status.textContent = "Please request at most 20 different products."; return; }
  const button = form.querySelector("button[type=submit]");
  button.disabled = true;
  status.textContent = "Sending your request…";
  try {
    firebaseClient ||= await import("./firebase.js");
    await firebaseClient.saveSaleRequest({
      name: form.elements.customerName.value.trim(),
      email: form.elements.email.value.trim(),
      message: form.elements.message.value.trim(),
      items: wishlist.map(item => ({ productId: String(item.id), title: String(item.title).slice(0, 200), quantity: item.qty }))
    });
    status.textContent = "Your request was saved! We’ll email you with next steps. No payment has been taken.";
    form.reset();
    wishlist = []; saveWishlist(); updateWishlistCount(); renderWishlist();
  } catch (error) {
    status.textContent = "Your request could not be saved. Please try again or email orders@sunniejae.com. Your wishlist is still here.";
    console.warn("Sale request failed", error.code);
  } finally { button.disabled = false; }
}
window.openModal = openModal;
