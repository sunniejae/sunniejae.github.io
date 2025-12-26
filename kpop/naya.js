// ================= CONFIG =================
const MEMBERS = ['MAI', 'JEEMIN', 'KOKO', 'SARANG', 'JUNGEUN', 'SAEBI'];

const MEMBER_COLORS = {
  MAI: ['#FFB3BA', '#FF8FA3', '#FF6B9D', '#E63946'],
  JEEMIN: ['#C7CEEA', '#9BB1FF', '#6B8DD6', '#4A5F8C'],
  KOKO: ['#FFE5B4', '#FFB347', '#FF9F40', '#FF6F00'],
  SARANG: ['#D4F1C5', '#A8E6CF', '#7ECDA3', '#4A9B7F'],
  JUNGEUN: ['#E0BBE4', '#D291BC', '#957DAD', '#6B5B95'],
  SAEBI: ['#FFD6E8', '#FFB3D9', '#FF85C0', '#E75480']
};

const STORAGE_KEYS = {
  BIAS: 'kpop_shop_bias',
  WISHLIST: 'kpop_shop_wishlist'
};

// ================= STATE =================
let selectedBias = MEMBERS[0];
let wishlist = [];
let quizAnswers = {};

// ================= INIT =================
document.addEventListener('DOMContentLoaded', () => {
  loadFromStorage();
  initializeMemberButtons();
  initializeProducts();
  initializeQuiz();
  updateTheme();
  updateWishlistUI();
  attachEventListeners();
});

// ================= STORAGE =================
function loadFromStorage() {
  const savedBias = localStorage.getItem(STORAGE_KEYS.BIAS);
  if (MEMBERS.includes(savedBias)) selectedBias = savedBias;

  try {
    wishlist = JSON.parse(localStorage.getItem(STORAGE_KEYS.WISHLIST)) || [];
  } catch {
    wishlist = [];
  }
}

function saveBias() {
  localStorage.setItem(STORAGE_KEYS.BIAS, selectedBias);
}

function saveWishlist() {
  localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
}

// ================= UI BUILD =================
function initializeMemberButtons() {
  const container = document.getElementById('memberButtons');
  container.innerHTML = MEMBERS.map(m => `
    <button class="member-btn px-6 py-3 rounded-lg font-semibold text-white" data-member="${m}">
      ${m}
    </button>
  `).join('');
}

function initializeProducts() {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = PRODUCTS.map(p => `
    <div class="product-card bg-white rounded-xl shadow-xl overflow-hidden">
      <div class="aspect-square bg-gray-100 overflow-hidden">
        ${p.type === 'exclusive'
          ? `<img class="product-image" data-product="${p.id}" src="/assets/${p.imageFormat}-${selectedBias}.png"
                 onerror="this.src='/assets/blank-${selectedBias}.png'">`
          : `<div class="h-full flex items-center justify-center text-gray-400">🛍</div>`
        }
      </div>
      <div class="p-4">
        <h3 class="product-name text-lg font-bold Starbim-font">${p.name}</h3>
        <p class="product-member text-sm">${selectedBias} Version</p>
        <p class="product-price font-bold text-xl">${p.price}</p>
        ${p.type === 'exclusive'
          ? `<button class="product-btn add-to-wishlist w-full mt-3 px-4 py-2 rounded-lg text-white"
                     data-product-id="${p.id}">Add to Wishlist</button>`
          : `<a href="${p.redbubbleUrl}" target="_blank"
                class="product-btn block w-full mt-3 px-4 py-2 rounded-lg text-white text-center">
                Shop on Redbubble</a>`
        }
      </div>
    </div>
  `).join('');
}

// ================= QUIZ =================
function initializeQuiz() {
  quizAnswers = {};
  const container = document.getElementById('quizQuestions');
  container.innerHTML = QUIZ_QUESTIONS.map((q, qi) => `
    <div>
      <h3 class="font-bold mb-2">${q.question}</h3>
      ${q.options.map((o, oi) => `
        <button class="quiz-option w-full mb-2 p-3 rounded-lg text-white"
          data-question="${qi}" data-option="${oi}">
          ${o.text}
        </button>
      `).join('')}
    </div>
  `).join('');

  document.getElementById('submitQuizBtn').disabled = true;
}

// ================= EVENTS =================
function attachEventListeners() {
  document.addEventListener('click', e => {

    // Bias select
    if (e.target.classList.contains('member-btn')) {
      selectedBias = e.target.dataset.member;
      saveBias();
      updateTheme();
      updateProducts();
      updateWishlistUI();
    }

    // Wishlist add
    if (e.target.classList.contains('add-to-wishlist')) {
      addToWishlist(+e.target.dataset.productId);
    }

    // Wishlist remove
    if (e.target.closest('.remove-from-wishlist')) {
      removeFromWishlist(e.target.closest('button').dataset.id);
    }

    // Quiz answer
    if (e.target.classList.contains('quiz-option')) {
      handleQuizAnswer(+e.target.dataset.question, +e.target.dataset.option);
    }
  });

  document.getElementById('quizBtn').onclick = () => {
    initializeQuiz();
    updateTheme();
    openModal('quizModal');
  };

  document.getElementById('submitQuizBtn').onclick = calculateQuizResult;
  document.getElementById('wishlistBtn').onclick = () => openModal('wishlistModal');

  document.querySelectorAll('.modal').forEach(m =>
    m.onclick = e => e.target === m && closeModal(m.id)
  );
}

// ================= THEME =================
function updateTheme() {
  const c = MEMBER_COLORS[selectedBias];
  document.body.style.background = `linear-gradient(135deg, ${c[0]}, ${c[1]}, ${c[2]})`;

  document.querySelectorAll('.member-btn').forEach(b => {
    b.style.backgroundColor = b.dataset.member === selectedBias ? c[2] : c[0];
    b.style.opacity = b.dataset.member === selectedBias ? '1' : '0.6';
  });

  document.querySelectorAll('.product-btn').forEach(b => b.style.backgroundColor = c[1]);
  document.querySelectorAll('.product-name').forEach(t => t.style.color = c[3]);
}

// ================= WISHLIST =================
function addToWishlist(id) {
  const product = PRODUCTS.find(p => p.id === id);
  wishlist.push({ ...product, member: selectedBias, uid: Date.now() });
  saveWishlist();
  updateWishlistUI();
}

function removeFromWishlist(uid) {
  wishlist = wishlist.filter(i => i.uid != uid);
  saveWishlist();
  updateWishlistUI();
}

function updateWishlistUI() {
  const badge = document.getElementById('wishlistCount');
  badge.textContent = wishlist.length;
  badge.style.display = wishlist.length ? 'flex' : 'none';

  document.getElementById('requestOrderBtn').textContent =
    `Request Order (${wishlist.length} items)`;
}

// ================= MODALS =================
function openModal(id) {
  document.getElementById(id).classList.add('active');
}
function closeModal(id) {
  document.getElementById(id).classList.remove('active');
}
