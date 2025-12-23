// ===== MEMBER DATA =====
let currentBias = 'sakura';
let wishlistItems = [];
let quizScores = {chaewon:0, sakura:0, yunjin:0, kazuha:0, eunchae:0};

const memberData = {
    chaewon: { 
        color:'var(--chaewon)', accent:'var(--chaewon-dark)', header:'assets/chaewon.png', emoji:'🐯', 
        description:'Leader & perfectionist', traits:['Leader','Perfectionist'],
        profileImage:'assets/profile-chaewon.png', fandomName:'Ssamudan',
        stats: { items: 6, followers: '2.22k', following: 222 }
    },
    sakura: { 
        color:'var(--sakura)', accent:'var(--sakura-dark)', header:'assets/sakura.png', emoji:'🌸', 
        description:'Elegant dreamer', traits:['Elegant','Creative'],
        profileImage:'assets/profile-sakura.png', fandomName:'39er',
        stats: { items: 5, followers: '1.8k', following: 198 }
    },
    yunjin: { 
        color:'var(--yunjin)', accent:'var(--yunjin-dark)', header:'assets/yunjin.png', emoji:'🐍', 
        description:'Confident artist', traits:['Confident','Artistic'],
        profileImage:'assets/profile-yunjin.png', fandomName:'Burned Passport',
        stats: { items: 7, followers: '3k', following: 305 }
    },
    kazuha: { 
        color:'var(--kazuha)', accent:'var(--kazuha-dark)', header:'assets/kazuha.png', emoji:'🦢', 
        description:'Graceful soul', traits:['Graceful','Serene'],
        profileImage:'assets/profile-kazuha.png', fandomName:'Komorebis',
        stats: { items: 4, followers: '1.5k', following: 180 }
    },
    eunchae: { 
        color:'var(--eunchae)', accent:'var(--eunchae-dark)', header:'assets/eunchae.png', emoji:'🐣', 
        description:'Energetic sunshine', traits:['Energetic','Playful'],
        profileImage:'assets/profile-eunchae.png', fandomName:'Member of the Eunchae Mother Association',
        stats: { items: 6, followers: '2.5k', following: 250 }
    }
};

// ===== PRODUCTS =====
const products = [
    { id:'keychain', brand:'Sunnie Jae', title:'Member Keychain', size:'2.5 in', price:'$12', image:'assets/hangul/{member}.png', redbubble:'https://www.redbubble.com/people/sunniejae/shop' },
    { id:'sticker', brand:'Sunnie Jae', title:'Sticker Pack', size:'5 stickers', price:'$8', image:'assets/hangul/{member}.png', redbubble:'https://www.redbubble.com/people/sunniejae/shop' },
    { id:'photocard', brand:'Sunnie Jae', title:'Member Photocard', size:'3x4 in', price:'$6', image:'assets/hangul/{member}.png', redbubble:'https://www.redbubble.com/people/sunniejae/shop' },
    { id:'totebag', brand:'Sunnie Jae', title:'Bias Tote Bag', size:'Canvas', price:'$18', image:'assets/hangul/{member}.png', redbubble:'https://www.redbubble.com/people/sunniejae/shop' }
];

