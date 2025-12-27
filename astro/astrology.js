// Get zodiac sign from ecliptic longitude
function getZodiacSign(longitude) {
    const signs = [
        'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
        'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
    ];
    // Normalize longitude to 0-360
    let normalizedLong = longitude % 360;
    if (normalizedLong < 0) normalizedLong += 360;
    
    const index = Math.floor(normalizedLong / 30);
    return signs[index];
}

// Julian Date calculation
function getJulianDate(date) {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    const hour = date.getUTCHours();
    const minute = date.getUTCMinutes();
    const second = date.getUTCSeconds();
    
    let a = Math.floor((14 - month) / 12);
    let y = year + 4800 - a;
    let m = month + 12 * a - 3;
    
    let jdn = day + Math.floor((153 * m + 2) / 5) + 365 * y + 
              Math.floor(y / 4) - Math.floor(y / 100) + 
              Math.floor(y / 400) - 32045;
    
    let jd = jdn + (hour - 12) / 24 + minute / 1440 + second / 86400;
    
    return jd;
}

// Sun position (VSOP87 simplified)
function calculateSunPosition(jd) {
    const T = (jd - 2451545.0) / 36525;
    
    // Mean longitude
    let L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
    
    // Mean anomaly
    let M = 357.52911 + 35999.05029 * T - 0.0001537 * T * T;
    M = M * Math.PI / 180;
    
    // Equation of center
    let C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(M);
    C += (0.019993 - 0.000101 * T) * Math.sin(2 * M);
    C += 0.000289 * Math.sin(3 * M);
    
    // True longitude
    let trueLong = L0 + C;
    
    return trueLong % 360;
}

// Moon position (simplified ELP2000)
function calculateMoonPosition(jd) {
    const T = (jd - 2451545.0) / 36525;
    
    let L = 218.3164477 + 481267.88123421 * T;
    let D = 297.8501921 + 445267.1114034 * T;
    let M = 357.5291092 + 35999.0502909 * T;
    let Mp = 134.9633964 + 477198.8675055 * T;
    let F = 93.2720950 + 483202.0175233 * T;
    
    // Convert to radians
    D = D * Math.PI / 180;
    M = M * Math.PI / 180;
    Mp = Mp * Math.PI / 180;
    F = F * Math.PI / 180;
    
    // Main periodic terms (simplified)
    let longitude = L;
    longitude += 6.288774 * Math.sin(Mp);
    longitude += 1.274027 * Math.sin(2*D - Mp);
    longitude += 0.658314 * Math.sin(2*D);
    longitude += 0.213618 * Math.sin(2*Mp);
    longitude -= 0.185116 * Math.sin(M);
    longitude -= 0.114332 * Math.sin(2*F);
    
    return longitude % 360;
}

