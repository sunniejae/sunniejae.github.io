/* ============================================================================
   personafy.js — Noted.fm (Last.fm persona notebook)
   Signals renamed to psychological terms:
   - Range (was Diversity)
   - Intensity (was Obsession)
   - Drift (was Overlap)
   Includes optional tier words (Focused/Balanced/Expansive etc.)
============================================================================ */

/* =======================
   CONFIG
======================= */
const LASTFM_API_KEY = "5d8fee243f5e5315900f1a8efad7fb21";
const TOP_LIMIT = 100;
const RECENT_LIMIT = 50;

/* Canonical notebook+pen combos => fixed persona */
const PERSONA_BY_LOADOUT = {
  "locked diary|calligraphy": "archivist",
  "composition notebook|ballpoint pen": "note taker",
  "bullet journal|sparkle gel pen": "casual journaler",
  "leather|red ink": "main character energy",
  "sketchbook|charcoal": "doodler",
  "spiral notebook|pencil": "notes app is good enough"
};

const NOTEBOOK_OPTIONS = [
  "spiral notebook",
  "leather",
  "bullet journal",
  "locked diary",
  "composition notebook",
  "sketchbook"
];

const PEN_OPTIONS = [
  "sparkle gel pen",
  "charcoal",
  "ballpoint pen",
  "pencil",
  "red ink",
  "calligraphy"
];

const PERSONA_ORDER = [
  "archivist",
  "note taker",
  "casual journaler",
  "main character energy",
  "doodler",
  "notes app is good enough"
];

/* =======================
   COPY (subtle promo tone)
======================= */
const PERSONA_COPY = {
  archivist: {
    title: "The Archivist",
    listenerStyle:
      "You don’t just replay songs — you keep them. Your favorites feel like artifacts, and every listen is a little note to the future.",
    notedUse:
      "Your notebook resembles an encyclopedia of You. You write to preserve, not just express. Permanence is important. You keep notes for the future, not just for you.",
    lovesAboutNoted:
      "A safe space to leave it all behind.",
    blurb: "Today is already tomorrow's yesterday",
    stampText: "ARCHIVED"
  },

  "note taker": {
    title: "The Note Taker",
    listenerStyle:
      "You catch the small things. A lyric, a rhythm shift, the exact moment a song changes your mood — that’s where the story is.",
    notedUse:
      "Your notebook reads like minutes after a board meeting. The devil is in the details? Not for you. The details are the intrigue. You keep notes as a way of keeping memories.",
    lovesAboutNoted:
      "A place where details are encouraged, and controlled by you. Note as much- or as little- as you'd like.",
    blurb: "If it's important, it's worth being Noted.",
    stampText: "RECORDED"
  },

  "casual journaler": {
    title: "The Casual Journaler",
    listenerStyle:
      "You follow the feeling. You’ll replay what hits, but you’re always drifting toward something new — only the best songs earn a second page.",
    notedUse:
      "Your notebook has gaps between entries that last from days to years. Consistency isn't as important as safety and accessibility. You keep notes because the moment calls for it, not out of devotion.",
    lovesAboutNoted:
      "A place you can return to without FOMO. It's built for connection, not content",
    blurb: "Whether it's been a day or a decade, your Notebook is always there.",
    stampText: "ENTRY MADE"
  },

  "main character energy": {
    title: "Main Character Energy",
    listenerStyle:
      "You don’t put music on — you step into it. Every song is a scene, and you always know exactly what part of the story you’re in.",
    notedUse:
      "Your notebook entries always ends in an autograph. Your entries read like the novel of your life, or like you're talking to a dear friend. You take notes with intention, expression, and because you care.",
    lovesAboutNoted:
      "Somewhere that understands your life was never background noise.",
    blurb: "Dear Diary...",
    stampText: "SCENE LOGGED"
  },

  "notes app is good enough": {
    title: "Notes App Is Good Enough",
    listenerStyle:
      "You keep your favorites close, but you don’t overthink it. A song sticks, you save it. A thought shows up, you type it. That’s the whole system.",
    notedUse:
      "You note thoughts the second they appear — no performance anxiety, and just the right amount of effort",
    lovesAboutNoted:
      "A low stakes corner of the internet without like counts.",
    blurb: "My phone IS my notebook",
    stampText: "QUICK CAPTURE"
  },

  doodler: {
    title: "The Doodler",
    listenerStyle:
      "Your taste runs on curiosity. You follow whatever pulls at you, and half the time you don’t even know where you’re headed until you’re already there.",
    notedUse:
      "Your notebook is more abstract than a diary. You love the idea of a written journal, but you just end up sketching out your thoughts instead. Sometimes those scribbles say more than you could say in letters",
    lovesAboutNoted:
      "You don't need to pour your heart out. Just express what feels right. ",
    blurb: "A doodle says a million words",
    stampText: "IN PROGRESS"
  }
};

