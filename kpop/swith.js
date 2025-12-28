// Member data 
const MEMBERS = {
  SUMIN: { 
    name: 'SUMIN', 
    colors: { primary: '#f257bd', secondary: '#d263f4', accent: '#faecf5', dark: '#660047', third: '#62B6CB' },
    description: 'Bold and energetic! You match with SUMIN, someone who brings passion and excitement to everything they do.'
  },
  SIEUN: { 
    name: 'SIEUN', 
    colors: { primary: '#b3a0c3', secondary: '#c0b6eb', accent: '#f2f3f4', dark: '#390062', third: '#2F9C95' },
    description: 'Elegant and mysterious! You match with SIEUN, someone who captivates with grace and thoughtful charm.'
  },
  ISA: { 
    name: 'ISA', 
    colors: { primary: '#413a6f', secondary: '#7f8eca', accent: '#f2f0f0', dark: '#010d38', third: '#FF7477' },
    description: 'Fierce and confident! You match with ISA, someone who leads with strength and determination.'
  },
  SEEUN: { 
    name: 'SEEUN', 
    colors: { primary: '#5c9bf3', secondary: '#6bb6f5', accent: '#eff2f3', dark: '#012647', third: '#DE1A1A' },
    description: 'Bright and optimistic! You match with SEEUN, someone who spreads joy and positive energy everywhere.'
  },
  YOON: { 
    name: 'YOON', 
    colors: { primary: '#1bca21', secondary: '#a7db5d', accent: '#f00f4f2', dark: '#004602', third: '#62466B' },
    description: 'Steady and reliable! You match with YOON, someone who brings warmth and stability to any situation.'
  },
  J: { 
    name: 'J', 
    colors: { primary: '#f25956', secondary: '#f2a8c2', accent: '#f2f2f3', dark: '#6b0505', third: '#642CA9' },
    description: 'Fresh and unique! You match with J, someone who stands out with their creative and refreshing personality.'
  },
};

// Quiz questions and answers
const QUIZ_DATA = [
  {
    question: "What's your favorite color?",
    answers: [
      { text: "Red", members: ['SUMIN',] },
      { text: "Blue", members: ['SIEUN'] },
      { text: "Yellow", members: ['ISA'] },
      { text: "Green", members: ['SEEUN'] },
      { text: "Purple", members: ['YOON'] },
      { text: "Pink", members: ['J'] },

    ]
  },
  {
    question: "Are you more...",
    answers: [
      { text: "Introvert", members: ['SIEUN',] },
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
      { text: "Order", members: ['SIEUN', 'YOON','J'] },
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
  },
  {
    question: "Which artist do you also follow?",
    answers: [
      { text: "NewJeans", members: ['SUMIN'] },
      { text: "aespa", members: ['SIEUN'] },
      { text: "IVE", members: ['ISA', 'YOON'] },
      { text: "ITZY", members: ['SEEUN', 'J'] }
    ]
  },
  {
    question: "Pick your favorite era:",
    answers: [
      { text: "Debut Era", members: ['SUMIN', 'ISA'] },
      { text: "First Comeback", members: ['SIEUN', 'SEEUN'] },
      { text: "Peak Era", members: ['YOON', 'J'] },
      { text: "Latest Release", members: ['SUMIN'] }
    ]
  }
];

// Product data
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
  },
  {
    id: 'comeback-stickers',
    name: 'Comeback Era Stickers',
    type: 'redbubble',
    category: 'Redbubble',
    description: 'Collection of comeback era themed stickers',
    imageFormat: 'stickers',
    redbubbleUrl: 'https://www.redbubble.com/people/sunniejae/shop?collections=comeback-stickers'
  },
  {
    id: 'autographics',
    name: 'Autographics',
    type: 'redbubble',
    category: 'Redbubble',
    description: 'Stylized autograph designs',
    imageFormat: 'autographics',
    redbubbleUrl: 'https://www.redbubble.com/people/sunniejae/shop?collections=autographics'
  },
  {
    id: 'hangul',
    name: 'Hangul Design',
    type: 'redbubble',
    category: 'Redbubble',
    description: 'Beautiful Hangul typography designs',
    imageFormat: 'hangul',
    redbubbleUrl: 'https://www.redbubble.com/people/sunniejae/shop?collections=hangul'
  }
];

