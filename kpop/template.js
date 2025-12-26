/* =========================
   LOCAL STORAGE
   ========================= */
const STORAGE = {
  bias: "sunnie_bias",
  quiz: "sunnie_quiz_result"
};

let quizIndex = 0;
let quizScore = {};
let currentBias = "member1";

/* =========================
   MEMBERS & PRODUCTS
   ========================= */
const members = ["member1","member2","member3","member4","member5"];

const products = [
  { name:"Sticker Set", image:"assets/sticker.png", url:"https://www.redbubble.com/", price:"$2.50" },
  { name:"Lightstick Keychain", image:"assets/keychain.png", url:"https://www.redbubble.com/", price:"$12.00" },
  { name:"Phone Case", image:"assets/phonecase.png", url:"https://www.redbubble.com/", price:"$25.00" }
];

/* =========================
   NAV
   ========================= */
function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("active");
}

/* =========================
   QUIZ DATA
   ========================= */
const quizQuestions = [
  { question:"Favorite Color?", answers:[
    {text:"White", members:["member1"]}, {text:"Pink", members:["member2"]}, {text:"Blue", members:["member3"]},
    {text:"Green", members:["member4"]}, {text:"Red", members:["member5"]}
  ]},
  { question:"Introvert or Extrovert?", answers:[
    {text:"Introvert", members:["member1","member3"]}, {text:"Extrovert", members:["member2","member4"]}
  ]},
  { question:"Lead with Head or Heart?", answers:[
    {text:"Head", members:["member1","member5"]}, {text:"Heart", members:["member2","member3","member4"]}
  ]},
  { question:"Favorite Animal?", answers:[
    {text:"Cheetah", members:["member1"]},{text:"Cat", members:["member2"]},{text:"Swan", members:["member3"]},
    {text:"Baby Chick", members:["member4"]},{text:"Snake", members:["member5"]}
  ]},
  { question:"Chocolate Preference?", answers:[
    {text:"Dark", members:["member1","member2","member3"]},{text:"Milk", members:["member4","member5"]}
  ]}
];

/* =========================
   QUIZ MODAL
   ========================= */
function openQuiz() {
  quizIndex=0; quizScore={};
  document.getElementById("quizModal").classList.add("active");
  renderQuestion();
}

function closeQuiz() {
  document.getElementById("quizModal").classList.remove("active");
}

function renderQuestion() {
  const q = quizQuestions[quizIndex];
  const container = document.getElementById("quiz-questions");
  container.innerHTML = `<p>${q.question}</p>`;
  q.answers.forEach(a=>{
    const btn=document.createElement("button");
    btn.textContent=a.text;
    btn.onclick=()=>answer(a.members);
    container.appendChild(btn);
  });
}

function answer(members) {
  members.forEach(m=>quizScore[m]=(quizScore[m]||0)+1);
  quizIndex++;
  quizIndex<quizQuestions.length? renderQuestion(): finishQuiz();
}

function finishQuiz() {
  const result = Object.keys(quizScore).sort((a,b)=>quizScore[b]-quizScore[a])[0] || "member1";
  currentBias = result;
  localStorage.setItem(STORAGE.quiz,result);
  closeQuiz();
  setBias(result);
}

/* =========================
   HOW TO MODAL
   ========================= */
function openHowTo() { document.getElementById("howToModal").classList.add("active"); }
function closeHowTo() { document.getElementById("howToModal").classList.remove("active"); }

/* =========================
   SET BIAS & RENDER PRODUCTS
   ========================= */
function setBias(memberKey) {
  currentBias = memberKey;
  const profilePic=document.getElementById("profilePic");
  const profileName=document.getElementById("profileName");
  const profileSubtitle=document.getElementById("profileSubtitle");

  profilePic.src=`assets/profile-${memberKey}.png`;
  profileName.textContent=memberKey.toUpperCase();
  profileSubtitle.textContent="Fandom";

  renderProducts();
}

/* =========================
   RENDER PRODUCTS GRID
   ========================= */
function renderProducts() {
  const container=document.getElementById("products");
  container.innerHTML="";
  products.forEach(p=>{
    const card=document.createElement("div");
    card.className="card";
    card.innerHTML=`
      <img src="${p.image}" alt="${p.name}">
      <h4>${p.name}</h4>
      <p>${p.price}</p>
      <a href="${p.url}" target="_blank"><button>Buy</button></a>
    `;
    container.appendChild(card);
  });
}

/* =========================
   AUTO LOAD QUIZ RESULT
   ========================= */
window.addEventListener("DOMContentLoaded",()=>{
  const saved=localStorage.getItem(STORAGE.quiz);
  if(saved) setBias(saved);
  else renderProducts();
});
