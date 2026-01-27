/* ======================================================
   STAR RY JAE — HOMEPAGE CORE SCRIPT
   Cleaned, unified, conflict-free
   ====================================================== */

/* ===============================
   UTILITIES
================================ */

const $ = (id) => document.getElementById(id);
const todayKey = () => new Date().toDateString();

/* ===============================
   STARFIELD BACKGROUND
================================ */

function createStars() {
    const starfield = $('starfield');
    if (!starfield) return;

    const NUM_STARS = 100;
    starfield.innerHTML = '';

    for (let i = 0; i < NUM_STARS; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        starfield.appendChild(star);
    }
}

/* ===============================
   KLAVIYO — PAGE TRACKING
================================ */

function trackPageView() {
    if (!window.klaviyo) return;

    window.klaviyo.push(['track', 'Viewed Starry Jae Homepage']);

    const visits = Number(localStorage.getItem('starryjae_visit_count') || 0) + 1;
    localStorage.setItem('starryjae_visit_count', visits);

    if (visits > 1) {
        window.klaviyo.push(['track', 'Returning Visitor', { visits }]);
    }
}

/* ===============================
   SMOOTH SCROLL
================================ */

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

/* ===============================
   SCROLL ANIMATIONS
================================ */

function initObserver() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 1s ease-out forwards';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

    document.querySelectorAll('.feature-card, .zodiac-sign').forEach(el => observer.observe(el));
}

/* ===============================
   COSMIC PROMPTS
================================ */

const prompts = {
    general: [
        "What cosmic energy are you feeling most connected to today?",
        "How can you honor your sun sign’s strengths this week?",
        "What shadow aspects are calling for attention?",
        "Where are you being asked to trust the unknown?",
        "What alignment feels most true right now?"
    ],
    moonPhases: {
        newMoon: "New Moon — set intentions and begin anew.",
        waxingCrescent: "Waxing Crescent — take inspired action.",
        firstQuarter: "First Quarter — push through resistance.",
        waxingGibbous: "Waxing Gibbous — refine and realign.",
        fullMoon: "Full Moon — illuminate and release.",
        waningGibbous: "Waning Gibbous — reflect and give thanks.",
        lastQuarter: "Last Quarter — let go and forgive.",
        waningCrescent: "Waning Crescent — rest and restore."
    }
};

function getMoonPhase() {
    const knownNewMoon = new Date(2000, 0, 6, 18, 14);
    const cycle = 29.53058867;
    const days = (Date.now() - knownNewMoon) / (1000 * 60 * 60 * 24);
    const phase = (days % cycle) / cycle;

    if (phase < 0.03 || phase > 0.97) return 'newMoon';
    if (phase < 0.22) return 'waxingCrescent';
    if (phase < 0.28) return 'firstQuarter';
    if (phase < 0.47) return 'waxingGibbous';
    if (phase < 0.53) return 'fullMoon';
    if (phase < 0.72) return 'waningGibbous';
    if (phase < 0.78) return 'lastQuarter';
    return 'waningCrescent';
}

function displayPrompts() {
    const moonPhase = getMoonPhase();
    $('daily-prompt') && ($('daily-prompt').textContent = prompts.general[new Date().getDay() % prompts.general.length]);
    $('moon-prompt') && ($('moon-prompt').textContent = prompts.moonPhases[moonPhase]);
}
function initPromptClick() {
    const prompts = document.querySelectorAll('.prompt-text');
    const journalInput = $('journal-input');
    if (!journalInput) return;

    prompts.forEach(p => {
        p.addEventListener('click', () => {
            journalInput.value = `Prompt: "${p.textContent}"`;
        });
    });
}

/* ===============================
   DAILY TAROT CARD (ONE PER DAY)
================================ */

const DAILY_CARD_KEY = 'starryjae_daily_card';

