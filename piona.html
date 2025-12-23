// ===== MEMBER DATA WITH PERSONALITY INFO =====
let currentBias = 'sakura';
let quizScores = {chaewon: 0, sakura: 0, yunjin: 0, kazuha: 0, eunchae: 0};
let wishlistItems = [];

const memberData = {
    chaewon: { 
        color: 'var(--chaewon)', 
        accent: 'var(--chaewon-dark)', 
        header: 'https://sunniejae.blob.core.windows.net/sunniejae/chaewon.png', 
        emoji: '🐯',
        personality: 'The Leader & Perfectionist',
        description: 'You embody grace, determination, and natural leadership! Like Chaewon, you have an eye for detail and strive for excellence in everything you do. Your calm demeanor hides a fierce inner strength.',
        traits: ['Leader', 'Perfectionist', 'Graceful', 'Determined']
    },
    sakura: { 
        color: 'var(--sakura)', 
        accent: 'var(--sakura-dark)', 
        header: 'https://sunniejae.blob.core.windows.net/sunniejae/sakura.png', 
        emoji: '🌸',
        personality: 'The Elegant Dreamer',
        description: 'You shine with elegance and charm! Like Sakura, you have a gentle yet captivating presence. Your creative spirit and positive energy light up any room you enter.',
        traits: ['Elegant', 'Creative', 'Cheerful', 'Charismatic']
    },
    yunjin: { 
        color: 'var(--yunjin)', 
        accent: 'var(--yunjin-dark)', 
        header: 'https://sunniejae.blob.core.windows.net/sunniejae/yunjin.png', 
        emoji: '🐍',
        personality: 'The Confident Artist',
        description: 'You radiate confidence and passion! Like Yunjin, you\'re bold, expressive, and not afraid to stand out. Your artistic soul and strategic mind make you unstoppable.',
        traits: ['Confident', 'Artistic', 'Bold', 'Strategic']
    },
    kazuha: { 
        color: 'var(--kazuha)', 
        accent: 'var(--kazuha-dark)', 
        header: 'https://sunniejae.blob.core.windows.net/sunniejae/kazuha.png', 
        emoji: '🦢',
        personality: 'The Graceful Soul',
        description: 'You possess serene beauty and inner peace! Like Kazuha, you move through life with grace and poise. Your calm wisdom and elegant presence inspire everyone around you.',
        traits: ['Graceful', 'Serene', 'Wise', 'Elegant']
    },
    eunchae: { 
        color: 'var(--eunchae)', 
        accent: 'var(--eunchae-dark)', 
        header: 'https://sunniejae.blob.core.windows.net/sunniejae/eunchae.png', 
        emoji: '🐣',
        personality: 'The Energetic Sunshine',
        description: 'You\'re pure energy and joy! Like Eunchae, you bring sunshine wherever you go with your infectious enthusiasm and bright personality. Your bold spirit and playful nature are irresistible!',
        traits: ['Energetic', 'Playful', 'Bright', 'Bold']
    }
};

