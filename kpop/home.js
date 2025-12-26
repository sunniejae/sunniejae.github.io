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
/*
  redbubbleLink placeholders:
  Replace with your real collection URLs
*/
const products = [
  {
    name:"Phone Case",
    type:"wishlist",
    img:"assets/collection-MEMBER.png",
    description:"A bias-themed phone case made to match your era and aesthetic."
  },
  {
    name:"Lightstick Keychain",
    type:"wishlist",
    img:"assets/lightstickkeychain-MEMBER.png",
    description:"Mini lightstick charm — perfect for bags, keys, or concert fits."
  },
  {
    name:"Animal Icon Keychain",
    type:"wishlist",
    img:"assets/animalkeychain-MEMBER.png",
    description:"Your bias represented as a cute animal icon keychain."
  },

  {
    name:"Comeback Era Stickers",
    type:"redbubble",
    img:"assets/collection-MEMBER.png",
    description:"Stickers inspired by iconic comeback eras.",
    redbubbleLink:"https://www.redbubble.com/people/YOURSHOP/collections/COMEBACK-ERAS"
  },
  {
    name:"Autographics",
    type:"redbubble",
    img:"assets/collection-MEMBER.png",
    description:"Stylized autograph designs for laptops, journals, and cases.",
    redbubbleLink:"https://www.redbubble.com/people/YOURSHOP/collections/AUTOGRAPHICS"
  },
  {
    name:"Hangul Stickers",
    type:"redbubble",
    img:"assets/hangul-MEMBER.png",
    description:"Hangul typography designs featuring names, lyrics, and motifs.",
    redbubbleLink:"https://www.redbubble.com/people/YOURSHOP/collections/HANGUL"
  }
];

let currentBias = "mercury";
let wishlist = [];
let currentFilter = "all";

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

/* ---------- FILTER ---------- */
function setFilter(type){
  currentFilter = type;
  renderProducts();
}

/* ---------- PRODUCTS ---------- */
const grid = document.getElementById("productGrid");

function renderProducts(){
  grid.innerHTML = "";

  products
    .filter(p => currentFilter==="all" || p.type===currentFilter)
    .forEach(p=>{
      const imgPath = p.img.replace("MEMBER", currentBias);

      const badge = p.type==="wishlist"
        ? `<span class="badge wishlist">SUNNIEJAE EXCLUSIVE</span>`
        : `<span class="badge redbubble">REDBUBBLE</span>`;

      const action = p.type==="wishlist"
        ? `
          <button onclick="addToWishlist('${p.name}')">
            Add to Wishlist
          </button>
          <small>Email order via wishlist</small>
        `
        : `
          <button onclick="goRedbubble('${p.redbubbleLink}')">
            Shop on Redbubble
          </button>
          <small>Instant checkout</small>
        `;

      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        ${badge}
        <img src="${imgPath}">
        <h4>${p.name}</h4>
        <p style="font-size:0.7rem;padding:0 0.6rem;">
          ${p.description}
        </p>
        ${action}
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
  wishlistItems.innerHTML = wishlist.map(i=>`<li>${i}</li>`).join("");
  wishlistModal.style.display="flex";
}
function closeWishlist(){ wishlistModal.style.display="none"; }

function sendOrder(){
  const body = `
Name: ${nameInput.value}
Email: ${emailInput.value}
Subscribe: ${subscribeInput.checked ? "Yes":"No"}

Wishlist:
${wishlist.join("\n")}
`;
  window.location.href =
    `mailto:orders@sunniejae.com?subject=KPOP FANDOM SHOP ORDER&body=${encodeURIComponent(body)}`;
}

/* ---------- QUIZ ---------- */
const quizData=[
  {q:"Favorite color?",o:[
    {t:"Purple",s:["venus","neptune","pluto"]},
    {t:"Red",s:["mars","jupiter"]},
    {t:"Blue",s:["earth","uranus"]},
    {t:"Black",s:["saturn","pluto"]}
  ]},
  {q:"Introvert or extrovert?",o:[
    {t:"Introvert",s:["saturn","pluto","neptune"]},
    {t:"Extrovert",s:["jupiter","venus","mars"]}
  ]},
  {q:"Order or chaos?",o:[
    {t:"Order",s:["saturn","earth","mercury"]},
    {t:"Chaos",s:["uranus","mars","jupiter"]}
  ]}
];

let quizScores={};

function openQuiz(){
  quizScores={};
  Object.keys(members).forEach(m=>quizScores[m]=0);
  quizQuestions.innerHTML="";

  quizData.forEach((q,qi)=>{
    const d=document.createElement("div");
    d.innerHTML=`<p><strong>${q.q}</strong></p>`;
    q.o.forEach((o,oi)=>{
      d.innerHTML+=`
        <label>
          <input type="radio" name="q${qi}" value="${oi}">
          ${o.t}
        </label><br>
      `;
    });
    quizQuestions.appendChild(d);
  });

  quizModal.style.display="flex";
}

function closeQuiz(){quizModal.style.display="none";}
function closeResult(){resultModal.style.display="none";}

function submitQuiz(){
  quizData.forEach((q,qi)=>{
    const sel=document.querySelector(`input[name="q${qi}"]:checked`);
    if(!sel)return;
    q.o[sel.value].s.forEach(m=>quizScores[m]++);
  });

  const result=Object.keys(quizScores)
    .reduce((a,b)=>quizScores[a]>quizScores[b]?a:b);

  showResult(result);
}

function showResult(member){
  setTheme(member);
  resultName.textContent=member.toUpperCase();
  resultImage.src=`assets/collection-${member}.png`;
  resultText.innerHTML=`
    Your bias match is <strong>${member}</strong> ✨<br><br>
    The shop has been updated to match your result.
  `;
  quizModal.style.display="none";
  resultModal.style.display="flex";
}

/* ---------- REDBUBBLE ---------- */
function goRedbubble(url){
  window.open(url, "_blank");
}

/* ---------- INIT ---------- */
Object.keys(members).forEach(m=>{
  const b=document.createElement("button");
  b.textContent=m;
  b.onclick=()=>setTheme(m);
  biasButtons.appendChild(b);
});

setTheme(localStorage.getItem("selectedBias") || "mercury");
