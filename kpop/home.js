const members={
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

const products=[
  {name:"Phone Case",type:"wishlist",img:"assets/collection-MEMBER.png",desc:"Bias-themed phone case."},
  {name:"Lightstick Keychain",type:"wishlist",img:"assets/lightstickkeychain-MEMBER.png",desc:"Mini lightstick charm."},
  {name:"Animal Icon Keychain",type:"wishlist",img:"assets/animalkeychain-MEMBER.png",desc:"Cute animal icon keychain."},

  {name:"Comeback Era Stickers",type:"redbubble",img:"assets/collection-MEMBER.png",desc:"Iconic comeback eras.",link:"https://redbubble.com"},
  {name:"Autographics",type:"redbubble",img:"assets/collection-MEMBER.png",desc:"Stylized autographs.",link:"https://redbubble.com"},
  {name:"Hangul Stickers",type:"redbubble",img:"assets/hangul-MEMBER.png",desc:"Hangul typography.",link:"https://redbubble.com"}
];

let currentBias=localStorage.getItem("selectedBias")||"mercury";
let wishlist=[],filter="all";

const grid=document.getElementById("productGrid");

function setTheme(member){
  currentBias=member;
  localStorage.setItem("selectedBias",member);
  members[member].colors.forEach((c,i)=>{
    document.documentElement.style.setProperty(`--c${i+1}`,c);
  });
  heroImage.src=`assets/collection-${member}.png`;
  renderProducts();
}

function setFilter(f){filter=f;renderProducts();}

function renderProducts(){
  grid.innerHTML="";
  products.filter(p=>filter==="all"||p.type===filter).forEach(p=>{
    const card=document.createElement("div");
    card.className="card";
    card.innerHTML=`
      <span class="badge ${p.type}">
        ${p.type==="wishlist"?"EXCLUSIVE":"REDBUBBLE"}
      </span>
      <img src="${p.img.replace("MEMBER",currentBias)}">
      <h4>${p.name}</h4>
      <p class="product-desc">${p.desc}</p>
      ${
        p.type==="wishlist"
        ? `<button onclick="addToWishlist('${p.name}')">Add to Wishlist</button><small>Email order</small>`
        : `<button onclick="window.open('${p.link}','_blank')">Shop on Redbubble</button><small>Instant checkout</small>`
      }
    `;
    grid.appendChild(card);
  });
}

function addToWishlist(item){
  wishlist.push(`${currentBias} – ${item}`);
  wishlistCount.textContent=wishlist.length;
}

function openWishlist(){
  wishlistItems.innerHTML=wishlist.map(i=>`<li>${i}</li>`).join("");
  wishlistModal.style.display="flex";
}
function closeWishlist(){wishlistModal.style.display="none";}

function sendOrder(){
  const body=`Name: ${nameInput.value}
Email: ${emailInput.value}
Subscribe: ${subscribeInput.checked?"Yes":"No"}

Wishlist:
${wishlist.join("\n")}`;
  window.location.href=
    `mailto:orders@sunniejae.com?cc=${emailInput.value}&subject=KPOP FANDOM SHOP ORDER&body=${encodeURIComponent(body)}`;
}

/* ---------- QUIZ ---------- */
const quizData=[
  {q:"Favorite vibe?",o:[
    {t:"Soft",s:["venus","neptune"]},
    {t:"Bold",s:["mars","jupiter"]},
    {t:"Dreamy",s:["pluto","saturn"]}
  ]}
];

let scores={};

function openQuiz(){
  scores={};
  Object.keys(members).forEach(m=>scores[m]=0);
  quizQuestions.innerHTML="";
  quizData.forEach((q,qi)=>{
    quizQuestions.innerHTML+=`<p><strong>${q.q}</strong></p>`;
    q.o.forEach((o,oi)=>{
      quizQuestions.innerHTML+=`
        <label><input type="radio" name="q${qi}" value="${oi}"> ${o.t}</label><br>
      `;
    });
  });
  quizModal.style.display="flex";
}
function closeQuiz(){quizModal.style.display="none";}
function closeResult(){resultModal.style.display="none";}

function submitQuiz(){
  quizData.forEach((q,qi)=>{
    const sel=document.querySelector(`input[name="q${qi}"]:checked`);
    if(!sel)return;
    q.o[sel.value].s.forEach(m=>scores[m]++);
  });
  const result=Object.keys(scores).reduce((a,b)=>scores[a]>scores[b]?a:b);
  showResult(result);
}

function showResult(member){
  setTheme(member);
  resultName.textContent=member.toUpperCase();
  resultImage.src=`assets/collection-${member}.png`;
  resultText.textContent="Your bias has been revealed ✨";
  quizModal.style.display="none";
  resultModal.style.display="flex";
  confetti();
}

/* ---------- CONFETTI ---------- */
function confetti(){
  for(let i=0;i<40;i++){
    const c=document.createElement("div");
    c.className="confetti";
    c.style.left=Math.random()*100+"vw";
    c.style.background=`hsl(${Math.random()*360},80%,60%)`;
    document.body.appendChild(c);
    setTimeout(()=>c.remove(),2500);
  }
}

/* ---------- INIT ---------- */
Object.keys(members).forEach(m=>{
  const b=document.createElement("button");
  b.textContent=m;
  b.onclick=()=>setTheme(m);
  biasButtons.appendChild(b);
});

setTheme(currentBias);