/* =======================
   PALETTES
======================= */
const PERSONA_PALETTES = {
  archivist: {
    paper: "#efe5d4",
    ink: "#231915",
    muted: "#5f4f46",
    line: "#7d675b",
    stamp: "#6f2330",
    bgTop: "#1c1717",
    bgBottom: "#0d0a0c",
    uiText: "#efe2d4",
    uiMuted: "#d8c2b0",
    uiDim: "#a99584",
    uiInputBorder: "#745f55",
    uiInputBg: "rgba(245, 233, 219, 0.11)",
    uiButtonBorder: "#85695f",
    uiButtonBg: "#ecddcb",
    uiButtonText: "#301f19",
    sharePaper: "#f0e4d3",
    shareInk: "#2c1d16",
    shareBorder: "#4d372d",
    shareMuted: "#5f4e43",
    noteA: "#dae4f0",
    noteB: "#ebd4de",
    noteAGlow: "rgba(218, 228, 240, 0.08)",
    noteBGlow: "rgba(235, 212, 222, 0.07)",
    noteBorder: "rgba(162, 178, 201, 0.45)",
    noteTape: "#ebd4de"
  },
  "casual journaler": {
    paper: "#f6efd8",
    ink: "#2c2518",
    muted: "#675c45",
    line: "#8b7a58",
    stamp: "#8e5a2a",
    bgTop: "#1d1a14",
    bgBottom: "#0f0d09",
    uiText: "#f3ebd8",
    uiMuted: "#d7ccb3",
    uiDim: "#aa9b7d",
    uiInputBorder: "#7c6f58",
    uiInputBg: "rgba(247, 238, 216, 0.12)",
    uiButtonBorder: "#948468",
    uiButtonBg: "#efe2c8",
    uiButtonText: "#362919",
    sharePaper: "#f7efd8",
    shareInk: "#332716",
    shareBorder: "#5a4630",
    shareMuted: "#67563d",
    noteA: "#ebd4de",
    noteB: "#dae4f0",
    noteAGlow: "rgba(235, 212, 222, 0.08)",
    noteBGlow: "rgba(218, 228, 240, 0.07)",
    noteBorder: "rgba(180, 156, 128, 0.45)",
    noteTape: "#f7e3bc"
  },
  "main character energy": {
    paper: "#f4e1d2",
    ink: "#2c1414",
    muted: "#6f3f3b",
    line: "#a36a63",
    stamp: "#9f1f30",
    bgTop: "#201112",
    bgBottom: "#11090a",
    uiText: "#f1ddd1",
    uiMuted: "#dcb7ac",
    uiDim: "#ab887f",
    uiInputBorder: "#8c5f5c",
    uiInputBg: "rgba(242, 216, 207, 0.11)",
    uiButtonBorder: "#9e6a63",
    uiButtonBg: "#f3d6cc",
    uiButtonText: "#3f1c1a",
    sharePaper: "#f4e2d3",
    shareInk: "#341919",
    shareBorder: "#663734",
    shareMuted: "#774945",
    noteA: "#f6ccdb",
    noteB: "#dae4f0",
    noteAGlow: "rgba(246, 204, 219, 0.10)",
    noteBGlow: "rgba(218, 228, 240, 0.06)",
    noteBorder: "rgba(178, 122, 134, 0.50)",
    noteTape: "#ffddea"
  },
  "notes app is good enough": {
    paper: "#eceef0",
    ink: "#20262c",
    muted: "#55616e",
    line: "#7f8c99",
    stamp: "#35526f",
    bgTop: "#131a1f",
    bgBottom: "#0a0f14",
    uiText: "#dde4eb",
    uiMuted: "#b7c3cf",
    uiDim: "#8e9cac",
    uiInputBorder: "#5f6f7f",
    uiInputBg: "rgba(221, 229, 237, 0.1)",
    uiButtonBorder: "#6f8193",
    uiButtonBg: "#dce5ee",
    uiButtonText: "#243241",
    sharePaper: "#edf1f5",
    shareInk: "#1f2a35",
    shareBorder: "#45596b",
    shareMuted: "#556779",
    noteA: "#dae4f0",
    noteB: "#c4d3e6",
    noteAGlow: "rgba(218, 228, 240, 0.09)",
    noteBGlow: "rgba(196, 211, 230, 0.07)",
    noteBorder: "rgba(127, 148, 169, 0.48)",
    noteTape: "#dfeaf5"
  },
  "note taker": {
    paper: "#f0eadb",
    ink: "#1f231d",
    muted: "#4f5f4c",
    line: "#72806f",
    stamp: "#395342",
    bgTop: "#151b16",
    bgBottom: "#0c100c",
    uiText: "#e4e9de",
    uiMuted: "#c0ccb9",
    uiDim: "#94a58f",
    uiInputBorder: "#677565",
    uiInputBg: "rgba(226, 233, 220, 0.1)",
    uiButtonBorder: "#768872",
    uiButtonBg: "#e1e8d9",
    uiButtonText: "#223223",
    sharePaper: "#edf0e5",
    shareInk: "#202820",
    shareBorder: "#4c5a4a",
    shareMuted: "#52634f",
    noteA: "#d8e8da",
    noteB: "#dae4f0",
    noteAGlow: "rgba(216, 232, 218, 0.09)",
    noteBGlow: "rgba(218, 228, 240, 0.06)",
    noteBorder: "rgba(116, 145, 119, 0.50)",
    noteTape: "#e4f1df"
  },
  doodler: {
    paper: "#f4e8d8",
    ink: "#2b231f",
    muted: "#6f5a46",
    line: "#927455",
    stamp: "#c55828",
    bgTop: "#231a13",
    bgBottom: "#130d08",
    uiText: "#f2e5d4",
    uiMuted: "#dcc4a8",
    uiDim: "#b59575",
    uiInputBorder: "#8a6b4f",
    uiInputBg: "rgba(245, 227, 203, 0.12)",
    uiButtonBorder: "#9e7652",
    uiButtonBg: "#efd5b8",
    uiButtonText: "#3b2818",
    sharePaper: "#f5e8d7",
    shareInk: "#322419",
    shareBorder: "#694a30",
    shareMuted: "#71563f",
    noteA: "#f9dac3",
    noteB: "#ebd4de",
    noteAGlow: "rgba(249, 218, 195, 0.10)",
    noteBGlow: "rgba(235, 212, 222, 0.07)",
    noteBorder: "rgba(186, 128, 94, 0.52)",
    noteTape: "#ffe5b6"
  }
};

