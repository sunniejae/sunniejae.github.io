// ==== Variables ====
let currentBias = 'chaewon';
let quizScores = { chaewon: 0, sakura: 0, yunjin: 0, kazuha: 0, eunchae: 0 };
let wishlist = [];

// ==== Member Theme Data ====
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

// ==== Set Bias / Theme ====
function setBias(member) {
    currentBias = member;
    const data = memberData[member];

    // Body
    document.body.style.backgroundColor = data.color;
    document.body.style.color = data.accent;

    // Header
    const header = document.getElementById('page-header');
    header.style.backgroundColor = data.accent;
    document.getElementById('header-image').src = data.header;

    // Collections
    document.querySelectorAll('.collection').forEach(coll => {
        const collection = coll.dataset.collection;
        const previewImg = document.getElementById(`preview-${collection}`);
        const activeLabel = document.getElementById(`collection-${collection}-active`);
        previewImg.src = `https://sunniejae.blob.core.windows.net/sunniejae/${collection}-${member}.png`;
        activeLabel.textContent = `${data.emoji} ${capitalize(member)} Version`;
        coll.style.backgroundColor = data.accent;
        coll.style.color = data.color;

        const selectEl = coll.querySelector('select');
        selectEl.style.backgroundColor = data.color;
        selectEl.style.color = data.accent;
        activeLabel.style.backgroundColor = data.color;
        activeLabel.style.color = data.accent;
    });

    // Bias buttons
    document.querySelectorAll('.bias-selector button').forEach(btn => {
        btn.style.backgroundColor = data.color;
        btn.style.color = data.accent;
    });

    // Wishlist button
    const wishlistBtn = document.getElementById('wishlist-request-btn');
    if (wishlistBtn) {
        wishlistBtn.style.backgroundColor = data.color;
        wishlistBtn.style.color = data.accent;
    }
}

// ==== Collection Version Selection ====
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

    addToWishlist(collection, value);
}

// ==== Wishlist Functionality ====
function addToWishlist(collection, version) {
    const exists = wishlist.find(item => item.collection === collection);
    if (exists) {
        exists.version = version;
    } else {
        wishlist.push({ collection, version });
    }
}

// Send Wishlist via mailto
function requestOrder() {
    const name = prompt("Enter your name:");
    const email = prompt("Enter your email:");

    if (!name || !email) {
        alert("Name and email are required!");
        return;
    }

    if (wishlist.length === 0) {
        alert("Your wishlist is empty!");
        return;
    }

    let body = `Wishlist for ${name} (${email}):\n\n`;
    wishlist.forEach(item => {
        body += `${capitalize(item.collection)} - ${item.version}\n`;
    });

    const subject = encodeURIComponent("Fandom Store Wishlist Request");
    const mailBody = encodeURIComponent(body);
    window.location.href = `mailto:your-email@example.com?subject=${subject}&body=${mailBody}`;
}

// ==== Bias Quiz Functions ====
function openQuiz() {
    document.getElementById('quiz-modal').style.display = 'flex';
}

function closeQuiz() {
    document.getElementById('quiz-modal').style.display = 'none';
    quizScores = { chaewon: 0, sakura: 0, yunjin: 0, kazuha: 0, eunchae: 0 };
}

function answerQuiz(member) {
    quizScores[member]++;
    const totalAnswers = Object.values(quizScores).reduce((a, b) => a + b, 0);
    if (totalAnswers >= 3) { // quiz has 3 questions
        const winner = Object.keys(quizScores).reduce((a, b) =>
            quizScores[a] >= quizScores[b] ? a : b
        );
        setBias(winner);
        closeQuiz();
        alert(`Your bias match is ${memberData[winner].emoji} ${capitalize(winner)}!`);
    }
}

// ==== Helper ====
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// ==== Initialize ====
document.addEventListener("DOMContentLoaded", () => {
    setBias(currentBias);

    // Add Request Order Button
    const storeContainer = document.querySelector('.store-container');
    if (storeContainer && !document.getElementById('wishlist-request-btn')) {
        const btn = document.createElement('button');
        btn.id = 'wishlist-request-btn';
        btn.textContent = 'Request Order';
        btn.style.marginTop = '2rem';
        btn.onclick = requestOrder;
        storeContainer.appendChild(btn);

        // Apply current bias colors
        const data = memberData[currentBias];
        btn.style.backgroundColor = data.color;
        btn.style.color = data.accent;
        btn.style.padding = '0.5rem 1rem';
        btn.style.borderRadius = '1rem';
        btn.style.border = 'none';
        btn.style.cursor = 'pointer';
    }
});
