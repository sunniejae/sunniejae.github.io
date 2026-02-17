/* ============================================================================
   personafy.js — Noted.fm (Last.fm persona notebook)
   Signals renamed to psychological terms:
   - Range (was Diversity)
   - Intensity (was Obsession)
   - Streams (display metric for listening volume)
   Includes optional tier words aligned to each signal spectrum
============================================================================ */

/* =======================
   CONFIG
======================= */
const LASTFM_API_KEY = "5d8fee243f5e5315900f1a8efad7fb21";
const TOP_LIMIT = 100;
const RECENT_LIMIT = 50;
const ARTIST_IMAGE_FALLBACK = "/assets/noted/artistfallback.png";
const LASTFM_PLACEHOLDER_ID = "2a96cbd8b46e442fc41c2b86b821562f";
const ARTIST_TINT_ALPHA = 0.3;
const SHARE_DESTINATION_URL = "https://sunniejae.com/notedpersona";
const SHARE_POST_TEXT = "my Noted Persona";
const SPOTIFY_CLIENT_ID = "5800fdaeacbc4f6dad4670772ead5790";
const SPOTIFY_REDIRECT_URI = "https://sunniejae.com/notedpersona";
const SPOTIFY_SCOPES = "user-top-read user-read-recently-played";
const SPOTIFY_TOP_LIMIT = 50;
const SPOTIFY_TOKEN_STORAGE_KEY = "notedpersona_spotify_token";
const SPOTIFY_VERIFIER_STORAGE_KEY = "notedpersona_spotify_pkce_verifier";
const SPOTIFY_STATE_STORAGE_KEY = "notedpersona_spotify_oauth_state";
const SPOTIFY_VERIFIER_FALLBACK_STORAGE_KEY = "notedpersona_spotify_pkce_verifier_fallback";
const SPOTIFY_STATE_FALLBACK_STORAGE_KEY = "notedpersona_spotify_oauth_state_fallback";

const GENRE_RULES = [
  { label: "hip hop", keys: ["hip hop", "rap", "trap", "drill", "boom bap"] },
  { label: "pop", keys: ["pop", "dance pop", "indie pop", "k-pop", "synthpop"] },
  { label: "rock", keys: ["rock", "alt rock", "indie rock", "punk", "metal", "grunge"] },
  { label: "electronic", keys: ["electronic", "edm", "house", "techno", "dnb", "dubstep"] },
  { label: "rnb", keys: ["rnb", "r&b", "soul", "neo soul"] },
  { label: "acoustic", keys: ["acoustic", "folk", "singer-songwriter", "country", "americana"] },
  { label: "ambient", keys: ["ambient", "lofi", "chill", "downtempo", "instrumental"] },
  { label: "jazz", keys: ["jazz", "blues", "fusion"] },
  { label: "classical", keys: ["classical", "orchestra", "baroque", "opera"] }
];

const EMOTION_RULES = [
  { label: "nostalgic", keys: ["nostalgic", "nostalgia", "throwback", "retro"] },
  { label: "melancholic", keys: ["sad", "melancholy", "heartbreak", "emotional"] },
  { label: "romantic", keys: ["love", "romantic", "dreamy", "intimate"] },
  { label: "energetic", keys: ["energetic", "hype", "party", "workout", "uplifting"] },
  { label: "chaotic", keys: ["chaotic", "weird", "experimental", "quirky"] },
  { label: "calm", keys: ["calm", "peaceful", "focus", "study", "sleep"] },
  { label: "confident", keys: ["confident", "bold", "powerful", "anthem"] }
];

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

const STREAM_PERSONA_ORDER = [
  "casual journaler",
  "notes app is good enough",
  "doodler",
  "note taker",
  "main character energy",
  "archivist"
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
  sourceHeader: document.getElementById("sourceHeader"),
  dataSourceSelect: document.getElementById("dataSourceSelect"),
  dataSourceNote: document.getElementById("dataSourceNote"),
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
  paperReason: document.getElementById("paperReason"),
  penReason: document.getElementById("penReason"),
  generateCardBtn: document.getElementById("generateCardBtn"),
  shareBtn: document.getElementById("shareBtn"),
  socialShareBtn: document.getElementById("socialShareBtn"),
  startNotebookBtn: document.getElementById("startNotebookBtn"),
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
  shareLovesAboutNoted: document.getElementById("shareLovesAboutNoted"),
  socialShareModal: document.getElementById("socialShareModal"),
  socialShareBackdrop: document.getElementById("socialShareBackdrop"),
  socialShareCloseBtn: document.getElementById("socialShareCloseBtn"),
  shareXBtn: document.getElementById("shareXBtn"),
  sharePinterestBtn: document.getElementById("sharePinterestBtn"),
  shareTumblrBtn: document.getElementById("shareTumblrBtn"),
  shareInstagramBtn: document.getElementById("shareInstagramBtn")
};

let currentModel = null;
let latestCardDataUrl = "";


