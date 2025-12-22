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

  const titleEl = document.getElementById('fandomTitle');
  if (titleEl) titleEl.textContent = config.title;

  const grid = document.getElementById('productGrid');
  if (!grid) return;

  grid.innerHTML = '';

  // Table header
  const thead = document.createElement('thead');
  thead.innerHTML = `
    <tr>
      <th>Collection</th>
      <th>Current Version</th>
      <th>Add to Wishlist</th>
    </tr>
  `;
  grid.appendChild(thead);

  const tbody = document.createElement('tbody');
  config.collections.forEach(collection => {
    tbody.appendChild(createCollectionRow(config.title, collection));
  });
  grid.appendChild(tbody);
}

document.addEventListener('DOMContentLoaded', loadFandom);

/* ================= COLLECTION ROW / CAROUSEL ================= */

function createCollectionRow(fandomName, collectionName) {
  let index = 0;
  const members = ['OT6','Chaewon','Sakura','Kazuha','Yunjin','Eunchae'];
  const versions = members.map(m => `${m} ${fandomName} ${collectionName}`);

  const tr = document.createElement('tr');

  const tdName = document.createElement('td');
  tdName.textContent = collectionName;
  tr.appendChild(tdName);

  const tdVersion = document.createElement('td');
  tdVersion.innerHTML = `<span data-member="${members[0]}">${versions[0]}</span>`;
  tr.appendChild(tdVersion);

  const tdButton = document.createElement('td');
  const btn = document.createElement('button');
  btn.textContent = 'Add to Wishlist';
  btn.onclick = () => addToWishlist(versions[index]);
  tdButton.appendChild(btn);
  tr.appendChild(tdButton);

  // Hover carousel
  tr.addEventListener('mouseenter', () => {
    tr.timer = setInterval(() => {
      index = (index + 1) % versions.length;
      const span = tdVersion.querySelector('span');
      span.textContent = versions[index];
      span.dataset.member = members[index];
    }, 800);
  });

  tr.addEventListener('mouseleave', () => {
    clearInterval(tr.timer);
    index = 0;
    const span = tdVersion.querySelector('span');
    span.textContent = versions[0];
    span.dataset.member = members[0];
  });

  return tr;
}
