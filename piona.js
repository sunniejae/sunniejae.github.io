const members = {
  ot5:{display:"OT5",color:"var(--primary)",accent:"var(--dark-purple)"},
  chaewon:{display:"Chaewon",color:"var(--chaewon)",accent:"var(--chaewon-dark)"},
  sakura:{display:"Sakura",color:"var(--sakura)",accent:"var(--sakura-dark)"},
  yunjin:{display:"Yunjin",color:"var(--yunjin)",accent:"var(--yunjin-dark)"},
  kazuha:{display:"Kazuha",color:"var(--kazuha)",accent:"var(--kazuha-dark)"},
  eunchae:{display:"Eunchae",color:"var(--eunchae)",accent:"var(--eunchae-dark)"}
};

const products = [
  {name:"Hangul Names",brand:"Redbubble",link:"https://redbubble.com"},
  {name:"Lightstick Keychain",brand:"Sunnie Jae"}
];

const quizQuestions = [
  {
    question: "Favorite Color?",
    answers: [
      { text: "White", members: ["chaewon"] },
      { text: "Pink", members: ["sakura"] },
      { text: "Blue", members: ["kazuha"] },
      { text: "Green", members: ["yunjin"] },
      { text: "Red", members: ["eunchae"] }
    ]
  },
  {
    question: "MBTI – Introvert or Extrovert?",
    answers: [
      { text: "Introvert", members: ["sakura","eunchae","kazuha"] },
      { text: "Extrovert", members: ["yunjin","chaewon"] }
    ]
  },
  {
    question: "MBTI – Down to Earth or Head in the Clouds?",
    answers: [
      { text: "Down to Earth", members: ["chaewon","eunchae"] },
      { text: "Head in the Clouds", members: ["sakura","yunjin","kazuha"] }
    ]
  },
  {
    question: "MBTI – Head or Heart?",
    answers: [
      { text: "Head", members: ["sakura","eunchae","chaewon"] },
      { text: "Heart", members: ["kazuha","yunjin"] }
    ]
  },
  {
    question: "MBTI – Order or Chaos?",
    answers: [
      { text: "Order", members: ["yunjin","kazuha","eunchae"] },
      { text: "Chaos", members: ["chaewon","sakura"] }
    ]
  },
  {
    question: "Favorite Animal?",
    answers: [
      { text: "Cheetah", members: ["chaewon"] },
      { text: "Cat", members: ["sakura"] },
      { text: "Swan", members: ["kazuha"] },
      { text: "Baby Chick", members: ["eunchae"] },
      { text: "Snake", members: ["yunjin"] }
    ]
  },
  {
    question: "Favorite English Name?",
    answers: [
      { text: "Anna", members: ["chaewon"] },
      { text: "Sebastian", members: ["sakura"] },
      { text: "Jennifer", members: ["yunjin"] },
      { text: "Elle", members: ["kazuha"] },
      { text: "Ruby", members: ["eunchae"] }
    ]
  },
  {
    question: "Favorite Idiom?",
    answers: [
      { text: "Easy peasy lemon squeezy", members: ["chaewon"] },
      { text: "It girl energy", members: ["yunjin"] },
      { text: "She ate with no crumbs", members: ["eunchae"] },
      { text: "Freeze to death", members: ["kazuha"] }
    ]
  },
  {
    question: "Dark or Milk Chocolate?",
    answers: [
      { text: "Dark", members: ["sakura","kazuha","chaewon","yunjin"] },
      { text: "Milk", members: ["eunchae"] }
    ]
  },
  {
    question: "Another group you like?",
    answers: [
      { text: "Red Velvet", members: ["sakura"] },
      { text: "BTS", members: ["yunjin"] },
      { text: "BLACKPINK", members: ["kazuha"] },
      { text: "SEVENTEEN", members: ["eunchae"] },
      { text: "Girls’ Generation", members: ["chaewon"] },
      { text: "IZ*ONE", members: ["sakura","chaewon"] }
    ]
  },
  {
    question: "Can you handle spicy food?",
    answers: [
      { text: "Yes", members: ["chaewon","yunjin"] },
      { text: "No", members: ["sakura","kazuha"] },
      { text: "Depends", members: ["eunchae"] }
    ]
  },
  {
    question: "Favorite LE SSERAFIM era?",
    answers: [
      { text: "Unforgiven", members: ["yunjin"] },
      { text: "Crazy", members: ["eunchae"] },
      { text: "Spaghetti", members: ["chaewon","sakura","yunjin","kazuha","eunchae"] },
      { text: "Hot", members: ["sakura"] },
      { text: "Easy", members: ["chaewon"] },
      { text: "Come Over", members: ["kazuha"] }
    ]
  }
];


let currentBias="ot5";
let wishlist=[];
let qIndex=0;
let score={};

function setBias(m){
  currentBias=m;
  document.documentElement.style.setProperty("--current-bg",members[m].color);
  document.documentElement.style.setProperty("--current-accent",members[m].accent);
  renderProducts();
}

function renderProducts(){
  const grid=document.getElementById("products-grid");
  grid.innerHTML="";
  products.forEach(p=>{
    const card=document.createElement("div");
    card.className="product-card";
    card.innerHTML=`
      <strong>${p.name}</strong>
      ${
        p.brand==="Redbubble"
        ? `<a class="product-btn redbubble-btn" href="${p.link}" target="_blank">Buy on Redbubble</a>`
        : `<button class="product-btn" onclick="addToWishlist('${p.name}')">Add to Wishlist</button>`
      }
    `;
    grid.appendChild(card);
  });
}

function addToWishlist(item){
  wishlist.push(item);
  document.getElementById("wishlist-items").value=wishlist.join("\n");
  const c=document.getElementById("bag-count");
  c.textContent=wishlist.length;
  c.style.display="inline";
}

function openQuiz(){
  score={}; qIndex=0;
  document.getElementById("quiz-modal").classList.add("active");
  renderQuestion();
}

function renderQuestion(){
  const q=quizQuestions[qIndex];
  document.getElementById("quiz-question").textContent=q.question;
  const a=document.getElementById("quiz-answers");
  a.innerHTML="";
  q.answers.forEach(ans=>{
    const b=document.createElement("button");
    b.textContent=ans.text;
    b.onclick=()=>{
      ans.members.forEach(m=>score[m]=(score[m]||0)+1);
      qIndex++;
      qIndex<quizQuestions.length ? renderQuestion() : showResult();
    };
    a.appendChild(b);
  });
}

function showResult(){
  let top=Object.keys(score).reduce((a,b)=>score[a]>score[b]?a:b);
  setBias(top);
  document.getElementById("quiz-modal").classList.remove("active");
  document.getElementById("result-name").textContent=`Your bias is ${members[top].display}!`;
  document.getElementById("result-modal").classList.add("active");
}

function closeResult(){
  document.getElementById("result-modal").classList.remove("active");
}

setBias(currentBias);
