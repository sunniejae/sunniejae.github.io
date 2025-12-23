// ===== MEMBER DATA =====
let currentBias = ''; // default bias
let wishlistItems = [];
let quizScores = {}; // will initialize based on members

// Placeholder for members
const memberData = {
    // Example:
    // member1: { color:'var(--accent)', accent:'var(--secondary)', header:'assets/profile-member1.png', emoji:'🐱', description:'Description here', traits:['Trait1','Trait2'] }
};

// ===== PRODUCTS =====
const products = [
    // Example:
    // { id:'product1', brand:'Brand', title:'Product Title', size:'Size', price:'$0', image:'assets/{member}-product.png', link:'#' }
];

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    // Set default bias if defined
    if(currentBias) setBias(currentBias);
    renderProducts();
    updateBagCount();
    renderBiasButtons();
});

// ===== BIAS =====
function setBias(member){
    currentBias = member;
    const data = memberData[member];
    if(!data) return;

    // Update theme colors
    document.documentElement.style.setProperty('--current-bg', data.color);
    document.documentElement.style.setProperty('--current-accent', data.accent);

    // Update profile section
    const profilePic = document.getElementById('profile-pic');
    profilePic.textContent = data.emoji || '🌸';
    profilePic.style.backgroundImage = data.header ? `url(${data.header})` : '';

    const profileName = document.getElementById('profile-name');
    profileName.textContent = data.name || 'Group Name';
    const profileFandom = document.getElementById('profile-fandom');
    profileFandom.textContent = data.fandom || 'Fandom';

    // Update bio
    const bioTags = document.querySelector('.bio-tags');
    bioTags.textContent = data.tags ? data.tags.join(' ') : '#fandom #merch';

    // Highlight active bias button
    document.querySelectorAll('.bias-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.bias-btn').forEach(btn => {
        if(btn.textContent.includes(capitalize(member))) btn.classList.add('active');
    });

    renderProducts();
}

// ===== RENDER BIAS BUTTONS =====
function renderBiasButtons() {
    const container = document.getElementById('bias-buttons');
    container.innerHTML = '';
    Object.keys(memberData).forEach(member => {
        const btn = document.createElement('button');
        btn.className = 'bias-btn';
        btn.textContent = memberData[member].emoji + ' ' + capitalize(member);
        btn.onclick = () => setBias(member);
        container.appendChild(btn);
    });
}

// ===== PRODUCTS =====
function renderProducts(){
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        const imageUrl = product.image.replace('{member}', currentBias);
        card.innerHTML = `
            <div class="product-image">
                <img src="${imageUrl}" alt="${product.title}" onerror="this.src='${memberData[currentBias]?.header || ''}'">
                <div class="product-badge">${memberData[currentBias]?.emoji || ''} ${capitalize(currentBias)}</div>
                <button class="like-btn" onclick="toggleLike(event,this)">♡</button>
            </div>
            <div class="product-info">
                <div class="product-brand">${product.brand}</div>
                <div class="product-title">${product.title}</div>
                <div class="product-size">${product.size}</div>
                <div class="product-price">${product.price}</div>
                <button class="wishlist-btn" onclick="addToWishlist('${product.id}', this)">💖 Add to Wishlist</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// ===== WISHLIST =====
function addToWishlist(productId, button){
    const product = products.find(p => p.id === productId);
    if(!product) return;
    const itemText = `${product.title} - ${memberData[currentBias]?.emoji || ''} ${capitalize(currentBias)}`;
    if(!wishlistItems.includes(itemText)) wishlistItems.push(itemText);
    updateWishlistDisplay();
    updateBagCount();
    button.textContent = '💖 Added!';
    setTimeout(() => { button.textContent = '💖 Add to Wishlist'; }, 2000);
}

function updateWishlistDisplay(){ 
    document.getElementById('wishlist-items').value = wishlistItems.join('\n'); 
}

function updateBagCount(){ 
    document.getElementById('bag-count').textContent = wishlistItems.length; 
}

function submitWishlist(){
    const items = document.getElementById('wishlist-items').value.trim();
    const name = document.getElementById('wishlist-name').value.trim();
    const email = document.getElementById('wishlist-email').value.trim();
    const optedIn = document.getElementById('email-optin').checked;
    if(!items || !email){ alert('Please add items and enter your email 💖'); return; }
    const subject = encodeURIComponent('New Wishlist Request');
    const body = encodeURIComponent(`Wishlist Request\nName: ${name || 'N/A'}\nEmail: ${email}\nItems Requested:\n${items}\nSubscribed: ${optedIn ? 'YES' : 'NO'}`);
    window.location.href = `mailto:youremail@example.com?subject=${subject}&body=${body}`;
}

// ===== LIKE =====
function toggleLike(e, btn){
    e.stopPropagation();
    btn.classList.toggle('liked');
    btn.textContent = btn.classList.contains('liked') ? '❤️' : '♡';
}

// ===== QUIZ =====
let quizQuestions = []; // Add your quiz here
function openQuiz(){ 
    document.getElementById('quiz-modal').classList.add('active'); 
    quizScores = {};
    Object.keys(memberData).forEach(m => quizScores[m] = 0);
    renderQuizQuestions();
}

function closeQuiz(){ 
    document.getElementById('quiz-modal').classList.remove('active'); 
    Object.keys(quizScores).forEach(k => quizScores[k] = 0);
}

function renderQuizQuestions(){
    const container = document.getElementById('quiz-questions');
    container.innerHTML = '';
    quizQuestions.forEach((q, idx) => {
        const p = document.createElement('p');
        p.textContent = `${idx+1}. ${q.question}`;
        container.appendChild(p);
        q.answers.forEach(ans => {
            const btn = document.createElement('button');
            btn.textContent = ans.text;
            btn.onclick = () => answerQuiz(ans.members, btn);
            container.appendChild(btn);
        });
    });
}

function answerQuiz(members, btn){
    members.forEach(m => {
        if(quizScores[m] !== undefined) quizScores[m]++;
    });
    btn.style.backgroundColor = currentBias ? memberData[currentBias]?.accent || '#ccc' : '#ccc';
    btn.style.color = '#fff';

    const total = Object.values(quizScores).reduce((a,b)=>a+b,0);
    if(total >= quizQuestions.length){
        const winner = Object.keys(quizScores).reduce((a,b)=> quizScores[a]>=quizScores[b]?a:b);
        closeQuiz();
        setTimeout(()=>{ showResult(winner); setBias(winner); },300);
    }
}

// ===== RESULT MODAL =====
function showResult(member){
    const data = memberData[member];
    const modal = document.getElementById('result-modal');
    document.getElementById('result-emoji').textContent = data?.emoji || '💖';
    document.getElementById('result-image').src = data?.header || '';
    document.getElementById('result-name').textContent = capitalize(member);
    document.getElementById('result-description').textContent = data?.description || '';
    const traits = document.getElementById('result-traits'); 
    traits.innerHTML = '';
    (data?.traits || []).forEach(t => {
        const tag = document.createElement('div');
        tag.className = 'trait-tag';
        tag.textContent = t;
        traits.appendChild(tag);
    });
    modal.classList.add('active');
}
function closeResult(){ document.getElementById('result-modal').classList.remove('active'); }

// ===== HELPERS =====
function capitalize(s){ return s.charAt(0).toUpperCase() + s.slice(1); }

// ===== SEARCH =====
document.querySelector('.search-input').addEventListener('input', e => { 
    console.log('Searching for:', e.target.value); 
});

console.log('✨ Blank Fandom Shop Loaded! 💖');
