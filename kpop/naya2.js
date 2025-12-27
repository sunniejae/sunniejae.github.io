// K-Pop Shop Configuration
const MEMBERS = ['MAI', 'JEEMIN', 'KOKO', 'SARANG', 'JUNGEUN', 'SAEBI',];

const PRODUCTS = [
    {
        id: 1,
        name: 'Light Stick Keychain',
        description: 'Official light stick keychain charm'
    },
    {
        id: 2,
        name: 'Hangul Sticker',
        description: 'Premium hangul name sticker'
    },
    {
        id: 3,
        name: 'Autographic',
        description: 'Authentic signature print'
    },
    {
        id: 4,
        name: 'Comeback Sticker',
        description: 'Limited edition comeback sticker'
    },
    {
        id: 5,
        name: 'Phone Case',
        description: 'Premium protective phone case'
    }
];

const MEMBER_THEMES = {
    MAI: {
        primary: '#FF6B9D',
        secondary: '#C44569',
        accent: '#FEC368',
        bg: '#FFF5F7',
        cardBg: '#FFFFFF'
    },
    JEEMIN: {
        primary: '#6C5CE7',
        secondary: '#5F3DC4',
        accent: '#A29BFE',
        bg: '#F5F3FF',
        cardBg: '#FFFFFF'
    },
    KOKO: {
        primary: '#00B894',
        secondary: '#00896C',
        accent: '#55EFC4',
        bg: '#F0FFF9',
        cardBg: '#FFFFFF'
    },
    SARANG: {
        primary: '#E74C3C',
        secondary: '#C0392B',
        accent: '#EC7063',
        bg: '#FDEDEC',
        cardBg: '#FFFFFF'
    },
    JUNGEUN: {
        primary: '#F39C12',
        secondary: '#D68910',
        accent: '#F8C471',
        bg: '#FEF5E7',
        cardBg: '#FFFFFF'
    },
    SAEBI: {
        primary: '#2D3436',
        secondary: '#636E72',
        accent: '#B2BEC3',
        bg: '#F5F6F7',
        cardBg: '#FFFFFF'
    },
    SARANG: {
        primary: '#0984E3',
        secondary: '#0652DD',
        accent: '#74B9FF',
        bg: '#F0F8FF',
        cardBg: '#FFFFFF'
    },
    MAI: {
        primary: '#3498DB',
        secondary: '#2874A6',
        accent: '#85C1E9',
        bg: '#EBF5FB',
        cardBg: '#FFFFFF'
    },
    SAEBI: {
        primary: '#8E44AD',
        secondary: '#6C3483',
        accent: '#BB8FCE',
        bg: '#F4ECF7',
        cardBg: '#FFFFFF'
    }
};

