// ---------- CONFIG ----------
const MEMBERS = ['Mercury','Venus','Earth','Mars','Jupiter','Saturn','Uranus','Neptune','Pluto'];

const MEMBER_COLORS = {
  Mercury:['#E8E8E8','#B8B8D1','#8B8BA7','#4A4A6A'],
  Venus:['#FFB3D9','#FF69B4','#8B2E5A','#4A1942'],
  Earth:['#93C5FD','#3B82F6','#1E3A8A','#0F172A'],
  Mars:['#86EFAC','#22C55E','#0D5C2D','#052E16'],
  Jupiter:['#FCA5A5','#EF4444','#7F1D1D','#450A0A'],
  Saturn:['#FFD6F5','#FF6EC7','#C71585','#6B0F4A'],
  Uranus:['#FFFFFF','#E6E6FA','#9370DB','#6A4C9C'],
  Neptune:['#B3E5FC','#00BFFF','#0066CC','#003366'],
  Pluto:['#D3D3D3','#808080','#3D3D3D','#0A0A0A']
};

const PRODUCTS = [
  {id:1,name:'Light Stick Keychain',price:'$12.99',type:'exclusive',imageFormat:'lightstickkeychain'},
  {id:2,name:'Hangul Sticker',price:'$3.99',type:'redbubble',redbubbleUrl:'#'},
  {id:3,name:'Autographic',price:'$5.99',type:'redbubble',redbubbleUrl:'#'},
  {id:4,name:'Comeback Sticker',price:'$4.99',type:'redbubble',redbubbleUrl:'#'},
  {id:5,name:'Phone Case',price:'$24.99',type:'exclusive',imageFormat:'phonecase'},
  {id:6,name:'Animal Icon Keychain',price:'$11.99',type:'exclusive',imageFormat:'animalkeychain'}
];

const QUIZ_QUESTIONS = [
  {question:'Favorite color?',options:[
    {text:'Pink',members:['Venus','Mars']},
    {text:'Blue',members:['Earth','Neptune']},
    {text:'Green',members:['Earth','Uranus']},
    {text:'Purple',members:['Jupiter','Pluto']}
  ]}
];

// ---------- STATE ----------
let selectedBias = MEMBERS[0];
let wishlist = [];
let quizAnswers = {};

// ---------- HELPERS ----------
const $ = id => document.getElementById(id);

function openModal(id){ $(id).classList.add('active'); }
function closeModal(id){ $(id).classList.remove('active'); }

// ---------- INIT ----------
document.addEventListener('DOMContentLoaded', () => {
  renderMembers();
  renderProducts();
  renderQuiz();
  updateTheme();
  attachEvents();
});

// ---------- RENDER ----------
function renderMembers(){
  $('memberButtons').innerHTML = MEMBERS.map(m =>
    `<button class="member-btn px-4 py-2 rounded text-white" data-member="${m}">${m}</button>`
  ).join('');
}

function renderProducts(){
  $('productGrid').innerHTML = PRODUCTS.map(p => `
    <div class="product-card bg-white p-4 rounded shadow">
      <h3 class="product-name brat-font font-bold">${p.name}</h3>
      <p class="product-member">${selectedBias} Version</p>
      <p class="product-price font-bold">${p.price}</p>
      ${p.type==='exclusive'
        ? `<button class="add-to-wishlist mt-3 px-4 py-2 rounded text-white" data-id="${p.id}">Add to Wishlist</button>`
        : `<a href="${p.redbubbleUrl}" class="mt-3 block text-center px-4 py-2 rounded text-white">Shop</a>`
      }
    </div>
  `).join('');
}

function renderQuiz(){
  $('quizQuestions').innerHTML = QUIZ_QUESTIONS.map((q,qi)=>`
    <div>
      <h3 class="font-bold mb-2">${q.question}</h3>
      ${q.options.map((o,oi)=>`
        <button class="quiz-option block w-full p-2 rounded mb-2 text-white"
          data-q="${qi}" data-o="${oi}">${o.text}</button>
      `).join('')}
    </div>
  `).join('');
}

// ---------- EVENTS ----------
function attachEvents(){

  document.addEventListener('click', e => {

    if(e.target.classList.contains('member-btn')){
      selectedBias = e.target.dataset.member;
      updateTheme();
      renderProducts();
    }

    if(e.target.classList.contains('add-to-wishlist')){
      const product = PRODUCTS.find(p=>p.id==e.target.dataset.id);
      wishlist.push({...product,member:selectedBias,uid:Date.now()});
      updateWishlist();
    }

    if(e.target.classList.contains('quiz-option')){
      quizAnswers[e.target.dataset.q]=e.target.dataset.o;
      $('submitQuizBtn').disabled = Object.keys(quizAnswers).length !== QUIZ_QUESTIONS.length;
    }

    if(e.target.id==='submitQuizBtn'){
      const result = MEMBERS[Math.floor(Math.random()*MEMBERS.length)];
      selectedBias = result;
      updateTheme();
      closeModal('quizModal');
      openModal('resultModal');
      $('resultMemberName').textContent = result;
      $('resultText').textContent = `Your bias is ${result}!`;
    }

    if(e.target.id==='wishlistBtn') openModal('wishlistModal');
    if(e.target.id==='quizBtn') openModal('quizModal');
    if(e.target.id==='howToOrderBtn') openModal('howToOrderModal');

    if(e.target.id==='closeWishlistModal') closeModal('wishlistModal');
    if(e.target.id==='closeQuizModal') closeModal('quizModal');
    if(e.target.id==='closeResultModal') closeModal('resultModal');
    if(e.target.id==='closeHowToOrderModal') closeModal('howToOrderModal');

  });
}

// ---------- UI ----------
function updateTheme(){
  const c = MEMBER_COLORS[selectedBias];
  document.body.style.background = `linear-gradient(135deg,${c[0]},${c[1]},${c[2]})`;
  $('heroName').textContent = selectedBias;
  $('heroImage').src = `/assets/hero-${selectedBias}.png`;
}

function updateWishlist(){
  $('wishlistCount').textContent = wishlist.length;
  $('wishlistCount').style.display = wishlist.length ? 'flex' : 'none';

  $('wishlistItems').innerHTML = wishlist.map(i =>
    `<p>${i.name} – ${i.member}</p>`
  ).join('');

  $('requestOrderBtn').textContent = `Request Order (${wishlist.length} items)`;
}
