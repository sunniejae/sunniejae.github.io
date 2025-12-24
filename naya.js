// ===== MEMBER DATA =====
const members = {
    mai: { display: "Mai", subtitle: "Maieumi", color: "var(--mai)", accent: "var(--mai-dark)" },
    ot6: { display: "OT6", subtitle: "NAYA", color: "var(--primary)", accent: "var(--dark-purple)" },
    jeemin: { display: "Jeemin", subtitle: "Jeely", color: "var(--jeemin)", accent: "var(--jeemin-dark)" },
    koko: { display: "Koko", subtitle: "Kkomet", color: "var(--koko)", accent: "var(--koko-dark)" },
    sarang: { display: "Sarang", subtitle: "Maeryu", color: "var(--sarang)", accent: "var(--sarang-dark)" },
    jungeun: { display: "Jungeun", subtitle: "Chiun", color: "var(--jungeun)", accent: "var(--jungeun-dark)" },
    saebi: { display: "Saebi", subtitle: "Saebbon", color: "var(--saebi)", accent: "var(--saebi-dark)" }
};

// ===== PRODUCT DATA =====
const products = [
    { 
        name: "Hangul Member Names", 
        images: { ot6: "assets/hangul-member.png", mai: "assets/blank-mai.png", jeemin: "assets/blank-jeemin.png", koko: "assets/blank-koko.png", sarang: "assets/blank-sarang.png", jungeun: "assets/blank-jungeun.png", saebi: "assets/blank-saebi.png" }, 
        brand: "Redbubble", price: "$1.79+", size:"Multi" 
    },
    { 
        name: "Mamma Mia Era Stickers", 
        images: { ot6: "assets/blank-mai.png", mai: "assets/blank-mai.png", jeemin: "assets/blank-jeemin.png", koko: "assets/blank-koko.png", sarang: "assets/blank-sarang.png", jungeun: "assets/blank-jungeun.png", saebi: "assets/blank-saebi.png" }, 
        brand: "Redbubble", price: "$1.79+", size:"Multi" 
    },
    { 
        name: "Lightstick Keychains", 
        images: { ot6: "assets/blank-member.png", mai: "assets/blank-mai.png", jeemin: "assets/blank-jeemin.png", koko: "assets/blank-koko.png", sarang: "assets/blank-sarang.png", jungeun: "assets/lightstick-jungeun.png", saebi: "assets/blank-saebi.png" }, 
        brand: "Sunnie Jae", price: "$15", size:"1pc" 
    },
    { 
        name: "Phone Case", 
        images: { ot6: "assets/phonecase-member.png", mai: "assets/blank-mai.png", jeemin: "assets/blank-jeemin.png", koko: "assets/blank-koko.png", sarang: "assets/blank-sarang.png", jungeun: "assets/blank-jungeun.png", saebi: "assets/blank-saebi.png" }, 
        brand: "Sunnie Jae", price: "$25", size:"1pc" 
    },
    { 
        name: "AutoGraphics", 
        images: { ot6: "assets/autograph-izna.png", mai: "assets/blank-mai.png", jeemin: "assets/blank-jeemin.png", koko: "assets/blank-koko.png", sarang: "assets/blank-sarang.png", jungeun: "assets/blank-jungeun.png", saebi: "assets/blank-saebi.png" }, 
        brand: "Redbubble", price: "$1.79+", size:"1pc" 
    }
];

