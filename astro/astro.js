// ======================= ZODIAC DATA =======================
const zodiacData = {
  aries: {
    colors: { primary: "#ed1131", accent: "#eecd11" },
    infocard: {
      glyph: "♈",
      element: "Fire",
      modality: "Cardinal",
      rulingPlanet: "Mars",
      symbolOrigin: "Ram; courage and action",
      house: "1st",
      colors: ["Red", "White"],
      crystal: "Diamond",
      flower: "Honeysuckle"
    },
    dailyMessages: [
      "Today is perfect for starting something new!",
      "Take charge but think before acting.",
      "Passion leads the way; channel it wisely.",
      "Adventure calls; embrace it.",
      "Confidence opens doors.",
      "Your energy is magnetic today.",
      "Patience can make success sweeter."
    ],
    weeklyPrompt: "Reflect on what new challenges excite you and why."
  },
  taurus: {
    colors: { primary: "#7aa94b", accent: "#aa4b7a" },
    infocard: {
      glyph: "♉",
      element: "Earth",
      modality: "Fixed",
      rulingPlanet: "Venus",
      symbolOrigin: "Bull; stability and sensuality",
      house: "2nd",
      colors: ["Green", "Pink"],
      crystal: "Emerald",
      flower: "Rose"
    },
    dailyMessages: [
      "Stability is your strength today.",
      "Treat yourself with love and care.",
      "Patience brings rewards.",
      "Your loyalty shines through.",
      "Slow and steady wins the race.",
      "Seek comfort in creativity.",
      "Ground yourself in nature."
    ],
    weeklyPrompt: "What comforts or routines bring you peace and joy?"
  },
  gemini: {
    colors: { primary: "#ffb750", accent: "#529aff" },
    infocard: {
      glyph: "♊",
      element: "Air",
      modality: "Mutable",
      rulingPlanet: "Mercury",
      symbolOrigin: "Twins; duality and communication",
      house: "3rd",
      colors: ["Yellow", "Light Green"],
      crystal: "Agate",
      flower: "Lily of the Valley"
    },
    dailyMessages: [
      "Curiosity will lead you today.",
      "A conversation may spark inspiration.",
      "Flexibility is your superpower.",
      "Embrace change with a smile.",
      "Share your ideas openly.",
      "Keep your mind active.",
      "Dual perspectives reveal hidden truths."
    ],
    weeklyPrompt: "How can you communicate more authentically this week?"
  },
  cancer: {
    colors: { primary: "#8da4d4", accent: "#bd8cd4" },
    infocard: {
      glyph: "♋",
      element: "Water",
      modality: "Cardinal",
      rulingPlanet: "Moon",
      symbolOrigin: "Crab; nurturing and protective",
      house: "4th",
      colors: ["Silver", "White"],
      crystal: "Moonstone",
      flower: "White Rose"
    },
    dailyMessages: [
      "Your intuition guides you today.",
      "Nurture someone in need.",
      "Emotional honesty brings clarity.",
      "Protect your energy; set boundaries.",
      "Home and family provide grounding.",
      "Self-care is essential.",
      "Let your nurturing spirit shine."
    ],
    weeklyPrompt: "Reflect on what makes you feel safe and cared for."
  },
  leo: {
    colors: { primary: "#fe5617", accent: "#c0fe16" },
    infocard: {
      glyph: "♌",
      element: "Fire",
      modality: "Fixed",
      rulingPlanet: "Sun",
      symbolOrigin: "Lion; leadership and creativity",
      house: "5th",
      colors: ["Gold", "Orange"],
      crystal: "Peridot",
      flower: "Sunflower"
    },
    dailyMessages: [
      "Shine brightly today!",
      "Leadership opportunities abound.",
      "Express creativity freely.",
      "Generosity brings unexpected joy.",
      "Take pride in your accomplishments.",
      "Confidence attracts support.",
      "Let your inner light guide others."
    ],
    weeklyPrompt: "How can you share your creativity with the world this week?"
  },
  virgo: {
    colors: { primary: "#e0ad87", accent: "#ac85e0" },
    infocard: {
      glyph: "♍",
      element: "Earth",
      modality: "Mutable",
      rulingPlanet: "Mercury",
      symbolOrigin: "Maiden; analytical and service-oriented",
      house: "6th",
      colors: ["Navy", "Beige"],
      crystal: "Sapphire",
      flower: "Buttercup"
    },
    dailyMessages: [
      "Details matter today.",
      "Organization brings clarity.",
      "Focus on practical solutions.",
      "Serve others with kindness.",
      "Your analytical mind is sharp.",
      "Avoid overthinking small problems.",
      "Mindfulness strengthens productivity."
    ],
    weeklyPrompt: "How can you simplify your routines for better efficiency?"
  },
  libra: {
    colors: { primary: "#d31081", accent: "#1083d5" },
    infocard: {
      glyph: "♎",
      element: "Air",
      modality: "Cardinal",
      rulingPlanet: "Venus",
      symbolOrigin: "Scales; balance and harmony",
      house: "7th",
      colors: ["Blue", "Pink"],
      crystal: "Lapis Lazuli",
      flower: "Rose"
    },
    dailyMessages: [
      "Seek balance in your relationships today.",
      "Beauty surrounds you; notice it.",
      "Diplomacy solves conflicts.",
      "Treat yourself to something lovely.",
      "Make fair choices and stay calm.",
      "Harmony attracts support.",
      "Collaboration brings success."
    ],
    weeklyPrompt: "How can you create more harmony in your life this week?"
  },
  scorpio: {
    colors: { primary: "#952a6a", accent: "#93542a" },
    infocard: {
      glyph: "♏",
      element: "Water",
      modality: "Fixed",
      rulingPlanet: "Pluto & Mars",
      symbolOrigin: "Scorpion; intensity and transformation",
      house: "8th",
      colors: ["Black", "Red"],
      crystal: "Topaz",
      flower: "Red Carnation"
    },
    dailyMessages: [
      "Embrace transformation today.",
      "Your intuition is strong.",
      "Passion fuels your decisions.",
      "Trust yourself and dig deep.",
      "Secrets may come to light.",
      "Emotional honesty empowers.",
      "Loyalty is your superpower."
    ],
    weeklyPrompt: "Reflect on areas where transformation could improve your life."
  },
  sagittarius: {
    colors: { primary: "#462b89", accent: "#882b6d" },
    infocard: {
      glyph: "♐",
      element: "Fire",
      modality: "Mutable",
      rulingPlanet: "Jupiter",
      symbolOrigin: "Archer; freedom and adventure",
      house: "9th",
      colors: ["Purple", "Blue"],
      crystal: "Turquoise",
      flower: "Carnation"
    },
    dailyMessages: [
      "Adventure awaits—embrace it.",
      "Learning brings joy today.",
      "Optimism attracts good fortune.",
      "Freedom fuels creativity.",
      "Be honest but tactful.",
      "Explore something new.",
      "Let curiosity lead your choices."
    ],
    weeklyPrompt: "What new experiences will you seek this week?"
  },
  capricorn: {
    colors: { primary: "#633223", accent: "#312262" },
    infocard: {
      glyph: "♑",
      element: "Earth",
      modality: "Cardinal",
      rulingPlanet: "Saturn",
      symbolOrigin: "Sea-Goat; ambition and discipline",
      house: "10th",
      colors: ["Brown", "Dark Green"],
      crystal: "Garnet",
      flower: "Ivy"
    },
    dailyMessages: [
      "Patience is your ally today.",
      "Small steps lead to big success.",
      "Focus on long-term goals.",
      "Discipline brings rewards.",
      "Responsibility strengthens character.",
      "Slow and steady wins the race.",
      "Boundaries protect your energy."
    ],
    weeklyPrompt: "How can you structure your week to support your ambitions?"
  },
  aquarius: {
    colors: { primary: "#48c6d5", accent: "#5648d5" },
    infocard: {
      glyph: "♒",
      element: "Air",
      modality: "Fixed",
      rulingPlanet: "Uranus & Saturn",
      symbolOrigin: "Water Bearer; innovation and humanitarianism",
      house: "11th",
      colors: ["Electric Blue", "Silver"],
      crystal: "Amethyst",
      flower: "Orchid"
    },
    dailyMessages: [
      "Embrace your uniqueness today.",
      "Collaboration sparks creativity.",
      "Forward-thinking leads to opportunities.",
      "Your ideas inspire others.",
      "Stay open to innovation.",
      "Balance independence with connection.",
      "Embrace change gracefully."
    ],
    weeklyPrompt: "How can you innovate or think differently this week?"
  },
  pisces: {
    colors: { primary: "#8664dc", accent: "#65dc87" },
    infocard: {
      glyph: "♓",
      element: "Water",
      modality: "Mutable",
      rulingPlanet: "Neptune & Jupiter",
      symbolOrigin: "Fish; intuition and empathy",
      house: "12th",
      colors: ["Sea Green", "Lavender"],
      crystal: "Aquamarine",
      flower: "Water Lily"
    },
    dailyMessages: [
      "Follow your intuition today.",
      "Creativity flows easily—capture it.",
      "Compassion strengthens connections.",
      "Rest and recharge your energy.",
      "Dreams reveal insights.",
      "Let empathy guide decisions.",
      "Small acts of kindness ripple outward."
    ],
    weeklyPrompt: "How can you express your creativity or intuition this week?"
  }
};

