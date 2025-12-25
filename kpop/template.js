// ===== MEMBER DATA =====
const members = {
    {MEMBER1}: { display: "{MEMBER1}", subtitle: "{MEMBER1Fandom}", color: "var(--{MEMBER1})", accent: "var(--{MEMBER1}-dark)" },
    {GROUP}: { display: "{GROUP}", subtitle: "{FANDOM}", color: "var(--primary)", accent: "var(--dark-purple)" },
    {MEMBER2}: { display: "{MEMBER2}", subtitle: "{MEMBER2Fandom}", color: "var(--{MEMBER2})", accent: "var(--{MEMBER2}-dark)" },
    {MEMBER3}: { display: "{MEMBER3}", subtitle: "{MEMBER3Fandom}", color: "var(--{MEMBER3})", accent: "var(--{MEMBER3}-dark)" },
    {MEMBER4}: { display: "{MEMBER4}", subtitle: "{MEMBER4Fandom}", color: "var(--{MEMBER4})", accent: "var(--{MEMBER4}-dark)" },
    {MEMBER5}: { display: "{MEMBER5}", subtitle: "{MEMBER5Fandom}", color: "var(--{MEMBER5})", accent: "var(--{MEMBER5}-dark)" }
};

// ===== PRODUCT DATA =====
const products = [
    { 
        name: "Hangul Member Names", 
        images: { {GROUP}: "assets/hangul-member.png", {MEMBER1}: "assets/hangul-{MEMBER1}.png", {MEMBER2}: "assets/hangul-{MEMBER2} - Copy.png", {MEMBER3}: "assets/hangul-{MEMBER3} - Copy.png", {MEMBER4}: "assets/hangul-{MEMBER4} - Copy.png", {MEMBER5}: "assets/hangul-{MEMBER5} - Copy.png" }, 
        brand: "Redbubble", price: "$1.79+", size:"Multi",
        url: { {GROUP}:"https://www.redbubble.com/{GROUP}-hangul", {MEMBER1}:"https://www.redbubble.com/people/sunniejae/shop?artistUserName=sunniejae&collections=4422836&iaCode=all-departments&sortOrder=top%20selling", {MEMBER2}:"https://www.redbubble.com/people/sunniejae/shop?artistUserName=sunniejae&collections=4422836&iaCode=all-departments&sortOrder=top%20selling", {MEMBER3}:"https://www.redbubble.com/people/sunniejae/shop?artistUserName=sunniejae&collections=4422836&iaCode=all-departments&sortOrder=top%20selling", {MEMBER4}:"https://www.redbubble.com/people/sunniejae/shop?artistUserName=sunniejae&collections=4422836&iaCode=all-departments&sortOrder=top%20selling", {MEMBER5}:"https://www.redbubble.com/people/sunniejae/shop?artistUserName=sunniejae&collections=4422836&iaCode=all-departments&sortOrder=top%20selling" }
    },
    { 
        name: "{COMEBACK} Era Stickers", 
        images: { {GROUP}: "assets/{COMEBACK}-member.png", {MEMBER1}: "assets/{COMEBACK}-{MEMBER1}.png", {MEMBER2}: "assets/{COMEBACK}-{MEMBER2}.png", {MEMBER3}: "assets/{COMEBACK}-{MEMBER3}.png", {MEMBER4}: "assets/{COMEBACK}-{MEMBER4}.png", {MEMBER5}: "assets/{COMEBACK}-{MEMBER5}.png" }, 
        brand: "Redbubble", price: "$1.79+", size:"Multi",
        url: { {GROUP}:"https://www.redbubble.com/people/sunniejae/shop?artistUserName=sunniejae&collections=4422838&iaCode=all-departments&sortOrder=top%20selling", {MEMBER1}:"https://www.redbubble.com/people/sunniejae/shop?artistUserName=sunniejae&collections=4422838&iaCode=all-departments&sortOrder=top%20selling", {MEMBER2}:"https://www.redbubble.com/people/sunniejae/shop?artistUserName=sunniejae&collections=4422838&iaCode=all-departments&sortOrder=top%20selling", {MEMBER3}:"https://www.redbubble.com/people/sunniejae/shop?artistUserName=sunniejae&collections=4422838&iaCode=all-departments&sortOrder=top%20selling", {MEMBER4}:"https://www.redbubble.com/{MEMBER4}-{COMEBACK}", {MEMBER5}:"https://www.redbubble.com/people/sunniejae/shop?artistUserName=sunniejae&collections=4422838&iaCode=all-departments&sortOrder=top%20selling" }
    },
    { 
        name: "Lightstick Keychains", 
        images: { {GROUP}: "assets/lightstickkeychain-{GROUP}.png", {MEMBER1}: "assets/lightstickkeychain-{MEMBER1}.png", {MEMBER2}: "assets/lightstickkeychain-{MEMBER2}.png", {MEMBER3}: "assets/blank-{MEMBER3}.png", {MEMBER4}: "assets/lightstickkeychain-{MEMBER4}.png", {MEMBER5}: "assets/blank-{MEMBER5}.png" }, 
        brand: "Sunnie Jae", price: "$15", size:"1pc" 
    },
    { 
        name: "Phone Case", 
        images: { {GROUP}: "assets/phonecase-member.png", {MEMBER1}: "assets/blank-{MEMBER1}.png", {MEMBER2}: "assets/blank-{MEMBER2}.png", {MEMBER3}: "blank-{MEMBER3}.png", {MEMBER4}: "assets/blank-{MEMBER4}.png", {MEMBER5}: "assets/blank-{MEMBER5}.png" }, 
        brand: "Sunnie Jae", price: "$25", size:"1pc" 
    },
    { 
        name: "AutoGraphics", 
        images: { {GROUP}: "assets/autograph-member.png", {MEMBER1}: "assets/autograph-{MEMBER1}.png", {MEMBER2}: "assets/blank-{MEMBER2}.png", {MEMBER3}: "assets/blank-{MEMBER3}.png", {MEMBER4}: "assets/blank-{MEMBER4}.png", {MEMBER5}: "assets/blank-{MEMBER5}.png" }, 
        brand: "Redbubble", price: "$1.79+", size:"1pc",
        url: { {GROUP}:"https://www.redbubble.com/{GROUP}-autograph", {MEMBER1}:"https://www.redbubble.com/{MEMBER1}-autograph", {MEMBER2}:"https://www.redbubble.com/{MEMBER2}-autograph", {MEMBER3}:"https://www.redbubble.com/{MEMBER3}-autograph", {MEMBER4}:"https://www.redbubble.com/{MEMBER4}-autograph", {MEMBER5}:"https://www.redbubble.com/{MEMBER5}-autograph" }
    }
];

