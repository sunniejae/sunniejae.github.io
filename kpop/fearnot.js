// K-Pop Shop Configuration
const MEMBERS = ['SAKURA', 'CHAEWON', 'KAZUHA', 'YUNJIN', 'EUNCHAE', 'SATURN', 'URANUS', 'NEPTUNE', 'PLUTO'];

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
    SAKURA: {
        primary: '#980369',
        secondary: '#C23F77',
        accent: '#C79F99',
        bg: '#5D244E',
        cardBg: '#FEFFF5'
    },
    CHAEWON: {
        primary: '#6C5CE7',
        secondary: '#5F3DC4',
        accent: '#A29BFE',
        bg: '#F5F3FF',
        cardBg: '#FFFFFF'
    },
    KAZUHA: {
        primary: '#00B894',
        secondary: '#00896C',
        accent: '#55EFC4',
        bg: '#F0FFF9',
        cardBg: '#FFFFFF'
    },
    YUNJIN: {
        primary: '#7aa94b',
        secondary: '#393830',
        accent: '#DAD0BA',
        bg: '#393830',
        cardBg: '#DAD0BA'
    },
    EUNCHAE: {
        primary: '#F39C12',
        secondary: '#D68910',
        accent: '#F8C471',
        bg: '#FEF5E7',
        cardBg: '#FFFFFF'
    },
    SATURN: {
        primary: '#2D3436',
        secondary: '#636E72',
        accent: '#B2BEC3',
        bg: '#F5F6F7',
        cardBg: '#FFFFFF'
    },
    URANUS: {
        primary: '#0984E3',
        secondary: '#0652DD',
        accent: '#74B9FF',
        bg: '#F0F8FF',
        cardBg: '#FFFFFF'
    },
    NEPTUNE: {
        primary: '#3498DB',
        secondary: '#2874A6',
        accent: '#85C1E9',
        bg: '#EBF5FB',
        cardBg: '#FFFFFF'
    },
    PLUTO: {
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
            { text: 'Pink/Red', members: ['SAKURA', 'YUNJIN'] },
            { text: 'Purple/Violet', members: ['CHAEWON', 'PLUTO'] },
            { text: 'Green/Teal', members: ['KAZUHA'] },
            { text: 'Orange/Coral', members: ['YUNJIN', 'EUNCHAE'] },
            { text: 'Yellow/Gold', members: ['EUNCHAE'] },
            { text: 'Black/Gray', members: ['SATURN'] },
            { text: 'Blue/Sky Blue', members: ['URANUS', 'NEPTUNE'] },
            { text: 'Navy/Deep Blue', members: ['NEPTUNE'] },
            { text: 'Purple/Lavender', members: ['PLUTO', 'CHAEWON'] }
        ]
    },
    {
        question: 'Are you more of an introvert or extrovert?',
        options: [
            { text: 'Extreme extrovert - I\'m the life of the party!', members: ['SAKURA', 'EUNCHAE'] },
            { text: 'Outgoing extrovert', members: ['CHAEWON', 'YUNJIN'] },
            { text: 'Ambivert leaning extrovert', members: ['KAZUHA', 'URANUS'] },
            { text: 'True ambivert', members: ['KAZUHA', 'CHAEWON', 'URANUS'] },
            { text: 'Ambivert leaning introvert', members: ['NEPTUNE', 'PLUTO'] },
            { text: 'Quiet introvert', members: ['SATURN', 'PLUTO'] },
            { text: 'Social but need alone time', members: ['CHAEWON', 'NEPTUNE'] },
            { text: 'Selective extrovert', members: ['YUNJIN', 'SATURN'] },
            { text: 'Deep introvert - I cherish solitude', members: ['PLUTO', 'SATURN'] }
        ]
    },
    {
        question: 'Are you more down to earth or head in the clouds?',
        options: [
            { text: 'Very practical and grounded', members: ['SATURN', 'KAZUHA'] },
            { text: 'Mostly down to earth', members: ['YUNJIN', 'EUNCHAE'] },
            { text: 'Balanced but practical', members: ['URANUS', 'SAKURA'] },
            { text: 'Perfectly balanced', members: ['KAZUHA', 'CHAEWON'] },
            { text: 'Balanced but dreamy', members: ['NEPTUNE', 'CHAEWON'] },
            { text: 'Head in the clouds', members: ['PLUTO', 'NEPTUNE'] },
            { text: 'Total dreamer', members: ['PLUTO'] },
            { text: 'Visionary but realistic', members: ['URANUS', 'EUNCHAE'] },
            { text: 'Free spirit', members: ['SAKURA', 'EUNCHAE'] }
        ]
    },
    {
        question: 'Do you lead with your head or your heart?',
        options: [
            { text: 'Pure logic and reason', members: ['SATURN', 'URANUS'] },
            { text: 'Head first, always', members: ['YUNJIN', 'SATURN'] },
            { text: 'Logic but consider feelings', members: ['KAZUHA', 'URANUS'] },
            { text: 'Both equally', members: ['CHAEWON', 'EUNCHAE'] },
            { text: 'Heart with some logic', members: ['NEPTUNE', 'KAZUHA'] },
            { text: 'Heart over head', members: ['SAKURA', 'CHAEWON'] },
            { text: 'All emotions, all the time', members: ['SAKURA', 'PLUTO'] },
            { text: 'Intuition and feelings', members: ['PLUTO', 'NEPTUNE'] },
            { text: 'Passionate and emotional', members: ['YUNJIN', 'EUNCHAE'] }
        ]
    },
    {
        question: 'Order or chaos?',
        options: [
            { text: 'Everything must be organized', members: ['SATURN'] },
            { text: 'Love structure and order', members: ['SATURN', 'URANUS'] },
            { text: 'Organized but flexible', members: ['KAZUHA', 'CHAEWON'] },
            { text: 'Structured creativity', members: ['URANUS', 'NEPTUNE'] },
            { text: 'Organized chaos', members: ['CHAEWON', 'YUNJIN'] },
            { text: 'Flexible and spontaneous', members: ['EUNCHAE', 'SAKURA'] },
            { text: 'Controlled chaos', members: ['YUNJIN', 'EUNCHAE'] },
            { text: 'Spontaneity is life!', members: ['SAKURA', 'PLUTO'] },
            { text: 'Complete chaos is fun', members: ['PLUTO'] }
        ]
    },
    {
        question: 'What\'s your favorite animal?',
        options: [
            { text: 'Dog - loyal and energetic', members: ['SAKURA', 'EUNCHAE'] },
            { text: 'Cat - independent and mysterious', members: ['PLUTO', 'SATURN'] },
            { text: 'Bird - free and soaring', members: ['URANUS', 'NEPTUNE'] },
            { text: 'Wolf - strong and protective', members: ['YUNJIN', 'SATURN'] },
            { text: 'Dolphin - intelligent and playful', members: ['CHAEWON', 'NEPTUNE'] },
            { text: 'Tiger - powerful and fierce', members: ['YUNJIN', 'EUNCHAE'] },
            { text: 'Rabbit - gentle and quick', members: ['SAKURA', 'KAZUHA'] },
            { text: 'Fox - clever and adaptable', members: ['URANUS', 'CHAEWON'] },
            { text: 'Bear - strong yet gentle', members: ['KAZUHA', 'SATURN'] }
        ]
    },
    {
        question: 'Which other artist do you follow?',
        options: [
            { text: 'Blackpink', members: ['SAKURA', 'YUNJIN'] },
            { text: 'Twice', members: ['CHAEWON', 'EUNCHAE'] },
            { text: 'Seventeen', members: ['KAZUHA', 'URANUS'] },
            { text: 'Stray Kids', members: ['YUNJIN', 'SATURN'] },
            { text: 'TXT', members: ['EUNCHAE', 'CHAEWON'] },
            { text: 'NCT', members: ['SATURN', 'URANUS'] },
            { text: 'Ateez', members: ['URANUS', 'NEPTUNE'] },
            { text: 'IVE', members: ['SAKURA', 'CHAEWON'] },
            { text: 'NewJeans', members: ['PLUTO', 'NEPTUNE'] }
        ]
    },
    {
        question: 'What\'s your favorite music vibe?',
        options: [
            { text: 'Bright and energetic pop', members: ['SAKURA', 'EUNCHAE'] },
            { text: 'Dreamy and ethereal', members: ['CHAEWON', 'NEPTUNE'] },
            { text: 'Emotional and deep', members: ['PLUTO', 'KAZUHA'] },
            { text: 'Powerful and intense', members: ['YUNJIN', 'SATURN'] },
            { text: 'Fun and upbeat', members: ['EUNCHAE', 'CHAEWON'] },
            { text: 'Dark and edgy', members: ['SATURN', 'PLUTO'] },
            { text: 'Fresh and refreshing', members: ['URANUS', 'KAZUHA'] },
            { text: 'Smooth and chill', members: ['NEPTUNE', 'KAZUHA'] },
            { text: 'Mysterious and artistic', members: ['PLUTO', 'URANUS'] }
        ]
    },
    {
        question: 'What\'s your ideal hangout?',
        options: [
            { text: 'Loud party with everyone', members: ['SAKURA', 'EUNCHAE'] },
            { text: 'Art gallery or museum', members: ['CHAEWON', 'PLUTO'] },
            { text: 'Quiet nature walk', members: ['KAZUHA', 'NEPTUNE'] },
            { text: 'Intense gaming session', members: ['YUNJIN', 'URANUS'] },
            { text: 'Fun amusement park', members: ['EUNCHAE', 'SAKURA'] },
            { text: 'Gym or sports activity', members: ['YUNJIN', 'SATURN'] },
            { text: 'Beach or pool day', members: ['URANUS', 'CHAEWON'] },
            { text: 'Cozy café with a book', members: ['NEPTUNE', 'SATURN'] },
            { text: 'Late night deep talks', members: ['PLUTO', 'KAZUHA'] }
        ]
    }
];

// State
let currentBias = 'SAKURA';
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
    updateHeroImage();
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
                    <img src="/kpop/assets/collection-${currentBias}.png" 
                         alt="${product.name} - ${currentBias}"
                         onerror="this.parentElement.innerHTML='<img src="/kpop/assets/blank-${currentBias}.png>'"
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
    let bias = 'SAKURA';
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
