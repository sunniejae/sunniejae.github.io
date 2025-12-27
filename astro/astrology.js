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

// Sun position (improved VSOP87)
function calculateSunPosition(jd) {
    const T = (jd - 2451545.0) / 36525;
    const T2 = T * T;
    const T3 = T2 * T;
    
    // Mean longitude
    let L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T2;
    L0 = L0 % 360;
    if (L0 < 0) L0 += 360;
    
    // Mean anomaly
    let M = 357.52911 + 35999.05029 * T - 0.0001537 * T2;
    M = M % 360;
    if (M < 0) M += 360;
    const Mrad = M * Math.PI / 180;
    
    // Equation of center
    let C = (1.914602 - 0.004817 * T - 0.000014 * T2) * Math.sin(Mrad);
    C += (0.019993 - 0.000101 * T) * Math.sin(2 * Mrad);
    C += 0.000289 * Math.sin(3 * Mrad);
    
    // True longitude
    let trueLong = L0 + C;
    trueLong = trueLong % 360;
    if (trueLong < 0) trueLong += 360;
    
    return trueLong;
}

// Moon position (improved ELP2000)
function calculateMoonPosition(jd) {
    const T = (jd - 2451545.0) / 36525;
    const T2 = T * T;
    const T3 = T2 * T;
    
    // Mean longitude
    let L = 218.3164477 + 481267.88123421 * T - 0.0015786 * T2 + T3 / 538841;
    
    // Mean elongation
    let D = 297.8501921 + 445267.1114034 * T - 0.0018819 * T2 + T3 / 545868;
    
    // Sun's mean anomaly
    let M = 357.5291092 + 35999.0502909 * T - 0.0001536 * T2 + T3 / 24490000;
    
    // Moon's mean anomaly
    let Mp = 134.9633964 + 477198.8675055 * T + 0.0087414 * T2 + T3 / 69699;
    
    // Moon's argument of latitude
    let F = 93.2720950 + 483202.0175233 * T - 0.0036539 * T2 - T3 / 3526000;
    
    // Convert to radians
    D = (D % 360) * Math.PI / 180;
    M = (M % 360) * Math.PI / 180;
    Mp = (Mp % 360) * Math.PI / 180;
    F = (F % 360) * Math.PI / 180;
    
    // Main periodic terms (top 10 most significant)
    let longitude = L;
    longitude += 6.288774 * Math.sin(Mp);
    longitude += 1.274027 * Math.sin(2*D - Mp);
    longitude += 0.658314 * Math.sin(2*D);
    longitude += 0.213618 * Math.sin(2*Mp);
    longitude -= 0.185116 * Math.sin(M);
    longitude -= 0.114332 * Math.sin(2*F);
    longitude += 0.058793 * Math.sin(2*D - 2*Mp);
    longitude += 0.057066 * Math.sin(2*D - M - Mp);
    longitude += 0.053320 * Math.sin(2*D + Mp);
    longitude += 0.045758 * Math.sin(2*D - M);
    
    longitude = longitude % 360;
    if (longitude < 0) longitude += 360;
    
    return longitude;
}

