// Sign Data
const signData = {
    aries: {
        element: "Fire Sign, Cardinal Quality",
        ruler: "Mars - The planet of action, passion, and drive",
        traits: ["Bold", "Energetic", "Pioneering", "Competitive", "Passionate", "Independent"],
        description: "Aries is the first sign of the zodiac, symbolizing new beginnings and raw energy. Born leaders with an unstoppable drive, Aries individuals charge ahead with courage and enthusiasm. They're natural trailblazers who aren't afraid to take risks and fight for what they believe in.",
        dates: "March 21 - April 19",
        symbol: "♈"
    },
    taurus: {
        element: "Earth Sign, Fixed Quality",
        ruler: "Venus - The planet of love, beauty, and values",
        traits: ["Reliable", "Patient", "Sensual", "Practical", "Devoted", "Stable"],
        description: "Taurus is the sign of stability and sensuality. These grounded individuals appreciate the finer things in life and work hard to create security and comfort. With unwavering determination, they build lasting foundations and cherish life's simple pleasures.",
        dates: "April 20 - May 20",
        symbol: "♉"
    },
    gemini: {
        element: "Air Sign, Mutable Quality",
        ruler: "Mercury - The planet of communication and intellect",
        traits: ["Curious", "Adaptable", "Witty", "Social", "Versatile", "Expressive"],
        description: "Gemini is the sign of duality and communication. These quick-witted individuals thrive on mental stimulation and social connections. Masters of adaptation, they navigate life with curiosity and charm, always ready for the next conversation or adventure.",
        dates: "May 21 - June 20",
        symbol: "♊"
    },
    cancer: {
        element: "Water Sign, Cardinal Quality",
        ruler: "Moon - The luminary of emotions and nurturing",
        traits: ["Nurturing", "Intuitive", "Protective", "Emotional", "Loyal", "Empathetic"],
        description: "Cancer is the sign of home and heart. These deeply feeling individuals create sanctuaries wherever they go and care for others with profound devotion. Guided by intuition and emotion, they understand the unspoken needs of those around them.",
        dates: "June 21 - July 22",
        symbol: "♋"
    },
    leo: {
        element: "Fire Sign, Fixed Quality",
        ruler: "Sun - The luminary of self-expression and vitality",
        traits: ["Confident", "Generous", "Creative", "Dramatic", "Warm-hearted", "Charismatic"],
        description: "Leo is the sign of royalty and self-expression. These radiant individuals light up every room with their presence and inspire others with their creative vision. Born performers with golden hearts, they lead with generosity and passion.",
        dates: "July 23 - August 22",
        symbol: "♌"
    },
    virgo: {
        element: "Earth Sign, Mutable Quality",
        ruler: "Mercury - The planet of analysis and practical thinking",
        traits: ["Analytical", "Helpful", "Precise", "Health-conscious", "Modest", "Diligent"],
        description: "Virgo is the sign of service and refinement. These discerning individuals possess an eye for detail and a genuine desire to improve the world around them. Through careful analysis and dedicated work, they bring order to chaos.",
        dates: "August 23 - September 22",
        symbol: "♍"
    },
    libra: {
        element: "Air Sign, Cardinal Quality",
        ruler: "Venus - The planet of harmony and relationships",
        traits: ["Diplomatic", "Charming", "Fair-minded", "Social", "Aesthetic", "Balanced"],
        description: "Libra is the sign of partnership and justice. These graceful individuals seek harmony in all things and possess a natural talent for bringing people together. With an appreciation for beauty and balance, they create peace wherever they go.",
        dates: "September 23 - October 22",
        symbol: "♎"
    },
    scorpio: {
        element: "Water Sign, Fixed Quality",
        ruler: "Pluto - The planet of transformation and power",
        traits: ["Intense", "Passionate", "Mysterious", "Determined", "Loyal", "Perceptive"],
        description: "Scorpio is the sign of transformation and depth. These powerful individuals dive beneath the surface to uncover truth and meaning. With magnetic intensity and unwavering focus, they embrace life's mysteries and emerge stronger from every challenge.",
        dates: "October 23 - November 21",
        symbol: "♏"
    },
    sagittarius: {
        element: "Fire Sign, Mutable Quality",
        ruler: "Jupiter - The planet of expansion and wisdom",
        traits: ["Optimistic", "Adventurous", "Philosophical", "Independent", "Honest", "Enthusiastic"],
        description: "Sagittarius is the sign of adventure and wisdom. These free-spirited individuals seek truth and meaning through exploration and experience. With boundless optimism and a thirst for knowledge, they inspire others to expand their horizons.",
        dates: "November 22 - December 21",
        symbol: "♐"
    },
    capricorn: {
        element: "Earth Sign, Cardinal Quality",
        ruler: "Saturn - The planet of discipline and ambition",
        traits: ["Ambitious", "Disciplined", "Responsible", "Patient", "Practical", "Persistent"],
        description: "Capricorn is the sign of mastery and achievement. These determined individuals climb every mountain with patience and perseverance. Building legacy through hard work and dedication, they turn dreams into reality through sheer willpower.",
        dates: "December 22 - January 19",
        symbol: "♑"
    },
    aquarius: {
        element: "Air Sign, Fixed Quality",
        ruler: "Uranus - The planet of innovation and revolution",
        traits: ["Innovative", "Independent", "Humanitarian", "Progressive", "Original", "Intellectual"],
        description: "Aquarius is the sign of innovation and community. These visionary individuals think beyond convention and work toward a better future for all. With brilliant minds and humanitarian hearts, they revolutionize the world around them.",
        dates: "January 20 - February 18",
        symbol: "♒"
    },
    pisces: {
        element: "Water Sign, Mutable Quality",
        ruler: "Neptune - The planet of dreams and spirituality",
        traits: ["Compassionate", "Artistic", "Intuitive", "Gentle", "Spiritual", "Adaptable"],
        description: "Pisces is the sign of dreams and transcendence. These ethereal individuals navigate between reality and imagination with grace and compassion. Deeply empathetic artists and healers, they remind us of the magic that exists beyond the material world.",
        dates: "February 19 - March 20",
        symbol: "♓"
    }
};

