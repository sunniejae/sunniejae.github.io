// Configuration
const MEMBERS = ['MAI', 'JEEMIN', 'KOKO', 'SARANG', 'JUNGEUN', 'SAEBI'];

const MEMBER_COLORS = {
    MAI: ['#FFB3BA', '#FF8FA3', '#FF6B9D', '#E63946'],
    JEEMIN: ['#C7CEEA', '#9BB1FF', '#6B8DD6', '#4A5F8C'],
    KOKO: ['#FFE5B4', '#FFB347', '#FF9F40', '#FF6F00'],
    SARANG: ['#D4F1C5', '#A8E6CF', '#7ECDA3', '#4A9B7F'],
    JUNGEUN: ['#E0BBE4', '#D291BC', '#957DAD', '#6B5B95'],
    SAEBI: ['#FFD6E8', '#FFB3D9', '#FF85C0', '#E75480']
};

const PRODUCTS = [
    { 
        id: 1, 
        name: 'Light Stick Keychain', 
        price: '$12.99', 
        type: 'exclusive',
        imageFormat: 'lightstickkeychain'
    },
    { 
        id: 2, 
        name: 'Hangul Sticker', 
        price: '$3.99', 
        type: 'redbubble',
        redbubbleUrl: 'https://www.redbubble.com/people/sunniejae/shop?collections=hangul'
    },
    { 
        id: 3, 
        name: 'Autographic', 
        price: '$5.99', 
        type: 'redbubble',
        redbubbleUrl: 'https://www.redbubble.com/people/sunniejae/shop?collections=autographics'
    },
    { 
        id: 4, 
        name: 'Comeback Sticker', 
        price: '$4.99', 
        type: 'redbubble',
        redbubbleUrl: 'https://www.redbubble.com/people/sunniejae/shop?collections=comeback'
    },
    { 
        id: 5, 
        name: 'Phone Case', 
        price: '$24.99', 
        type: 'exclusive',
        imageFormat: 'phonecase'
    },
    { 
        id: 6, 
        name: 'Animal Icon Keychain', 
        price: '$11.99', 
        type: 'exclusive',
        imageFormat: 'animalkeychain'
    }
];

const QUIZ_QUESTIONS = [
    {
        question: "What's your favorite color?",
        options: [
            { text: 'Pink', members: ['MAI', 'JEEMIN', 'SARANG'] },
            { text: 'Blue', members: ['KOKO', 'SAEBI', 'JUNGEUN'] },
            { text: 'Green', members: ['KOKO', 'SARANG'] },
            { text: 'Purple', members: ['JUNGEUN', 'SAEBI', 'JEEMIN'] }
        ]
    },
    {
        question: "Are you more of an introvert or extrovert?",
        options: [
            { text: 'Introvert', members: ['SAEBI', 'JUNGEUN', 'KOKO'] },
            { text: 'Extrovert', members: ['SARANG', 'JUNGEUN', 'JEEMIN'] },
            { text: 'Ambivert (both)', members: ['MAI', 'KOKO', 'SAEBI'] },
            { text: 'Depends on the day', members: ['MAI', 'SARANG', 'JEEMIN'] }
        ]
    },
    {
        question: "Down to earth or head in the clouds?",
        options: [
            { text: 'Down to earth', members: ['KOKO', 'SAEBI', 'SARANG'] },
            { text: 'Head in the clouds', members: ['MAI', 'JUNGEUN', 'JEEMIN'] },
            { text: 'Both equally', members: ['MAI', 'KOKO'] },
            { text: 'Floating in between', members: ['SAEBI', 'JEEMIN', 'SARANG'] }
        ]
    },
    {
        question: "Do you lead with your head or your heart?",
        options: [
            { text: 'Head (logical)', members: ['SAEBI', 'MAI', 'KOKO'] },
            { text: 'Heart (emotional)', members: ['JEEMIN', 'JUNGEUN', 'SARANG'] },
            { text: 'Both equally', members: ['KOKO', 'JUNGEUN'] },
            { text: 'Gut instinct', members: ['MAI', 'SARANG', 'JUNGEUN'] }
        ]
    },
    {
        question: "Order or chaos?",
        options: [
            { text: 'Order all the way', members: ['SAEBI', 'MAI', 'KOKO'] },
            { text: 'Controlled chaos', members: ['JUNGEUN', 'JEEMIN', 'SARANG'] },
            { text: 'Complete chaos', members: ['JEEMIN', 'SARANG'] },
            { text: 'Organized mess', members: ['JEEMIN', 'MAI', 'KOKO'] }
        ]
    },
    {
        question: "What's your favorite animal?",
        options: [
            { text: 'Cat', members: ['MAI', 'SAEBI', 'KOKO'] },
            { text: 'Dog', members: ['SARANG', 'JUNGEUN', 'JEEMIN'] },
            { text: 'Bird', members: ['KOKO', 'JEEMIN', 'MAI'] },
            { text: 'Something exotic', members: ['JUNGEUN', 'SAEBI', 'SARANG'] }
        ]
    },
    {
        question: "What other artist do you follow?",
        options: [
            { text: 'BTS', members: ['SARANG', 'JUNGEUN', 'MAI'] },
            { text: 'BLACKPINK', members: ['JEEMIN', 'SAEBI', 'KOKO'] },
            { text: 'SEVENTEEN', members: ['KOKO', 'SAEBI', 'JUNGEUN'] },
            { text: 'NewJeans', members: ['MAI', 'JEEMIN', 'SARANG'] }
        ]
    },
    {
        question: "What's your favorite era?",
        options: [
            { text: 'Debut Era', members: ['MAI', 'KOKO', 'SARANG'] },
            { text: 'First Comeback', members: ['JEEMIN', 'JUNGEUN'] },
            { text: 'Peak Era', members: ['SAEBI', 'KOKO', 'JUNGEUN'] },
            { text: 'Latest Comeback', members: ['MAI', 'SARANG', 'JEEMIN'] }
        ]
    }
];