const PERSONA_STICKER_COLORS = {
  archivist: { a: "#dae4f0", b: "#ebd4de", border: "#a2b2c9", tape: "#ebd4de" },
  "casual journaler": { a: "#ebd4de", b: "#dae4f0", border: "#b49c80", tape: "#f7e3bc" },
  "main character energy": { a: "#f6ccdb", b: "#eec3ce", border: "#b27a86", tape: "#ffddea" },
  "notes app is good enough": { a: "#dae4f0", b: "#c4d3e6", border: "#7f94a9", tape: "#dfeaf5" },
  "note taker": { a: "#d8e8da", b: "#dae4f0", border: "#749177", tape: "#e4f1df" },
  doodler: { a: "#f9dac3", b: "#ebd4de", border: "#ba805e", tape: "#ffe5b6" }
};

/* =======================
   NOTEBOOK / PEN STYLES
======================= */
const NOTEBOOK_STYLES = {
  "spiral notebook": {
    texture: "/assets/noted/spiralnotebook.png",
    entryFont: '"Noted", serif',
    entryInk: "#3b3028"
  },
  leather: {
    texture: "/assets/noted/leatherboundpaper.png",
    entryFont: '"Noted", serif',
    entryInk: "#44271f"
  },
  "bullet journal": {
    texture: "/assets/noted/bulletjournal.png",
    entryFont: '"Noted", serif',
    entryInk: "#333326"
  },
  "locked diary": {
    texture: "/assets/noted/diary.png",
    entryFont: '"Noted", serif',
    entryInk: "#382926"
  },
  "composition notebook": {
    texture: "/assets/noted/compositionpaper.png",
    entryFont: '"Noted", serif',
    entryInk: "#2e2e2e"
  },
  sketchbook: {
    texture: "/assets/noted/sketchbookpaper.png",
    entryFont: '"Noted", serif',
    entryInk: "#2a2621"
  }
};

const PERSONA_BACKGROUND_OVERRIDES = {
  "notes app is good enough": "/assets/noted/phonescreen.png"
};

