/*************************************************
 * CONFIG
 *************************************************/
const API_KEY = "5d8fee243f5e5315900f1a8efad7fb21";
const TOP_TRACK_LIMIT = 10;
const RECENT_TRACK_LIMIT = 33;

/*************************************************
 * CARD DATA
 *************************************************/
const MAJOR_ARCANA = [
  { name: "The Fool", image: "/club/tarot/0.png", meaning: "Beginnings, openness, curiosity, and emotional spontaneity." },
  { name: "The Magician", image: "/club/tarot/1.png", meaning: "Creative power, intention, and using your talents consciously." },
  { name: "The High Priestess", image: "/club/tarot/2.png", meaning: "Intuition, inner worlds, and emotional depth beneath the surface." },
  { name: "The Empress", image: "/club/tarot/3.png", meaning: "Nurturing energy, abundance, and creative comfort." },
  { name: "The Emperor", image: "/club/tarot/4.png", meaning: "Structure, authority, and emotional boundaries." },
  { name: "The Hierophant", image: "/club/tarot/5.png", meaning: "Tradition, influence, and shared belief systems." },
  { name: "The Lovers", image: "/club/tarot/6.png", meaning: "Connection, harmony, and emotional alignment." },
  { name: "The Chariot", image: "/club/tarot/7.png", meaning: "Momentum, determination, and emotional drive." },
  { name: "Strength", image: "/club/tarot/8.png", meaning: "Gentle resilience, courage, and emotional confidence." },
  { name: "The Hermit", image: "/club/tarot/9.png", meaning: "Reflection, solitude, and inner listening." },
  { name: "Wheel of Fortune", image: "/club/tarot/10.png", meaning: "Cycles, change, and emotional shifts." },
  { name: "Justice", image: "/club/tarot/11.png", meaning: "Balance, truth, and emotional accountability." },
  { name: "The Hanged Man", image: "/club/tarot/12.png", meaning: "Perspective, surrender, and emotional reframing." },
  { name: "Death", image: "/club/tarot/13.png", meaning: "Endings, transformation, and emotional renewal." },
  { name: "Temperance", image: "/club/tarot/14.png", meaning: "Balance, harmony, and emotional moderation." },
  { name: "The Devil", image: "/club/tarot/15.png", meaning: "Attachment, desire, and emotional loops." },
  { name: "The Tower", image: "/club/tarot/16.png", meaning: "Disruption, awakening, and emotional release." },
  { name: "The Star", image: "/club/tarot/17.png", meaning: "Hope, healing, and emotional clarity." },
  { name: "The Moon", image: "/club/tarot/18.png", meaning: "Mystery, intuition, and emotional tides." },
  { name: "The Sun", image: "/club/tarot/19.png", meaning: "Joy, warmth, and emotional openness." },
  { name: "Judgement", image: "/club/tarot/20.png", meaning: "Awakening, reflection, and emotional reckoning." },
  { name: "The World", image: "/club/tarot/21.png", meaning: "Completion, wholeness, and emotional integration." }
];

const SUITS = ["Cups", "Wands", "Swords", "Pentacles"];
const SUIT_MEANINGS = {
  Cups: "Emotions, relationships, and intuition.",
  Wands: "Passion, creativity, and action.",
  Swords: "Thoughts, challenges, and conflict resolution.",
  Pentacles: "Practicality, resources, and material concerns."
};
const SUIT_LETTERS = { Cups: "c", Wands: "w", Swords: "s", Pentacles: "p" };

const NUMBER_MEANINGS = {
  1: "New beginnings, opportunities, and potential.",
  2: "Balance, partnership, and decisions.",
  3: "Collaboration, growth, and creativity.",
  4: "Stability, structure, and introspection.",
  5: "Conflict, change, and learning experiences.",
  6: "Harmony, progress, and cooperation.",
  7: "Reflection, assessment, and evaluation.",
  8: "Movement, action, and mastery.",
  9: "Fulfillment, nearing completion, and wisdom.",
  10: "Completion, culmination, and transformation."
};

/*************************************************
 * DOM ELEMENTS
 *************************************************/
const introSection = document.getElementById("intro");
const loadingSection = document.getElementById("loading");
const spreadSection = document.getElementById("spread");

const majorCardArt = document.querySelector(".card.major .card-art");
const majorCardTitle = document.querySelector(".card.major .title");
const minorCardArt = document.querySelector(".card.minor .card-art");
const minorCardTitle = document.querySelector(".card.minor .title");

const majorExplanation = document.getElementById("major-explanation");
const minorExplanation = document.getElementById("minor-explanation");

const loginButton = document.getElementById("login");
const exportButton = document.getElementById("export");

/*************************************************
 * HELPERS
 *************************************************/