// VSOP87 planetary positions (more accurate)
function calculatePlanetPosition(jd, planet) {
    const T = (jd - 2451545.0) / 36525;
    
    const planets = {
        'Mercury': {
            L0: 252.250906, L1: 149472.6746358, L2: -0.00000535,
            a: 0.38709893, e: 0.20563069, i: 7.00487,
            omega: 48.330893, w: 77.45645
        },
        'Venus': {
            L0: 181.979801, L1: 58517.8156760, L2: 0.00000165,
            a: 0.72333199, e: 0.00677323, i: 3.39471,
            omega: 76.67992, w: 131.53298
        },
        'Mars': {
            L0: 355.433, L1: 19140.299, L2: 0.00000261,
            a: 1.52366231, e: 0.09341233, i: 1.85061,
            omega: 49.57854, w: 336.04084
        },
        'Jupiter': {
            L0: 34.351519, L1: 3034.90567, L2: -0.00008501,
            a: 5.20336301, e: 0.04839266, i: 1.30530,
            omega: 100.55615, w: 14.75385
        },
        'Saturn': {
            L0: 50.077444, L1: 1222.11379, L2: 0.00021004,
            a: 9.53707032, e: 0.05415060, i: 2.48446,
            omega: 113.71504, w: 92.43194
        },
        'Uranus': {
            L0: 314.055005, L1: 428.466998, L2: -0.00000486,
            a: 19.19126393, e: 0.04716771, i: 0.76986,
            omega: 74.22988, w: 170.96424
        },
        'Neptune': {
            L0: 304.348665, L1: 218.486200, L2: 0.00000059,
            a: 30.06896348, e: 0.00858587, i: 1.76917,
            omega: 131.72169, w: 44.97135
        }
    };
    
    if (!planets[planet]) return 0;
    
    const p = planets[planet];
    
    // Mean longitude
    let L = p.L0 + p.L1 * T + p.L2 * T * T;
    
    // Mean anomaly
    let M = (L - p.w) * Math.PI / 180;
    
    // Equation of center (simplified)
    let C = (2 * p.e - 0.25 * p.e * p.e * p.e) * Math.sin(M);
    C += 1.25 * p.e * p.e * Math.sin(2 * M);
    C += 1.083333 * p.e * p.e * p.e * Math.sin(3 * M);
    C = C * 180 / Math.PI;
    
    // True anomaly
    let v = M * 180 / Math.PI + C;
    
    // Ecliptic longitude
    let eclipticLong = (v + p.w) % 360;
    
    return eclipticLong;
}

// Chiron calculation
function calculateChironPosition(jd) {
    const T = (jd - 2451545.0) / 36525;
    // Chiron's orbital elements
    const M = (4.6 + 0.1434 * T * 365.25) % 360;
    const omega = 339.3;
    const node = 209.4;
    
    let L = (M + omega + node) % 360;
    return L;
}

// Lilith (Mean Lunar Apogee)
function calculateLilithPosition(jd) {
    const T = (jd - 2451545.0) / 36525;
    let L = 83.35 + 4069.0137287 * T;
    return L % 360;
}

// North Node
function calculateNorthNode(jd) {
    const T = (jd - 2451545.0) / 36525;
    let node = 125.0445479 - 1934.1362891 * T + 0.0020754 * T * T;
    return node % 360;
}

// Get current planetary positions
async function getCurrentPlanetaryPositions() {
    const now = new Date();
    const jd = getJulianDate(now);
    
    const planets = {
        'Sun': calculateSunPosition(jd),
        'Moon': calculateMoonPosition(jd),
        'Mercury': calculatePlanetPosition(jd, 'Mercury'),
        'Venus': calculatePlanetPosition(jd, 'Venus'),
        'Mars': calculatePlanetPosition(jd, 'Mars'),
        'Jupiter': calculatePlanetPosition(jd, 'Jupiter'),
        'Saturn': calculatePlanetPosition(jd, 'Saturn'),
        'Uranus': calculatePlanetPosition(jd, 'Uranus'),
        'Neptune': calculatePlanetPosition(jd, 'Neptune'),
        'Chiron': calculateChironPosition(jd),
        'Lilith': calculateLilithPosition(jd),
        'North Node': calculateNorthNode(jd)
    };
    
    return planets;
}

// Display planets
async function displayPlanets() {
    const planets = await getCurrentPlanetaryPositions();
    const grid = document.getElementById('planets-grid');
    grid.innerHTML = '';
    
    for (const [planet, longitude] of Object.entries(planets)) {
        const sign = getZodiacSign(longitude);
        const degrees = Math.floor(longitude % 30);
        const card = document.createElement('div');
        card.className = 'planet-card';
        card.innerHTML = `
            <div class="planet-name">${planet}</div>
            <div class="planet-sign">${sign}</div>
            <div style="font-size: 0.9rem; color: #aaa; margin-top: 0.3rem;">${degrees}°</div>
        `;
        grid.appendChild(card);
    }
    
    document.getElementById('loading').style.display = 'none';
    document.getElementById('planets-container').style.display = 'block';
}