function selectedDataSource() {
  return el.dataSourceSelect?.value === "spotify" ? "spotify" : "lastfm";
}

function setDataSource(source) {
  if (!el.dataSourceSelect) return;
  el.dataSourceSelect.value = source === "lastfm" ? "lastfm" : "spotify";
  updateDataSourceUi();
}

function updateDataSourceUi() {
  const source = selectedDataSource();
  const isSpotify = source === "spotify";
  if (el.sourceHeader) {
    el.sourceHeader.innerHTML = isSpotify
      ? '<span class="noted-word">Noted</span> x Spotify'
      : '<span class="noted-word">Noted</span> x Last.fm';
  }
  if (el.usernameInput) {
    el.usernameInput.placeholder = "Enter Last.fm username";
    el.usernameInput.disabled = isSpotify;
    el.usernameInput.hidden = isSpotify;
  }
  if (el.dataSourceNote) {
    el.dataSourceNote.innerHTML = isSpotify
      ? 'Using Spotify OAuth. <button id="useLastfmBtn" type="button" class="link-button">Use public Last.fm data instead.</button>'
      : 'Using public Last.fm data. <button id="useSpotifyBtn" type="button" class="link-button">Use Spotify OAuth instead.</button>';

    const swapBtn = el.dataSourceNote.querySelector("button");
    if (swapBtn) {
      swapBtn.addEventListener("click", () => {
        setDataSource(isSpotify ? "lastfm" : "spotify");
      });
    }
  }
}

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

function openSocialShareModal() {
  if (!el.socialShareModal) return;
  el.socialShareModal.hidden = false;
}

function closeSocialShareModal() {
  if (!el.socialShareModal) return;
  el.socialShareModal.hidden = true;
}

