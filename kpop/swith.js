/* =========================
   MEMBER DATA
========================= */
const MEMBERS = {
  SUMIN: {
    name: 'SUMIN',
    colors: {
      primary: '#f257bd',
      secondary: '#d263f4',
      accent: '#faecf5',
      dark: '#660047',
      third: '#62B6CB'
    },
    description: 'Bold and energetic! You match with SUMIN, someone who brings passion and excitement to everything they do.'
  },
  SIEUN: {
    name: 'SIEUN',
    colors: {
      primary: '#b3a0c3',
      secondary: '#c0b6eb',
      accent: '#f2f3f4',
      dark: '#390062',
      third: '#2F9C95'
    },
    description: 'Elegant and mysterious! You match with SIEUN, someone who captivates with grace and thoughtful charm.'
  },
  ISA: {
    name: 'ISA',
    colors: {
      primary: '#413a6f',
      secondary: '#7f8eca',
      accent: '#f2f0f0',
      dark: '#010d38',
      third: '#FF7477'
    },
    description: 'Fierce and confident! You match with ISA, someone who leads with strength and determination.'
  },
  SEEUN: {
    name: 'SEEUN',
    colors: {
      primary: '#5c9bf3',
      secondary: '#6bb6f5',
      accent: '#eff2f3',
      dark: '#012647',
      third: '#DE1A1A'
    },
    description: 'Bright and optimistic! You match with SEEUN, someone who spreads joy and positive energy everywhere.'
  },
  YOON: {
    name: 'YOON',
    colors: {
      primary: '#1bca21',
      secondary: '#a7db5d',
      accent: '#f0f4f2', // FIXED
      dark: '#004602',
      third: '#62466B'
    },
    description: 'Steady and reliable! You match with YOON, someone who brings warmth and stability to any situation.'
  },
  J: {
    name: 'J',
    colors: {
      primary: '#f25956',
      secondary: '#f2a8c2',
      accent: '#f2f2f3',
      dark: '#6b0505',
      third: '#642CA9'
    },
    description: 'Fresh and unique! You match with J, someone who stands out with their creative and refreshing personality.'
  }
};

/* =========================
   QUIZ DATA
========================= */
const QUIZ_DATA = [
  {
    question: "What's your favorite color?",
    answers: [
      { text: "Red", members: ['SUMIN'] },
      { text: "Blue", members: ['SIEUN'] },
      { text: "Yellow", members: ['ISA'] },
      { text: "Green", members: ['SEEUN'] },
      { text: "Purple", members: ['YOON'] },
      { text: "Pink", members: ['J'] }
    ]
  },
  {
    question: "Are you more...",
    answers: [
      { text: "Introvert", members: ['SIEUN'] },
      { text: "Extrovert", members: ['SUMIN', 'ISA', 'SEEUN', 'YOON', 'J'] }
    ]
  },
  {
    question: "Which describes you better?",
    answers: [
      { text: "Down to earth", members: ['YOON', 'J'] },
      { text: "Head in the clouds", members: ['SUMIN', 'SIEUN', 'ISA', 'SEEUN'] }
    ]
  },
  {
    question: "Do you follow your...",
    answers: [
      { text: "Head", members: ['SIEUN', 'YOON'] },
      { text: "Heart", members: ['SUMIN', 'ISA', 'SEEUN', 'J'] }
    ]
  },
  {
    question: "Which appeals to you more?",
    answers: [
      { text: "Order", members: ['SIEUN', 'YOON', 'J'] },
      { text: "Chaos", members: ['SUMIN', 'ISA', 'SEEUN'] }
    ]
  },
  {
    question: "Pick your favorite animal:",
    answers: [
      { text: "Fox", members: ['SUMIN'] },
      { text: "Bear", members: ['SIEUN'] },
      { text: "Cat", members: ['ISA'] },
      { text: "Dog", members: ['SEEUN'] },
      { text: "Cheetah", members: ['YOON'] },
      { text: "Bunny", members: ['J'] }
    ]
  }
];

