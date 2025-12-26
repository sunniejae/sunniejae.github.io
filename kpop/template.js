<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

<title>Fandom Shop</title>
<link rel="icon" href="assets/logo.png">

<style>
/* =========================
   ROOT / THEME
   ========================= */
:root {
  --primary:#9a9ad4;
  --accent:#3f3d7a;
  --white:#ffffff;
  --black:#000010;
  --gray:#666;

  --current-bg:var(--primary);
  --current-accent:var(--accent);
}

/* =========================
   RESET / BASE
   ========================= */
* {
  margin:0;
  padding:0;
  box-sizing:border-box;
}

body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  background:var(--current-bg);
  color:var(--black);
  line-height:1.4;
  transition:background 0.4s;
}

/* =========================
   HEADER (MOBILE-FIRST)
   ========================= */
.header {
  position:sticky;
  top:0;
  z-index:1000;
  background:#fff;
  padding:12px 16px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  box-shadow:0 2px 6px rgba(0,0,0,0.1);
}

.header-title {
  font-size:20px;
  font-weight:700;
}

.header-actions {
  display:flex;
  gap:12px;
  font-size:22px;
}

.bag-count {
  background:var(--current-accent);
  color:#fff;
  border-radius:999px;
  font-size:12px;
  padding:2px 7px;
  display:none;
}

/* =========================
   PROFILE
   ========================= */
.profile {
  padding:16px;
  text-align:center;
}

.profile img {
  width:96px;
  height:96px;
  border-radius:50%;
  object-fit:cover;
  background:#fff;
  margin-bottom:8px;
}

.profile h1 {
  font-size:28px;
  margin-bottom:4px;
}

.profile span {
  font-size:14px;
  color:var(--gray);
}

/* =========================
   ACTION BUTTONS
   ========================= */
.action-row {
  display:flex;
  gap:10px;
  padding:0 16px 16px;
}

.action-row button {
  flex:1;
  padding:10px;
  border-radius:999px;
  border:none;
  cursor:pointer;
  font-weight:600;
  background:linear-gradient(135deg,var(--current-accent),var(--current-bg));
  color:#fff;
}

/* =========================
   BIAS BUTTONS
   ========================= */
.bias-buttons {
  display:flex;
  flex-wrap:wrap;
  gap:8px;
  padding:0 16px 16px;
}

.bias-btn {
  padding:8px 14px;
  border-radius:999px;
  border:none;
  cursor:pointer;
  background:#fff;
  font-size:14px;
}

.bias-btn.active {
  background:var(--current-accent);
  color:#fff;
}

/* =========================
   PRODUCTS
   ========================= */
.products-grid {
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(140px,1fr));
  gap:16px;
  padding:16px;
}

.product-card {
  background:#fff;
  border-radius:14px;
  padding:10px;
  text-align:center;
}

.product-card img {
  width:100%;
  border-radius:10px;
  margin-bottom:8px;
}

.product-card h4 {
  font-size:14px;
  margin-bottom:6px;
}

.product-card button,
.product-card a {
  display:block;
  width:100%;
  margin-top:6px;
  padding:10px;
  border-radius:999px;
  border:none;
  background:linear-gradient(135deg,var(--current-accent),var(--current-bg));
  color:#fff;
  font-weight:600;
  text-decoration:none;
}

/* =========================
   WISHLIST
   ========================= */
#wishlist {
  padding:16px;
}

#wishlist textarea {
  width:100%;
  min-height:120px;
  border-radius:12px;
  padding:10px;
}

/* =========================
   MODALS
   ========================= */
.modal {
  display:none;
  position:fixed;
  inset:0;
  background:rgba(0,0,0,0.7);
  z-index:2000;
  justify-content:center;
  align-items:center;
  padding:16px;
}

.modal.active {
  display:flex;
}

.modal-content {
  background:#fff;
  border-radius:18px;
  padding:20px;
  width:100%;
  max-width:420px;
  max-height:85vh;
  overflow-y:auto;
  position:relative;
  animation:fadeIn 0.3s ease forwards;
}

.close-btn {
  position:absolute;
  top:12px;
  right:16px;
  border:none;
  background:none;
  font-size:22px;
  cursor:pointer;
}

/* =========================
   QUIZ
   ========================= */
#quiz-questions p {
  font-size:18px;
  margin-bottom:12px;
}

#quiz-questions button {
  width:100%;
  margin-bottom:8px;
  padding:12px;
  border-radius:12px;
  border:none;
  cursor:pointer;
  background:linear-gradient(135deg,var(--current-accent),var(--current-bg));
  color:#fff;
  font-weight:600;
}

/* =========================
   ANIMATIONS
   ========================= */
@keyframes fadeIn {
  from { opacity:0; transform:scale(0.95); }
  to { opacity:1; transform:scale(1); }
}
</style>
</head>

<body>

<!-- HEADER -->
<div class="header">
  <div class="header-title">Fandom Shop</div>
  <div class="header-actions">
    💖 <span id="bag-count" class="bag-count">0</span>
  </div>
</div>

<!-- PROFILE -->
<div class="profile">
  <img id="profile-pic" src="assets/profile-ot.png" alt="">
  <h1 id="profile-name">OT</h1>
  <span id="profile-subtitle">Fandom</span>
</div>

<!-- ACTIONS -->
<div class="action-row">
  <button onclick="openQuiz()">Bias Matcher ✨</button>
  <button onclick="openHowTo()">How to Order</button>
</div>

<!-- BIAS -->
<div class="bias-buttons" id="bias-buttons"></div>

<!-- PRODUCTS -->
<div class="products-grid" id="products-grid"></div>

<!-- WISHLIST -->
<div id="wishlist">
  <h3>Your Wishlist</h3>
  <textarea id="wishlist-items" readonly></textarea>
</div>

<!-- QUIZ MODAL -->
<div id="quiz-modal" class="modal" onclick="closeQuiz()">
  <div class="modal-content" onclick="event.stopPropagation()">
    <button class="close-btn" onclick="closeQuiz()">✕</button>
    <div id="quiz-questions"></div>
  </div>
</div>

<!-- HOW TO MODAL -->
<div id="howto-modal" class="modal" onclick="closeHowTo()">
  <div class="modal-content" onclick="event.stopPropagation()">
    <button class="close-btn" onclick="closeHowTo()">✕</button>

    <h2>How to Order</h2>
    <p>
      Products on this page are available via <strong>Redbubble</strong> or
      <strong>By Request</strong>.
    </p>

    <ul>
      <li>Items with links go directly to Redbubble</li>
      <li>Custom items → tap <strong>Add to Wishlist</strong></li>
      <li>Tap the 💖 or scroll down to review your wishlist</li>
    </ul>

    <p>
      For questions or custom requests, email
      <strong>Orders@SunnieJae.com</strong>
    </p>
  </div>
</div>

<script src="template.js"></script>
</body>
</html>