// Your tarot deck array
const cardData = [
    { id: 0, name: "The Fool", image: "https://sunniejae.blob.core.windows.net/sunniejae/assets/tarot/0.png", meaning: "beginning, innocence, spontaneity, a free spirit" },

{ id: 1, name: "The Fool- Reversed", image: "https://sunniejae.blob.core.windows.net/sunniejae/assets/tarot/0r.png", meaning: "holding back, recklessness, risk taking" },

{ id: 2,name: "The Magician", image: "https://sunniejae.blob.core.windows.net/sunniejae/assets/tarot/1.png", meaning: "Manifestation, resourcefulness, power, inspired action" },

{ id: 3,name: "The Magician- Reversed", image: "https://sunniejae.blob.core.windows.net/sunniejae/assets/tarot/1r.png", meaning: "Manipulation, poor planning, untapped talent/potential" },

{ id: 4,name: "The High Priestess", image: "https://sunniejae.blob.core.windows.net/sunniejae/assets/tarot/2.png", meaning: "Intuition, sacred knowledge, the divine feminine, the subconscious mind" },

{ id: 5,name: "The High Priestess- Reversed", image: "https://sunniejae.blob.core.windows.net/sunniejae/assets/tarot/2r.png", meaning: "secrets, disconnection from intuition, withdrawal and silence." },

{ id: 6,name: "The Empress", image: "https://sunniejae.blob.core.windows.net/sunniejae/assets/tarot/3.png", meaning: "Femininity, beauty, nature, nurture, abundance." },

{ id: 7,name: "The Empress- Reversed", image: "https://sunniejae.blob.core.windows.net/sunniejae/assets/tarot/3r.png", meaning: "Creative blocks, dependencies" },

{ id: 8,name: "The High Priest", image: "https://sunniejae.blob.core.windows.net/sunniejae/assets/tarot/5.png", meaning: "Spiritual wisdom, conformity, tradition" },

{ id: 9, name: "The High Priest- Reversed", image: "https://sunniejae.blob.core.windows.net/sunniejae/assets/tarot/5r.png", meaning: "Personal beliefs, freedom, challenging the status quo." },

{ id: 10, name: "The Emperor", image: "https://sunniejae.blob.core.windows.net/sunniejae/assets/tarot/4.png", meaning: "Authority, establishment, structure" },

{ id: 11, name: "The Emperor- Reversed", image: "https://sunniejae.blob.core.windows.net/sunniejae/assets/tarot/4r.png", meaning: "Domination, lack of discipline, inflexibility." },


{ id: 12, name: "The Lovers", image: "https://sunniejae.blob.core.windows.net/sunniejae/assets/tarot/6.png", meaning: "Love, harmony, relationships, value alignment, choices" },

{ id: 13, name: "The Lovers- Reversed", image: "https://sunniejae.blob.core.windows.net/sunniejae/assets/tarot/6r.png", meaning: "Self love, disharmony, imbalance" },

{ id: 14, name: "The Chariot", image: "https://sunniejae.blob.core.windows.net/sunniejae/assets/tarot/7.png", meaning: "Control, willpower, success, action, determination" },

{ id: 15, name: "The Chariot- Reversed", image: "https://sunniejae.blob.core.windows.net/sunniejae/assets/tarot/7.png", meaning: "Self discipline, opposition, lack of direction" },

{ id: 16, name: "Strength", image: "https://sunniejae.blob.core.windows.net/sunniejae/assets/tarot/8.png", meaning: "Strength, courage, persuasion, influence, compassion" },

{ id: 17, name: "Strength- Reversed", image: "https://sunniejae.blob.core.windows.net/sunniejae/assets/tarot/8r.png", meaning: "Inner strength, self doubt, low energy, raw emotion" },

{ id: 18, name: "The Hermit", image: "https://sunniejae.blob.core.windows.net/sunniejae/assets/tarot/9.png", meaning: "Soul searching, introspection, being alone, inner guidance" },

{ id: 19, name: "The Hermit- Reversed", image: "https://sunniejae.blob.core.windows.net/sunniejae/assets/tarot/9r.png", meaning: "Isolation, loneliness, withdrawal" },

{ id: 20, name: "The Wheel of Fortune", image: "https://sunniejae.blob.core.windows.net/sunniejae/assets/tarot/10.png", meaning: "Good luck, karma, life cycles, destiny, turning point" },

{ id: 21, name: "The Wheel of Fortune- Reversed", image: "https://sunniejae.blob.core.windows.net/sunniejae/assets/tarot/10r.png", meaning: "Bad luck, resistance to change, breaking cycles" },

{ id: 22, name: "Justice", image: "https://sunniejae.blob.core.windows.net/sunniejae/assets/tarot/11.png", meaning: "Fairness, truth, cause and effect, law" },

{ id: 23, name: "Justice- Reversed", image: "https://sunniejae.blob.core.windows.net/sunniejae/assets/tarot/11r.png", meaning: "Unfairness, lack of accountability, dishonesty" },

{ id: 24, name: "The Hanged Man", image: "https://sunniejae.blob.core.windows.net/sunniejae/assets/tarot/12.png", meaning: "Pause, surrender, letting go, new perspectives" },

{ id: 25, name: "The Hanged Man- Reversed", image: "https://sunniejae.blob.core.windows.net/sunniejae/assets/tarot/12r.png", meaning: "Delays, resistance, indecision" },

{ id: 26, name: "Death", image: "https://sunniejae.blob.core.windows.net/sunniejae/assets/tarot/13.png", meaning: "Endings, change, transformation, transition" },

{ id: 27, name: "Death- Reversed", image: "https://sunniejae.blob.core.windows.net/sunniejae/assets/tarot/13r.png", meaning: "Resistance to change, personal transformation, inner purging" },

{ id: 28, name: "Temperance", image: "https://sunniejae.blob.core.windows.net/sunniejae/assets/tarot/14.png", meaning: "Balance, moderation, patience, purpose" },

{ id: 29, name: "Temperance- Reversed", image: "https://sunniejae.blob.core.windows.net/sunniejae/assets/tarot/14r.png", meaning: "Imbalance, Excess, Self Healing, Re-alignment" },

{ id: 30, name: "The Devil", image: "https://sunniejae.blob.core.windows.net/sunniejae/assets/tarot/15.png", meaning: "Shadow self, attachment, addiction, restriction, sexuality" },

{ id: 31, name: "The Devil- Reversed", image: "https://sunniejae.blob.core.windows.net/sunniejae/assets/tarot/15r.png", meaning: "Release of restraining beliefs, exploring darker thoughts, detachment" },

{ id: 32, name: "The Tower", image: "https://sunniejae.blob.core.windows.net/sunniejae/assets/tarot/16.png", meaning: "Sudden change, upheaval, chaos, revelation, awakening" },

{ id: 33, name: "The Tower- Reversed", image: "https://sunniejae.blob.core.windows.net/sunniejae/assets/tarot/16r.png", meaning: "Personal transformation, fear of change, averting disaster" },

{ id: 34, name: "The Star", image: "https://sunniejae.blob.core.windows.net/sunniejae/assets/tarot/17.png", meaning: "Hope, faith, purpose, renewal, spirituality" },

{ id: 35, name: "The Star- Reversed", image: "https://sunniejae.blob.core.windows.net/sunniejae/assets/tarot/17r.png", meaning: "Lack of faith, despair, self distrust, disconnection" },

{ id: 36, name: "The Moon", image: "https://sunniejae.blob.core.windows.net/sunniejae/assets/tarot/18.png", meaning: "Illusion, fear, anxiety, subconscious, intuition" },

{ id: 37, name: "The Moon- Reversed", image: "https://sunniejae.blob.core.windows.net/sunniejae/assets/tarot/18r.png", meaning: "Release of fear, repressed emotions, inner turmoil" },

{ id: 38, name: "The Sun", image: "https://sunniejae.blob.core.windows.net/sunniejae/assets/tarot/19.png", meaning: "Positivity, fun, warmth, success, vitality" },

{ id: 39, name: "The Sun- Reversed", image: "https://sunniejae.blob.core.windows.net/sunniejae/assets/tarot/19r.png", meaning: "Inner child, feeling down, excessive optimism" },

{ id: 40, name: "Judgement", image: "https://sunniejae.blob.core.windows.net/sunniejae/assets/tarot/20.png", meaning: "Judgement, rebirth, inner calling, absolution" },

{ id: 41, name: "Judgement- Reversed", image: "https://sunniejae.blob.core.windows.net/sunniejae/assets/tarot/20r.png", meaning: "Self doubt, inner critic" },

{ id: 42, name: "The World", image: "https://sunniejae.blob.core.windows.net/sunniejae/assets/tarot/21.png", meaning: "Completion, integration, accomplishment, travel" },

{ id: 43, name: "The World- Reversed", image: "https://sunniejae.blob.core.windows.net/sunniejae/assets/tarot/21r.png", meaning: "Delays, shortcuts, personal closure" },
        ];


