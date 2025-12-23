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

console.log('✨ LE SSERAFIM Fearnot Shop loaded! 💖');// ===== MEMBER THEME DATA =====
let currentBias = 'chaewon';
let quizScores = {chaewon: 0, sakura: 0, yunjin: 0, kazuha: 0, eunchae: 0};

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

// ===== REDBUBBLE LINKS =====
// Update these URLs with your specific Redbubble product links
const redbubbleLinks = {
    keychain: {
        ot5: 'https://www.redbubble.com/shop/lesserafim+keychains', // Replace with OT5 keychain link
        chaewon: 'https://www.redbubble.com/shop/chaewon+keychains', // Replace with Chaewon keychain link
        sakura: 'https://www.redbubble.com/shop/sakura+keychains', // Replace with Sakura keychain link
        yunjin: 'https://www.redbubble.com/shop/yunjin+keychains', // Replace with Yunjin keychain link
        kazuha: 'https://www.redbubble.com/shop/kazuha+keychains', // Replace with Kazuha keychain link
        eunchae: 'https://www.redbubble.com/shop/eunchae+keychains' // Replace with Eunchae keychain link
    },
    sticker: {
        ot5: 'https://www.redbubble.com/shop/lesserafim+stickers', // Replace with OT5 sticker link
        chaewon: 'https://www.redbubble.com/i/holographic-sticker/Chaewon-Hangul-Le-Sserafim-by-SunnieJae/177009220.A3LW6', // Example link
        sakura: 'https://www.redbubble.com/shop/sakura+stickers', // Replace with Sakura sticker link
        yunjin: 'https://www.redbubble.com/shop/yunjin+stickers', // Replace with Yunjin sticker link
        kazuha: 'https://www.redbubble.com/shop/kazuha+stickers', // Replace with Kazuha sticker link
        eunchae: 'https://www.redbubble.com/shop/eunchae+stickers' // Replace with Eunchae sticker link
    },
    poster: {
        ot5: 'https://www.redbubble.com/shop/lesserafim+posters', // Replace with OT5 poster link
        chaewon: 'https://www.redbubble.com/shop/chaewon+posters', // Replace with Chaewon poster link
        sakura: 'https://www.redbubble.com/shop/sakura+posters', // Replace with Sakura poster link
        yunjin: 'https://www.redbubble.com/shop/yunjin+posters', // Replace with Yunjin poster link
        kazuha: 'https://www.redbubble.com/shop/kazuha+posters', // Replace with Kazuha poster link
        eunchae: 'https://www.redbubble.com/shop/eunchae+posters' // Replace with Eunchae poster link
    },
    phonecase: {
        ot5: 'https://www.redbubble.com/shop/lesserafim+phone-cases', // Replace with OT5 phone case link
        chaewon: 'https://www.redbubble.com/shop/chaewon+phone-cases', // Replace with Chaewon phone case link
        sakura: 'https://www.redbubble.com/shop/sakura+phone-cases', // Replace with Sakura phone case link
        yunjin: 'https://www.redbubble.com/shop/yunjin+phone-cases', // Replace with Yunjin phone case link
        kazuha: 'https://www.redbubble.com/shop/kazuha+phone-cases', // Replace with Kazuha phone case link
        eunchae: 'https://www.redbubble.com/shop/eunchae+phone-cases' // Replace with Eunchae phone case link
    },
    totebag: {
        ot5: 'https://www.redbubble.com/shop/lesserafim+tote-bags', // Replace with OT5 tote bag link
        chaewon: 'https://www.redbubble.com/shop/chaewon+tote-bags', // Replace with Chaewon tote bag link
        sakura: 'https://www.redbubble.com/shop/sakura+tote-bags', // Replace with Sakura tote bag link
        yunjin: 'https://www.redbubble.com/shop/yunjin+tote-bags', // Replace with Yunjin tote bag link
        kazuha: 'https://www.redbubble.com/shop/kazuha+tote-bags', // Replace with Kazuha tote bag link
        eunchae: 'https://www.redbubble.com/shop/eunchae+tote-bags' // Replace with Eunchae tote bag link
    },
    tshirt: {
        ot5: 'https://www.redbubble.com/shop/lesserafim+t-shirts', // Replace with OT5 t-shirt link
        chaewon: 'https://www.redbubble.com/shop/chaewon+t-shirts', // Replace with Chaewon t-shirt link
        sakura: 'https://www.redbubble.com/shop/sakura+t-shirts', // Replace with Sakura t-shirt link
        yunjin: 'https://www.redbubble.com/shop/yunjin+t-shirts', // Replace with Yunjin t-shirt link
        kazuha: 'https://www.redbubble.com/shop/kazuha+t-shirts', // Replace with Kazuha t-shirt link
        eunchae: 'https://www.redbubble.com/shop/eunchae+t-shirts' // Replace with Eunchae t-shirt link
    }
};

// ===== WISHLIST DATA =====
let wishlistItems = [];

