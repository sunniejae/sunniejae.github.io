// ===== MEMBER DATA =====
const members = {
    SEOHO: { display: "SEOHO", subtitle: "SEOHO TOMOON", color: "var(--SEOHO)", accent: "var(--SEOHO-dark)" },
    ONEUS: { display: "ONEUS", subtitle: "TOMOON", color: "var(--primary)", accent: "var(--dark-purple)" },
    LEEDO: { display: "LEEDO", subtitle: "LEEDO TOMOON", color: "var(--LEEDO)", accent: "var(--LEEDO-dark)" },
    KEONHEE: { display: "KEONHEE", subtitle: "KEONHEE TOMOON", color: "var(--KEONHEE)", accent: "var(--KEONHEE-dark)" },
    HWANWOONG: { display: "HWANWOONG", subtitle: "HWANWOONG TOMOON", color: "var(--HWANWOONG)", accent: "var(--HWANWOONG-dark)" },
    XION: { display: "XION", subtitle: "XION TOMOON", color: "var(--XION)", accent: "var(--XION-dark)" }
};

// ===== PRODUCT DATA =====
const products = [
    { 
        name: "Hangul Member Names", 
        images: { ONEUS: "assets/hangul-member.png", SEOHO: "assets/hangul-SEOHO.png", LEEDO: "assets/hangul-LEEDO.png", KEONHEE: "assets/hangul-KEONHEE.png", HWANWOONG: "assets/hangul-HWANWOONG.png", XION: "assets/hangul-XION.png" }, 
        brand: "Redbubble", price: "$1.79+", size:"Multi",
        url: { ONEUS:"https://www.redbubble.com/ONEUS-hangul", SEOHO:"https://www.redbubble.com/people/sunniejae/shop?artistUserName=sunniejae&collections=4422836&iaCode=all-departments&sortOrder=top%20selling", LEEDO:"https://www.redbubble.com/people/sunniejae/shop?artistUserName=sunniejae&collections=4422836&iaCode=all-departments&sortOrder=top%20selling", KEONHEE:"https://www.redbubble.com/people/sunniejae/shop?artistUserName=sunniejae&collections=4422836&iaCode=all-departments&sortOrder=top%20selling", HWANWOONG:"https://www.redbubble.com/people/sunniejae/shop?artistUserName=sunniejae&collections=4422836&iaCode=all-departments&sortOrder=top%20selling", HWANWOONG:"https://www.redbubble.com/people/sunniejae/shop?artistUserName=sunniejae&collections=4422836&iaCode=all-departments&sortOrder=top%20selling" }
    },
    { 
        name: "COMEBACK Era Stickers", 
        images: { ONEUS: "assets/COMEBACK-member.png", SEOHO: "assets/COMEBACK-SEOHO.png", LEEDO: "assets/COMEBACK-LEEDO.png", KEONHEE: "assets/COMEBACK-KEONHEE.png", HWANWOONG: "assets/COMEBACK-HWANWOONG.png", XION: "assets/COMEBACK-XION.png" }, 
        brand: "Redbubble", price: "$1.79+", size:"Multi",
        url: { ONEUS:"https://www.redbubble.com/people/sunniejae/shop?artistUserName=sunniejae&collections=4422838&iaCode=all-departments&sortOrder=top%20selling", SEOHO:"https://www.redbubble.com/people/sunniejae/shop?artistUserName=sunniejae&collections=4422838&iaCode=all-departments&sortOrder=top%20selling", LEEDO:"https://www.redbubble.com/people/sunniejae/shop?artistUserName=sunniejae&collections=4422838&iaCode=all-departments&sortOrder=top%20selling", KEONHEE:"https://www.redbubble.com/people/sunniejae/shop?artistUserName=sunniejae&collections=4422838&iaCode=all-departments&sortOrder=top%20selling", HWANWOONG:"https://www.redbubble.com/HWANWOONG-COMEBACK", HWANWOONG:"https://www.redbubble.com/people/sunniejae/shop?artistUserName=sunniejae&collections=4422838&iaCode=all-departments&sortOrder=top%20selling" }
    },
    { 
        name: "Lightstick Keychains", 
        images: { ONEUS: "assets/lightstickkeychain-ONEUS.png", SEOHO: "assets/lightstickkeychain-SEOHO.png", LEEDO: "assets/lightstickkeychain-LEEDO.png", KEONHEE: "assets/blank-KEONHEE.png", HWANWOONG: "assets/lightstickkeychain-HWANWOONG.png", XION: "assets/blank-XION.png" }, 
        brand: "Sunnie Jae", price: "$15", size:"1pc" 
    },
    { 
        name: "Phone Case", 
        images: { ONEUS: "assets/phonecase-ONEUS.png", SEOHO: "assets/blank-SEOHO.png", LEEDO: "assets/blank-LEEDO.png", KEONHEE: "assets/blank-KEONHEE.png", HWANWOONG: "assets/blank-HWANWOONG.png", XION: "assets/blank-XION.png" }, 
        brand: "Sunnie Jae", price: "$25", size:"1pc" 
    },
    { 
        name: "AutoGraphics", 
        images: { ONEUS: "assets/autograph-ONEUS.png", SEOHO: "assets/autograph-SEOHO.png", LEEDO: "blank-LEEDO.png", KEONHEE: "blank-KEONHEE.png", HWANWOONG: "assets/blank-HWANWOONG.png", XION: "assets/blank-XION.png" }, 
        brand: "Redbubble", price: "$1.79+", size:"1pc",
        url: { ONEUS:"https://www.redbubble.com/ONEUS-autograph", SEOHO:"https://www.redbubble.com/SEOHO-autograph", LEEDO:"https://www.redbubble.com/LEEDO-autograph", KEONHEE:"https://www.redbubble.com/KEONHEE-autograph", HWANWOONG:"https://www.redbubble.com/HWANWOONG-autograph", XION:"https://www.redbubble.com/XION-autograph" }
    }
];

