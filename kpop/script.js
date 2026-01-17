
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
            "/kpop/phonecase/GROUP/0.png",
            "/kpop/phonecase/GROUP/1.png",
        ]
    },
    {
        id: 2,
        name: "Lightstick Keychain",
        type: "exclusive",
        description: "Adorable miniature lightstick keychain. Perfect for your keys or bag!",
        images: [
            "/kpop/lightstick/GROUP/0.png",
            "/kpop/lightstick/GROUP/1.png",
        ]
    },
    {
        id: 3,
        name: "Animal Icon Keychain",
        type: "exclusive",
        description: "Cute animal-themed keychain representing your bias's unique charm.",
        images: [
            "/kpop/animals/GROUP/0.png",
            "/kpop/animals/GROUP/1.png",
        
        ]
    },
    {
        id: 4,
        name: "Member Collage Style",
        type: "redbubble",
        description: "Cute collage style stickers and apparel.",
        images: [
            "/kpop/collage/GROUP/0.png",
            "/kpop/collage/GROUP/2.png",
            "/kpop/collage/GROUP/3.png",
            "/kpop/collage/GROUP/4.png",
            "/kpop/collage/GROUP/5.png",
            "/kpop/collage/GROUP/6.png",
            "/kpop/collage/GROUP/7.png",
            
        ],
        redbubbleLink: "https://www.redbubble.com/people/YOUR-SHOP/works/comeback-stickers"
    },
    {
        id: 5,
        name: "Autographics Collection",
        type: "redbubble",
        description: "Signature-style graphics perfect for laptops, notebooks, and more.",
        images: [
            "/kpop/autographics/GROUP/0.png",
            "/kpop/autographics/GROUP/2.png",
            "/kpop/autographics/GROUP/3.png",
            "/kpop/autographics/GROUP/4.png"
        ],
        redbubbleLink: "https://www.redbubble.com/people/YOUR-SHOP/works/autographics"
    },
    {
        id: 6,
        name: "Hangul Name Art",
        type: "redbubble",
        description: "Beautiful Korean typography featuring group names in Hangul.",
        images: [
            "/kpop/hangul/GROUP/0.png",
            "/kpop/hangul/GROUP/1.png",
            "/kpop/hangul/GROUP/2.png",
            "/kpop/hangul/GROUP/3.png",
            "/kpop/hangul/GROUP/4.png",
            "/kpop/hangul/GROUP/5.png",
            "/kpop/hangul/GROUP/6.png",
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
        currentBias ? img.replace('GROUP', currentBias) : img.replace('/GROUP', '')
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
        currentBias ? img.replace('GROUP', currentBias) : img.replace('/GROUP', '')
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
            { text: "Purple/Blue", answer: "A", groups: ["ONEUS", "IZNA"] },
            { text: "Pink/Red", answer: "B", groups: ["LESSERAFIM", "STAYC"] },
            { text: "Green/Yellow", answer: "C", groups: ["ONEUS", "STAYC"] },
            { text: "Black/White", answer: "D", groups: ["IZNA"] }
        ]
    },
    {
        question: "Are you an introvert or extrovert?",
        options: [
            { text: "Introvert - I recharge alone", answer: "A", groups: ["ONEUS", "IZNA"] },
            { text: "Extrovert - I love being around people", answer: "B", groups: ["LESSERAFIM", "STAYC"] }
        ]
    },
    {
        question: "Down to earth or head in the clouds?",
        options: [
            { text: "Down to earth - practical and grounded", answer: "A", groups: ["ONEUS", "STAYC"] },
            { text: "Head in the clouds - dreamy and imaginative", answer: "B", groups: ["LESSERAFIM", "IZNA"] }
        ]
    },
    {
        question: "Do you lead with your head or heart?",
        options: [
            { text: "Head - logic and reason", answer: "A", groups: ["ONEUS", "IZNA"] },
            { text: "Heart - feelings and intuition", answer: "B", groups: ["LESSERAFIM", "STAYC"] }
        ]
    },
    {
        question: "Order or chaos?",
        options: [
            { text: "Order - I love organization and structure", answer: "A", groups: ["ONEUS", "STAYC"] },
            { text: "Chaos - spontaneity is exciting!", answer: "B", groups: ["LESSERAFIM", "IZNA"] }
        ]
    },
    {
        question: "What's your favorite animal?",
        options: [
            { text: "Cat", answer: "A", groups: ["ONEUS"] },
            { text: "Dog", answer: "B", groups: ["LESSERAFIM"] },
            { text: "Rabbit", answer: "C", groups: ["IZNA"] },
            { text: "Bird", answer: "D", groups: ["STAYC"] }
        ]
    }
];