// ===== BIAS THEME FUNCTION =====
function setBias(member) {
    currentBias = member;
    const data = memberData[member];

    document.body.style.backgroundColor = data.color;
    document.body.style.color = data.accent;

    const header = document.getElementById('page-header');
    header.style.backgroundColor = data.accent;
    document.getElementById('header-image').src = data.header;

    document.querySelectorAll('.collection').forEach(coll => {
        const collection = coll.dataset.collection;
        const previewImg = document.getElementById(`preview-${collection}`);
        const activeLabel = document.getElementById(`collection-${collection}-active`);
        const select = coll.querySelector('select');
        
        previewImg.src = `https://sunniejae.blob.core.windows.net/sunniejae/${collection}-${member}.png`;
        activeLabel.textContent = `${data.emoji} ${capitalize(member)} Version`;

        coll.style.backgroundColor = data.accent;
        coll.style.color = data.color;
        select.style.backgroundColor = data.color;
        select.style.color = data.accent;
        select.style.borderColor = data.accent;
        activeLabel.style.backgroundColor = data.color;
        activeLabel.style.color = data.accent;

        // Update select to show current member
        select.value = member;
    });

    document.querySelectorAll('.bias-selector button, .bias-matcher-btn').forEach(btn => {
        if (btn.classList.contains('bias-matcher-btn')) {
            // Keep the bias matcher button with its gradient
            return;
        }
        btn.style.backgroundColor = data.color;
        btn.style.color = data.accent;
    });
}

// ===== PRODUCT SELECTION FUNCTION =====
function selectVersion(select) {
    const collection = select.dataset.collection;
    const previewImg = document.getElementById(`preview-${collection}`);
    const activeLabel = document.getElementById(`collection-${collection}-active`);
    const value = select.value;

    if (value === 'ot5') {
        previewImg.src = `https://sunniejae.blob.core.windows.net/sunniejae/${collection}-ot5.png`;
        activeLabel.textContent = 'OT5 Version';
    } else {
        const data = memberData[value];
        previewImg.src = `https://sunniejae.blob.core.windows.net/sunniejae/${collection}-${value}.png`;
        activeLabel.textContent = `${data.emoji} ${capitalize(value)} Version`;
    }
}

// ===== REDBUBBLE FUNCTION =====
function openRedbubble(collectionName) {
    const collectionElement = document.getElementById(`collection-${collectionName}`);
    if (!collectionElement) {
        console.error('Collection not found:', collectionName);
        return;
    }

    const select = collectionElement.querySelector('select');
    const selectedVersion = select ? select.value : 'ot5';
    
    const link = redbubbleLinks[collectionName]?.[selectedVersion] || redbubbleLinks[collectionName]?.ot5;
    
    if (link) {
        window.open(link, '_blank');
    } else {
        alert('Redbubble link not available for this product.');
    }
}

// ===== WISHLIST FUNCTIONS =====
function addToWishlist(collection) {
    const activeLabel = document.getElementById(`collection-${collection}-active`);
    const versionLabel = activeLabel.textContent;
    const itemKey = `${capitalize(collection)}: ${versionLabel}`;
    
    // Check if already in wishlist
    const existingIndex = wishlistItems.findIndex(item => item.startsWith(capitalize(collection) + ':'));
    
    if (existingIndex !== -1) {
        // Replace existing entry
        wishlistItems[existingIndex] = itemKey;
    } else {
        // Add new entry
        wishlistItems.push(itemKey);
    }
    
    // Update textarea
    updateWishlistDisplay();
    
    // Visual feedback on button
    const button = event.target;
    button.classList.add('added');
    button.textContent = '💖 Added to Wishlist';
    
    setTimeout(() => {
        button.textContent = '💖 Add to Wishlist';
        button.classList.remove('added');
    }, 2000);
}

function updateWishlistDisplay() {
    const wishlistTextarea = document.getElementById('wishlist-items');
    if (wishlistTextarea) {
        wishlistTextarea.value = wishlistItems.join('\n');
    }
}

function submitWishlist() {
    const name = document.getElementById('wishlist-name').value.trim();
    const email = document.getElementById('wishlist-email').value.trim();

    if (!name || !email) {
        alert("Please fill in your name and email.");
        return;
    }

    if (wishlistItems.length === 0) {
        alert("Your wishlist is empty! Add some items first.");
        return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Create ticket object
    const ticket = {
        name: name,
        email: email,
        items: wishlistItems,
        timestamp: new Date().toISOString(),
        ticketId: 'TICKET-' + Date.now()
    };

    // Submit to your backend
    submitTicket(ticket);
}

async function submitTicket(ticket) {
    const submitButton = document.querySelector('#wishlist-section button');
    const originalText = submitButton.textContent;
    
    try {
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';

        // Replace this URL with your actual backend endpoint
        const response = await fetch('/api/submit-wishlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ticket)
        });

        if (response.ok) {
            const result = await response.json();
            showTicketConfirmation(result.ticketId || ticket.ticketId);
            
            // Clear form
            document.getElementById('wishlist-name').value = '';
            document.getElementById('wishlist-email').value = '';
            wishlistItems = [];
            updateWishlistDisplay();
        } else {
            throw new Error('Submission failed');
        }
    } catch (error) {
        console.error('Error submitting ticket:', error);
        alert('There was an error submitting your wishlist. Please try again or contact support.');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
    }
}

