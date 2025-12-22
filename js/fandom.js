/* ================= FAN CONFIG ================= */

const fandomConfig = {
  fearnot: {
    title: 'FEARNOT',
    collections: [
      'Sticker Pack',
      'Keychain'
    ]
  },
  naya: {
    title: 'NAYA',
    collections: [
      'Photocard Set',
      'Charm'
    ]
  },
  izna: {
    title: 'IZNA',
    collections: [
      'Badge',
      'Poster'
    ]
  }
};

/* ================= LOAD FAN PAGE ================= */

function loadFandom() {
  const fandom = document.body.dataset.fandom;
  const config = fandomConfig[fandom];
  if (!config) return;

  // Title
  const titleEl = document.getElementById('fandomTitle');
  if (titleEl) titleEl.textContent = config.title;

  // Product grid
  const grid = document.getElementById('productGrid');
  if (!grid) return;

  grid.innerHTML = '';

  config.collections.forEach(collection => {
    grid.appendChild(
      createCollectionCard(config.title, collection)
    );
  });
}

document.addEventListener('DOMContentLoaded', loadFandom);

/* ================= COLLECTION CARD ================= */

function createCollectionCard(fandomName, collectionName) {
  let index = 0;

  const members = [
    'OT6',
    'Chaewon',
    'Sakura',
    'Kazuha',
    'Yunjin',
    'Eunchae'
  ];

  const versions = members.map(
    m => `${m} ${fandomName} ${collectionName}`
  );

  const card = document.createElement('div');
  card.className = 'product';
  card.dataset.member = members[0];

  card.innerHTML = `
    <h3>${versions[0]}</h3>
    <button class="btn">Add to Wishlist</button>
  `;

  const title = card.querySelector('h3');
  const button = card.querySelector('button');

  // Add correct version to wishlist
  button.onclick = () => addToWishlist(versions[index]);

  // Hover = carousel
  card.addEventListener('mouseenter', () => {
    card.timer = setInterval(() => {
      index = (index + 1) % versions.length;
      title.textContent = versions[index];
      card.dataset.member = members[index];
    }, 800);
  });

  card.addEventListener('mouseleave', () => {
    clearInterval(card.timer);
    index = 0;
    title.textContent = versions[0];
    card.dataset.member = members[0];
  });

  return card;
}
