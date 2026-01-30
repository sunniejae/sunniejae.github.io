/* ===============================
   DATA
================================ */
const products = [
  {
    id: 1,
    name: "Phone Case",
    type: "exclusive",
    description: "Premium phone case featuring your bias! Custom designed with exclusive artwork.",
    images: [
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/kpop/phonecase/GROUP/0.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/kpop/phonecase/GROUP/1.png",
    ]
  },
  {
    id: 2,
    name: "Lightstick Keychain",
    type: "exclusive",
    description: "Adorable miniature lightstick keychain. Perfect for your keys or bag!",
    images: [
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/kpop/lightstick/GROUP/0.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/kpop/lightstick/GROUP/1.png",
    ]
  },
  {
    id: 3,
    name: "Animal Icon Keychain",
    type: "exclusive",
    description: "Cute animal-themed keychain representing your bias's unique charm.",
    images: [
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/kpop/animals/GROUP/0.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/kpop/animals/GROUP/1.png",
    ]
  },
  {
    id: 4,
    name: "Member Collage Style",
    type: "redbubble",
    description: "Cute collage style stickers and apparel.",
    images: [
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/kpop/collage/IZNA/0.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/kpop/collage/IZNA/1.JPG",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/kpop/collage/IZNA/2.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/kpop/collage/IZNA/3.jpg",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/kpop/collage/IZNA/4.jpg",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/kpop/collage/IZNA/5.jpg",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/kpop/collage/IZNA/6.jpg",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/kpop/collage/IZNA/7.jpg",
    ],
    redbubbleLink: "https://www.redbubble.com/people/YOUR-SHOP/works/comeback-stickers"
  },
  {
    id: 5,
    name: "Autographics Collection",
    type: "redbubble",
    description: "Signature-style graphics perfect for laptops, notebooks, and more.",
    images: [
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/kpop/autographics/GROUP/0.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/kpop/autographics/GROUP/2.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/kpop/autographics/GROUP/3.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/kpop/autographics/GROUP/4.png"
    ],
    redbubbleLink: "https://www.redbubble.com/people/YOUR-SHOP/works/autographics"
  },
  {
    id: 6,
    name: "Hangul Name Art",
    type: "redbubble",
    description: "Beautiful Korean typography featuring group names in Hangul.",
    images: [
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/kpop/hangul/GROUP/0.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/kpop/hangul/GROUP/1.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/kpop/hangul/GROUP/2.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/kpop/hangul/GROUP/3.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/kpop/hangul/GROUP/4.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/kpop/hangul/GROUP/5.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/kpop/hangul/GROUP/6.png",
    ],
    redbubbleLink: "https://www.redbubble.com/people/sunniejae/shop?artistUserName=SunnieJae&collections=4422836&iaCode=all-departments&sortOrder=top%20selling"
  }
];

/* ===============================
   GROUP DATA
================================ */
const groups = {
ONEUS: { name: "ONEUS", color: "#00966C", secondaryColor: "#105B87", accent: "#f6f1e9", contrast: "#c3c3c762", heroImage: "https://sunniejae.blob.core.windows.net/sunniejae/assets/kpop/hero/ONEUS.png", fandom: "Tomoon" },

  LESSERAFIM: { name: "LESSERAFIM", color: "#75A2D8", secondaryColor: "#000558", accent: "#767b91", contrast: "#D6FFF6", heroImage: "https://sunniejae.blob.core.windows.net/sunniejae/assets/kpop/hero/LESSERAFIM.png", fandom: "Fearnot" },
  IZNA: { name: "IZNA", color: "#F6F5AE", secondaryColor: "#980A54", accent: "#AB92BF",contrast: "#CEABB1", heroImage: "https://sunniejae.blob.core.windows.net/sunniejae/assets/kpop/hero/IZNA.png", fandom: "naya" },

  STAYC: { name: "STAYC", color: "#f63e7b", secondaryColor: "#e059e7", accent: "#CCD6EB",contrast: "#00FFC5", heroImage: "https://sunniejae.blob.core.windows.net/sunniejae/assets/kpop/hero/STAYC.png", fandom: "swith" },

  STRAYKIDS: { name: "STRAYKIDS", color: "#BC1111", secondaryColor: "#412446", accent: "#f6f1e9",contrast: "#909595", heroImage: "https://sunniejae.blob.core.windows.net/sunniejae/assets/kpop/hero/STRAYKIDS.png", fandom: "stay" },

  AESPA: { name: "AESPA", color: "#8CEAEE", secondaryColor: "#BD93E9", accent: "#395AE6", contrast: "#FD43ED",heroImage: "https://sunniejae.blob.core.windows.net/sunniejae/assets/kpop/hero/AESPA.png", fandom: "MY" },

  ILLIT: { name: "ILLIT", color: "#FFB3D9", secondaryColor: "#F1057D", accent: "#7F7EFF",contrast: "#9DFFF9", heroImage: "https://sunniejae.blob.core.windows.net/sunniejae/assets/kpop/hero/ILLIT.png", fandom: "Gllit" },
};

