/* ================= IMAGE FALLBACK ================= */
function handleImageError(img){
  img.onerror = null;

  // try bias-specific blank first
  const themedFallback = `/assets/blank-${currentBias}.png`;

  img.src = themedFallback;

  // if that also fails, fall back to global blank
  img.onerror = () => {
    img.onerror = null;
    img.src = "/assets/blank-member.png";
  };
}


/* ================= MEMBERS (PLANET PLACEHOLDERS) ================= */
const members = {
  SUMIN:{ colors:["#fff0f8","#ff66b2","#ff0080","#4a0033"] },
  SIEUN:{   colors:["#ffffff","#e4c9f7","#faf3fd","#5a3d6b"] },
  SEEUN:{   colors:["#eef7ff","#7fc7ff","#008eff","#002f5a"] },
  ISA:{    colors:["#f2f5f8","#9fb7c3","#4a5d68","#1f2a30"] },
  YOON:{ colors:["#edfff6","#6bffb6","#00ff7f","#005f3a"] },
  J:{  colors:["#fff0f2","#ff6a7f","#ff002b","#4a0010"] }
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
let currentBias = localStorage.getItem("selectedBias") || "SIEUN";
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
  if(!name || !email){ alert("Please enter your name and email."); return; }

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

/* ================= QUIZ DATA ================= */
const quizData = [
  {
    q:"Favorite color?",
    o:[
      {t:"Soft pastels", s:["SIEUN","SEEUN"]},
      {t:"Bold brights", s:["ISA","YOON"]},
      {t:"Neutrals / monochrome", s:["SUMIN","J"]}
    ]
  },
  {
    q:"Introvert or extrovert?",
    o:[
      {t:"Introvert", s:["SUMIN","SIEUN"]},
      {t:"Ambivert", s:["SEEUN","J"]},
      {t:"Extrovert", s:["ISA","YOON"]}
    ]
  },
  {
    q:"Down to SEEUN or head in the clouds?",
    o:[
      {t:"Down to SEEUN", s:["SUMIN","SEEUN","J"]},
      {t:"Head in the clouds", s:["SIEUN"]}
    ]
  },
  {
    q:"Head or heart?",
    o:[
      {t:"Head", s:["SUMIN","J","SEEUN"]},
      {t:"Heart", s:["SIEUN","ISA","YOON"]}
    ]
  },
  {
    q:"Order or chaos?",
    o:[
      {t:"Order", s:["SUMIN","J","SEEUN"]},
      {t:"Chaos", s:["ISA","YOON",]}
    ]
  },
  {
    q:"Favorite animal?",
    o:[
      {t:"Cat", s:["SIEUN"]},
      {t:"Dog", s:["ISA","YOON","SEEUN"]},
      {t:"Bird / exotic", s:["J"]}
    ]
  },
  {
    q:"Another artist you follow?",
    o:[
      {t:"Pop idols", s:["SIEUN","SEEUN","YOON"]},
      {t:"Indie / alt", s:["J"]},
      {t:"R&B / vocalists", s:["SUMIN","J","ISA"]}
    ]
  },
  {
    q:"Favorite era?",
    o:[
      {t:"Debut era", s:["SEEUN","SIEUN","J"]},
      {t:"Experimental era", s:["J"]},
      {t:"Peak confident era", s:["ISA","YOON","SUMIN"]}
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

/* ================= INTRO MODAL ================= */
function openIntro(){ introModal.style.display="flex"; }
function closeIntro(){ introModal.style.display="none"; }
function acceptIntro(){
  localStorage.setItem("introSeen","yes");
  closeIntro();
}

/* ================= INIT ================= */
Object.keys(members).forEach(m=>{
  const btn = document.createElement("button");
  btn.textContent = m;
  btn.onclick = ()=>setTheme(m);
  biasButtons.appendChild(btn);
});

setTheme(currentBias);

// show intro once
if(!localStorage.getItem("introSeen")){
  setTimeout(openIntro,600);
}
