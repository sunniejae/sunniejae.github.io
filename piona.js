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
  {question:"Favorite color?",answers:[
    {text:"Pink",members:["sakura"]},
    {text:"White",members:["chaewon"]},
    {text:"Green",members:["yunjin"]}
  ]},
  {question:"Introvert or extrovert?",answers:[
    {text:"Introvert",members:["kazuha","sakura"]},
    {text:"Extrovert",members:["yunjin","chaewon"]}
  ]}
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
