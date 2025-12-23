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
        images: {
            ot5: "hangul-member.png",
            chaewon: "hangul-chaewon.png",
            sakura: "hangul-sakura.png",
            yunjin: "hangul-yunjin.png",
            kazuha: "hangul-kazuha.png",
            eunchae: "hangul-eunchae.png"
        },
        brand: "Redbubble", price: "$1.79+", size:"Multi" 
    },
    { 
        name: "Spaghetti Era Stickers", 
        images: {
            ot5: "spaghetti-member.png",
            chaewon: "spaghetti-chaewon.png",
            sakura: "spaghetti-sakura.png",
            yunjin: "spaghetti-yunjin.png",
            kazuha: "spaghetti-kazuha.png",
            eunchae: "spaghetti-eunchae.png"
        },
        brand: "Redbubble", price: "$1.79+", size:"Multi" 
    },
    { 
        name: "Lightstick Keychains", 
        images: {
            ot5: "lightstick-member.png",
            chaewon: "lightstick-chaewon.png",
            sakura: "lightstick-sakura.png",
            yunjin: "lightstick-yunjin.png",
            kazuha: "lightstick-kazuha.png",
            eunchae: "lightstick-eunchae.png"
        },
        brand: "Sunnie Jae", price: "$15", size:"1pc" 
    },
    { 
        name: "Phone Case", 
        images: {
            ot5: "phonecase-member.png",
            chaewon: "phonecase-chaewon.png",
            sakura: "phonecase-sakura.png",
            yunjin: "phonecase-yunjin.png",
            kazuha: "phonecase-kazuha.png",
            eunchae: "phonecase-eunchae.png"
        },
        brand: "Sunnie Jae", price: "$25", size:"1pc" 
    },
    { 
        name: "AutoGraphics", 
        images: {
            ot5: "autograph-member.png",
            chaewon: "autograph-chaewon.png",
            sakura: "autograph-sakura.png",
            yunjin: "autograph-yunjin.png",
            kazuha: "autograph-kazuha.png",
            eunchae: "autograph-eunchae.png"
        },
        brand: "Redbubble", price: "$1.79+", size:"1pc" 
    }
];

let currentBias = "ot5";
let wishlist = {};
let currentQuestionIndex = 0;
let quizScore = {};


// ===== QUIZ DATA =====
const quizQuestions = [
    { question: "Favorite Color", answers: [ {text: "White", members:["chaewon"]}, {text:"Pink", members:["sakura"]}, {text:"Blue", members:["kazuha"]}, {text:"Green", members:["yunjin"]}, {text:"Red", members:["eunchae"]} ] },
    { question: "MBTI Type - Are you an introvert or an extrovert?", answers: [ {text:"Introvert", members:["sakura","eunchae","kazuha"]}, {text:"Extrovert", members:["yunjin","chaewon"]} ] },
    { question: "MBTI Type - Down to Earth vs Head in the Clouds", answers: [ {text:"Down to Earth", members:["chaewon","eunchae"]}, {text:"Head in the Clouds", members:["sakura","yunjin","kazuha"]} ] },
    { question: "MBTI Type - Head vs Heart", answers: [ {text:"Head", members:["sakura","eunchae","chaewon"]}, {text:"Heart", members:["kazuha","yunjin"]} ] },
    { question: "MBTI Type - Order vs Chaos", answers: [ {text:"Order", members:["yunjin","kazuha","eunchae"]}, {text:"Chaos", members:["chaewon","sakura"]} ] },
    { question: "Favorite Animal", answers: [ {text:"Cheetah", members:["chaewon"]}, {text:"Cat", members:["sakura"]}, {text:"Swan", members:["kazuha"]}, {text:"Baby Chick", members:["eunchae"]}, {text:"Snake", members:["yunjin"]} ] },
    { question: "Favorite English Name", answers: [ {text:"Anna", members:["chaewon"]}, {text:"Sebastian", members:["sakura"]}, {text:"Jennifer", members:["yunjin"]}, {text:"Ava", members:["sakura"]}, {text:"Elle", members:["kazuha"]}, {text:"Ruby", members:["eunchae"]} ] },
    { question: "Favorite English Idiom", answers: [ {text:"Have a good one!", members:["sakura"]}, {text:"Easy peasy lemon squeezy", members:["chaewon"]}, {text:"It girl energy", members:["yunjin"]}, {text:"She ate with no crumbs", members:["eunchae"]}, {text:"Freeze to death", members:["kazuha"]} ] },
    { question: "Dark Chocolate or Milk Chocolate?", answers: [ {text:"Dark", members:["sakura","kazuha","chaewon","yunjin"]}, {text:"Milk", members:["eunchae"]} ] },
    { question: "Another group you like", answers: [ {text:"Red Velvet", members:["sakura"]}, {text:"BTS", members:["yunjin"]}, {text:"BlackPink", members:["kazuha"]}, {text:"Seventeen", members:["eunchae"]}, {text:"Girl's Generation", members:["chaewon"]}, {text:"iz*One", members:["sakura","chaewon"]} ] },
    { question: "Can you handle spicy food?", answers: [ {text:"Yes", members:["chaewon","yunjin"]}, {text:"No", members:["sakura","kazuha"]}, {text:"Depends on the day", members:["eunchae"]} ] },
    { question: "Favorite LE SSERAFIM era", answers: [ {text:"Unforgiven", members:["yunjin"]}, {text:"Crazy", members:["eunchae"]}, {text:"Spaghetti", members:["sakura","chaewon","eunchae","kazuha","yunjin"]}, {text:"Hot", members:["sakura"]}, {text:"Easy", members:["chaewon"]}, {text:"Come Over", members:["kazuha"]} ] }
];

