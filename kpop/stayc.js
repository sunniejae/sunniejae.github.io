// K-Pop Shop Configuration
const MEMBERS = ['SUMIN', 'SIEUN', 'SEEUN', 'ISA', 'YOON', 'J'];

const PRODUCTS = [
    {
        id: 1,
        name: 'Light Stick Keychain',
        description: 'Official light stick keychain charm'
    },
    {
        id: 2,
        name: 'Hangul',
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
    SUMIN: {
        primary: '#FF0080',
        secondary: '#CC0066',
        accent: '#CC0066',
        bg: '#FFF0F9',
        cardBg: '#FFFFFF'
    },
    SIEUN: {
        primary: '#FAF3FD',
        secondary: '#E8D5F2',
        accent: '#C77DFF',
        bg: '#FCFAFF',
        cardBg: '#FFFFFF'
    },
    SEEUN: {
        primary: '#008EFF',
        secondary: '#0066CC',
        accent: '#00D9FF',
        bg: '#E6F7FF',
        cardBg: '#FFFFFF'
    },
    ISA: {
        primary: '#4A5D68',
        secondary: '#2C3E47',
        accent: '#7DD3C0',
        bg: '#F2F5F7',
        cardBg: '#FFFFFF'
    },
    YOON: {
        primary: '#00FF7F',
        secondary: '#00CC66',
        accent: '#7FFFD4',
        bg: '#E6FFF5',
        cardBg: '#FFFFFF'
    },
    J: {
        primary: '#FF002B',
        secondary: '#CC0022',
        accent: '#FF6B88',
        bg: '#FFEBEF',
        cardBg: '#FFFFFF'
    },
  

const QUIZ_QUESTIONS = [
    {
        question: 'What\'s your favorite color?',
        options: [
            { text: 'Pink/Red', members: ['SUMIN', 'ISA'] },
            { text: 'Purple/Violet', members: ['SIEUN', 'PLUTO'] },
            { text: 'Green/Teal', members: ['SEEUN'] },
            { text: 'Orange/Coral', members: ['ISA', 'YOON'] },
            { text: 'Yellow/Gold', members: ['YOON'] },
            { text: 'Black/Gray', members: ['J'] },
            { text: 'Blue/Sky Blue', members: ['URANUS', 'NEPTUNE'] },
            { text: 'Navy/Deep Blue', members: ['NEPTUNE'] },
            { text: 'Purple/Lavender', members: ['PLUTO', 'SIEUN'] }
        ]
    },
    {
        question: 'Are you more of an introvert or extrovert?',
        options: [
            { text: 'Extreme extrovert - I\'m the life of the party!', members: ['SUMIN', 'YOON'] },
            { text: 'Outgoing extrovert', members: ['SIEUN', 'ISA'] },
            { text: 'Ambivert leaning extrovert', members: ['SEEUN', 'URANUS'] },
            { text: 'True ambivert', members: ['SEEUN', 'SIEUN', 'URANUS'] },
            { text: 'Ambivert leaning introvert', members: ['NEPTUNE', 'PLUTO'] },
            { text: 'Quiet introvert', members: ['J', 'PLUTO'] },
            { text: 'Social but need alone time', members: ['SIEUN', 'NEPTUNE'] },
            { text: 'Selective extrovert', members: ['ISA', 'J'] },
            { text: 'Deep introvert - I cherish solitude', members: ['PLUTO', 'J'] }
        ]
    },
    {
        question: 'Are you more down to SEEUN or head in the clouds?',
        options: [
            { text: 'Very practical and grounded', members: ['J', 'SEEUN'] },
            { text: 'Mostly down to SEEUN', members: ['ISA', 'YOON'] },
            { text: 'Balanced but practical', members: ['URANUS', 'SUMIN'] },
            { text: 'Perfectly balanced', members: ['SEEUN', 'SIEUN'] },
            { text: 'Balanced but dreamy', members: ['NEPTUNE', 'SIEUN'] },
            { text: 'Head in the clouds', members: ['PLUTO', 'NEPTUNE'] },
            { text: 'Total dreamer', members: ['PLUTO'] },
            { text: 'Visionary but realistic', members: ['URANUS', 'YOON'] },
            { text: 'Free spirit', members: ['SUMIN', 'YOON'] }
        ]
    },
    {
        question: 'Do you lead with your head or your heart?',
        options: [
            { text: 'Pure logic and reason', members: ['J', 'URANUS'] },
            { text: 'Head first, always', members: ['ISA', 'J'] },
            { text: 'Logic but consider feelings', members: ['SEEUN', 'URANUS'] },
            { text: 'Both equally', members: ['SIEUN', 'YOON'] },
            { text: 'Heart with some logic', members: ['NEPTUNE', 'SEEUN'] },
            { text: 'Heart over head', members: ['SUMIN', 'SIEUN'] },
            { text: 'All emotions, all the time', members: ['SUMIN', 'PLUTO'] },
            { text: 'Intuition and feelings', members: ['PLUTO', 'NEPTUNE'] },
            { text: 'Passionate and emotional', members: ['ISA', 'YOON'] }
        ]
    },
    {
        question: 'Order or chaos?',
        options: [
            { text: 'Everything must be organized', members: ['J'] },
            { text: 'Love structure and order', members: ['J', 'URANUS'] },
            { text: 'Organized but flexible', members: ['SEEUN', 'SIEUN'] },
            { text: 'Structured creativity', members: ['URANUS', 'NEPTUNE'] },
            { text: 'Organized chaos', members: ['SIEUN', 'ISA'] },
            { text: 'Flexible and spontaneous', members: ['YOON', 'SUMIN'] },
            { text: 'Controlled chaos', members: ['ISA', 'YOON'] },
            { text: 'Spontaneity is life!', members: ['SUMIN', 'PLUTO'] },
            { text: 'Complete chaos is fun', members: ['PLUTO'] }
        ]
    },
    {
        question: 'What\'s your favorite animal?',
        options: [
            { text: 'Dog - loyal and energetic', members: ['SUMIN', 'YOON'] },
            { text: 'Cat - independent and mysterious', members: ['PLUTO', 'J'] },
            { text: 'Bird - free and soaring', members: ['URANUS', 'NEPTUNE'] },
            { text: 'Wolf - strong and protective', members: ['ISA', 'J'] },
            { text: 'Dolphin - intelligent and playful', members: ['SIEUN', 'NEPTUNE'] },
            { text: 'Tiger - powerful and fierce', members: ['ISA', 'YOON'] },
            { text: 'Rabbit - gentle and quick', members: ['SUMIN', 'SEEUN'] },
            { text: 'Fox - clever and adaptable', members: ['URANUS', 'SIEUN'] },
            { text: 'Bear - strong yet gentle', members: ['SEEUN', 'J'] }
        ]
    },
    {
        question: 'Which other artist do you follow?',
        options: [
            { text: 'Blackpink', members: ['SUMIN', 'ISA'] },
            { text: 'Twice', members: ['SIEUN', 'YOON'] },
            { text: 'Seventeen', members: ['SEEUN', 'URANUS'] },
            { text: 'Stray Kids', members: ['ISA', 'J'] },
            { text: 'TXT', members: ['YOON', 'SIEUN'] },
            { text: 'NCT', members: ['J', 'URANUS'] },
            { text: 'Ateez', members: ['URANUS', 'NEPTUNE'] },
            { text: 'IVE', members: ['SUMIN', 'SIEUN'] },
            { text: 'NewJeans', members: ['PLUTO', 'NEPTUNE'] }
        ]
    },
    {
        question: 'What\'s your favorite music vibe?',
        options: [
            { text: 'Bright and energetic pop', members: ['SUMIN', 'YOON'] },
            { text: 'Dreamy and ethereal', members: ['SIEUN', 'NEPTUNE'] },
            { text: 'Emotional and deep', members: ['PLUTO', 'SEEUN'] },
            { text: 'Powerful and intense', members: ['ISA', 'J'] },
            { text: 'Fun and upbeat', members: ['YOON', 'SIEUN'] },
            { text: 'Dark and edgy', members: ['J', 'PLUTO'] },
            { text: 'Fresh and refreshing', members: ['URANUS', 'SEEUN'] },
            { text: 'Smooth and chill', members: ['NEPTUNE', 'SEEUN'] },
            { text: 'Mysterious and artistic', members: ['PLUTO', 'URANUS'] }
        ]
    },
    {
        question: 'What\'s your ideal hangout?',
        options: [
            { text: 'Loud party with everyone', members: ['SUMIN', 'YOON'] },
            { text: 'Art gallery or museum', members: ['SIEUN', 'PLUTO'] },
            { text: 'Quiet nature walk', members: ['SEEUN', 'NEPTUNE'] },
            { text: 'Intense gaming session', members: ['ISA', 'URANUS'] },
            { text: 'Fun amusement park', members: ['YOON', 'SUMIN'] },
            { text: 'Gym or sports activity', members: ['ISA', 'J'] },
            { text: 'Beach or pool day', members: ['URANUS', 'SIEUN'] },
            { text: 'Cozy café with a book', members: ['NEPTUNE', 'J'] },
            { text: 'Late night deep talks', members: ['PLUTO', 'SEEUN'] }
        ]
    }
];

// State
let currentBias = 'SUMIN';
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
    let bias = 'SUMIN';
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
