// ===== MEMBER DATA =====
const members = {
    chaewon: { display: "Chaewon", subtitle: "Ssamudan", color: "var(--chaewon)", accent: "var(--chaewon-dark)" },
    ot5: { display: "OT5", subtitle: "Fearnot", color: "var(--primary)", accent: "var(--dark-purple)" },
    sakura: { display: "Sakura", subtitle: "39er", color: "var(--sakura)", accent: "var(--sakura-dark)" },
    yunjin: { display: "Yunjin", subtitle: "Burned Passport", color: "var(--yunjin)", accent: "var(--yunjin-dark)" },
    kazuha: { display: "Kazuha", subtitle: "Komorebis", color: "var(--kazuha)", accent: "var(--kazuha-dark)" },
    eunchae: { display: "Eunchae", subtitle: "Eunchae Mother Association", color: "var(--eunchae)", accent: "var(--eunchae-dark)" }
};

// ===== PRODUCT DATA =====
const products = [
    { 
        name: "Hangul Member Names", 
        images: { ot5: "assets/hangul-member.png", chaewon: "assets/hangul-chaewon.png", sakura: "assets/hangul-sakura.png", yunjin: "assets/hangul-yunjin.png", kazuha: "assets/hangul-kazuha.png", eunchae: "assets/hangul-eunchae.png" }, 
        brand: "Redbubble", price: "$1.79+", size:"Multi",
        url: { ot5:"https://www.redbubble.com/ot5-hangul", chaewon:"https://www.redbubble.com/people/sunniejae/shop?artistUserName=sunniejae&collections=4422836&iaCode=all-departments&sortOrder=top%20selling", sakura:"https://www.redbubble.com/people/sunniejae/shop?artistUserName=sunniejae&collections=4422836&iaCode=all-departments&sortOrder=top%20selling", yunjin:"https://www.redbubble.com/people/sunniejae/shop?artistUserName=sunniejae&collections=4422836&iaCode=all-departments&sortOrder=top%20selling", kazuha:"https://www.redbubble.com/people/sunniejae/shop?artistUserName=sunniejae&collections=4422836&iaCode=all-departments&sortOrder=top%20selling", eunchae:"https://www.redbubble.com/people/sunniejae/shop?artistUserName=sunniejae&collections=4422836&iaCode=all-departments&sortOrder=top%20selling" }
    },
    { 
        name: "Spaghetti Era Stickers", 
        images: { ot5: "assets/spaghetti-member.png", chaewon: "assets/spaghetti-chaewon.png", sakura: "assets/spaghetti-sakura.png", yunjin: "assets/spaghetti-yunjin.png", kazuha: "assets/spaghetti-kazuha.png", eunchae: "assets/spaghetti-eunchae.png" }, 
        brand: "Redbubble", price: "$1.79+", size:"Multi",
        url: { ot5:"https://www.redbubble.com/people/sunniejae/shop?artistUserName=sunniejae&collections=4422838&iaCode=all-departments&sortOrder=top%20selling", chaewon:"https://www.redbubble.com/people/sunniejae/shop?artistUserName=sunniejae&collections=4422838&iaCode=all-departments&sortOrder=top%20selling", sakura:"https://www.redbubble.com/people/sunniejae/shop?artistUserName=sunniejae&collections=4422838&iaCode=all-departments&sortOrder=top%20selling", yunjin:"https://www.redbubble.com/people/sunniejae/shop?artistUserName=sunniejae&collections=4422838&iaCode=all-departments&sortOrder=top%20selling", kazuha:"https://www.redbubble.com/kazuha-spaghetti", eunchae:"https://www.redbubble.com/people/sunniejae/shop?artistUserName=sunniejae&collections=4422838&iaCode=all-departments&sortOrder=top%20selling" }
    },
    { 
        name: "Lightstick Keychains", 
        images: { ot5: "assets/lightstickkeychain-ot5.png", chaewon: "assets/lightstickkeychain-chaewon.png", sakura: "assets/lightstickkeychain-sakura.png", yunjin: "assets/blank-yunjin.png", kazuha: "assets/lightstickkeychain-kazuha.png", eunchae: "assets/blank-eunchae.png" }, 
        brand: "Sunnie Jae", price: "$15", size:"1pc" 
    },
    { 
        name: "Phone Case", 
        images: { ot5: "assets/phonecase-member.png", chaewon: "assets/blank-chaewon.png", sakura: "assets/blank-sakura.png", yunjin: "assets/blank-yunjin.png", kazuha: "assets/blank-kazuha.png", eunchae: "assets/blank-eunchae.png" }, 
        brand: "Sunnie Jae", price: "$25", size:"1pc" 
    },
    { 
        name: "AutoGraphics", 
        images: { ot5: "assets/autograph-member.png", chaewon: "assets/autograph-chaewon.png", sakura: "blank-sakura.png", yunjin: "blank-yunjin.png", kazuha: "assets/blank-kazuha.png", eunchae: "assets/blank-eunchae.png" }, 
        brand: "Redbubble", price: "$1.79+", size:"1pc",
        url: { ot5:"https://www.redbubble.com/ot5-autograph", chaewon:"https://www.redbubble.com/chaewon-autograph", sakura:"https://www.redbubble.com/sakura-autograph", yunjin:"https://www.redbubble.com/yunjin-autograph", kazuha:"https://www.redbubble.com/kazuha-autograph", eunchae:"https://www.redbubble.com/eunchae-autograph" }
    }
];

