// Global wishlist
let wishlist = [];

/* ---------------- USER ID ---------------- */

function getUserId() {
  let id = localStorage.getItem('wishlistUserId');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('wishlistUserId', id);
  }
  return id;
}

/* ---------------- WISHLIST ---------------- */

function addToWishlist(item) {
  if (!wishlist.includes(item)) {
    wishlist.push(item);
    updateWishlistCount();
    saveWishlistToCloud();
  }
}

function updateWishlistCount() {
  const el = document.getElementById('wishlistCount');
  if (el) el.textContent = wishlist.length;
}

/* ---------------- MODAL ---------------- */

function openWishlist() {
  updateWishlist();
  document.getElementById('wishlistModal').style.display = 'flex';
}

function closeWishlist() {
  document.getElementById('wishlistModal').style.display = 'none';
}

function updateWishlist() {
  const ul = document.getElementById('wishlistItems');
  if (!ul) return;

  ul.innerHTML = '';
  wishlist.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    ul.appendChild(li);
  });
}

/* ---------------- CLOUD ---------------- */

async function saveWishlistToCloud(name = '', email = '') {
  await fetch('/api/wishlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: getUserId(),
      wishlist,
      name,
      email
    })
  });
}

async function loadWishlistFromCloud() {
  const res = await fetch(`/api/wishlist?userId=${getUserId()}`);
  if (!res.ok) return;

  const data = await res.json();
  wishlist = data.wishlist || [];
  updateWishlistCount();
}

/* ---------------- EMAIL ---------------- */

function requestOrder() {
  const name = document.getElementById('userName')?.value.trim();
  const email = document.getElementById('userEmail')?.value.trim();

  if (!name || !email || wishlist.length === 0) {
    alert('Please complete all fields and add items.');
    return;
  }

  saveWishlistToCloud(name, email);

  const body = encodeURIComponent(
    `User ID: ${getUserId()}\n\nWishlist:\n` +
    wishlist.map(i => `• ${i}`).join('\n')
  );

  window.open(
    `mailto:orders@sunniejae.com?subject=Wishlist Order&body=${body}`,
    '_blank'
  );
}

/* ---------------- INIT ---------------- */

document.addEventListener('DOMContentLoaded', loadWishlistFromCloud);
