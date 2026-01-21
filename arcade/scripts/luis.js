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
  curiosity: 0,
};
function showFinalStats() {
  const statsContainer = document.getElementById("statsContainer");
  statsContainer.innerHTML = "";

  for (const key in stats) {
    const statLine = document.createElement("p");
    statLine.textContent = `${key}: ${stats[key]}`;
    statsContainer.appendChild(statLine);
  }

  statsContainer.style.display = "block";
}

/* ===============================
   GAME DATA WITH MULTIPAGE SUPPORT
================================ */
const gameData = {
  start: {
    id: "start",
    title: "LUIS G'S MANSION",
    background: 'https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/luis1.png',
    pages: [
      `Welcome to Luis G's Mansion...`,
      `A relic of an office incentive competition.`,
      `Solve the riddles to escape.`,
      `Enter if you dare. Survive if you can.`
    ],
    choiceA: "START",
    choiceB: "INSTRUCTIONS",
    nextA: "foyer",
    nextB: "instructions",
    statsA: { courage: +1 },
    statsB: { curiosity: +1 }
  },

  instructions: {
    id: "instructions",
    title: "INSTRUCTIONS",
    background: 'https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/instructions.png',
    pages: [
      `Use A to continue.`,
      `Use B to go back.`,
      `Solve riddles to escape.`
    ],
    choiceA: "BACK",
    choiceB: "BACK",
    nextA: "start",
    nextB: "start",
    statsA: { curiosity: +1 },
    statsB: { curiosity: +1 }
  },

  foyer: {
    id: "foyer",
    title: "THE FOYER",
    background: 'https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/foyer.png',
    pages: [
      `You stand in the foyer, the walls adorned with old, dusty paintings and cobwebs stretching from corner to corner.`,
      `The room feels colder as you walk further from the door.`,
      `On the floor, a rolled parchment rests alone. Read the parchment?`
    ],
    choiceA: "YES",
    choiceB: "NO",
    nextA: "parchment",
    nextB: "cowardsexit",
    statsA: { curiosity: +1 },
    statsB: { courage: -1 }
  },

  parchment: {
    id: "parchment",
    title: "DUSTY PARCHMENT",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/parchment.png",
    pages: [
      `I have cities, but no houses. I have forests, but no trees.<br>What am I?`
    ],
    input: {
      answers: ["map"],
      success: "shakeevent",
      failure: "wrong"
    }
  },

  shakeevent: {
    id: "shakeevent",
    title: "THE SHAKE",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/shake.png",
    pages: [
      `The parchment trembles.`,
      `A secret door opens. You step through...`
    ],
    choiceA: "CONTINUE",
    choiceB: "CONTINUE",
    nextA: "hallway",
    nextB: "hallway",
    statsA: { courage: +2 }
  },

  wrong: {
    id: "wrong",
    title: "WRONG",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/wrong.png",
    pages: [
      `That’s not right.`,
      `Try again.`
    ],
    choiceA: "TRY AGAIN",
    choiceB: "EXIT",
    nextA: "parchment",
    nextB: "cowardsexit",
    statsA: { courage: -1 },
    statsB: { courage: -2 }
  },

  cowardsexit: {
    id: "cowardsexit",
    title: "THE EXIT",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/exit.png",
    pages: [
      `You run back to the door.`,
      `The mansion laughs behind you.`
    ],
    choiceA: "RESTART",
    choiceB: "RESTART",
    nextA: "start",
    nextB: "start"
  },

  hallway: {
    id: "hallway",
    title: "THE HALLWAY",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/hallway.png",
    pages: [
      `You walk down the hallway.`,
      `A portrait stares at you with empty eyes.`,
      `There are two doors: left and right.`
    ],
    choiceA: "LEFT",
    choiceB: "RIGHT",
    nextA: "leftdoor",
    nextB: "rightdoor",
    statsA: { curiosity: +1 },
    statsB: { kindness: +1 }
  },

  leftdoor: {
    id: "leftdoor",
    title: "LEFT DOOR",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/left.png",
    pages: [
      `The left door creaks open.`,
      `A dark room awaits.`
    ],
    choiceA: "CONTINUE",
    choiceB: "BACK",
    nextA: "riddle2",
    nextB: "hallway",
    statsA: { courage: +1 }
  },

  rightdoor: {
    id: "rightdoor",
    title: "RIGHT DOOR",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/right.png",
    pages: [
      `The right door opens into a bright room.`,
      `A voice whispers...`
    ],
    choiceA: "CONTINUE",
    choiceB: "BACK",
    nextA: "riddle2",
    nextB: "hallway",
    statsA: { kindness: +1 }
  },

  riddle2: {
    id: "riddle2",
    title: "RIDDLE ROOM",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/riddle2.png",
    pages: [
      `I speak without a mouth and hear without ears. I have nobody, but I come alive with wind. What am I?`
    ],
    input: {
      answers: ["echo"],
      success: "ending",
      failure: "wrong2"
    }
  },

  wrong2: {
    id: "wrong2",
    title: "WRONG",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/wrong.png",
    pages: [
      `Not quite.`,
      `Try again.`
    ],
    choiceA: "TRY AGAIN",
    choiceB: "EXIT",
    nextA: "riddle2",
    nextB: "cowardsexit"
  },

  ending: {
    id: "ending",
    title: "ESCAPE",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/ending.png",
    pages: [
      `You escaped the mansion.`,
      `But the mansion never forgets...`
    ],
    choiceA: "RESTART",
    choiceB: "RESTART",
    nextA: "start",
    nextB: "start"
  }
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
    loadScene(scene.input.success);
  } else {
    loadScene(scene.input.failure);
  }
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

  // If still pages left
  if (currentPage < scene.pages.length - 1) {
    currentPage++;
    renderScene(scene);
    return;
  }

  // If riddle scene, wait for input
  if (scene.input) return;

  // If choices exist, wait for choice
  if (scene.choiceA && scene.choiceB) return;
}

