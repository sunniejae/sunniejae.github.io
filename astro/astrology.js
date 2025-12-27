// Zodiac sign calculator
function getZodiacSign(longitude) {
    const signs = [
        'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
        'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
    ];
    const index = Math.floor(longitude / 30);
    return signs[index % 12];
}

// Calculate planetary positions using astronomy calculations
async function getCurrentPlanetaryPositions() {
    const now = new Date();
    const jd = getJulianDate(now);
    
    const planets = {
        'Sun': calculateSunPosition(jd),
        'Moon': calculateMoonPosition(jd),
        'Mercury': calculatePlanetPosition(jd, 'mercury'),
        'Venus': calculatePlanetPosition(jd, 'venus'),
        'Mars': calculatePlanetPosition(jd, 'mars'),
        'Jupiter': calculatePlanetPosition(jd, 'jupiter'),
        'Saturn': calculatePlanetPosition(jd, 'saturn'),
        'Uranus': calculatePlanetPosition(jd, 'uranus'),
        'Neptune': calculatePlanetPosition(jd, 'neptune'),
        'Chiron': calculateChironPosition(jd),
        'Lilith': calculateLilithPosition(jd),
        'North Node': calculateNorthNode(jd)
    };

    return planets;
}

// Julian Date calculation
function getJulianDate(date) {
    const a = Math.floor((14 - (date.getMonth() + 1)) / 12);
    const y = date.getFullYear() + 4800 - a;
    const m = (date.getMonth() + 1) + 12 * a - 3;
    
    let jd = date.getDate() + Math.floor((153 * m + 2) / 5) + 365 * y + 
             Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
    
    const hours = date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600;
    jd += (hours - 12) / 24;
    
    return jd;
}

// Sun position calculation
function calculateSunPosition(jd) {
    const n = jd - 2451545.0;
    const L = (280.460 + 0.9856474 * n) % 360;
    const g = (357.528 + 0.9856003 * n) % 360;
    const lambda = (L + 1.915 * Math.sin(g * Math.PI / 180) + 
                    0.020 * Math.sin(2 * g * Math.PI / 180)) % 360;
    return (lambda + 360) % 360;
}

// Moon position calculation
function calculateMoonPosition(jd) {
    const T = (jd - 2451545.0) / 36525;
    const L = (218.316 + 481267.881 * T) % 360;
    const M = (134.963 + 477198.867 * T) % 360;
    const F = (93.272 + 483202.017 * T) % 360;
    
    let lambda = L + 6.289 * Math.sin(M * Math.PI / 180);
    lambda = (lambda + 360) % 360;
    
    return lambda;
}

// Simplified planetary position calculations
function calculatePlanetPosition(jd, planet) {
    const T = (jd - 2451545.0) / 36525;
    const orbitalElements = {
        mercury: { L0: 252.25, L1: 149472.67, w: 77.45, e: 0.2056, a: 0.387 },
        venus: { L0: 181.98, L1: 58517.81, w: 131.53, e: 0.0068, a: 0.723 },
        mars: { L0: 355.45, L1: 19140.30, w: 336.04, e: 0.0934, a: 1.524 },
        jupiter: { L0: 34.40, L1: 3034.90, w: 14.75, e: 0.0484, a: 5.203 },
        saturn: { L0: 49.94, L1: 1222.11, w: 92.43, e: 0.0542, a: 9.537 },
        uranus: { L0: 314.05, L1: 428.46, w: 170.96, e: 0.0472, a: 19.191 },
        neptune: { L0: 304.35, L1: 218.46, w: 44.97, e: 0.0086, a: 30.069 }
    };
    
    const elem = orbitalElements[planet];
    const L = (elem.L0 + elem.L1 * T) % 360;
    const M = (L - elem.w) % 360;
    
    const E = M + (180 / Math.PI) * elem.e * Math.sin(M * Math.PI / 180);
    const v = 2 * Math.atan(Math.sqrt((1 + elem.e) / (1 - elem.e)) * 
                            Math.tan(E * Math.PI / 360)) * 180 / Math.PI;
    
    let lambda = (v + elem.w) % 360;
    return (lambda + 360) % 360;
}