// ===== QUIZ DATA =====
const quizQuestions = [
    { 
        question: "Favorite Color", 
        answers: [
            {text: "Red", members:["mai"]}, 
            {text:"Pink", members:["saebi"]}, 
            {text:"Blue", members:["jeemin"]}, 
            {text:"Green", members:["sarang"]}, 
            {text:"Purple", members:["jungeun"]}, 
            {text:"Pink", members:["saebi"]}
        ] 
    },
    { 
        question: "MBTI Type - Are you an introvert or an extrovert?", 
        answers: [ 
            {text:"Introvert", members:["mai", "jeemin", "sarang", "jungeun"]}, 
            {text:"Extrovert", members:["koko","saebi"]} 
        ] 
    },
    { 
        question: "MBTI Type - Down to Earth vs Head in the Clouds", 
        answers: [ 
            {text:"Down to Earth", members:["mai","koko","jungeun"]}, 
            {text:"Head in the Clouds", members:["jeemin","sarang","saebi"]} 
        ] 
    },
    { 
        question: "MBTI Type - Head vs Heart", 
        answers: [ 
            {text:"Head", members:["mai", "jungeun"]}, 
            {text:"Heart", members:["jeemin","koko","sarang","saebi"]} 
        ] 
    },
    { 
        question: "MBTI Type - Order vs Chaos", 
        answers: [ 
            {text:"Order", members:["koko","jungeun"]}, 
            {text:"Chaos", members:["mai","jeemin","sarang","saebi"]} 
        ] 
    },
    { 
        question: "Favorite Animal", 
        answers: [ 
            {text:"Cheetah", members:["jungeun"]}, 
            {text:"Cat", members:["koko"]}, 
            {text:"Dog", members:["sarang"]}, 
            {text:"Fox", members:["mai"]}, 
            {text:"Bunny", members:["saebi"]}, 
            {text:"Bear", members:["jeemin"]} 
        ] 
    },
    { 
        question: "Favorite IZNA era", 
        answers: [ 
            {text:"iland 2 n/a", members:["koko"]}, 
            {text:"IZNA debut", members:["jungeun"]}, 
            {text:"Sign", members:["jeemin","mai","jungeun","sarang","koko"]}, 
            {text:"Beep", members:["jeemin"]}, 
            {text:"Mamma Mia", members:["mai"]} 
        ] 
    }
];

// ===== STATE =====
let currentBias = "ot6";
let wishlist = {};
let currentQuestionIndex = 0;
let quizScore = {};

// ===== SET BIAS =====
function setBias(member) {
    if (!members[member] && member !== "ot6") return;

    currentBias = member;

    const profileImg = document.querySelector("#profile-pic img");
    profileImg.src = `/assets/profile-${member}.png`;

    const displayName = member === "ot6" ? "OT6" : members[member].display;
    const subtitle = member === "ot6" ? "NAYA" : members[member].subtitle;

    document.querySelector(".profile-info h1").innerHTML = `${displayName} <span class="verified-badge">${subtitle}</span>`;

    if (member !== "ot6") {
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
        const imgSrc = prod.images[currentBias] || prod.images.ot6;

        const card = document.createElement("div");
        card.className = "product-card";

        // Determine button
        let buttonHTML = "";
        if (prod.brand.toLowerCase() === "redbubble") {
            // Map Redbubble links (replace these with your actual URLs)
            const redbubbleLinks = {
                "Hangul Member Names": "https://www.redbubble.com/hangul-member",
                "Mamma Mia Era Stickers": "https://www.redbubble.com/mamma-mia-stickers",
                "AutoGraphics": "https://www.redbubble.com/autographics"
            };
            const link = redbubbleLinks[prod.name] || "#";
            buttonHTML = `<a class="wishlist-btn" href="${link}" target="_blank" rel="noopener">Shop Redbubble</a>`;
        } else {
            buttonHTML = `<button class="wishlist-btn" onclick="addToWishlist('${prod.name}')">Add to Wishlist</button>`;
        }

        card.innerHTML = `
            <div class="product-image">
                <img src="${imgSrc}" width="250" height="250" alt="${prod.name}">
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
    const memberKey = currentBias === "ot6" ? "ot6" : currentBias;
    if (!wishlist[memberKey]) wishlist[memberKey] = [];
    if (!wishlist[memberKey].includes(item)) wishlist[memberKey].push(item);
    renderWishlist();
}

function renderWishlist() {
    const textarea = document.getElementById("wishlist-items");
    textarea.value = "";
    let totalItems = 0;

    for (const member in wishlist) {
        const displayName = member === "ot6" ? "OT6" : members[member].display;
        textarea.value += `--- ${displayName} ---\n`;
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
        const displayName = member === "ot6" ? "OT6" : members[member].display;
        wishlistText += `--- ${displayName} ---\n`;
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
                showQuizResult();
            }
        };
        questionEl.appendChild(btn);
    });

    container.appendChild(questionEl);
}

function showQuizResult() {
    let maxScore = 0;
    for (const m in quizScore) if (quizScore[m] > maxScore) maxScore = quizScore[m];

    let topMembers = [];
    for (const m in quizScore) if (quizScore[m] === maxScore) topMembers.push(m);
    if (topMembers.length === 0) topMembers = ["ot6"];

    const topMember = topMembers[Math.floor(Math.random() * topMembers.length)];

    const displayName = topMember === "ot6" ? "OT6" : members[topMember].display;
    const subtitle = topMember === "ot6" ? "NAYA" : members[topMember].subtitle;

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
