/* ---------- MEMBERS ---------- */
const members = {
  mercury:{colors:["#f5e9ff","#cba3ff","#8b6cff","#3d295f"]},
  venus:{colors:["#ffe9ef","#ff9db6","#ff5f8f","#5a1e33"]},
  earth:{colors:["#e9fff3","#9fe0b5","#3bb273","#1f4f3a"]},
  mars:{colors:["#ffece9","#ff9a87","#ff5b3a","#5a2015"]},
  jupiter:{colors:["#fff7e9","#ffd27f","#ffb000","#5a3c00"]},
  saturn:{colors:["#f0f0ff","#b3b3ff","#7a7aff","#2f2f55"]},
  uranus:{colors:["#e9fbff","#9edcff","#3aaed8","#1b3f4f"]},
  neptune:{colors:["#e9eeff","#9aaeff","#5663ff","#202a5a"]},
  pluto:{colors:["#f7e9ff","#c59bff","#8a5cff","#3a2055"]}
};

/* ---------- PRODUCTS ---------- */
const products = [
  "light stick keychain",
  "hangul sticker",
  "autographic",
  "comeback sticker",
  "phone case"
];

let currentBias = "mercury";
let wishlist = [];

/* ---------- THEME ---------- */
function setTheme(member){
  currentBias = member;
  localStorage.setItem("selectedBias", member);

  const c = members[member].colors;
  document.documentElement.style.setProperty("--c1",c[0]);
  document.documentElement.style.setProperty("--c2",c[1]);
  document.documentElement.style.setProperty("--c3",c[2]);
  document.documentElement.style.setProperty("--c4",c[3]);

  renderProducts();
}

/* ---------- PRODUCTS ---------- */
const grid = document.getElementById("productGrid");

function renderProducts(){
  grid.innerHTML = "";
  products.forEach(p=>{
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="/assets/collection-${currentBias}.png">
      <h4>${p}</h4>
      <button onclick="addToWishlist('${p}')">Add to Wishlist</button>
      <button onclick="goRedbubble('${p}')">Redbubble</button>
    `;
    grid.appendChild(card);
  });
}

/* ---------- WISHLIST ---------- */
function addToWishlist(item){
  wishlist.push(`${currentBias} – ${item}`);
  document.getElementById("wishlistCount").textContent = wishlist.length;
}

function openWishlist(){
  document.getElementById("wishlistItems").innerHTML =
    wishlist.map(i=>`<li>${i}</li>`).join("");
  wishlistModal.style.display="flex";
}
function closeWishlist(){ wishlistModal.style.display="none"; }

function sendOrder(){
  const body = `
Name: ${nameInput.value}
Email: ${emailInput.value}
Subscribe: ${subscribeInput.checked ? "Yes" : "No"}

Wishlist:
${wishlist.join("\n")}
`;
  window.location.href =
   `mailto:orders@sunniejae.com?subject=KPOP FANDOM SHOP ORDER&body=${encodeURIComponent(body)}`;
}

/* ---------- QUIZ DATA ---------- */
const quizData = [
  {q:"Favorite color?",
   o:[
    {t:"Purple",s:["venus","neptune","pluto"]},
    {t:"Red",s:["mars","jupiter"]},
    {t:"Blue",s:["earth","uranus"]},
    {t:"Black",s:["saturn","pluto"]}
   ]},
  {q:"Introvert or extrovert?",
   o:[
    {t:"Introvert",s:["saturn","pluto","neptune"]},
    {t:"Extrovert",s:["jupiter","venus","mars"]}
   ]},
  {q:"Down to earth or head in the clouds?",
   o:[
    {t:"Down to earth",s:["earth","mercury","saturn"]},
    {t:"Head in the clouds",s:["neptune","venus","uranus"]}
   ]},
  {q:"Head or heart?",
   o:[
    {t:"Head",s:["mercury","saturn"]},
    {t:"Heart",s:["venus","mars","pluto"]}
   ]},
  {q:"Order or chaos?",
   o:[
    {t:"Order",s:["saturn","earth","mercury"]},
    {t:"Chaos",s:["uranus","mars","jupiter"]}
   ]}
];

let quizScores = {};

/* ---------- QUIZ ---------- */
function openQuiz(){
  quizScores = {};
  Object.keys(members).forEach(m=>quizScores[m]=0);

  quizQuestions.innerHTML = "";
  quizData.forEach((q,qi)=>{
    const block = document.createElement("div");
    block.innerHTML = `<p><strong>${q.q}</strong></p>`;
    q.o.forEach((opt,oi)=>{
      block.innerHTML += `
        <label>
          <input type="radio" name="q${qi}" value="${oi}">
          ${opt.t}
        </label><br>
      `;
    });
    quizQuestions.appendChild(block);
  });
  quizModal.style.display="flex";
}

function closeQuiz(){ quizModal.style.display="none"; }
function closeResult(){ resultModal.style.display="none"; }

function submitQuiz(){
  quizData.forEach((q,qi)=>{
    const sel = document.querySelector(`input[name="q${qi}"]:checked`);
    if(!sel) return;
    q.o[sel.value].s.forEach(m=>quizScores[m]++);
  });

  const result = Object.keys(quizScores)
    .reduce((a,b)=>quizScores[a]>quizScores[b]?a:b);

  showResult(result);
}

function showResult(member){
  setTheme(member);

  resultName.textContent = member.toUpperCase();
  resultImage.src = `/assets/collection-${member}.png`;
  resultText.innerHTML = `
    Your bias match is <strong>${member}</strong> ✨<br><br>
    We've updated the shop theme to match your result.
    Wishlist items to request an order,
    or shop select designs instantly on Redbubble.
  `;

  quizModal.style.display="none";
  resultModal.style.display="flex";
}

/* ---------- REDBUBBLE ---------- */
function goRedbubble(product){
  alert(`${product} redirects to Redbubble.`);
}

/* ---------- INIT ---------- */
const biasButtons = document.getElementById("biasButtons");
Object.keys(members).forEach(m=>{
  const b=document.createElement("button");
  b.textContent=m;
  b.onclick=()=>setTheme(m);
  biasButtons.appendChild(b);
});

const savedBias = localStorage.getItem("selectedBias") || "mercury";
setTheme(savedBias);