const QUIZ_QUESTIONS = [
    {
        question: 'What\'s your favorite color?',
        options: [
            { text: 'Pink/Red', members: ['MAI', 'SARANG'] },
            { text: 'Purple/Violet', members: ['JEEMIN'] },
            { text: 'Green/Teal', members: ['KOKO'] },
            { text: 'Orange/Coral', members: ['SARANG', 'JUNGEUN'] },
            { text: 'Yellow/Gold', members: ['JUNGEUN'] },
            { text: 'Black/Gray', members: ['SAEBI'] },
            { text: 'Blue/Sky Blue', members: ['JEEMIN] },
            { text: 'Navy/Deep Blue', members: ['JEEMIN'] },
            { text: 'Purple/Lavender', members: ['JEEMIN'] }
        ]
    },
    {
        question: 'Are you more of an introvert or extrovert?',
        options: [
            { text: 'Extreme extrovert - I\'m the life of the party!', members: ['MAI', 'JUNGEUN'] },
            { text: 'Deep introvert - I cherish solitude', members: ['KOKO', 'SAEBI'] }
        ]
    },
    {
        question: 'Are you more down to earth or head in the clouds?',
        options: [
            { text: 'Very practical and grounded', members: ['SAEBI', 'KOKO'] },
            { text: 'Free spirit', members: ['MAI', 'JUNGEUN'] }
        ]
    },
    {
        question: 'Do you lead with your head or your heart?',
        options: [
            { text: 'Pure logic and reason', members: ['SAEBI', 'JEEMIN'] },
            { text: 'Passionate and emotional', members: ['SARANG', 'JUNGEUN'] }
        ]
    },
    {
        question: 'Order or chaos?',
        options: [
            { text: 'Everything must be organized', members: ['SAEBI'] },
            { text: 'Love structure and order', members: ['SAEBI', 'SARANG'] },
            { text: 'Organized but flexible', members: ['KOKO', 'JEEMIN'] },
            { text: 'Structured creativity', members: ['SARANG', 'MAI'] },
            { text: 'Organized chaos', members: ['JEEMIN', 'SARANG'] },
            { text: 'Flexible and spontaneous', members: ['JUNGEUN', 'MAI'] },
            { text: 'Controlled chaos', members: ['SARANG', 'JUNGEUN'] },
            { text: 'Spontaneity is life!', members: ['MAI', 'SAEBI'] },
            { text: 'Complete chaos is fun', members: ['SAEBI'] }
        ]
    },
    {
        question: 'What\'s your favorite animal?',
        options: [
            { text: 'Dog - loyal and energetic', members: ['MAI', 'JUNGEUN'] },
            { text: 'Cat - independent and mysterious', members: ['SAEBI', 'SAEBI'] },
            { text: 'Bird - free and soaring', members: ['SARANG', 'MAI'] },
            { text: 'Wolf - strong and protective', members: ['SARANG', 'SAEBI'] },
            { text: 'Dolphin - intelligent and playful', members: ['JEEMIN', 'MAI'] },
            { text: 'Tiger - powerful and fierce', members: ['SARANG', 'JUNGEUN'] },
            { text: 'Rabbit - gentle and quick', members: ['MAI', 'KOKO'] },
            { text: 'Fox - clever and adaptable', members: ['SARANG', 'JEEMIN'] },
            { text: 'Bear - strong yet gentle', members: ['KOKO', 'SAEBI'] }
        ]
    },
    {
        question: 'Which other artist do you follow?',
        options: [
            { text: 'Blackpink', members: ['MAI', 'SARANG'] },
            { text: 'Twice', members: ['JEEMIN', 'JUNGEUN'] },
            { text: 'Seventeen', members: ['KOKO', 'SARANG'] },
            { text: 'Stray Kids', members: ['SARANG', 'SAEBI'] },
            { text: 'TXT', members: ['JUNGEUN', 'JEEMIN'] },
            { text: 'NCT', members: ['SAEBI', 'SARANG'] },
            { text: 'Ateez', members: ['SARANG', 'MAI'] },
            { text: 'IVE', members: ['MAI', 'JEEMIN'] },
            { text: 'NewJeans', members: ['SAEBI', 'MAI'] }
        ]
    },
    {
        question: 'What\'s your favorite music vibe?',
        options: [
            { text: 'Bright and energetic pop', members: ['MAI', 'JUNGEUN'] },
            { text: 'Dreamy and ethereal', members: ['JEEMIN', 'MAI'] },
            { text: 'Emotional and deep', members: ['SAEBI', 'KOKO'] },
            { text: 'Powerful and intense', members: ['SARANG', 'SAEBI'] },
            { text: 'Fun and upbeat', members: ['JUNGEUN', 'JEEMIN'] },
            { text: 'Dark and edgy', members: ['SAEBI', 'SAEBI'] },
            { text: 'Fresh and refreshing', members: ['SARANG', 'KOKO'] },
            { text: 'Smooth and chill', members: ['MAI', 'KOKO'] },
            { text: 'Mysterious and artistic', members: ['SAEBI', 'SARANG'] }
        ]
    },
    {
        question: 'What\'s your ideal hangout?',
        options: [
            { text: 'Loud party with everyone', members: ['MAI', 'JUNGEUN'] },
            { text: 'Art gallery or museum', members: ['JEEMIN', 'SAEBI'] },
            { text: 'Quiet nature walk', members: ['KOKO', 'MAI'] },
            { text: 'Intense gaming session', members: ['SARANG', 'SARANG'] },
            { text: 'Fun amusement park', members: ['JUNGEUN', 'MAI'] },
            { text: 'Gym or sports activity', members: ['SARANG', 'SAEBI'] },
            { text: 'Beach or pool day', members: ['SARANG', 'JEEMIN'] },
            { text: 'Cozy café with a book', members: ['MAI', 'SAEBI'] },
            { text: 'Late night deep talks', members: ['SAEBI', 'KOKO'] }
        ]
    }
];

// State
let currentBias = 'MAI';
let wishlist = [];
let quizAnswers = [];

// Initialize
function init() {
    renderBiasButtons();
    renderProducts();
    updateWishlistCount();
    applyTheme(currentBias);
}

// Render bias selection buttons
function renderBiasButtons() {
    const container = document.getElementById('biasButtons');
    container.innerHTML = MEMBERS.map(member => `
        <button class="bias-btn ${member === currentBias ? 'active' : ''}" 
                onclick="selectBias('${member}')">
            <span>${member}</span>
        </button>
    `).join('');
}

// Select bias and update theme
function selectBias(member) {
    currentBias = member;
    applyTheme(member);
    renderBiasButtons();
    renderProducts();
}

// Apply theme based on selected bias
function applyTheme(member) {
    const theme = MEMBER_THEMES[member];
    const root = document.documentElement;
    
    root.style.setProperty('--primary', theme.primary);
    root.style.setProperty('--secondary', theme.secondary);
    root.style.setProperty('--accent', theme.accent);
    root.style.setProperty('--bg', theme.bg);
    root.style.setProperty('--card-bg', theme.cardBg);
}

// Render products
function renderProducts() {
    const container = document.getElementById('productGrid');
    container.innerHTML = PRODUCTS.map(product => {
        const isInWishlist = wishlist.some(item => item.id === product.id && item.member === currentBias);
        return `
            <div class="product-card">
                <div class="product-image">
                    <img src="/assets/collection-${currentBias}.png" 
                         alt="${product.name} - ${currentBias}"
                         onerror="this.parentElement.innerHTML='<div style=\\'font-size:3rem;color:#ccc;\\'>📦</div>'">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <button class="add-to-wishlist ${isInWishlist ? 'added' : ''}" 
                            onclick="toggleWishlist(${product.id})"
                            data-product-id="${product.id}">
                        ${isInWishlist ? 'Added to Wishlist ♥' : 'Add to Wishlist ♡'}
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Toggle product in wishlist
function toggleWishlist(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    const existingIndex = wishlist.findIndex(item => 
        item.id === productId && item.member === currentBias
    );
    
    if (existingIndex > -1) {
        wishlist.splice(existingIndex, 1);
    } else {
        wishlist.push({
            id: product.id,
            name: product.name,
            member: currentBias
        });
    }
    
    updateWishlistCount();
    renderProducts();
}

// Update wishlist count
function updateWishlistCount() {
    const count = wishlist.length;
    const countElement = document.querySelector('.wishlist-count');
    countElement.textContent = count;
    
    if (count > 0) {
        countElement.style.animation = 'none';
        setTimeout(() => {
            countElement.style.animation = 'pulse 0.5s ease';
        }, 10);
    }
}

// Open wishlist modal
function openWishlistModal() {
    const modal = document.getElementById('wishlistModal');
    const itemsContainer = document.getElementById('wishlistItems');
    
    if (wishlist.length === 0) {
        itemsContainer.innerHTML = '<div class="empty-wishlist">Your wishlist is empty. Add some items!</div>';
    } else {
        // Group by member
        const groupedWishlist = {};
        wishlist.forEach(item => {
            if (!groupedWishlist[item.member]) {
                groupedWishlist[item.member] = [];
            }
            groupedWishlist[item.member].push(item);
        });
        
        itemsContainer.innerHTML = Object.entries(groupedWishlist).map(([member, items]) => `
            <div style="margin-bottom: 1.5rem;">
                <h4 style="font-family: 'Rubik', sans-serif; font-weight: 700; color: var(--primary); margin-bottom: 0.75rem;">
                    ${member} Collection
                </h4>
                ${items.map(item => `
                    <div class="wishlist-item">
                        <span>${item.name}</span>
                        <button class="remove-item" onclick="removeFromWishlist(${item.id}, '${member}')">
                            Remove
                        </button>
                    </div>
                `).join('')}
            </div>
        `).join('');
    }
    
    modal.classList.add('active');
}

// Remove item from wishlist
function removeFromWishlist(productId, member) {
    const index = wishlist.findIndex(item => item.id === productId && item.member === member);
    if (index > -1) {
        wishlist.splice(index, 1);
    }
    updateWishlistCount();
    openWishlistModal();
    renderProducts();
}

// Submit order
function submitOrder(event) {
    event.preventDefault();
    
    const name = document.getElementById('customerName').value;
    const email = document.getElementById('customerEmail').value;
    const subscribe = document.getElementById('subscribeEmails').checked;
    
    // Group wishlist by member
    const groupedWishlist = {};
    wishlist.forEach(item => {
        if (!groupedWishlist[item.member]) {
            groupedWishlist[item.member] = [];
        }
        groupedWishlist[item.member].push(item.name);
    });
    
    // Format wishlist for email
    let wishlistText = '';
    Object.entries(groupedWishlist).forEach(([member, items]) => {
        wishlistText += `${member} Collection:%0A`;
        items.forEach(item => {
            wishlistText += `  - ${item}%0A`;
        });
        wishlistText += '%0A';
    });
    
    const body = `Name: ${name}%0A%0AEmail: ${email}%0A%0AWishlist:%0A${wishlistText}%0ASubscribe to emails: ${subscribe ? 'Yes' : 'No'}`;
    
    const mailtoLink = `mailto:orders@sunniejae.com?subject=KPOP FANDOM SHOP ORDER&body=${body}`;
    
    window.location.href = mailtoLink;
}

// Open quiz modal
function openQuizModal() {
    const modal = document.getElementById('quizModal');
    quizAnswers = [];
    renderQuiz();
    modal.classList.add('active');
}

// Render quiz
function renderQuiz() {
    const container = document.getElementById('quizContent');
    const currentQuestion = quizAnswers.length;
    
    if (currentQuestion >= QUIZ_QUESTIONS.length) {
        showQuizResult();
        return;
    }
    
    const question = QUIZ_QUESTIONS[currentQuestion];
    
    container.innerHTML = `
        <div class="quiz-question">
            <h3>Question ${currentQuestion + 1} of ${QUIZ_QUESTIONS.length}</h3>
            <h3>${question.question}</h3>
            <div class="quiz-options">
                ${question.options.map((option, index) => `
                    <div class="quiz-option" onclick='selectQuizAnswer(${JSON.stringify(option.members)})'>
                        ${option.text}
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Select quiz answer
function selectQuizAnswer(members) {
    // Add all members from this answer to the quiz results
    quizAnswers.push(...members);
    
    // Add visual feedback
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(option => {
        option.classList.add('selected');
    });
    
    // Move to next question after brief delay
    setTimeout(() => {
        renderQuiz();
    }, 300);
}

// Show quiz result
function showQuizResult() {
    // Count member occurrences
    const memberCounts = {};
    quizAnswers.forEach(member => {
        memberCounts[member] = (memberCounts[member] || 0) + 1;
    });
    
    // Find most common member
    let maxCount = 0;
    let bias = 'MAI';
    Object.entries(memberCounts).forEach(([member, count]) => {
        if (count > maxCount) {
            maxCount = count;
            bias = member;
        }
    });
    
    const container = document.getElementById('quizContent');
    container.innerHTML = `
        <div class="quiz-result">
            <h3>Your Bias Match!</h3>
            <div style="font-size: 4rem; margin: 1rem 0;">✨</div>
            <div class="result-image-container">
                <img src="/assets/result-${bias}.png" 
                     alt="${bias}" 
                     class="result-image"
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="result-image-placeholder" style="display: none;">
                    <span style="font-size: 5rem;">💖</span>
                </div>
            </div>
            <h3 style="font-size: 3rem; margin: 1rem 0;">${bias}</h3>
            <p>Based on your answers, ${bias} is your perfect bias match!</p>
            <button class="submit-btn" onclick="applyQuizResult('${bias}')">
                Set as My Bias
            </button>
            <button class="submit-btn" onclick="openQuizModal()" 
                    style="background: #95a5a6; margin-top: 0.5rem;">
                Retake Quiz
            </button>
        </div>
    `;
}

// Apply quiz result
function applyQuizResult(bias) {
    selectBias(bias);
    closeModal('quizModal');
}

// Close modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
}

// Close modal on outside click
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', init);
