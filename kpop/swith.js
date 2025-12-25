// ===== MEMBER DATA =====
const members = {
    SUMIN: { display: "SUMIN", subtitle: "SUMIN Fandom", color: "var(--SUMIN)", accent: "var(--SUMIN-dark)" },
    STAYC: { display: "STAYC", subtitle: "FANDOM", color: "var(--primary)", accent: "var(--dark-purple)" },
    SIEUN: { display: "SIEUN", subtitle: "SIEUN Fandom", color: "var(--SIEUN)", accent: "var(--SIEUN-dark)" },
    SEEUN: { display: "SEEUN", subtitle: "SEEUN Fandom", color: "var(--SEEUN)", accent: "var(--SEEUN-dark)" },
    ISA: { display: "ISA", subtitle: "ISA Fandom", color: "var(--ISA)", accent: "var(--ISA-dark)" },
    YOON: { display: "YOON", subtitle: "YOON Fandom", color: "var(--YOON)", accent: "var(--YOON-dark)" }
};

// ===== PRODUCT DATA =====
const products = [
    { 
        name: "Hangul Member Names", 
        images: { STAYC: "assets/hangul-member.png", SUMIN: "assets/hangul-SUMIN.png", SIEUN: "assets/hangul-SIEUN.png", SEEUN: "assets/hangul-SEEUN.png", ISA: "assets/hangul-ISA.png", YOON: "assets/hangul-YOON.png" }, 
        brand: "Redbubble", price: "$1.79+", size:"Multi",
        url: { STAYC:"https://www.redbubble.com/STAYC-hangul", SUMIN:"https://www.redbubble.com/people/sunniejae/shop?artistUserName=sunniejae&collections=4422836&iaCode=all-departments&sortOrder=top%20selling", SIEUN:"https://www.redbubble.com/people/sunniejae/shop?artistUserName=sunniejae&collections=4422836&iaCode=all-departments&sortOrder=top%20selling", SEEUN:"https://www.redbubble.com/people/sunniejae/shop?artistUserName=sunniejae&collections=4422836&iaCode=all-departments&sortOrder=top%20selling", ISA:"https://www.redbubble.com/people/sunniejae/shop?artistUserName=sunniejae&collections=4422836&iaCode=all-departments&sortOrder=top%20selling", ISA:"https://www.redbubble.com/people/sunniejae/shop?artistUserName=sunniejae&collections=4422836&iaCode=all-departments&sortOrder=top%20selling" }
    },
    { 
        name: "COMEBACK Era Stickers", 
        images: { STAYC: "assets/COMEBACK-member.png", SUMIN: "assets/COMEBACK-SUMIN.png", SIEUN: "assets/COMEBACK-SIEUN.png", SEEUN: "assets/COMEBACK-SEEUN.png", ISA: "assets/COMEBACK-ISA.png", YOON: "assets/COMEBACK-YOON.png" }, 
        brand: "Redbubble", price: "$1.79+", size:"Multi",
        url: { STAYC:"https://www.redbubble.com/people/sunniejae/shop?artistUserName=sunniejae&collections=4422838&iaCode=all-departments&sortOrder=top%20selling", SUMIN:"https://www.redbubble.com/people/sunniejae/shop?artistUserName=sunniejae&collections=4422838&iaCode=all-departments&sortOrder=top%20selling", SIEUN:"https://www.redbubble.com/people/sunniejae/shop?artistUserName=sunniejae&collections=4422838&iaCode=all-departments&sortOrder=top%20selling", SEEUN:"https://www.redbubble.com/people/sunniejae/shop?artistUserName=sunniejae&collections=4422838&iaCode=all-departments&sortOrder=top%20selling", ISA:"https://www.redbubble.com/ISA-COMEBACK", ISA:"https://www.redbubble.com/people/sunniejae/shop?artistUserName=sunniejae&collections=4422838&iaCode=all-departments&sortOrder=top%20selling" }
    },
    { 
        name: "Lightstick Keychains", 
        images: { STAYC: "assets/lightstickkeychain-STAYC.png", SUMIN: "assets/lightstickkeychain-SUMIN.png", SIEUN: "assets/lightstickkeychain-SIEUN.png", SEEUN: "assets/blank-SEEUN.png", ISA: "assets/lightstickkeychain-ISA.png", YOON: "assets/blank-YOON.png" }, 
        brand: "Sunnie Jae", price: "$15", size:"1pc" 
    },
    { 
        name: "Phone Case", 
        images: { STAYC: "assets/phonecase-STAYC.png", SUMIN: "assets/blank-SUMIN.png", SIEUN: "assets/blank-SIEUN.png", SEEUN: "assets/blank-SEEUN.png", ISA: "assets/blank-ISA.png", YOON: "assets/blank-YOON.png" }, 
        brand: "Sunnie Jae", price: "$25", size:"1pc" 
    },
    { 
        name: "AutoGraphics", 
        images: { STAYC: "assets/autograph-STAYC.png", SUMIN: "assets/autograph-SUMIN.png", SIEUN: "blank-SIEUN.png", SEEUN: "blank-SEEUN.png", ISA: "assets/blank-ISA.png", YOON: "assets/blank-YOON.png" }, 
        brand: "Redbubble", price: "$1.79+", size:"1pc",
        url: { STAYC:"https://www.redbubble.com/STAYC-autograph", SUMIN:"https://www.redbubble.com/SUMIN-autograph", SIEUN:"https://www.redbubble.com/SIEUN-autograph", SEEUN:"https://www.redbubble.com/SEEUN-autograph", ISA:"https://www.redbubble.com/ISA-autograph", YOON:"https://www.redbubble.com/YOON-autograph" }
    }
];