// ===== PRODUCT DATA =====
const products = [
    {
        id: 'keychain',
        brand: 'REDBUBBLE',
        title: 'Member Keychains',
        size: 'All Members Available',
        price: '$12.99',
        image: 'https://sunniejae.blob.core.windows.net/sunniejae/keychain-{member}.png',
        redbubble: 'https://www.redbubble.com/shop/lesserafim+keychains'
    },
    {
        id: 'sticker',
        brand: 'REDBUBBLE',
        title: 'Holographic Stickers',
        size: 'Member Designs',
        price: '$2.99+',
        image: 'https://sunniejae.blob.core.windows.net/sunniejae/sticker-{member}.png',
        redbubble: 'https://www.redbubble.com/shop/lesserafim+stickers'
    },
    {
        id: 'poster',
        brand: 'REDBUBBLE',
        title: 'Member Posters',
        size: 'Multiple Sizes',
        price: '$15.99+',
        image: 'https://sunniejae.blob.core.windows.net/sunniejae/poster-{member}.png',
        redbubble: 'https://www.redbubble.com/shop/lesserafim+posters'
    },
    {
        id: 'phonecase',
        brand: 'REDBUBBLE',
        title: 'Phone Cases',
        size: 'iPhone & Samsung',
        price: '$24.99+',
        image: 'https://sunniejae.blob.core.windows.net/sunniejae/phonecase-{member}.png',
        redbubble: 'https://www.redbubble.com/shop/lesserafim+phone-cases'
    },
    {
        id: 'totebag',
        brand: 'REDBUBBLE',
        title: 'Tote Bags',
        size: 'Cotton Canvas',
        price: '$18.99+',
        image: 'https://sunniejae.blob.core.windows.net/sunniejae/totebag-{member}.png',
        redbubble: 'https://www.redbubble.com/shop/lesserafim+tote-bags'
    },
    {
        id: 'tshirt',
        brand: 'REDBUBBLE',
        title: 'T-Shirts',
        size: 'XS - 3XL',
        price: '$21.99+',
        image: 'https://sunniejae.blob.core.windows.net/sunniejae/tshirt-{member}.png',
        redbubble: 'https://www.redbubble.com/shop/lesserafim+t-shirts'
    }
];

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', function() {
    setBias('sakura'); // Set default bias
    renderProducts();
    updateBagCount();
});

// ===== BIAS THEME FUNCTIONS =====
function setBias(member) {
    currentBias = member;
    const data = memberData[member];
    
    // Update CSS variables
    document.documentElement.style.setProperty('--current-bg', data.color);
    document.documentElement.style.setProperty('--current-accent', data.accent);
    
    // Update profile pic
    document.getElementById('profile-pic').textContent = data.emoji;
    
    // Update bias buttons
    document.querySelectorAll('.bias-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.includes(capitalize(member))) {
            btn.classList.add('active');
        }
    });
    
    // Re-render products with new member
    renderProducts();
}

// ===== PRODUCT RENDERING =====
function renderProducts() {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';
    
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        // Replace {member} placeholder with current bias
        const imageUrl = product.image.replace('{member}', currentBias);
        
        card.innerHTML = `
            <div class="product-image">
                <img src="${imageUrl}" alt="${product.title}" onerror="this.src='https://sunniejae.blob.core.windows.net/sunniejae/${currentBias}.png'">
                <div class="product-badge">${memberData[currentBias].emoji} ${capitalize(currentBias)}</div>
                <button class="like-btn" onclick="toggleLike(event, this)">♡</button>
            </div>
            <div class="product-info">
                <div class="product-brand">${product.brand}</div>
                <div class="product-title">${product.title}</div>
                <div class="product-size">${product.size}</div>
                <div class="product-price">${product.price}</div>
                <button class="wishlist-btn" data-product-id="${product.id}" onclick="addToWishlist('${product.id}', this)">💖 Add to Wishlist</button>
            </div>
        `;
        
        // Add click to open Redbubble
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('wishlist-btn') && !e.target.classList.contains('like-btn')) {
                window.open(product.redbubble, '_blank');
            }
        });
        
        grid.appendChild(card);
    });
}

// ===== WISHLIST FUNCTIONS =====
function addToWishlist(productId, button) {
    const product = products.find(p => p.id === productId);
    const member = memberData[currentBias];
    const itemText = `${product.title} - ${member.emoji} ${capitalize(currentBias)} Version`;
    
    // Check if already in wishlist
    const existingIndex = wishlistItems.findIndex(item => item.startsWith(product.title));
    
    if (existingIndex !== -1) {
        // Replace existing
        wishlistItems[existingIndex] = itemText;
    } else {
        // Add new
        wishlistItems.push(itemText);
    }
    
    // Update display
    updateWishlistDisplay();
    updateBagCount();
    
    // Visual feedback
    button.classList.add('added');
    button.textContent = '💖 Added!';
    
    setTimeout(() => {
        button.textContent = '💖 Add to Wishlist';
        button.classList.remove('added');
    }, 2000);
}