function setGenerateCardButtonMode(mode = "generate") {
  if (!el.generateCardBtn) return;
  const normalized = mode === "save" ? "save" : "generate";
  el.generateCardBtn.dataset.mode = normalized;
  el.generateCardBtn.textContent = normalized === "save" ? "Save PNG" : "Generate Share Card";
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
  document.body.classList.toggle(
    "phone-notebook",
    currentModel?.persona === "notes app is good enough"
  );
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
   Streams   = totalPlays (displayed as listening volume)
======================= */
function computeSignals(stats) {
  const range = clamp01(safeDivide(stats.uniqueArtists, stats.totalTracks));
  const intensity = clamp01(safeDivide(stats.topArtistPlays, stats.totalPlays));
  const streamCountRaw = Number(stats?.streamCount);
  const streamsSource = Number.isFinite(streamCountRaw) ? streamCountRaw : Number(stats.totalPlays || 0);
  const streams = Math.max(0, streamsSource);

  // recentOverlap: 0..1 where higher means more consistent with favorites
  const overlap = clamp01(stats.recentOverlap);
  const drift = clamp01(1 - overlap); // higher drift = more evolving right now

  const exploratory = overlap < 0.3;
  return { range, intensity, streams, overlap, drift, exploratory };
}

function tierRange(v) {
  if (v < 0.5) return "liked songs";
  return "discover weekly";
}

function tierIntensity(v) {
  if (v < 0.21) return "lowkey fan";
  if (v < 0.46) return "Loyal to songs over artists";
  return "Stan behavior";
}

function tierStreams(totalStreams) {
  const value = Math.max(0, Number(totalStreams || 0));
  const logVolume = Math.log10(value + 1);
  if (logVolume < 2.2) return "Light rotation";
  if (logVolume < 3.1) return "Steady replay";
  return "Heavy rotation";
}

/* =======================
   PICKERS
======================= */
function pickNotebook(stats) {
  const s = computeSignals(stats);
  const dominantEmotion = dominantLabel(stats.topEmotionTags || []);
  if (dominantEmotion === "nostalgic" || dominantEmotion === "melancholic") return "locked diary";
  if (dominantEmotion === "calm") return "composition notebook";
  if (dominantEmotion === "romantic") return "bullet journal";
  if (dominantEmotion === "confident" || dominantEmotion === "energetic") return "leather";
  if (dominantEmotion === "chaotic") return "sketchbook";
  // Fallback: choose notebook by valence.
  // Higher valence -> brighter/open notebook feel.
  const valence = clamp01(safeDivide(s.range + (1 - s.intensity), 2));
  const idx = Math.min(5, Math.floor(valence * NOTEBOOK_OPTIONS.length));
  return NOTEBOOK_OPTIONS[idx];
}

function pickPen(stats) {
  const s = computeSignals(stats);
  const dominantGenre = dominantLabel(stats.topGenres || []);
  if (dominantGenre === "classical" || dominantGenre === "jazz") return "calligraphy";
  if (dominantGenre === "hip hop" || dominantGenre === "rnb") return "ballpoint pen";
  if (dominantGenre === "ambient" || dominantGenre === "acoustic") return "pencil";
  if (dominantGenre === "pop") return "sparkle gel pen";
  if (dominantGenre === "electronic") return "red ink";
  if (dominantGenre === "rock") return "red ink";
  // Fallback: choose pen by energy.
  // Higher energy -> bolder pen styles.
  const energy = clamp01(safeDivide(s.drift + s.intensity, 2));
  const idx = Math.min(5, Math.floor(energy * PEN_OPTIONS.length));
  return PEN_OPTIONS[idx];
}

function dominantLabel(labels) {
  if (!Array.isArray(labels) || !labels.length) return "";
  const map = {};
  labels.forEach((label) => {
    map[label] = (map[label] || 0) + 1;
  });
  return Object.entries(map).sort((a, b) => b[1] - a[1])[0]?.[0] || "";
}

function classifyTags(tags, rules) {
  const out = [];
  (tags || []).forEach((tagRaw) => {
    const tag = String(tagRaw || "").toLowerCase().trim();
    if (!tag) return;
    const matched = rules.find((rule) => rule.keys.some((k) => tag.includes(k)));
    if (matched) out.push(matched.label);
  });
  return out;
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

function pickPersonaFromStreams(totalStreams) {
  const value = Math.max(0, Number(totalStreams || 0));
  const logVolume = Math.log10(value + 1);
  if (logVolume < 2.0) return STREAM_PERSONA_ORDER[0];
  if (logVolume < 2.35) return STREAM_PERSONA_ORDER[1];
  if (logVolume < 2.7) return STREAM_PERSONA_ORDER[2];
  if (logVolume < 3.0) return STREAM_PERSONA_ORDER[3];
  if (logVolume < Math.log10(751)) return STREAM_PERSONA_ORDER[4];
  return STREAM_PERSONA_ORDER[5];
}

function pickPersona(stats, notebook, pen) {
  const loadoutPersona = pickPersonaFromLoadout(notebook, pen);
  if (loadoutPersona === "archivist") return "archivist";
  if (stats?.dataSource === "spotify") return loadoutPersona;

  const streamPersona = pickPersonaFromStreams(stats?.totalPlays || 0);
  const loadoutIndex = STREAM_PERSONA_ORDER.indexOf(loadoutPersona);
  const streamIndex = STREAM_PERSONA_ORDER.indexOf(streamPersona);

  if (loadoutIndex < 0) return streamPersona;
  const blendedIndex = Math.round((loadoutIndex + streamIndex) / 2);
  return STREAM_PERSONA_ORDER[blendedIndex];
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
  const recentTrackCandidates = recent
    .map((t) => ({
      track: String(t?.name || "").trim(),
      artist: String(t?.artist?.["#text"] || "").trim()
    }))
    .filter((t) => t.track);

  return {
    totalTracks,
    totalPlays,
    streamCount: totalPlays,
    uniqueArtists,
    topArtistName,
    topArtistPlays,
    recentOverlap,
    topGenres: [],
    topEmotionTags: [],
    recentTrackCandidates,
    periodLabel: "Last 30 Days",
    topTrackName: tracks[0]?.name || "Unknown Song",
    topTrackArtist: tracks[0]?.artist?.name || "Unknown Artist"
  };
}

async function sha256(input) {
  const data = new TextEncoder().encode(input);
  return crypto.subtle.digest("SHA-256", data);
}

function base64UrlEncode(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  bytes.forEach((b) => { binary += String.fromCharCode(b); });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function randomString(length = 64) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const random = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(random).map((i) => chars[i % chars.length]).join("");
}

function spotifyRedirectUri() {
  return SPOTIFY_REDIRECT_URI || `${window.location.origin}${window.location.pathname}`;
}

function readSpotifyToken() {
  try {
    return JSON.parse(localStorage.getItem(SPOTIFY_TOKEN_STORAGE_KEY) || "null");
  } catch {
    return null;
  }
}

function writeSpotifyToken(token) {
  localStorage.setItem(SPOTIFY_TOKEN_STORAGE_KEY, JSON.stringify(token));
}

function clearSpotifyToken() {
  localStorage.removeItem(SPOTIFY_TOKEN_STORAGE_KEY);
}

function setSpotifyOAuthValue(sessionKey, fallbackKey, value) {
  sessionStorage.setItem(sessionKey, value);
  localStorage.setItem(fallbackKey, value);
}

function getSpotifyOAuthValue(sessionKey, fallbackKey) {
  return sessionStorage.getItem(sessionKey) || localStorage.getItem(fallbackKey) || "";
}

function clearSpotifyOAuthValue(sessionKey, fallbackKey) {
  sessionStorage.removeItem(sessionKey);
  localStorage.removeItem(fallbackKey);
}

async function beginSpotifyOAuth() {
  const codeVerifier = randomString(96);
  const state = randomString(24);
  const codeChallenge = base64UrlEncode(await sha256(codeVerifier));

  setSpotifyOAuthValue(SPOTIFY_VERIFIER_STORAGE_KEY, SPOTIFY_VERIFIER_FALLBACK_STORAGE_KEY, codeVerifier);
  setSpotifyOAuthValue(SPOTIFY_STATE_STORAGE_KEY, SPOTIFY_STATE_FALLBACK_STORAGE_KEY, state);

  const auth = new URL("https://accounts.spotify.com/authorize");
  auth.searchParams.set("response_type", "code");
  auth.searchParams.set("client_id", SPOTIFY_CLIENT_ID);
  auth.searchParams.set("scope", SPOTIFY_SCOPES);
  auth.searchParams.set("redirect_uri", spotifyRedirectUri());
  auth.searchParams.set("state", state);
  auth.searchParams.set("code_challenge_method", "S256");
  auth.searchParams.set("code_challenge", codeChallenge);

  window.location.href = auth.toString();
}

async function exchangeSpotifyCodeForToken(code) {
  const codeVerifier = getSpotifyOAuthValue(SPOTIFY_VERIFIER_STORAGE_KEY, SPOTIFY_VERIFIER_FALLBACK_STORAGE_KEY);
  if (!codeVerifier) throw new Error("Spotify login session expired. Please try again.");

  const body = new URLSearchParams();
  body.set("grant_type", "authorization_code");
  body.set("code", code);
  body.set("redirect_uri", spotifyRedirectUri());
  body.set("client_id", SPOTIFY_CLIENT_ID);
  body.set("code_verifier", codeVerifier);

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body
  });
  const data = await res.json();
  if (!res.ok || !data?.access_token) {
    throw new Error(
      data?.error_description
      || `Spotify OAuth token exchange failed. Confirm redirect URI is allowlisted in Spotify Dashboard: ${spotifyRedirectUri()}`
    );
  }

  writeSpotifyToken({
    accessToken: data.access_token,
    refreshToken: data.refresh_token || "",
    expiresAt: Date.now() + (Number(data.expires_in || 0) * 1000)
  });

  clearSpotifyOAuthValue(SPOTIFY_VERIFIER_STORAGE_KEY, SPOTIFY_VERIFIER_FALLBACK_STORAGE_KEY);
  clearSpotifyOAuthValue(SPOTIFY_STATE_STORAGE_KEY, SPOTIFY_STATE_FALLBACK_STORAGE_KEY);
}