/* ===============================
   STATE
================================ */
let currentBias = localStorage.getItem('selectedBias') || '';
let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
let quizAnswers = {};
let playlistExpanded = localStorage.getItem('playlistExpanded') === 'true';
let activeProduct = null;
let carouselIndex = 0;

/* ===============================
   INIT
================================ */
document.addEventListener('DOMContentLoaded', () => {
  if (currentBias) {
    document.getElementById('biasSelector').value = currentBias;
    updateTheme(currentBias);
  }
  renderProducts();
  updateWishlistCount();
  updatePlaylist();
  syncWishlistToHubSpot();
});

/* ===============================
   THEME UPDATE
================================ */
function updateTheme(bias) {
  const root = document.documentElement;
  const heroImg = document.getElementById('heroImage');

  if (!groups[bias]) {
    root.style.setProperty('--primary-color', '#1db954');
    root.style.setProperty('--secondary-color', '#1ed760');
    root.style.setProperty('--accent', '#9a9dfe');
    root.style.setProperty('--contrast', 'rgba(255, 183, 80');
    document.getElementById('mainTitle').textContent = 'Discover';
    document.getElementById('mainSubtitle').textContent = 'Show your bias some love with exclusive merch';
    document.getElementById('heroBadge').textContent = 'Collection';
    heroImg.style.display = 'none';
    return;
  }

  root.style.setProperty('--primary-color', groups[bias].color);
  root.style.setProperty('--secondary-color', groups[bias].secondaryColor);
  root.style.setProperty('--accent', groups[bias].accent);
  root.style.setProperty('--contrast', groups[bias].contrast);
  document.getElementById('mainTitle').textContent = groups[bias].name;
  document.getElementById('mainSubtitle').textContent = `Sunnie Jae designs for ${groups[bias].fandom}`;
  document.getElementById('heroBadge').textContent = `${groups[bias].name} Collection`;
  heroImg.src = groups[bias].heroImage;
  heroImg.style.display = 'block';
}

/* ===============================
   BIAS SELECTOR
================================ */
document.getElementById('biasSelector').addEventListener('change', (e) => {
  currentBias = e.target.value;
  localStorage.setItem('selectedBias', currentBias);
  updateTheme(currentBias);
  renderProducts();
  updatePlaylist();
});

/* ===============================
   PRODUCT RENDERING
================================ */
function renderProducts() {
  const productGrid = document.getElementById("productGrid");
  productGrid.innerHTML = "";

  products.forEach(p => productGrid.appendChild(createProductCard(p)));
}

function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";

  const imagePath = currentBias ? product.images[0].replace("GROUP", currentBias) : product.images[0].replace("GROUP/", "");

  card.innerHTML = `
    <div class="product-image-container">
      <img class="product-image" src="${imagePath}" alt="${product.name}">
    </div>
    <div class="product-info">
      <div class="product-title">${product.name}</div>
      <div class="product-description">${product.description}</div>
      <div class="product-actions"></div>
    </div>
  `;

  card.querySelector('.product-image-container').addEventListener('click', () => openProductModal(product));

  const actionBtn = document.createElement("button");
  actionBtn.className = "btn btn-primary";
  actionBtn.textContent = product.type === "exclusive" ? "Add to Wishlist" : "Shop on Redbubble";
  actionBtn.addEventListener('click', () => {
    if (product.type === "exclusive") addToWishlist(product.id);
    else window.open(product.redbubbleLink, "_blank");
  });

  card.querySelector(".product-actions").appendChild(actionBtn);
  return card;
}

/* ===============================
   CAROUSEL MODAL
================================ */
function openProductModal(product) {
  activeProduct = product;
  carouselIndex = 0;

  const images = product.images.map(img => currentBias ? img.replace("GROUP", currentBias) : img.replace("GROUP/", ""));

  const container = document.getElementById('productModalContent');
  container.innerHTML = `
    <h2>${product.name}</h2>
    <div class="carousel">
      <button class="carousel-btn left" onclick="changeSlide(-1)">‹</button>

      <div class="carousel-slide">
        <img id="carouselImage" src="${images[0]}" class="carousel-main-image">
        <button class="add-version-btn" onclick="addThisVersion()">Add this version</button>
      </div>

      <button class="carousel-btn right" onclick="changeSlide(1)">›</button>
    </div>

    <div class="carousel-dots">
      ${images.map((_, i) => `<span class="carousel-dot ${i === 0 ? 'active' : ''}" onclick="goToSlide(${i})"></span>`).join('')}
    </div>

    <p>${product.description}</p>
  `;

  document.getElementById('productModal').classList.add('active');
}


