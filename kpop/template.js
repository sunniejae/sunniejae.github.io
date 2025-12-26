/* =========================
   LOCAL STORAGE
   ========================= */
const STORAGE = {
  bias: "sunnie_bias",
  quiz: "sunnie_quiz_result"
};

let quizIndex = 0;
let quizScore = {};

/* =========================
   QUIZ DATA
   ========================= */
const quizQuestions = [
  {
    question: "Your energy is more…",
    answers: [
      { text: "Soft & calm", members:["a"] },
      { text: "Bold & loud", members:["b"] }
    ]
  },
  {
    question: "You lead with…",
    answers: [
      { text: "Emotion", members:["a"] },
      { text: "Confidence", members:["b"] }
    ]
  }
];

/* =========================
   NAV
   ========================= */
function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("active");
}

/* =========================
   QUIZ MODAL
   ========================= */
function openQuiz() {
  quizIndex = 0;
  quizScore = {};
  document.getElementById("quizModal").classList.add("active");
  renderQuestion();
}

function closeQuiz() {
  document.getElementById("quizModal").classList.remove("active");
}

/* =========================
   QUIZ FLOW
   ========================= */
function renderQuestion() {
  const q = quizQuestions[quizIndex];
  const container = document.getElementById("quiz-questions");
  container.innerHTML = `<p>${q.question}</p>`;

  q.answers.forEach(a => {
    const btn = document.createElement("button");
    btn.textContent = a.text;
    btn.onclick = () => answer(a.members);
    container.appendChild(btn);
  });
}

function answer(members) {
  members.forEach(m => quizScore[m] = (quizScore[m] || 0) + 1);
  quizIndex++;

  quizIndex < quizQuestions.length ? renderQuestion() : finishQuiz();
}

function finishQuiz() {
  const result = Object.keys(quizScore).sort((a,b)=>quizScore[b]-quizScore[a])[0] || "ot";
  localStorage.setItem(STORAGE.quiz, result);
  closeQuiz();
}

/* =========================
   HOW TO MODAL
   ========================= */
function openHowTo() {
  document.getElementById("howToModal").classList.add("active");
}

function closeHowTo() {
  document.getElementById("howToModal").classList.remove("active");
}
