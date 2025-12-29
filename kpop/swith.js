// =========================
// MEMBER DATA
// =========================
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
      accent: '#f0f4f2',
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

// =========================
// QUIZ DATA
// =========================
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
  }
];

// =========================
// PRODUCTS
// =========================
const PRODUCTS = [
  {
    id: 'lightstick-keychain',
    name: 'Lightstick Keychain',
    category: 'SunnieJae Exclusive',
    description: 'Adorable mini lightstick keychain featuring your bias',
    imageFormat: 'lightstickkeychain'
  },
  {
    id: 'phone-case',
    name: 'Phone Case',
    category: 'SunnieJae Exclusive',
    description: 'Custom phone case with exclusive bias design',
    imageFormat: 'phonecase'
  },
  {
    id: 'animal-keychain',
    name: 'Animal Icon Keychain',
    category: 'SunnieJae Exclusive',
    description: 'Cute animal icon representing your bias',
    imageFormat: 'animalkeychain'
  }
];

// =========================
// STATE
// =========================
let currentBias = localStorage.getItem('kpop-bias') || 'SUMIN';
let wishlist = [];
let quizStep = 0;
let quizAnswers = [];

// =========================
// INIT
// =========================
document.addEventListener('DOMContentLoaded', () => {
  initMemberSelector();
  renderProducts();
  updateTheme();
  updateHeroImage();

  document.getElementById('quizBtn')?.addEventListener('click', () => {
    showModal('quizModal');
    renderQuiz();
  });

  document.getElementById('wishlistFab')?.addEventListener('click', () => {
    showModal('wishlistModal');
    renderWishlist();
  });

  document.getElementById('userName')?.addEventListener('input', updateRequestButton);
  document.getElementById('userEmail')?.addEventListener('input', updateRequestButton);
});

// =========================
// THEME
// =========================
function updateTheme() {
  const theme = MEMBERS[currentBias].colors;
  document.body.style.backgroundColor = theme.accent;

  document.getElementById('header').style.background =
    `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`;

  document.querySelectorAll('.modal-title').forEach(el => {
    el.style.color = theme.primary;
  });

  document.getElementById('wishlistFab').style.backgroundColor = theme.third;
  document.getElementById('wishlistBadge').style.backgroundColor = theme.dark;
}

// =========================
// HERO IMAGE
// =========================
function updateHeroImage() {
  const img = document.getElementById('heroImg');
  if (!img) return;

  img.onerror = null;
  img.src = `/kpop/assets/hero-${currentBias}.png`;
  img.onerror = () => {
    img.onerror = null;
    img.src = `/kpop/assets/blank-${currentBias}.png`;
  };
}