const PEN_STYLES = {
  "sparkle gel pen": { ink: "#9b0994", font: '"Lulu", serif' },
  charcoal: { ink: "#303030", font: '"Jane", serif' },
  "ballpoint pen": { ink: "#1f3f8b", font: '"Jane", serif' },
  pencil: { ink: "#545454", font: '"Ken", serif' },
  "red ink": { ink: "#6f0014", font: '"Anne", serif' },
  calligraphy: { ink: "#261d1c", font: '"Elizabeth", serif' }
};

const ASSETS_REGISTRY = {
  notebooks: {
    "spiral notebook": "/assets/noted/spiral.png",
    leather: "/assets/noted/leatherbound.png",
    "bullet journal": "/assets/noted/bullet.png",
    "locked diary": "/assets/noted/locked.png",
    "composition notebook": "/assets/noted/composition.png",
    sketchbook: "/assets/noted/sketchbook.png"
  },
  pens: {
    "sparkle gel pen": "/assets/noted/gelpen.png",
    charcoal: "/assets/noted/charcoal.png",
    "ballpoint pen": "/assets/noted/ballpoint.png",
    pencil: "/assets/noted/pencil.png",
    "red ink": "/assets/noted/redink.png",
    calligraphy: "/assets/noted/quill.png"
  }
};

/* =======================
   DOM
======================= */
const el = {
  usernameInput: document.getElementById("usernameInput"),
  generateBtn: document.getElementById("generateBtn"),
  loading: document.getElementById("loading"),
  result: document.getElementById("result"),
  resultPaper: document.getElementById("resultPaper"),
  entrySheet: document.getElementById("entrySheet"),
  stampText: document.getElementById("stampText"),
  personaTitle: document.getElementById("personaTitle"),
  blurb: document.getElementById("blurb"),
  notebookImage: document.getElementById("notebookImage"),
  penImage: document.getElementById("penImage"),
  diversitySignal: document.getElementById("diversitySignal"),
  obsessionSignal: document.getElementById("obsessionSignal"),
  overlapSignal: document.getElementById("overlapSignal"),
  listenerStyle: document.getElementById("listenerStyle"),
  notedUse: document.getElementById("notedUse"),
  lovesAboutNoted: document.getElementById("lovesAboutNoted"),
  topSongWeek: document.getElementById("topSongWeek"),
  topArtistWeek: document.getElementById("topArtistWeek"),
  topArtistImage: document.getElementById("topArtistImage"),
  signalsInfoBtn: document.getElementById("signalsInfoBtn"),
  signalsModal: document.getElementById("signalsModal"),
  signalsModalBackdrop: document.getElementById("signalsModalBackdrop"),
  signalsModalCloseBtn: document.getElementById("signalsModalCloseBtn"),
  generateCardBtn: document.getElementById("generateCardBtn"),
  shareBtn: document.getElementById("shareBtn"),
  saveBtn: document.getElementById("saveBtn"),
  previewWrap: document.getElementById("previewWrap"),
  previewImage: document.getElementById("previewImage"),
  shareCard: document.getElementById("shareCard"),
  shareDate: document.getElementById("shareDate"),
  shareStamp: document.getElementById("shareStamp"),
  sharePeriod: document.getElementById("sharePeriod"),
  shareTitle: document.getElementById("shareTitle"),
  shareBlurb: document.getElementById("shareBlurb"),
  shareNotebookImage: document.getElementById("shareNotebookImage"),
  sharePenImage: document.getElementById("sharePenImage"),
  shareTopArtist: document.getElementById("shareTopArtist"),
  shareTopSong: document.getElementById("shareTopSong"),
  shareTopArtistImage: document.getElementById("shareTopArtistImage"),
  shareDiversitySignal: document.getElementById("shareDiversitySignal"),
  shareObsessionSignal: document.getElementById("shareObsessionSignal"),
  shareOverlapSignal: document.getElementById("shareOverlapSignal"),
  shareDataSummary: document.getElementById("shareDataSummary"),
  shareListenerStyle: document.getElementById("shareListenerStyle"),
  shareNotedUse: document.getElementById("shareNotedUse"),
  shareLovesAboutNoted: document.getElementById("shareLovesAboutNoted")
};

let currentModel = null;
let latestCardDataUrl = "";

if (el.signalsInfoBtn) {
  el.signalsInfoBtn.hidden = true;
  el.signalsInfoBtn.disabled = true;
}

function openSignalsModal() {
  if (!el.signalsModal) return;
  el.signalsModal.hidden = false;
}

function closeSignalsModal() {
  if (!el.signalsModal) return;
  el.signalsModal.hidden = true;
}

