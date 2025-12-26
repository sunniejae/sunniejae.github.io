/* ================= IMAGE FALLBACK ================= */
function handleImageError(img){
  img.onerror = null;
  img.src = "/assets/blank-member.png";
}

/* ================= MEMBERS (PLANET PLACEHOLDERS) ================= */
const members = {
  mercury:{ colors:["#f7f7f7","#e5e5e5","#ffffff","#2b2b2b"] },
  venus:{   colors:["#fff2f6","#f3a4b5","#d12c5b","#4a0f23"] },
  earth:{   colors:["#eef4fb","#7fa7d8","#1f4fb2","#0b1f3f"] },
  mars:{    colors:["#eef7f2","#4fb08a","#0f7f4c","#043323"] },
  jupiter:{ colors:["#fff1f1","#e06b6b","#b11226","#3d070f"] },
  saturn:{  colors:["#f5f3ee","#d6c9a3","#a08b3c","#3d3312"] },
  uranus:{  colors:["#eefcff","#8fe3ff","#2ab0ff","#063b4a"] },
  neptune:{ colors:["#f2f0ff","#a3a0ff","#4b4aff","#1a1a4f"] },
  pluto:{   colors:["#f6f1f3","#c8a2b8","#7a3f5e","#2d1220"] }
};

/* ================= PRODUCTS ================= */
const products = [
  { name:"Phone Case", type:"wishlist", img:"assets/collection-MEMBER.png", desc:"Bias-themed phone case." },
  { name:"Lightstick Keychain", type:"wishlist", img:"assets/lightstickkeychain-MEMBER.png", desc:"Mini lightstick charm." },
  { name:"Animal Icon Keychain", type:"wishlist", img:"assets/animalkeychain-MEMBER.png", desc:"Cute animal icon keychain." },

  { name:"Comeback Era Stickers", type:"redbubble", img:"assets/collection-MEMBER.png", desc:"Iconic era sticker packs.", link:"https://redbubble.com" },
  { name:"Autographics", type:"redbubble", img:"assets/collection-MEMBER.png", desc:"Stylized autograph art.", link:"https://redbubble.com" },
  { name:"Hangul Stickers", type:"redbubble", img:"assets/hangul-MEMBER.png", desc:"Hangul typography designs.", link:"https://redbubble.com" }
];

/* ================= STATE ================= */
let currentBias = localStorage.getItem("selectedBias") || "venus";
let wishlist = [];
let currentFilter = "all";

const grid = document.getElementById("productGrid");

/* ================= THEME ================= */
function setTheme(member){
  currentBias = member;
  localStorage.setItem("selectedBias", member);

  members[member].colors.forEach((c,i)=>{
    document.documentElement.style.setProperty(`--c${i+1}`, c);
  });

  heroImage.src = `assets/collection-${member}.png`;
  heroImage.onerror = () => handleImageError(heroImage);

  renderProducts();
}

/* ================= FILTER ================= */
function setFilter(type){
  currentFilter = type;
  renderProducts();
}

