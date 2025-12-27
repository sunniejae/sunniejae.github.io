// Member data with planet placeholders
const MEMBERS = {
  MAI: { 
    name: 'MAI', 
    colors: { primary: '#FF6B9D', secondary: '#FFE5EC', accent: '#C41E3A', dark: '#8B0A1F' },
    description: 'Bold and energetic! You match with MAI, someone who brings passion and excitement to everything they do.'
  },
  JEEMIN: { 
    name: 'JEEMIN', 
    colors: { primary: '#9D84FF', secondary: '#E8E0FF', accent: '#6B4CE6', dark: '#4A2FB8' },
    description: 'Elegant and mysterious! You match with JEEMIN, someone who captivates with grace and thoughtful charm.'
  },
  KOKO: { 
    name: 'KOKO', 
    colors: { primary: '#FF8A5B', secondary: '#FFE4D6', accent: '#E85D2C', dark: '#B8441A' },
    description: 'Fierce and confident! You match with KOKO, someone who leads with strength and determination.'
  },
  SARANG: { 
    name: 'SARANG', 
    colors: { primary: '#4ECDC4', secondary: '#D4F4F2', accent: '#2BA89E', dark: '#1A7A72' },
    description: 'Bright and optimistic! You match with SARANG, someone who spreads joy and positive energy everywhere.'
  },
  JUNGEUN: { 
    name: 'JUNGEUN', 
    colors: { primary: '#FFD93D', secondary: '#FFF6D6', accent: '#F4C430', dark: '#C49A26' },
    description: 'Steady and reliable! You match with JUNGEUN, someone who brings warmth and stability to any situation.'
  },
  SAEBI: { 
    name: 'SAEBI', 
    colors: { primary: '#6BCF7F', secondary: '#E0F7E4', accent: '#45A557', dark: '#2F7A3E' },
    description: 'Fresh and unique! You match with SAEBI, someone who stands out with their creative and refreshing personality.'
  },
};

// Quiz questions and answers
const QUIZ_DATA = [
  {
    question: "What's your favorite color?",
    answers: [
      { text: "Red", members: ['MAI',] },
      { text: "Blue", members: ['JEEMIN'] },
      { text: "Yellow", members: ['KOKO'] },
      { text: "Green", members: ['SARANG'] },
      { text: "Purple", members: ['JUNGEUN'] },
      { text: "Pink", members: ['SAEBI'] },

    ]
  },
  {
    question: "Are you more...",
    answers: [
      { text: "Introvert", members: ['JEEMIN',] },
      { text: "Extrovert", members: ['MAI', 'KOKO', 'SARANG', 'JUNGEUN', 'SAEBI'] }
    ]
  },
  {
    question: "Which describes you better?",
    answers: [
      { text: "Down to earth", members: ['JUNGEUN', 'SAEBI'] },
      { text: "Head in the clouds", members: ['MAI', 'JEEMIN', 'KOKO', 'SARANG'] }
    ]
  },
  {
    question: "Do you follow your...",
    answers: [
      { text: "Head", members: ['JEEMIN', 'JUNGEUN'] },
      { text: "Heart", members: ['MAI', 'KOKO', 'SARANG', 'SAEBI'] }
    ]
  },
  {
    question: "Which appeals to you more?",
    answers: [
      { text: "Order", members: ['JEEMIN', 'JUNGEUN','SAEBI'] },
      { text: "Chaos", members: ['MAI', 'KOKO', 'SARANG'] }
    ]
  },
  {
    question: "Pick your favorite animal:",
    answers: [
      { text: "Fox", members: ['MAI'] },
      { text: "Bear", members: ['JEEMIN'] },
      { text: "Cat", members: ['KOKO'] },
      { text: "Dog", members: ['SARANG'] },
      { text: "Cheetah", members: ['JUNGEUN'] },
      { text: "Bunny", members: ['SAEBI'] }
    ]
  },
  {
    question: "Which artist do you also follow?",
    answers: [
      { text: "NewJeans", members: ['MAI'] },
      { text: "aespa", members: ['JEEMIN'] },
      { text: "IVE", members: ['KOKO', 'JUNGEUN'] },
      { text: "ITZY", members: ['SARANG', 'SAEBI'] }
    ]
  },
  {
    question: "Pick your favorite era:",
    answers: [
      { text: "Debut Era", members: ['MAI', 'KOKO'] },
      { text: "First Comeback", members: ['JEEMIN', 'SARANG'] },
      { text: "Peak Era", members: ['JUNGEUN', 'SAEBI'] },
      { text: "Latest Release", members: ['MAI'] }
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
let currentBias = 'MAI';
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
  header.style.background = `linear-gradient(135deg, ${theme.primary} 0%, ${theme.accent} 100%)`;
  
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
  heroImg.src = `/assets/hero-${currentBias}.png`;
  heroImg.onerror = () => {
    heroImg.src = `/assets/blank-${currentBias}.png`;
  };
}

// Update themed elements
function updateThemedElements(theme) {
  const modalTitles = document.querySelectorAll('.modal-title');
  modalTitles.forEach(title => {
    title.style.color = theme.primary;
  });
  
  const orderEmailLink = document.getElementById('orderEmailLink');
  if (orderEmailLink) {
    orderEmailLink.style.color = theme.accent;
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
    
    const imageUrl = `/assets/${product.imageFormat}-${currentBias}.png`;
    const fallbackUrl = `/assets/blank-${currentBias}.png`;
    
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
      const imageUrl = `/assets/${item.imageFormat}-${currentBias}.png`;
      const fallbackUrl = `/assets/blank-${currentBias}.png`;
      
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
  const userEmail = document.getElementById('userEmail').value;
  const theme = MEMBERS[currentBias].colors;
  
  if (userName && userEmail) {
    btn.style.backgroundColor = theme.primary;
    btn.style.cursor = 'pointer';
    btn.style.pointerEvents = 'auto';
    btn.href = generateMailto();
  } else {
    btn.style.backgroundColor = '#ccc';
    btn.style.cursor = 'not-allowed';
    btn.style.pointerEvents = 'none';
    btn.href = '#';
  }
}

// Generate mailto link
function generateMailto() {
  const userName = document.getElementById('userName').value;
  const userEmail = document.getElementById('userEmail').value;
  const subscribeEmails = document.getElementById('subscribeEmails').checked;
  
  const wishlistText = wishlist.map((item, i) => `${i + 1}. ${item.name} (${item.category})`).join('\n');
  const subscribeText = subscribeEmails ? 'Yes, subscribe me to emails from Sunnie Jae' : 'No, do not subscribe';
  
  const subject = encodeURIComponent('KPOP FANDOM SHOP ORDER');
  const body = encodeURIComponent(
    `Name: ${userName}\n\nEmail: ${userEmail}\n\nWishlist:\n${wishlistText}\n\n${subscribeText}`
  );
  
  return `mailto:orders@sunniejae.com?subject=${subject}&body=${body}`;
}

// Event listeners for form
document.addEventListener('DOMContentLoaded', () => {
  const userName = document.getElementById('userName');
  const userEmail = document.getElementById('userEmail');
  
  if (userName && userEmail) {
    userName.addEventListener('input', updateRequestButton);
    userEmail.addEventListener('input', updateRequestButton);
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
  resultImage.src = `/assets/result-${memberKey}.png`;
  resultImage.onerror = () => {
    resultImage.src = `/assets/hero-${memberKey}.png`;
    resultImage.onerror = () => {
      resultImage.src = `/assets/blank-${memberKey}.png`;
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