// =========================
// MEMBER SELECTOR
// =========================
function initMemberSelector() {
  const selector = document.getElementById('memberSelector');
  selector.innerHTML = '';

  Object.keys(MEMBERS).forEach(key => {
    const btn = document.createElement('button');
    btn.className = 'member-btn';
    btn.textContent = key;
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

// =========================
// PRODUCTS
// =========================
function renderProducts() {
  const grid = document.getElementById('productGrid');
  const theme = MEMBERS[currentBias].colors;
  grid.innerHTML = '';

  PRODUCTS.forEach(product => {
    const inWishlist = wishlist.some(w => w.id === product.id);

    const card = document.createElement('div');
    card.className = 'product-card';

    card.innerHTML = `
      <div class="product-image" style="background-color:${theme.accent}">
        <img src="/kpop/assets/${product.imageFormat}-${currentBias}.png"
             onerror="this.src='/kpop/assets/blank-${currentBias}.png'">
      </div>
      <div class="product-info">
        <div class="product-category" style="color:${theme.third}">
          ${product.category}
        </div>
        <h3 class="product-title" style="color:${theme.dark}">
          ${product.name}
        </h3>
        <p class="product-description">${product.description}</p>
        <button class="product-btn"
          style="background-color:${inWishlist ? '#ccc' : theme.primary}"
          ${inWishlist ? 'disabled' : ''}
          onclick="addToWishlist('${product.id}')">
          ♡ ${inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
        </button>
      </div>
    `;

    grid.appendChild(card);
  });
}

// =========================
// WISHLIST
// =========================
function addToWishlist(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product || wishlist.some(w => w.id === id)) return;

  wishlist.push(product);
  renderProducts();
  renderWishlist();
  updateWishlistBadge();
}

function renderWishlist() {
  const container = document.getElementById('wishlistItems');
  const theme = MEMBERS[currentBias].colors;

  if (!wishlist.length) {
    container.innerHTML = '<p class="empty-wishlist">Your wishlist is empty.</p>';
    return;
  }

  container.innerHTML = wishlist.map(item => `
    <div class="wishlist-item">
      <div class="wishlist-item-info">
        <div class="wishlist-item-name" style="color:${theme.dark}">
          ${item.name} – ${currentBias} ver.
        </div>
        <div class="wishlist-item-category">${item.category}</div>
      </div>
    </div>
  `).join('');
}

function updateWishlistBadge() {
  const badge = document.getElementById('wishlistBadge');
  badge.textContent = wishlist.length;
  badge.style.display = wishlist.length ? 'flex' : 'none';
}

// =========================
// QUIZ
// =========================
function renderQuiz() {
  const theme = MEMBERS[currentBias].colors;
  const q = QUIZ_DATA[quizStep];

  document.getElementById('quizQuestion').textContent = q.question;
  document.getElementById('quizProgress').textContent =
    `Question ${quizStep + 1} of ${QUIZ_DATA.length}`;

  const fill = document.getElementById('progressFill');
  fill.style.width = `${((quizStep + 1) / QUIZ_DATA.length) * 100}%`;
  fill.style.backgroundColor = theme.primary;

  const answers = document.getElementById('quizAnswers');
  answers.innerHTML = '';

  q.answers.forEach(answer => {
    const btn = document.createElement('button');
    btn.className = 'quiz-answer';
    btn.textContent = answer.text;
    btn.style.borderColor = theme.primary;

    btn.onmouseenter = () => btn.style.backgroundColor = theme.secondary;
    btn.onmouseleave = () => btn.style.backgroundColor = 'transparent';
    btn.onclick = () => handleQuizAnswer(answer);

    answers.appendChild(btn);
  });
}

function handleQuizAnswer(answer) {
  quizAnswers.push(answer.members);

  if (quizStep < QUIZ_DATA.length - 1) {
    quizStep++;
    renderQuiz();
    return;
  }

  const counts = {};
  quizAnswers.flat().forEach(m => counts[m] = (counts[m] || 0) + 1);
  const result = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];

  currentBias = result;
  localStorage.setItem('kpop-bias', result);

  hideModal('quizModal');
  resetQuiz();
  showQuizResult(result);
}

function showQuizResult(key) {
  const member = MEMBERS[key];
  const theme = member.colors;

  document.getElementById('resultMemberName').textContent = member.name;
  document.getElementById('resultDescription').textContent = member.description;
  document.getElementById('startShoppingBtn').style.backgroundColor = theme.primary;

  showModal('quizResultModal');

  setTimeout(() => {
    updateTheme();
    updateHeroImage();
    renderProducts();
    initMemberSelector();
  }, 100);
}

function resetQuiz() {
  quizStep = 0;
  quizAnswers = [];
}

// =========================
// EMAIL (WITH MEMBER + VERSION)
// =========================
function updateRequestButton() {
  const btn = document.getElementById('requestOrderBtn');
  const name = document.getElementById('userName').value;
  const email = document.getElementById('userEmail').value;
  const theme = MEMBERS[currentBias].colors;

  if (name && email) {
    btn.style.backgroundColor = theme.third;
    btn.style.pointerEvents = 'auto';
    btn.href = generateMailto();
  } else {
    btn.style.backgroundColor = '#ccc';
    btn.style.pointerEvents = 'none';
    btn.href = '#';
  }
}

function generateMailto() {
  const name = document.getElementById('userName').value;
  const email = document.getElementById('userEmail').value;

  const wishlistText = wishlist
    .map((item, i) => `${i + 1}. ${item.name} – ${currentBias} ver. (${item.category})`)
    .join('\n');

  return `mailto:orders@sunniejae.com?subject=${encodeURIComponent(
    'KPOP FANDOM SHOP ORDER'
  )}&body=${encodeURIComponent(
    `Name: ${name}
Email: ${email}
Matched Member: ${currentBias}

Wishlist:
${wishlistText}`
  )}`;
}

// =========================
// MODALS
// =========================
function showModal(id) {
  document.getElementById(id)?.classList.add('show');
}
function hideModal(id) {
  document.getElementById(id)?.classList.remove('show');
}