function closeProductModal() {
  document.getElementById('productModal').classList.remove('active');
}

function changeSlide(direction) {
  const total = activeProduct.images.length;
  carouselIndex = (carouselIndex + direction + total) % total;
  updateCarousel();
}

function goToSlide(index) {
  carouselIndex = index;
  updateCarousel();
}

function updateCarousel() {
  const images = activeProduct.images.map(img => currentBias ? img.replace("GROUP", currentBias) : img.replace("GROUP/", ""));
  document.getElementById('carouselImage').src = images[carouselIndex];

  document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === carouselIndex);
  });
}

/* ===============================
   WISHLIST + HUBSPOT
================================ */
function addToWishlist(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  wishlist.push({
    productId,
    name: product.name,
    type: product.type,
    group: currentBias || "No group selected",
    vers: carouselIndex || 0
  });

  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  updateWishlistCount();
  syncWishlistToHubSpot();
}

function updateWishlistCount() {
  const count = wishlist.length;
  document.getElementById('wishlistCount').textContent = count;
}

function openWishlist() {
  const modal = document.getElementById('wishlistModal');
  const content = document.getElementById('wishlistContent');

  if (!wishlist.length) {
    content.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:40px;">Your wishlist is empty.</p>';
    modal.classList.add('active');
    return;
  }

  content.innerHTML = wishlist.map((item, index) => `
    <div class="wishlist-item">
      <div>
        <strong>${item.name}</strong><br>
        <small style="color:var(--text-muted)">Group: ${item.group} • Vers: ${item.vers}</small>
      </div>
      <button class="remove-btn" onclick="removeFromWishlist(${index})">Remove</button>
    </div>
  `).join('');

  modal.classList.add('active');
  syncWishlistToHubSpot();
}

function closeWishlist() {
  document.getElementById('wishlistModal').classList.remove('active');
}

function removeFromWishlist(index) {
  wishlist.splice(index, 1);
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  updateWishlistCount();
  openWishlist();
}
function addThisVersion() {
  if (!activeProduct) return;

  const versionNumber = carouselIndex + 1;
  const productId = activeProduct.id;

  wishlist.push({
    productId,
    name: activeProduct.name,
    type: activeProduct.type,
    group: currentBias || "No group selected",
    vers: versionNumber
  });

  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  updateWishlistCount();
  syncWishlistToHubSpot();

  alert(`Added ${activeProduct.name} — version ${versionNumber}`);
}

/* ===============================
   HUBSPOT SYNC
================================ */
function getWishlistText() {
  if (!wishlist.length) return "";

  return wishlist.map(item => {
    return `${item.name} (Group: ${item.group} | Vers: ${item.vers})`;
  }).join(" | ");
}

function syncWishlistToHubSpot() {
  const iframe = document.querySelector("#hubspotForm iframe");
  if (!iframe) return;

  const value = getWishlistText();

  const interval = setInterval(() => {
    try {
      const doc = iframe.contentWindow.document;
      const field = doc.querySelector('input[name="wishlist_items"]');

      if (field) {
        field.value = value;
        clearInterval(interval);
      }
    } catch {
      // iframe not ready yet
    }
  }, 100);
}

/* ===============================
   ORDER FORM
================================ */
function submitOrder() {
  const name = document.getElementById('orderName').value.trim();
  const email = document.getElementById('orderEmail').value.trim();
  const subscribe = document.getElementById('subscribeCheck').checked;

  if (!name || !email) {
    alert('Please fill in your name and email!');
    return;
  }

  if (!wishlist.length) {
    alert('Your wishlist is empty!');
    return;
  }

  const wishlistText = wishlist
    .map((item, i) => `${i + 1}. ${item.name} (Group: ${item.group}, Vers: ${item.vers})`)
    .join('\n');

  const emailBody = `Name: ${name}\nEmail: ${email}\n\nWishlist:\n${wishlistText}\nSubscribe: ${subscribe ? 'Yes' : 'No'}`;

  window.location.href = `mailto:orders@sunniejae.com?subject=KPOP FANDOM SHOP ORDER&body=${encodeURIComponent(emailBody)}`;
}