function renderDailyCard(card) {
    $('daily-card-image').src = card.image;
    $('daily-card-name').textContent = card.name;
    $('daily-card-meaning').textContent = card.meaning;
}

function lockDailyCardButton() {
    const btn = $('draw-daily-card');
    if (!btn) return;
    btn.textContent = '✨ Card Drawn for Today';
    btn.disabled = true;
    btn.style.opacity = '0.6';
}

function loadDailyCard() {
    const saved = JSON.parse(localStorage.getItem(DAILY_CARD_KEY) || 'null');
    if (!saved || saved.date !== todayKey()) return false;

    const card = cardData.find(c => c.id === saved.cardId);
    if (!card) return false;

    renderDailyCard(card);
    lockDailyCardButton();
    return true;
}

function drawDailyCard() {
    const card = cardData[Math.floor(Math.random() * cardData.length)];
    localStorage.setItem(DAILY_CARD_KEY, JSON.stringify({ cardId: card.id, date: todayKey() }));

    renderDailyCard(card);
    lockDailyCardButton();

    window.klaviyo?.push(['track', 'Drew Daily Tarot Card', { card: card.name }]);
}

/* ===============================
   JOURNAL (LOCAL STORAGE)
================================ */

let journal = JSON.parse(localStorage.getItem('starryjae_journal') || '[]');

