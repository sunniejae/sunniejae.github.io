/* MEMBERS WITH COLORS */
const members = {
  SUMIN: { display:"SUMIN", color:"var(--SUMIN-color)", accent:"var(--SUMIN-accent)" },
  SIEUN: { display:"SIEUN", color:"var(--SIEUN-color)", accent:"var(--SIEUN-accent)" },
  SEEUN: { display:"SEEUN", color:"var(--SEEUN-color)", accent:"var(--SEEUN-accent)" },
  ISA: { display:"ISA", color:"var(--ISA-color)", accent:"var(--ISA-accent)" },
  YOON: { display:"YOON", color:"var(--YOON-color)", accent:"var(--YOON-accent)" },
  J: { display:"J", color:"var(--J-color)", accent:"var(--J-accent)" }
};

let currentBias = localStorage.getItem("fandomBias") || "SUMIN";

/* PRODUCTS */
const products = [
  { name:"Sticker Set", images:{ SUMIN:"assets/sticker-SUMIN.png", SIEUN:"assets/sticker-SIEUN.png", SEEUN:"assets/sticker-SEEUN.png", ISA:"assets/sticker-ISA.png", YOON:"assets/sticker-YOON.png" }, url:{ SUMIN:"#", SIEUN:"#", SEEUN:"#", ISA:"#", YOON:"#"}, price:"$2.50" },
  { name:"Keychain", images:{ SUMIN:"assets/keychain-SUMIN.png", SIEUN:"assets/keychain-SIEUN.png", SEEUN:"assets/keychain-SEEUN.png", ISA:"assets/keychain-ISA.png", YOON:"assets/keychain-YOON.png" }, url:{ SUMIN:"#", SIEUN:"#", SEEUN:"#", ISA:"#", YOON:"#"}, price:"$12.00" },
  { name:"Phone Case", images:{ SUMIN:"assets/phone-SUMIN.png", SIEUN:"assets/phone-SIEUN.png", SEEUN:"assets/phone-SEEUN.png", ISA:"assets/phone-ISA.png", YOON:"assets/phone-YOON.png" }, url:{ SUMIN:"#", SIEUN:"#", SEEUN:"#", ISA:"#", YOON:"#"}, price:"$25.00" }
];

/* QUIZ QUESTIONS */
const quizQuestions = [
  { question:"Another artist you follow?", answers:[ {text:"Artist A",members:["SUMIN"]},{text:"Artist B",members:["SIEUN"]},{text:"Artist C",members:["SEEUN"]},{text:"Artist D",members:["ISA"]},{text:"Artist E",members:["YOON"]} ]},
  { question:"Favorite color?", answers:[ {text:"Red",members:["SUMIN"]},{text:"Blue",members:["SIEUN"]},{text:"Green",members:["SEEUN"]},{text:"Yellow",members:["ISA"]},{text:"Purple",members:["YOON"]} ]},
  { question:"Head or heart?", answers:[ {text:"Head",members:["SUMIN","SEEUN"]},{text:"Heart",members:["SIEUN","ISA","YOON"]} ]},
  { question:"Down to earth or head in the clouds?", answers:[ {text:"Down to earth",members:["SUMIN","ISA"]},{text:"Head in the clouds",members:["SIEUN","SEEUN","YOON"]} ]},
  { question:"Shy or social butterfly?", answers:[ {text:"Shy",members:["SUMIN","SEEUN"]},{text:"Social butterfly",members:["SIEUN","ISA","YOON"]} ]},
  { question:"Chaos or order?", answers:[ {text:"Chaos",members:["SUMIN","YOON"]},{text:"Order",members:["SIEUN","SEEUN","ISA"]} ]},
  { question:"Favorite animal?", answers:[ {text:"Cat",members:["SUMIN"]},{text:"Dog",members:["SIEUN"]},{text:"Swan",members:["SEEUN"]},{text:"Snake",members:["ISA"]},{text:"Chick",members:["YOON"]} ]},
  { question:"Favorite era?", answers:[ {text:"Debut era",members:["SUMIN"]},{text:"Second era",members:["SIEUN"]},{text:"Third era",members:["SEEUN"]},{text:"Fourth era",members:["ISA"]},{text:"Latest era",members:["YOON"]} ]},
  { question:"If you were a snack, what would you be?", answers:[ {text:"Chocolate",members:["SUMIN","ISA"]},{text:"Spicy chips",members:["SIEUN","SEEUN","YOON"]} ]},
  { question:"Pick a superpower:", answers:[ {text:"Invisibility",members:["SUMIN","YOON"]},{text:"Flight",members:["SIEUN","SEEUN","ISA"]} ]}
];

