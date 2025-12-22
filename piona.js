// ===== MEMBER THEME DATA =====
let currentBias = 'chaewon';
let quizScores = {chaewon:0, sakura:0, yunjin:0, kazuha:0, eunchae:0};

const memberData = {
    chaewon: { color: 'var(--chaewon)', accent: 'var(--chaewon-dark)', header: 'https://sunniejae.blob.core.windows.net/sunniejae/chaewon.png', emoji: '🐯' },
    sakura:  { color: 'var(--sakura)', accent: 'var(--sakura-dark)', header: 'https://sunniejae.blob.core.windows.net/sunniejae/sakura.png', emoji: '🌸' },
    yunjin:  { color: 'var(--yunjin)', accent: 'var(--yunjin-dark)', header: 'https://sunniejae.blob.core.windows.net/sunniejae/yunjin.png', emoji: '🐍' },
    kazuha:  { color: 'var(--kazuha)', accent: 'var(--kazuha-dark)', header: 'https://sunniejae.blob.core.windows.net/sunniejae/kazuha.png', emoji: '🦢' },
    eunchae: { color: 'var(--eunchae)', accent: 'var(--eunchae-dark)', header: 'https://sunniejae.blob.core.windows.net/sunniejae/eunchae.png', emoji: '🐣' }
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
        previewImg.src = `https://sunniejae.blob.core.windows.net/sunniejae/${collection}-${member}.png`;
        activeLabel.textContent = `${data.emoji} ${capitalize(member)} Version`;

        coll.style.backgroundColor = data.accent;
        coll.style.color = data.color;
        coll.querySelector('select').style.backgroundColor = data.color;
        coll.querySelector('select').style.color = data.accent;
        activeLabel.style.backgroundColor = data.color;
        activeLabel.style.color = data.accent;

        // Update wishlist for initial load
        updateWishlist(collection, activeLabel.textContent);
    });

    document.querySelectorAll('.bias-selector button').forEach(btn => {
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
    let versionLabel = '';

    if(value === 'ot5'){
        previewImg.src = `https://sunniejae.blob.core.windows.net/sunniejae/${collection}-ot5.png`;
        versionLabel = 'OT5 Version';
        activeLabel.textContent = versionLabel;
    } else {
        const data = memberData[value];
        previewImg.src = `https://sunniejae.blob.core.windows.net/sunniejae/${collection}-${value}.png`;
        versionLabel = `${data.emoji} ${capitalize(value)} Version`;
        activeLabel.textContent = versionLabel;
    }

    // Update wishlist automatically
    updateWishlist(collection, versionLabel);
}

// ===== WISHLIST FUNCTIONS =====
function updateWishlist(collection, versionLabel) {
    wishlistItems = wishlistItems.filter(item => !item.startsWith(collection + ':'));
    wishlistItems.push(`${collection}: ${versionLabel}`);
    const wishlistTextarea = document.getElementById('wishlist-items');
    if(wishlistTextarea){
        wishlistTextarea.value = wishlistItems.join('\n');
    }
}

function submitWishlist() {
    const name = document.getElementById('wishlist-name').value.trim();
    const email = document.getElementById('wishlist-email').value.trim();

    if(!name || !email || wishlistItems.length === 0){
        alert("Please fill in your name, email, and select at least one item.");
        return;
    }

    const subject = encodeURIComponent(`Wishlist from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nWishlist:\n${wishlistItems.join('\n')}`);
    window.location.href = `mailto:youremail@example.com?subject=${subject}&body=${body}`;
}

// ===== QUIZ FUNCTIONS =====
function openQuiz() {
    document.getElementById('quiz-modal').style.display = 'flex';
}

function closeQuiz() {
    document.getElementById('quiz-modal').style.display = 'none';
    quizScores = {chaewon:0, sakura:0, yunjin:0, kazuha:0, eunchae:0};

    // Reset quiz button colors
    document.querySelectorAll('#quiz-content button').forEach(btn => btn.style.backgroundColor = '');
}

function answerQuiz(member, button) {
    quizScores[member]++;

    // Highlight selected answer
    button.style.backgroundColor = memberData[member].accent;
    button.style.color = memberData[member].color;

    const totalAnswers = Object.values(quizScores).reduce((a,b)=>a+b,0);
    if(totalAnswers >= 3){ // 3 questions
        const winner = Object.keys(quizScores).reduce((a,b)=> quizScores[a]>=quizScores[b]?a:b);
        setBias(winner);
        closeQuiz();
        alert(`Your bias match is ${memberData[winner].emoji} ${capitalize(winner)}!`);
    }
}

// ===== HELPER =====
function capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}
