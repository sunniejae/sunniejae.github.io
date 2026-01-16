
/* ===============================
   DATA
================================ */
// Product Database — note images array for carousel
const products = [
    {
        id: 1,
        name: "Phone Case",
        type: "exclusive",
        description: "Premium phone case featuring your bias! Custom designed with exclusive artwork.",
        images: [
            "/kpop/placeholders/blanks/MEMBER-1.png",
            "/kpop/placeholders/blanks/MEMBER-2.png",
            "/kpop/placeholders/blanks/MEMBER-3.png"
        ]
    },
    {
        id: 2,
        name: "Lightstick Keychain",
        type: "exclusive",
        description: "Adorable miniature lightstick keychain. Perfect for your keys or bag!",
        images: [
            "/kpop/placeholders/blanks/MEMBER-1.png",
            "/kpop/placeholders/blanks/MEMBER-2.png"
        ]
    },
    {
        id: 3,
        name: "Animal Icon Keychain",
        type: "exclusive",
        description: "Cute animal-themed keychain representing your bias's unique charm.",
        images: [
            "/kpop/placeholders/blanks/MEMBER-1.png",
            "/kpop/placeholders/blanks/MEMBER-2.png"
        ]
    },
    {
        id: 4,
        name: "Comeback Era Stickers",
        type: "redbubble",
        description: "Vibrant stickers from their latest comeback era. Collect them all!",
        images: [
            "/kpop/placeholders/blanks/MEMBER.png"
        ],
        redbubbleLink: "https://www.redbubble.com/people/YOUR-SHOP/works/comeback-stickers"
    },
    {
        id: 5,
        name: "Autographics Collection",
        type: "redbubble",
        description: "Signature-style graphics perfect for laptops, notebooks, and more.",
        images: [
            "/kpop/placeholders/blanks/MEMBER.png"
        ],
        redbubbleLink: "https://www.redbubble.com/people/YOUR-SHOP/works/autographics"
    },
    {
        id: 6,
        name: "Hangul Name Art",
        type: "redbubble",
        description: "Beautiful Korean typography featuring member names in Hangul.",
        images: [
            "/kpop/placeholders/hangul/MEMBER.png"
        ],
        redbubbleLink: "https://www.redbubble.com/people/YOUR-SHOP/works/hangul-names"
    }
];

//Carousel
let activeProduct = null;
let carouselIndex = 0;