let currentBias = "ot5";
let wishlist = {};
let currentQuestionIndex = 0;
let quizScore = {};

// ===== SET BIAS =====
function setBias(member) {
    currentBias = member;
    const profileImg = document.querySelector("#profile-pic img");
    profileImg.src = `/assets/profile-${member}.png`;

    document.querySelector(".profile-info h1").innerHTML = `${members[member].display} <span class="verified-badge">${members[member].subtitle}</span>`;
    document.documentElement.style.setProperty('--current-bg', members[member].color);
    document.documentElement.style.setProperty('--current-accent', members[member].accent);

    document.querySelectorAll(".bias-btn").forEach(btn => {
        btn.classList.toggle("active", btn.textContent.includes(members[member].display));
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
        card.innerHTML = `
            <div class="product-image">
                <img src="/assets/${imgSrc}" width="250" height="250" alt="${prod.name}">
            </div>
            <div class="product-info">
                <div class="product-brand">${prod.brand}</div>
                <div class="product-title">${prod.name}</div>
                <div class="product-size">${prod.size}</div>
                <div class="product-price">${prod.price}</div>
                <button class="wishlist-btn" onclick="addToWishlist('${prod.name}')">Add to Wishlist</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// ===== WISHLIST =====
function addToWishlist(item) {
    const memberVersion = currentBias === "ot5" ? "OT5" : members[currentBias].display;
    if (!wishlist[memberVersion]) wishlist[memberVersion] = [];
    if (!wishlist[memberVersion].includes(item)) wishlist[memberVersion].push(item);
    renderWishlist();
}

function renderWishlist() {
    const textarea = document.getElementById("wishlist-items");
    textarea.value = "";
    for (const member in wishlist) {
        textarea.value += `--- ${member} ---\n`;
        wishlist[member].forEach(item => textarea.value += `${item}\n`);
        textarea.value += "\n";
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

// ===== QUIZ LOGIC =====
function selectAnswer(membersArray) {
    membersArray.forEach(m => quizScore[m] = (quizScore[m] || 0) + 1);
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) renderCurrentQuestion();
    else showResult();
}

function showResult() {
    let maxScore = 0;
    let topMember = currentBias;
    for (const m in quizScore) if (quizScore[m] > maxScore) { maxScore = quizScore[m]; topMember = m; }

    document.getElementById("result-image").src = `/assets/profile-${topMember}.png`;
    document.getElementById("result-name").textContent = members[topMember].display;
    document.getElementById("result-description").textContent = `Mostly chose ${members[topMember].display}! You match best with them.`;
    document.getElementById("result-traits").innerHTML = `Fandom Subtitle: <span class="trait-tag">${members[topMember].subtitle}</span>`;

    document.getElementById("result-modal").classList.add("active");
    closeQuiz();
}

function closeResult() { document.getElementById("result-modal").classList.remove("active"); }

// ===== INITIALIZE =====
window.onload = () => { setBias(currentBias); renderProducts(); };