// ======================= FUNCTIONS =======================

function todayKey(sign) {
  const d = new Date();
  return `${sign}-${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

function getDailyHoroscope(sign) {
  const key = todayKey(sign);
  const saved = localStorage.getItem(key);
  if (saved) return saved;
  const msgs = zodiacData[sign].dailyMessages;
  const msg = msgs[new Date().getDate() % msgs.length];
  localStorage.setItem(key, msg);
  localStorage.setItem("lastViewedSign", sign);
  return msg;
}

function populateInfocard(sign) {
  const data = zodiacData[sign].infocard;
  if (!data) return;
  document.getElementById("infocard-glyph").textContent = data.glyph;
  document.getElementById("infocard-element").textContent = data.element;
  document.getElementById("infocard-modality").textContent = data.modality;
  document.getElementById("infocard-planet").textContent = data.rulingPlanet;
  document.getElementById("infocard-symbol").textContent = data.symbolOrigin;
  document.getElementById("infocard-house").textContent = data.house;
  document.getElementById("infocard-colors").textContent = data.colors.join(", ");
  document.getElementById("infocard-crystal").textContent = data.crystal;
  document.getElementById("infocard-flower").textContent = data.flower;
}

function populateDailyAndWeekly(sign) {
  const dailyEl = document.getElementById("daily-box");
  const weeklyEl = document.getElementById("weekly-box");
  if (dailyEl) dailyEl.textContent = getDailyHoroscope(sign);
  if (weeklyEl) weeklyEl.textContent = zodiacData[sign].weeklyPrompt;
}

function setPageColors(sign) {
  const root = document.documentElement;
  const signColors = zodiacData[sign].colors;
  if (!signColors) return;
  root.style.setProperty('--primary', signColors.primary);
  root.style.setProperty('--accent', signColors.accent);
}

function initSignPage(sign) {
  setPageColors(sign);
  populateInfocard(sign);
  populateDailyAndWeekly(sign);
}
