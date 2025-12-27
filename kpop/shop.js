// Member data with 9 placeholder members (planets) and their theme colors
const MEMBERS = {
  mercury: { name: 'Mercury', colors: ['#FF6B9D', '#C44569', '#FFA07A', '#FF1493'] },
  venus: { name: 'Venus', colors: ['#A8E6CF', '#56CCF2', '#4ECDC4', '#45B7D1'] },
  earth: { name: 'Earth', colors: ['#FFD93D', '#F9CA24', '#FFC312', '#F79F1F'] },
  mars: { name: 'Mars', colors: ['#FF6348', '#EE5A6F', '#FF4757', '#C23616'] },
  jupiter: { name: 'Jupiter', colors: ['#A29BFE', '#6C5CE7', '#7B68EE', '#5F27CD'] },
  saturn: { name: 'Saturn', colors: ['#FD79A8', '#E84393', '#FF69B4', '#D63031'] },
  uranus: { name: 'Uranus', colors: ['#74B9FF', '#0984E3', '#00B8D4', '#0652DD'] },
  neptune: { name: 'Neptune', colors: ['#A29BFE', '#6C5CE7', '#9B59B6', '#8E44AD'] },
  pluto: { name: 'Pluto', colors: ['#55EFC4', '#00B894', '#00D2D3', '#01A3A4'] }
};

const MEMBER_IDS = Object.keys(MEMBERS);

// Product data
const PRODUCTS = [
  {
    id: 1,
    name: 'Phone Case',
    type: 'exclusive',
    collection: 'SunnieJae Exclusive',
    description: 'Custom phone case featuring your bias',
    price: '$25'
  },
  {
    id: 2,
    name: 'Lightstick Keychain',
    type: 'exclusive',
    collection: 'SunnieJae Exclusive',
    description: 'Miniature lightstick keychain charm',
    price: '$15',
    imageOverride: 'lightstickkeychain'
  },
  {
    id: 3,
    name: 'Animal Icon Keychain',
    type: 'exclusive',
    collection: 'SunnieJae Exclusive',
    description: 'Cute animal icon representing your bias',
    price: '$12'
  },
  {
    id: 4,
    name: 'Comeback Era Stickers',
    type: 'redbubble',
    collection: 'Redbubble',
    description: 'Sticker pack from latest comeback era',
    price: '$8',
    redbubbleUrl: 'https://www.redbubble.com/shop/comeback-stickers'
  },
  {
    id: 5,
    name: 'Autographics',
    type: 'redbubble',
    collection: 'Redbubble',
    description: 'Signature-style graphics collection',
    price: '$10',
    redbubbleUrl: 'https://www.redbubble.com/shop/autographics'
  },
  {
    id: 6,
    name: 'Hangul Collection',
    type: 'redbubble',
    collection: 'Redbubble',
    description: 'Korean hangul name designs',
    price: '$9',
    redbubbleUrl: 'https://www.redbubble.com/shop/hangul'
  }
];

// Quiz questions
const QUIZ_QUESTIONS = [
  {
    question: "What's your favorite color?",
    answers: [
      { text: 'Pink/Red', members: ['mercury', 'saturn', 'mars'] },
      { text: 'Blue/Cyan', members: ['venus', 'uranus', 'neptune'] },
      { text: 'Yellow/Gold', members: ['earth'] },
      { text: 'Purple', members: ['jupiter', 'neptune'] },
      { text: 'Green', members: ['pluto', 'venus'] }
    ]
  },
  {
    question: "Are you an introvert or extrovert?",
    answers: [
      { text: 'Introvert', members: ['neptune', 'pluto', 'uranus'] },
      { text: 'Extrovert', members: ['mercury', 'jupiter', 'earth', 'mars'] }
    ]
  },
  {
    question: "Down to earth or head in the clouds?",
    answers: [
      { text: 'Down to earth', members: ['earth', 'venus', 'mars'] },
      { text: 'Head in the clouds', members: ['jupiter', 'neptune', 'uranus'] }
    ]
  },
  {
    question: "Do you lead with your head or heart?",
    answers: [
      { text: 'Head', members: ['mercury', 'uranus', 'saturn'] },
      { text: 'Heart', members: ['venus', 'mars', 'jupiter', 'neptune'] }
    ]
  },
  {
    question: "Order or chaos?",
    answers: [
      { text: 'Order', members: ['mercury', 'saturn', 'earth'] },
      { text: 'Chaos', members: ['mars', 'jupiter', 'pluto'] }
    ]
  },
  {
    question: "What's your favorite animal?",
    answers: [
      { text: 'Cat', members: ['mercury', 'neptune'] },
      { text: 'Dog', members: ['venus', 'jupiter'] },
      { text: 'Bird', members: ['uranus', 'pluto'] },
      { text: 'Rabbit', members: ['saturn', 'earth'] },
      { text: 'Fox', members: ['mars'] }
    ]
  }
];

