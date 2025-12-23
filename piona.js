// ===== MEMBER DATA WITH PERSONALITY INFO =====
let currentBias = 'sakura';
let quizScores = {chaewon: 0, sakura: 0, yunjin: 0, kazuha: 0, eunchae: 0};
let wishlistItems = [];

const memberData = {
    chaewon: { 
        color: 'var(--chaewon)', 
        accent: 'var(--chaewon-dark)', 
        header: 'assets/totebag-chaewon.png', 
        emoji: '🐯',
        personality: 'The Leader & Perfectionist',
        description: 'You embody grace, determination, and natural leadership! Like Chaewon, you have an eye for detail and strive for excellence in everything you do. Your calm demeanor hides a fierce inner strength.',
        traits: ['Leader', 'Perfectionist', 'Graceful', 'Determined']
    },
    sakura: { 
        color: 'var(--sakura)', 
        accent: 'var(--sakura-dark)', 
        header: 'assets/autograph-sakura.png', 
        emoji: '🌸',
        personality: 'The Elegant Dreamer',
        description: 'You shine with elegance and charm! Like Sakura, you have a gentle yet captivating presence. Your creative spirit and positive energy light up any room you enter.',
        traits: ['Elegant', 'Creative', 'Cheerful', 'Charismatic']
    },
    yunjin: { 
        color: 'var(--yunjin)', 
        accent: 'var(--yunjin-dark)', 
        header: 'assets/autograph-yunjin.png', 
        emoji: '🐍',
        personality: 'The Confident Artist',
        description: 'You radiate confidence and passion! Like Yunjin, you\'re bold, expressive, and not afraid to stand out. Your artistic soul and strategic mind make you unstoppable.',
        traits: ['Confident', 'Artistic', 'Bold', 'Strategic']
    },
    kazuha: { 
        color: 'var(--kazuha)', 
        accent: 'var(--kazuha-dark)', 
        header: 'assets/autograph-kazuha.png', 
        emoji: '🦢',
        personality: 'The Graceful Soul',
        description: 'You possess serene beauty and inner peace! Like Kazuha, you move through life with grace and poise. Your calm wisdom and elegant presence inspire everyone around you.',
        traits: ['Graceful', 'Serene', 'Wise', 'Elegant']
    },
    eunchae: { 
        color: 'var(--eunchae)', 
        accent: 'var(--eunchae-dark)', 
        header: 'assets/autograph-eunchae.png', 
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
        image: 'assets/keychain-{member}.png',
redbubble: 'https://www.redbubble.com/people/sunniejae/shop?artistUserName=sunniejae&collections=4422836&iaCode=all-departments&sortOrder=top%20selling'
    },
    {
        id: 'sticker',
        brand: 'REDBUBBLE',
        title: 'Autograph Stickers',
        size: 'Member Designs',
        price: '$2.99+',
        image: 'assets/autograph-{member}.png',
redbubble: 'https://www.redbubble.com/people/sunniejae/shop?artistUserName=sunniejae&collections=4422836&iaCode=all-departments&sortOrder=top%20selling'
    },
    {
        id: 'poster',
        brand: 'REDBUBBLE',
        title: 'Memes',
        size: '',
        price: '$15.99+',
        image: 'assets/memesticker-{member}.png',
redbubble: 'https://www.redbubble.com/people/sunniejae/shop?artistUserName=sunniejae&collections=4422836&iaCode=all-departments&sortOrder=top%20selling'
    },
    {
        id: 'phonecase',
        brand: 'REDBUBBLE',
        title: 'Name Reading',
        size: 'member variation',
        price: '$5+',
        image: 'assets/namereading-{member}.png',
redbubble: 'https://www.redbubble.com/people/sunniejae/shop?artistUserName=sunniejae&collections=4422836&iaCode=all-departments&sortOrder=top%20selling'
    },
    {
        id: 'totebag',
        brand: 'REDBUBBLE',
        title: 'Spaghetti Era',
        size: 'Multiple Products',
        price: '$18.99+',
        image: 'assets/totebag-{member}.png',
redbubble: 'https://www.redbubble.com/people/sunniejae/shop?artistUserName=sunniejae&collections=4422836&iaCode=all-departments&sortOrder=top%20selling'
    },
    {
        id: 'tshirt',
        brand: 'REDBUBBLE',
        title: 'T-Shirts',
        size: 'XS - 3XL',
        price: '$21.99+',
        image: 'assets/tshirt-{member}.png',
redbubble: 'https://www.redbubble.com/people/sunniejae/shop?artistUserName=sunniejae&collections=4422836&iaCode=all-departments&sortOrder=top%20selling'
    }
];

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', function() {
    setBias('sakura'); // default bias
    renderProducts();
    updateBagCount();
});

// ===== BIAS THEME FUNCTIONS =====
function setBias(member) {
    currentBias = member;
    const data = memberData[member];
    document.documentElement.style.setProperty('--current-bg', data.color);
    document.documentElement.style.setProperty('--current-accent', data.accent);
    document.getElementById('profile-pic').textContent = data.emoji;
    document.querySelectorAll('.bias-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.includes(capitalize(member))) btn.classList.add('active');
    });
    renderProducts();
}