// Calculate aspects between two planets
function calculateAspect(angle) {
    let diff = Math.abs(angle);
    while (diff > 180) diff = 360 - diff;
    
    const orb = 8;
    
    if (Math.abs(diff - 0) <= orb) return { type: 'Conjunction', angle: 0, symbol: '☌' };
    if (Math.abs(diff - 60) <= orb) return { type: 'Sextile', angle: 60, symbol: '⚹' };
    if (Math.abs(diff - 90) <= orb) return { type: 'Square', angle: 90, symbol: '□' };
    if (Math.abs(diff - 120) <= orb) return { type: 'Trine', angle: 120, symbol: '△' };
    if (Math.abs(diff - 180) <= orb) return { type: 'Opposition', angle: 180, symbol: '☍' };
    
    return null;
}

// Get aspect interpretation
function getAspectInterpretation(aspect, transitPlanet, natalPlanet) {
    const interpretations = {
        'Conjunction': {
            description: 'merging with',
            meaning: 'Intense focus and activation. The energies blend together powerfully.',
            energy: '⚡ High intensity'
        },
        'Sextile': {
            description: 'harmonizing with',
            meaning: 'Opportunities and easy flow. Supportive energy for growth.',
            energy: '✨ Beneficial'
        },
        'Square': {
            description: 'challenging',
            meaning: 'Dynamic tension requiring action. Growth through challenge.',
            energy: '⚠️ Tension/Action'
        },
        'Trine': {
            description: 'supporting',
            meaning: 'Natural harmony and ease. Talents flow effortlessly.',
            energy: '🌟 Very favorable'
        },
        'Opposition': {
            description: 'opposing',
            meaning: 'Awareness through contrast. Balance needed between polarities.',
            energy: '⚖️ Awareness/Balance'
        }
    };
    
    const info = interpretations[aspect.type];
    return `
        <div style="padding: 0.8rem; margin: 0.5rem 0; background: rgba(255, 255, 255, 0.08); border-radius: 8px; border-left: 3px solid #ffd700;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <strong style="color: #ffd700; font-size: 1.1rem;">
                    Transit ${transitPlanet} ${aspect.symbol} Natal ${natalPlanet}
                </strong>
                <span style="font-size: 0.9rem; color: #aaa;">${info.energy}</span>
            </div>
            <p style="margin: 0.3rem 0; font-style: italic; color: #ddd;">
                ${transitPlanet} is ${info.description} your natal ${natalPlanet}
            </p>
            <p style="margin: 0.5rem 0; font-size: 0.95rem; color: #ccc;">
                ${info.meaning}
            </p>
        </div>
    `;
}