// ===== QUIZ DATA =====
const quizQuestions = [
    { question: "Favorite Color", answers: [ 
        {text: "White", members:["{MEMBER1}"]}, 
        {text:"Pink", members:["{MEMBER2}"]}, 
        {text:"Blue", members:["{MEMBER4}"]}, 
        {text:"Green", members:["{MEMBER3}"]}, 
        {text:"Red", members:["{MEMBER5}"]} 
    ] },
    { question: "Are you an introvert or an extrovert?", answers: [ 
        {text:"Introvert", members:["{MEMBER2}","{MEMBER5}","{MEMBER4}"]}, 
        {text:"Extrovert", members:["{MEMBER3}","{MEMBER1}"]} 
    ] },
    { question: "Down to Earth vs Head in the Clouds", answers: [ 
        {text:"Down to Earth", members:["{MEMBER1}","{MEMBER5}"]}, 
        {text:"Head in the Clouds", members:["{MEMBER2}","{MEMBER3}","{MEMBER4}"]} 
    ] },
    { question: "Head vs Heart", answers: [ 
        {text:"Head", members:["{MEMBER2}","{MEMBER5}","{MEMBER1}"]}, 
        {text:"Heart", members:["{MEMBER4}","{MEMBER3}"]} 
    ] },
    { question: "Order vs Chaos", answers: [ 
        {text:"Order", members:["{MEMBER3}","{MEMBER4}","{MEMBER5}"]}, 
        {text:"Chaos", members:["{MEMBER1}","{MEMBER2}"]} 
    ] },
    { question: "Favorite Animal", answers: [ 
        {text:"Cheetah", members:["{MEMBER1}"]}, 
        {text:"Cat", members:["{MEMBER2}"]}, 
        {text:"Swan", members:["{MEMBER4}"]}, 
        {text:"Baby Chick", members:["{MEMBER5}"]}, 
        {text:"Snake", members:["{MEMBER3}"]} 
    ] },
    { question: "Favorite English Name", answers: [ 
        {text:"Anna", members:["{MEMBER1}"]}, 
        {text:"Sebastian", members:["{MEMBER2}"]}, 
        {text:"Jennifer", members:["{MEMBER3}"]}, 
        {text:"Ava", members:["{MEMBER2}"]}, 
        {text:"Elle", members:["{MEMBER4}"]}, 
        {text:"Ruby", members:["{MEMBER5}"]} 
    ] },
    { question: "Favorite English Idiom", answers: [ 
        {text:"Have a good one!", members:["{MEMBER2}"]}, 
        {text:"Easy peasy lemon squeezy", members:["{MEMBER1}"]}, 
        {text:"It girl energy", members:["{MEMBER3}"]}, 
        {text:"She ate with no crumbs", members:["{MEMBER5}"]}, 
        {text:"Freeze to death", members:["{MEMBER4}"]} 
    ] },
    { question: "Dark Chocolate or Milk Chocolate?", answers: [ 
        {text:"Dark", members:["{MEMBER2}","{MEMBER4}","{MEMBER1}","{MEMBER3}"]}, 
        {text:"Milk", members:["{MEMBER5}"]} 
    ] },
    { question: "Another group you like", answers: [ 
        {text:"Red Velvet", members:["{MEMBER2}"]}, 
        {text:"BTS", members:["{MEMBER3}"]}, 
        {text:"BlackPink", members:["{MEMBER4}"]}, 
        {text:"Seventeen", members:["{MEMBER5}"]}, 
        {text:"Girl's Generation", members:["{MEMBER1}"]}, 
        {text:"iz*One", members:["{MEMBER2}","{MEMBER1}"]} 
    ] },
    { question: "Can you handle spicy food?", answers: [ 
        {text:"Yes", members:["{MEMBER1}","{MEMBER3}"]}, 
        {text:"No", members:["{MEMBER2}","{MEMBER4}"]}, 
        {text:"Depends on the day", members:["{MEMBER5}"]} 
    ] },
    { question: "Favorite LE SSERAFIM era", answers: [ 
        {text:"Unforgiven", members:["{MEMBER3}"]}, 
        {text:"Crazy", members:["{MEMBER5}"]}, 
        {text:"{COMEBACK}", members:["{MEMBER2}","{MEMBER1}","{MEMBER5}","{MEMBER4}","{MEMBER3}"]}, 
        {text:"Hot", members:["{MEMBER2}"]}, 
        {text:"Easy", members:["{MEMBER1}"]}, 
        {text:"Come Over", members:["{MEMBER4}"]} 
    ] }
];