/* =========================
   PRODUCTS
========================= */
const PRODUCTS = [
  {
    id: 'lightstick-keychain',
    name: 'Lightstick Keychain',
    type: 'exclusive',
    category: 'SunnieJae Exclusive',
    description: 'Adorable mini lightstick keychain featuring your bias',
    imageFormat: 'lightstickkeychain'
  },
  {
    id: 'phone-case',
    name: 'Phone Case',
    type: 'exclusive',
    category: 'SunnieJae Exclusive',
    description: 'Custom phone case with exclusive bias design',
    imageFormat: 'phonecase'
  },
  {
    id: 'animal-keychain',
    name: 'Animal Icon Keychain',
    type: 'exclusive',
    category: 'SunnieJae Exclusive',
    description: 'Cute animal icon representing your bias',
    imageFormat: 'animalkeychain'
  }
];

/* =========================
   STATE
========================= */
let currentBias = localStorage.getItem('kpop-bias') || 'SUMIN';
let wishlist = [];
let quizStep = 0;
let quizAnswers = [];

/* =========================
   INIT
========================= */
document.addEventListener('DOMContentLoaded', () => {
  initMemberSelector();
  renderProducts();
  updateTheme();
  updateHeroImage();
});

/* =========================
   THEME
========================= */
function updateTheme() {
  const theme = MEMBERS[currentBias].colors;
  document.body.style.backgroundColor = theme.accent;

  const header = document.getElementById('header');
  if (header) {
    header.style.background = `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`;
  }

  document.querySelectorAll('.modal-title').forEach(el => {
    el.style.color = theme.primary;
  });
}

/* =========================
   HERO IMAGE
========================= */
function updateHeroImage() {
  const img = document.getElementById('heroImg');
  if (!img) return;

  img.onerror = null;
  img.src = `/kpop/assets/hero-${currentBias}.png`;
  img.onerror = () => {
    img.onerror = null;
    img.src = `/kpop/assets/blank.png`;
  };
}

/* =========================
   MEMBER SELECTOR
========================= */
function initMemberSelector() {
  const selector = document.getElementById('memberSelector');
  if (!selector) return;

  selector.innerHTML = '';
  Object.keys(MEMBERS).forEach(key => {
    const btn = document.createElement('button');
    btn.textContent = key;
    btn.className = 'member-btn';
    if (key === currentBias) btn.classList.add('active');

    btn.onclick = () => {
      currentBias = key;
      localStorage.setItem('kpop-bias', key);
      updateTheme();
      updateHeroImage();
      renderProducts();
      initMemberSelector();
    };

    selector.appendChild(btn);
  });
}

/* =========================
   PRODUCTS
========================= */
function renderProducts() {
  const grid = document.getElementById('productGrid');
  if (!grid) return;

  const theme = MEMBERS[currentBias].colors;
  grid.innerHTML = '';

  PRODUCTS.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';

    const img = `/kpop/assets/${product.imageFormat}-${currentBias}.png`;

    card.innerHTML = `
      <img src="${img}" onerror="this.src='/kpop/assets/blank.png'">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <button style="background:${theme.primary}" onclick="addToWishlist('${product.id}')">
        ♡ Add to Wishlist
      </button>
    `;

    grid.appendChild(card);
  });
}

/* =========================
   WISHLIST
========================= */
function addToWishlist(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product || wishlist.some(w => w.id === id)) return;

  wishlist.push(product);
}

/* =========================
   EMAIL LINK
========================= */
function generateMailto() {
  const name = document.getElementById('userName').value;
  const email = document.getElementById('userEmail').value;

  const list = wishlist.map((w, i) => `${i + 1}. ${w.name}`).join('\n');

  return `mailto:orders@sunniejae.com?subject=KPOP%20ORDER&body=Name:%20${name}%0AEmail:%20${email}%0A%0AWishlist:%0A${encodeURIComponent(list)}`;
}