// State
let currentBias = 'SUMIN';
let wishlist = [];
let quizStep = 0;
let quizAnswers = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  const savedBias = localStorage.getItem('kpop-bias');
  if (savedBias && MEMBERS[savedBias]) {
    currentBias = savedBias;
  }
  
  initMemberSelector();
  renderProducts();
  updateTheme();
  updateHeroImage();
  
  // Show order info modal on first visit
  if (!localStorage.getItem('order-info-seen')) {
    showModal('orderInfoModal');
  }
  
  // Event listeners
  document.getElementById('quizBtn').addEventListener('click', () => {
    showModal('quizModal');
    renderQuiz();
  });
  
  document.getElementById('wishlistFab').addEventListener('click', () => {
    showModal('wishlistModal');
    renderWishlist();
  });
  
  document.getElementById('closeOrderInfo').addEventListener('click', () => {
    hideModal('orderInfoModal');
    localStorage.setItem('order-info-seen', 'true');
  });
  
  document.getElementById('gotItBtn').addEventListener('click', () => {
    hideModal('orderInfoModal');
    localStorage.setItem('order-info-seen', 'true');
  });
  
  document.getElementById('closeQuiz').addEventListener('click', () => {
    hideModal('quizModal');
    resetQuiz();
  });
  
  document.getElementById('closeWishlist').addEventListener('click', () => {
    hideModal('wishlistModal');
  });
  
  document.getElementById('closeQuizResult').addEventListener('click', () => {
    hideModal('quizResultModal');
  });
  
  document.getElementById('startShoppingBtn').addEventListener('click', () => {
    hideModal('quizResultModal');
  });
});