async function refreshSpotifyAccessToken(refreshToken) {
  const body = new URLSearchParams();
  body.set("grant_type", "refresh_token");
  body.set("refresh_token", refreshToken);
  body.set("client_id", SPOTIFY_CLIENT_ID);

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body
  });
  const data = await res.json();
  if (!res.ok || !data?.access_token) {
    throw new Error(data?.error_description || "Failed to refresh Spotify token.");
  }

  const token = readSpotifyToken() || {};
  writeSpotifyToken({
    accessToken: data.access_token,
    refreshToken: data.refresh_token || token.refreshToken || refreshToken,
    expiresAt: Date.now() + (Number(data.expires_in || 0) * 1000)
  });
}

async function handleSpotifyOAuthCallback() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const state = params.get("state");
  const error = params.get("error");
  if (!code && !error) return;

  if (error) {
    history.replaceState({}, "", spotifyRedirectUri());
    throw new Error(`Spotify login failed: ${error}`);
  }

  const expectedState = getSpotifyOAuthValue(SPOTIFY_STATE_STORAGE_KEY, SPOTIFY_STATE_FALLBACK_STORAGE_KEY);
  if (!expectedState || state !== expectedState) {
    clearSpotifyOAuthValue(SPOTIFY_VERIFIER_STORAGE_KEY, SPOTIFY_VERIFIER_FALLBACK_STORAGE_KEY);
    clearSpotifyOAuthValue(SPOTIFY_STATE_STORAGE_KEY, SPOTIFY_STATE_FALLBACK_STORAGE_KEY);
    history.replaceState({}, "", spotifyRedirectUri());
    await beginSpotifyOAuth();
    return;
  }

  await exchangeSpotifyCodeForToken(code);
  history.replaceState({}, "", spotifyRedirectUri());
}

async function getValidSpotifyAccessToken() {
  await handleSpotifyOAuthCallback();

  const token = readSpotifyToken();
  const now = Date.now();
  if (token?.accessToken && Number(token?.expiresAt || 0) > now + 60000) {
    return token.accessToken;
  }

  if (token?.refreshToken) {
    await refreshSpotifyAccessToken(token.refreshToken);
    return readSpotifyToken()?.accessToken || "";
  }

  await beginSpotifyOAuth();
  return "";
}

async function spotifyApi(path, token) {
  const res = await fetch(`https://api.spotify.com/v1/${path}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Spotify request failed (${res.status})`);
  }
  return res.json();
}

