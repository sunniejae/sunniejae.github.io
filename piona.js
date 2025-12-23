// ===== MEMBER DATA WITH PROFILE INFO =====
const memberData = {
    chaewon: { 
        color: 'var(--chaewon)', 
        accent: 'var(--chaewon-dark)', 
        emoji: '🐯',
        fandom: 'Ssamudan'
    },
    sakura: { 
        color: 'var(--sakura)', 
        accent: 'var(--sakura-dark)', 
        emoji: '🌸',
        fandom: '39er'
    },
    yunjin: { 
        color: 'var(--yunjin)', 
        accent: 'var(--yunjin-dark)', 
        emoji: '🐍',
        fandom: 'Burned Passport'
    },
    kazuha: { 
        color: 'var(--kazuha)', 
        accent: 'var(--kazuha-dark)', 
        emoji: '🦢',
        fandom: 'Komorebis'
    },
    eunchae: { 
        color: 'var(--eunchae)', 
        accent: 'var(--eunchae-dark)', 
        emoji: '🐣',
        fandom: 'Member of the Eunchae Mother Association'
    }
};

let currentBias = null;

// ===== PRODUCTS DATA =====
const products = [
    { name:'Fearnot Keychain', image:'https://sunniejae.blob.core.windows.net/sunniejae/chaewonkeychainpieces.png', price:'$12', member:'chaewon' },
    { name:'Fearnot Sticker Pack', image:'https://sunniejae.blob.core.windows.net/sunniejae/fearnotstickers.png', price:'$8', member:'sakura' },
    // Add more products per member here
];

// ===== WISHLIST =====
let wishlistItems = [];

// ===== SET BIAS FUNCTION =====
function setBias(member) {
    currentBias = member;

    // Update CSS theme colors
    document.documentElement.style.setProperty('--current-bg', memberData[member].color);
    document.documentElement.style.setProperty('--current-accent', memberData[member].accent);

    // Update profile section
    document.getElementById('profile-pic').textContent = memberData[member].emoji;
    document.getElementById('profile-fandom').textContent = memberData[member].fandom;

    // Highlight active button
    document.querySelectorAll('.bias-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.bias-btn[onclick="setBias('${member}')"]`).classList.add('active');

    // Render products for this member
    renderProducts(member);
}

// ===== RENDER PRODUCTS =====
function renderProducts(member) {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';
    const filtered = member ? products.filter(p => p.member === member) : products;
    filtered.forEach(prod => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image"><img src="${prod.image}" alt="${prod.name}"></div>
            <div class="product-info">
                <div class="product-brand">Fearnot</div>
                <div class="product-title">${prod.name}</div>
                <div class="product-price">${prod.price}</div>
                <button class="wishlist-btn" onclick="addToWishlist('${prod.name}')">💖 Add to Wishlist</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// ===== WISHLIST FUNCTIONS =====
function addToWishlist(itemName) {
    wishlistItems.push(itemName);
    document.getElementById('wishlist-items').value = wishlistItems.join('\n');
}

function submitWishlist() {
    const name = document.getElementById('wishlist-name').value;
    const email = document.getElementById('wishlist-email').value;
    const optin = document.getElementById('email-optin').checked;
    alert(`Thank you ${name}! Your wishlist has been submitted.\nEmail Opt-in: ${optin ? 'Yes' : 'No'}\nItems:\n${wishlistItems.join('\n')}`);
    // Here you can connect to backend or email service
}

// ===== QUIZ MODAL =====
const quizModal = document.getElementById('quiz-modal');
const resultModal = document.getElementById('result-modal');
const quizQuestions = document.getElementById('quiz-questions');

const quizData = [
    { question:"Favorite Color?", answers:[
        { text:"White", members:["chaewon"] },
        { text:"Pink", members:["sakura"] },
        { text:"Blue", members:["kazuha"] },
        { text:"Green", members:["yunjin"] },
        { text:"Red", members:["eunchae"] }
    ]},
    { question:"Are you an introvert or extrovert?", answers:[
        { text:"Introvert", members:["sakura","eunchae","kazuha"] },
        { text:"Extrovert", members:["chaewon","yunjin"] }
    ]},
    { question:"Down to Earth or Head in the Clouds?", answers:[
        { text:"Down to Earth", members:["chaewon","eunchae"] },
        { text:"Head in the Clouds", members:["sakura","yunjin","kazuha"] }
    ]}
    // Add more questions as desired
];

let quizScores = {chaewon:0,sakura:0,yunjin:0,kazuha:0,eunchae:0};

function openQuiz() {
    quizModal.classList.add('active');
    quizQuestions.innerHTML = '';
    quizData.forEach((q, i) => {
        const qDiv = document.createElement('div');
        qDiv.innerHTML = `<p><b>${q.question}</b></p>`;
        q.answers.forEach(ans => {
            const btn = document.createElement('button');
            btn.textContent = ans.text;
            btn.onclick = () => selectAnswer(ans.members);
            qDiv.appendChild(btn);
        });
        quizQuestions.appendChild(qDiv);
    });
}

function selectAnswer(members) {
    members.forEach(m => quizScores[m]++);
    checkQuizCompletion();
}

function checkQuizCompletion() {
    const totalScore = Object.values(quizScores).reduce((a,b)=>a+b,0);
    if(totalScore >= quizData.length) { showResult(); }
}

function closeQuiz() { quizModal.classList.remove('active'); }

function showResult() {
    closeQuiz();
    const maxScore = Math.max(...Object.values(quizScores));
    const winners = Object.keys(quizScores).filter(m => quizScores[m] === maxScore);
    const winner = winners[Math.floor(Math.random()*winners.length)];

    document.getElementById('result-image').src = ''; // You can set a profile image URL
    document.getElementById('result-name').textContent = winner.charAt(0).toUpperCase() + winner.slice(1);
    document.getElementById('result-description').textContent = `Your perfect bias match is ${winner}!`;
    resultModal.classList.add('active');

    // Reset quizScores
    quizScores = {chaewon:0,sakura:0,yunjin:0,kazuha:0,eunchae:0};
}

function closeResult() { resultModal.classList.remove('active'); }

// ===== INITIAL RENDER =====
renderProducts(); 
