// ============================
// PRODUCT DATA
// ============================
const products = {
  exclusive: [
    {
      id: 1,
      title: "Astrology Planner: 2026",
      price: "$50",
      image: "assets/journalsigns.png",
      type: "exclusive",
      description: "A guided astrology planner designed for journaling based on transits, and reflection."
    },
    {
      id: 2,
      title: "Personalized Album Keychain",
      price: "$25",
      image: "assets/comingsoon.png",
      type: "exclusive",
      description: "Custom keychain inspired by your favorite album or artist."
    },
    {
      id: 3,
      title: "Tarot Reading",
      price: "TBD",
      image: "assets/tarotreading.png",
      type: "exclusive",
      description: "One-on-one intuitive tarot reading tailored to your question."
    },
    {
      id: 4,
      title: "But Just One - Sakura Meme Shirt",
      price: "$30",
      image: "assets/JUSTONE.png",
      type: "exclusive"
    }
  ],
  direct: [
    {
      id: 5,
      title: "Going Mental: A Tour Through the Mind of a Girl Named Lisa",
      price: "$3.33 on Kindle | $5.55 in Paperback",
      image: "assets/goingmental2.png",
      type: "direct",
      description: "A surreal, introspective poetry collection.",
      link: "https://www.amazon.com/dp/B0GB5KCGRJ/"
    },
    {
      id: 6,
      title: "Sunnie Jae PopSocket",
      price: "$9.99",
      image: "assets/sunniejaepopsocket.png",
      type: "direct",
      description: "Official Pop Socket Brand - Sunnie Jae Logo.",
      link: "https://www.amazon.com/dp/B0FJKGT8YN"
    },
    {
      id: 7,
      title: "Girl Dinner T Shirt",
      price: "$20",
      image: "assets/girldinnershirt.png",
      type: "direct",
      description: "Comfort tee inspired by the Girl Dinner phenomenon.",
      link: "https://amzn.to/4smpp8z"
    },
    {
      id: 8,
      title: "Spaghetti Le Sserafim Sticker Pack",
      price: "$8.99",
      image: "assets/spaghetti- EUNCHAE.png",
      type: "direct",
      description: "K-pop inspired sticker pack.",
      link: "https://www.redbubble.com/shop/ap/176087573"
    }
  ]
};

// ============================
// STATE
// ============================
let wishlist = [];

// ============================
// HELPERS
// ============================
function saveWishlist() {
  localStorage.setItem("sj_wishlist", JSON.stringify(wishlist));
}

function loadWishlist() {
  const saved = localStorage.getItem("sj_wishlist");
  wishlist = saved ? JSON.parse(saved) : [];

  // Ensure qty is always a number
  wishlist = wishlist.map(item => ({
    ...item,
    qty: Number(item.qty) || 1
  }));
}

function setWishlistHiddenField() {
  const wishlistField = document.querySelector('input[name="wishlist_items"]');
  if (!wishlistField) return;

  wishlistField.value = wishlist
    .map(item => `${item.title} (x${item.qty})`)
    .join(" | ");
}

// ============================
// INIT
// ============================
function init() {
  loadWishlist();
  renderProducts();
  updateWishlistCount();
  attachEventListeners();
}

// ============================
// RENDER PRODUCTS
// ============================
function renderProducts() {
  const exclusiveGrid = document.getElementById("exclusiveProducts");
  const directGrid = document.getElementById("directProducts");

  exclusiveGrid.innerHTML = "";
  directGrid.innerHTML = "";

  products.exclusive.forEach(p => exclusiveGrid.appendChild(createProductCard(p)));
  products.direct.forEach(p => directGrid.appendChild(createProductCard(p)));
}

// ============================
// PRODUCT CARD
// ============================
function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";

  const img = document.createElement("img");
  img.className = "product-image";
  img.src = product.image;
  img.alt = product.title;

  const info = document.createElement("div");
  info.className = "product-info";

  const title = document.createElement("h3");
  title.className = "product-title";
  title.textContent = product.title;

  const price = document.createElement("div");
  price.className = "product-price";
  price.textContent = product.price;

  info.appendChild(title);
  info.appendChild(price);

  if (product.description) {
    const desc = document.createElement("p");
    desc.className = "product-description";
    desc.textContent = product.description;
    info.appendChild(desc);
  }

  const type = document.createElement("div");
  type.className = "product-type";
  type.textContent = product.type === "exclusive" ? "Exclusive to Order" : "Direct Order";

  const actions = document.createElement("div");
  actions.className = "product-actions";

  if (product.type === "exclusive") {
    const wishlistBtn = document.createElement("button");
    wishlistBtn.className = "btn btn-wishlist";
    wishlistBtn.textContent = "Add to Wishlist";
    wishlistBtn.addEventListener("click", () => addToWishlist(product));
    actions.appendChild(wishlistBtn);
  } else {
    const orderBtn = document.createElement("a");
    orderBtn.className = "btn btn-secondary";
    orderBtn.textContent = "Order Now";
    orderBtn.href = product.link;
    orderBtn.target = "_blank";
    actions.appendChild(orderBtn);
  }

  info.appendChild(type);
  info.appendChild(actions);

  card.appendChild(img);
  card.appendChild(info);

  return card;
}

