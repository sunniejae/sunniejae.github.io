import { gameData } from "./huntscenes.js";
import { races } from "./races.js";
import { createDevPanel, toggleDevPanel, teleportTo, updateStats, getDevEnding } from "./devpanelghosts.js";

/// Soundtrack ///
const soundtrack = new Audio("https://sunniejae.blob.core.windows.net/sunniejae/assets/lscenessg/soundtrack.mp3");
soundtrack.loop = true;
soundtrack.volume = 0.4;

/* ===============================
   STATS & CHECKPOINTS
================================ */
const stats = {
  courage: 0,
  charisma: 0,
  curiosity: 0,
  riddlesSolved: 0
};

let checkpoint = { scene: "start", page: 0 };

/* ===============================
   CORE VARIABLES
================================ */
let currentScene = "chooseRace"; // start with race selection
let currentPage = 0;
let typingInterval = null;
let isTyping = false;
let continuePrompt;
let playerRace = null;
let abilityUsed = false;

/* ===============================
   BUTTON HANDLING
================================ */
function setButtonsDisabled(state) {
  const btnA = document.querySelector(".btn.a");
  const btnB = document.querySelector(".btn.b");
  btnA.disabled = state;
  btnB.disabled = state;
  btnA.classList.toggle("disabled", state);
  btnB.classList.toggle("disabled", state);
}

/* ===============================
   TYPEWRITER EFFECT
================================ */
function typeWriter(element, html, speed = 22, onComplete) {
  element.innerHTML = "";
  let i = 0;
  let isTag = false;
  let buffer = "";
  clearInterval(typingInterval);
  isTyping = true;
  setButtonsDisabled(true);

  typingInterval = setInterval(() => {
    if (i >= html.length) {
      clearInterval(typingInterval);
      isTyping = false;
      setButtonsDisabled(false);
      if (onComplete) onComplete();
      return;
    }
    const char = html[i];
    buffer += char;
    if (char === "<") isTag = true;
    if (char === ">") isTag = false;
    element.innerHTML = buffer;
    i++;
  }, speed);
}

/* ===============================
   RENDER FUNCTIONS
================================ */
function renderBackground(src) {
  document.getElementById("screenBg").style.backgroundImage = `url('${src}')`;
}

function renderScene(scene) {
  const textElement = document.querySelector(".riddle-text");
  typeWriter(textElement, scene.pages[currentPage], 40, () => updateContinuePrompt(scene));
}

/* ===============================
   STATS FUNCTIONS
================================ */
function applyStats(statsObj) {
  if (!statsObj) return;
  for (const key in statsObj) {
    if (stats.hasOwnProperty(key)) stats[key] += statsObj[key];
  }
  updateStats(); // Update dev panel live
}

function saveCheckpoint(sceneKey, page = 0) {
  checkpoint.scene = sceneKey;
  checkpoint.page = page;
}

/* ===============================
   RIDDLE CHECK
================================ */
function checkRiddleAnswer(scene) {
  const userAnswer = document.getElementById("riddleInput").value.trim().toLowerCase();
  const correctAnswers = scene.input.answers.map(a => a.toLowerCase());

  if (correctAnswers.includes(userAnswer)) {
    applyStats(scene.statsSuccess || { curiosity: 1 });
    stats.riddlesSolved += 1;
    saveCheckpoint(scene.input.success, 0);
    loadScene(scene.input.success);
  } else {
    applyStats(scene.statsFailure || {});
    loadScene(scene.input.failure || "wrong");
  }
}

/* ===============================
   ENDINGS
================================ */
function getEnding() {
  const { courage, charisma, curiosity } = stats;
  let ending;

  if (playerRace?.name === "The Bound") ending = "boundEnding";
  else if (playerRace?.name === "The Witness") ending = "witnessEnding";
  else if (courage >= charisma && courage >= curiosity && courage >= 3) ending = "braveEnding";
  else if (charisma >= courage && charisma >= curiosity && charisma >= 3) ending = "kindEnding";
  else if (curiosity >= courage && curiosity >= charisma && curiosity >= 3) ending = "curiousEnding";
  else ending = "neutralEnding";

  showStatEndScreen(ending);

  stats.courage = 0;
  stats.charisma = 0;
  stats.curiosity = 0;
  stats.riddlesSolved = 0;
  checkpoint.scene = "chooseRace";
  checkpoint.page = 0;
  playerRace = null;
  abilityUsed = false;

  return ending;
}

/* ===============================
   LOAD SCENE
================================ */
function loadScene(sceneKey) {
  currentScene = sceneKey;
  currentPage = 0;
  abilityUsed = false;
  
  // Race selection scene
  if (sceneKey === "chooseRace") {
    renderRaceSelection();
    return;
  }

  const scene = gameData[sceneKey];
  renderBackground(scene.background);
  renderScene(scene);
}

/* ===============================
   ADVANCE PAGE
================================ */
function advancePageOrScene() {
  const scene = gameData[currentScene];
  if (currentPage < scene.pages.length - 1) {
    currentPage++;
    renderScene(scene);
  }
}