// Chiron calculation (approximate)
function calculateChironPosition(jd) {
    const T = (jd - 2451545.0) / 36525;
    const L = (246.57 + 52.97 * T) % 360;
    return (L + 360) % 360;
}

// Lilith (Mean Lunar Apogee) calculation
function calculateLilithPosition(jd) {
    const T = (jd - 2451545.0) / 36525;
    const L = (83.35 + 40.66 * T) % 360;
    return (L + 360) % 360;
}

// North Node calculation
function calculateNorthNode(jd) {
    const T = (jd - 2451545.0) / 36525;
    const node = (125.04 - 1934.14 * T) % 360;
    return (node + 360) % 360;
}

// Display planets
async function displayPlanets() {
    const planets = await getCurrentPlanetaryPositions();
    const grid = document.getElementById('planets-grid');
    grid.innerHTML = '';
    
    for (const [planet, longitude] of Object.entries(planets)) {
        const sign = getZodiacSign(longitude);
        const card = document.createElement('div');
        card.className = 'planet-card';
        card.innerHTML = `
            <div class="planet-name">${planet}</div>
            <div class="planet-sign">${sign}</div>
        `;
        grid.appendChild(card);
    }
    
    document.getElementById('loading').style.display = 'none';
    document.getElementById('planets-container').style.display = 'block';
}

// Generate daily horoscope
function generateDailyHoroscope() {
    const horoscopes = [
        "The cosmic energies today encourage introspection and connection. Trust your intuition as you navigate the day's challenges.",
        "Today's planetary alignment brings opportunities for growth and transformation. Embrace change with an open heart.",
        "The stars suggest a focus on communication and relationships. Reach out to those who matter most.",
        "Creative energy flows abundantly today. Express yourself authentically and watch magic unfold.",
        "Balance is the theme of today's celestial dance. Find harmony between giving and receiving.",
        "The universe supports your dreams today. Take a bold step toward your aspirations.",
        "Reflection and rest are favored today. Honor your need for solitude and inner peace."
    ];
    
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    const index = dayOfYear % horoscopes.length;
    document.getElementById('daily-horoscope').textContent = horoscopes[index];
}

// Generate weekly journal prompt
function generateJournalPrompt() {
    const prompts = [
        "What cosmic lessons have you learned this week? How have the planetary transits reflected in your daily life?",
        "Reflect on the relationship between your inner world and outer experiences. Where do you see the stars mirrored in your reality?",
        "What patterns are you ready to release? How can you align more deeply with your authentic self?",
        "Consider your dreams and visions this week. What messages might the universe be sending you?",
        "How are you honoring your emotional needs? What does self-care look like under current transits?",
        "What creative impulses are calling to you? How can you channel cosmic energy into manifestation?",
        "Explore the balance between action and surrender in your life. Where might you need to adjust?"
    ];
    
    const weekOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 604800000);
    const index = weekOfYear % prompts.length;
    document.getElementById('journal-prompt').textContent = prompts[index];
}