// State
let selectedBias = MEMBERS[0];
let wishlist = [];
let quizAnswers = {};

// Local Storage Keys
const STORAGE_KEYS = {
    BIAS: 'kpop_shop_bias',
    WISHLIST: 'kpop_shop_wishlist'
};

// Load from local storage
function loadFromStorage() {
    const savedBias = localStorage.getItem(STORAGE_KEYS.BIAS);
    if (savedBias && MEMBERS.includes(savedBias)) {
        selectedBias = savedBias;
    }
    
    const savedWishlist = localStorage.getItem(STORAGE_KEYS.WISHLIST);
    if (savedWishlist) {
        try {
            wishlist = JSON.parse(savedWishlist);
        } catch (e) {
            wishlist = [];
        }
    }
}

// Save to local storage
function saveBias() {
    localStorage.setItem(STORAGE_KEYS.BIAS, selectedBias);
}

function saveWishlist() {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadFromStorage();
    initializeMemberButtons();
    initializeProducts();
    initializeQuiz();
    updateTheme();
    updateWishlistUI();
    attachEventListeners();
});

function initializeMemberButtons() {
    const container = document.getElementById('memberButtons');
    container.innerHTML = MEMBERS.map(member => `
        <button 
            class="member-btn px-6 py-3 rounded-lg font-semibold text-white" 
            data-member="${member}"
        >
            ${member}
        </button>
    `).join('');
}

function initializeProducts() {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = PRODUCTS.map(product => `
        <div class="product-card bg-white rounded-xl shadow-xl overflow-hidden">
            <div class="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
                ${product.type === 'exclusive' ? `
                    <img 
                        src="/kpop/assets/${product.imageFormat}-${selectedBias}.png" 
                        alt="${product.name} - ${selectedBias}"
                        class="product-image"
                        data-product="${product.id}"
                        data-member="${selectedBias}"
                        onerror="this.onerror=null; this.src='/kpop/assets/blank-${selectedBias}.png';"
                    />
                ` : ''}
                <div class="placeholder-icon" ${product.type !== 'exclusive' ? 'style="display: flex;"' : ''}>
                    <svg class="w-20 h-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                </div>
            </div>
            <div class="p-6">
                <h3 class="product-name text-xl font-bold mb-2 brat-font">
                    ${product.name}
                </h3>
                <p class="product-member text-gray-600 mb-1">${selectedBias} Version</p>
                <p class="product-price text-2xl font-bold mb-4">
                    ${product.price}
                </p>
                ${product.type === 'redbubble' ? `
                    <a
                        href="${product.redbubbleUrl}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="product-btn block w-full px-6 py-3 rounded-lg font-semibold text-white text-center"
                    >
                        Shop on Redbubble
                    </a>
                ` : `
                    <button
                        class="product-btn add-to-wishlist w-full px-6 py-3 rounded-lg font-semibold text-white"
                        data-product-id="${product.id}"
                    >
                        Add to Wishlist
                    </button>
                `}
            </div>
        </div>
    `).join('');
}