/* ===============================
   CHOOSE OPTION
================================ */
function chooseOption(option) {
  if (currentScene === "chooseRace") return handleRaceSelection(option);

  const scene = gameData[currentScene];
  if (isTyping) return;

  if (currentPage < scene.pages.length - 1) {
    advancePageOrScene();
    return;
  }

  if (option === "A") applyStats(scene.statsA);
  if (option === "B") applyStats(scene.statsB);

  if (scene.choiceB === "BACK TO CHECKPOINT" && option === "B") {
    loadScene(checkpoint.scene);
    currentPage = checkpoint.page;
    return;
  }

  if (scene.input && option === "A") {
    checkRiddleAnswer(scene);
    return;
  }

  if ((scene.nextA === "ending" || scene.nextB === "ending") && stats.riddlesSolved < 3) {
    alert("You must solve at least 3 riddles before exiting!");
    return;
  }

  if (currentScene === "ending") {
    loadScene(getEnding());
    return;
  }

  if (option === "A" && scene.nextA) loadScene(scene.nextA);
  if (option === "B" && scene.nextB) loadScene(scene.nextB);
}

/* ===============================
   RACE SELECTION
================================ */
function renderRaceSelection() {
  const screen = document.getElementById("screenBg");
  screen.innerHTML = `
    <div style="padding:20px;color:white;font-family:'Starbim'">
      <h2>Choose Your Archetype</h2>
      ${Object.values(races).map((r, i) => `
        <div class="race-option" data-key="${Object.keys(races)[i]}">
          <h3>${r.name}</h3>
          <p>${Object.values(r.features).map(f => f.description).join("<br>")}</p>
        </div>
      `).join("")}
      <p>Press A/B (or more) to select your race.</p>
    </div>
  `;
}

function handleRaceSelection(option) {
  // Map A=first race, B=second, C=third, etc.
  const raceKeys = Object.keys(races);
  const index = option === "A" ? 0 : option === "B" ? 1 : option === "C" ? 2 : 3;
  const chosenRace = raceKeys[index];
  playerRace = races[chosenRace];
  applyStats(playerRace.stats);
  alert(`You are now a ${playerRace.name}!`);
  loadScene("start");
}

/* ===============================
   ABILITY USAGE
================================ */
function useAbility(featureKey) {
  if (!playerRace) return alert("Select a race first.");
  if (abilityUsed) return alert("Ability already used this scene.");
  playerRace.features[featureKey].action();
  abilityUsed = true;
}

/* ===============================
   PROMPT
================================ */
function updateContinuePrompt(scene) {
  const inputBox = document.getElementById("riddleInput");

  if (currentPage < scene.pages.length - 1) {
    continuePrompt.innerText = "Press A to continue";
    inputBox.style.display = "none";
  } else if (scene.input) {
    continuePrompt.innerText = "Enter your answer (Press Enter)";
    inputBox.style.display = "block";
  } else if (scene.choiceA && scene.choiceB) {
    continuePrompt.innerText = `A: ${scene.choiceA} | B: ${scene.choiceB}`;
    inputBox.style.display = "none";
  } else {
    continuePrompt.innerText = "Press A to continue";
    inputBox.style.display = "none";
  }
}

/* ===============================
   STAT END SCREEN
================================ */
function showStatEndScreen(endingScene) {
  const screen = document.getElementById("screenBg");
  screen.innerHTML = `
    <div style="padding: 20px; color: white; font-family: 'Starbim';">
      <h2>Ending: ${endingScene}</h2>
      <p>Courage: ${stats.courage}</p>
      <p>Charisma: ${stats.charisma}</p>
      <p>Curiosity: ${stats.curiosity}</p>
      <p>Riddles Solved: ${stats.riddlesSolved}</p>
      <button id="restartBtn">Restart</button>
    </div>
  `;
  document.getElementById("restartBtn").addEventListener("click", () => loadScene("chooseRace"));
}

/* ===============================
   KEYBOARD CONTROLS
================================ */
document.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();
  const scene = gameData[currentScene];

  if (key === "=") { toggleDevPanel(); return; }
  if (scene.input && key === "enter") { checkRiddleAnswer(scene); return; }

  if (key === "a") chooseOption("A");
  if (key === "b") chooseOption("B");
});

/* ===============================
   INIT
================================ */
function init() {
  continuePrompt = document.getElementById("continuePrompt");

  document.querySelector(".btn.a").addEventListener("click", () => {
    const scene = gameData[currentScene];
    if (scene.input) checkRiddleAnswer(scene);
    else chooseOption("A");
  });

  document.querySelector(".btn.b").addEventListener("click", () => {
    const scene = gameData[currentScene];
    if (!scene.input) chooseOption("B");
  });

  loadScene("chooseRace");

  createDevPanel();
}

document.addEventListener("DOMContentLoaded", init);

/* ===============================
   EXPORT FOR DEV PANEL
================================ */
export const state = { currentScene, currentPage, stats, playerRace };
export { renderScene, renderBackground, updateContinuePrompt as updatePrompt, useAbility };
