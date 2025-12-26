// Configuration
const MEMBERS = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'];

const MEMBER_COLORS = {
    Mercury: ['#E8E8E8', '#B8B8D1', '#8B8BA7', '#4A4A6A'],
    Venus: ['#FFB3D9', '#FF69B4', '#8B2E5A', '#4A1942'],
    Earth: ['#93C5FD', '#3B82F6', '#1E3A8A', '#0F172A'],
    Mars: ['#86EFAC', '#22C55E', '#0D5C2D', '#052E16'],
    Jupiter: ['#FCA5A5', '#EF4444', '#7F1D1D', '#450A0A'],
    Saturn: ['#FFD6F5', '#FF6EC7', '#C71585', '#6B0F4A'],
    Uranus: ['#FFFFFF', '#E6E6FA', '#9370DB', '#6A4C9C'],
    Neptune: ['#B3E5FC', '#00BFFF', '#0066CC', '#003366'],
    Pluto: ['#D3D3D3', '#808080', '#3D3D3D', '#0A0A0A']
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
            { text: 'Pink', members: ['Mercury', 'Venus', 'Mars'] },
            { text: 'Blue', members: ['Earth', 'Saturn', 'Neptune'] },
            { text: 'Green', members: ['Earth', 'Uranus'] },
            { text: 'Purple', members: ['Jupiter', 'Pluto', 'Venus'] }
        ]
    },
    {
        question: "Are you more of an introvert or extrovert?",
        options: [
            { text: 'Introvert', members: ['Saturn', 'Neptune', 'Uranus'] },
            { text: 'Extrovert', members: ['Mars', 'Jupiter', 'Venus'] },
            { text: 'Ambivert (both)', members: ['Mercury', 'Earth', 'Pluto'] },
            { text: 'Depends on the day', members: ['Mercury', 'Mars', 'Neptune'] }
        ]
    },
    {
        question: "Down to earth or head in the clouds?",
        options: [
            { text: 'Down to earth', members: ['Earth', 'Saturn', 'Mars'] },
            { text: 'Head in the clouds', members: ['Neptune', 'Jupiter', 'Venus'] },
            { text: 'Both equally', members: ['Mercury', 'Uranus'] },
            { text: 'Floating in between', members: ['Pluto', 'Venus', 'Neptune'] }
        ]
    },
    {
        question: "Do you lead with your head or your heart?",
        options: [
            { text: 'Head (logical)', members: ['Saturn', 'Mercury', 'Uranus'] },
            { text: 'Heart (emotional)', members: ['Venus', 'Neptune', 'Mars'] },
            { text: 'Both equally', members: ['Earth', 'Jupiter'] },
            { text: 'Gut instinct', members: ['Pluto', 'Mars', 'Jupiter'] }
        ]
    },
    {
        question: "Order or chaos?",
        options: [
            { text: 'Order all the way', members: ['Saturn', 'Mercury', 'Earth'] },
            { text: 'Controlled chaos', members: ['Jupiter', 'Uranus', 'Mars'] },
            { text: 'Complete chaos', members: ['Neptune', 'Pluto'] },
            { text: 'Organized mess', members: ['Venus', 'Mercury', 'Earth'] }
        ]
    },
    {
        question: "What's your favorite animal?",
        options: [
            { text: 'Cat', members: ['Mercury', 'Saturn', 'Pluto'] },
            { text: 'Dog', members: ['Mars', 'Jupiter', 'Venus'] },
            { text: 'Bird', members: ['Uranus', 'Neptune', 'Mercury'] },
            { text: 'Something exotic', members: ['Pluto', 'Neptune', 'Jupiter'] }
        ]
    },
    {
        question: "What other artist do you follow?",
        options: [
            { text: 'BTS', members: ['Mars', 'Jupiter', 'Mercury'] },
            { text: 'BLACKPINK', members: ['Venus', 'Neptune', 'Pluto'] },
            { text: 'SEVENTEEN', members: ['Earth', 'Saturn', 'Uranus'] },
            { text: 'NewJeans', members: ['Mercury', 'Venus', 'Neptune'] }
        ]
    },
    {
        question: "What's your favorite era?",
        options: [
            { text: 'Debut Era', members: ['Mercury', 'Earth', 'Mars'] },
            { text: 'First Comeback', members: ['Venus', 'Jupiter'] },
            { text: 'Peak Era', members: ['Saturn', 'Uranus', 'Neptune'] },
            { text: 'Latest Comeback', members: ['Pluto', 'Mars', 'Venus'] }
        ]
    }
];

// State
let selectedBias = MEMBERS[0];
let wishlist = [];
let quizAnswers = {};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeMemberButtons();
    initializeProducts();
    initializeQuiz();
    updateTheme();
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
                        src="/assets/${product.imageFormat}-${selectedBias}.png" 
                        alt="${product.name} - ${selectedBias}"
                        class="product-image"
                        data-product="${product.id}"
                        data-member="${selectedBias}"
                        onerror="this.onerror=null; this.src='/assets/blank-${selectedBias}.png';"
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
    
    // Update background
    document.body.style.background = `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 50%, ${colors[2]} 100%)`;
    
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
    // Update product images
    document.querySelectorAll('.product-image').forEach(img => {
        const productId = parseInt(img.dataset.product);
        const product = PRODUCTS.find(p => p.id === productId);
        if (product && product.type === 'exclusive') {
            img.src = `/assets/${product.imageFormat}-${selectedBias}.png`;
            img.onerror = function() {
                this.onerror = null;
                this.src = `/assets/blank-${selectedBias}.png`;
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
    updateWishlistUI();
}

function removeFromWishlist(uniqueId) {
    wishlist = wishlist.filter(item => item.uniqueId !== uniqueId);
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
            memberScores[member]++;
        });
    });
    
    const maxScore = Math.max(...Object.values(memberScores));
    const topMembers = Object.keys(memberScores).filter(member => memberScores[member] === maxScore);
    const result = topMembers[Math.floor(Math.random() * topMembers.length)];
    
    showResult(result);
}

function showResult(member) {
    selectedBias = member;
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
    img.src = `/assets/member-${member}.png`;
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