// ===== QUIZ DATA =====
const quizQuestions = [
    { question: "Favorite Color", answers: [ 
        {text: "White", members:["SEOHO"]}, 
        {text:"Pink", members:["LEEDO"]}, 
        {text:"Blue", members:["HWANWOONG"]}, 
        {text:"Green", members:["KEONHEE"]}, 
        {text:"Red", members:["HWANWOONG"]} 
    ] },
    { question: "Are you an introvert or an extrovert?", answers: [ 
        {text:"Introvert", members:["LEEDO","HWANWOONG","HWANWOONG"]}, 
        {text:"Extrovert", members:["KEONHEE","SEOHO"]} 
    ] },
    { question: "Down to Earth vs Head in the Clouds", answers: [ 
        {text:"Down to Earth", members:["SEOHO","HWANWOONG"]}, 
        {text:"Head in the Clouds", members:["LEEDO","KEONHEE","HWANWOONG"]} 
    ] },
    { question: "Head vs Heart", answers: [ 
        {text:"Head", members:["LEEDO","HWANWOONG","SEOHO"]}, 
        {text:"Heart", members:["HWANWOONG","KEONHEE"]} 
    ] },
    { question: "Order vs Chaos", answers: [ 
        {text:"Order", members:["KEONHEE","HWANWOONG","HWANWOONG"]}, 
        {text:"Chaos", members:["SEOHO","LEEDO"]} 
    ] },
    { question: "Favorite Animal", answers: [ 
        {text:"Cheetah", members:["SEOHO"]}, 
        {text:"Cat", members:["LEEDO"]}, 
        {text:"Swan", members:["HWANWOONG"]}, 
        {text:"Baby Chick", members:["HWANWOONG"]}, 
        {text:"Snake", members:["KEONHEE"]} 
    ] },
    { question: "Favorite English Name", answers: [ 
        {text:"Anna", members:["SEOHO"]}, 
        {text:"Sebastian", members:["LEEDO"]}, 
        {text:"Jennifer", members:["KEONHEE"]}, 
        {text:"Ava", members:["LEEDO"]}, 
        {text:"Elle", members:["HWANWOONG"]}, 
        {text:"Ruby", members:["XION"]} 
    ] },
    { question: "Favorite English Idiom", answers: [ 
        {text:"Have a good one!", members:["LEEDO"]}, 
        {text:"Easy peasy lemon squeezy", members:["SEOHO"]}, 
        {text:"It girl energy", members:["KEONHEE"]}, 
        {text:"She ate with no crumbs", members:["HWANWOONG"]}, 
        {text:"Freeze to death", members:["HWANWOONG"]} 
    ] },
    { question: "Dark Chocolate or Milk Chocolate?", answers: [ 
        {text:"Dark", members:["LEEDO","HWANWOONG","SEOHO","KEONHEE"]}, 
        {text:"Milk", members:["HWANWOONG"]} 
    ] },
    { question: "Another ONEUS you like", answers: [ 
        {text:"Red Velvet", members:["LEEDO"]}, 
        {text:"BTS", members:["KEONHEE"]}, 
        {text:"BlackPink", members:["HWANWOONG"]}, 
        {text:"Seventeen", members:["HWANWOONG"]}, 
        {text:"Girl's Generation", members:["SEOHO"]}, 
        {text:"iz*One", members:["LEEDO","SEOHO"]} 
    ] },
    { question: "Can you handle spicy food?", answers: [ 
        {text:"Yes", members:["SEOHO","KEONHEE"]}, 
        {text:"No", members:["LEEDO","HWANWOONG"]}, 
        {text:"Depends on the day", members:["HWANWOONG"]} 
    ] },
    { question: "Favorite LE SSERAFIM era", answers: [ 
        {text:"Unforgiven", members:["KEONHEE"]}, 
        {text:"Crazy", members:["HWANWOONG"]}, 
        {text:"COMEBACK", members:["LEEDO","SEOHO","HWANWOONG","HWANWOONG","KEONHEE"]}, 
        {text:"Hot", members:["LEEDO"]}, 
        {text:"Easy", members:["SEOHO"]}, 
        {text:"Come Over", members:["HWANWOONG"]} 
    ] }
];