function initializeQuiz() {
    const container = document.getElementById('quizQuestions');
    container.innerHTML = QUIZ_QUESTIONS.map((q, index) => `
        <div>
            <h3 class="font-bold mb-3 text-lg">${q.question}</h3>
            <div class="space-y-2">
                ${q.options.map((option, optIndex) => `
                    <button
                        class="quiz-option w-full p-3 rounded-lg text-left text-white"
                        data-question="${index}"
                        data-option="${optIndex}"
                    >
                        ${option.text}
                    </button>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function attachEventListeners() {
    // Member buttons
    document.querySelectorAll('.member-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            selectedBias = e.target.dataset.member;
            saveBias();
            updateTheme();
            updateProducts();
        });
    });

    // Add to wishlist buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-wishlist')) {
            const productId = parseInt(e.target.dataset.productId);
            addToWishlist(productId);
        }
    });

    // Wishlist modal
    document.getElementById('wishlistBtn').addEventListener('click', () => {
        openModal('wishlistModal');
    });
    document.getElementById('closeWishlistModal').addEventListener('click', () => {
        closeModal('wishlistModal');
    });

    // Quiz modal
    document.getElementById('quizBtn').addEventListener('click', () => {
        openModal('quizModal');
    });
    document.getElementById('closeQuizModal').addEventListener('click', () => {
        closeModal('quizModal');
    });

    // Quiz options
    document.querySelectorAll('.quiz-option').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const questionIndex = parseInt(e.target.dataset.question);
            const optionIndex = parseInt(e.target.dataset.option);
            handleQuizAnswer(questionIndex, optionIndex);
        });
    });

    // Submit quiz
    document.getElementById('submitQuizBtn').addEventListener('click', () => {
        calculateQuizResult();
    });

    // Result modal
    document.getElementById('closeResultModal').addEventListener('click', () => {
        closeModal('resultModal');
    });
    document.getElementById('startShoppingBtn').addEventListener('click', () => {
        closeModal('resultModal');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // How to order modal
    document.getElementById('howToOrderBtn').addEventListener('click', () => {
        openModal('howToOrderModal');
    });
    document.getElementById('closeHowToOrderModal').addEventListener('click', () => {
        closeModal('howToOrderModal');
    });

    // Request order button
    document.getElementById('requestOrderBtn').addEventListener('click', (e) => {
        e.preventDefault();
        const name = document.getElementById('nameInput').value;
        const email = document.getElementById('emailInput').value;
        const subscribe = document.getElementById('subscribeCheckbox').checked;
        
        const mailto = generateMailto(name, email, subscribe);
        window.location.href = mailto;
    });

    // Close modals on backdrop click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });
}

function updateTheme() {
    const colors = MEMBER_COLORS[selectedBias];
    
    // Safety check
    if (!colors) {
        console.error('No colors found for bias:', selectedBias);
        return;
    }
    
    // Update background
    document.body.style.background = `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 50%, ${colors[2]} 100%)`;
    
    // Update hero section
    document.getElementById('heroImage').src = `/kpop/assets/hero-${selectedBias}.png`;
    document.getElementById('heroName').textContent = selectedBias;
    document.getElementById('heroName').style.textShadow = `0 0 20px ${colors[2]}, 0 0 40px ${colors[1]}`;
    
    // Update all colored elements
    document.getElementById('mainTitle').style.color = colors[2];
    document.getElementById('wishlistBtn').style.backgroundColor = colors[0];
    document.getElementById('biasTitle').style.color = colors[3];
    document.getElementById('howToOrderBtn').style.backgroundColor = colors[1];
    document.getElementById('quizBtn').style.backgroundColor = colors[3];
    document.getElementById('orderFormTitle').style.color = colors[3];
    document.getElementById('nameLabel').style.color = colors[3];
    document.getElementById('emailLabel').style.color = colors[3];
    document.getElementById('requestOrderBtn').style.backgroundColor = colors[2];
    document.getElementById('wishlistModalTitle').style.color = colors[3];
    document.getElementById('quizModalTitle').style.color = colors[3];
    document.getElementById('submitQuizBtn').style.backgroundColor = colors[3];
    document.getElementById('howToOrderTitle').style.color = colors[3];
    document.getElementById('howToOrderEmail').style.color = colors[2];
    document.getElementById('exclusiveItemsTitle').style.color = colors[3];
    document.getElementById('redbubbleItemsTitle').style.color = colors[3];
    document.getElementById('subscribeCheckbox').style.accentColor = colors[2];
    
    // Update input borders
    document.getElementById('nameInput').style.borderColor = colors[0];
    document.getElementById('emailInput').style.borderColor = colors[0];
    
    // Update member buttons
    document.querySelectorAll('.member-btn').forEach(btn => {
        const isSelected = btn.dataset.member === selectedBias;
        btn.style.backgroundColor = isSelected ? colors[2] : colors[0];
        btn.style.opacity = isSelected ? '1' : '0.7';
    });
    
    // Update product elements
    document.querySelectorAll('.product-name').forEach(el => {
        el.style.color = colors[3];
    });
    document.querySelectorAll('.product-price').forEach(el => {
        el.style.color = colors[2];
    });
    document.querySelectorAll('.product-btn').forEach(el => {
        el.style.backgroundColor = colors[1];
    });
    
    // Update quiz options
    document.querySelectorAll('.quiz-option').forEach(btn => {
        const questionIndex = parseInt(btn.dataset.question);
        const optionIndex = parseInt(btn.dataset.option);
        const isSelected = quizAnswers[questionIndex] === optionIndex;
        btn.style.backgroundColor = isSelected ? colors[2] : colors[0];
        btn.style.opacity = isSelected ? '1' : '0.6';
    });
}

function updateProducts() {
//update product images
    
    document.querySelectorAll('.product-image').forEach(img => {
    const productId = parseInt(img.dataset.product);
    const product = PRODUCTS.find(p => p.id === productId);

    if (product) {
        img.src = `/kpop/assets/${product.imageFormat}-${selectedBias}.png`;
        img.onerror = function () {
            this.onerror = null;
            this.src = `/kpop/assets/blank-${selectedBias}.png`;
        };
        img.dataset.member = selectedBias;
    }
});

    
    // Update product member text
    document.querySelectorAll('.product-member').forEach(el => {
        el.textContent = `${selectedBias} Version`;
    });
}

function addToWishlist(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    
    const item = {
        ...product,
        member: selectedBias,
        uniqueId: `${product.id}-${selectedBias}-${Date.now()}`
    };
    
    wishlist.push(item);
    saveWishlist();
    updateWishlistUI();
}

function removeFromWishlist(uniqueId) {
    wishlist = wishlist.filter(item => item.uniqueId !== uniqueId);
    saveWishlist();
    updateWishlistUI();
}

function updateWishlistUI() {
    const count = wishlist.length;
    const badge = document.getElementById('wishlistCount');
    
    if (count > 0) {
        badge.textContent = count;
        badge.style.display = 'flex';
    } else {
        badge.style.display = 'none';
    }
    
    // Update wishlist modal
    const colors = MEMBER_COLORS[selectedBias];
    const container = document.getElementById('wishlistItems');
    
    if (wishlist.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-500 py-8">Your wishlist is empty</p>';
    } else {
        container.innerHTML = `<div class="space-y-4">${wishlist.map(item => `
            <div class="flex items-center justify-between p-4 rounded-lg" style="background-color: ${colors[0]}20;">
                <div>
                    <h3 class="font-bold">${item.name}</h3>
                    <p class="text-sm text-gray-600">${item.member} Version</p>
                    <p class="font-semibold" style="color: ${colors[2]};">${item.price}</p>
                </div>
                <button class="remove-from-wishlist p-2 rounded-full hover:bg-red-100" data-unique-id="${item.uniqueId}">
                    <svg class="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        `).join('')}</div>`;
        
        // Attach remove listeners
        document.querySelectorAll('.remove-from-wishlist').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const uniqueId = e.currentTarget.dataset.uniqueId;
                removeFromWishlist(uniqueId);
            });
        });
    }
    
    // Update modal title
    document.getElementById('wishlistModalTitle').textContent = `Your Wishlist (${count})`;
    document.getElementById('wishlistModalTitle').style.color = colors[3];
    
    // Update order button
    document.getElementById('requestOrderBtn').textContent = `Request Order (${count} items)`;
}

