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
function estimateTrackStats(tags) {
  let energy = 0.5;
  let valence = 0.5;
  const highEnergy = ["rock","metal","punk","dance","electronic","hip-hop"];
  const lowEnergy = ["ambient","chill","acoustic","folk","jazz"];
  const happy = ["pop","happy","uplifting","dance"];
  const sad = ["sad","melancholic","dark","blues"];

  tags.forEach(tag=>{
    const t = tag.toLowerCase();
    if(highEnergy.includes(t)) energy+=0.1;
    if(lowEnergy.includes(t)) energy-=0.1;
    if(happy.includes(t)) valence+=0.1;
    if(sad.includes(t)) valence-=0.1;
  });
  return { energy: Math.min(1,Math.max(0,energy)), valence: Math.min(1,Math.max(0,valence)) };
}

function pickMajorArcana(avgEnergy, avgValence){
  const index = Math.floor(((avgEnergy+avgValence)/2)*MAJOR_ARCANA.length);
  return MAJOR_ARCANA[Math.min(index, MAJOR_ARCANA.length-1)];
}

async function fetchTrackTags(artist, track){
  try{
    const url = `https://ws.audioscrobbler.com/2.0/?method=track.gettoptags&artist=${encodeURIComponent(artist)}&track=${encodeURIComponent(track)}&api_key=${API_KEY}&format=json`;
    const res = await fetch(url);
    const data = await res.json();
    return data.toptags?.tag?.map(t=>t.name)||[];
  }catch{return [];}
}

async function pickMinorArcanaFromRecent(recentTracks){
  if(!recentTracks || recentTracks.length===0){
    return {name:"Unknown", image:"images/minor_placeholder.jpg", meaning:"No recent tracks available.", numberMeaning:"", suitMeaning:""};
  }

  let totalEnergy=0,totalValence=0;
  for(const track of recentTracks){
    const tags = await fetchTrackTags(track.artist, track.name);
    const stats = estimateTrackStats(tags);
    totalEnergy+=stats.energy;
    totalValence+=stats.valence;
  }
  const avgEnergy = totalEnergy/recentTracks.length;
  const avgValence = totalValence/recentTracks.length;

  const suitIndex = Math.min(Math.floor(avgValence*SUITS.length), SUITS.length-1);
  const number = Math.min(Math.floor(avgEnergy*10)+1,10);
  const suit = SUITS[suitIndex];

  return {
    name:`${number} of ${suit}`,
    image:"images/minor_placeholder.jpg",
    meaning:`Reflects your recent listening habits.`,
    numberMeaning: NUMBER_MEANINGS[number]||"",
    suitMeaning: SUIT_MEANINGS[suit]||""
  };
}

/*************************************************
 * FETCH DATA
 *************************************************/
async function fetchTopTracks(username){
  const url=`https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${username}&api_key=${API_KEY}&format=json&limit=${TOP_TRACK_LIMIT}&period=7day`;
  const res = await fetch(url);
  const data = await res.json();
  if(!data.toptracks) throw new Error("User not found or no top tracks");
  return data.toptracks.track;
}

async function fetchRecentTracks(username){
  const url=`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${API_KEY}&format=json&limit=${RECENT_TRACK_LIMIT}`;
  const res = await fetch(url);
  const data = await res.json();
  if(!data.recenttracks) return [];
  return data.recenttracks.track.map(t=>({name:t.name, artist:t.artist["#text"]}));
}

/*************************************************
 * MAIN LOGIC
 *************************************************/
async function generateTarot(username){
  try{
    introSection.hidden=true;
    loadingSection.hidden=false;
    spreadSection.hidden=true;

    const topTracks = await fetchTopTracks(username);
    const topTrack = topTracks[0];

    let totalEnergy=0,totalValence=0;
    for(const track of topTracks){
      const tags = await fetchTrackTags(track.artist.name, track.name);
      const stats = estimateTrackStats(tags);
      totalEnergy+=stats.energy;
      totalValence+=stats.valence;
    }
    const avgEnergy=totalEnergy/topTracks.length;
    const avgValence=totalValence/topTracks.length;
    const majorCard = pickMajorArcana(avgEnergy, avgValence);

    const recentTracks = await fetchRecentTracks(username);
    const minorCard = await pickMinorArcanaFromRecent(recentTracks);

    majorCardArt.style.backgroundImage=`url(${majorCard.image})`;
    majorCardTitle.textContent=majorCard.name;
    minorCardArt.style.backgroundImage=`url(${minorCard.image})`;
    minorCardTitle.textContent=minorCard.name;

    majorExplanation.innerHTML=`
      <h4>Major Arcana</h4>
      <p>${majorCard.meaning}</p>
      <p class="track-info">
        Weekly top track: <span class="track-title">${topTrack?.name||"Unknown"}</span> by <span class="track-artist">${topTrack?.artist?.name||"Unknown"}</span>
      </p>
    `;

    let [numberStr,,suit]=minorCard.name.split(" ");
    let number=parseInt(numberStr)||0;
    suit=suit||"Unknown";

    minorExplanation.innerHTML=`
      <h4>Minor Arcana</h4>
      <p>${minorCard.meaning}</p>
      <p><strong>Number meaning:</strong> ${minorCard.numberMeaning||NUMBER_MEANINGS[number]||""}</p>
      <p><strong>Suit meaning:</strong> ${minorCard.suitMeaning||SUIT_MEANINGS[suit]||""}</p>
      <p class="track-info">
        Most recent track: <span class="track-title">${recentTracks[0]?.name||"Unknown"}</span> by <span class="track-artist">${recentTracks[0]?.artist||"Unknown"}</span>
      </p>
    `;

    loadingSection.hidden=true;
    spreadSection.hidden=false;

  }catch(err){
    loadingSection.hidden=true;
    introSection.hidden=false;
    alert("Error fetching Last.fm data: "+err.message);
  }
}

/*************************************************
 * EVENTS
 *************************************************/
loginButton.addEventListener("click", async ()=>{
  const username=prompt("Enter your Last.fm username:");
  if(!username) return;
  await generateTarot(username);
});

exportButton.addEventListener("click", async ()=>{
  const canvas = await html2canvas(spreadSection);
  const link=document.createElement("a");
  link.download="spotify_tarot.png";
  link.href=canvas.toDataURL("image/png");
  link.click();
});
