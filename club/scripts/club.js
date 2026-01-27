/* =========================
   PASSWORD GATE
========================= */

const STORED_HASH = "81c4d66f638dcab2657a7544fab9ae6dd226c1e8d1de463e0d7a60893327dc45";

async function unlock() {
    const input = document.getElementById('password').value;
    const hashBuffer = await crypto.subtle.digest(
        'SHA-256',
        new TextEncoder().encode(input)
    );
    const hashHex = Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');

    if (hashHex === STORED_HASH) {
        document.getElementById('gate').style.display = 'none';
        document.getElementById('protected-content').style.display = 'block';
        drawCards();
    } else {
        alert('Incorrect password. Try again!');
    }
}

document.getElementById('unlock-btn').addEventListener('click', unlock);

/* =========================
   SPREAD DEFINITIONS
========================= */

const spreads = {
    "past-present-future": [
        { label: "Past", description: "Something that affects your current situation" },
        { label: "Present", description: "Your current state of mind" },
        { label: "Future", description: "What will come if nothing changes" }
    ],
    "yes-no": [
        { label: "Yes", description: "What if I said yes?" },
        { label: "No", description: "What if I said no?" },
        { label: "Maybe", description: "What if I stay undecided?" }
    ],
    "relationship": [
        { label: "You", description: "Your current feelings" },
        { label: "Partner", description: "Their current feelings" },
        { label: "Outcome", description: "Potential outcome" }
    ]
};

/* =========================
   DRAW CARDS (USING TAROTDECK.JS)
========================= */

function drawCards() {
    const cardEls = document.querySelectorAll('.card');
    const spreadType = document.getElementById('spread-type').value;
    const layout = spreads[spreadType];

    const drawnCards = drawMultipleCards(3); // 🔮 from tarotdeck.js

    cardEls.forEach((cardEl, i) => {
        const container = cardEl.querySelector('.card-image-container');
        const img = container.querySelector('.card-image');
        const label = cardEl.querySelector('.card-label');
        const meaning = cardEl.querySelector('.card-meaning');

        label.textContent = layout[i].label;
        meaning.textContent = layout[i].description;

        cardEl.dataset.frontImage = drawnCards[i].image;
        cardEl.dataset.meaning = drawnCards[i].meaning;

        container.classList.remove('flipped');
        img.src = "https://sunniejae.blob.core.windows.net/sunniejae/assets/tarot/card-back.png";

        container.onclick = () => {
            container.classList.toggle('flipped');
            if (container.classList.contains('flipped')) {
                img.src = cardEl.dataset.frontImage;
                meaning.textContent = cardEl.dataset.meaning;
            } else {
                img.src = "https://sunniejae.blob.core.windows.net/sunniejae/assets/tarot/card-back.png";
                meaning.textContent = layout[i].description;
            }
        };
    });
}

document.getElementById('shuffle-cards').addEventListener('click', drawCards);
document.getElementById('spread-type').addEventListener('change', drawCards);

/* =========================
   STARFIELD BACKGROUND
========================= */

function createStars(count = 150) {
    const stars = document.querySelector('.stars');
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.animationDuration = `${Math.random() * 3 + 2}s`;
        stars.appendChild(star);
    }
}

createStars();
