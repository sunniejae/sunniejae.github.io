// ===== MEMBER DATA =====
let currentBias = '';
let quizScores = {};
let wishlistItems = [];

const members = {
    chaewon: { color: 'var(--chaewon)', accent: 'var(--chaewon-dark)', profile: '/assets/profile-chaewon.png' },
    sakura: { color: 'var(--sakura)', accent: 'var(--sakura-dark)', profile: '/assets/profile-sakura.png' },
    yunjin: { color: 'var(--yunjin)', accent: 'var(--yunjin-dark)', profile: '/assets/profile-yunjin.png' },
    kazuha: { color: 'var(--kazuha)', accent: 'var(--kazuha-dark)', profile: '/assets/profile-kazuha.png' },
    eunchae: { color: 'var(--eunchae)', accent: 'var(--eunchae-dark)', profile: '/assets/profile-eunchae.png' }
};

// ===== PRODUCTS DATA =====
const products = [
    // Example product template
    // { name:'Keychain', brand:'Fearnot', price:'$12', image:'/assets/product1.png' },
];

// ===== SET BIAS =====
function setBias(member) {
    currentBias = member;
    document.documentElement.style.setProperty('--current-bg', members[member].color);
    document.documentElement.style.setProperty('--current-accent', members[member].accent);

    // Update profile pic
    const profilePicDiv = document.getElementById('profile-pic');
    profilePicDiv.innerHTML = `<img src="${members[member].profile}" alt="${member} profile">`;

    // Update profile colors, optional
    const profileHeader = document.querySelector('.profile-section');
    profileHeader.style.background = members[member].color + '20'; // light alpha

    // Highlight active button
    document.querySelectorAll('.bias-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.bias-btn[onclick="setBias('${member}')"]`).classList.add('active');
}

// ===== RENDER PRODUCTS =====
function renderProducts() {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';
    products.forEach(prod => {
        const card = document.createElement('div');
        card.className = 'product-card';

        card.innerHTML = `
            <div class="product-image">
                <img src="${prod.image}" alt="${prod.name}" width="250" height="250" style="width:250px; height:250px; object-fit:cover;">
            </div>
            <div class="product-info">
                <div class="product-brand">${prod.brand}</div>
                <div class="product-title">${prod.name}</div>
                <div class="product-price">${prod.price}</div>
                <button class="wishlist-btn" onclick="addToWishlist('${prod.name}')">💖 Add</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// ===== WISHLIST =====
function addToWishlist(item) {
    wishlistItems.push(item);
    document.getElementById('wishlist-items').value = wishlistItems.join('\n');
}

function submitWishlist() {
    const name = document.getElementById('wishlist-name').value;
    const email = document.getElementById('wishlist-email').value;
    const optin = document.getElementById('email-optin').checked;
    if (!name || !email) {
        alert('Please enter your name and email.');
        return;
    }
    alert(`Wishlist submitted! Thank you, ${name}.`);
}

// ===== QUIZ MODAL =====
function openQuiz() {
    document.getElementById('quiz-modal').classList.add('active');
}
function closeQuiz() {
    document.getElementById('quiz-modal').classList.remove('active');
}
function closeResult() {
    document.getElementById('result-modal').classList.remove('active');
}

// ===== INITIAL SETUP =====
window.onload = () => {
    // Add bias buttons dynamically if needed
    const biasContainer = document.querySelector('.bias-buttons');
    Object.keys(members).forEach(mem => {
        const btn = document.createElement('button');
        btn.className = 'bias-btn';
        btn.textContent = mem.charAt(0).toUpperCase() + mem.slice(1);
        btn.onclick = () => setBias(mem);
        biasContainer.appendChild(btn);
    });

    renderProducts();
};