function handleQuizAnswer(questionIndex, optionIndex) {
    quizAnswers[questionIndex] = optionIndex;
    
    // Update button styles
    const colors = MEMBER_COLORS[selectedBias];
    document.querySelectorAll(`.quiz-option[data-question="${questionIndex}"]`).forEach(btn => {
        const isSelected = parseInt(btn.dataset.option) === optionIndex;
        btn.style.backgroundColor = isSelected ? colors[2] : colors[0];
        btn.style.opacity = isSelected ? '1' : '0.6';
    });
    
    // Enable submit button if all questions answered
    const submitBtn = document.getElementById('submitQuizBtn');
    if (Object.keys(quizAnswers).length === QUIZ_QUESTIONS.length) {
        submitBtn.disabled = false;
    }
}

function calculateQuizResult() {
    const memberScores = {};
    MEMBERS.forEach(member => memberScores[member] = 0);
    
    Object.entries(quizAnswers).forEach(([questionIndex, optionIndex]) => {
        const question = QUIZ_QUESTIONS[questionIndex];
        const option = question.options[optionIndex];
        option.members.forEach(member => {
            if (member && MEMBERS.includes(member)) {
                memberScores[member]++;
            }
        });
    });
    
    const maxScore = Math.max(...Object.values(memberScores));
    const topMembers = Object.keys(memberScores).filter(member => memberScores[member] === maxScore);
    const result = topMembers[Math.floor(Math.random() * topMembers.length)];
    
    showResult(result);
}