function openProductModal(product) {
    activeProduct = product;
    carouselIndex = 0;

    const images = product.images.map(img =>
        currentBias ? img.replace('MEMBER', currentBias) : img.replace('/MEMBER', '')
    );

    const container = document.getElementById('productModalContent');
    container.innerHTML = `
        <h2>${product.name}</h2>
        <div class="carousel">
            <button class="carousel-btn left" onclick="changeSlide(-1)">‹</button>
            <img id="carouselImage" src="${images[0]}" class="carousel-main-image">
            <button class="carousel-btn right" onclick="changeSlide(1)">›</button>
        </div>
        <div class="carousel-dots">
            ${images.map((_, i) => `
                <span class="carousel-dot ${i === 0 ? 'active' : ''}" onclick="goToSlide(${i})"></span>
            `).join('')}
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
    const images = activeProduct.images.map(img =>
        currentBias ? img.replace('MEMBER', currentBias) : img.replace('/MEMBER', '')
    );

    document.getElementById('carouselImage').src = images[carouselIndex];

    document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === carouselIndex);
    });
}

// Quiz Questions
const quizQuestions = [
    {
        question: "What's your favorite color?",
        options: [
            { text: "Purple/Blue", answer: "A", members: ["ONE", "THREE"] },
            { text: "Pink/Red", answer: "B", members: ["TWO", "FOUR"] },
            { text: "Green/Yellow", answer: "C", members: ["ONE", "FOUR"] },
            { text: "Black/White", answer: "D", members: ["THREE"] }
        ]
    },
    {
        question: "Are you an introvert or extrovert?",
        options: [
            { text: "Introvert - I recharge alone", answer: "A", members: ["ONE", "THREE"] },
            { text: "Extrovert - I love being around people", answer: "B", members: ["TWO", "FOUR"] }
        ]
    },
    {
        question: "Down to earth or head in the clouds?",
        options: [
            { text: "Down to earth - practical and grounded", answer: "A", members: ["ONE", "FOUR"] },
            { text: "Head in the clouds - dreamy and imaginative", answer: "B", members: ["TWO", "THREE"] }
        ]
    },
    {
        question: "Do you lead with your head or heart?",
        options: [
            { text: "Head - logic and reason", answer: "A", members: ["ONE", "THREE"] },
            { text: "Heart - feelings and intuition", answer: "B", members: ["TWO", "FOUR"] }
        ]
    },
    {
        question: "Order or chaos?",
        options: [
            { text: "Order - I love organization and structure", answer: "A", members: ["ONE", "FOUR"] },
            { text: "Chaos - spontaneity is exciting!", answer: "B", members: ["TWO", "THREE"] }
        ]
    },
    {
        question: "What's your favorite animal?",
        options: [
            { text: "Cat", answer: "A", members: ["ONE"] },
            { text: "Dog", answer: "B", members: ["TWO"] },
            { text: "Rabbit", answer: "C", members: ["THREE"] },
            { text: "Bird", answer: "D", members: ["FOUR"] }
        ]
    }
];

// Member profiles
const members = {
    ONE: {
        name: "ONE",
        color: "#FF5470",
        secondaryColor: "#C71E27",
        image: "/kpop/placeholders/ONE-profile.png",
        heroImage: "/kpop/placeholders/hero/ONE.png",
        fallbackImage: "/kpop/placeholders/blanks/ONE.png",
        playlistId: "PLqyKQU80K0fE0vi2qlYB8FF87ggJHnkX_&si=nw6Wy84DNk1JwnLp"
    },
    TWO: {
        name: "TWO",
        color: "#9BB1FF",
        secondaryColor: "#6A8BD3",
        image: "/kpop/placeholders/TWO-profile.png",
        heroImage: "/kpop/placeholders/hero/TWO.png",
        fallbackImage: "/kpop/placeholders/blanks/TWO.png",
        playlistId: "PLrEnWoR732-BHrPp_Pm8_VleD68f9s14-"
    },
    THREE: {
        name: "THREE",
        color: "#FFC343",
        secondaryColor: "#FF6F00",
        image: "/kpop/placeholders/THREE-profile.png",
        heroImage: "/kpop/placeholders/hero/THREE.png",
        fallbackImage: "/kpop/placeholders/blanks/THREE.png",
        playlistId: "PLrEnWoR732-BHrPp_Pm8_VleD68f9s14-"
    },
    FOUR: {
        name: "FOUR",
        color: "#ff9800",
        secondaryColor: "#ffb74d",
        image: "/kpop/placeholders/FOUR-profile.png",
        heroImage: "/kpop/placeholders/hero/FOUR.png",
        fallbackImage: "/kpop/placeholders/blanks/FOUR.png",
        playlistId: "PLrEnWoR732-BHrPp_Pm8_VleD68f9s14-"
    },
    FIVE: {
        name: "FIVE",
        color: "#D0B3F9",
        secondaryColor: "#8D7FB6",
        image: "/kpop/placeholders/FIVE-profile.png",
        heroImage: "/kpop/placeholders/hero/FIVE.png",
        fallbackImage: "/kpop/placeholders/blanks/FIVE.png",
        playlistId: "PLrEnWoR732-BHrPp_Pm8_VleD68f9s14-"
    },
    SIX: {
        name: "SIX",
        color: "#FFB3D9",
        secondaryColor: "#F1057D",
        image: "/kpop/placeholders/SIX-profile.png",
        heroImage: "/kpop/placeholders/hero/SIX.png",
        fallbackImage: "/kpop/placeholders/blanks/SIX.png",
        playlistId: "PLrEnWoR732-BHrPp_Pm8_VleD68f9s14-"
    }
};

/* ===============================
   STATE
================================ */
let currentBias = localStorage.getItem('selectedBias') || '';
let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
let quizAnswers = {};
let playlistExpanded = localStorage.getItem('playlistExpanded') === 'true';
const DEFAULT_THEME = { primary: '#1db954', secondary: '#1ed760' };

/* ===============================
   INITIALIZATION
================================ */
document.addEventListener('DOMContentLoaded', () => {
    if (currentBias) {
        document.getElementById('biasSelector').value = currentBias;
        updateTheme(currentBias);
    }
    renderProducts();
    updateWishlistCount();
    updatePlaylist();
});

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
   THEME UPDATE
================================ */
function updateTheme(bias) {
    const root = document.documentElement;
    const heroImg = document.getElementById('heroImage');

    if (!members[bias]) {
        // Reset
        root.style.setProperty('--primary-color', DEFAULT_THEME.primary);
        root.style.setProperty('--secondary-color', DEFAULT_THEME.secondary);
        document.getElementById('mainTitle').textContent = 'Discover';
        document.getElementById('mainSubtitle').textContent =
            'Show your bias some love with exclusive merch';
        document.getElementById('heroBadge').textContent = 'Collection';
        heroImg.style.display = 'none';
        heroImg.src = '';
        return;
    }

    root.style.setProperty('--primary-color', members[bias].color);
    root.style.setProperty('--secondary-color', members[bias].secondaryColor);
    document.getElementById('mainTitle').textContent = members[bias].name;
    document.getElementById('mainSubtitle').textContent = `Exclusive ${members[bias].name} merchandise`;
    document.getElementById('heroBadge').textContent = `${members[bias].name} Collection`;
    heroImg.src = members[bias].heroImage;
    heroImg.style.display = 'block';
    heroImg.onerror = () => (heroImg.style.display = 'none');
}

/* ===============================
   RENDER PRODUCTS (with carousel)
================================ */
function renderProducts() {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = '';

    products.forEach(product => {
        const imagePath = currentBias
            ? product.images[0].replace('MEMBER', currentBias)
            : product.images[0].replace('/MEMBER', '');

        const fallbackText = currentBias
            ? members[currentBias]?.name
            : 'Select a bias';

        const card = document.createElement('div');
        card.className = 'product-card';

        card.innerHTML = `
            <div class="product-image-container">
                <img class="product-image" alt="${product.name}">
                <div class="product-image-fallback" style="display:none">
                    ${product.name}<br>
                    <small>${fallbackText}</small>
                </div>
                <div class="play-button">
                    ${product.type === 'exclusive' ? '♡' : '☘︎'}
                </div>
            </div>
            <div class="product-info">
                <span class="product-type">
                    ${product.type === 'exclusive' ? '🎧 Exclusive' : '☘︎ Redbubble'}
                </span>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
            </div>
            <div class="product-actions">
                ${product.type === 'exclusive'
                    ? `<button class="btn btn-primary">♡ Add to Wishlist</button>`
                    : `<button class="btn btn-primary">☘︎ Shop Now</button>`
                }
            </div>
        `;

        // Image + fallback
        const img = card.querySelector('.product-image');
        const fallback = card.querySelector('.product-image-fallback');
        img.src = imagePath;
        img.onerror = () => {
            img.style.display = 'none';
            fallback.style.display = 'flex';
        };

        // Carousel modal click
        const imageContainer = card.querySelector('.product-image-container');
        imageContainer.onclick = () => openProductModal(product);

        // Buttons logic remains unchanged
        const actionBtn = card.querySelector('.btn-primary');
        actionBtn.onclick = product.type === 'exclusive'
            ? () => addToWishlist(product.id)
            : () => window.open(product.redbubbleLink, '_blank');

        grid.appendChild(card);
    });
}
/* ===============================
   WISHLIST
================================ */
function addToWishlist(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const wishlistItem = {
        productId,
        name: product.name,
        type: product.type,
        bias: currentBias || 'no-bias',
        biasName: currentBias ? members[currentBias]?.name : 'No bias selected'
    };

    wishlist.push(wishlistItem);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
    alert(`⟡ ${product.name} added to wishlist!`);
}

function updateWishlistCount() {
    const count = wishlist.length;
    document.getElementById('wishlistCount').textContent = count;
    const mobileCount = document.getElementById('wishlistCountMobile');
    if (mobileCount) mobileCount.textContent = count;
}

function openWishlist() {
    const modal = document.getElementById('wishlistModal');
    const content = document.getElementById('wishlistContent');

    if (!wishlist.length) {
        content.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:40px;">Your wishlist is empty.</p>';
        modal.classList.add('active');
        return;
    }

    const grouped = wishlist.reduce((acc, item) => {
        acc[item.type] ??= [];
        acc[item.type].push(item);
        return acc;
    }, {});

    content.innerHTML = Object.entries(grouped)
        .map(([type, items]) => `
            <div class="wishlist-category">
                <h3>${type === 'exclusive' ? '🎧 Exclusive' : '☘︎ Redbubble'} (${items.length})</h3>
                ${items.map(item => `
                    <div class="wishlist-item">
                        <div>
                            <strong>${item.name}</strong><br>
                            <small style="color:var(--text-muted)">Bias: ${item.biasName}</small>
                        </div>
                        <button class="remove-btn" onclick="removeFromWishlist(${wishlist.indexOf(item)})">Remove</button>
                    </div>
                `).join('')}
            </div>
        `).join('');

    modal.classList.add('active');
}

function closeWishlist() {
    document.getElementById('wishlistModal').classList.remove('active');
}

function removeFromWishlist(index) {
    wishlist.splice(index, 1);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
    openWishlist(); // Refresh
}

function submitOrder() {
    const name = document.getElementById('orderName').value.trim();
    const email = document.getElementById('orderEmail').value.trim();
    const subscribe = document.getElementById('subscribeCheck').checked;

    if (!name || !email) { alert('Please fill in your name and email!'); return; }
    if (!wishlist.length) { alert('Your wishlist is empty!'); return; }

    const wishlistText = wishlist.map((item, i) => `${i + 1}. ${item.name} (${item.biasName})`).join('\n');
    const emailBody = `Name: ${name}\n\nEmail: ${email}\n\nWishlist:\n${wishlistText}\n\nSubscribe to emails: ${subscribe ? 'Yes' : 'No'}`;
    const mailtoLink = `mailto:orders@sunniejae.com?subject=KPOP FANDOM SHOP ORDER&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
}