async function fetchSpotifyBundle(token) {
  const [topTracks, recentTracks, topArtists, profile] = await Promise.all([
    spotifyApi(`me/top/tracks?time_range=short_term&limit=${SPOTIFY_TOP_LIMIT}`, token),
    spotifyApi(`me/player/recently-played?limit=${RECENT_LIMIT}`, token),
    spotifyApi(`me/top/artists?time_range=short_term&limit=${SPOTIFY_TOP_LIMIT}`, token),
    spotifyApi("me", token)
  ]);

  const hasTop = Array.isArray(topTracks?.items) && topTracks.items.length > 0;
  const hasRecent = Array.isArray(recentTracks?.items) && recentTracks.items.length > 0;
  if (!hasTop && !hasRecent) {
    throw new Error("Could not load Spotify listening data. Try playing a few tracks and retry.");
  }

  return { topTracks, recentTracks, topArtists, profile };
}

function spotifyToNormalizedStats(raw) {
  const tracks = raw.topTracks?.items || [];
  const recent = raw.recentTracks?.items || [];
  const artists = raw.topArtists?.items || [];
  const topLikeTrack = tracks[0] || recent[0]?.track || null;

  const topTrackArtistMap = {};
  tracks.forEach((t) => {
    const primaryArtist = t?.artists?.[0]?.name || "Unknown Artist";
    topTrackArtistMap[primaryArtist] = (topTrackArtistMap[primaryArtist] || 0) + 1;
  });

  const recentArtistCounts = {};
  recent.forEach((item) => {
    const name = item?.track?.artists?.[0]?.name || "Unknown Artist";
    recentArtistCounts[name] = (recentArtistCounts[name] || 0) + 1;
  });

  const totalTracks = recent.length || tracks.length;
  const totalPlays = recent.length;
  const uniqueArtists = Object.keys(recentArtistCounts).length || Object.keys(topTrackArtistMap).length;
  const topArtistEntry =
    Object.entries(recentArtistCounts).sort((a, b) => b[1] - a[1])[0]
    || Object.entries(topTrackArtistMap).sort((a, b) => b[1] - a[1])[0]
    || ["Unknown Artist", 0];
  const topArtistName = topArtistEntry[0];
  const topArtistPlays = topArtistEntry[1];

  const topArtistSet = new Set(Object.keys(topTrackArtistMap).map((n) => n.toLowerCase()));
  const recentArtistSet = new Set(recent.map((t) => t?.track?.artists?.[0]?.name?.toLowerCase()).filter(Boolean));

  let overlapCount = 0;
  recentArtistSet.forEach((name) => {
    if (topArtistSet.has(name)) overlapCount += 1;
  });

  const recentOverlap = recentArtistSet.size ? overlapCount / recentArtistSet.size : 0;
  const spotifyTopArtist = artists.find((a) => a?.name === topArtistName) || artists[0];
  const recentTrackCandidates = recent
    .map((t) => ({
      track: String(t?.track?.name || "").trim(),
      artist: String(t?.track?.artists?.[0]?.name || "").trim()
    }))
    .filter((t) => t.track);

  return {
    totalTracks,
    totalPlays,
    streamCount: recent.length,
    uniqueArtists,
    topArtistName,
    topArtistPlays,
    recentOverlap,
    topGenres: [],
    topEmotionTags: [],
    recentTrackCandidates,
    periodLabel: "Last ~4 Weeks",
    topTrackName: topLikeTrack?.name || "Unknown Song",
    topTrackArtist: topLikeTrack?.artists?.[0]?.name || "Unknown Artist",
    topArtistImage: spotifyTopArtist?.images?.[0]?.url || "",
    sourceUsername: raw?.profile?.display_name || raw?.profile?.id || "",
    dataSource: "spotify"
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

  return {
    toptracks: topData.toptracks,
    recenttracks: recentData.recenttracks
  };
}

async function fetchTrackTags(trackName, artistName) {
  if (!trackName) return [];
  const query = new URLSearchParams({
    method: "track.gettoptags",
    track: trackName,
    api_key: LASTFM_API_KEY,
    format: "json"
  });
  if (artistName) query.set("artist", artistName);
  try {
    const res = await fetch(`https://ws.audioscrobbler.com/2.0/?${query.toString()}`);
    const data = await res.json();
    const tags = Array.isArray(data?.toptags?.tag) ? data.toptags.tag : [];
    return tags
      .slice(0, 8)
      .map((t) => t?.name)
      .filter(Boolean);
  } catch {
    return [];
  }
}

async function enrichGenreAndEmotionTags(stats) {
  const recentTracksRaw = Array.isArray(stats.recentTrackCandidates) ? stats.recentTrackCandidates : [];
  const seen = new Set();
  const recentTracks = recentTracksRaw
    .map((entry) => ({
      track: String(entry?.track || "").trim(),
      artist: String(entry?.artist || "").trim()
    }))
    .filter((entry) => entry.track)
    .filter((entry) => {
      const key = `${entry.track.toLowerCase()}|${entry.artist.toLowerCase()}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 12);
  const fallbackTrack = stats?.topTrackName ? [{ track: String(stats.topTrackName), artist: String(stats.topTrackArtist || "") }] : [];
  const lookupTracks = recentTracks.length ? recentTracks : fallbackTrack;

  const tagsByTrack = await Promise.all(
    lookupTracks.map((entry) => fetchTrackTags(entry.track, entry.artist))
  );
  const flatTags = tagsByTrack.flat();

  const topGenres = classifyTags(flatTags, GENRE_RULES);
  const topEmotionTags = classifyTags(flatTags, EMOTION_RULES);

  return { topGenres, topEmotionTags };
}

/* =======================
   RENDER
======================= */
function formatDataSummary(stats) {
  const tracks = Number(stats?.totalTracks || 0).toLocaleString();
  const plays = Number(stats?.totalPlays || 0).toLocaleString();
  const artists = Number(stats?.uniqueArtists || 0).toLocaleString();
  const source = stats?.dataSource === "spotify" ? "Spotify" : "Last.fm";
  return `${source}: analyzed ${tracks} top tracks and found ${plays} weighted plays by ${artists} artists.`;
}

async function fetchTopArtistImage(artistName) {
  if (!artistName) return "";
  const isUsableArtistImage = (url) => Boolean(url);
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
      if (isUsableArtistImage(url)) return String(url).replace(/^http:\/\//i, "https://");
    }
    const any = images.find((img) => isUsableArtistImage(img?.["#text"]))?.["#text"];
    return any ? String(any).replace(/^http:\/\//i, "https://") : "";
  } catch {
    return "";
  }
}

function isLastFmPlaceholderUrl(url) {
  return typeof url === "string" && url.includes(LASTFM_PLACEHOLDER_ID);
}

async function tintImageToColor(url, color) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth || img.width || 300;
        canvas.height = img.naturalHeight || img.height || 300;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(url);
          return;
        }

        // Keep original image visible, then apply a subtle hue tint overlay.
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = "source-atop";
        ctx.globalAlpha = ARTIST_TINT_ALPHA;
        ctx.fillStyle = color || "#000000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = "source-over";
        resolve(canvas.toDataURL("image/png"));
      } catch {
        resolve(url);
      }
    };
    img.onerror = () => resolve(url);
    img.src = url;
  });
}

async function resolveArtistImageForRender(url) {
  if (!url) return ARTIST_IMAGE_FALLBACK;
  const normalized = String(url).replace(/^http:\/\//i, "https://");
  if (!isLastFmPlaceholderUrl(normalized)) return normalized;

  const ink =
    getComputedStyle(document.documentElement).getPropertyValue("--entry-ink").trim() || "#2a2621";
  return tintImageToColor(normalized, ink);
}

function formatShareDate(date = new Date()) {
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = String(date.getFullYear());
  return `${d}-${m}-${y}`;
}

function displayedNotebookLabel(model) {
  return model?.persona === "notes app is good enough" ? "notes app" : model?.notebook;
}

function buildChoiceReasons(model) {
  const paper = displayedNotebookLabel(model);
  const pen = model.pen;
  const emotionLabels = Array.from(new Set(model.stats.topEmotionTags || []));
  const genreLabels = Array.from(new Set(model.stats.topGenres || []));

  const emotionText = emotionLabels.length ? emotionLabels.join(", ") : "your listening mood profile";
  const genreText = genreLabels.length ? genreLabels.join(", ") : "your genre profile";

  const paperReason = `Your Notebook (${paper}) was chosen from the most common vibes in your recent listening (${emotionText}).`;
  const penReason = `Your pen (${pen}) was chosen based on your most common genres (${genreText}).`;

  return { paperReason, penReason };
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
  const notebookImageSrc =
    model.persona === "notes app is good enough"
      ? "/assets/noted/phoneapp.png"
      : ASSETS_REGISTRY.notebooks[model.notebook];
  el.notebookImage.src = notebookImageSrc;
  el.penImage.src = ASSETS_REGISTRY.pens[model.pen];

  // Psychological signal labels + tiers
  const rangeTier = tierRange(model.signals.range);
  const intensityTier = tierIntensity(model.signals.intensity);
  const streamStickerLabel = model.stats?.dataSource === "spotify" ? "top" : "latest";

  // NOTE: We keep existing element IDs to avoid HTML edits.
  el.diversitySignal.innerHTML = `<span class="signal-label-outside">${rangeTier}</span><span class="signal-circle"><span class="signal-value">${pct(model.signals.range)}</span></span>`;
  el.obsessionSignal.innerHTML = `<span class="signal-label-outside">${intensityTier}</span><span class="signal-circle"><span class="signal-value">${pct(model.signals.intensity)}</span></span>`;
  el.overlapSignal.innerHTML = `<span class="signal-label-outside">streams found</span><span class="signal-circle"><span class="signal-value">${streamStickerLabel}</span></span>`;

  el.listenerStyle.textContent = copy.listenerStyle;
  el.notedUse.innerHTML = stylizeNoted(copy.notedUse);
  el.lovesAboutNoted.innerHTML = stylizeNoted(copy.lovesAboutNoted);

  const topSongName = model.stats.topTrackName || "Unknown Song";
  const topSongArtist = model.stats.topTrackArtist || "Unknown Artist";
  const topArtistName = model.stats.topArtistName || "Unknown Artist";
  const topArtistImage = model.stats.topArtistImage || ARTIST_IMAGE_FALLBACK;

  el.topSongWeek.innerHTML = `"${topSongName}"<br>by<br>${topSongArtist}`;
  el.topArtistWeek.textContent = topArtistName;
  const artistImages = [el.topArtistImage, el.shareTopArtistImage].filter(Boolean);
  resolveArtistImageForRender(topArtistImage).then((resolvedImage) => {
    artistImages.forEach((img) => {
      img.crossOrigin = "anonymous";
      img.src = resolvedImage;
      img.hidden = false;
    });
  });

  // Share card
  el.shareDate.textContent = formatShareDate();
  el.sharePeriod.textContent = model.stats.periodLabel || "Last 30 Days";
  el.shareTitle.textContent = copy.title;
  el.shareBlurb.textContent = `"${copy.blurb}"`;

  el.shareNotebookImage.src = notebookImageSrc;
  el.sharePenImage.src = ASSETS_REGISTRY.pens[model.pen];

  el.shareTopSong.textContent = `"${topSongName}" by ${topSongArtist}`;
  el.shareTopArtist.textContent = topArtistName;
  el.shareDiversitySignal.innerHTML = `<span class="signal-label-outside">${rangeTier}</span><span class="signal-circle"><span class="signal-value">${pct(model.signals.range)}</span></span>`;
  el.shareObsessionSignal.innerHTML = `<span class="signal-label-outside">${intensityTier}</span><span class="signal-circle"><span class="signal-value">${pct(model.signals.intensity)}</span></span>`;
  el.shareOverlapSignal.innerHTML = `<span class="signal-label-outside">streams found</span><span class="signal-circle"><span class="signal-value">${streamStickerLabel}</span></span>`;
  el.shareDataSummary.textContent = formatDataSummary(model.stats);
  el.shareListenerStyle.textContent = copy.listenerStyle;
  el.shareNotedUse.innerHTML = stylizeNoted(copy.notedUse);
  el.shareLovesAboutNoted.innerHTML = stylizeNoted(copy.lovesAboutNoted);
  const reasons = buildChoiceReasons(model);
  if (el.paperReason) el.paperReason.textContent = reasons.paperReason;
  if (el.penReason) el.penReason.textContent = reasons.penReason;

  el.result.hidden = false;
  if (el.startNotebookBtn) {
    el.startNotebookBtn.hidden = false;
  }
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

async function ensureShareCardDataUrl() {
  if (!currentModel) {
    alert("Generate a persona first.");
    return "";
  }
  if (!latestCardDataUrl) latestCardDataUrl = await captureShareCard();
  if (latestCardDataUrl) setGenerateCardButtonMode("save");
  return latestCardDataUrl;
}

function openShareComposer(url) {
  window.open(url, "_blank", "noopener,noreferrer");
}

function currentPersonaTitle() {
  if (!currentModel) return "My Noted Persona";
  return PERSONA_COPY[currentModel.persona]?.title || "My Noted Persona";
}

function socialText() {
  return `I got ${currentPersonaTitle()} on Noted Persona. ${SHARE_DESTINATION_URL}`;
}

function createTweetUrl() {
  const u = new URL("https://twitter.com/intent/tweet");
  u.searchParams.set("text", socialText());
  return u.toString();
}

function createPinterestUrl() {
  const u = new URL("https://pinterest.com/pin/create/button/");
  u.searchParams.set("url", SHARE_DESTINATION_URL);
  u.searchParams.set("description", socialText());
  return u.toString();
}

function createTumblrUrl() {
  const u = new URL("https://www.tumblr.com/widgets/share/tool");
  u.searchParams.set("canonicalUrl", SHARE_DESTINATION_URL);
  u.searchParams.set("title", `I got ${currentPersonaTitle()}`);
  u.searchParams.set("caption", socialText());
  return u.toString();
}

async function shareToInstagramStory() {
  const dataUrl = await ensureShareCardDataUrl();
  if (!dataUrl) return;

  if (navigator.share && navigator.canShare) {
    const file = dataUrlToFile(dataUrl, "notedpersona-story.png");
    if (navigator.canShare({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: `I got ${currentPersonaTitle()}`,
        text: socialText()
      });
      return;
    }
  }

  const downloadLink = document.createElement("a");
  downloadLink.download = "notedpersona-story.png";
  downloadLink.href = dataUrl;
  downloadLink.click();
  alert("Image downloaded. Add it to Instagram Story and include this link: https://sunniejae.com/notedpersona");
}

/* =======================
   GENERATE FLOW
======================= */
async function generatePersona(username, source = "lastfm") {
  el.loading.hidden = false;
  el.result.hidden = true;
  if (el.startNotebookBtn) el.startNotebookBtn.hidden = true;
  closeSignalsModal();
  if (el.signalsInfoBtn) {
    el.signalsInfoBtn.hidden = true;
    el.signalsInfoBtn.disabled = true;
  }

  try {
    let stats;
    if (source === "spotify") {
      clearSpotifyToken();
      stats = spotifyToNormalizedStats(await fetchSpotifyBundle(await getValidSpotifyAccessToken()));
    } else {
      stats = lastfmToNormalizedStats(await fetchLastFmBundle(username));
    }
    const enrichedTags = await enrichGenreAndEmotionTags(stats);
    stats.topGenres = enrichedTags.topGenres;
    stats.topEmotionTags = enrichedTags.topEmotionTags;
    if (!stats.topArtistImage) {
      stats.topArtistImage = await fetchTopArtistImage(stats.topArtistName);
    }

    const signals = computeSignals(stats);
    const notebook = pickNotebook(stats);
    const pen = pickPen(stats);
    const persona = pickPersona(stats, notebook, pen);

    const displayUsername =
      source === "spotify"
        ? (String(stats?.sourceUsername || "").trim() || username || "spotify-user")
        : username;

    currentModel = {
      username: displayUsername,
      persona,
      notebook,
      pen,
      signals,
      stats
    };

    latestCardDataUrl = "";
    el.previewWrap.hidden = true;
    setGenerateCardButtonMode("generate");

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
  const source = selectedDataSource();
  if (source === "lastfm" && !username) {
    alert("Enter a Last.fm username first.");
    return;
  }

  try {
    await generatePersona(username || "spotify-user", source);
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
    return;
  }
  if (e.key === "Escape" && el.socialShareModal && !el.socialShareModal.hidden) {
    closeSocialShareModal();
  }
});

el.generateCardBtn?.addEventListener("click", async () => {
  if (el.generateCardBtn?.dataset.mode === "save" && latestCardDataUrl) {
    const link = document.createElement("a");
    link.download = "notedfm-persona-card.png";
    link.href = latestCardDataUrl;
    link.click();
    return;
  }

  latestCardDataUrl = await ensureShareCardDataUrl();
  if (!latestCardDataUrl) return;
  el.previewImage.src = latestCardDataUrl;
  el.previewWrap.hidden = false;
  setGenerateCardButtonMode("save");
});

el.shareBtn?.addEventListener("click", async () => {
  latestCardDataUrl = await ensureShareCardDataUrl();
  if (!latestCardDataUrl) return;

  if (navigator.share && navigator.canShare) {
    const file = dataUrlToFile(latestCardDataUrl, "notedfm-persona-card.png");
    if (navigator.canShare({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: `I got ${currentPersonaTitle()}`,
        text: socialText()
      });
      return;
    }
  }

  window.open(latestCardDataUrl, "_blank", "noopener,noreferrer");
});

el.startNotebookBtn?.addEventListener("click", () => {
  window.open("https://noted.sunniejae.com", "_blank", "noopener,noreferrer");
});

el.socialShareBtn?.addEventListener("click", async () => {
  const dataUrl = await ensureShareCardDataUrl();
  if (!dataUrl) return;
  openSocialShareModal();
});

el.socialShareCloseBtn?.addEventListener("click", () => {
  closeSocialShareModal();
});

el.socialShareBackdrop?.addEventListener("click", () => {
  closeSocialShareModal();
});

el.socialShareModal?.addEventListener("click", (e) => {
  if (e.target === el.socialShareModal) closeSocialShareModal();
});

el.shareXBtn?.addEventListener("click", async () => {
  const dataUrl = await ensureShareCardDataUrl();
  if (!dataUrl) return;
  closeSocialShareModal();
  window.open(dataUrl, "_blank", "noopener,noreferrer");
  openShareComposer(createTweetUrl());
});

el.sharePinterestBtn?.addEventListener("click", async () => {
  const dataUrl = await ensureShareCardDataUrl();
  if (!dataUrl) return;
  closeSocialShareModal();
  window.open(dataUrl, "_blank", "noopener,noreferrer");
  openShareComposer(createPinterestUrl());
});

el.shareTumblrBtn?.addEventListener("click", async () => {
  const dataUrl = await ensureShareCardDataUrl();
  if (!dataUrl) return;
  closeSocialShareModal();
  window.open(dataUrl, "_blank", "noopener,noreferrer");
  openShareComposer(createTumblrUrl());
});

el.shareInstagramBtn?.addEventListener("click", async () => {
  closeSocialShareModal();
  await shareToInstagramStory();
});


el.dataSourceSelect?.addEventListener("change", updateDataSourceUi);
setDataSource("spotify");
setGenerateCardButtonMode("generate");
