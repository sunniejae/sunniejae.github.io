// ===== MEMBER DATA =====
const members = {
    mai: { display: "Mai", subtitle: "Maieumi", color: "var(--mai)", accent: "var(--mai-dark)" },
    ot6: { display: "ot6", subtitle: "NAYA", color: "var(--primary)", accent: "var(--dark-purple)" },
    jeemin: { display: "jeemin", subtitle: "Jeely", color: "var(--jeemin)", accent: "var(--jeemin-dark)" },
    koko: { display: "koko", subtitle: "Kkomet", color: "var(--koko)", accent: "var(--koko-dark)" },
    sarang: { display: "sarang", subtitle: "Maeryu", color: "var(--sarang)", accent: "var(--sarang-dark)" },
    jungeun: { display: "jungeun", subtitle: "Chiun", color: "var(--jungeun)", accent: "var(--jungeun-dark)" },
    saebi: { display: "saebi", subtitle: "Saebbon", color: "var(--saebi)", accent: "var(--saebi-dark)" }
};

// ===== PRODUCT DATA =====
const products = [
    { 
        name: "Hangul Member Names", 
        images: { ot6: "hangul-member.png", mai: "blank-mai.png", jeemin: "blank-jeemin.png", koko: "blank-koko.png", sarang: "blank-sarang.png", jungeun: "blank-jungeun.png" }, 
        brand: "Redbubble", price: "$1.79+", size:"Multi" 
    },
    { 
        name: "mamma mia Era Stickers", 
        images: { ot6: "blank-mai.png", mai: "blank-mai.png", jeemin: "blank-jeemin.png", koko: "blank-koko.png", sarang: "blank-sarang.png", jungeun: "blank-jungeun.png" }, 
        brand: "Redbubble", price: "$1.79+", size:"Multi" 
    },
    { 
        name: "Lightstick Keychains", 
        images: { ot6: "blank-member.png", mai: "blank-mai.png", jeemin: "blank-jeemin.png", koko: "blank-koko.png", sarang: "blank-sarang.png", jungeun: "lightstick-jungeun.png" }, 
        brand: "Sunnie Jae", price: "$15", size:"1pc" 
    },
    { 
        name: "Phone Case", 
        images: { ot6: "phonecase-member.png", mai: "blank-mai.png", jeemin: "blank-jeemin.png", koko: "blank-koko.png", sarang: "blank-sarang.png", jungeun: "blank-jungeun.png" }, 
        brand: "Sunnie Jae", price: "$25", size:"1pc" 
    },
    { 
        name: "AutoGraphics", 
        images: { ot6: "autograph-izna.png", mai: "blank-mai.png", jeemin: "blank-jeemin.png", koko: "blank-koko.png", sarang: "blank-sarang.png", jungeun: "blank-jungeun.png" }, 
        brand: "Redbubble", price: "$1.79+", size:"1pc" 
    }
];

// ===== QUIZ DATA =====
const quizQuestions = [
    { question: "Favorite Color", answers: [ {text: "Red", members:["mai"]}, {text:"Pink", members:["saebi"]}, {text:"Blue", members:["jeemin"]}, {text:"Green", members:["sarang"]}, {text:"purple", members:["jungeun"]} {text:"pink", members:["saebi"]}] },
    { question: "MBTI Type - Are you an introvert or an extrovert?", answers: [ {text:"Introvert", members:["mai", "jeemin", "sarang", "jungeun",]}, {text:"Extrovert", members:["koko","saebi"]} ] },
    { question: "MBTI Type - Down to Earth vs Head in the Clouds", answers: [ {text:"Down to Earth", members:["mai","koko","jungeun",]}, {text:"Head in the Clouds", members:["jeemin","sarang","saebi"]} ] },
    { question: "MBTI Type - Head vs Heart", answers: [ {text:"Head", members:["mai", "jungeun",]}, {text:"Heart", members:["jeemin","koko","sarang","saebi"]} ] },
    { question: "MBTI Type - Order vs Chaos", answers: [ {text:"Order", members:["koko","jungeun",]}, {text:"Chaos", members:["mai","jeemin","sarang","saebi"]} ] },
    { question: "Favorite Animal", answers: [ {text:"Cheetah", members:["jungeun"]}, {text:"Cat", members:["koko"]}, {text:"Dog", members:["sarang"]}, {text:"Fox", members:["mai"]}, {text:"Bunny", members:["saebi"]}{text:"bear", members:["jeemin"]} ] },
    { question: "Favorite IZNA era", answers: [ {text:"iland 2 n/a", members:["koko"]}, {text:"IZNA debut", members:["jungeun"]}, {text:"Sign", members:["jeemin","mai","jungeun","sarang","koko"]}, {text:"Beep", members:["jeemin"]}, {text:"Mamma Mia", members:["mai"]} }
];

// ===== STATE =====
let currentBias = "ot6";
let wishlist = {};
let currentQuestionIndex = 0;
let quizScore = {};

// ===== SET BIAS =====
function setBias(member) {
    if (!members[member]) return;

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
        const imgSrc = prod.images[currentBias] || prod.images.ot6;
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
    const memberVersion = currentBias === "ot6" ? "ot6" : members[currentBias].display;
    if (!wishlist[memberVersion]) wishlist[memberVersion] = [];
    if (!wishlist[memberVersion].includes(item)) wishlist[memberVersion].push(item);
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

    // Update top-right bag count
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
        btn.onclick = () => {
            ans.members.forEach(m => quizScore[m] = (quizScore[m] || 0) + 1);
            currentQuestionIndex++;
            if (currentQuestionIndex < quizQuestions.length) {
                renderCurrentQuestion();
            } else {
                showResult();
            }
        };
        questionEl.appendChild(btn);
    });

    container.appendChild(questionEl);
}

// ===== QUIZ LOGIC =====
function showResult() {
    let maxScore = 0;
    for (const m in quizScore) if (quizScore[m] > maxScore) maxScore = quizScore[m];

    let topMembers = [];
    for (const m in quizScore) if (quizScore[m] === maxScore) topMembers.push(m);
    if (topMembers.length === 0) topMembers = ["ot6"];

    const topMember = topMembers[Math.floor(Math.random() * topMembers.length)];

    document.getElementById("result-image").src = `/assets/profile-${topMember}.png`;
    document.getElementById("result-name").textContent = members[topMember].display;
    document.getElementById("result-description").textContent = `Mostly chose ${members[topMember].display}! You match best with them.`;
    document.getElementById("result-traits").innerHTML = `Fandom Subtitle: <span class="trait-tag">${members[topMember].subtitle}</span>`;

    document.getElementById("result-modal").classList.add("active");
    closeQuiz();
}

function closeResult() {
    document.getElementById("result-modal").classList.remove("active");
}

// ===== INITIALIZE =====
window.onload = () => { setBias(currentBias); };