function updateWishlistDisplay() {
    const textarea = document.getElementById('wishlist-items');
    textarea.value = wishlistItems.join('\n');
}

function updateBagCount() {
    document.getElementById('bag-count').textContent = wishlistItems.length;
}

function submitWishlist() {
    const name = document.getElementById('wishlist-name').value.trim();
    const email = document.getElementById('wishlist-email').value.trim();
    
    if (!name || !email) {
        alert('Please fill in your name and email! 💖');
        return;
    }
    
    if (wishlistItems.length === 0) {
        alert('Your wishlist is empty! Add some items first. ✨');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address! 📧');
        return;
    }
    
    // Create mailto link
    const subject = encodeURIComponent(`LE SSERAFIM Wishlist from ${name}`);
    const body = encodeURIComponent(
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Bias: ${memberData[currentBias].emoji} ${capitalize(currentBias)}\n\n` +
        `Wishlist:\n${wishlistItems.join('\n')}\n\n` +
        `---\n` +
        `Sent from LE SSERAFIM Fearnot Shop by Sunnie Jae ✨`
    );
    
    window.location.href = `mailto:youremail@example.com?subject=${subject}&body=${body}`;
}

// ===== LIKE FUNCTION =====
function toggleLike(event, btn) {
    event.stopPropagation();
    if (btn.classList.contains('liked')) {
        btn.classList.remove('liked');
        btn.textContent = '♡';
    } else {
        btn.classList.add('liked');
        btn.textContent = '❤️';
    }
}

// ===== QUIZ FUNCTIONS =====
function openQuiz() {
    const modal = document.getElementById('quiz-modal');
    modal.classList.add('active');
    
    // Reset quiz
    quizScores = {chaewon: 0, sakura: 0, yunjin: 0, kazuha: 0, eunchae: 0};
    document.querySelectorAll('#quiz-questions button').forEach(btn => {
        btn.style.backgroundColor = '';
        btn.style.color = '';
    });
}

function closeQuiz() {
    const modal = document.getElementById('quiz-modal');
    modal.classList.remove('active');
    
    quizScores = {chaewon: 0, sakura: 0, yunjin: 0, kazuha: 0, eunchae: 0};
}

function answerQuiz(member, button) {
    quizScores[member]++;
    
    // Highlight selection
    const data = memberData[member];
    button.style.backgroundColor = data.accent;
    button.style.color = 'white';
    
    const totalAnswers = Object.values(quizScores).reduce((a, b) => a + b, 0);
    
    if (totalAnswers >= 3) {
        // Find winner
        const winner = Object.keys(quizScores).reduce((a, b) => 
            quizScores[a] >= quizScores[b] ? a : b
        );
        
        closeQuiz();
        
        setTimeout(() => {
            showResult(winner);
            setBias(winner);
        }, 300);
    }
}

// ===== RESULT MODAL =====
function showResult(member) {
    const data = memberData[member];
    const modal = document.getElementById('result-modal');
    const content = document.getElementById('result-content');
    
    // Set colors
    content.style.setProperty('--result-color', data.color);
    content.style.setProperty('--result-accent', data.accent);
    
    // Set content
    document.getElementById('result-emoji').textContent = data.emoji;
    document.getElementById('result-image').src = data.header;
    document.getElementById('result-name').textContent = capitalize(member);
    document.getElementById('result-description').textContent = data.description;
    
    // Set traits
    const traitsContainer = document.getElementById('result-traits');
    traitsContainer.innerHTML = '';
    data.traits.forEach(trait => {
        const tag = document.createElement('div');
        tag.className = 'trait-tag';
        tag.textContent = trait;
        traitsContainer.appendChild(tag);
    });
    
    modal.classList.add('active');
}

function closeResult() {
    document.getElementById('result-modal').classList.remove('active');
}

// ===== HELPER FUNCTIONS =====
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// ===== SEARCH FUNCTIONALITY =====
document.querySelector('.search-input').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    // Could add search filtering here if needed
    console.log('Searching for:', searchTerm);
});

console.log('✨ LE SSERAFIM Fearnot Shop loaded! 💖');
