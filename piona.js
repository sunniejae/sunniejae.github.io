// ===== MEMBER DATA =====
let currentBias = 'sakura';
let wishlistItems = [];
let quizScores = {chaewon:0, sakura:0, yunjin:0, kazuha:0, eunchae:0};

const memberData = {
    chaewon: { 
        color:'var(--chaewon)', 
        accent:'var(--chaewon-dark)', 
        header:'assets/profile-chaewon.png', 
        emoji:'🐯', 
        description:'Leader & perfectionist', 
        traits:['Leader','Perfectionist'],
        displayName: 'Fearnot',
        fandom: 'Ssamudan',
        tags: ['#chaewon','#fearnot','#kpop']
    },
    sakura: { 
        color:'var(--sakura)', 
        accent:'var(--sakura-dark)', 
        header:'assets/profile-sakura.png', 
        emoji:'🌸', 
        description:'Elegant dreamer', 
        traits:['Elegant','Creative'],
        displayName: 'Fearnot',
        fandom: '39er',
        tags: ['#sakura','#fearnot','#kpop']
    },
    yunjin: { 
        color:'var(--yunjin)', 
        accent:'var(--yunjin-dark)', 
        header:'assets/profile-yunjin.png', 
        emoji:'🐍', 
        description:'Confident artist', 
        traits:['Confident','Artistic'],
        displayName: 'Fearnot',
        fandom: 'Burned Passport',
        tags: ['#yunjin','#fearnot','#kpop']
    },
    kazuha: { 
        color:'var(--kazuha)', 
        accent:'var(--kazuha-dark)', 
        header:'assets/profile-kazuha.png', 
        emoji:'🦢', 
        description:'Graceful soul', 
        traits:['Graceful','Serene'],
        displayName: 'Fearnot',
        fandom: 'Komorebis',
        tags: ['#kazuha','#fearnot','#kpop']
    },
    eunchae: { 
        color:'var(--eunchae)', 
        accent:'var(--eunchae-dark)', 
        header:'assets/profile-eunchae.png', 
        emoji:'🐣', 
        description:'Energetic sunshine', 
        traits:['Energetic','Playful'],
        displayName: 'Fearnot',
        fandom: 'Member of the Eunchae Mother Association',
        tags: ['#eunchae','#fearnot','#kpop']
    }
};

// ===== PRODUCTS =====
const products = [
    { id:'keychain', brand:'Sunnie Jae', title:'Member Keychain', size:'2.5 in', price:'$12', image:'assets/hangul/{member}.png', redbubble:'https://www.redbubble.com/people/sunniejae/shop' },
    { id:'sticker', brand:'Sunnie Jae', title:'Sticker Pack', size:'5 stickers', price:'$8', image:'assets/hangul/{member}.png', redbubble:'https://www.redbubble.com/people/sunniejae/shop' },
    { id:'photocard', brand:'Sunnie Jae', title:'Member Photocard', size:'3x4 in', price:'$6', image:'assets/hangul/{member}.png', redbubble:'https://www.redbubble.com/people/sunniejae/shop' },
    { id:'totebag', brand:'Sunnie Jae', title:'Bias Tote Bag', size:'Canvas', price:'$18', image:'assets/hangul/{member}.png', redbubble:'https://www.redbubble.com/people/sunniejae/shop' }
];

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => { 
    setBias(currentBias); 
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

    // Update profile
    const profilePic = document.getElementById('profile-pic');
    profilePic.textContent = data.emoji;
    profilePic.style.backgroundImage = `url(${data.header})`;
    profilePic.style.backgroundSize = 'cover';
    profilePic.style.backgroundPosition = 'center';

    document.getElementById('profile-name').textContent = data.displayName;
    document.getElementById('profile-fandom').textContent = data.fandom;
    document.querySelector('.bio-tags').textContent = data.tags.join(' ');

    // Update bias button active state
    document.querySelectorAll('.bias-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.bias-btn').forEach(btn => {
        if(btn.dataset.member === member) btn.classList.add('active');
    });

    renderProducts();
}

// ===== RENDER BIAS BUTTONS =====
function renderBiasButtons(){
    const container = document.getElementById('bias-buttons');
    container.innerHTML = '';
    Object.keys(memberData).forEach(member => {
        const btn = document.createElement('button');
        btn.className = 'bias-btn';
        btn.textContent = memberData[member].emoji + ' ' + capitalize(member);
        btn.dataset.member = member;
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
                <img src="${imageUrl}" alt="${product.title}" onerror="this.src='${memberData[currentBias].header}'">
                <div class="product-badge">${memberData[currentBias].emoji} ${capitalize(currentBias)}</div>
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
    const itemText = `${product.title} - ${memberData[currentBias].emoji} ${capitalize(currentBias)}`;
    if(!wishlistItems.includes(itemText)) wishlistItems.push(itemText);
    updateWishlistDisplay(); 
    updateBagCount();
    button.textContent = '💖 Added!';
    setTimeout(()=>{ button.textContent='💖 Add to Wishlist'; },2000);
}

function updateWishlistDisplay(){ document.getElementById('wishlist-items').value=wishlistItems.join('\n'); }
function updateBagCount(){ document.getElementById('bag-count').textContent=wishlistItems.length; }
function submitWishlist(){
    const items = document.getElementById('wishlist-items').value.trim();
    const name = document.getElementById('wishlist-name').value.trim();
    const email = document.getElementById('wishlist-email').value.trim();
    const optedIn = document.getElementById('email-optin').checked;
    if(!items || !email){ alert('Please add items and enter your email 💖'); return; }
    const subject=encodeURIComponent('New Sunnie Jae Wishlist Request');
    const body=encodeURIComponent(`Wishlist Request\nName: ${name||'N/A'}\nEmail: ${email}\nItems Requested:\n${items}\nSubscribed: ${optedIn?'YES':'NO'}`);
    window.location.href=`mailto:sunniejae@gmail.com?subject=${subject}&body=${body}`;
}

// ===== LIKE =====
function toggleLike(e, btn){ e.stopPropagation(); btn.classList.toggle('liked'); btn.textContent=btn.classList.contains('liked')?'❤️':'♡'; }

// ===== QUIZ =====
// (quiz logic remains same as your updated multiple-answer version)

// ===== RESULT MODAL =====
function showResult(member){
    const data=memberData[member];
    const modal=document.getElementById('result-modal');
    document.getElementById('result-emoji').textContent=data.emoji;
    document.getElementById('result-image').src=data.header;
    document.getElementById('result-name').textContent=capitalize(member);
    document.getElementById('result-description').textContent=data.description;
    const traits=document.getElementById('result-traits'); traits.innerHTML='';
    data.traits.forEach(t=>{ const tag=document.createElement('div'); tag.className='trait-tag'; tag.textContent=t; traits.appendChild(tag); });
    modal.classList.add('active');
}
function closeResult(){ document.getElementById('result-modal').classList.remove('active'); }

// ===== HELPERS =====
function capitalize(s){ return s.charAt(0).toUpperCase()+s.slice(1); }

// ===== SEARCH =====
document.querySelector('.search-input').addEventListener('input', e=>{ console.log('Searching for:', e.target.value); });
console.log('✨ LE SSERAFIM Fearnot Shop loaded! 💖');