// ===== STATE =====
let currentBias = "ONEUS";
let wishlist = {};
let currentQuestionIndex = 0;
let quizScore = {};

// ===== SET BIAS =====
function setBias(member) {
    currentBias = member;

    const profileImg = document.querySelector("#profile-pic img");
    profileImg.src = `/assets/profile-${member}.png`;

    const displayName = member === "ONEUS" ? "ONEUS" : members[member].display;
    const subtitle = member === "ONEUS" ? "Fearnot" : members[member].subtitle;

    document.querySelector(".profile-info h1").innerHTML = `${displayName} <span class="verified-badge">${subtitle}</span>`;

    if (member !== "ONEUS") {
        document.documentElement.style.setProperty('--current-bg', members[member].color);
        document.documentElement.style.setProperty('--current-accent', members[member].accent);
    }

    document.querySelectorAll(".bias-btn").forEach(btn => {
        btn.classList.toggle("active", btn.textContent.includes(displayName));
    });

    renderProducts();
    renderWishlist();
}

// ===== RENDER PRODUCTS =====
function renderProducts() {
    const grid = document.getElementById("products-grid");
    grid.innerHTML = "";

    products.forEach(prod => {
        const imgSrc = prod.images[currentBias] || prod.images.ONEUS;
        const card = document.createElement("div");
        card.className = "product-card";

        let buttonHTML = "";
        if(prod.brand === "Redbubble") {
            const url = prod.url?.[currentBias] || prod.url?.ONEUS || "#";
            buttonHTML = `<a class="product-btn" href="${url}" target="_blank" rel="noopener noreferrer">Shop Redbubble</a>`;
        } else {
            buttonHTML = `<button class="wishlist-btn" onclick="addToWishlist('${prod.name}')">Add to Wishlist</button>`;
        }

        card.innerHTML = `
            <div class="product-image">
                <img src="/${imgSrc}" width="250" height="250" alt="${prod.name}">
            </div>
            <div class="product-info">
                <div class="product-brand">${prod.brand}</div>
                <div class="product-title">${prod.name}</div>
                <div class="product-size">${prod.size}</div>
                <div class="product-price">${prod.price}</div>
                ${buttonHTML}
            </div>
        `;
        grid.appendChild(card);
    });
}