function saveJournalEntry() {
    const input = $('journal-input');
    if (!input.value.trim()) return;

    // Check if input starts with "Prompt: " and separate prompt from user notes
    let promptText = '';
    let userText = input.value.trim();

    if (userText.startsWith('Prompt:')) {
        const splitIndex = userText.indexOf('"', 8); // find the closing quote
        if (splitIndex !== -1) {
            promptText = userText.slice(0, splitIndex + 1);
            userText = userText.slice(splitIndex + 1).trim();
        }
    }

    journal.unshift({
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        prompt: promptText,
        content: userText
    });

    localStorage.setItem('starryjae_journal', JSON.stringify(journal));
    input.value = '';
    renderJournal();
}

function renderJournal() {
    const container = $('journal-entries');
    if (!container) return;

    if (!journal.length) {
        container.innerHTML = '<p style="color:var(--gray)">No entries yet.</p>';
        return;
    }

    container.innerHTML = journal
        .slice(0, 5)
        .map(e => `
        <div class="journal-entry">
            <div class="entry-header">
                <span class="entry-date">${e.date}</span>
            </div>
            ${e.prompt ? `<p class="entry-prompt"><strong>${e.prompt}</strong></p>` : ''}
            ${e.content ? `<p class="entry-content">${e.content}</p>` : ''}
        </div>
        `)
        .join('');
}


/* ===============================
   MEDIUM FEED
================================ */

async function loadMediumFeed() {
    const feed = $('medium-feed');
    if (!feed) return;

    try {
        const res = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@starryjae');
        const data = await res.json();

        feed.innerHTML = data.items.slice(0, 3).map(post => `
            <article class="blog-post">
                <h3>${post.title}</h3>
                <a href="${post.link}" target="_blank">Read →</a>
            </article>
        `).join('');
    } catch {
        feed.innerHTML = '<p style="color:var(--gray)">Unable to load posts.</p>';
    }
}

/* ===============================
   INIT
================================ */

document.addEventListener('DOMContentLoaded', () => {
    createStars();
    trackPageView();
    initSmoothScroll();
    initObserver();
    displayPrompts();    // populate prompts first
    initPromptClick();   // THEN attach click listeners
    loadDailyCard();

    $('draw-daily-card')?.addEventListener('click', drawDailyCard);
    $('save-entry')?.addEventListener('click', saveJournalEntry);

    renderJournal();
    loadMediumFeed();
});