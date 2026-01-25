import { gameData } from "./scenes.js";

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
    saveCheckpoint(scene.input.success, 0); // checkpoint after solving
    loadScene(scene.input.success);
  } else {
    applyStats(scene.statsFailure || {});
    loadScene("wrong");
  }
}

/* ===============================
   ENDINGS
================================ */
function getEnding() {
  const { courage, charisma, curiosity } = stats;
  let ending;

  if (courage >= charisma && courage >= curiosity && courage >= 3) ending = "braveEnding";
  else if (charisma >= courage && charisma >= curiosity && charisma >= 3) ending = "kindEnding";
  else if (curiosity >= courage && curiosity >= charisma && curiosity >= 3) ending = "curiousEnding";
  else ending = "neutralEnding";

  // Hard reset after game completion
  stats.courage = 0;
  stats.charisma = 0;
  stats.curiosity = 0;
  stats.riddlesSolved = 0;
  checkpoint.scene = "start";
  checkpoint.page = 0;

  return ending;
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
  const scene = gameData[currentScene];
  if (isTyping) return;

  if (currentPage < scene.pages.length - 1) {
    advancePageOrScene();
    return;
  }

  if (option === "A") applyStats(scene.statsA);
  if (option === "B") applyStats(scene.statsB);

  // Handle checkpoint back option
  if (scene.choiceB === "BACK TO CHECKPOINT" && option === "B") {
    loadScene(checkpoint.scene);
    currentPage = checkpoint.page;
    return;
  }

  // Riddle submission
  if (scene.input && option === "A") {
    checkRiddleAnswer(scene);
    return;
  }

  // Require at least 3 riddles to exit
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
   KEYBOARD CONTROLS
================================ */
document.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();
  const scene = gameData[currentScene];

  // Only submit riddle when pressing Enter
  if (scene.input) {
    if (key === "enter") {
      checkRiddleAnswer(scene);
    }
    return; // ignore A/B while in riddle input
  }

  // Normal choices / page advance
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
  if (scene.input) {
    // Only submit when clicking A if it's a riddle
    checkRiddleAnswer(scene);
  } else {
    chooseOption("A");
  }
});

document.querySelector(".btn.b").addEventListener("click", () => {
  const scene = gameData[currentScene];
  if (!scene.input) chooseOption("B"); // ignore B for riddles
});


  loadScene("start");
}

document.addEventListener("DOMContentLoaded", init);
