// =========================
// MEMBER DATA
// =========================
const MEMBERS = {
  SUMIN: {
    name: "SUMIN",
    mbti: "ENTP",
    colors: {
      primary: "#F257BD",
      secondary: "#D263F4",
      accent: "#FAECF5",
      dark: "#660047",
      third: "#62B6CB"
    },
    description: "Quick, clever, and full of spark."
  },
  SIEUN: {
    name: "SIEUN",
    mbti: "ISFJ",
    colors: {
      primary: "#C0B6EB",
      secondary: "#B3A0C3",
      accent: "#F2F3F4",
      dark: "#390062",
      third: "#187795"
    },
    description: "Warm, thoughtful, and deeply caring."
  },
  ISA: {
    name: "ISA",
    mbti: "INTJ",
    colors: {
      primary: "#9BA7C0",
      secondary: "#27233F",
      accent: "#F9F3F3",
      dark: "#0C0610",
      third: "#71F79F"
    },
    description: "Focused, confident, and strategic."
  },
  YOON: {
    name: "YOON",
    mbti: "ESFJ",
    colors: {
      primary: "#1BCA21",
      secondary: "#A7DB5D",
      accent: "#F0F4F2",
      dark: "#004602",
      third: "#62466B"
    },
    description: "Bright, confident, and magnetic."
  },
  J: {
    name: "J",
    mbti: "ISTP",
    colors: {
      primary: "#880D1E",
      secondary: "#DD2D4A",
      accent: "#F2F2F3",
      dark: "#6B0505",
      third: "#642CA9"
    },
    description: "Calm, observant, and effortlessly cool."
  }
};

// =========================
// PRODUCTS
// =========================
const PRODUCTS = [
  {
    id: "keychain",
    name: "Symbol Keychain",
    category: "Exclusive",
    imageFormat: "keychain"
  },
  {
    id: "phonecase",
    name: "Planet Phone Case",
    category: "Exclusive",
    imageFormat: "phonecase"
  },
  {
    id: "stickers",
    name: "Sticker Pack",
    category: "Vendor",
    imageFormat: "stickers",
    vendors: [
      {
        label: "Purchase via Redbubble",
        url: "https://www.redbubble.com"
      }
    ]
  },
  {
    id: "popsockets",
    name: "PopSockets",
    category: "Amazon Collection",
    imageFormat: "popsocket",
    vendors: [
      {
        label: "Purchase via Amazon",
        url: "https://www.amazon.com/s?k=popsockets"
      }
    ]
  }
];

// =========================
// STATE
// =========================
let currentMember =
  localStorage.getItem("planet-bias") || Object.keys(MEMBERS)[0];

let wishlist = []; 
// item structure:
// {
//   productId,
//   productName,
//   member,
//   quantity
// }

// =========================
// INIT
// =========================
document.addEventListener("DOMContentLoaded", () => {
  initMemberSelector();
  updateTheme();
  updateHeroImage();
  renderProducts();
  renderWishlist();
});

// =========================
// THEME
// =========================
function updateTheme() {
  const t = MEMBERS[currentMember].colors;
  document.body.style.backgroundColor = t.accent;
  document.getElementById("wishlistFab").style.backgroundColor = t.third;
}

// =========================
// HERO IMAGE
// =========================
function updateHeroImage() {
  const img = document.getElementById("heroImg");
  if (!img) return;

  img.src = `/assets/hero-${currentMember}.png`;
  img.onerror = () =>
    (img.src = `/assets/blank-${currentMember}.png`);
}

// =========================
// MEMBER SELECTOR
// =========================
function initMemberSelector() {
  const el = document.getElementById("memberSelector");
  el.innerHTML = "";

  Object.keys(MEMBERS).forEach(key => {
    const btn = document.createElement("button");
    btn.className = "member-btn";
    btn.textContent = MEMBERS[key].name;
    if (key === currentMember) btn.classList.add("active");

    btn.onclick = () => {
      currentMember = key;
      localStorage.setItem("planet-bias", key);
      updateTheme();
      updateHeroImage();
      renderProducts();
      initMemberSelector();
    };

    el.appendChild(btn);
  });
}