function showTicketConfirmation(ticketId) {
    // Create confirmation modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.85);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        backdrop-filter: blur(10px);
    `;
    
    modal.innerHTML = `
        <div style="
            background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
            padding: 3rem 2rem;
            border-radius: 2rem;
            max-width: 500px;
            width: 90%;
            text-align: center;
            box-shadow: 0 25px 80px rgba(0, 0, 0, 0.6);
            animation: popIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        ">
            <div style="font-size: 4rem; margin-bottom: 1rem;">✨</div>
            <h2 style="font-family: 'Pacifico', cursive; color: #ff6b9d; font-size: 2rem; margin: 0 0 1rem;">
                Wishlist Received!
            </h2>
            <p style="font-size: 1.1rem; margin-bottom: 0.5rem; color: #333;">
                Your ticket number is:
            </p>
            <div style="
                background: linear-gradient(135deg, #ff6b9d, #c06c84);
                color: white;
                padding: 1rem 2rem;
                border-radius: 1rem;
                font-size: 1.5rem;
                font-weight: bold;
                margin: 1rem 0 1.5rem;
                font-family: 'Comfortaa', sans-serif;
            ">
                ${ticketId}
            </div>
            <p style="color: #666; margin-bottom: 2rem;">
                We'll review your wishlist and get back to you soon! 💖
            </p>
            <button onclick="this.closest('div').parentElement.remove()" style="
                padding: 1rem 2.5rem;
                border: none;
                border-radius: 2rem;
                cursor: pointer;
                font-weight: bold;
                font-size: 1.1rem;
                background: linear-gradient(135deg, #ff6b9d, #c06c84);
                color: white;
                box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
                transition: transform 0.2s;
            " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                Close
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// ===== QUIZ FUNCTIONS =====
function openQuiz() {
    const modal = document.getElementById('quiz-modal');
    modal.classList.add('active');
    
    // Reset quiz scores and button colors
    quizScores = {chaewon: 0, sakura: 0, yunjin: 0, kazuha: 0, eunchae: 0};
    document.querySelectorAll('#quiz-questions button').forEach(btn => {
        btn.style.backgroundColor = '';
        btn.style.color = '';
    });
}

function closeQuiz() {
    const modal = document.getElementById('quiz-modal');
    modal.classList.remove('active');
    
    // Reset quiz scores and button colors
    quizScores = {chaewon: 0, sakura: 0, yunjin: 0, kazuha: 0, eunchae: 0};
    document.querySelectorAll('#quiz-questions button').forEach(btn => {
        btn.style.backgroundColor = '';
        btn.style.color = '';
    });
}

function showResult(member) {
    const data = memberData[member];
    const modal = document.getElementById('result-modal');
    const content = document.getElementById('result-content');
    
    // Set CSS variables for the result modal colors
    content.style.setProperty('--result-color', data.color);
    content.style.setProperty('--result-accent', data.accent);
    
    // Set result content
    document.getElementById('result-emoji').textContent = data.emoji;
    document.getElementById('result-image').src = data.header;
    document.getElementById('result-name').textContent = capitalize(member);
    document.getElementById('result-description').textContent = data.description;
    
    // Set personality traits
    const traitsContainer = document.getElementById('result-traits');
    traitsContainer.innerHTML = '';
    data.traits.forEach(trait => {
        const tag = document.createElement('div');
        tag.className = 'trait-tag';
        tag.textContent = trait;
        traitsContainer.appendChild(tag);
    });
    
    // Show modal with animation
    modal.classList.add('active');
}

function closeResult() {
    const modal = document.getElementById('result-modal');
    modal.classList.remove('active');
}

function answerQuiz(member, button) {
    quizScores[member]++;

    // Highlight selected answer
    const data = memberData[member];
    button.style.backgroundColor = data.accent;
    button.style.color = data.color;

    const totalAnswers = Object.values(quizScores).reduce((a, b) => a + b, 0);
    
    if (totalAnswers >= 3) { // 3 questions answered
        // Find the member with the highest score
        const winner = Object.keys(quizScores).reduce((a, b) => 
            quizScores[a] >= quizScores[b] ? a : b
        );
        
        // Close quiz
        closeQuiz();
        
        // Small delay then show result modal
        setTimeout(() => {
            showResult(winner);
            // Apply the winning bias theme after showing result
            setBias(winner);
        }, 300);
    }
}

// ===== HELPER FUNCTIONS =====
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// ===== INITIALIZE ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', function() {
    // Set initial bias theme
    setBias('chaewon');
    
    console.log('LE SSERAFIM Fandom Store initialized! 💙');
});