// Wiki data
const wikiData = {
    signs: {
        'Aries': { element: 'Fire', modality: 'Cardinal', description: 'The pioneer of the zodiac, Aries embodies courage, initiative, and dynamic energy. Ruled by Mars, this sign represents new beginnings and the warrior spirit.' },
        'Taurus': { element: 'Earth', modality: 'Fixed', description: 'Grounded and sensual, Taurus values stability, beauty, and material security. Ruled by Venus, this sign appreciates the finer things in life.' },
        'Gemini': { element: 'Air', modality: 'Mutable', description: 'The communicator of the zodiac, Gemini thrives on intellectual stimulation and social connection. Ruled by Mercury, this sign is curious and adaptable.' },
        'Cancer': { element: 'Water', modality: 'Cardinal', description: 'Deeply intuitive and emotional, Cancer is the nurturer of the zodiac. Ruled by the Moon, this sign values family, home, and emotional security.' },
        'Leo': { element: 'Fire', modality: 'Fixed', description: 'Radiant and confident, Leo shines with creative self-expression and generosity. Ruled by the Sun, this sign embodies leadership and warmth.' },
        'Virgo': { element: 'Earth', modality: 'Mutable', description: 'Analytical and service-oriented, Virgo seeks perfection in all endeavors. Ruled by Mercury, this sign excels at organization and practical wisdom.' },
        'Libra': { element: 'Air', modality: 'Cardinal', description: 'The diplomat of the zodiac, Libra values harmony, justice, and partnership. Ruled by Venus, this sign seeks balance and beauty.' },
        'Scorpio': { element: 'Water', modality: 'Fixed', description: 'Intense and transformative, Scorpio delves into the mysteries of life and death. Ruled by Pluto and Mars, this sign embodies depth and power.' },
        'Sagittarius': { element: 'Fire', modality: 'Mutable', description: 'The philosopher and adventurer, Sagittarius seeks truth and expansion. Ruled by Jupiter, this sign loves freedom and exploration.' },
        'Capricorn': { element: 'Earth', modality: 'Cardinal', description: 'Ambitious and disciplined, Capricorn builds lasting structures and achievements. Ruled by Saturn, this sign represents mastery and responsibility.' },
        'Aquarius': { element: 'Air', modality: 'Fixed', description: 'Innovative and humanitarian, Aquarius envisions a better future for all. Ruled by Uranus and Saturn, this sign values individuality and progress.' },
        'Pisces': { element: 'Water', modality: 'Mutable', description: 'Mystical and compassionate, Pisces connects with the collective unconscious. Ruled by Neptune and Jupiter, this sign embodies spirituality and imagination.' }
    },
    planets: {
        'Sun': 'Core identity, vitality, life force, and self-expression. Represents the conscious ego and creative power.',
        'Moon': 'Emotions, instincts, subconscious patterns, and nurturing needs. Represents inner security and emotional responses.',
        'Mercury': 'Communication, thinking, learning, and information processing. Governs how we express and understand ideas.',
        'Venus': 'Love, beauty, values, and relationships. Represents what we attract and how we connect with others.',
        'Mars': 'Action, desire, energy, and willpower. Represents drive, passion, and how we assert ourselves.',
        'Jupiter': 'Expansion, growth, wisdom, and opportunity. Represents faith, optimism, and where we seek meaning.',
        'Saturn': 'Structure, discipline, responsibility, and limitations. Represents lessons, maturity, and long-term goals.',
        'Uranus': 'Innovation, revolution, sudden change, and awakening. Represents freedom, originality, and breakthroughs.',
        'Neptune': 'Spirituality, dreams, illusion, and transcendence. Represents imagination, compassion, and mysticism.',
        'Pluto': 'Transformation, power, death and rebirth. Represents deep psychological change and regeneration.'
    },
    houses: {
        '1st House': 'Self, identity, physical appearance, and first impressions. The Ascendant or Rising Sign.',
        '2nd House': 'Personal resources, values, money, and self-worth. Material security and possessions.',
        '3rd House': 'Communication, siblings, short trips, and early education. Daily interactions and thinking.',
        '4th House': 'Home, family, roots, and emotional foundation. The Imum Coeli (IC).',
        '5th House': 'Creativity, romance, children, and self-expression. Joy and playfulness.',
        '6th House': 'Health, work, daily routines, and service. Practical skills and wellness.',
        '7th House': 'Partnerships, marriage, and one-on-one relationships. The Descendant.',
        '8th House': 'Transformation, shared resources, intimacy, and death. Deep psychological matters.',
        '9th House': 'Philosophy, higher education, travel, and belief systems. Expansion of consciousness.',
        '10th House': 'Career, public image, and life direction. The Midheaven (MC).',
        '11th House': 'Friendships, groups, hopes, and wishes. Community and social networks.',
        '12th House': 'Spirituality, the unconscious, isolation, and hidden matters. Karma and transcendence.'
    },
    elements: {
        'Fire': 'Aries, Leo, Sagittarius - Energy, passion, inspiration, and action. The spark of life and creativity.',
        'Earth': 'Taurus, Virgo, Capricorn - Practicality, stability, material reality, and sensuality. Grounding energy.',
        'Air': 'Gemini, Libra, Aquarius - Intellect, communication, ideas, and social connection. Mental energy.',
        'Water': 'Cancer, Scorpio, Pisces - Emotion, intuition, depth, and feeling. Flowing, receptive energy.'
    },
    modalities: {
        'Cardinal': 'Aries, Cancer, Libra, Capricorn - Initiating energy, leadership, and new beginnings. Action-oriented.',
        'Fixed': 'Taurus, Leo, Scorpio, Aquarius - Sustaining energy, determination, and stability. Persistent and focused.',
        'Mutable': 'Gemini, Virgo, Sagittarius, Pisces - Adaptable energy, flexibility, and change. Transitional and versatile.'
    },
    aspects: {
        'Conjunction': '0° - Planets merge energies. Intensification and new beginnings. Powerful fusion of planetary forces.',
        'Sextile': '60° - Harmonious, opportunity-bringing aspect. Easy flow of energy, talents, and potential growth.',
        'Square': '90° - Challenging, tension-creating aspect. Dynamic friction that catalyzes growth and action.',
        'Trine': '120° - Flowing, beneficial aspect. Natural harmony, ease, and supportive energy between planets.',
        'Opposition': '180° - Polarizing, awareness-bringing aspect. Balance needed between opposing forces and perspectives.'
    }
};

