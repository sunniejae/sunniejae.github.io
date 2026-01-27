/* ========= STARFIELD ========= */
const starfield = document.getElementById('starfield');
for (let i = 0; i < 100; i++) {
  const s = document.createElement('div');
  s.className = 'star';
  s.style.left = Math.random() * 100 + '%';
  s.style.top = Math.random() * 100 + '%';
  s.style.width = s.style.height = Math.random() * 2 + 1 + 'px';
  starfield.appendChild(s);
}

/* ========= DAILY CARD ========= */
const cardData = [
  { id:0, name:"The Fool", image:"https://sunniejae.blob.core.windows.net/sunniejae/assets/tarot/0.png", meaning:"Beginnings, innocence, freedom" },
  { id:1, name:"The Magician", image:"https://sunniejae.blob.core.windows.net/sunniejae/assets/tarot/1.png", meaning:"Manifestation, power" },
  { id:2, name:"The High Priestess", image:"https://sunniejae.blob.core.windows.net/sunniejae/assets/tarot/2.png", meaning:"Intuition, mystery" }
];

const DAILY_KEY = 'starryjae_daily_card';

function drawDailyCard() {
  const card = cardData[Math.floor(Math.random() * cardData.length)];
  localStorage.setItem(DAILY_KEY, JSON.stringify({
    id: card.id,
    date: new Date().toDateString()
  }));
  showCard(card);
  lockButton();
}

function showCard(card) {
  document.getElementById('daily-card-image').src = card.image;
  document.getElementById('daily-card-name').textContent = card.name;
  document.getElementById('daily-card-meaning').textContent = card.meaning;
}

function lockButton() {
  const btn = document.getElementById('draw-daily-card');
  btn.textContent = 'Already Drawn Today';
  btn.disabled = true;
}

(function checkCard() {
  const saved = JSON.parse(localStorage.getItem(DAILY_KEY));
  if (!saved) return;
  if (saved.date === new Date().toDateString()) {
    const card = cardData.find(c => c.id === saved.id);
    if (card) {
      showCard(card);
      lockButton();
    }
  }
})();

document.getElementById('draw-daily-card')
  ?.addEventListener('click', drawDailyCard);

/* ========= JOURNAL ========= */
let entries = JSON.parse(localStorage.getItem('journal') || '[]');

function saveEntry() {
  const text = journalInput.value.trim();
  if (!text) return;
  entries.unshift({ text, date: new Date().toDateString() });
  localStorage.setItem('journal', JSON.stringify(entries));
  journalInput.value = '';
  renderEntries();
}

function renderEntries() {
  journalEntries.innerHTML = entries.map(e =>
    `<div class="blog-post"><strong>${e.date}</strong><p>${e.text}</p></div>`
  ).join('');
  streakCount.textContent = `${entries.length} day${entries.length !== 1 ? 's' : ''}`;
}

const journalInput = document.getElementById('journal-input');
const journalEntries = document.getElementById('journal-entries');
const streakCount = document.getElementById('streak-count');

document.getElementById('save-entry')?.addEventListener('click', saveEntry);
renderEntries();

/* ========= MEDIUM FEED ========= */
fetch("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@starryjae")
  .then(res => res.json())
  .then(data => {
    const feed = document.getElementById('medium-feed');
    feed.innerHTML = data.items.slice(0,3).map(post => `
      <div class="blog-post">
        <h3>${post.title}</h3>
        <p>${post.description.replace(/<[^>]*>/g,'').slice(0,120)}…</p>
        <a href="${post.link}" target="_blank">Read →</a>
      </div>
    `).join('');
  });

/* ========= NEWSLETTER ========= */
document.getElementById('newsletter-form')
  ?.addEventListener('submit', e => {
    e.preventDefault();
    alert("Subscribed ✨");
    e.target.reset();
  });