// Planetary data
let currentPlanets = {};
let selectedSign = 'aries';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createStars();
    loadJournalEntries();
    
    // Set up sign selector
    document.getElementById('signSelect').addEventListener('change', (e) => {
        selectedSign = e.target.value;
        updateSignInfo();
        updateHoroscope();
    });
    
    // Initial load
    updateSignInfo();
    fetchCurrentPlacements();
    loadBlogFeed();
    updateHoroscope();
    
    // Auto-update every 5 minutes
    setInterval(fetchCurrentPlacements, 5 * 60 * 1000);
});

// Create starry background
function createStars() {
    const starsContainer = document.getElementById('stars');
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        starsContainer.appendChild(star);
    }
}

// Fetch current planetary placements using Astronomy Engine
async function fetchCurrentPlacements() {
    try {
        const updateTimeEl = document.getElementById('updateTime');
        updateTimeEl.textContent = 'Updating...';
        
        const now = new Date();
        
        // Check if Astronomy Engine library is loaded
        if (typeof Astronomy !== 'undefined') {
            const planets = getPlanetsWithAstronomyEngine(now);
            currentPlanets = planets;
        } else {
            console.warn('Astronomy Engine not loaded. Using fallback calculations.');
            const planets = calculatePlanetaryPositions(now);
            currentPlanets = planets;
        }
        
        displayPlanetaryInfo(currentPlanets);
        drawBirthChart(currentPlanets);
        updateTransitExplanations(currentPlanets);
        
        updateTimeEl.textContent = `Last updated: ${now.toLocaleTimeString()}`;
    } catch (error) {
        console.error('Error fetching placements:', error);
        document.getElementById('planetInfo').innerHTML = '<p style="color: #ff6b6b;">Unable to load planetary data. Using approximate calculations...</p>';
        const planets = calculatePlanetaryPositions(new Date());
        currentPlanets = planets;
        displayPlanetaryInfo(currentPlanets);
        drawBirthChart(currentPlanets);
        updateTransitExplanations(currentPlanets);
    }
}