// Group profiles
const groups = {
    ONEUS: {
        name: "ONEUS",
        color: "#105B87",
        secondaryColor: "#00966C",
        image: "/kpop/ONEUS-profile.png",
        heroImage: "/kpop/hero/ONEUS.png",
        fallbackImage: "/kpop/blanks/ONEUS.png",
        playlistId: "PLqyKQU80K0fGDkP_Dp_Lwz_mCO0trA1DO",
        fandom: "Tomoon",
    },
    LESSERAFIM: {
        name: "LESSERAFIM",
        color: "#000558",
        secondaryColor: "#75A2D8",
        image: "/kpop/LESSERAFIM-profile.png",
        heroImage: "/kpop/hero/LESSERAFIM.png",
        fallbackImage: "/kpop/blanks/LESSERAFIM.png",
        playlistId: "PLqyKQU80K0fGVVVIt9YmgkD6Rfcf6eZP-",
        fandom: "Fearnot"
    },
    IZNA: {
        name: "IZNA",
        color: "#980A54",
        secondaryColor: "#F6F5AE",
        image: "/kpop/IZNA-profile.png",
        heroImage: "/kpop/hero/IZNA.png",
        fallbackImage: "/kpop/blanks/IZNA.png",
        playlistId: "PLqyKQU80K0fG6PSSaZvLSPTFbQyyT05LR",
        fandom: "naya"
    },
    STAYC: {
        name: "STAYC",
        color: "#f63e7b",
        secondaryColor: "#e059e7",
        image: "/kpop/STAYC-profile.png",
        heroImage: "/kpop/hero/STAYC.png",
        fallbackImage: "/kpop/blanks/STAYC.png",
        playlistId: "PLqyKQU80K0fE0vi2qlYB8FF87ggJHnkX_",
        fandom: "swith"
    },
    STRAYKIDS: {
        name: "STRAYKIDS",
        color: "#BC1111",
        secondaryColor: "#412446",
         accent: "#bbbbc7",
        image: "/kpop/STRAYKIDS-profile.png",
        heroImage: "/kpop/hero/STRAYKIDS.png",
        fallbackImage: "/kpop/blanks/STRAYKIDS.png",
        playlistId: "PLqyKQU80K0fHriYcAWjp6_UtY5P0ggdFH",
        fandom: "stay"
    },
    AESPA: {
        name: "AESPA",
        color: "#BD93E9",
        secondaryColor: "#8CEAEE",
        image: "/kpop/AESPA-profile.png",
        heroImage: "/kpop/hero/AESPA.png",
        fallbackImage: "/kpop/blanks/AESPA.png",
        playlistId: "PLqyKQU80K0fGoyzyge6v38Mjq-JtGyQfj",
        fandom: "MY"
    },
    ILLIT: {
        name: "ILLIT",
        color: "#F1057D",
        secondaryColor: "#FFB3D9",
        image: "/kpop/ILLIT-profile.png",
        heroImage: "/kpop/hero/ILLIT.png",
        fallbackImage: "/kpop/blanks/ILLIT.png",
        playlistId: "PLqyKQU80K0fEcZWhFwjhCLLIAIVMmcUGn",
        fandom: "Gllit"
    },
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

    if (!groups[bias]) {
        // Reset
        root.style.setProperty('--primary-color', ALL_THEME.primary);
        root.style.setProperty('--secondary-color', ALL_THEME.secondary);
        document.getElementById('mainTitle').textContent = 'Discover';
        document.getElementById('mainSubtitle').textContent =
            'Show your bias some love with exclusive merch';
        document.getElementById('heroBadge').textContent = 'Collection';
        heroImg.style.display = 'none';
        heroImg.src = '';
        return;
    }

    root.style.setProperty('--primary-color', groups[bias].color);
    root.style.setProperty('--secondary-color', groups[bias].secondaryColor);
    root.style.setProperty('--accent', groups[bias].accent);
    root.style.setProperty('--contrast', groups[bias].contrast);
    document.getElementById('mainTitle').textContent = groups[bias].shoptitle;
    document.getElementById('mainSubtitle').textContent = `Sunnie Jae designs for ${groups[bias].fandom}`;
    document.getElementById('heroBadge').textContent = `${groups[bias].name} Collection`;
    heroImg.src = groups[bias].heroImage;
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
            ? product.images[0].replace('GROUP', currentBias)
            : product.images[0].replace('/GROUP', '');

        const fallbackText = currentBias
            ? groups[currentBias]?.name
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
                    ${product.type === 'exclusive' ? '♡' : '💿'}
                </div>
            </div>
            <div class="product-info">
                <span class="product-type">
                    ${product.type === 'exclusive' ? '🎧 Exclusive' : '💿 Redbubble'}
                </span>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
            </div>
            <div class="product-actions">
                ${product.type === 'exclusive'
                    ? `<button class="btn btn-primary">♡ Add to Wishlist</button>`
                    : `<button class="btn btn-primary">Shop Now</button>`
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
        biasName: currentBias ? groups[currentBias]?.name : 'No bias selected'
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
                <h3>${type === 'exclusive' ? '🎧 Exclusive' : '💿 Redbubble'} (${items.length})</h3>
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
    quizAnswers[questionIndex] = q.options[optionIndex].groups;

    const container = document.getElementById('quizContent');
    container.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
    container.querySelectorAll('.quiz-option')[optionIndex].classList.add('selected');

    setTimeout(() => renderQuiz(questionIndex + 1), 400);
}

function showQuizResult() {
    const groupCount = {};
    Object.values(quizAnswers).forEach(groupsArr => groupsArr.forEach(group => {
        groupCount[group] = (groupCount[group] || 0) + 1;
    }));

    const maxCount = Math.max(...Object.values(groupCount));
    const winners = Object.keys(groupCount).filter(m => groupCount[m] === maxCount);
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
            <h2>${groups[result]?.name || result}! ♡</h2>
            <img src="${groups[result]?.image}" alt="${groups[result]?.name}" onerror="this.style.display='none'">
            <p>Perfect match! The shop theme has been updated to ${groups[result]?.name}. Start shopping for exclusive ${groups[result]?.name} merchandise!</p>
            <button class="btn btn-primary" onclick="closeQuiz()" style="width: 100%;">Start Shopping!</button>
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
                    ${currentBias ? 'Play ' + groups[currentBias]?.name + ' music' : 'Click to play music'}
                </div>
            </div>
        `;
    } else {
        const playlistId = currentBias && groups[currentBias]?.playlistId ? groups[currentBias].playlistId : 'PLrEnWoR732-BHrPp_Pm8_VleD68f9s14-';
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