// ===== PRODUCT RENDERING =====
function renderProducts() {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        const imageUrl = product.image.replace('{member}', currentBias);
        card.innerHTML = `
            <div class="product-image">
                <img src="${imageUrl}" alt="${product.title}" onerror="this.src='${memberData[currentBias].header}'">
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
        card.addEventListener('click', e => {
            if (!e.target.classList.contains('wishlist-btn') && !e.target.classList.contains('like-btn')) {
                window.open(product.redbubble, '_blank');
            }
        });
        grid.appendChild(card);
    });
}

// ===== WISHLIST =====
function addToWishlist(productId, button) {
    const product = products.find(p => p.id === productId);
    const member = memberData[currentBias];
    const itemText = `${product.title} - ${member.emoji} ${capitalize(currentBias)} Version`;
    const existingIndex = wishlistItems.findIndex(item => item.startsWith(product.title));
    if (existingIndex !== -1) wishlistItems[existingIndex] = itemText;
    else wishlistItems.push(itemText);
    updateWishlistDisplay();
    updateBagCount();
    button.classList.add('added');
    button.textContent = '💖 Added!';
    setTimeout(() => { button.textContent = '💖 Add to Wishlist'; button.classList.remove('added'); }, 2000);
}

function updateWishlistDisplay() {
    document.getElementById('wishlist-items').value = wishlistItems.join('\n');
}

function updateBagCount() {
    document.getElementById('bag-count').textContent = wishlistItems.length;
}

function submitWishlist() {
    const items = document.getElementById('wishlist-items').value.trim();
    const name = document.getElementById('wishlist-name').value.trim();
    const email = document.getElementById('wishlist-email').value.trim();
    const optedIn = document.getElementById('email-optin').checked;

    if (!items || !email) {
        alert('Please add items and enter your email 💖');
        return;
    }

    const subject = encodeURIComponent('New Sunnie Jae Wishlist Request');

    const body = encodeURIComponent(
        `Wishlist Request\n\n` +
        `Name: ${name || 'N/A'}\n` +
        `Email: ${email}\n\n` +
        `Items Requested:\n${items}\n\n` +
        `Subscribed to Sunnie Jae emails: ${optedIn ? 'YES' : 'NO'}`
    );

    window.location.href =
        `mailto:sunniejae@gmail.com?subject=${subject}&body=${body}`;
}


// ===== LIKE =====
function toggleLike(event, btn) {
    event.stopPropagation();
    if (btn.classList.contains('liked')) { btn.classList.remove('liked'); btn.textContent = '♡'; }
    else { btn.classList.add('liked'); btn.textContent = '❤️'; }
}

// ===== QUIZ =====
function openQuiz() {
    const modal = document.getElementById('quiz-modal');
    modal.classList.add('active');
    quizScores = {chaewon:0, sakura:0, yunjin:0, kazuha:0, eunchae:0};
    document.querySelectorAll('#quiz-questions button').forEach(btn => { btn.style.backgroundColor=''; btn.style.color=''; });
}

function closeQuiz() { document.getElementById('quiz-modal').classList.remove('active'); quizScores = {chaewon:0, sakura:0, yunjin:0, kazuha:0, eunchae:0}; }

function answerQuiz(member, button) {
    quizScores[member]++;
    const data = memberData[member];
    button.style.backgroundColor = data.accent;
    button.style.color = 'white';
    const totalAnswers = Object.values(quizScores).reduce((a,b)=>a+b,0);
    if (totalAnswers>=3) {
        const winner = Object.keys(quizScores).reduce((a,b)=> quizScores[a]>=quizScores[b]?a:b );
        closeQuiz();
        setTimeout(()=>{ showResult(winner); setBias(winner); },300);
    }
}

// ===== RESULT MODAL =====
function showResult(member) {
    const data = memberData[member];
    const modal = document.getElementById('result-modal');
    document.getElementById('result-emoji').textContent = data.emoji;
    document.getElementById('result-image').src = data.header;
    document.getElementById('result-name').textContent = capitalize(member);
    document.getElementById('result-description').textContent = data.description;
    const traitsContainer = document.getElementById('result-traits');
    traitsContainer.innerHTML = '';
    data.traits.forEach(trait=>{ const tag=document.createElement('div'); tag.className='trait-tag'; tag.textContent=trait; traitsContainer.appendChild(tag); });
    modal.classList.add('active');
}

function closeResult() { document.getElementById('result-modal').classList.remove('active'); }

// ===== HELPERS =====
function capitalize(str){ return str.charAt(0).toUpperCase() + str.slice(1); }

// ===== SEARCH (console only) =====
document.querySelector('.search-input').addEventListener('input', e=>{
    const searchTerm=e.target.value.toLowerCase();
    console.log('Searching for:',searchTerm);
});

console.log('✨ LE SSERAFIM Fearnot Shop loaded! 💖');