// ACCURATE METHOD: Using Astronomy Engine (NASA JPL quality)
// Requires: <script src="https://cdn.jsdelivr.net/npm/astronomy-engine@2.1.19/astronomy.min.js"></script> in HTML
function getPlanetsWithAstronomyEngine(date) {
    const planets = {};
    const observer = new Astronomy.Observer(32.9537, -96.8903, 0); // Carrollton, TX
    
    const bodies = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 
                    'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'];
    
    bodies.forEach(bodyName => {
        try {
            const body = Astronomy.Body[bodyName];
            const equator = Astronomy.Equator(body, date, observer, true, true);
            
            // Convert to ecliptic coordinates
            const ecliptic = Astronomy.Ecliptic(equator);
            const longitude = (ecliptic.elon + 360) % 360;
            
            planets[bodyName.toLowerCase()] = {
                longitude: longitude,
                sign: getZodiacSign(longitude),
                degree: Math.floor(longitude % 30)
            };
        } catch (error) {
            console.error(`Error calculating ${bodyName}:`, error);
        }
    });
    
    // Add Chiron (approximate calculation)
    const jd = getJulianDate(date);
    const chironLongitude = (378.134 + 0.053619 * (jd - 2451545.0)) % 360;
    planets.chiron = {
        longitude: chironLongitude,
        sign: getZodiacSign(chironLongitude),
        degree: Math.floor(chironLongitude % 30)
    };
    
    // Add Lilith/Black Moon (Mean calculation)
    const lilithLongitude = (83.297 + 0.111404 * (jd - 2451545.0)) % 360;
    planets.lilith = {
        longitude: lilithLongitude,
        sign: getZodiacSign(lilithLongitude),
        degree: Math.floor(lilithLongitude % 30)
    };
    
    return planets;
}

// FALLBACK: Simplified planetary calculations (approximate)
function calculatePlanetaryPositions(date) {
    const jd = getJulianDate(date);
    const planets = {};
    
    // Sun (simple formula)
    const sunLongitude = (280.460 + 0.9856474 * (jd - 2451545.0)) % 360;
    planets.sun = { 
        longitude: sunLongitude,
        sign: getZodiacSign(sunLongitude),
        degree: Math.floor(sunLongitude % 30)
    };
    
    // Moon (approximate)
    const moonLongitude = (218.316 + 13.176396 * (jd - 2451545.0)) % 360;
    planets.moon = {
        longitude: moonLongitude,
        sign: getZodiacSign(moonLongitude),
        degree: Math.floor(moonLongitude % 30)
    };
    
    // Mercury (approximate)
    const mercuryLongitude = (252.250 + 4.092339 * (jd - 2451545.0)) % 360;
    planets.mercury = {
        longitude: mercuryLongitude,
        sign: getZodiacSign(mercuryLongitude),
        degree: Math.floor(mercuryLongitude % 30)
    };
    
    // Venus (approximate)
    const venusLongitude = (181.979 + 1.602130 * (jd - 2451545.0)) % 360;
    planets.venus = {
        longitude: venusLongitude,
        sign: getZodiacSign(venusLongitude),
        degree: Math.floor(venusLongitude % 30)
    };
    
    // Mars (approximate)
    const marsLongitude = (355.433 + 0.524071 * (jd - 2451545.0)) % 360;
    planets.mars = {
        longitude: marsLongitude,
        sign: getZodiacSign(marsLongitude),
        degree: Math.floor(marsLongitude % 30)
    };
    
    // Jupiter (approximate)
    const jupiterLongitude = (34.351 + 0.083056 * (jd - 2451545.0)) % 360;
    planets.jupiter = {
        longitude: jupiterLongitude,
        sign: getZodiacSign(jupiterLongitude),
        degree: Math.floor(jupiterLongitude % 30)
    };
    
    // Saturn (approximate)
    const saturnLongitude = (50.078 + 0.033459 * (jd - 2451545.0)) % 360;
    planets.saturn = {
        longitude: saturnLongitude,
        sign: getZodiacSign(saturnLongitude),
        degree: Math.floor(saturnLongitude % 30)
    };
    
    // Uranus (approximate)
    const uranusLongitude = (314.055 + 0.011733 * (jd - 2451545.0)) % 360;
    planets.uranus = {
        longitude: uranusLongitude,
        sign: getZodiacSign(uranusLongitude),
        degree: Math.floor(uranusLongitude % 30)
    };
    
    // Neptune (approximate)
    const neptuneLongitude = (304.880 + 0.006027 * (jd - 2451545.0)) % 360;
    planets.neptune = {
        longitude: neptuneLongitude,
        sign: getZodiacSign(neptuneLongitude),
        degree: Math.floor(neptuneLongitude % 30)
    };
    
    // Pluto (approximate)
    const plutoLongitude = (238.956 + 0.004008 * (jd - 2451545.0)) % 360;
    planets.pluto = {
        longitude: plutoLongitude,
        sign: getZodiacSign(plutoLongitude),
        degree: Math.floor(plutoLongitude % 30)
    };
    
    // Chiron (approximate)
    const chironLongitude = (378.134 + 0.053619 * (jd - 2451545.0)) % 360;
    planets.chiron = {
        longitude: chironLongitude,
        sign: getZodiacSign(chironLongitude),
        degree: Math.floor(chironLongitude % 30)
    };
    
    // Lilith/Black Moon (approximate)
    const lilithLongitude = (83.297 + 0.111404 * (jd - 2451545.0)) % 360;
    planets.lilith = {
        longitude: lilithLongitude,
        sign: getZodiacSign(lilithLongitude),
        degree: Math.floor(lilithLongitude % 30)
    };
    
    return planets;
}