// Initialize member selector
function initMemberSelector() {
  const selector = document.getElementById('memberSelector');
  selector.innerHTML = '';
  
  Object.entries(MEMBERS).forEach(([key, member]) => {
    const btn = document.createElement('button');
    btn.className = 'member-btn';
    btn.textContent = member.name;
    if (key === currentBias) {
      btn.classList.add('active');
    }
    
    btn.addEventListener('click', () => {
      currentBias = key;
      localStorage.setItem('kpop-bias', key);
      updateTheme();
      updateHeroImage();
      renderProducts();
      
      // Update button states
      document.querySelectorAll('.member-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
    
    selector.appendChild(btn);
  });
}

// Update theme colors
function updateTheme() {
  const theme = MEMBERS[currentBias].colors;
  document.body.style.backgroundColor = theme.secondary;
  
  const header = document.getElementById('header');
  header.style.background = `linear-gradient(135deg, ${theme.primary} 0%, ${theme.dark} 100%)`;
  
  const quizBtn = document.getElementById('quizBtn');
  quizBtn.style.color = theme.primary;
  
  const wishlistFab = document.getElementById('wishlistFab');
  wishlistFab.style.backgroundColor = theme.accent;
  
  const wishlistBadge = document.getElementById('wishlistBadge');
  wishlistBadge.style.backgroundColor = theme.dark;
  
  // Update all themed elements
  updateThemedElements(theme);
}

// Update hero image
function updateHeroImage() {
  const heroImg = document.getElementById('heroImg');
  heroImg.src = `/kpop/assets/hero-${currentBias}.png`;
  heroImg.onerror = () => {
    heroImg.src = `/kpop/assets/blank-${currentBias}.png`;
  };
}

// Update themed elements
function updateThemedElements(theme) {
  const modalTitles = document.querySelectorAll('.modal-title');
  modalTitles.forEach(title => {
    title.style.color = theme.primary;
  });
  
  const orderESUMINlLink = document.getElementById('orderESUMINlLink');
  if (orderESUMINlLink) {
    orderESUMINlLink.style.color = theme.accent;
  }
  
  const gotItBtn = document.getElementById('gotItBtn');
  if (gotItBtn) {
    gotItBtn.style.backgroundColor = theme.primary;
  }
  
  const progressFill = document.getElementById('progressFill');
  if (progressFill) {
    progressFill.style.backgroundColor = theme.primary;
  }
  
  const orderInfoTitle = document.getElementById('orderInfoTitle');
  if (orderInfoTitle) {
    orderInfoTitle.style.color = theme.primary;
  }
  
  const quizTitle = document.getElementById('quizTitle');
  if (quizTitle) {
    quizTitle.style.color = theme.primary;
  }
  
  const wishlistTitle = document.getElementById('wishlistTitle');
  if (wishlistTitle) {
    wishlistTitle.style.color = theme.primary;
  }
}

// Render products
function renderProducts() {
  const grid = document.getElementById('productGrid');
  const theme = MEMBERS[currentBias].colors;
  grid.innerHTML = '';
  
  PRODUCTS.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const imageUrl = `/kpop/assets/${product.imageFormat}-${currentBias}.png`;
    const fallbackUrl = `/kpop/assets/blank-${currentBias}.png`;
    
    const isInWishlist = wishlist.some(item => item.id === product.id);
    
    card.innerHTML = `
      <div class="product-image" style="background-color: ${theme.secondary}">
        <img src="${imageUrl}" alt="${product.name}" onerror="this.src='${fallbackUrl}'">
      </div>
      <div class="product-info">
        <div class="product-category" style="color: ${theme.accent}">${product.category}</div>
        <h3 class="product-title" style="color: ${theme.dark}">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        ${product.type === 'redbubble' ? 
          `<a href="${product.redbubbleUrl}" target="_blank" rel="noopener noreferrer" class="product-btn" style="background-color: ${theme.primary}">
            🛍️ Shop on Redbubble
          </a>` :
          `<button class="product-btn" style="background-color: ${isInWishlist ? '#ccc' : theme.primary}" 
            ${isInWishlist ? 'disabled' : ''} 
            onclick="addToWishlist('${product.id}')">
            ♡ ${isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
          </button>`
        }
      </div>
    `;
    
    grid.appendChild(card);
  });
}

// Add to wishlist
function addToWishlist(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (product && !wishlist.some(item => item.id === productId)) {
    wishlist.push(product);
    updateWishlistBadge();
    renderProducts();
  }
}

// Remove from wishlist
function removeFromWishlist(productId) {
  wishlist = wishlist.filter(item => item.id !== productId);
  updateWishlistBadge();
  renderProducts();
  renderWishlist();
}

// Update wishlist badge
function updateWishlistBadge() {
  const badge = document.getElementById('wishlistBadge');
  const icon = document.getElementById('wishlistIcon');
  
  if (wishlist.length > 0) {
    badge.style.display = 'flex';
    badge.textContent = wishlist.length;
    icon.innerHTML = '♥';
  } else {
    badge.style.display = 'none';
    icon.innerHTML = '♡';
  }
}

// Render wishlist
function renderWishlist() {
  const container = document.getElementById('wishlistItems');
  const form = document.getElementById('wishlistForm');
  const theme = MEMBERS[currentBias].colors;
  
  if (wishlist.length === 0) {
    container.innerHTML = '<p class="empty-wishlist">Your wishlist is empty. Add some items to get started!</p>';
    form.style.display = 'none';
  } else {
    container.innerHTML = wishlist.map(item => {
      const imageUrl = `/kpop/assets/${item.imageFormat}-${currentBias}.png`;
      const fallbackUrl = `/kpop/assets/blank-${currentBias}.png`;
      
      return `
        <div class="wishlist-item">
          <img src="${imageUrl}" alt="${item.name}" onerror="this.src='${fallbackUrl}'">
          <div class="wishlist-item-info">
            <div class="wishlist-item-name" style="color: ${theme.dark}">${item.name}</div>
            <div class="wishlist-item-category">${item.category}</div>
          </div>
          <button class="wishlist-remove" onclick="removeFromWishlist('${item.id}')">×</button>
        </div>
      `;
    }).join('');
    
    form.style.display = 'block';
    updateRequestButton();
  }
}

// Update request button
function updateRequestButton() {
  const btn = document.getElementById('requestOrderBtn');
  const userName = document.getElementById('userName').value;
  const userESUMINl = document.getElementById('userESUMINl').value;
  const theme = MEMBERS[currentBias].colors;
  
  if (userName && userESUMINl) {
    btn.style.backgroundColor = theme.primary;
    btn.style.cursor = 'pointer';
    btn.style.pointerEvents = 'auto';
    btn.href = generateSUMINlto();
  } else {
    btn.style.backgroundColor = '#ccc';
    btn.style.cursor = 'not-allowed';
    btn.style.pointerEvents = 'none';
    btn.href = '#';
  }
}

// Generate SUMINlto link
function generateSUMINlto() {
  const userName = document.getElementById('userName').value;
  const userESUMINl = document.getElementById('userESUMINl').value;
  const subscribeESUMINls = document.getElementById('subscribeESUMINls').checked;
  
  const wishlistText = wishlist.map((item, i) => `${i + 1}. ${item.name} (${item.category})`).join('\n');
  const subscribeText = subscribeESUMINls ? 'Yes, subscribe me to eSUMINls from Sunnie Jae' : 'No, do not subscribe';
  
  const subject = encodeURIComponent('KPOP FANDOM SHOP ORDER');
  const body = encodeURIComponent(
    `Name: ${userName}\n\nESUMINl: ${userESUMINl}\n\nWishlist:\n${wishlistText}\n\n${subscribeText}`
  );
  
  return `SUMINlto:orders@sunniejae.com?subject=${subject}&body=${body}`;
}

// Event listeners for form
document.addEventListener('DOMContentLoaded', () => {
  const userName = document.getElementById('userName');
  const userESUMINl = document.getElementById('userESUMINl');
  
  if (userName && userESUMINl) {
    userName.addEventListener('input', updateRequestButton);
    userESUMINl.addEventListener('input', updateRequestButton);
  }
});

// Quiz functions
function renderQuiz() {
  const theme = MEMBERS[currentBias].colors;
  const question = QUIZ_DATA[quizStep];
  
  document.getElementById('quizQuestion').textContent = question.question;
  document.getElementById('quizProgress').textContent = `Question ${quizStep + 1} of ${QUIZ_DATA.length}`;
  
  const progressFill = document.getElementById('progressFill');
  progressFill.style.width = `${((quizStep + 1) / QUIZ_DATA.length) * 100}%`;
  progressFill.style.backgroundColor = theme.primary;
  
  const answersContainer = document.getElementById('quizAnswers');
  answersContainer.innerHTML = '';
  
  question.answers.forEach((answer, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-answer';
    btn.textContent = answer.text;
    btn.style.borderColor = theme.primary;
    btn.style.color = theme.dark;
    
    btn.addEventListener('mouseenter', () => {
      btn.style.backgroundColor = theme.secondary;
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.backgroundColor = 'white';
    });
    
    btn.addEventListener('click', () => handleQuizAnswer(answer));
    
    answersContainer.appendChild(btn);
  });
}

function handleQuizAnswer(answer) {
  quizAnswers.push(answer.members);
  
  if (quizStep < QUIZ_DATA.length - 1) {
    quizStep++;
    renderQuiz();
  } else {
    // Calculate result
    const memberCounts = {};
    quizAnswers.flat().forEach(member => {
      memberCounts[member] = (memberCounts[member] || 0) + 1;
    });
    const result = Object.entries(memberCounts).sort((a, b) => b[1] - a[1])[0][0];
    
    currentBias = result;
    localStorage.setItem('kpop-bias', result);
    
    hideModal('quizModal');
    resetQuiz();
    
    // Show result modal
    showQuizResult(result);
  }
}

function showQuizResult(memberKey) {
  const member = MEMBERS[memberKey];
  const theme = member.colors;
  
  // Update result modal content
  document.getElementById('resultTitle').style.color = theme.primary;
  document.getElementById('resultMemberName').textContent = member.name;
  document.getElementById('resultMemberName').style.color = theme.primary;
  document.getElementById('resultDescription').textContent = member.description;
  
  // Set result image
  const resultImage = document.getElementById('resultImage');
  resultImage.src = `/kpop/assets/result-${memberKey}.png`;
  resultImage.onerror = () => {
    resultImage.src = `/kpop/assets/hero-${memberKey}.png`;
    resultImage.onerror = () => {
      resultImage.src = `/kpop/assets/blank-${memberKey}.png`;
    };
  };
  
  // Update button color
  const startShoppingBtn = document.getElementById('startShoppingBtn');
  startShoppingBtn.style.backgroundColor = theme.primary;
  
  // Show modal
  showModal('quizResultModal');
  
  // Update theme after showing modal
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

// Modal functions
function showModal(modalId) {
  document.getElementById(modalId).classList.add('show');
}

function hideModal(modalId) {
  document.getElementById(modalId).classList.remove('show');
}