// ===== QUIZ QUESTIONS =====
const quizQuestions = [
    { question: "Favorite Color", answers: [
        { text: "White", members: ["chaewon"] },
        { text: "Pink", members: ["sakura"] },
        { text: "Blue", members: ["kazuha"] },
        { text: "Green", members: ["yunjin"] },
        { text: "Red", members: ["eunchae"] }
    ]},
    { question: "Are you an introvert or an extrovert?", answers: [
        { text: "Introvert", members: ["sakura","eunchae","kazuha"] },
        { text: "Extrovert", members: ["yunjin","chaewon"] }
    ]},
    { question: "Down to Earth vs Head in the Clouds", answers: [
        { text: "Down to Earth", members: ["chaewon","eunchae"] },
        { text: "Head in the Clouds", members: ["sakura","yunjin","kazuha"] }
    ]},
    { question: "Head vs Heart", answers: [
        { text: "Head", members: ["sakura","eunchae","chaewon"] },
        { text: "Heart", members: ["kazuha","yunjin"] }
    ]},
    { question: "Order vs Chaos", answers: [
        { text: "Order", members: ["yunjin","kazuha","eunchae"] },
        { text: "Chaos", members: ["chaewon","sakura"] }
    ]},
    { question: "Favorite Animal", answers: [
        { text: "Cheetah", members: ["chaewon"] },
        { text: "Cat", members: ["sakura"] },
        { text: "Swan", members: ["kazuha"] },
        { text: "Baby Chick", members: ["eunchae"] },
        { text: "Snake", members: ["yunjin"] }
    ]},
    { question: "Favorite English Name", answers: [
        { text: "Anna", members: ["chaewon"] },
        { text: "Sebastian", members: ["sakura"] },
        { text: "Jennifer", members: ["yunjin"] },
        { text: "Ava", members: ["sakura"] },
        { text: "Elle", members: ["kazuha"] },
        { text: "Ruby", members: ["eunchae"] }
    ]},
    { question: "Favorite English Idiom", answers: [
        { text: "Have a good one!", members: ["sakura"] },
        { text: "Easy peasy lemon squeezy", members: ["chaewon"] },
        { text: "It girl energy", members: ["yunjin"] },
        { text: "She ate with no crumbs", members: ["eunchae"] },
        { text: "Freeze to death", members: ["kazuha"] }
    ]},
    { question: "Dark Chocolate or Milk Chocolate?", answers: [
        { text: "Dark", members: ["sakura","kazuha","chaewon","yunjin"] },
        { text: "Milk", members: ["eunchae"] }
    ]},
    { question: "Another group you like", answers: [
        { text: "Red Velvet", members: ["sakura"] },
        { text: "BTS", members: ["yunjin"] },
        { text: "BlackPink", members: ["kazuha"] },
        { text: "Seventeen", members: ["eunchae"] },
        { text: "Girl's Generation", members: ["chaewon"] },
        { text: "iz*One", members: ["sakura","chaewon"] }
    ]},
    { question: "Can you handle spicy food?", answers: [
        { text: "Yes", members: ["chaewon","yunjin"] },
        { text: "No", members: ["sakura","kazuha"] },
        { text: "Depends on the day", members: ["eunchae"] }
    ]},
    { question: "Favorite LE SSERAFIM era", answers: [
        { text: "Unforgiven", members: ["yunjin"] },
        { text: "Crazy", members: ["eunchae"] },
        { text: "Spaghetti", members: ["sakura","chaewon","eunchae","kazuha","yunjin"] },
        { text: "Hot", members: ["sakura"] },
        { text: "Easy", members: ["chaewon"] },
        { text: "Come Over", members: ["kazuha"] }
    ]}
];

let currentQuestionIndex = 0;

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    setBias(currentBias);
    renderProducts();
    updateBagCount();

    const searchInput = document.querySelector('.search-input');
    if(searchInput){
        searchInput.addEventListener('input', e => {
            console.log('Searching for:', e.target.value);
        });
    }
});

// ===== BIAS =====
function setBias(member){
    currentBias = member;
    const data = memberData[member];

    // Update theme
    document.documentElement.style.setProperty('--current-bg', data.color);
    document.documentElement.style.setProperty('--current-accent', data.accent);

    // Update profile emoji and image
    const profilePic = document.getElementById('profile-pic');
    profilePic.textContent = data.emoji;

    const profileHeader = document.querySelector('.profile-header');
    let img = profileHeader.querySelector('img');
    if(img){
        img.src = data.profileImage;
    } else {
        img = document.createElement('img');
        img.src = data.profileImage;
        img.alt = capitalize(member);
        img.style.width = '60px';
        img.style.height = '60px';
        img.style.borderRadius = '50%';
        profileHeader.insertBefore(img, profilePic);
    }
    profilePic.style.display = img ? 'none' : 'flex';

    // Name and fandom
    const profileInfo = document.querySelector('.profile-info h1');
    profileInfo.innerHTML = `Fearnot <span class="verified-badge">${data.fandomName}</span>`;

    // Stats
    const statsElem = document.querySelector('.profile-stats');
    statsElem.innerHTML = `<span>${data.stats.items} items</span><span>${data.stats.followers} followers</span><span>${data.stats.following} following</span>`;

    // Active button
    document.querySelectorAll('.bias-btn').forEach(btn=>{
        btn.classList.toggle('active', btn.dataset.member === member);
    });

    renderProducts();
}