// State
let currentBias = localStorage.getItem('userBias') || 'mercury';
let wishlist = [];
let quizStep = 0;
let quizAnswers = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  updateTheme();
  renderBiasSelector();
  renderProducts();
  setupEventListeners();
});

// Update theme colors
function updateTheme() {
  const colors = MEMBERS[currentBias].colors;
  document.body.style.background = `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 50%, ${colors[2]} 100%)`;
  document.getElementById('siteTitle').style.color = colors[3];
  document.getElementById('wishlistBtn').style.backgroundColor = colors[0];
  document.getElementById('heroName').textContent = MEMBERS[currentBias].name;
  document.getElementById('heroName').style.color = colors[3];
  document.getElementById('quizTrigger').style.color = colors[3];
  
  // Update hero image
  const heroImage = document.getElementById('heroImage');
  heroImage.src = `/assets/hero-${currentBias}.png`;
  heroImage.onerror = () => {
    heroImage.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:${colors[0]};stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:${colors[1]};stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='600' height='600' fill='url(%23grad)'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='48' fill='white' font-weight='bold'%3E${MEMBERS[currentBias].name}%3C/text%3E%3C/svg%3E`;
  };
  
  localStorage.setItem('userBias', currentBias);
}

// Render bias selector buttons
function renderBiasSelector() {
  const container = document.getElementById('biasSelector');
  container.innerHTML = MEMBER_IDS.map(memberId => {
    const member = MEMBERS[memberId];
    const isActive = currentBias === memberId;
    return `
      <button 
        onclick="changeBias('${memberId}')" 
        class="px-5 py-2.5 rounded-full font-semibold transition transform hover:scale-105 ${isActive ? 'ring-4 ring-offset-2 scale-110' : ''}"
        style="background-color: ${member.colors[0]}; color: white; ${isActive ? `--tw-ring-color: ${member.colors[3]};` : ''}"
      >
        ${member.name}
      </button>
    `;
  }).join('');
}

// Change bias
function changeBias(memberId) {
  currentBias = memberId;
  updateTheme();
  renderBiasSelector();
  renderProducts();
}

// Render products
function renderProducts() {
  const grid = document.getElementById('productGrid');
  const colors = MEMBERS[currentBias].colors;
  
  grid.innerHTML = PRODUCTS.map(product => {
    const imageName = product.imageOverride || 'collection';
    const imagePath = `/assets/${imageName}-${currentBias}.png`;
    const fallbackImage = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%23ddd'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24' fill='%23999'%3E${product.name}%3C/text%3E%3C/svg%3E`;
    
    const buttonHtml = product.type === 'exclusive' 
      ? `<button onclick="addToWishlist(${product.id})" class="w-full py-3 rounded-full font-semibold text-white transition hover:opacity-90" style="background-color: ${colors[0]}">Add to Wishlist</button>`
      : `<a href="${product.redbubbleUrl}" target="_blank" rel="noopener noreferrer" class="block w-full py-3 rounded-full font-semibold text-white text-center transition hover:opacity-90" style="background-color: ${colors[2]}">Shop on Redbubble</a>`;
    
    return `
      <div class="bg-white rounded-2xl shadow-xl overflow-hidden transform transition hover:scale-105">
        <div class="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <img src="${imagePath}" alt="${product.name}" class="w-full h-full object-cover" onerror="this.src='${fallbackImage}'">
        </div>
        <div class="p-5">
          <div class="flex justify-between items-start mb-2">
            <h3 class="text-xl font-bold brat-font" style="color: ${colors[3]}">${product.name}</h3>
            <span class="text-lg font-semibold">${product.price}</span>
          </div>
          <p class="text-gray-600 text-sm mb-2">${product.description}</p>
          <p class="text-xs text-gray-500 mb-4">${product.collection}</p>
          ${buttonHtml}
        </div>
      </div>
    `;
  }).join('');
}