// Birth chart comparison
async function compareBirthChart() {
    const birthDate = document.getElementById('birth-date').value;
    const birthTime = document.getElementById('birth-time').value;
    const birthLocation = document.getElementById('birth-location').value;
    
    if (!birthDate) {
        alert('Please enter your birth date');
        return;
    }
    
    const result = document.getElementById('comparison-result');
    result.innerHTML = '<div class="loading">Calculating your birth chart and current transits...</div>';
    
    // Parse birth date and time in LOCAL timezone
    let birthDateTime;
    if (birthTime) {
        // Create date in local timezone
        const dateParts = birthDate.split('-');
        const timeParts = birthTime.split(':');
        birthDateTime = new Date(
            parseInt(dateParts[0]), 
            parseInt(dateParts[1]) - 1, 
            parseInt(dateParts[2]),
            parseInt(timeParts[0]),
            parseInt(timeParts[1] || 0)
        );
    } else {
        // Default to noon local time
        const dateParts = birthDate.split('-');
        birthDateTime = new Date(
            parseInt(dateParts[0]), 
            parseInt(dateParts[1]) - 1, 
            parseInt(dateParts[2]),
            12, 0, 0
        );
    }
    
    const birthJD = getJulianDate(birthDateTime);
    
    // Calculate natal planets
    const natalChart = {
        'Sun': calculateSunPosition(birthJD),
        'Moon': calculateMoonPosition(birthJD),
        'Mercury': calculatePlanetPosition(birthJD, 'Mercury'),
        'Venus': calculatePlanetPosition(birthJD, 'Venus'),
        'Mars': calculatePlanetPosition(birthJD, 'Mars'),
        'Jupiter': calculatePlanetPosition(birthJD, 'Jupiter'),
        'Saturn': calculatePlanetPosition(birthJD, 'Saturn'),
        'Uranus': calculatePlanetPosition(birthJD, 'Uranus'),
        'Neptune': calculatePlanetPosition(birthJD, 'Neptune')
    };
    
    // Get current transits
    const currentTransits = await getCurrentPlanetaryPositions();
    
    // Build natal chart display
    let natalChartHTML = '<h3 style="color: #ffd700; margin-top: 1.5rem;">Your Natal Chart</h3>';
    natalChartHTML += '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 0.8rem; margin: 1rem 0;">';
    
    for (const [planet, longitude] of Object.entries(natalChart)) {
        const sign = getZodiacSign(longitude);
        const degrees = Math.floor(longitude % 30);
        natalChartHTML += `
            <div style="background: rgba(138, 43, 226, 0.2); padding: 0.8rem; border-radius: 8px; text-align: center;">
                <div style="font-weight: bold; color: #ffd700;">${planet}</div>
                <div style="font-size: 1.1rem;">${sign}</div>
                <div style="font-size: 0.9rem; color: #aaa;">${degrees}°</div>
            </div>
        `;
    }
    natalChartHTML += '</div>';
    
    // Find aspects
    let aspectsHTML = '<h3 style="color: #ffd700; margin-top: 2rem;">Active Transits Affecting Your Chart</h3>';
    let aspectCount = 0;
    
    const transitPlanets = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];
    const natalPlanets = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];
    
    for (const transitPlanet of transitPlanets) {
        for (const natalPlanet of natalPlanets) {
            if (transitPlanet === natalPlanet) continue;
            
            const transitLong = currentTransits[transitPlanet];
            const natalLong = natalChart[natalPlanet];
            const angle = transitLong - natalLong;
            
            const aspect = calculateAspect(angle);
            if (aspect) {
                aspectsHTML += getAspectInterpretation(aspect, transitPlanet, natalPlanet);
                aspectCount++;
            }
        }
    }
    
    if (aspectCount === 0) {
        aspectsHTML += '<p style="color: #ccc; font-style: italic;">No major aspects are exact at this moment. This is a quieter period astrologically.</p>';
    }
    
    // Summary
    let summaryHTML = `
        <div style="margin-top: 1rem; padding: 1.5rem; background: linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(138, 43, 226, 0.15)); border-radius: 10px; border: 1px solid rgba(255, 215, 0, 0.3);">
            <h3 style="color: #ffd700;">Birth Chart Information</h3>
            <p><strong>Birth Date:</strong> ${birthDateTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            ${birthTime ? `<p><strong>Birth Time:</strong> ${birthTime} (local time)</p>` : '<p style="color: #ffaa00; font-style: italic;">⚠️ No birth time provided - chart calculated for noon local time</p>'}
            ${birthLocation ? `<p><strong>Location:</strong> ${birthLocation}</p>` : '<p style="color: #ffaa00; font-style: italic;">💡 Tip: Adding your birth location would allow for house calculations</p>'}
            <p style="margin-top: 1rem;"><strong>Active Aspects:</strong> ${aspectCount} major transit${aspectCount !== 1 ? 's' : ''} affecting your chart</p>
        </div>
    `;
    
    result.innerHTML = summaryHTML + natalChartHTML + aspectsHTML;
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

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
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