// ===== PRODUCTS =====
function renderProducts(){
    const grid=document.getElementById('products-grid');
    grid.innerHTML='';
    products.forEach(product=>{
        const card=document.createElement('div'); card.className='product-card';
        const imageUrl=product.image.replace('{member}',currentBias);
        card.innerHTML=`
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
    const product=products.find(p=>p.id===productId);
    const itemText=`${product.title} - ${memberData[currentBias].emoji} ${capitalize(currentBias)}`;
    if(!wishlistItems.includes(itemText)) wishlistItems.push(itemText);
    updateWishlistDisplay(); updateBagCount();
    button.textContent='💖 Added!'; setTimeout(()=>{ button.textContent='💖 Add to Wishlist'; },2000);
}
function updateWishlistDisplay(){ document.getElementById('wishlist-items').value=wishlistItems.join('\n'); }
function updateBagCount(){ document.getElementById('bag-count').textContent=wishlistItems.length; }
function submitWishlist(){
    const items=document.getElementById('wishlist-items').value.trim();
    const name=document.getElementById('wishlist-name').value.trim();
    const email=document.getElementById('wishlist-email').value.trim();
    const optedIn=document.getElementById('email-optin').checked;
    if(!items || !email){ alert('Please add items and enter your email 💖'); return; }
    const subject=encodeURIComponent('New Sunnie Jae Wishlist Request');
    const body=encodeURIComponent(`Wishlist Request\nName: ${name||'N/A'}\nEmail: ${email}\nItems Requested:\n${items}\nSubscribed: ${optedIn?'YES':'NO'}`);
    window.location.href=`mailto:sunniejae@gmail.com?subject=${subject}&body=${body}`;
}

// ===== LIKE =====
function toggleLike(e, btn){ e.stopPropagation(); btn.classList.toggle('liked'); btn.textContent=btn.classList.contains('liked')?'❤️':'♡'; }

// ===== QUIZ =====
function openQuiz(){
    document.getElementById('quiz-modal').classList.add('active');
    quizScores = {chaewon:0,sakura:0,yunjin:0,kazuha:0,eunchae:0};
    currentQuestionIndex = 0;
    renderQuizQuestion();
}

function closeQuiz(){ document.getElementById('quiz-modal').classList.remove('active'); }

function renderQuizQuestion(){
    const quizContent = document.getElementById('quiz-questions');
    quizContent.innerHTML = '';

    if(currentQuestionIndex >= quizQuestions.length){
        const winner = Object.keys(quizScores).reduce((a,b) => quizScores[a]>=quizScores[b]?a:b );
        closeQuiz();
        setTimeout(()=>{ showResult(winner); setBias(winner); },300);
        return;
    }

    const q = quizQuestions[currentQuestionIndex];
    const questionElem = document.createElement('p');
    questionElem.textContent = q.question;
    quizContent.appendChild(questionElem);

    q.answers.forEach(a => {
        const btn = document.createElement('button');
        btn.textContent = a.text;
        btn.onclick = () => answerQuiz(a.members);
        quizContent.appendChild(btn);
    });
}

function answerQuiz(members){
    if(!Array.isArray(members)) members = [members];
    members.forEach(m => quizScores[m]++);
    currentQuestionIndex++;
    renderQuizQuestion();
}

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

console.log('✨ LE SSERAFIM Fearnot Shop loaded! 💖');