/* ===============================
   QUIZ
================================ */
const quizQuestions = [
  { question: "What's your favorite color?", options: [ { text: "Purple/Blue", groups: ["ONEUS", "IZNA"] }, { text: "Pink/Red", groups: ["LESSERAFIM", "STAYC"] }, { text: "Green/Yellow", groups: ["ONEUS", "STAYC"] }, { text: "Black/White", groups: ["IZNA"] } ] },
  { question: "Introvert or extrovert?", options: [ { text: "Introvert", groups: ["ONEUS", "IZNA"] }, { text: "Extrovert", groups: ["LESSERAFIM", "STAYC"] } ] },
  { question: "Down to earth or dreamy?", options: [ { text: "Down to earth", groups: ["ONEUS", "STAYC"] }, { text: "Dreamy", groups: ["LESSERAFIM", "IZNA"] } ] },
  { question: "Head or heart?", options: [ { text: "Head", groups: ["ONEUS", "IZNA"] }, { text: "Heart", groups: ["LESSERAFIM", "STAYC"] } ] },
  { question: "Order or chaos?", options: [ { text: "Order", groups: ["ONEUS", "STAYC"] }, { text: "Chaos", groups: ["LESSERAFIM", "IZNA"] } ] },
  { question: "Favorite animal?", options: [ { text: "Cat", groups: ["ONEUS"] }, { text: "Dog", groups: ["LESSERAFIM"] }, { text: "Rabbit", groups: ["IZNA"] }, { text: "Bird", groups: ["STAYC"] } ] },
];

function openQuiz() {
  quizAnswers = {};
  renderQuiz(0);
  document.getElementById('quizModal').classList.add('active');
}

function closeQuiz() {
  document.getElementById('quizModal').classList.remove('active');
}

function renderQuiz(questionIndex) {
  const content = document.getElementById('quizContent');
  if (questionIndex >= quizQuestions.length) {
    showQuizResult();
    return;
  }

  const q = quizQuestions[questionIndex];
  content.innerHTML = `
    <h2>⟡ Bias Matching Quiz ⟡</h2>
    <div class="quiz-question">
      <h3>${q.question}</h3>
      <div class="quiz-options">
        ${q.options.map((opt, i) => `
          <div class="quiz-option" onclick="selectQuizAnswer(${questionIndex}, ${i})">${opt.text}</div>
        `).join('')}
      </div>
    </div>
  `;
}

function selectQuizAnswer(questionIndex, optionIndex) {
  const q = quizQuestions[questionIndex];
  quizAnswers[questionIndex] = q.options[optionIndex].groups;
  renderQuiz(questionIndex + 1);
}

function showQuizResult() {
  const groupCount = {};
  Object.values(quizAnswers).flat().forEach(group => groupCount[group] = (groupCount[group] || 0) + 1);
  const winner = Object.keys(groupCount).reduce((a, b) => groupCount[a] > groupCount[b] ? a : b);

  currentBias = winner;
  localStorage.setItem('selectedBias', winner);
  document.getElementById('biasSelector').value = winner;
  updateTheme(winner);
  renderProducts();

  const content = document.getElementById('quizContent');
  content.innerHTML = `
    <div class="quiz-result">
      <h2>Your Bias Match: ${groups[winner].name}</h2>
      <p>You match best with ${groups[winner].name}! The shop theme is updated.</p>
      <button class="btn btn-primary" onclick="closeQuiz()">Start Shopping</button>
    </div>
  `;
}

/* ===============================
   HOW TO ORDER
================================ */
function openHowToOrder() { document.getElementById('howToOrderModal').classList.add('active'); }
function closeHowToOrder() { document.getElementById('howToOrderModal').classList.remove('active'); }

/* ===============================
   PLAYLIST
================================ */
function openPlaylist() {
  playlistExpanded = true;
  localStorage.setItem('playlistExpanded', 'true');
  updatePlaylist();
}

function closePlaylist() {
  playlistExpanded = false;
  localStorage.setItem('playlistExpanded', 'false');
  updatePlaylist();
}

function updatePlaylist() {
  const container = document.getElementById('playlistContainer');

  if (!playlistExpanded) {
    container.innerHTML = `
      <div class="playlist-placeholder" onclick="openPlaylist()">
        <div style="font-size: 2em; margin-bottom: 8px;">🎵</div>
        <div style="font-size: 0.85em; color: var(--text-muted);">
          ${currentBias ? 'Play ' + groups[currentBias].name + ' music' : 'Click to play music'}
        </div>
      </div>
    `;
    return;
  }

  const playlistId = groups[currentBias]?.playlistId || "PLrEnWoR732-BHrPp_Pm8_VleD68f9s14-";

  container.innerHTML = `
    <iframe class="playlist-embed" src="https://www.youtube.com/embed/videoseries?list=${playlistId}" allowfullscreen></iframe>
    <button class="btn btn-close" onclick="closePlaylist()">Close</button>
  `;
}