function resolveMinorCardImage(number, suit) {
  const suitLetter = SUIT_LETTERS[suit];
  const basePath = "/assets/tarot/";
  const cardPath = `${basePath}${number}${suitLetter}.png`;
  const fallbackPath = `${basePath}${suit.toLowerCase()}.png`;
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(cardPath);
    img.onerror = () => resolve(fallbackPath);
    img.src = cardPath;
  });
}

function estimateTrackStats(tags) {
  let energy = 0.5, valence = 0.5;
  const highEnergy = ["rock","metal","punk","dance","electronic","hip-hop"];
  const lowEnergy = ["ambient","chill","acoustic","folk","jazz"];
  const happy = ["pop","happy","uplifting","dance"];
  const sad = ["sad","melancholic","dark","blues"];

  tags.forEach(tag => {
    const t = tag.toLowerCase();
    if(highEnergy.includes(t)) energy += 0.1;
    if(lowEnergy.includes(t)) energy -= 0.1;
    if(happy.includes(t)) valence += 0.1;
    if(sad.includes(t)) valence -= 0.1;
  });

  return { energy: Math.min(1, Math.max(0, energy)), valence: Math.min(1, Math.max(0, valence)) };
}

function hashStringToNumber(str) {
  let hash = 0;
  for(let i=0;i<str.length;i++){
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function pickMajorArcana(avgEnergy, avgValence, username){
  const userHash = hashStringToNumber(username);
  const statIndex = Math.floor(((avgEnergy+avgValence)/2) * MAJOR_ARCANA.length);
  const combinedIndex = (userHash + statIndex) % MAJOR_ARCANA.length;
  return MAJOR_ARCANA[combinedIndex];
}

/*************************************************
 * MINOR ARCANA FUNCTIONS
 *************************************************/
function pickMinorSuit(avgValence, trackHash) {
  const probs = { Cups: 0, Wands: 0, Swords: 0, Pentacles: 0 };
  const v = Math.min(1, Math.max(0, avgValence));

  probs.Cups = Math.max(0, 0.3 - 0.2*v);
  probs.Wands = Math.max(0, 0.3*v);
  probs.Swords = Math.max(0, 0.2 + 0.2*(0.5-Math.abs(v-0.5)));
  probs.Pentacles = Math.max(0, 0.2 + 0.1*v);

  const total = probs.Cups + probs.Wands + probs.Swords + probs.Pentacles;
  for (let key in probs) probs[key] /= total;

  const hash01 = (trackHash % 1000) / 1000;
  let cum = 0;
  for (let suit of ["Cups","Wands","Swords","Pentacles"]) {
    cum += probs[suit];
    if(hash01 < cum) return suit;
  }
  return "Pentacles";
}

async function pickMinorArcanaFromRecent(recentTracks, username){
  if(!recentTracks || recentTracks.length===0){
    return { name:"Unknown", image:"/assets/tarot/cups.png", meaning:"No recent tracks available.", numberMeaning:"", suitMeaning:"" };
  }

  let totalEnergy = 0, totalValence = 0;
  for(const track of recentTracks){
    const tags = await fetchTrackTags(track.artist, track.name);
    const stats = estimateTrackStats(tags);
    totalEnergy += stats.energy;
    totalValence += stats.valence;
  }

  const avgEnergy = totalEnergy/recentTracks.length;
  const avgValence = totalValence/recentTracks.length;

  const combinedTrackStr = recentTracks.map(t=>t.name+t.artist).join(",")+username;
  const trackHash = hashStringToNumber(combinedTrackStr);

  const suit = pickMinorSuit(avgValence, trackHash);
  const number = ((Math.floor(avgEnergy*10)+trackHash)%10)+1;
  const image = await resolveMinorCardImage(number, suit);

  return {
    name: `${number} of ${suit}`,
    image: image,
    meaning: `Reflects your recent listening habits in detail.`,
    numberMeaning: NUMBER_MEANINGS[number],
    suitMeaning: SUIT_MEANINGS[suit]
  };
}

/*************************************************
 * LAST.FM FETCH
 *************************************************/
async function fetchTrackTags(artist, track){
  const url=`https://ws.audioscrobbler.com/2.0/?method=track.gettoptags&artist=${encodeURIComponent(artist)}&track=${encodeURIComponent(track)}&api_key=${API_KEY}&format=json`;
  try{
    const res = await fetch(url);
    const data = await res.json();
    return data.toptags?.tag?.map(t=>t.name)||[];
  }catch{
    return [];
  }
}

async function fetchTopTracks(username){
  const url=`https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${username}&api_key=${API_KEY}&format=json&limit=${TOP_TRACK_LIMIT}&period=7day`;
  const res=await fetch(url);
  const data=await res.json();
  if(!data.toptracks) throw new Error("User not found or no top tracks");
  return data.toptracks.track;
}

async function fetchRecentTracks(username){
  const url=`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${API_KEY}&format=json&limit=${RECENT_TRACK_LIMIT}`;
  const res=await fetch(url);
  const data=await res.json();
  if(!data.recenttracks) return [];
  return data.recenttracks.track.map(t=>({name:t.name, artist:t.artist["#text"]}));
}

/*************************************************
 * MAIN TAROT GENERATION
 *************************************************/
async function generateTarot(username){
  try{
    introSection.hidden = true;
    loadingSection.hidden = false;
    spreadSection.hidden = true;

    const topTracks = await fetchTopTracks(username).catch(()=>[]);
    let totalEnergy = 0, totalValence = 0;
    for(const track of topTracks){
      const tags = await fetchTrackTags(track.artist.name, track.name).catch(()=>[]);
      const stats = estimateTrackStats(tags);
      totalEnergy += stats.energy;
      totalValence += stats.valence;
    }
    const avgEnergy = topTracks.length? totalEnergy/topTracks.length : 0.5;
    const avgValence = topTracks.length? totalValence/topTracks.length : 0.5;
    const majorCard = pickMajorArcana(avgEnergy, avgValence, username);

    const recentTracks = await fetchRecentTracks(username).catch(()=>[]);
    const minorCard = await pickMinorArcanaFromRecent(recentTracks, username);

    // Render cards
    majorCardArt.style.backgroundImage = `url(${majorCard.image})`;
    majorCardTitle.textContent = majorCard.name;
    minorCardArt.style.backgroundImage = `url(${minorCard.image})`;
    minorCardTitle.textContent = minorCard.name;

    // Render explanations
    majorExplanation.innerHTML = `
      <h6>Major Arcana</h6>
      <h4>Archetype based on your Top Tracks this week</h4>
      <p>${majorCard.meaning}</p>
      <p class="track-info">
        The cards think you've listened to <span class="track-title">${topTracks[0]?.name || "Unknown"}</span> by <span class="track-artist">${topTracks[0]?.artist?.name || "Unknown"}</span> a LOT this week...
      </p>
    `;
    minorExplanation.innerHTML = `
      <h6>Minor Arcana</h6>
      <h4>${minorCard.meaning}</h4>
      <h5>Number meaning:</h5><p>${minorCard.numberMeaning}</p>
      <h5>Suit meaning:</h5><p>${minorCard.suitMeaning}</p>
      <p class="track-info">
        I divined that you listened to <span class="track-title">${recentTracks[0]?.name || "Unknown"}</span> by <span class="track-artist">${recentTracks[0]?.artist || "Unknown"}</span> very recently.
      </p>
    `;

    loadingSection.hidden = true;
    spreadSection.hidden = false;

  }catch(err){
    console.error("Error generating tarot:", err);
    loadingSection.hidden = true;
    introSection.hidden = false;
    alert("Error fetching Last.fm data. Please check your username or try again later.");
  }
}

/*************************************************
 * EVENTS
 *************************************************/
loginButton.addEventListener("click", async ()=>{
  const username = prompt("Enter your Last.fm username:");
  if(!username) return;
  await generateTarot(username);
});

exportButton.addEventListener("click", async () => {
  // CONFIG: adjust these for font sizes/colors
  const fontFamilyMain = "'JaeWriting', sans-serif";
  const fontFamilyHeader = "'Milky', sans-serif";
  const fontSizeHeader = "80px";
  const fontSizeText = "36px";
  const fontSizeHeading = "32px";       // Number/Suit meaning
  const colorHeader = "#FFFFFF";
  const colorText = "#FFFFFF";
  const colorTitle = "#ffb3d6";         // track title
  const colorArtist = "#1a98ca";        // track artist
// Wait for all fonts to load
  await document.fonts.ready;
  // Create wrapper
  const wrapper = document.createElement("div");
  wrapper.style.width = "3264px";
  wrapper.style.height = "1836px";
  wrapper.style.background = getComputedStyle(document.body).background || "#000";
  wrapper.style.display = "flex";
  wrapper.style.flexDirection = "column";
  wrapper.style.alignItems = "center";
  wrapper.style.justifyContent = "flex-start";
  wrapper.style.padding = "50px";
  wrapper.style.boxSizing = "border-box";

  // Header
  const header = document.createElement("div");
  header.textContent = "Tarot.fm by SunnieJae";
  header.style.fontFamily = fontFamilyHeader;
  header.style.fontSize = fontSizeHeader;
  header.style.fontWeight = "bold";
  header.style.color = colorHeader;
  header.style.marginBottom = "50px";
  header.style.marginTOP = "50px";
  wrapper.appendChild(header);


  // Row container for cards
  const row = document.createElement("div");
  row.style.display = "flex";
  row.style.flexDirection = "row";
  row.style.justifyContent = "space-around";
  row.style.alignItems = "flex-start";
  row.style.width = "100%";
  row.style.height = "100%";
  row.style.gap = "80px"; // space between major/minor

  // --- Helper function to create a card block ---
  function createCardBlock(cardArtStyle, explanationHTML) {
    const cardDiv = document.createElement("div");
    cardDiv.style.display = "flex";
    cardDiv.style.flexDirection = "row"; // card left, explanation right
    cardDiv.style.alignItems = "flex-start";
    cardDiv.style.gap = "30px"; // space between art and text

    // Card art
    const artDiv = document.createElement("div");
    artDiv.style.backgroundImage = cardArtStyle.backgroundImage;
    artDiv.style.backgroundSize = "cover";
    artDiv.style.backgroundPosition = "center";
    artDiv.style.width = "432px";
    artDiv.style.height = "768px";
    cardDiv.appendChild(artDiv);

    // Text / explanation
    const textDiv = document.createElement("div");
    textDiv.innerHTML = explanationHTML;

    // Font & color for main text
    textDiv.style.fontFamily = fontFamilyMain;
    textDiv.style.fontSize = fontSizeText;
    textDiv.style.color = colorText;
    textDiv.style.lineHeight = "1.5";
    textDiv.style.maxWidth = "600px";
    textDiv.style.textAlign = "left";

    // Color for track title / artist
    textDiv.querySelectorAll(".track-title").forEach(el => el.style.color = colorTitle);
    textDiv.querySelectorAll(".track-artist").forEach(el => el.style.color = colorArtist);

    // Style headings (Number / Suit meaning)
    textDiv.querySelectorAll("h4").forEach(el => {
      el.style.fontSize = "30px";
      el.style.color = "#00FFF0"; // can be different
      el.style.marginTop = "15px";
      el.style.marginBottom = "5px";
      el.style.fontWeight = "bold";
      el.style.lineHeight = "2"
    });
     textDiv.querySelectorAll("h5").forEach(el => {
      el.style.fontSize = fontSizeHeading;
      el.style.color = "#9a9ad4"; // can be different
      el.style.marginTop = "30px";
      el.style.marginBottom = "10px";
      el.style.fontWeight = "bold";
      el.style.fontSize = "28px";
    });
   textDiv.querySelectorAll("h6").forEach(el => {
      el.style.fontSize = fontSizeHeading;
      el.style.color = "#ffb3d6"; // can be different
      el.style.marginTop = "30px";
      el.style.marginBottom = "5px";
      el.style.fontWeight = "bold";
      el.style.fontSize = "28px";
    });
    textDiv.querySelectorAll("h6").forEach(el => {
      el.style.fontSize = fontSizeHeading;
      el.style.color = "#ffb3d6"; // can be different
      el.style.marginTop = "30px";
      el.style.marginBottom = "5px";
      el.style.fontWeight = "bold";
      el.style.fontSize = "25px";
    });
    
    cardDiv.appendChild(textDiv);
    return cardDiv;
  }

  // Create major and minor card blocks
  const majorBlock = createCardBlock(majorCardArt.style, majorExplanation.innerHTML);
  const minorBlock = createCardBlock(minorCardArt.style, minorExplanation.innerHTML);

  row.appendChild(majorBlock);
  row.appendChild(minorBlock);

  wrapper.appendChild(row);
  document.body.appendChild(wrapper);

  // Render with html2canvas
  const canvas = await html2canvas(wrapper, { backgroundColor: null, scale: 2, useCORS: true });

  // Download
  const link = document.createElement("a");
  link.download = "tarotfm_sunniejae.png";
  link.href = canvas.toDataURL("image/png");
  link.click();

  // Cleanup
  document.body.removeChild(wrapper);
});



/*************************************************
 * STARFIELD
 *************************************************/
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];
const STAR_COUNT = 150;

function resizeCanvas(){ canvas.width=window.innerWidth; canvas.height=window.innerHeight; }
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createStars(){
  stars = [];
  for(let i=0;i<STAR_COUNT;i++){
    stars.push({ x:Math.random()*canvas.width, y:Math.random()*canvas.height, size:Math.random()*2+0.5, speed:Math.random()*0.3+0.05 });
  }
}
function animateStars(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle="white";
  stars.forEach(star=>{
    star.y -= star.speed;
    if(star.y<0) star.y=canvas.height;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI*2);
    ctx.fill();
  });
  requestAnimationFrame(animateStars);
}
createStars();
animateStars();