function getJulianDate(date) {
    return (date.getTime() / 86400000) + 2440587.5;
}

function getZodiacSign(longitude) {
    const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 
                   'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
    return signs[Math.floor(longitude / 30)];
}

function displayPlanetaryInfo(planets) {
    const planetInfo = document.getElementById('planetInfo');
    const planetEmojis = {
        sun: '☉',
        moon: '☽',
        mercury: '☿',
        venus: '♀',
        mars: '♂',
        jupiter: '♃',
        saturn: '♄',
        uranus: '♅',
        neptune: '♆',
        pluto: '♇',
        chiron: '⚷',
        lilith: '⚸'
    };
    
    const planetNames = {
        sun: 'Sun',
        moon: 'Moon',
        mercury: 'Mercury',
        venus: 'Venus',
        mars: 'Mars',
        jupiter: 'Jupiter',
        saturn: 'Saturn',
        uranus: 'Uranus',
        neptune: 'Neptune',
        pluto: 'Pluto',
        chiron: 'Chiron',
        lilith: 'Lilith'
    };
    
    let html = '';
    for (const [planet, data] of Object.entries(planets)) {
        html += `
            <div class="planet-card">
                <div class="planet-name">${planetEmojis[planet]} ${planetNames[planet]}</div>
                <div class="planet-position">${data.sign} ${data.degree}°</div>
            </div>
        `;
    }
    
    planetInfo.innerHTML = html;
}

function drawBirthChart(planets) {
    const canvas = document.getElementById('chartCanvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 40;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw outer circle
    ctx.strokeStyle = '#FF10F0';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.stroke();
    
    // Draw zodiac signs
    const signs = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];
    
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    for (let i = 0; i < 12; i++) {
        const angle = (i * 30 - 90) * Math.PI / 180;
        
        // Draw sign divisions
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        const lineX = centerX + Math.cos(angle) * radius;
        const lineY = centerY + Math.sin(angle) * radius;
        ctx.lineTo(lineX, lineY);
        ctx.stroke();
        
        // Draw sign symbols
        const textAngle = (i * 30 + 15 - 90) * Math.PI / 180;
        const textX = centerX + Math.cos(textAngle) * (radius - 20);
        const textY = centerY + Math.sin(textAngle) * (radius - 20);
        ctx.fillStyle = '#00F0FF';
        ctx.fillText(signs[i], textX, textY);
    }
    
    // Draw planets
    const planetSymbols = {
        sun: '☉',
        moon: '☽',
        mercury: '☿',
        venus: '♀',
        mars: '♂',
        jupiter: '♃',
        saturn: '♄',
        uranus: '♅',
        neptune: '♆',
        pluto: '♇',
        chiron: '⚷',
        lilith: '⚸'
    };
    
    ctx.font = 'bold 24px Arial';
    
    for (const [planet, data] of Object.entries(planets)) {
        if (data.longitude !== undefined) {
            const angle = (data.longitude - 90) * Math.PI / 180;
            const planetX = centerX + Math.cos(angle) * (radius * 0.7);
            const planetY = centerY + Math.sin(angle) * (radius * 0.7);
            
            // Planet glow
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#FFFF00';
            ctx.fillStyle = '#FFFF00';
            ctx.fillText(planetSymbols[planet], planetX, planetY);
            ctx.shadowBlur = 0;
        }
    }
}