// ============================
// WISHLIST
// ============================
function addToWishlist(product) {
  const existing = wishlist.find(item => item.id === product.id);

  if (existing) {
    existing.qty = Number(existing.qty) + 1;
  } else {
    wishlist.push({
      ...product,
      qty: 1
    });
  }

  saveWishlist();
  updateWishlistCount();
  setWishlistHiddenField();
}

function removeFromWishlist(productId) {
  wishlist = wishlist.filter(item => item.id !== productId);
  saveWishlist();
  updateWishlistCount();
  renderWishlist();
  setWishlistHiddenField();
}

function updateWishlistCount() {
  const count = document.getElementById("wishlistCount");
  count.textContent = wishlist.length;
  count.style.display = wishlist.length ? "flex" : "none";
}

// ============================
// WISHLIST MODAL
// ============================
function renderWishlist() {
  const container = document.getElementById("wishlistItems");
  container.innerHTML = "";

  if (!wishlist.length) {
    container.innerHTML = '<div class="empty-wishlist">Your wishlist is empty.</div>';
    return;
  }

  wishlist.forEach(product => {
    const item = document.createElement("div");
    item.className = "wishlist-item";

    const img = document.createElement("img");
    img.className = "wishlist-item-image";
    img.src = product.image;
    img.alt = product.title;

    const info = document.createElement("div");
    info.className = "wishlist-item-info";

    const title = document.createElement("div");
    title.className = "wishlist-item-title";
    title.textContent = product.title;

    const price = document.createElement("div");
    price.className = "wishlist-item-price";
    price.textContent = product.price;

    info.appendChild(title);
    info.appendChild(price);

    if (product.description) {
      const desc = document.createElement("div");
      desc.className = "wishlist-item-description";
      desc.textContent = product.description;
      info.appendChild(desc);
    }

    // QTY CONTROLS
    const qtyControls = document.createElement("div");
    qtyControls.className = "qty-controls";

    const minusBtn = document.createElement("button");
    minusBtn.className = "remove-btn";
    minusBtn.textContent = "-";
    minusBtn.addEventListener("click", () => {
      product.qty = Math.max(1, Number(product.qty) - 1);
      saveWishlist();
      renderWishlist();
      setWishlistHiddenField();
    });

    const qtyDisplay = document.createElement("span");
    qtyDisplay.textContent = `Qty: ${product.qty}`;

    const plusBtn = document.createElement("button");
    plusBtn.className = "btn btn-secondary";
    plusBtn.textContent = "+";
    plusBtn.addEventListener("click", () => {
      product.qty = Number(product.qty) + 1;
      saveWishlist();
      renderWishlist();
      setWishlistHiddenField();
    });

    qtyControls.appendChild(minusBtn);
    qtyControls.appendChild(qtyDisplay);
    qtyControls.appendChild(plusBtn);

    info.appendChild(qtyControls);

    const removeBtn = document.createElement("button");
    removeBtn.className = "remove-btn";
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => removeFromWishlist(product.id));

    item.appendChild(img);
    item.appendChild(info);
    item.appendChild(removeBtn);

    container.appendChild(item);
  });
}

// ============================
// MODALS
// ============================
function openModal(id) {
  document.getElementById(id).classList.add("active");
  if (id === "wishlistModal") renderWishlist();
}

function closeModal(id) {
  document.getElementById(id).classList.remove("active");
}

// ============================
// EVENTS
// ============================
function attachEventListeners() {
  document.getElementById("wishlistBtn")?.addEventListener("click", () => openModal("wishlistModal"));
  document.getElementById("closeWishlist")?.addEventListener("click", () => closeModal("wishlistModal"));
  document.getElementById("wishlistModal")?.addEventListener("click", (e) => {
    if (e.target.id === "wishlistModal") closeModal("wishlistModal");
  });

  document.getElementById("infoBtn")?.addEventListener("click", () => openModal("infoModal"));
  document.getElementById("closeInfo")?.addEventListener("click", () => closeModal("infoModal"));
  document.getElementById("infoModal")?.addEventListener("click", (e) => {
    if (e.target.id === "infoModal") closeModal("infoModal");
  });

  // HubSpot form submit
  const orderForm = document.getElementById("orderForm");
  if (orderForm) {
    orderForm.addEventListener("submit", (e) => {
      setWishlistHiddenField();
    });
  }
}

// ============================
// DOM READY
// ============================
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