// Add to wishlist
function addToWishlist(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!wishlist.find(item => item.id === productId)) {
    wishlist.push(product);
    updateWishlistCounter();
  }
}

// Remove from wishlist
function removeFromWishlist(productId) {
  wishlist = wishlist.filter(item => item.id !== productId);
  updateWishlistCounter();
  renderWishlistModal();
}

// Update wishlist counter
function updateWishlistCounter() {
  const counter = document.getElementById('wishlistCounter');
  if (wishlist.length > 0) {
    counter.textContent = wishlist.length;
    counter.style.display = 'flex';
  } else {
    counter.style.display = 'none';
  }
}

// Render wishlist modal
function renderWishlistModal() {
  const content = document.getElementById('wishlistContent');
  const form = document.getElementById('wishlistForm');
  const colors = MEMBERS[currentBias].colors;
  
  document.getElementById('wishlistModalTitle').style.color = colors[3];
  
  if (wishlist.length === 0) {
    content.innerHTML = '<p class="text-center text-gray-500 py-8">Your wishlist is empty</p>';
    form.style.display = 'none';
  } else {
    const exclusiveItems = wishlist.filter(item => item.type === 'exclusive');
    content.innerHTML = `
      <div class="space-y-4 mb-6">
        ${wishlist.map(item => `
          <div class="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 class="font-semibold">${item.name}</h3>
              <p class="text-sm text-gray-600">${MEMBERS[currentBias].name} version - ${item.price}</p>
            </div>
            <button onclick="removeFromWishlist(${item.id})" class="text-red-500 hover:text-red-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        `).join('')}
      </div>
    `;
    form.style.display = 'block';
    
    const requestBtn = document.getElementById('requestOrderBtn');
    requestBtn.style.backgroundColor = colors[0];
    requestBtn.href = generateMailtoLink();
  }
}

// Generate mailto link
function generateMailtoLink() {
  const userName = document.getElementById('userName').value;
  const userEmail = document.getElementById('userEmail').value;
  const subscribeEmails = document.getElementById('subscribeEmails').checked;
  
  const exclusiveItems = wishlist.filter(item => item.type === 'exclusive');
  const wishlistText = exclusiveItems.map((item, idx) => 
    `${idx + 1}. ${item.name} (${MEMBERS[currentBias].name} version) - ${item.price}`
  ).join('\n');

  const body = `Name: ${userName}\n\nEmail: ${userEmail}\n\nBias: ${MEMBERS[currentBias].name}\n\nWishlist:\n${wishlistText}\n\nSubscribe to emails: ${subscribeEmails ? 'Yes' : 'No'}`;

  return `mailto:orders@sunniejae.com?subject=KPOP FANDOM SHOP ORDER&body=${encodeURIComponent(body)}`;
}

// Start quiz
function startQuiz() {
  quizStep = 0;
  quizAnswers = [];
  renderQuiz();
  openModal('quizModal');
}

// Render quiz
function renderQuiz() {
  const colors = MEMBERS[currentBias].colors;
  const question = QUIZ_QUESTIONS[quizStep];
  const progress = ((quizStep + 1) / QUIZ_QUESTIONS.length) * 100;
  
  document.getElementById('quizModalTitle').style.color = colors[3];
  document.getElementById('quizProgress').textContent = `Question ${quizStep + 1} of ${QUIZ_QUESTIONS.length}`;
  document.getElementById('quizProgressBar').style.width = `${progress}%`;
  document.getElementById('quizProgressBar').style.backgroundColor = colors[0];
  document.getElementById('quizQuestion').textContent = question.question;
  
  document.getElementById('quizAnswers').innerHTML = question.answers.map((answer, idx) => `
    <button 
      onclick="handleQuizAnswer(${idx})" 
      class="w-full p-4 text-left rounded-lg border-2 transition hover:opacity-80"
      style="border-color: ${colors[0]}"
    >
      ${answer.text}
    </button>
  `).join('');
}

// Handle quiz answer
function handleQuizAnswer(answerIdx) {
  const selectedMembers = QUIZ_QUESTIONS[quizStep].answers[answerIdx].members;
  quizAnswers.push(...selectedMembers);
  
  if (quizStep < QUIZ_QUESTIONS.length - 1) {
    quizStep++;
    renderQuiz();
  } else {
    // Calculate result
    const memberCounts = {};
    quizAnswers.forEach(member => {
      memberCounts[member] = (memberCounts[member] || 0) + 1;
    });
    
    const maxCount = Math.max(...Object.values(memberCounts));
    const winners = Object.keys(memberCounts).filter(m => memberCounts[m] === maxCount);
    const result = winners[Math.floor(Math.random() * winners.length)];
    
    closeModal('quizModal');
    showResult(result);
  }
}

// Show quiz result
function showResult(result) {
  currentBias = result;
  localStorage.setItem('userBias', result);
  
  const colors = MEMBERS[result].colors;
  const resultImage = document.getElementById('resultImage');
  
  document.getElementById('resultTitle').style.color = colors[3];
  document.getElementById('resultName').textContent = MEMBERS[result].name;
  document.getElementById('resultName').style.color = colors[0];
  document.getElementById('resultText').textContent = `Your bias has been set to ${MEMBERS[result].name}! The shop theme has been updated to match.`;
  document.getElementById('closeResultBtn').style.backgroundColor = colors[0];
  
  resultImage.src = `/assets/collection-${result}.png`;
  resultImage.onerror = () => {
    resultImage.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Ccircle cx='100' cy='100' r='100' fill='${colors[0]}'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='32' fill='white' font-weight='bold'%3E${MEMBERS[result].name}%3C/text%3E%3C/svg%3E`;
  };
  
  openModal('resultModal');
}