// =========================
// PRODUCT GRID
// =========================
function renderProducts() {
  const grid = document.getElementById("productGrid");
  const theme = MEMBERS[currentMember].colors;
  grid.innerHTML = "";

  PRODUCTS.forEach(p => {
    const isVendor = !!p.vendors;

    grid.innerHTML += `
      <div class="product-card">
        <div class="product-category" style="color:${theme.third}">
          ${p.category}
        </div>

        <h3 style="color:${theme.dark}">
          ${p.name}${isVendor ? "" : ` – ${currentMember} ver.`}
        </h3>

        <img src="/assets/${p.imageFormat}-${currentMember}.png"
             onerror="this.src='/assets/blank-${currentMember}.png'">

        <div class="product-actions">
          ${
            isVendor
              ? p.vendors
                  .map(
                    v => `
                <a href="${v.url}"
                   target="_blank"
                   class="product-btn"
                   style="background:${theme.third}">
                   🛍 ${v.label}
                </a>
              `
                  )
                  .join("")
              : `
              <button class="product-btn"
                style="background:${theme.primary}"
                onclick="addToWishlist('${p.id}')">
                ♡ Add to Wishlist
              </button>
            `
          }
        </div>
      </div>
    `;
  });
}

// =========================
// WISHLIST LOGIC
// =========================
function addToWishlist(productId) {
  const product = PRODUCTS.find(
    p => p.id === productId && !p.vendors
  );
  if (!product) return;

  const existing = wishlist.find(
    i => i.productId === productId && i.member === currentMember
  );

  if (existing) {
    existing.quantity += 1;
  } else {
    wishlist.push({
      productId: product.id,
      productName: product.name,
      member: currentMember,
      quantity: 1
    });
  }

  renderWishlist();
}

// =========================
// RENDER WISHLIST
// =========================
function renderWishlist() {
  const box = document.getElementById("wishlistItems");
  if (!box) return;

  if (!wishlist.length) {
    box.innerHTML = "<p>Your wishlist is empty.</p>";
    return;
  }

  box.innerHTML = wishlist
    .map(
      (item, i) => `
    <div class="wishlist-item">
      <strong>
        ${item.productName} – ${MEMBERS[item.member].name} ver.
      </strong>
      <div style="display:flex; gap:0.5rem; margin-top:0.5rem;">
        <button onclick="changeQty(${i}, -1)">−</button>
        <span>Qty: ${item.quantity}</span>
        <button onclick="changeQty(${i}, 1)">+</button>
        <button onclick="removeItem(${i})">✕</button>
      </div>
    </div>
  `
    )
    .join("");
}

function changeQty(index, delta) {
  wishlist[index].quantity += delta;
  if (wishlist[index].quantity <= 0) {
    wishlist.splice(index, 1);
  }
  renderWishlist();
}

function removeItem(index) {
  wishlist.splice(index, 1);
  renderWishlist();
}

// =========================
// MAILTO ORDER
// =========================
function submitWishlistEmail() {
  if (!wishlist.length) {
    alert("Your wishlist is empty.");
    return;
  }

  const grouped = {};

  wishlist.forEach(item => {
    const memberName = MEMBERS[item.member].name;
    if (!grouped[memberName]) grouped[memberName] = [];
    grouped[memberName].push(item);
  });

  let bodyText = "Hello Sunnie Jae,%0D%0A%0D%0A";
  bodyText += "I would like to order the following items:%0D%0A%0D%0A";

  Object.keys(grouped).forEach(member => {
    bodyText += `${member} Version:%0D%0A`;
    grouped[member].forEach((item, i) => {
      bodyText += `  ${i + 1}. ${item.productName} (Qty: ${item.quantity})%0D%0A`;
    });
    bodyText += `%0D%0A`;
  });

  bodyText += "Thank you!";

  window.location.href = `mailto:orders@sunniejae.com?subject=${encodeURIComponent(
    "Wishlist Order Request"
  )}&body=${bodyText}`;
}