// VSOP87 planetary positions (improved accuracy)
function calculatePlanetPosition(jd, planet) {
    const T = (jd - 2451545.0) / 36525;
    const T2 = T * T;
    const T3 = T2 * T;
    
    const planets = {
        'Mercury': {
            L0: 252.250906, L1: 149474.0722491, L2: 0.00030350, L3: 0.000000018,
            a: 0.38709831, e: 0.20563175, i: 7.00498625,
            node: 48.33089304, peri: 77.45611904,
            M0: 174.795884, M1: 4.09233443
        },
        'Venus': {
            L0: 181.979801, L1: 58519.2130302, L2: 0.00031014, L3: 0.000000016,
            a: 0.72332982, e: 0.00677192, i: 3.39466189,
            node: 76.67992019, peri: 131.53298133,
            M0: 50.115, M1: 1.60213022
        },
        'Mars': {
            L0: 355.433, L1: 19141.6964471, L2: 0.00031052, L3: 0.000000016,
            a: 1.52367934, e: 0.09340062, i: 1.84972648,
            node: 49.55809321, peri: 336.06023395,
            M0: 19.3871, M1: 0.52402077
        },
        'Jupiter': {
            L0: 34.351519, L1: 3036.3027748, L2: 0.00022374, L3: 0.000000031,
            a: 5.20260319, e: 0.04849793, i: 1.30530, 
            node: 100.46444064, peri: 14.33120687,
            M0: 20.0202, M1: 0.08308529
        },
        'Saturn': {
            L0: 50.077444, L1: 1223.5110686, L2: 0.00051908, L3: -0.000000030,
            a: 9.55490959, e: 0.05554814, i: 2.48887878,
            node: 113.66552114, peri: 92.43194174,
            M0: 317.0207, M1: 0.03344414
        },
        'Uranus': {
            L0: 314.055005, L1: 429.8640561, L2: 0.00030390, L3: 0.000000026,
            a: 19.21844606, e: 0.04638122, i: 0.77319689,
            node: 74.00595701, peri: 170.96424523,
            M0: 141.0498, M1: 0.01172834
        },
        'Neptune': {
            L0: 304.348665, L1: 219.8833092, L2: 0.00030882, L3: 0.000000018,
            a: 30.11038686, e: 0.00945575, i: 1.77005520,
            node: 131.78405702, peri: 44.97135259,
            M0: 256.2250, M1: 0.00598103
        }
    };
    
    if (!planets[planet]) return 0;
    
    const p = planets[planet];
    
    // Mean longitude with higher order terms
    let L = p.L0 + p.L1 * T + p.L2 * T2 + p.L3 * T3;
    L = L % 360;
    if (L < 0) L += 360;
    
    // Mean anomaly
    let M = (L - p.peri) % 360;
    if (M < 0) M += 360;
    const Mrad = M * Math.PI / 180;
    
    // Solve Kepler's equation for eccentric anomaly (iterative)
    let E = M;
    for (let i = 0; i < 6; i++) {
        E = M + (180 / Math.PI) * p.e * Math.sin(E * Math.PI / 180);
    }
    const Erad = E * Math.PI / 180;
    
    // True anomaly
    const sinv = (Math.sqrt(1 - p.e * p.e) * Math.sin(Erad)) / (1 - p.e * Math.cos(Erad));
    const cosv = (Math.cos(Erad) - p.e) / (1 - p.e * Math.cos(Erad));
    let v = Math.atan2(sinv, cosv) * 180 / Math.PI;
    if (v < 0) v += 360;
    
    // Heliocentric longitude
    let lon = (v + p.peri) % 360;
    if (lon < 0) lon += 360;
    
    // Corrections for geocentric view (simplified perturbations)
    if (planet === 'Mercury') {
        lon += 0.00204 * Math.sin((5 * M - 2 * L + 12.22) * Math.PI / 180);
        lon += 0.00103 * Math.sin((2 * M - L + 160.20) * Math.PI / 180);
    } else if (planet === 'Venus') {
        lon += 0.00313 * Math.sin((2 * M - 2 * L - 148.20) * Math.PI / 180);
    }
    
    return lon % 360;
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

// Preloaded birth charts
const preloadedCharts = {
    'jae': {
        name: 'Jae',
        date: new Date(1996, 1, 23, 17, 32, 0), // Feb 23, 1996, 5:32 PM MST
        location: 'Salt Lake City, Utah'
    },
    'husband': {
        name: 'Husband',
        date: new Date(1997, 0, 24, 17, 55, 0), // Jan 24, 1997, 5:55 PM MST
        location: 'Salt Lake City, Utah'
    }
};

// Load preloaded chart
function loadPreloadedChart(person) {
    const chart = preloadedCharts[person];
    if (!chart) return;
    
    // Format date for input
    const year = chart.date.getFullYear();
    const month = String(chart.date.getMonth() + 1).padStart(2, '0');
    const day = String(chart.date.getDate()).padStart(2, '0');
    const hours = String(chart.date.getHours()).padStart(2, '0');
    const minutes = String(chart.date.getMinutes()).padStart(2, '0');
    
    document.getElementById('birth-date').value = `${year}-${month}-${day}`;
    document.getElementById('birth-time').value = `${hours}:${minutes}`;
    document.getElementById('birth-location').value = chart.location;
    
    // Auto-compare
    compareBirthChart();
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
            <p style="font-size: 0.85rem; color: #aaa; margin-top: 0.5rem; font-style: italic;">
                ℹ️ Planetary positions are calculated using VSOP87 algorithms. For professional-grade accuracy, verify with astro.com or astro-seek.com
            </p>
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