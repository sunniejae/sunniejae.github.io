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
            ot5: "hangul.png",
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
            ot5: "blank.png",
            chaewon: "blank-chaewon.png",
            sakura: "blank-sakura.png",
            yunjin: "blank-yunjin.png",
            kazuha: "blank-kazuha.png",
            eunchae: "blank-eunchae.png"
        },
        brand: "Redbubble", price: "$1.79+", size:"Multi" 
    },
 { 
        name: "AutoGraphics", 
        images: {
            ot5: "autograph.png",
            chaewon: "autograph-chaewon.png",
            sakura: "autograph-sakura.png",
            yunjin: "autograph-yunjin.png",
            kazuha: "autograph-kazuha.png",
            eunchae: "autograph-eunchae.png"
        },
        brand: "SunnieJae", price: "$8", size:"1pc" 
    },
    { 
        name: "Blank", 
        images: {
            ot5: "blank.png",
            chaewon: "blank-chaewon.png",
            sakura: "blank-sakura.png",
            yunjin: "blank-yunjin.png",
            kazuha: "blank-kazuha.png",
            eunchae: "blank-eunchae.png"
        },
     brand: "SunnieJae", price: "$8", size:"1pc" 
    },
   { 
        name: "Lightstick Keychains", 
        images: {
            ot5: "blank.png",
            chaewon: "blank-chaewon.png",
            sakura: "blank-sakura.png",
            yunjin: "blank-yunjin.png",
            kazuha: "blank-kazuha.png",
            eunchae: "blank-eunchae.png"
        },
     brand: "SunnieJae", price: "$8", size:"1pc" 
    },
       { 
        name: "Phone Case", 
        images: {
            ot5: "blank.png",
            chaewon: "blank-chaewon.png",
            sakura: "blank-sakura.png",
            yunjin: "blank-yunjin.png",
            kazuha: "blank-kazuha.png",
            eunchae: "blank-eunchae.png"
        },
     brand: "SunnieJae", price: "$15", size:"1pc" 
    },
];


// ===== QUIZ DATA =====
const quizQuestions = [
    {
        question: "Favorite Color",
        answers: [
            { text: "White", members: ["chaewon"] },
            { text: "Pink", members: ["sakura"] },
            { text: "Blue", members: ["kazuha"] },
            { text: "Green", members: ["yunjin"] },
            { text: "Red", members: ["eunchae"] }
        ]
    },
    {
        question: "Introvert or Extrovert?",
        answers: [
            { text: "Introvert", members: ["sakura","eunchae","kazuha"] },
            { text: "Extrovert", members: ["yunjin","chaewon"] }
        ]
    },
    {
        question: "Favorite Animal",
        answers: [
            { text: "Cheetah", members: ["chaewon"] },
            { text: "Cat", members: ["sakura"] },
            { text: "Swan", members: ["kazuha"] },
            { text: "Baby Chick", members: ["eunchae"] },
            { text: "Snake", members: ["yunjin"] }
        ]
    }
];

let currentBias = "ot5";
let wishlist = [];
let currentQuestionIndex = 0;
let quizScore = {};

// ===== SET BIAS =====
function setBias(member) {
    currentBias = member;

    // Profile Pic
    const profileImg = document.querySelector("#profile-pic img");
    profileImg.src = `/assets/profile-${member}.png`;

    // Profile Info
    document.querySelector(".profile-info h1").innerHTML = `${members[member].display} <span class="verified-badge">${members[member].subtitle}</span>`;

    // Theme colors
    document.documentElement.style.setProperty('--current-bg', members[member].color);
    document.documentElement.style.setProperty('--current-accent', members[member].accent);

    // Highlight active bias button
    document.querySelectorAll(".bias-btn").forEach(btn => {
        btn.classList.toggle("active", btn.textContent.includes(members[member].display));
    });
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
    // Include member/bias in wishlist name
    const memberVersion = currentBias === "ot5" ? "OT5" : members[currentBias].display;
    const entry = `${item} (${memberVersion})`;

    if (!wishlist.includes(entry)) wishlist.push(entry);
    document.getElementById("wishlist-items").value = wishlist.join("\n");
}


function submitWishlist() {
    alert(`Wishlist submitted!\n\nName: ${document.getElementById("wishlist-name").value}\nEmail: ${document.getElementById("wishlist-email").value}\nItems:\n${wishlist.join("\n")}`);
    wishlist = [];
    document.getElementById("wishlist-items").value = "";
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
    // Increment score for each member selected
    membersArray.forEach(m => {
        quizScore[m] = (quizScore[m] || 0) + 1;
    });

    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
        renderCurrentQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    // Find member with highest score
    let maxScore = 0;
    let topMember = currentBias;

    for (const m in quizScore) {
        if (quizScore[m] > maxScore) {
            maxScore = quizScore[m];
            topMember = m;
        }
    }

    // Update Result Modal
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
window.onload = () => {
    setBias(currentBias);
    renderProducts();
};