// ===== QUIZ DATA =====
const quizQuestions = [
    { question: "Favorite Color", answers: [ 
        {text: "White", members:["chaewon"]}, 
        {text:"Pink", members:["sakura"]}, 
        {text:"Blue", members:["kazuha"]}, 
        {text:"Green", members:["yunjin"]}, 
        {text:"Red", members:["eunchae"]} 
    ] },
    { question: "Are you an introvert or an extrovert?", answers: [ 
        {text:"Introvert", members:["sakura","eunchae","kazuha"]}, 
        {text:"Extrovert", members:["yunjin","chaewon"]} 
    ] },
    { question: "Down to Earth vs Head in the Clouds", answers: [ 
        {text:"Down to Earth", members:["chaewon","eunchae"]}, 
        {text:"Head in the Clouds", members:["sakura","yunjin","kazuha"]} 
    ] },
    { question: "Head vs Heart", answers: [ 
        {text:"Head", members:["sakura","eunchae","chaewon"]}, 
        {text:"Heart", members:["kazuha","yunjin"]} 
    ] },
    { question: "Order vs Chaos", answers: [ 
        {text:"Order", members:["yunjin","kazuha","eunchae"]}, 
        {text:"Chaos", members:["chaewon","sakura"]} 
    ] },
    { question: "Favorite Animal", answers: [ 
        {text:"Cheetah", members:["chaewon"]}, 
        {text:"Cat", members:["sakura"]}, 
        {text:"Swan", members:["kazuha"]}, 
        {text:"Baby Chick", members:["eunchae"]}, 
        {text:"Snake", members:["yunjin"]} 
    ] },
    { question: "Favorite English Name", answers: [ 
        {text:"Anna", members:["chaewon"]}, 
        {text:"Sebastian", members:["sakura"]}, 
        {text:"Jennifer", members:["yunjin"]}, 
        {text:"Ava", members:["sakura"]}, 
        {text:"Elle", members:["kazuha"]}, 
        {text:"Ruby", members:["eunchae"]} 
    ] },
    { question: "Favorite English Idiom", answers: [ 
        {text:"Have a good one!", members:["sakura"]}, 
        {text:"Easy peasy lemon squeezy", members:["chaewon"]}, 
        {text:"It girl energy", members:["yunjin"]}, 
        {text:"She ate with no crumbs", members:["eunchae"]}, 
        {text:"Freeze to death", members:["kazuha"]} 
    ] },
    { question: "Dark Chocolate or Milk Chocolate?", answers: [ 
        {text:"Dark", members:["sakura","kazuha","chaewon","yunjin"]}, 
        {text:"Milk", members:["eunchae"]} 
    ] },
    { question: "Another group you like", answers: [ 
        {text:"Red Velvet", members:["sakura"]}, 
        {text:"BTS", members:["yunjin"]}, 
        {text:"BlackPink", members:["kazuha"]}, 
        {text:"Seventeen", members:["eunchae"]}, 
        {text:"Girl's Generation", members:["chaewon"]}, 
        {text:"iz*One", members:["sakura","chaewon"]} 
    ] },
    { question: "Can you handle spicy food?", answers: [ 
        {text:"Yes", members:["chaewon","yunjin"]}, 
        {text:"No", members:["sakura","kazuha"]}, 
        {text:"Depends on the day", members:["eunchae"]} 
    ] },
    { question: "Favorite LE SSERAFIM era", answers: [ 
        {text:"Unforgiven", members:["yunjin"]}, 
        {text:"Crazy", members:["eunchae"]}, 
        {text:"Spaghetti", members:["sakura","chaewon","eunchae","kazuha","yunjin"]}, 
        {text:"Hot", members:["sakura"]}, 
        {text:"Easy", members:["chaewon"]}, 
        {text:"Come Over", members:["kazuha"]} 
    ] }
];

// ===== STATE =====
let currentBias = "ot5";
let wishlist = {};
let currentQuestionIndex = 0;
let quizScore = {};

// ===== SET BIAS =====
function setBias(member) {
    currentBias = member;

    const profileImg = document.querySelector("#profile-pic img");
    profileImg.src = `/assets/profile-${member}.png`;

    const displayName = member === "ot5" ? "OT5" : members[member].display;
    const subtitle = member === "ot5" ? "Fearnot" : members[member].subtitle;

    document.querySelector(".profile-info h1").innerHTML = `${displayName} <span class="verified-badge">${subtitle}</span>`;

    if (member !== "ot5") {
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
        const imgSrc = prod.images[currentBias] || prod.images.ot5;
        const card = document.createElement("div");
        card.className = "product-card";

        let buttonHTML = "";
        if(prod.brand === "Redbubble") {
            const url = prod.url?.[currentBias] || prod.url?.ot5 || "#";
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
    const memberKey = currentBias === "ot5" ? "OT5" : members[currentBias].display;
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

    if (topMembers.length === 0) topMembers = ["ot5"];

    const topMember = topMembers[Math.floor(Math.random() * topMembers.length)];

    const displayName = topMember === "ot5" ? "OT5" : members[topMember].display;
    const subtitle = topMember === "ot5" ? "Fearnot" : members[topMember].subtitle;

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