/* =======================
   THEME APPLIERS
======================= */
function applyPersonaPalette(persona) {
  const palette = PERSONA_PALETTES[persona] || PERSONA_PALETTES["casual journaler"];
  const sticker = PERSONA_STICKER_COLORS[persona] || PERSONA_STICKER_COLORS["casual journaler"];
  const root = document.documentElement;

  root.style.setProperty("--paper", palette.paper);
  root.style.setProperty("--ink", palette.ink);
  root.style.setProperty("--muted", palette.muted);
  root.style.setProperty("--line", palette.line);
  root.style.setProperty("--stamp", palette.stamp);

  // Keep the outer page background consistent between input and results.

  root.style.setProperty("--ui-text", palette.uiText);
  root.style.setProperty("--ui-muted", palette.uiMuted);
  root.style.setProperty("--ui-dim", palette.uiDim);

  root.style.setProperty("--ui-input-border", palette.uiInputBorder);
  root.style.setProperty("--ui-input-bg", palette.uiInputBg);

  root.style.setProperty("--ui-button-border", palette.uiButtonBorder);
  root.style.setProperty("--ui-button-bg", palette.uiButtonBg);
  root.style.setProperty("--ui-button-text", palette.uiButtonText);

  root.style.setProperty("--share-paper", palette.sharePaper);
  root.style.setProperty("--share-ink", palette.shareInk);
  root.style.setProperty("--share-border", palette.shareBorder);
  root.style.setProperty("--share-muted", palette.shareMuted);

  root.style.setProperty("--note-a", palette.noteA || "#dae4f0");
  root.style.setProperty("--note-b", palette.noteB || "#ebd4de");
  root.style.setProperty("--note-a-glow", palette.noteAGlow || "rgba(218, 228, 240, 0.08)");
  root.style.setProperty("--note-b-glow", palette.noteBGlow || "rgba(235, 212, 222, 0.07)");
  root.style.setProperty("--note-border", palette.noteBorder || "rgba(162, 178, 201, 0.45)");
  root.style.setProperty("--note-tape", palette.noteTape || "#ebd4de");

  root.style.setProperty("--sticker-a", sticker.a || "#dae4f0");
  root.style.setProperty("--sticker-b", sticker.b || "#ebd4de");
  root.style.setProperty("--sticker-border", sticker.border || "#a2b2c9");
  root.style.setProperty("--sticker-tape", sticker.tape || "#ebd4de");
}

function applyNotebookAndPen(notebook, pen) {
  const notebookStyle = NOTEBOOK_STYLES[notebook] || NOTEBOOK_STYLES["bullet journal"];
  const penStyle = PEN_STYLES[pen] || PEN_STYLES["ballpoint pen"];
  const textureToUse =
    PERSONA_BACKGROUND_OVERRIDES[currentModel?.persona] || notebookStyle.texture;

  const root = document.documentElement;
  root.style.setProperty("--paper-image", `url("${textureToUse}")`);
  root.style.setProperty("--share-paper-image", `url("${textureToUse}")`);
  root.style.setProperty("--entry-font", penStyle.font || notebookStyle.entryFont);
  root.style.setProperty("--entry-ink", penStyle.ink || notebookStyle.entryInk);

  document.body.classList.toggle("glitter-pen", pen === "sparkle gel pen");
}

/* =======================
   UTILS
======================= */
function clamp01(v) { return Math.max(0, Math.min(1, v)); }
function safeDivide(n, d) { return d ? (n / d) : 0; }
function pct(v) { return `${Math.round(clamp01(v) * 100)}%`; }

function stylizeNoted(text) {
  return String(text || "").replace(/\bNoted\b|\bnoted\b/g, (m) => {
    const casing = m === "Noted" ? "Noted" : "noted";
    return `<span class="noted-word">${casing}</span>`;
  });
}

/* =======================
   SIGNALS (psychological)
   Range     = uniqueArtists / totalTracks
   Intensity = topArtistPlays / totalPlays
   Drift     = 1 - recentOverlap (so higher = more changing)
   (We display Drift based on recentOverlap but word it as “Drift”)
======================= */
function computeSignals(stats) {
  const range = clamp01(safeDivide(stats.uniqueArtists, stats.totalTracks));
  const intensity = clamp01(safeDivide(stats.topArtistPlays, stats.totalPlays));

  // recentOverlap: 0..1 where higher means more consistent with favorites
  const overlap = clamp01(stats.recentOverlap);
  const drift = clamp01(1 - overlap); // higher drift = more evolving right now

  const exploratory = overlap < 0.3;
  return { range, intensity, overlap, drift, exploratory };
}

function tierRange(v) {
  if (v < 0.36) return "Focused";
  if (v < 0.66) return "Balanced";
  return "Expansive";
}