function showResult(member) {
    selectedBias = member;
    saveBias();
    updateTheme();
    updateProducts();
    
    closeModal('quizModal');
    
    // Update result modal
    const colors = MEMBER_COLORS[member];
    document.getElementById('resultModalTitle').style.color = colors[3];
    document.getElementById('resultMemberName').textContent = member;
    document.getElementById('resultMemberName').style.color = colors[2];
    document.getElementById('resultText').textContent = `Your bias is ${member}! Your theme has been updated.`;
    document.getElementById('startShoppingBtn').style.backgroundColor = colors[2];
    document.getElementById('resultPlaceholder').querySelector('svg').style.color = colors[2];
    
    // Try to load member image
    const img = document.getElementById('resultImage');
    img.src = `/kpop/assets/member-${member}.png`;
    img.onload = () => {
        img.style.display = 'block';
        document.getElementById('resultPlaceholder').style.display = 'none';
    };
    img.onerror = () => {
        img.style.display = 'none';
        document.getElementById('resultPlaceholder').style.display = 'flex';
    };
    
    openModal('resultModal');
}

function generateMailto(name, email, subscribe) {
    const wishlistText = wishlist.map(item => 
        `${item.name} (${item.member} version)`
    ).join('\n');
    
    const body = `Name: ${name}\nEmail: ${email}\nSubscribe to emails: ${subscribe ? 'Yes' : 'No'}\n\nWishlist:\n${wishlistText}`;
    
    return `mailto:orders@sunniejae.com?subject=KPOP FANDOM SHOP ORDER&body=${encodeURIComponent(body)}`;
}

function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}