// ===== WISHLIST =====
function addToWishlist(item) {
    const memberKey = currentBias === "ONEUS" ? "ONEUS" : members[currentBias].display;
    if (!wishlist[memberKey]) wishlist[memberKey] = [];
    if (!wishlist[memberKey].includes(item)) wishlist[memberKey].push(item);
    renderWishlist();
}

function renderWishlist() {
    const textarea = document.getElementById("wishlist-items");
    textarea.value = "";
    let totalItems = 0;

    for (const member in wishlist) {
        textarea.value += `--- ${member} ---\n`;
        wishlist[member].forEach(item => {
            textarea.value += `${item}\n`;
            totalItems++;
        });
        textarea.value += "\n";
    }

    const bagCountEl = document.getElementById("bag-count");
    if (bagCountEl) {
        bagCountEl.textContent = totalItems;
        bagCountEl.style.display = totalItems > 0 ? "inline" : "none";
    }
}

function submitWishlist() {
    const name = document.getElementById("wishlist-name").value;
    const email = document.getElementById("wishlist-email").value;
    const optin = document.getElementById("email-optin").checked ? "Yes" : "No";

    let wishlistText = "";
    for (const member in wishlist) {
        wishlistText += `--- ${member} ---\n`;
        wishlist[member].forEach(item => wishlistText += `${item}\n`);
        wishlistText += "\n";
    }

    const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nSubscribed to promos: ${optin}\n\nWishlist:\n${wishlistText}`
    );

    window.location.href = `mailto:orders@sunniejae.com?subject=FEARNOT SHOP- Request&body=${body}`;

    wishlist = {};
    renderWishlist();
    document.getElementById("wishlist-name").value = "";
    document.getElementById("wishlist-email").value = "";
    document.getElementById("email-optin").checked = false;
}

// ===== QUIZ =====
function openQuiz() {
    document.getElementById("quiz-modal").classList.add("active");
    currentQuestionIndex = 0;
    quizScore = {};
    renderCurrentQuestion();
}

function closeQuiz() {
    document.getElementById("quiz-modal").classList.remove("active");
}

function renderCurrentQuestion() {
    const container = document.getElementById("quiz-questions");
    container.innerHTML = "";
    const q = quizQuestions[currentQuestionIndex];

    const questionEl = document.createElement("div");
    questionEl.innerHTML = `<p><strong>${q.question}</strong></p>`;
    q.answers.forEach(ans => {
        const btn = document.createElement("button");
        btn.textContent = ans.text;
        btn.onclick = () => selectAnswer(ans.members);
        questionEl.appendChild(btn);
    });
    container.appendChild(questionEl);
}

function selectAnswer(membersArray) {
    membersArray.forEach(m => quizScore[m] = (quizScore[m] || 0) + 1);
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) renderCurrentQuestion();
    else showResult();
}

function showResult() {
    let maxScore = 0;
    for (const m in quizScore) if (quizScore[m] > maxScore) maxScore = quizScore[m];

    let topMembers = [];
    for (const m in quizScore) if (quizScore[m] === maxScore) topMembers.push(m);

    if (topMembers.length === 0) topMembers = ["ONEUS"];

    const topMember = topMembers[Math.floor(Math.random() * topMembers.length)];

    const displayName = topMember === "ONEUS" ? "ONEUS" : members[topMember].display;
    const subtitle = topMember === "ONEUS" ? "Fearnot" : members[topMember].subtitle;

    document.getElementById("result-image").src = `/profile-${topMember}.png`;
    document.getElementById("result-name").textContent = displayName;
    document.getElementById("result-description").textContent = `Mostly chose ${displayName}! You match best with them.`;
    document.getElementById("result-traits").innerHTML = `TOMOON Subtitle: <span class="trait-tag">${subtitle}</span>`;

    document.getElementById("result-modal").classList.add("active");
    closeQuiz();
}

function closeResult() {
    document.getElementById("result-modal").classList.remove("active");
}

// ===== INITIALIZE =====
window.onload = () => { setBias(currentBias); };