/* ===============================
   CHOOSE OPTION
================================ */
function chooseOption(option) {
  const scene = gameData[currentScene];
  if (isTyping) return;

  // If still pages left, continue
  if (scene.pages.length > 1 && currentPage < scene.pages.length - 1) {
    advancePageOrScene();
    return;
  }

  // Apply stats
  if (option === "A") applyStats(scene.statsA);
  if (option === "B") applyStats(scene.statsB);

  // Riddle input
  if (scene.input && option === "A") {
    checkRiddleAnswer(scene);
    return;
  }

  // Handle A/B
  if (option === "A" && scene.nextA) loadScene(scene.nextA);
  if (option === "B" && scene.nextB) loadScene(scene.nextB);
}

function updateContinuePrompt(scene) {
  const inputBox = document.getElementById("riddleInput");

  // If not on the last page, show default message
  if (currentPage < scene.pages.length - 1) {
    continuePrompt.innerText = "Press A to continue";
    inputBox.style.display = "none";
    return;
  }

  // LAST PAGE
  // Riddle scene
  if (scene.input) {
    continuePrompt.innerText = "Enter your answer (A submits, B backspaces)";
    inputBox.style.display = "block";
    return;
  }

  // Choice scene
  if (scene.choiceA && scene.choiceB) {
    continuePrompt.innerText = `A: ${scene.choiceA} | B: ${scene.choiceB}`;
    inputBox.style.display = "none";
    return;
  }

  // Default last page
  continuePrompt.innerText = "Press A to continue";
  inputBox.style.display = "none";
}


/* ===============================
   KEYBOARD CONTROLS
================================ */
document.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();
  const scene = gameData[currentScene];

  // Riddle scene controls
  if (scene.input) {
    const input = document.getElementById("riddleInput");

    // A submits answer
    if (key === "a" || key === "enter") {
      checkRiddleAnswer(scene);
      return;
    }

    // B backspaces
    if (key === "b") {
      input.value = input.value.slice(0, -1);
      return;
    }

    return;
  }

  // Normal scene controls
  if (key === "a") chooseOption("A");

  // B goes back a page if possible, otherwise chooses B
  if (key === "b") {
    if (currentPage > 0) {
      currentPage--;
      renderScene(scene);
      return;
    }
    chooseOption("B");
  }
});

/* ===============================
   INIT
================================ */
function init() {
  continuePrompt = document.getElementById("continuePrompt");

  const btnA = document.querySelector(".btn.a");
  const btnB = document.querySelector(".btn.b");

  btnA.addEventListener("click", () => {
    const scene = gameData[currentScene];
    if (scene.input) checkRiddleAnswer(scene);
    else chooseOption("A");
  });

  btnB.addEventListener("click", () => {
    const scene = gameData[currentScene];
    const input = document.getElementById("riddleInput");

    if (scene.input) {
      input.value = input.value.slice(0, -1);
      return;
    }

    if (currentPage > 0) {
      currentPage--;
      renderScene(scene);
      return;
    }

    chooseOption("B");
  });

  // Start the game
  loadScene("start");
}

/* ===============================
   RUN
================================ */
document.addEventListener("DOMContentLoaded", init);