// ===== QUIZ DATA =====
const quizQuestions = [
    { question: "Favorite Color", answers: [ 
        {text: "White", members:["SUMIN"]}, 
        {text:"Pink", members:["SIEUN"]}, 
        {text:"Blue", members:["ISA"]}, 
        {text:"Green", members:["SEEUN"]}, 
        {text:"Red", members:["ISA"]} 
    ] },
    { question: "Are you an introvert or an extrovert?", answers: [ 
        {text:"Introvert", members:["SIEUN","ISA","ISA"]}, 
        {text:"Extrovert", members:["SEEUN","SUMIN"]} 
    ] },
    { question: "Down to Earth vs Head in the Clouds", answers: [ 
        {text:"Down to Earth", members:["SUMIN","ISA"]}, 
        {text:"Head in the Clouds", members:["SIEUN","SEEUN","ISA"]} 
    ] },
    { question: "Head vs Heart", answers: [ 
        {text:"Head", members:["SIEUN","ISA","SUMIN"]}, 
        {text:"Heart", members:["ISA","SEEUN"]} 
    ] },
    { question: "Order vs Chaos", answers: [ 
        {text:"Order", members:["SEEUN","ISA","ISA"]}, 
        {text:"Chaos", members:["SUMIN","SIEUN"]} 
    ] },
    { question: "Favorite Animal", answers: [ 
        {text:"Cheetah", members:["SUMIN"]}, 
        {text:"Cat", members:["SIEUN"]}, 
        {text:"Swan", members:["ISA"]}, 
        {text:"Baby Chick", members:["ISA"]}, 
        {text:"Snake", members:["SEEUN"]} 
    ] },
    { question: "Favorite English Name", answers: [ 
        {text:"Anna", members:["SUMIN"]}, 
        {text:"Sebastian", members:["SIEUN"]}, 
        {text:"Jennifer", members:["SEEUN"]}, 
        {text:"Ava", members:["SIEUN"]}, 
        {text:"Elle", members:["ISA"]}, 
        {text:"Ruby", members:["YOON"]} 
    ] },
    { question: "Favorite English Idiom", answers: [ 
        {text:"Have a good one!", members:["SIEUN"]}, 
        {text:"Easy peasy lemon squeezy", members:["SUMIN"]}, 
        {text:"It girl energy", members:["SEEUN"]}, 
        {text:"She ate with no crumbs", members:["ISA"]}, 
        {text:"Freeze to death", members:["ISA"]} 
    ] },
    { question: "Dark Chocolate or Milk Chocolate?", answers: [ 
        {text:"Dark", members:["SIEUN","ISA","SUMIN","SEEUN"]}, 
        {text:"Milk", members:["ISA"]} 
    ] },
    { question: "Another STAYC you like", answers: [ 
        {text:"Red Velvet", members:["SIEUN"]}, 
        {text:"BTS", members:["SEEUN"]}, 
        {text:"BlackPink", members:["ISA"]}, 
        {text:"Seventeen", members:["ISA"]}, 
        {text:"Girl's Generation", members:["SUMIN"]}, 
        {text:"iz*One", members:["SIEUN","SUMIN"]} 
    ] },
    { question: "Can you handle spicy food?", answers: [ 
        {text:"Yes", members:["SUMIN","SEEUN"]}, 
        {text:"No", members:["SIEUN","ISA"]}, 
        {text:"Depends on the day", members:["ISA"]} 
    ] },
    { question: "Favorite LE SSERAFIM era", answers: [ 
        {text:"Unforgiven", members:["SEEUN"]}, 
        {text:"Crazy", members:["ISA"]}, 
        {text:"COMEBACK", members:["SIEUN","SUMIN","ISA","ISA","SEEUN"]}, 
        {text:"Hot", members:["SIEUN"]}, 
        {text:"Easy", members:["SUMIN"]}, 
        {text:"Come Over", members:["ISA"]} 
    ] }
];

// ===== STATE =====
let currentBias = "STAYC";
let wishlist = {};
let currentQuestionIndex = 0;
let quizScore = {};

// ===== SET BIAS =====
function setBias(member) {
    currentBias = member;

    const profileImg = document.querySelector("#profile-pic img");
    profileImg.src = `/assets/profile-${member}.png`;

    const displayName = member === "STAYC" ? "STAYC" : members[member].display;
    const subtitle = member === "STAYC" ? "Fearnot" : members[member].subtitle;

    document.querySelector(".profile-info h1").innerHTML = `${displayName} <span class="verified-badge">${subtitle}</span>`;

    if (member !== "STAYC") {
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
        const imgSrc = prod.images[currentBias] || prod.images.STAYC;
        const card = document.createElement("div");
        card.className = "product-card";

        let buttonHTML = "";
        if(prod.brand === "Redbubble") {
            const url = prod.url?.[currentBias] || prod.url?.STAYC || "#";
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
    const memberKey = currentBias === "STAYC" ? "STAYC" : members[currentBias].display;
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

    if (topMembers.length === 0) topMembers = ["STAYC"];

    const topMember = topMembers[Math.floor(Math.random() * topMembers.length)];

    const displayName = topMember === "STAYC" ? "STAYC" : members[topMember].display;
    const subtitle = topMember === "STAYC" ? "SWITH" : members[topMember].subtitle;

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
