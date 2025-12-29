// =========================
// MEMBER DATA
// =========================
const MEMBERS = {
  SUMIN: {
    name: "SUMIN",
    type: "ENTP",
    palette: {
      primary: "#f5f0ff",
      secondary: "#2b1d4f",
      light: "#7a5cff",
      dark: "#9a1dff",
      accent: "#b00b13"
    },
    heroImage: "kpop/assets/hero-SUMIN.jpg",
    resultImage: "kpop/assets/result-SUMIN.jpg",
    description: "Bold, fast-thinking, and magnetic. You thrive on ideas and chaos."
  },

  SIEUN: {
    name: "SIEUN",
    type: "ISFJ",
    palette: {
      primary: "#fff6ec",
      secondary: "#4a2c1d",
      light: "#ffb26b",
      dark: "#c97a3d",
      accent: "#e63946"
    },
    heroImage: "kpop/assets/hero-SIEUN.jpg",
    resultImage: "kpop/assets/result-SIEUN.jpg",
    description: "Warm, loyal, and deeply caring. You’re the heart of every group."
  },

  ISA: {
    name: "ISA",
    type: "ESFJ",
    palette: {
      primary: "#ecfdf3",
      secondary: "#065f46",
      light: "#34d399",
      dark: "#047857",
      accent: "#2563eb"
    },
    heroImage: "kpop/assets/hero-ISA.jpg",
    resultImage: "kpop/assets/result-ISA.jpg",
    description: "Social, grounding, and dependable. Everyone feels safe with you."
  }
};

// =========================
// PRODUCTS
// =========================
const PRODUCTS = [
  {
    id: "keychain",
    name: "Lightstick Keychain",
    category: "Exclusive",
    image: "keychain",
    wishlist: true
  },
  {
    id: "phonecase",
    name: "Planet Phone Case",
    category: "Exclusive",
    image: "phonecase",
    wishlist: true
  },
  {
    id: "stickers",
    name: "Sticker Pack",
    category: "Vendor",
    image: "stickers",
    vendors: [
      {
        label: "Purchase via Redbubble",
        url: "https://www.redbubble.com"
      }
    ]
  }
];

// =========================
// QUIZ DATA (10 QUESTIONS)
// =========================
const QUIZ = [
  { letter: "E", question: "You gain energy by:", answers: ["Being around people", "Being alone"] },
  { letter: "N", question: "You trust more:", answers: ["Ideas & patterns", "Concrete facts"] },
  { letter: "T", question: "You decide using:", answers: ["Logic", "Feelings"] },
  { letter: "P", question: "You prefer:", answers: ["Flexibility", "Structure"] },

  { vibe: true, question: "Favorite color?", map: { A: "SUMIN", B: "SIEUN", C: "ISA" }, answers: ["Purple", "Orange", "Blue"] },
  { vibe: true, question: "Favorite animal?", map: { A: "SUMIN", B: "SIEUN", C: "ISA" }, answers: ["Cheetah", "Cat", "Dog"] },
  { vibe: true, question: "Ideal weekend?", map: { A: "SUMIN", B: "SIEUN", C: "ISA" }, answers: ["Exploring", "Resting", "Socializing"] },
  { vibe: true, question: "Your role in a group?", map: { A: "SUMIN", B: "SIEUN", C: "ISA" }, answers: ["Idea starter", "Support", "Leader"] },
  { vibe: true, question: "Music vibe?", map: { A: "SUMIN", B: "SIEUN", C: "ISA" }, answers: ["Hyperpop", "Soft pop", "Anthemic"] },
  { vibe: true, question: "Fashion style?", map: { A: "SUMIN", B: "SIEUN", C: "ISA" }, answers: ["Experimental", "Cozy", "Clean"] }
];

// =========================
// STATE
// =========================
let currentBias = localStorage.getItem("bias") || Object.keys(MEMBERS)[0];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let quizAnswers = [];
let quizIndex = 0;

// =========================
// INIT
// =========================
document.addEventListener("DOMContentLoaded", () => {
  initMemberSelector();
  applyTheme(currentBias);
  updateHero();
  renderProducts();
  restoreQuizResult();
});

// =========================
// THEME
// =========================
function applyTheme(key) {
  const p = MEMBERS[key].palette;
  const r = document.documentElement;
  Object.entries(p).forEach(([k, v]) => {
    r.style.setProperty(`--${k}`, v);
  });
}

// =========================
// MEMBER SELECTOR
// =========================
function initMemberSelector() {
  const box = document.getElementById("memberSelector");
  if (!box) return;

  box.innerHTML = "";
  Object.keys(MEMBERS).forEach(k => {
    const btn = document.createElement("button");
    btn.textContent = MEMBERS[k].name;
    btn.className = k === currentBias ? "member-btn active" : "member-btn";
    btn.onclick = () => {
      currentBias = k;
      localStorage.setItem("bias", k);
      applyTheme(k);
      updateHero();
      renderProducts();
      initMemberSelector();
    };
    box.appendChild(btn);
  });
}