/* ================= RENDER PRODUCTS ================= */
function renderProducts(){
  grid.innerHTML = "";

  products
    .filter(p => currentFilter==="all" || p.type===currentFilter)
    .forEach(p=>{
      const imgPath = p.img.replace("MEMBER", currentBias);
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <span class="badge ${p.type}">
          ${p.type==="wishlist" ? "EXCLUSIVE" : "REDBUBBLE"}
        </span>

        <img src="${imgPath}" onerror="handleImageError(this)">

        <h4>${p.name}</h4>
        <p class="product-desc">${p.desc}</p>

        ${
          p.type==="wishlist"
            ? `<button onclick="addToWishlist('${p.name}')">Add to Wishlist</button>
               <small>Email request</small>`
            : `<button onclick="window.open('${p.link}','_blank')">Shop on Redbubble</button>
               <small>Instant checkout</small>`
        }
      `;
      grid.appendChild(card);
    });
}

/* ================= WISHLIST ================= */
function addToWishlist(item){
  wishlist.push(`${currentBias} – ${item}`);
  wishlistCount.textContent = wishlist.length;
}

function openWishlist(){
  wishlistItems.innerHTML = wishlist.map(i=>`<li>${i}</li>`).join("");
  wishlistModal.style.display = "flex";
}
function closeWishlist(){ wishlistModal.style.display = "none"; }

function sendOrder(){
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  if(!name || !email){ alert("Please enter name and email."); return; }

  const body = `
Name: ${name}
Email: ${email}
Subscribe: ${subscribeInput.checked ? "Yes" : "No"}

Wishlist:
${wishlist.join("\n")}
`;

  window.location.href =
    `mailto:orders@sunniejae.com?cc=${encodeURIComponent(email)}&subject=${encodeURIComponent("KPOP FANDOM SHOP ORDER")}&body=${encodeURIComponent(body)}`;
}

/* ================= QUIZ DATA (ALL QUESTIONS) ================= */
const quizData = [
  {
    q:"Favorite color?",
    o:[
      {t:"Soft pastels", s:["venus","earth","neptune"]},
      {t:"Bold brights", s:["mars","jupiter","uranus"]},
      {t:"Neutrals / monochrome", s:["mercury","saturn","pluto"]}
    ]
  },
  {
    q:"Introvert or extrovert?",
    o:[
      {t:"Introvert", s:["mercury","venus","pluto"]},
      {t:"Ambivert", s:["earth","saturn","neptune"]},
      {t:"Extrovert", s:["mars","jupiter","uranus"]}
    ]
  },
  {
    q:"Down to earth or head in the clouds?",
    o:[
      {t:"Down to earth", s:["mercury","earth","saturn"]},
      {t:"Head in the clouds", s:["venus","neptune","pluto"]}
    ]
  },
  {
    q:"Head or heart?",
    o:[
      {t:"Head", s:["mercury","saturn","earth"]},
      {t:"Heart", s:["venus","mars","jupiter","pluto"]}
    ]
  },
  {
    q:"Order or chaos?",
    o:[
      {t:"Order", s:["mercury","saturn","earth"]},
      {t:"Chaos", s:["mars","jupiter","uranus","pluto"]}
    ]
  },
  {
    q:"Favorite animal?",
    o:[
      {t:"Cat", s:["venus","pluto","neptune"]},
      {t:"Dog", s:["mars","jupiter","earth"]},
      {t:"Bird / exotic", s:["uranus","saturn"]}
    ]
  },
  {
    q:"Another artist you follow?",
    o:[
      {t:"Pop idols", s:["venus","earth","jupiter"]},
      {t:"Indie / alt", s:["pluto","neptune","uranus"]},
      {t:"R&B / vocalists", s:["mercury","saturn","mars"]}
    ]
  },
  {
    q:"Favorite era?",
    o:[
      {t:"Debut era", s:["earth","venus","saturn"]},
      {t:"Experimental era", s:["uranus","pluto","neptune"]},
      {t:"Peak confident era", s:["mars","jupiter","mercury"]}
    ]
  }
];

let scores = {};

/* ================= QUIZ FLOW ================= */
function openQuiz(){
  scores = {};
  Object.keys(members).forEach(m=>scores[m]=0);
  quizQuestions.innerHTML = "";

  quizData.forEach((q,qi)=>{
    quizQuestions.innerHTML += `<p><strong>${q.q}</strong></p>`;
    q.o.forEach((o,oi)=>{
      quizQuestions.innerHTML += `
        <label>
          <input type="radio" name="q${qi}" value="${oi}">
          ${o.t}
        </label><br>
      `;
    });
  });

  quizModal.style.display = "flex";
}

function closeQuiz(){ quizModal.style.display="none"; }

function submitQuiz(){
  quizData.forEach((q,qi)=>{
    const sel = document.querySelector(`input[name="q${qi}"]:checked`);
    if(!sel) return;
    q.o[sel.value].s.forEach(m=>scores[m]++);
  });

  const result = Object.keys(scores)
    .reduce((a,b)=>scores[a]>scores[b]?a:b);

  showResult(result);
}

/* ================= RESULT ================= */
function showResult(member){
  setTheme(member);
  resultName.textContent = member.toUpperCase();
  resultImage.src = `assets/collection-${member}.png`;
  resultImage.onerror = () => handleImageError(resultImage);
  resultText.textContent = "Your bias match has been revealed ✨";

  quizModal.style.display = "none";
  resultModal.style.display = "flex";
  confetti();
}

function closeResult(){ resultModal.style.display="none"; }

/* ================= CONFETTI ================= */
function confetti(){
  for(let i=0;i<40;i++){
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = Math.random()*100 + "vw";
    c.style.background = `hsl(${Math.random()*360},80%,60%)`;
    document.body.appendChild(c);
    setTimeout(()=>c.remove(),2500);
  }
}

/* ================= INIT ================= */
Object.keys(members).forEach(m=>{
  const btn = document.createElement("button");
  btn.textContent = m;
  btn.onclick = ()=>setTheme(m);
  biasButtons.appendChild(btn);
});

setTheme(currentBias);