/* RENDER BIAS BUTTONS */
const biasButtonsContainer = document.getElementById("biasButtons");
Object.keys(members).forEach(m=>{
  const btn=document.createElement("button");
  btn.textContent=members[m].display.toUpperCase();
  btn.className="bias-btn";
  if(m===currentBias) btn.classList.add("active");
  btn.onclick=()=>setBias(m);
  biasButtonsContainer.appendChild(btn);
});

/* SET BIAS */
function setBias(memberKey){
  currentBias=memberKey;
  localStorage.setItem("fandomBias",memberKey);

  document.getElementById("profilePic").src=`assets/profile-${memberKey}.png`;
  document.getElementById("profileName").textContent=members[memberKey].display;

  document.documentElement.style.setProperty('--current-bg', members[memberKey].color);
  document.documentElement.style.setProperty('--current-accent', members[memberKey].accent);

  renderProducts();
  document.querySelectorAll(".bias-btn").forEach(btn=>btn.classList.toggle("active", btn.textContent===members[memberKey].display.toUpperCase()));
}

/* RENDER PRODUCTS */
function renderProducts(){
  const container=document.getElementById("products");
  container.innerHTML="";
  products.forEach(p=>{
    const card=document.createElement("div"); card.className="card";
    const imgSrc=p.images[currentBias]||p.images[Object.keys(members)[0]];
    const url=p.url[currentBias]||p.url[Object.keys(members)[0]];
    card.innerHTML=`<img src="${imgSrc}" alt="${p.name}"><h4>${p.name}</h4><p>${p.price}</p><a href="${url}" target="_blank"><button>Buy</button></a>`;
    container.appendChild(card);
  });
}

/* WISHLIST */
let wishlist=[];
function submitWishlist(){
  const name=document.getElementById("wishlistName").value;
  const email=document.getElementById("wishlistEmail").value;
  let items=wishlist.join("\n");
  window.location.href=`mailto:orders@example.com?subject=Wishlist&body=Name:${name}\nEmail:${email}\nItems:\n${items}`;
  wishlist=[]; document.getElementById("wishlistItems").value="";
  document.getElementById("wishlistName").value=""; document.getElementById("wishlistEmail").value="";
}

/* QUIZ */
let quizIndex=0; let quizScore={};
function openQuiz(){ quizIndex=0; quizScore={}; document.getElementById("quizModal").classList.add("active"); renderQuestion(); }
function closeQuiz(){ document.getElementById("quizModal").classList.remove("active"); }
function renderQuestion(){
  const q=quizQuestions[quizIndex];
  const container=document.getElementById("quiz-questions"); container.innerHTML=`<p>${q.question}</p>`;
  q.answers.forEach(a=>{
    const btn=document.createElement("button"); btn.textContent=a.text; btn.onclick=()=>selectAnswer(a.members); container.appendChild(btn);
  });
}
function selectAnswer(membersArr){
  membersArr.forEach(m=>quizScore[m]=(quizScore[m]||0)+1);
  quizIndex++; quizIndex<quizQuestions.length? renderQuestion():finishQuiz();
}
function finishQuiz(){
  const result=Object.keys(quizScore).sort((a,b)=>quizScore[b]-quizScore[a])[0]||Object.keys(members)[0];
  setBias(result); closeQuiz();
}

/* HOW TO ORDER MODAL */
function openHowTo(){ document.getElementById("howToModal").classList.add("active"); }
function closeHowTo(){ document.getElementById("howToModal").classList.remove("active"); }

/* INIT */
window.addEventListener("DOMContentLoaded",()=>{ renderProducts(); });