function tierIntensity(v) {
  if (v < 0.21) return "Fluid";
  if (v < 0.46) return "Anchored";
  return "Devoted";
}

function tierDrift(v) {
  if (v < 0.26) return "Constant";
  if (v < 0.56) return "Shifting";
  return "Evolving";
}

/* =======================
   PICKERS
======================= */
function pickNotebook(stats) {
  const s = computeSignals(stats);
  const frac = (v) => v - Math.floor(v);
  // Blend signals into a deterministic pseudo-random bucket (0..5).
  // This keeps distribution close to even while still driven by listening metrics.
  const score = frac(s.range * 1.37 + s.intensity * 0.91 + s.drift * 0.53);
  const idx = Math.min(5, Math.floor(score * NOTEBOOK_OPTIONS.length));
  return NOTEBOOK_OPTIONS[idx];
}

function pickPen(stats) {
  const s = computeSignals(stats);
  const frac = (v) => v - Math.floor(v);
  const score = frac(s.range * 0.67 + s.intensity * 1.73 + s.drift * 1.11);
  const idx = Math.min(5, Math.floor(score * PEN_OPTIONS.length));
  return PEN_OPTIONS[idx];
}

function pickPersonaFromLoadout(notebook, pen) {
  const key = `${notebook}|${pen}`;
  if (PERSONA_BY_LOADOUT[key]) return PERSONA_BY_LOADOUT[key];

  let nonCanonicalRank = 0;
  for (const n of NOTEBOOK_OPTIONS) {
    for (const p of PEN_OPTIONS) {
      const combo = `${n}|${p}`;
      if (PERSONA_BY_LOADOUT[combo]) continue;
      if (combo === key) return PERSONA_ORDER[nonCanonicalRank % PERSONA_ORDER.length];
      nonCanonicalRank += 1;
    }
  }
  return "casual journaler";
}

/* =======================
   LAST.FM NORMALIZER
======================= */
function lastfmToNormalizedStats(raw) {
  const tracks = raw.toptracks?.track || [];
  const recent = raw.recenttracks?.track || [];

  const totalTracks = tracks.length;
  const totalPlays = tracks.reduce((sum, t) => sum + Number(t.playcount || 0), 0);

  const artistPlayMap = {};
  tracks.forEach((t) => {
    const artistName = t?.artist?.name || "Unknown Artist";
    artistPlayMap[artistName] = (artistPlayMap[artistName] || 0) + Number(t.playcount || 0);
  });

  const uniqueArtists = Object.keys(artistPlayMap).length;

  const topArtistEntry =
    Object.entries(artistPlayMap).sort((a, b) => b[1] - a[1])[0] || ["Unknown Artist", 0];
  const topArtistName = topArtistEntry[0];
  const topArtistPlays = topArtistEntry[1];

  const topArtistSet = new Set(
    Object.entries(artistPlayMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([name]) => name.toLowerCase())
  );

  const recentArtistSet = new Set(
    recent.map((t) => (t?.artist?.["#text"] || "").toLowerCase()).filter(Boolean)
  );

  let overlapCount = 0;
  recentArtistSet.forEach((name) => {
    if (topArtistSet.has(name)) overlapCount += 1;
  });

  const recentOverlap = recentArtistSet.size ? overlapCount / recentArtistSet.size : 0;

  return {
    totalTracks,
    totalPlays,
    uniqueArtists,
    topArtistName,
    topArtistPlays,
    recentOverlap,
    topGenres: [],
    periodLabel: "Last 30 Days",
    topTrackName: tracks[0]?.name || "Unknown Song",
    topTrackArtist: tracks[0]?.artist?.name || "Unknown Artist"
  };
}

/* =======================
   FETCH
======================= */
async function fetchLastFmBundle(username) {
  const [topRes, recentRes] = await Promise.all([
    fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${encodeURIComponent(
        username
      )}&api_key=${LASTFM_API_KEY}&format=json&limit=${TOP_LIMIT}&period=1month`
    ),
    fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${encodeURIComponent(
        username
      )}&api_key=${LASTFM_API_KEY}&format=json&limit=${RECENT_LIMIT}`
    )
  ]);

  const topData = await topRes.json();
  const recentData = await recentRes.json();

  if (!topData?.toptracks?.track?.length) {
    throw new Error("Could not load top tracks. Check username and profile visibility.");
  }

  return { toptracks: topData.toptracks, recenttracks: recentData.recenttracks };
}