// =========================
// HERO IMAGE (WITH FALLBACK)
// =========================
function updateHero() {
  const img = document.getElementById("heroImg");
  if (!img) return;

  img.src = MEMBERS[currentBias].heroImage;
  img.onerror = () => {
    img.src = `/kpop/assets/blank-${currentBias}.png`;
  };
}

// =========================
// PRODUCTS (WITH FALLBACK)
// =========================
function renderProducts() {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  grid.innerHTML = "";

  PRODUCTS.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";

    const title = `${p.name}${p.wishlist ? ` – ${currentBias} ver.` : ""}`;
    card.innerHTML = `<h3>${title}</h3>`;

    const img = document.createElement("img");
    img.src = `kpop/assets/${p.image}-${currentBias}.png`;
    img.onerror = () => {
      img.src = `/kpop/assets/blank-${currentBias}.png`;
    };
    card.appendChild(img);

    if (p.wishlist) {
      card.innerHTML += `
        <input type="number" min="1" value="1" id="qty-${p.id}">
        <button class="product-btn" onclick="addToWishlist('${p.id}')">
          Add to Wishlist
        </button>
      `;
    } else {
      p.vendors.forEach(v => {
        card.innerHTML += `
          <a class="product-btn" href="${v.url}" target="_blank" rel="noopener">
            ${v.label}
          </a>
        `;
      });
    }

    grid.appendChild(card);
  });
}

// =========================
// WISHLIST
// =========================
function addToWishlist(id) {
  const qty = Number(document.getElementById(`qty-${id}`).value || 1);
  wishlist.push({ id, member: currentBias, qty });
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

// =========================
// QUIZ FLOW
// =========================
function startQuiz() {
  quizIndex = 0;
  quizAnswers = [];
  showQuestion();
}

function showQuestion() {
  const q = QUIZ[quizIndex];
  document.getElementById("quizQuestion").textContent = q.question;

  const box = document.getElementById("quizAnswers");
  box.innerHTML = "";

  q.answers.forEach((a, i) => {
    const btn = document.createElement("button");
    btn.textContent = a;
    btn.onclick = () => answerQuiz(i);
    box.appendChild(btn);
  });
}

function answerQuiz(choice) {
  quizAnswers.push({ ...QUIZ[quizIndex], choice });
  quizIndex++;
  quizIndex < QUIZ.length ? showQuestion() : finishQuiz();
}

// =========================
// QUIZ SCORING
// =========================
function finishQuiz() {
  const scores = {};
  Object.keys(MEMBERS).forEach(k => scores[k] = 0);

  const mbti = quizAnswers
    .filter(q => q.letter)
    .map(q => q.choice === 0 ? q.letter : opposite(q.letter))
    .join("");

  Object.entries(MEMBERS).forEach(([k, m]) => {
    let match = 0;
    for (let i = 0; i < 4; i++) {
      if (m.type[i] === mbti[i]) match++;
    }
    scores[k] += match * 5;
  });

  quizAnswers.filter(q => q.vibe).forEach(q => {
    const member = q.map[String.fromCharCode(65 + q.choice)];
    scores[member] += 3;
  });

  const results = Object.entries(scores)
    .map(([k, v]) => ({ key: k, score: v }))
    .sort((a, b) => b.score - a.score);

  const top = results[0];
  const percent = Math.round((top.score / (QUIZ.length * 5)) * 100);

  localStorage.setItem("quiz-result", JSON.stringify({ top, percent }));
  applyQuizResult(top.key, percent);
}

// =========================
// APPLY QUIZ RESULT
// =========================
function applyQuizResult(key, percent) {
  currentBias = key;
  localStorage.setItem("bias", key);

  applyTheme(key);
  updateHero();
  initMemberSelector();
  renderProducts();

  const img = document.getElementById("resultImage");
  if (img) {
    img.src = MEMBERS[key].resultImage;
    img.onerror = () => {
      img.src = `kpop/assets/blank-${key}.png`;
    };
  }

  const nameEl = document.getElementById("resultMemberName");
  const descEl = document.getElementById("resultDescription");

  if (nameEl) nameEl.textContent = MEMBERS[key].name;
  if (descEl) descEl.textContent = `${percent}% match — ${MEMBERS[key].description}`;
}

// =========================
// RESTORE SAVED RESULT
// =========================
function restoreQuizResult() {
  const saved = JSON.parse(localStorage.getItem("quiz-result"));
  if (saved) applyQuizResult(saved.top.key, saved.percent);
}

// =========================
// HELPERS
// =========================
function opposite(l) {
  return { E: "I", I: "E", N: "S", S: "N", T: "F", F: "T", P: "J", J: "P" }[l];
}