/* ===============================
   QUIZ
================================ */
function openQuiz() { quizAnswers = {}; renderQuiz(0); document.getElementById('quizModal').classList.add('active'); }
function closeQuiz() { document.getElementById('quizModal').classList.remove('active'); }

function renderQuiz(questionIndex) {
    const content = document.getElementById('quizContent');
    if (questionIndex >= quizQuestions.length) { showQuizResult(); return; }

    const q = quizQuestions[questionIndex];
    content.innerHTML = `
        <h2>⟡ Bias Matching Quiz ⟡</h2>
        <div class="quiz-question">
            <h3>Question ${questionIndex + 1} of ${quizQuestions.length}</h3>
            <h3>${q.question}</h3>
            <div class="quiz-options">
                ${q.options.map((opt, i) => `
                    <div class="quiz-option" onclick="selectQuizAnswer(${questionIndex}, ${i})">
                        ${opt.text}
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function selectQuizAnswer(questionIndex, optionIndex) {
    const q = quizQuestions[questionIndex];
    quizAnswers[questionIndex] = q.options[optionIndex].members;

    const container = document.getElementById('quizContent');
    container.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
    container.querySelectorAll('.quiz-option')[optionIndex].classList.add('selected');

    setTimeout(() => renderQuiz(questionIndex + 1), 400);
}

function showQuizResult() {
    const memberCount = {};
    Object.values(quizAnswers).forEach(membersArr => membersArr.forEach(member => {
        memberCount[member] = (memberCount[member] || 0) + 1;
    }));

    const maxCount = Math.max(...Object.values(memberCount));
    const winners = Object.keys(memberCount).filter(m => memberCount[m] === maxCount);
    const result = winners[Math.floor(Math.random() * winners.length)];

    currentBias = result;
    localStorage.setItem('selectedBias', result);
    document.getElementById('biasSelector').value = result;
    updateTheme(result);
    renderProducts();

    const content = document.getElementById('quizContent');
    content.innerHTML = `
        <div class="quiz-result">
            <h2>Your Bias Match:</h2>
            <h2>${members[result]?.name || result}! ♡</h2>
            <img src="${members[result]?.image}" alt="${members[result]?.name}" onerror="this.style.display='none'">
            <p>Perfect match! The shop theme has been updated to ${members[result]?.name}. Start shopping for exclusive ${members[result]?.name} merchandise!</p>
            <button class="btn btn-primary" onclick="closeQuiz()" style="width: 100%;">☘︎ Start Shopping!</button>
        </div>
    `;
}

/* ===============================
   HOW TO ORDER MODAL
================================ */
function openHowToOrder() { document.getElementById('howToOrderModal').classList.add('active'); }
function closeHowToOrder() { document.getElementById('howToOrderModal').classList.remove('active'); }

/* ===============================
   PLAYLIST
================================ */
function openPlaylist() { playlistExpanded = true; localStorage.setItem('playlistExpanded', 'true'); updatePlaylist(); }
function closePlaylist() { playlistExpanded = false; localStorage.setItem('playlistExpanded', 'false'); updatePlaylist(); }

function updatePlaylist() {
    const container = document.getElementById('playlistContainer');
    if (!playlistExpanded) {
        container.innerHTML = `
            <div class="playlist-placeholder" onclick="openPlaylist()">
                <div style="font-size: 2em; margin-bottom: 8px;">🎵</div>
                <div style="font-size: 0.85em; color: var(--text-muted);">
                    ${currentBias ? 'Play ' + members[currentBias]?.name + ' music' : 'Click to play music'}
                </div>
            </div>
        `;
    } else {
        const playlistId = currentBias && members[currentBias]?.playlistId ? members[currentBias].playlistId : 'PLrEnWoR732-BHrPp_Pm8_VleD68f9s14-';
        container.innerHTML = `
            <iframe 
                class="playlist-embed"
                src="https://www.youtube.com/embed/videoseries?list=${playlistId}&autoplay=0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            ></iframe>
            <button class="btn btn-close" onclick="closePlaylist()">Close</button>
        `;
    }
}