// ===== STATE =====
let currentBias = "{GROUP}";
let wishlist = {};
let currentQuestionIndex = 0;
let quizScore = {};

// ===== SET BIAS =====
function setBias(member) {
    currentBias = member;

    const profileImg = document.querySelector("#profile-pic img");
    profileImg.src = `/assets/profile-${member}.png`;

    const displayName = member === "{GROUP}" ? "{GROUP}" : members[member].display;
    const subtitle = member === "{GROUP}" ? "{FANDOM}" : members[member].subtitle;

    document.querySelector(".profile-info h1").innerHTML = `${displayName} <span class="verified-badge">${subtitle}</span>`;

    if (member !== "{GROUP}") {
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
        const imgSrc = prod.images[currentBias] || prod.images.{GROUP};
        const card = document.createElement("div");
        card.className = "product-card";

        let buttonHTML = "";
        if(prod.brand === "Redbubble") {
            const url = prod.url?.[currentBias] || prod.url?.{GROUP} || "#";
            buttonHTML = `<a class="product-btn" href="${url}" target="_blank" rel="noopener noreferrer">Shop Redbubble</a>`;
        } else {
            buttonHTML = `<button class="wishlist-btn" onclick="addToWishlist('${prod.name}')">Add to Wishlist</button>`;
        }

        card.innerHTML = `
            <div class="product-image">
                <img src="/assets/${imgSrc}" width="250" height="250" alt="${prod.name}">
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
    const memberKey = currentBias === "{GROUP}" ? "{GROUP}" : members[currentBias].display;
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

    window.location.href = `mailto:orders@sunniejae.com?subject={FANDOM} SHOP- Request&body=${body}`;

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

    if (topMembers.length === 0) topMembers = ["{GROUP}"];

    const topMember = topMembers[Math.floor(Math.random() * topMembers.length)];

    const displayName = topMember === "{GROUP}" ? "{GROUP}" : members[topMember].display;
    const subtitle = topMember === "{GROUP}" ? "{FANDOM}" : members[topMember].subtitle;

    document.getElementById("result-image").src = `/assets/profile-${topMember}.png`;
    document.getElementById("result-name").textContent = displayName;
    document.getElementById("result-description").textContent = `Mostly chose ${displayName}! You match best with them.`;
    document.getElementById("result-traits").innerHTML = `Fandom Subtitle: <span class="trait-tag">${subtitle}</span>`;

    document.getElementById("result-modal").classList.add("active");
    closeQuiz();
}

function closeResult() {
    document.getElementById("result-modal").classList.remove("active");
}

// ===== INITIALIZE =====
window.onload = () => { setBias(currentBias); };