/* =======================
   RENDER
======================= */
function formatDataSummary(stats) {
  const tracks = Number(stats?.totalTracks || 0).toLocaleString();
  const plays = Number(stats?.totalPlays || 0).toLocaleString();
  const artists = Number(stats?.uniqueArtists || 0).toLocaleString();
  const topArtist = stats?.topArtistName || "Unknown Artist";
  return `Listened to your ${tracks} top tracks from the past 30 days and found ${plays} plays by ${artists} artists`;
}

async function fetchTopArtistImage(artistName) {
  if (!artistName) return "";
  try {
    const res = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(
        artistName
      )}&api_key=${LASTFM_API_KEY}&format=json`
    );
    const data = await res.json();
    const images = Array.isArray(data?.artist?.image) ? data.artist.image : [];
    const preferredSizes = ["mega", "extralarge", "large", "medium", "small"];
    for (const size of preferredSizes) {
      const url = images.find((img) => img?.size === size)?.["#text"];
      if (url) return String(url).replace(/^http:\/\//i, "https://");
    }
    const any = images.find((img) => img?.["#text"])?.["#text"];
    return any ? String(any).replace(/^http:\/\//i, "https://") : "";
  } catch {
    return "";
  }
}

function formatShareDate(date = new Date()) {
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = String(date.getFullYear());
  return `${d}-${m}-${y}`;
}

function renderPersona(model) {
  const copy = PERSONA_COPY[model.persona] || PERSONA_COPY["casual journaler"];
  const stampLabel = `${model.username}'s Noted Persona`;

  applyPersonaPalette(model.persona);
  applyNotebookAndPen(model.notebook, model.pen);

  // Keep stamp minimal on both
  el.stampText.textContent = stampLabel;
  el.shareStamp.textContent = stampLabel;

  el.personaTitle.textContent = copy.title;
  el.blurb.textContent = `"${copy.blurb}"`;

  el.notebookImage.src = ASSETS_REGISTRY.notebooks[model.notebook];
  el.penImage.src = ASSETS_REGISTRY.pens[model.pen];

  // Psychological signal labels + tiers
  const rangeTier = tierRange(model.signals.range);
  const intensityTier = tierIntensity(model.signals.intensity);
  const driftTier = tierDrift(model.signals.drift);

  // NOTE: We keep existing element IDs to avoid HTML edits.
  el.diversitySignal.innerHTML = `Range ${pct(model.signals.range)}<br>${rangeTier}`;
  el.obsessionSignal.innerHTML = `Intensity ${pct(model.signals.intensity)}<br>${intensityTier}`;
  el.overlapSignal.innerHTML = `Drift ${pct(model.signals.drift)}<br>${driftTier}`;

  el.listenerStyle.textContent = copy.listenerStyle;
  el.notedUse.innerHTML = stylizeNoted(copy.notedUse);
  el.lovesAboutNoted.innerHTML = stylizeNoted(copy.lovesAboutNoted);

  const topSongName = model.stats.topTrackName || "Unknown Song";
  const topSongArtist = model.stats.topTrackArtist || "Unknown Artist";
  const topArtistName = model.stats.topArtistName || "Unknown Artist";
  const topArtistImage = model.stats.topArtistImage || "";

  el.topSongWeek.innerHTML = `"${topSongName}"<br>by<br>${topSongArtist}`;
  el.topArtistWeek.textContent = topArtistName;
  const artistImages = [el.topArtistImage, el.shareTopArtistImage].filter(Boolean);
  if (topArtistImage) {
    artistImages.forEach((img) => {
      img.crossOrigin = "anonymous";
      img.src = topArtistImage;
      img.hidden = false;
    });
  } else {
    artistImages.forEach((img) => {
      img.hidden = true;
      img.removeAttribute("src");
    });
  }

  // Share card
  el.shareDate.textContent = formatShareDate();
  el.sharePeriod.textContent = model.stats.periodLabel || "Last 30 Days";
  el.shareTitle.textContent = copy.title;
  el.shareBlurb.textContent = `"${copy.blurb}"`;

  el.shareNotebookImage.src = ASSETS_REGISTRY.notebooks[model.notebook];
  el.sharePenImage.src = ASSETS_REGISTRY.pens[model.pen];

  el.shareTopSong.textContent = `"${topSongName}" by ${topSongArtist}`;
  el.shareTopArtist.textContent = topArtistName;
  el.shareDiversitySignal.innerHTML = `Range ${pct(model.signals.range)}<br>${rangeTier}`;
  el.shareObsessionSignal.innerHTML = `Intensity ${pct(model.signals.intensity)}<br>${intensityTier}`;
  el.shareOverlapSignal.innerHTML = `Drift ${pct(model.signals.drift)}<br>${driftTier}`;
  el.shareDataSummary.textContent = formatDataSummary(model.stats);
  el.shareListenerStyle.textContent = copy.listenerStyle;
  el.shareNotedUse.innerHTML = stylizeNoted(copy.notedUse);
  el.shareLovesAboutNoted.innerHTML = stylizeNoted(copy.lovesAboutNoted);

  el.result.hidden = false;
  if (el.signalsInfoBtn) {
    el.signalsInfoBtn.hidden = false;
    el.signalsInfoBtn.disabled = false;
  }
}