function updateTransitExplanations(planets) {
    const explanations = document.getElementById('transitExplanations');
    
    const insights = [
        {
            title: '☉ Sun Position',
            text: `The Sun in ${planets.sun.sign} illuminates themes of ${getSunInsight(planets.sun.sign)}. This is a powerful time for ${getSignFocus(planets.sun.sign)}.`
        },
        {
            title: '☽ Moon Energy',
            text: `With the Moon in ${planets.moon.sign}, emotions flow through ${getMoonInsight(planets.moon.sign)}. Pay attention to ${getMoonFocus(planets.moon.sign)}.`
        },
        {
            title: '☿ Mercury Communications',
            text: `Mercury in ${planets.mercury.sign} shapes how we think and communicate. Expect ${getMercuryInsight(planets.mercury.sign)}.`
        }
    ];
    
    let html = '';
    insights.forEach(insight => {
        html += `
            <div class="info-section">
                <h3>${insight.title}</h3>
                <p>${insight.text}</p>
            </div>
        `;
    });
    
    explanations.innerHTML = html;
}

function getSunInsight(sign) {
    const insights = {
        'Aries': 'bold initiative and courageous action',
        'Taurus': 'stability, sensuality, and material security',
        'Gemini': 'communication, curiosity, and mental agility',
        'Cancer': 'emotional depth, nurturing, and home life',
        'Leo': 'creativity, self-expression, and leadership',
        'Virgo': 'analysis, service, and practical refinement',
        'Libra': 'harmony, relationships, and aesthetic beauty',
        'Scorpio': 'transformation, intensity, and hidden truths',
        'Sagittarius': 'expansion, adventure, and philosophical wisdom',
        'Capricorn': 'ambition, discipline, and long-term achievement',
        'Aquarius': 'innovation, community, and progressive ideals',
        'Pisces': 'compassion, spirituality, and creative imagination'
    };
    return insights[sign] || 'personal growth and self-discovery';
}

function getSignFocus(sign) {
    return sign.toLowerCase() === selectedSign ? 'your personal power and self-expression' : 'collective growth in this area';
}

function getMoonInsight(sign) {
    const insights = {
        'Aries': 'passionate spontaneity and emotional courage',
        'Taurus': 'comfort-seeking and sensory pleasures',
        'Gemini': 'intellectual stimulation and social connection',
        'Cancer': 'nurturing instincts and family bonds',
        'Leo': 'dramatic expression and heartfelt generosity',
        'Virgo': 'practical care and attention to detail',
        'Libra': 'relational harmony and aesthetic appreciation',
        'Scorpio': 'intense feelings and emotional transformation',
        'Sagittarius': 'optimistic adventure and philosophical inquiry',
        'Capricorn': 'emotional restraint and responsible action',
        'Aquarius': 'detached observation and humanitarian concern',
        'Pisces': 'empathic sensitivity and imaginative dreams'
    };
    return insights[sign] || 'emotional awareness';
}

function getMoonFocus(sign) {
    return `how you nurture yourself and respond to ${sign} energy`;
}

function getMercuryInsight(sign) {
    return `enhanced mental clarity and communication style aligned with ${sign} energy`;
}

function updateSignInfo() {
    const sign = signData[selectedSign];
    document.getElementById('currentSign').textContent = selectedSign.toUpperCase();
    document.getElementById('signElement').textContent = sign.element;
    document.getElementById('signRuler').textContent = sign.ruler;
    document.getElementById('signDescription').textContent = sign.description;
    
    const traitsHtml = sign.traits.map(trait => `<span class="trait-tag">${trait}</span>`).join('');
    document.getElementById('signTraits').innerHTML = traitsHtml;
}

