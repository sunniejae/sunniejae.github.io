import { gameData } from "./scenes.js";

/// Soundtrack ///
const soundtrack = new Audio("https://sunniejae.blob.core.windows.net/sunniejae/assets/lscenessg/soundtrack.mp3");
soundtrack.loop = true;
soundtrack.volume = 0.4;

/* ===============================
   HIDDEN STATS
================================ */
const stats = {
  courage: 0,
  kindness: 0,
  curiosity: 0
};

/* ===============================
   CORE VARIABLES
================================ */
let currentScene = "start";
let currentPage = 0;
let typingInterval = null;
let isTyping = false;
let continuePrompt;

/* ===============================
   BUTTON GLOW + DISABLE
================================ */
function setButtonsDisabled(state) {
  const btnA = document.querySelector(".btn.a");
  const btnB = document.querySelector(".btn.b");
  btnA.disabled = state;
  btnB.disabled = state;

  if (state) {
    btnA.classList.add("disabled");
    btnB.classList.add("disabled");
  } else {
    btnA.classList.remove("disabled");
    btnB.classList.remove("disabled");
  }
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
    if (isTag) return;
  }, speed);
}

/* ===============================
   RENDER FUNCTIONS
================================ */
function renderBackground(src) {
  const screenBg = document.getElementById("screenBg");
  screenBg.style.backgroundImage = `url('${src}')`;
}

function renderScene(scene) {
  const textElement = document.querySelector(".riddle-text");
  typeWriter(textElement, scene.pages[currentPage], 40, () => {
    updateContinuePrompt(scene);
  });
}

/* ===============================
   STATS
================================ */
function applyStats(statsObj) {
  if (!statsObj) return;

  for (const key in statsObj) {
    if (stats.hasOwnProperty(key)) {
      stats[key] += statsObj[key];
    }
  }
}

/* ===============================
   RIDDLE CHECK
================================ */
function checkRiddleAnswer(scene) {
  const userAnswer = document.getElementById("riddleInput").value.trim().toLowerCase();
  const correctAnswers = scene.input.answers.map(a => a.toLowerCase());

  if (correctAnswers.includes(userAnswer)) {
    applyStats(scene.statsSuccess || { curiosity: 1 });
    loadScene(scene.input.success);
  } else {
    applyStats(scene.statsFailure || {});
    loadScene(scene.input.failure);
  }
}

/* ===============================
   CONDITIONAL ENDING
================================ */
function getEnding() {
  const { courage, kindness, curiosity } = stats;

  if (courage >= kindness && courage >= curiosity && courage >= 3) return "braveEnding";
  if (kindness >= courage && kindness >= curiosity && kindness >= 3) return "kindEnding";
  if (curiosity >= courage && curiosity >= kindness && curiosity >= 3) return "curiousEnding";
  return "neutralEnding";
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
   ADVANCE PAGE OR SCENE
================================ */
function advancePageOrScene() {
  const scene = gameData[currentScene];

  if (currentPage < scene.pages.length - 1) {
    currentPage++;
    renderScene(scene);
    return;
  }

  if (scene.input) return;
  if (scene.choiceA && scene.choiceB) return;
}

/* ===============================
   CHOOSE OPTION
================================ */
function chooseOption(option) {
  const scene = gameData[currentScene];
  if (isTyping) return;

  // If still on multi-page scene, just advance
  if (currentPage < scene.pages.length - 1) {
    advancePageOrScene();
    return;
  }

  // Apply stats for the option
  if (option === "A") applyStats(scene.statsA);
  if (option === "B") applyStats(scene.statsB);

  // If it's a riddle scene, only A submits
  if (scene.input && option === "A") {
    checkRiddleAnswer(scene);
    return;
  }

  // If you reach the ending scene, choose stats-based ending
  if (currentScene === "ending") {
    loadScene(getEnding());
    return;
  }

  // Load next scenes for choices
  if (option === "A" && scene.nextA) loadScene(scene.nextA);
  if (option === "B" && scene.nextB) loadScene(scene.nextB);
}

/* ===============================
   PROMPT UPDATE
================================ */
function updateContinuePrompt(scene) {
  const inputBox = document.getElementById("riddleInput");

  if (currentPage < scene.pages.length - 1) {
    continuePrompt.innerText = "Press A to continue";
    inputBox.style.display = "none";
    return;
  }

  if (scene.input) {
    continuePrompt.innerText = "Enter your answer (Press Enter)";
    inputBox.style.display = "block";
    return;
  }

  if (scene.choiceA && scene.choiceB) {
    continuePrompt.innerText = `A: ${scene.choiceA} | B: ${scene.choiceB}`;
    inputBox.style.display = "none";
    return;
  }

  continuePrompt.innerText = "Press A to continue";
  inputBox.style.display = "none";
}

/* ===============================
   KEYBOARD CONTROLS
================================ */
document.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();
  const scene = gameData[currentScene];

  if (scene.input) {
    if (key === "enter") {
      checkRiddleAnswer(scene);
      return;
    }
    return;
  }

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
    if (scene.input) return;
    chooseOption("B");
  });

  loadScene("start");
}

/* ===============================
   RUN
================================ */
document.addEventListener("DOMContentLoaded", init);
