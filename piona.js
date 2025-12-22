// ===== MEMBER THEME DATA =====
let currentBias = 'chaewon';
let quizScores = {chaewon: 0, sakura: 0, yunjin: 0, kazuha: 0, eunchae: 0};

const memberData = {
    chaewon: { 
        color: 'var(--chaewon)', 
        accent: 'var(--chaewon-dark)', 
        header: 'https://sunniejae.blob.core.windows.net/sunniejae/chaewon.png', 
        emoji: '🐯' 
    },
    sakura: { 
        color: 'var(--sakura)', 
        accent: 'var(--sakura-dark)', 
        header: 'https://sunniejae.blob.core.windows.net/sunniejae/sakura.png', 
        emoji: '🌸' 
    },
    yunjin: { 
        color: 'var(--yunjin)', 
        accent: 'var(--yunjin-dark)', 
        header: 'https://sunniejae.blob.core.windows.net/sunniejae/yunjin.png', 
        emoji: '🐍' 
    },
    kazuha: { 
        color: 'var(--kazuha)', 
        accent: 'var(--kazuha-dark)', 
        header: 'https://sunniejae.blob.core.windows.net/sunniejae/kazuha.png', 
        emoji: '🦢' 
    },
    eunchae: { 
        color: 'var(--eunchae)', 
        accent: 'var(--eunchae-dark)', 
        header: 'https://sunniejae.blob.core.windows.net/sunniejae/eunchae.png', 
        emoji: '🐣' 
    }
};

// ===== REDBUBBLE LINKS =====
const redbubbleLinks = {
    keychain: {
        ot5: 'https://www.redbubble.com/shop/lesserafim+keychains',
        chaewon: 'https://www.redbubble.com/shop/chaewon+keychains',
        sakura: 'https://www.redbubble.com/shop/sakura+keychains',
        yunjin: 'https://www.redbubble.com/shop/yunjin+keychains',
        kazuha: 'https://www.redbubble.com/shop/kazuha+keychains',
        eunchae: 'https://www.redbubble.com/shop/eunchae+keychains'
    },
    sticker: {
        ot5: 'https://www.redbubble.com/shop/lesserafim+stickers',
        chaewon: 'https://www.redbubble.com/shop/chaewon+stickers',
        sakura: 'https://www.redbubble.com/shop/sakura+stickers',
        yunjin: 'https://www.redbubble.com/shop/yunjin+stickers',
        kazuha: 'https://www.redbubble.com/shop/kazuha+stickers',
        eunchae: 'https://www.redbubble.com/shop/eunchae+stickers'
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

    if (value === 'ot5') {
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
function updateWishlist(collection, versionLabel) {
    // Remove existing entry for this collection
    wishlistItems = wishlistItems.filter(item => !item.startsWith(capitalize(collection) + ':'));
    
    // Add new entry
    wishlistItems.push(`${capitalize(collection)}: ${versionLabel}`);
    
    // Update textarea
    const wishlistTextarea = document.getElementById('wishlist-items');
    if (wishlistTextarea) {
        wishlistTextarea.value = wishlistItems.join('\n');
    }
}

function submitWishlist() {
    const name = document.getElementById('wishlist-name').value.trim();
    const email = document.getElementById('wishlist-email').value.trim();

    if (!name || !email || wishlistItems.length === 0) {
        alert("Please fill in your name, email, and select at least one item.");
        return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    const subject = encodeURIComponent(`Wishlist Request from ${name}`);
    const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\n` +
        `Wishlist:\n${wishlistItems.join('\n')}\n\n` +
        `---\nSent from Sunnie Jae's Fearnot Fandom Store`
    );
    
    window.location.href = `mailto:youremail@example.com?subject=${subject}&body=${body}`;
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
        
        // Apply the winning bias theme
        setBias(winner);
        
        // Show result
        setTimeout(() => {
            alert(`Your bias match is ${memberData[winner].emoji} ${capitalize(winner)}!`);
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