/* =======================
   SHARE CARD CAPTURE
======================= */
async function captureShareCard() {
  const width = 1080;
  const height = 1920;
  const prevInlineHeight = el.shareCard.style.height;

  try {
    el.shareCard.style.height = `${height}px`;
    const canvas = await html2canvas(el.shareCard, {
      backgroundColor: null,
      scale: 1,
      width,
      height,
      windowWidth: width,
      windowHeight: height,
      useCORS: true
    });
    return canvas.toDataURL("image/png");
  } finally {
    el.shareCard.style.height = prevInlineHeight;
  }
}

function dataUrlToFile(dataUrl, filename) {
  const [meta, content] = dataUrl.split(",");
  const mimeMatch = meta.match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : "image/png";
  const bin = atob(content);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i += 1) arr[i] = bin.charCodeAt(i);
  return new File([arr], filename, { type: mime });
}

/* =======================
   GENERATE FLOW
======================= */
async function generatePersona(username) {
  el.loading.hidden = false;
  el.result.hidden = true;
  closeSignalsModal();
  if (el.signalsInfoBtn) {
    el.signalsInfoBtn.hidden = true;
    el.signalsInfoBtn.disabled = true;
  }

  try {
    const raw = await fetchLastFmBundle(username);
    const stats = lastfmToNormalizedStats(raw);
    stats.topArtistImage = await fetchTopArtistImage(stats.topArtistName);

    const signals = computeSignals(stats);
    const notebook = pickNotebook(stats);
    const pen = pickPen(stats);
    const persona = pickPersonaFromLoadout(notebook, pen);

    currentModel = {
      username,
      persona,
      notebook,
      pen,
      signals,
      stats
    };

    latestCardDataUrl = "";
    el.previewWrap.hidden = true;

    renderPersona(currentModel);
  } finally {
    el.loading.hidden = true;
  }
}

/* =======================
   EVENTS
======================= */
el.generateBtn?.addEventListener("click", async () => {
  const username = el.usernameInput?.value?.trim();
  if (!username) {
    alert("Enter a Last.fm username first.");
    return;
  }
  try {
    await generatePersona(username);
  } catch (err) {
    console.error(err);
    alert(err?.message || "Failed to generate persona.");
  }
});

el.usernameInput?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    el.generateBtn?.click();
  }
});

el.signalsInfoBtn?.addEventListener("click", () => {
  if (!currentModel) return;
  openSignalsModal();
});

el.signalsModalCloseBtn?.addEventListener("click", () => {
  closeSignalsModal();
});

el.signalsModalBackdrop?.addEventListener("click", () => {
  closeSignalsModal();
});

el.signalsModal?.addEventListener("click", (e) => {
  if (e.target === el.signalsModal) closeSignalsModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && el.signalsModal && !el.signalsModal.hidden) {
    closeSignalsModal();
  }
});

el.generateCardBtn?.addEventListener("click", async () => {
  if (!currentModel) {
    alert("Generate a persona first.");
    return;
  }
  latestCardDataUrl = await captureShareCard();
  el.previewImage.src = latestCardDataUrl;
  el.previewWrap.hidden = false;
});

el.saveBtn?.addEventListener("click", async () => {
  if (!latestCardDataUrl) latestCardDataUrl = await captureShareCard();
  const link = document.createElement("a");
  link.download = "notedfm-persona-card.png";
  link.href = latestCardDataUrl;
  link.click();
});

el.shareBtn?.addEventListener("click", async () => {
  if (!latestCardDataUrl) latestCardDataUrl = await captureShareCard();

  if (navigator.share && navigator.canShare) {
    const file = dataUrlToFile(latestCardDataUrl, "notedfm-persona-card.png");
    if (navigator.canShare({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: "My Noted.fm Persona",
        text: "found on noted"
      });
      return;
    }
  }

  window.open(latestCardDataUrl, "_blank", "noopener,noreferrer");
});
