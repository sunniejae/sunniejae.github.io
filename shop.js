// -----------------------------
// CONFIG: PRODUCTS & MEMBERS
// -----------------------------
const members = ['Chaewon', 'Sakura', 'Yunjin', 'Kazuha', 'Eunchae'];

const products = [
  { id: 1, name: 'OT5 Sticker Pack', img: 'images/ot5_sticker.png', members: ['OT5'], price: 10 },
  { id: 2, name: 'OT5 Keychain', img: 'images/ot5_keychain.png', members: ['OT5'], price: 15 },
  { id: 3, name: 'Chaewon Poster', img: 'images/chaewon_poster.png', members: ['Chaewon'], price: 12 },
  { id: 4, name: 'Sakura Poster', img: 'images/sakura_poster.png', members: ['Sakura'], price: 12 },
  { id: 5, name: 'Yunjin Poster', img: 'images/yunjin_poster.png', members: ['Yunjin'], price: 12 },
  { id: 6, name: 'Kazuha Poster', img: 'images/kazuha_poster.png', members: ['Kazuha'], price: 12 },
  { id: 7, name: 'Eunchae Poster', img: 'images/eunchae_poster.png', members: ['Eunchae'], price: 12 },
];

// -----------------------------
// WISHLIST LOGIC
// -----------------------------
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

const wishlistCount = document.getElementById('wishlist-count');
function updateWishlistCount() {
  wishlistCount.textContent = wishlist.length;
}
updateWishlistCount();

document.getElementById('wishlist-btn').addEventListener('click', () => {
  alert(`Your wishlist contains ${wishlist.length} items:\n` + wishlist.map(p => p.name).join('\n'));
});

// -----------------------------
// RENDER PRODUCTS
// -----------------------------
const productsGrid = document.getElementById('products-grid');
function renderProducts(filter='all') {
  productsGrid.innerHTML = '';
  let filtered = products;
  if(filter !== 'all') {
    filtered = products.filter(p => p.members.includes(filter));
  }
  filtered.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card glass-effect p-4 rounded-3xl flex flex-col items-center transition-transform cursor-pointer';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}" class="w-64 h-64 object-contain mb-4">
      <h3 class="text-lg font-bold mb-2">${p.name}</h3>
      <p class="text-gray-300 mb-2">$${p.price}</p>
      <button class="px-4 py-2 rounded-full text-white font-bold hover:opacity-90 transition-all" style="background: linear-gradient(135deg, var(--accent), var(--teal));">Add to Wishlist</button>
    `;
    const btn = card.querySelector('button');
    btn.addEventListener('click', (e)=>{
      e.stopPropagation();
      if(!wishlist.some(item => item.id===p.id)) {
        wishlist.push(p);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        updateWishlistCount();
      }
    });
    productsGrid.appendChild(card);
  });
}
renderProducts();

// -----------------------------
// MEMBER FILTER
// -----------------------------
document.getElementById('member-filter').addEventListener('change', e => {
  renderProducts(e.target.value);
});

// -----------------------------
// QUIZ LOGIC
// -----------------------------
const quizQuestions = [
  { question: "What's your ideal weekend activity?", options: [
      { text: "Chill with friends", member: "Chaewon" },
      { text: "Shop & fashion", member: "Sakura" },
      { text: "Study or work", member: "Yunjin" },
      { text: "Dance & practice", member: "Kazuha" },
      { text: "Try something new", member: "Eunchae" },
  ]},
  { question: "Pick a favorite color:", options: [
      { text: "Purple", member: "Chaewon" },
      { text: "Pink", member: "Sakura" },
      { text: "Green", member: "Yunjin" },
      { text: "Teal", member: "Kazuha" },
      { text: "Red", member: "Eunchae" },
  ]},
  { question: "Your ideal snack?", options: [
      { text: "Chocolate", member: "Chaewon" },
      { text: "Cake", member: "Sakura" },
      { text: "Fruit", member: "Yunjin" },
      { text: "Cookies", member: "Kazuha" },
      { text: "Spicy snacks", member: "Eunchae" },
  ]}
];

const quizContainer = document.getElementById('quiz-container');
const quizStart = document.getElementById('quiz-start');
const quizQuestionsDiv = document.getElementById('quiz-questions');
const quizResultDiv = document.getElementById('quiz-result');
const resultMember = document.getElementById('result-member');

document.getElementById('start-quiz-btn').addEventListener('click', () => {
  quizStart.classList.add('hidden');
  quizQuestionsDiv.classList.remove('hidden');
  startQuiz();
});

document.getElementById('restart-quiz-btn').addEventListener('click', () => {
  quizResultDiv.classList.add('hidden');
  quizStart.classList.remove('hidden');
});

function startQuiz() {
  quizQuestionsDiv.innerHTML = '';
  let scores = {};
  members.forEach(m => scores[m]=0);

  quizQuestions.forEach((q, qi)=>{
    const qDiv = document.createElement('div');
    qDiv.className = 'mb-6';
    const qText = document.createElement('h4');
    qText.className = 'text-gray-300 mb-2';
    qText.textContent = q.question;
    qDiv.appendChild(qText);

    q.options.forEach(opt=>{
      const btn = document.createElement('button');
      btn.className = 'block w-full text-left mb-2 px-4 py-2 rounded-full hover:bg-gray-700 transition-all';
      btn.style.color = '#ffffff';
      btn.textContent = opt.text;
      btn.addEventListener('click', ()=>{
        scores[opt.member]++;
        qDiv.style.display='none';
        if(qi===quizQuestions.length-1){
          showResult(scores);
        }
      });
      qDiv.appendChild(btn);
    });
    quizQuestionsDiv.appendChild(qDiv);
  });
}

function showResult(scores){
  quizQuestionsDiv.classList.add('hidden');
  quizResultDiv.classList.remove('hidden');
  let maxScore = -1;
  let winner = '';
  for(const m in scores){
    if(scores[m]>maxScore){
      maxScore = scores[m];
      winner = m;
    }
  }
  resultMember.textContent = winner;
}
