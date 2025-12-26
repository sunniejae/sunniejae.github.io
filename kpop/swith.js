/* MEMBERS */
const members = ["member1","member2","member3","member4","member5"];
let currentBias = localStorage.getItem("fandomBias") || "member1";

/* PRODUCTS */
const products = [
  { name:"Sticker Set", images:{ member1:"assets/sticker-member1.png", member2:"assets/sticker-member2.png", member3:"assets/sticker-member3.png", member4:"assets/sticker-member4.png", member5:"assets/sticker-member5.png" }, url:{ member1:"#", member2:"#", member3:"#", member4:"#", member5:"#"}, price:"$2.50" },
  { name:"Keychain", images:{ member1:"assets/keychain-member1.png", member2:"assets/keychain-member2.png", member3:"assets/keychain-member3.png", member4:"assets/keychain-member4.png", member5:"assets/keychain-member5.png" }, url:{ member1:"#", member2:"#", member3:"#", member4:"#", member5:"#"}, price:"$12.00" },
  { name:"Phone Case", images:{ member1:"assets/phone-member1.png", member2:"assets/phone-member2.png", member3:"assets/phone-member3.png", member4:"assets/phone-member4.png", member5:"assets/phone-member5.png" }, url:{ member1:"#", member2:"#", member3:"#", member4:"#", member5:"#"}, price:"$25.00" }
];

/* QUIZ QUESTIONS */
const quizQuestions = [
  { question:"Another artist you follow?", answers:[ {text:"Artist A",members:["member1"]},{text:"Artist B",members:["member2"]},{text:"Artist C",members:["member3"]},{text:"Artist D",members:["member4"]},{text:"Artist E",members:["member5"]} ]},
  { question:"Favorite color?", answers:[ {text:"Red",members:["member1"]},{text:"Blue",members:["member2"]},{text:"Green",members:["member3"]},{text:"Yellow",members:["member4"]},{text:"Purple",members:["member5"]} ]},
  { question:"Head or heart?", answers:[ {text:"Head",members:["member1","member3"]},{text:"Heart",members:["member2","member4","member5"]} ]},
  { question:"Down to earth or head in the clouds?", answers:[ {text:"Down to earth",members:["member1","member4"]},{text:"Head in the clouds",members:["member2","member3","member5"]} ]},
  { question:"Shy or social butterfly?", answers:[ {text:"Shy",members:["member1","member3"]},{text:"Social butterfly",members:["member2","member4","member5"]} ]},
  { question:"Chaos or order?", answers:[ {text:"Chaos",members:["member1","member5"]},{text:"Order",members:["member2","member3","member4"]} ]},
  { question:"Favorite animal?", answers:[ {text:"Cat",members:["member1"]},{text:"Dog",members:["member2"]},{text:"Swan",members:["member3"]},{text:"Snake",members:["member4"]},{text:"Chick",members:["member5"]} ]},
  { question:"Favorite era?", answers:[ {text:"Debut era",members:["member1"]},{text:"Second era",members:["member2"]},{text:"Third era",members:["member3"]},{text:"Fourth era",members:["member4"]},{text:"Latest era",members:["member5"]} ]},
  { question:"If you were a snack, what would you be?", answers:[ {text:"Chocolate",members:["member1","member4"]},{text:"Spicy chips",members:["member2","member3","member5"]} ]},
  { question:"Pick a superpower:", answers:[ {text:"Invisibility",members:["member1","member5"]},{text:"Flight",members:["member2","member3","member4"]} ]}
];

/* RENDER BIAS BUTTONS */
const biasButtonsContainer = document.getElementById("biasButtons");
members.forEach(m=>{
  const btn=document.createElement("button");
  btn.textContent=m.toUpperCase();
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
  document.getElementById("profileName").textContent=memberKey.toUpperCase();
  renderProducts();
  document.querySelectorAll(".bias-btn").forEach(btn=>btn.classList.toggle("active",btn.textContent===memberKey.toUpperCase()));
}

/* RENDER PRODUCTS */
function renderProducts(){
  const container=document.getElementById("products");
  container.innerHTML="";
  products.forEach(p=>{
    const card=document.createElement("div"); card.className="card";
    const imgSrc=p.images[currentBias]||p.images[members[0]];
    const url=p.url[currentBias]||p.url[members[0]];
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
  const result=Object.keys(quizScore).sort((a,b)=>quizScore[b]-quizScore[a])[0]||members[0];
  setBias(result); closeQuiz();
}

/* HOW TO ORDER MODAL */
function openHowTo(){ document.getElementById("howToModal").classList.add("active"); }
function closeHowTo(){ document.getElementById("howToModal").classList.remove("active"); }

/* INIT */
window.addEventListener("DOMContentLoaded",()=>{ renderProducts(); });
