/* ======================================================
   PRODUCT DATA
====================================================== */

const products = {
  exclusive: [
    {
      id: 1,
      title: "Astrology Planner: 2026",
      price: "$50",
      image: "https://sunniejae.blob.core.windows.net/sunniejae/assets/shop/journalsigns.png",
      type: "exclusive",
      description: "A guided astrology planner designed for journaling based on transits, and reflection."
    },
    {
      id: 2,
      title: "Personalized Album Keychain",
      price: "$25",
      image: "https://sunniejae.blob.core.windows.net/sunniejae/assets/shop/comingsoon.png",
      type: "exclusive",
      description: "Custom keychain inspired by your favorite album or artist."
    },
    {
      id: 3,
      title: "Tarot Reading",
      price: "TBD",
      image: "https://sunniejae.blob.core.windows.net/sunniejae/assets/shop/tarotreading.png",
      type: "exclusive",
      description: "One-on-one intuitive tarot reading tailored to your question."
    },
    {
      id: 4,
      title: "But Just One - Sakura Meme Shirt",
      price: "$30",
      image: "https://sunniejae.blob.core.windows.net/sunniejae/assets/shop/JUSTONE.png",
      type: "exclusive"
    }
  ],
  direct: [
    {
      id: 5,
      title: "Going Mental: A Tour Through the Mind of a Girl Named Lisa",
      price: "$3.33 on Kindle | $5.55 in Paperback",
      image: "https://sunniejae.blob.core.windows.net/sunniejae/assets/shop/goingmental2.png",
      type: "direct",
      description: "A surreal, introspective poetry collection.",
      link: "https://www.amazon.com/dp/B0GB5KCGRJ/"
    },
    {
      id: 6,
      title: "Sunnie Jae PopSocket",
      price: "$9.99",
      image: "https://sunniejae.blob.core.windows.net/sunniejae/assets/shop/sunniejaepopsocket.png",
      type: "direct",
      description: "Official Pop Socket Brand - Sunnie Jae Logo.",
      link: "https://www.amazon.com/dp/B0FJKGT8YN"
    },
    {
      id: 7,
      title: "Girl Dinner T Shirt",
      price: "$20",
      image: "https://sunniejae.blob.core.windows.net/sunniejae/assets/shop/girldinnershirt.png",
      type: "direct",
      description: "Comfort tee inspired by the Girl Dinner phenomenon.",
      link: "https://amzn.to/4smpp8z"
    },
    {
      id: 8,
      title: "Spaghetti Le Sserafim Sticker Pack",
      price: "$8.99",
      image: "https://sunniejae.blob.core.windows.net/sunniejae/assets/shop/spaghetti- EUNCHAE.png",
      type: "direct",
      description: "K-pop inspired sticker pack.",
      link: "https://www.redbubble.com/shop/ap/176087573"
    }
  ]
};

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
  wishlist = saved ? JSON.parse(saved) : [];

  wishlist = wishlist.map(item => ({
    ...item,
    qty: Number(item.qty) || 1
  }));
}

/* ======================================================
   HUBSPOT SYNC
====================================================== */

function getWishlistText() {
  if (!wishlist.length) return '';

  return wishlist
    .map(item => `${item.title} (x${item.qty})`)
    .join(" | ");
}

function syncWishlistToHubSpot() {
  const iframe = document.querySelector("#hubspotForm iframe");
  if (!iframe) return;

  const value = getWishlistText();

  const interval = setInterval(() => {
    try {
      const doc = iframe.contentWindow.document;
      const field = doc.querySelector('input[name="wishlist_items"]');

      if (field) {
        field.value = value;
        clearInterval(interval);
      }
    } catch {
      // iframe not ready yet
    }
  }, 100);
}

/* ======================================================
   INIT
====================================================== */

function init() {
  loadWishlist();
  renderProducts();
  updateWishlistCount();
  attachEventListeners();
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
    <img class="product-image" src="${product.image}" alt="${product.title}">
    <div class="product-info">
      <div class="product-title">${product.title}</div>
      <div class="product-price">${product.price}</div>
      ${product.description ? `<div class="product-description">${product.description}</div>` : ''}
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
    link.href = product.link;
    link.target = "_blank";
    actions.appendChild(link);
  }

  return card;
}

/* ======================================================
   WISHLIST LOGIC
====================================================== */

function addToWishlist(product) {
  const existing = wishlist.find(item => item.id === product.id);

  if (existing) {
    existing.qty += 1;
  } else {
    wishlist.push({ ...product, qty: 1 });
  }

  saveWishlist();
  updateWishlistCount();
  syncWishlistToHubSpot();
}

function removeFromWishlist(id) {
  wishlist = wishlist.filter(item => item.id !== id);
  saveWishlist();
  updateWishlistCount();
  renderWishlist();
  syncWishlistToHubSpot();
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
      <img src="${item.image}" class="wishlist-item-image" alt="${item.title}">
      <div class="wishlist-item-info">
        <div class="wishlist-item-title">${item.title}</div>
        <div class="wishlist-item-price">${item.price}</div>
        <div class="wishlist-item-description">${item.description}</div>

        <div class="qty-controls">
          <button onclick="updateQty(${item.id}, -1)">−</button>
          <span>${item.qty}</span>
          <button onclick="updateQty(${item.id}, 1)">+</button>
          <button class="remove-btn" onclick="removeFromWishlist(${item.id})">Remove</button>
        </div>
      </div>
    `;

    wishlistContainer.appendChild(div);
  });
}

/* ======================================================
   MODALS
====================================================== */

function openModal(id) {
  document.getElementById(id).classList.add("active");

  if (id === "wishlistModal") {
    renderWishlist();
    syncWishlistToHubSpot();
  }
}

function closeModal(id) {
  document.getElementById(id).classList.remove("active");
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