async function loadBlogFeed() {
    const blogFeed = document.getElementById('blogFeed');
    
    // Replace with your Medium blog RSS feed URL
    const rssFeedUrl = 'https://medium.com/feed/@astrology'; // Example - change this!
    
    try {
        // Using RSS2JSON API to convert RSS to JSON (free service)
        const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssFeedUrl)}`;
        const response = await fetch(proxyUrl);
        const data = await response.json();
        
        if (data.status === 'ok' && data.items) {
            let html = '';
            data.items.slice(0, 10).forEach(item => {
                const date = new Date(item.pubDate).toLocaleDateString();
                html += `
                    <div class="blog-item">
                        <div class="blog-title">
                            <a href="${item.link}" target="_blank">${item.title}</a>
                        </div>
                        <div class="blog-date">${date}</div>
                    </div>
                `;
            });
            blogFeed.innerHTML = html;
        } else {
            throw new Error('Failed to load feed');
        }
    } catch (error) {
        console.error('Error loading blog feed:', error);
        blogFeed.innerHTML = `
            <p style="color: var(--text-muted);">
                📰 Add your Medium RSS feed to see articles here!
                <br><br>
                <strong>How to add your feed:</strong><br>
                1. Find your Medium username<br>
                2. Replace the URL in astro-wiki.js line ~612<br>
                3. Use format: https://medium.com/feed/@yourusername
            </p>
        `;
    }
}

function updateHoroscope() {
    const horoscope = document.getElementById('dailyHoroscope');
    const horoscopes = generateHoroscope(selectedSign, currentPlanets);
    horoscope.innerHTML = horoscopes;
}

function generateHoroscope(sign, planets) {
    const themes = {
        aries: ['taking bold action', 'leadership opportunities', 'physical energy'],
        taurus: ['financial matters', 'sensory pleasures', 'building stability'],
        gemini: ['communication breakthroughs', 'learning new skills', 'social connections'],
        cancer: ['emotional insights', 'home and family', 'nurturing relationships'],
        leo: ['creative expression', 'romance and play', 'stepping into the spotlight'],
        virgo: ['organizing your life', 'health improvements', 'being of service'],
        libra: ['relationship harmony', 'aesthetic pursuits', 'finding balance'],
        scorpio: ['deep transformation', 'uncovering secrets', 'emotional intensity'],
        sagittarius: ['adventurous pursuits', 'philosophical insights', 'expanding horizons'],
        capricorn: ['career advancement', 'building legacy', 'long-term planning'],
        aquarius: ['innovative thinking', 'community involvement', 'breaking conventions'],
        pisces: ['spiritual connection', 'artistic inspiration', 'compassionate action']
    };
    
    const theme = themes[sign][Math.floor(Math.random() * themes[sign].length)];
    
    return `Today's cosmic energy supports ${theme}. With the current planetary alignments, you may find yourself ${getRandomAction(sign)}. Trust your intuition and remain open to unexpected opportunities. This is an excellent time to ${getRandomAdvice(sign)}.`;
}

function getRandomAction(sign) {
    const actions = [
        'drawn to new experiences',
        'reflecting on recent decisions',
        'connecting with kindred spirits',
        'discovering hidden talents',
        'releasing old patterns',
        'embracing change with enthusiasm'
    ];
    return actions[Math.floor(Math.random() * actions.length)];
}

function getRandomAdvice(sign) {
    const advice = [
        'focus on self-care and personal growth',
        'express your authentic truth',
        'collaborate with others',
        'pursue creative projects',
        'set meaningful intentions',
        'honor your emotional needs'
    ];
    return advice[Math.floor(Math.random() * advice.length)];
}

// Journal Functions
function saveJournalEntry() {
    const input = document.getElementById('journalInput');
    const text = input.value.trim();
    
    if (!text) {
        alert('Please write something before saving!');
        return;
    }
    
    const entry = {
        id: Date.now(),
        date: new Date().toISOString(),
        text: text,
        sign: selectedSign
    };
    
    let entries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
    entries.unshift(entry);
    localStorage.setItem('journalEntries', JSON.stringify(entries));
    
    input.value = '';
    loadJournalEntries();
}

function loadJournalEntries() {
    const container = document.getElementById('journalEntries');
    const entries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
    
    if (entries.length === 0) {
        container.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 20px;">No journal entries yet. Start writing! ✨</p>';
        return;
    }
    
    let html = '';
    entries.forEach(entry => {
        const date = new Date(entry.date);
        html += `
            <div class="journal-entry">
                <div class="journal-date">
                    ${date.toLocaleDateString()} ${date.toLocaleTimeString()} 
                    ${signData[entry.sign].symbol} ${entry.sign}
                </div>
                <div class="journal-text">${entry.text}</div>
                <button class="delete-btn" onclick="deleteEntry(${entry.id})">Delete</button>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function deleteEntry(id) {
    let entries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
    entries = entries.filter(entry => entry.id !== id);
    localStorage.setItem('journalEntries', JSON.stringify(entries));
    loadJournalEntries();
}