// Modal functions
function openModal(modalId) {
  document.getElementById(modalId).classList.add('active');
  if (modalId === 'wishlistModal') {
    renderWishlistModal();
  }
  if (modalId === 'howToOrderModal') {
    document.getElementById('howToOrderTitle').style.color = MEMBERS[currentBias].colors[3];
  }
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('active');
}

// Setup event listeners
function setupEventListeners() {
  document.getElementById('wishlistBtn').addEventListener('click', () => openModal('wishlistModal'));
  document.getElementById('quizTrigger').addEventListener('click', startQuiz);
  document.getElementById('howToOrderBtn').addEventListener('click', () => openModal('howToOrderModal'));
  document.getElementById('closeResultBtn').addEventListener('click', () => {
    closeModal('resultModal');
    updateTheme();
    renderBiasSelector();
    renderProducts();
  });
  
  // Update mailto link on input change
  document.getElementById('userName').addEventListener('input', updateMailtoLink);
  document.getElementById('userEmail').addEventListener('input', updateMailtoLink);
  document.getElementById('subscribeEmails').addEventListener('change', updateMailtoLink);
  
  // Close modal buttons
  document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const modal = e.target.closest('.modal');
      if (modal) closeModal(modal.id);
    });
  });
  
  // Close modals on outside click
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(modal.id);
    });
  });
}

function updateMailtoLink() {
  const requestBtn = document.getElementById('requestOrderBtn');
  if (requestBtn) {
    requestBtn.href = generateMailtoLink();
  }
}
