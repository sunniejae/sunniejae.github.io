// =========================
// MEMBER DATA (PLANETS)
// =========================
const MEMBERS = {
  SUMIN: {
    name: 'SUMIN',
    colors: {
      primary: '#F257BD',
      secondary: '#D263F4',
      accent: '#FAECF5',
      dark: '#660047',
      third: '#62B6CB'
    },
    description: 'Quick and clever! You match with SUMIN.'
  },
  SIEUN: {
    name: 'SIEUN',
    colors: {
      primary: '#C0B6EB',
      secondary: '#B3A0C3',
      accent: '#F2F3F4',
      dark: '#390062',
      third: '#187795'
    },
    description: 'Charming and radiant! You match with SIEUN.'
  },
 
  ISA: {
    name: 'ISA',
    colors: {
      primary: '#9BA7C0',
      secondary: '#27233F',
      accent: '#F9F3F3',
      dark: '#0C0610',
      third: '#71F79F'
    },
    description: 'Bold and fearless! You match with ISA.'
  },
  YOON: {
    name: 'YOON',
    colors: {
      primary: '#1BCA21',
      secondary: '#A7DB5D',
      accent: '#F0F4F2',
      dark: '#004602',
      third: '#62466B'
    },
    description: 'Expansive and confident! You match with YOON.'
  },
  J: {
    name: 'J',
    colors: {
      primary: '#880D1E',
      secondary: '#DD2D4A',
      accent: '#F2F2F3',
      dark: '#6B0505',
      third: '#642CA9'
    },
    description: 'Thoughtful and composed! You match with J.'
  }
};

// =========================
// QUIZ DATA
// =========================
const QUIZ_DATA = [
  {
    question: 'Pick a vibe:',
    answers: [
      { text: 'Fast & clever', members: ['SUMIN'] },
      { text: 'Soft & charming', members: ['SIEUN'] },
      { text: 'Bold & intense', members: ['ISA'] },
      { text: 'Big & confident', members: ['YOON'] },
      { text: 'Quiet & cool', members: ['J'] }
    ]
  }
];

// =========================
// PRODUCTS (MULTI-VENDOR)
// =========================
const PRODUCTS = [
  // =====================
  // EXCLUSIVES (Wishlist)
  // =====================
  {
    id: 'core-keychain',
    name: 'Core Symbol Keychain',
    category: 'Exclusive',
    imageFormat: 'keychain'
  },
  {
    id: 'phone-case',
    name: 'Planet Phone Case',
    category: 'Exclusive',
    imageFormat: 'phonecase'
  },

  // =====================
  // VENDOR COLLECTIONS
  // =====================

  // Redbubble example
  {
    id: 'stickers',
    name: 'Sticker Pack',
    category: 'Vendor',
    imageFormat: 'stickers',
    vendors: [
      {
        key: 'redbubble',
        label: 'Purchase on Redbubble',
        url: 'https://www.redbubble.com'
      }
    ]
  },

  // Etsy example
  {
    id: 'shirts',
    name: 'Graphic Shirt',
    category: 'Vendor',
    imageFormat: 'shirt',
    vendors: [
      {
        key: 'etsy',
        label: 'Buy on Etsy',
        url: 'https://www.etsy.com'
      }
    ]
  },

  // =====================
  // AMAZON COLLECTION
  // =====================
  {
    id: 'popsockets',
    name: 'PopSockets',
    category: 'Amazon Collection',
    imageFormat: 'popsocket',
    vendors: [
      {
        key: 'amazon',
        label: 'Purchase on Amazon',
        url: 'https://www.amazon.com/s?k=popsockets'
        // ⬆ replace with your actual affiliate / storefront link
      }
    ]
  }
];

// =========================
// STATE
// =========================
let currentBias = localStorage.getItem('planet-bias') || 'SUMIN';
let wishlist = [];

// =========================
// INIT
// =========================
document.addEventListener('DOMContentLoaded', () => {
  initMemberSelector();
  updateTheme();
  updateHeroImage();
  renderProducts();
});

// =========================
// THEME
// =========================
function updateTheme() {
  const t = MEMBERS[currentBias].colors;
  document.body.style.backgroundColor = t.accent;
  document.getElementById('wishlistFab').style.backgroundColor = t.third;
}

// =========================
// HERO IMAGE
// =========================
function updateHeroImage() {
  const img = document.getElementById('heroImg');
  if (!img) return;
  img.src = `/assets/hero-${currentBias}.png`;
  img.onerror = () => img.src = `/assets/blank-${currentBias}.png`;
}

// =========================
// MEMBER SELECTOR
// =========================
function initMemberSelector() {
  const el = document.getElementById('memberSelector');
  el.innerHTML = '';

  Object.keys(MEMBERS).forEach(key => {
    const btn = document.createElement('button');
    btn.textContent = key;
    if (key === currentBias) btn.classList.add('active');

    btn.onclick = () => {
      currentBias = key;
      localStorage.setItem('planet-bias', key);
      updateTheme();
      updateHeroImage();
      renderProducts();
      initMemberSelector();
    };

    el.appendChild(btn);
  });
}

// =========================
// PRODUCTS RENDER
// =========================
function renderProducts() {
  const grid = document.getElementById('productGrid');
  const theme = MEMBERS[currentBias].colors;
  grid.innerHTML = '';

  PRODUCTS.forEach(p => {
    const inWishlist = wishlist.some(w => w.id === p.id);

    const actions = p.vendors
      ? p.vendors.map(v => `
          <a href="${v.url}"
             target="_blank"
             rel="noopener"
             class="product-btn"
             style="background:${theme.third}">
             🛍 ${v.label}
          </a>
        `).join('')
      : `
        <button class="product-btn"
          style="background:${inWishlist ? '#ccc' : theme.primary}"
          ${inWishlist ? 'disabled' : ''}
          onclick="addToWishlist('${p.id}')">
          ${inWishlist ? 'In Wishlist' : '♡ Add to Wishlist'}
        </button>
      `;

    grid.innerHTML += `
      <div class="product-card">
        <div class="product-category" style="color:${theme.third}">
          ${p.category}
        </div>
        <h3 style="color:${theme.dark}">
          ${p.name}${p.vendors ? '' : ` – ${currentBias} ver.`}
        </h3>
        <img src="/assets/${p.imageFormat}-${currentBias}.png"
             onerror="this.src='/assets/blank-${currentBias}.png'">
        <div class="product-actions">
          ${actions}
        </div>
      </div>
    `;
  });
}

// =========================
// WISHLIST (EXCLUSIVES ONLY)
// =========================
function addToWishlist(id) {
  const item = PRODUCTS.find(p => p.id === id && !p.vendors);
  if (!item || wishlist.some(w => w.id === id)) return;
  wishlist.push(item);
  renderProducts();
  renderWishlist();
}

function renderWishlist() {
  const box = document.getElementById('wishlistItems');
  const theme = MEMBERS[currentBias].colors;

  box.innerHTML = wishlist.map(i => `
    <div class="wishlist-item">
      <strong style="color:${theme.dark}">
        ${i.name} – ${currentBias} ver.
      </strong>
      <small>${i.category}</small>
    </div>
  `).join('');
}