// Populate wiki sections
function populateWiki() {
    populateWikiSection('signs-wiki', wikiData.signs, (name, data) => 
        `<h3>${name}</h3><p><strong>${data.element} | ${data.modality}</strong></p><p>${data.description}</p>`
    );
    
    populateWikiSection('planets-wiki', wikiData.planets, (name, data) => 
        `<h3>${name}</h3><p>${data}</p>`
    );
    
    populateWikiSection('houses-wiki', wikiData.houses, (name, data) => 
        `<h3>${name}</h3><p>${data}</p>`
    );
    
    populateWikiSection('elements-wiki', {...wikiData.elements, ...wikiData.modalities}, (name, data) => 
        `<h3>${name}</h3><p>${data}</p>`
    );
    
    populateWikiSection('aspects-wiki', wikiData.aspects, (name, data) => 
        `<h3>${name}</h3><p>${data}</p>`
    );
}

function populateWikiSection(elementId, data, formatFunction) {
    const container = document.getElementById(elementId);
    for (const [name, content] of Object.entries(data)) {
        const card = document.createElement('div');
        card.className = 'wiki-card';
        card.innerHTML = `<h3>${name}</h3>`;
        card.onclick = () => openModal(name, formatFunction(name, content));
        container.appendChild(card);
    }
}

// Modal functions
function openModal(title, content) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-body').innerHTML = content;
    document.getElementById('wiki-modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('wiki-modal').style.display = 'none';
}

// Birth chart comparison
function compareBirthChart() {
    const birthDate = document.getElementById('birth-date').value;
    const birthTime = document.getElementById('birth-time').value;
    const birthLocation = document.getElementById('birth-location').value;
    
    if (!birthDate) {
        alert('Please enter your birth date');
        return;
    }
    
    const result = document.getElementById('comparison-result');
    result.innerHTML = `
        <div style="margin-top: 1rem; padding: 1rem; background: rgba(255, 215, 0, 0.1); border-radius: 10px;">
            <h3 style="color: #ffd700;">Birth Chart Analysis</h3>
            <p><strong>Birth Date:</strong> ${birthDate}</p>
            ${birthTime ? `<p><strong>Birth Time:</strong> ${birthTime}</p>` : ''}
            ${birthLocation ? `<p><strong>Location:</strong> ${birthLocation}</p>` : ''}
            <p style="margin-top: 1rem;">
                Compare your natal placements with today's transits to understand current cosmic influences. 
                Notice which planets are aspecting your birth chart for deeper insights into present energies.
            </p>
        </div>
    `;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const now = new Date();
    document.getElementById('current-date').textContent = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    displayPlanets();
    generateDailyHoroscope();
    generateJournalPrompt();
    populateWiki();
});

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('wiki-modal');
    if (event.target == modal) {
        closeModal();
    }
}