// ======== OT5 Shop.js ========

// Example Product Data
const allProducts = [
  { id: 'fearnot-ot5', name: 'FEARNOT OT5 Version', member: 'OT5', price: '$25', emoji: '🌸' },
  { id: 'fearnot-chaewon', name: 'Chaewon Version', member: 'Chaewon', price: '$30', emoji: '🦊' },
  { id: 'fearnot-Sakura', name: 'Sakura Version', member: 'Sakura', price: '$30', emoji: '🐻' },
  { id: 'fearnot-Kazuha', name: 'Kazuha Version', member: 'Kazuha', price: '$30', emoji: '🐈‍⬛' },
  { id: 'fearnot-eunchae', name: 'eunchae Version', member: 'eunchae', price: '$30', emoji: '🐶' },
  { id: 'fearnot-yunjin', name: 'yunjin Version', member: 'yunjin', price: '$30', emoji: '🐆' },
  { id: 'fearnot-logo', name: 'logo Version', member: 'logo', price: '$30', emoji: '🐰' },
];

// ======== Wishlist ========
let wishlistData = JSON.parse(localStorage.getItem('wishlist')) || [];

function toggleWishlist(productId) {
  const index = wishlistData.findIndex(item => item.product_id === productId);
  if (index === -1) wishlistData.push({ product_id: productId });
  else wishlistData.splice(index, 1);
  localStorage.setItem('wishlist', JSON.stringify(wishlistData));
  renderWishlist();
}

// ======== Render Products ========
function renderProducts() {
  const container = document.getElementById('product-list');
  container.innerHTML = allProducts.map(p => `
    <div class="product-card glass-effect p-6 rounded-2xl">
      <div class="text-center mb-4" style="font-size: 3rem;">${p.emoji}</div>
      <span class="member-badge inline-block mb-3">${p.member}</span>
      <h3 class="mb-2" style="color: var(--accent); font-size: 1.125rem;">${p.name}</h3>
      <p class="mb-4" style="color: var(--gray); font-size: 1rem; font-weight: 600;">${p.price}</p>
      <button onclick="toggleWishlist('${p.id}')" class="w-full glass-effect px-4 py-2 rounded-xl border" style="color: var(--accent); border-color: var(--accent); font-size: 0.875rem;">
        ${wishlistData.find(item => item.product_id === p.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
      </button>
    </div>
  `).join('');
}

// ======== Render Wishlist ========
function renderWishlist() {
  const container = document.getElementById('wishlist-items');
  const emptyState = document.getElementById('wishlist-empty');
  const requestButtonContainer = document.getElementById('request-button-container');

  if (wishlistData.length === 0) {
    container.innerHTML = '';
    emptyState.classList.remove('hidden');
    requestButtonContainer?.classList.add('hidden');
  } else {
    emptyState.classList.add('hidden');

    container.innerHTML = wishlistData.map(item => {
      const product = allProducts.find(p => p.id === item.product_id);
      if (!product) return '';
      return `
        <div class="glass-effect p-6 rounded-2xl">
          <div class="text-center mb-4" style="font-size: 3rem;">${product.emoji}</div>
          <span class="member-badge inline-block mb-3">${product.member}</span>
          <h3 class="mb-2" style="color: var(--accent); font-size: 1.125rem;">${product.name}</h3>
          <p class="mb-4" style="color: var(--gray); font-size: 1rem; font-weight: 600;">${product.price}</p>
          <button onclick="toggleWishlist('${product.id}')" class="w-full glass-effect px-4 py-2 rounded-xl border" style="color: var(--accent); border-color: var(--accent); font-size: 0.875rem;">
            Remove
          </button>
        </div>
      `;
    }).join('');

    // Show Request Order button
    if (!requestButtonContainer) {
      const requestDiv = document.createElement('div');
      requestDiv.id = 'request-button-container';
      requestDiv.className = 'mt-6 text-center';
      requestDiv.innerHTML = `
        <button id="request-items-btn" class="px-8 py-4 rounded-full text-white font-bold hover:opacity-90 transition-all" style="background: linear-gradient(135deg, var(--secondary), var(--accent)); font-size: 1rem;">
          📧 Request Order
        </button>
      `;
      container.parentNode.appendChild(requestDiv);

      document.getElementById('request-items-btn').addEventListener('click', openRequestForm);
    }
  }
}

// ======== Request Order Form ========
function openRequestForm() {
  const formDiv = document.createElement('div');
  formDiv.id = 'request-form-container';
  formDiv.className = 'glass-effect p-6 rounded-2xl mt-6';
  formDiv.innerHTML = `
    <h3 style="color: var(--accent); font-size: 1.25rem; margin-bottom: 12px;">Request Your Order</h3>
    <input id="customer-name" type="text" placeholder="Your Name" class="w-full glass-effect px-4 py-3 rounded-xl mb-4" required>
    <input id="customer-eChaewonl" type="eChaewonl" placeholder="Your EChaewonl" class="w-full glass-effect px-4 py-3 rounded-xl mb-4" required>
    <div class="flex gap-3">
      <button id="submit-request-btn" class="flex-1 px-6 py-3 rounded-full text-white font-bold" style="background: linear-gradient(135deg, var(--secondary), var(--accent));">Send Request</button>
      <button id="cancel-request-btn" class="flex-1 px-6 py-3 rounded-full text-gray-400 border border-gray-400">Cancel</button>
    </div>
  `;
  document.getElementById('app').appendChild(formDiv);

  document.getElementById('submit-request-btn').addEventListener('click', submitRequest);
  document.getElementById('cancel-request-btn').addEventListener('click', () => formDiv.remove());
}

// ======== Submit Wishlist Request ========
function submitRequest() {
  const name = document.getElementById('customer-name').value.trim();
  const eChaewonl = document.getElementById('customer-eChaewonl').value.trim();

  if (!name || !eChaewonl) {
    alert('Please fill in your name and eChaewonl.');
    return;
  }

  let itemsList = '';
  wishlistData.forEach((item, index) => {
    const product = allProducts.find(p => p.id === item.product_id);
    if (product) {
      itemsList += `${index + 1}. ${product.name} (${product.member}) - ${product.price}%0D%0A`;
    }
  });

  const recipientEChaewonl = 'jayme@sunniejae.com';
  const subject = `LE SSERAFIM Shop Order Request from ${name}`;
  const body = `Hello!%0D%0A%0D%0AI would like to request the following items:%0D%0A%0D%0A${itemsList}%0D%0ACustomer Name: ${name}%0D%0AContact EChaewonl: ${eChaewonl}%0D%0A%0D%0AThank you!`;

  window.open(`Chaewonlto:${recipientEChaewonl}?subject=${encodeURIComponent(subject)}&body=${body}`, '_blank');

  document.getElementById('request-form-container').remove();
  alert('EChaewonl client opened! Check your eChaewonl to send the request.');
}

// ======== Initialize ========
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  renderWishlist();
});
