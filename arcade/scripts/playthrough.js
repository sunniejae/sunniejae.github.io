import { gameData } from "./scenes.js";
import { createDevPanel, toggleDevPanel, updateStats } from "./devpanel.js";

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
let currentScene = "start";
let currentPage = 0;
let typingInterval = null;
let isTyping = false;
let continuePrompt;

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
function typeWriter(element, html, speed = 40, onComplete) {
  element.innerHTML = "";
  let i = 0;
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
    buffer += html[i];
    element.innerHTML = buffer;
    i++;
  }, speed);
}

/* ===============================
   RENDER FUNCTIONS
================================ */
function renderBackground(src) {
  const screen = document.getElementById("screenBg");
  screen.style.backgroundImage = `url('${src}')`;

  // Keep or create the riddle-text container
  let textElement = screen.querySelector(".riddle-text");
  if (!textElement) {
    textElement = document.createElement("div");
    textElement.className = "riddle-text";
    textElement.style.cssText = `
      padding: 20px;
      color: white;
      font-family: 'Starbim';
      font-size: 18px;
      text-shadow: 0 0 5px black;
    `;
    screen.appendChild(textElement);
  }
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
  updateStats();
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
    loadScene(scene.input.failure || "wrongparchment");
  }
}

/* ===============================
   ENDINGS
================================ */
function getEnding() {
  const { courage, charisma, curiosity } = stats;
  let endingScene;

  if (courage >= charisma && courage >= curiosity && courage >= 3) endingScene = "braveEnding";
  else if (charisma >= courage && charisma >= curiosity && charisma >= 3) endingScene = "kindEnding";
  else if (curiosity >= courage && curiosity >= charisma && curiosity >= 3) endingScene = "curiousEnding";
  else endingScene = "neutralEnding";

  // Load the ending scene
  loadScene(endingScene);

  // Reset stats and checkpoint
  stats.courage = 0;
  stats.charisma = 0;
  stats.curiosity = 0;
  stats.riddlesSolved = 0;
  checkpoint.scene = "start";
  checkpoint.page = 0;

  updateStats();
}

/* ===============================
   LOAD SCENE
================================ */
function loadScene(sceneKey) {
  currentScene = sceneKey;
  currentPage = 0;
  const scene = gameData[sceneKey];
  renderBackground(scene.background);
  renderScene(scene);
}

/* ===============================
   ADVANCE OR CHOOSE OPTION
================================ */
function advanceOrChoose(option) {
  const scene = gameData[currentScene];
  if (isTyping) return;

  // Advance pages first
  if (currentPage < scene.pages.length - 1) {
    currentPage++;
    renderScene(scene);
    return;
  }

  // Riddle input
  if (scene.input && option === "A") {
    checkRiddleAnswer(scene);
    return;
  }

  // Apply stats
  if (option === "A") applyStats(scene.statsA);
  if (option === "B") applyStats(scene.statsB);

  // Require 3 riddles before stat-based ending
  if ((scene.nextA === "statEnding" || scene.nextB === "statEnding") && stats.riddlesSolved < 3) {
    alert("You must solve at least 3 riddles before exiting!");
    return;
  }

  // Determine next scene
  let nextSceneKey = option === "A" ? scene.nextA : scene.nextB;
  if (!nextSceneKey) return;

  if (nextSceneKey === "statEnding") {
    getEnding();
  } else {
    loadScene(nextSceneKey);
  }
}

/* ===============================
   CONTINUE PROMPT
================================ */
function updateContinuePrompt(scene) {
  const inputBox = document.getElementById("riddleInput");

  if (currentPage < scene.pages.length - 1) {
    continuePrompt.innerHTML = `<span class="prompt-text">Press A to continue</span>`;
    inputBox.style.display = "none";
  } else if (scene.input) {
    continuePrompt.innerHTML = `<span class="prompt-text">Enter your answer (Press Enter)</span>`;
    inputBox.style.display = "block";
  } else if (scene.choiceA && scene.choiceB) {
    continuePrompt.innerHTML = `
      <span class="choice-label">A:</span> 
      <span class="choice-text">${scene.choiceA}</span> |
      <span class="choice-label">B:</span> 
      <span class="choice-text">${scene.choiceB}</span>
    `;
    inputBox.style.display = "none";
  } else {
    continuePrompt.innerHTML = `<span class="prompt-text">Press A to continue</span>`;
    inputBox.style.display = "none";
  }
}


/* ===============================
   INIT
================================ */
function init() {
  continuePrompt = document.getElementById("continuePrompt");

  // Buttons
  document.querySelector(".btn.a").addEventListener("click", () => advanceOrChoose("A"));
  document.querySelector(".btn.b").addEventListener("click", () => advanceOrChoose("B"));

  // Keyboard
  document.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    const scene = gameData[currentScene];

    if (key === "=") {
      toggleDevPanel();
      return;
    }

    if (scene.input && key === "enter") {
      checkRiddleAnswer(scene);
      return;
    }

    if (!scene.input) {
      if (key === "a") advanceOrChoose("A");
      if (key === "b") advanceOrChoose("B");
    }
  });

  // Start first scene
  loadScene("start");

  // Dev panel
  createDevPanel();
}

document.addEventListener("DOMContentLoaded", init);

/* ===============================
   EXPORT
================================ */
export const state = { currentScene, currentPage, stats };
export { renderScene, renderBackground, updateContinuePrompt as updatePrompt, advanceOrChoose, loadScene };
