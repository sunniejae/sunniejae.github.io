/// Soundtrack ///
const soundtrack = new Audio("https://sunniejae.blob.core.windows.net/sunniejae/assets/lscenessg/soundtrack.mp3");
soundtrack.loop = true;
soundtrack.volume = 0.4;

let audioPlaying = false;

/* ===============================
   MOBILE OPTIMIZATIONS
================================ */
// Prevent zoom on input focus (iOS)
document.addEventListener('touchstart', function() {}, {passive: true});

// Prevent accidental navigation gestures
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
}, {passive: true});

document.addEventListener('touchmove', (e) => {
  // Prevent pull-to-refresh and overscroll
  if (e.touches.length > 1) return;
  
  const touchEndX = e.touches[0].clientX;
  const touchEndY = e.touches[0].clientY;
  const diffX = touchStartX - touchEndX;
  const diffY = touchStartY - touchEndY;
  
  // Prevent horizontal swipe navigation
  if (Math.abs(diffX) > Math.abs(diffY)) {
    e.preventDefault();
  }
}, {passive: false});

/* ===============================
   GAME DATA
================================ */

const gameData = {
  start: {
    id: "start",
    title: "LUIS G'S MANSION",
    background: 'https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/luis1.png',
    text: ` Welcome to Luis G's Mansion... <br>
            A relic of an office incentive competition<br>
            Solve the riddles to survive.<br>
            Enter if you dare.<br>
            Survive if you can.<br>
            <span class="blink">► A: START ◄</span><br>
            <span class="blink">► B: INSTRUCTIONS ◄</span>`,
    choiceA: "START",
    choiceB: "INSTRUCTIONS",
    nextA: "foyer",
    nextB: "instructions"
  },

  instructions: {
    id: "instructions",
    title: "INSTRUCTIONS",
    background: 'https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/idle.png',
    text: `Read each riddle carefully.<br>
           Choose your answer wisely.<br>
           Wrong choices may lead to danger, and there are no save points!<br>
           <span class="blink">► A: BACK ◄</span><br>
           <span class="blink">► B: LETS-A-GO ◄</span>`,
    choiceA: "BACK",
    choiceB: "LETS-A-GO",
    nextA: "start",
    nextB: "foyer"
  },

  pause: {
    id: "pause",
    title: "INSTRUCTIONS",
    background: 'https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/idle.png',
    text: `We're waiting...
           <span class="blink">► A: LETS-A-GO ◄</span>`,
    choiceA: "BACK",
    choiceB: "LETS-A-GO",
    nextA: "start",
    nextB: "instructions"
  },

  foyer: {
    id: "foyer",
    title: "THE FOYER",
    background: 'https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/foyer.png',
    text: `You stand in the foyer, the walls adorned with old, dusty paintings and cobwebs stretching from corner to corner.<br>
           The room feels colder as you walk further from the door.<br>On the floor, a rolled parchment rests alone.<br>
           Read the parchment?<br>
           <span class="blink">► A: YES ◄</span><br>
           <span class="blink">► B: NO ◄</span>`,
    choiceA: "YES",
    choiceB: "NO",
    nextA: "parchment",
    nextB: "cowardsexit"
  },

  cowardsexit: {
    id: "cowardsexit",
    title: "COWARD",
    background: 'https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/coward.png',
    text: `Taking the Cowards Exit, are ya?<br>You have died from being a scaredy-cat.<br>
           <span class="blink">► A: START OVER ◄</span><br>
           <span class="blink">► B: START OVER ◄</span>`,
    choiceA: "START OVER",
    choiceB: "START OVER",
    nextA: "start",
    nextB: "start"
  },

  parchment: {
    id: "parchment",
    title: "DUSTY PARCHMENT",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/parchment.png",
    text: `I have cities, but no houses. I have forests, but no trees.<br><br>What am I?<br>
           <span class="blink">► A: ENTER ANSWER ◄</span><br>
           <span class="blink">► B: ENTER ANSWER ◄</span>`,
    input: {
      answers: ["map"],
      success: "shakeevent",
      failure: "wrong"
    }
  },

  wrong: {
    id: "wrong",
    title: "WRONG ANSWER",
    background: 'https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/wrong.png',
    text: `That's not right.<br>
           The mansion punishes the unwise.<br>
           <span class="blink">► A: START OVER ◄</span><br>
           <span class="blink">► B: START OVER ◄</span>`,
    choiceA: "START OVER",
    choiceB: "START OVER",
    nextA: "start",
    nextB: "start"
  },

  shakeevent: {
    id: "shakeevent",
    title: "THE MANSION RESPONDS",
    background: 'https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/shakeevent.png',
    text: `Confidently, you speak your answer out loud. As you do, the room begins to shake.<br>
           <span class="blink">► A: RUN ◄</span><br>
           <span class="blink">► B: HIDE ◄</span>`,
    choiceA: "RUN",
    choiceB: "HIDE",
    nextA: "basement",
    nextB: "collapsed"
  },

  collapsed: {
    id: "collapsed",
    title: "GONER",
    background: 'https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/collapsed.png',
    text: `You tried to hide under the stairs, but the ceiling collapsed on you.<br>
           You have died.<br>
           <span class="blink">► A: START OVER ◄</span><br>
           <span class="blink">► B: START OVER ◄</span>`,
    choiceA: "START OVER",
    choiceB: "START OVER",
    nextA: "start",
    nextB: "start"
  },

  basement: {
    id: "basement",
    title: "DUSTY BASEMENT",
    background: 'https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/basement.png',
    text: `You run down the set of stairs that you notice in the corner. You end up in a dirty, cluttered basement.<br>
           When you get there, you're greeted by the fabled Sunnie Jae.<br>
           <span class="blink">► A: SAY HI ◄</span><br>
           <span class="blink">► B: STAY SILENT ◄</span>`,
    choiceA: "SAY HI",
    choiceB: "STAY SILENT",
    nextA: "sunnie1",
    nextB: "sunnie1"
  },

  sunnie1: {
    id: "sunnie1",
    title: "SUNNIE JAE",
    background: 'https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/sunnie1.png',
    text: `Well hello there,<br>
           It's me, Sunnie Jae!<br>
           Answer my riddle, and I'll give you a pngt.<br>
           <span class="blink">► A: OKAY ◄</span><br>
           <span class="blink">► B: NO THANKS ◄</span>`,
    choiceA: "OKAY",
    choiceB: "NO THANKS",
    nextA: "sunnie2",
    nextB: "entrance"
  },

  sunnie2: {
    id: "sunnie2",
    title: "SUNNIE'S RIDDLE",
    background: 'https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/sunnie2.png',
    text: `I'm tall when I'm young, and short when I'm old.<br>
           What am I?<br>
           <span class="blink">► A: CANDLE ◄</span><br>
           <span class="blink">► B: SHADOW ◄</span>`,
    choiceA: "CANDLE",
    choiceB: "SHADOW",
    nextA: "entrance",
    nextB: "wrong"
  },

  entrance: {
    id: "entrance",
    title: "THE ENTRANCE",
    background: 'https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/entrance.png',
    text: `You have survived the first test.<br>
           The mansion doors open to the next challenge.<br>
           <span class="blink">► A: CONTINUE ◄</span><br>
           <span class="blink">► B: CONTINUE ◄</span>`,
    choiceA: "CONTINUE",
    choiceB: "CONTINUE",
    nextA: "start",
    nextB: "start"
  }
};

/* ===============================
   CORE VARIABLES
================================ */
let currentScene = "start";
let typingInterval = null;
let isTyping = false;
let isGameStarted = false;

/* ===============================
   BUTTON GLOW + DISABLE
================================ */
function setButtonsDisabled(state) {
  const btnA = document.querySelector(".btnA");
  const btnB = document.querySelector(".btnB");

  btnA.disabled = state;
  btnB.disabled = state;

  if (state) {
    btnA.classList.add("disabled");
    btnB.classList.add("disabled");
    btnA.style.opacity = "0.5";
    btnB.style.opacity = "0.5";
  } else {
    btnA.classList.remove("disabled");
    btnB.classList.remove("disabled");
    btnA.style.opacity = "1";
    btnB.style.opacity = "1";
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
  const backgrounds = document.getElementById("backgrounds");
  backgrounds.innerHTML = `
    <img src="${src}" class="background-image active" alt="Background">
  `;
}

function renderScene(scene) {
  const scenes = document.getElementById("scenes");

  scenes.innerHTML = `
    <div class="game-content active">
      <div class="title-bar">${scene.title}</div>

      <div class="text-area">
        <div class="text-box">
          <p class="riddle-text"></p>

          <div class="input-area" id="inputArea" style="display:none;">
            <input id="riddleInput" type="text" placeholder="Type your answer..." autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />
          </div>

          <div class="choice-prompt" id="choicePrompt">
            <span class="blink" id="choiceA"></span><br>
            <span class="blink" id="choiceB"></span>
          </div>
        </div>
      </div>
    </div>
  `;

  const textElement = scenes.querySelector(".riddle-text");

  typeWriter(textElement, scene.text, 60, () => {
    showChoices(scene.choiceA, scene.choiceB);

    if (scene.input) {
      document.getElementById("inputArea").style.display = "block";
      const input = document.getElementById("riddleInput");
      
      // Mobile keyboard handling
      setTimeout(() => {
        input.focus();
      }, 100);
      
      // Handle Enter key on mobile keyboards
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          input.blur(); // Hide keyboard
          checkRiddleAnswer(scene);
        }
      });
    }
  });
}

function showChoices(aText, bText) {
  document.getElementById("choiceA").textContent = aText;
  document.getElementById("choiceB").textContent = bText;
  document.getElementById("choicePrompt").style.display = "block";
}

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
  const scene = gameData[sceneKey];

  renderBackground(scene.background);
  renderScene(scene);
}

/* ===============================
   START SCREEN
================================ */
function showStartOverlay() {
  document.getElementById("startOverlay").style.display = "flex";
  setButtonsDisabled(true);
}

function hideStartOverlay() {
  document.getElementById("startOverlay").style.display = "none";
  setButtonsDisabled(false);
}

/* ===============================
   HAPTIC FEEDBACK (Mobile)
================================ */
function triggerHaptic() {
  if (navigator.vibrate) {
    navigator.vibrate(50);
  }
}

/* ===============================
   A/B BUTTONS
================================ */
function chooseOption(option) {
  // Haptic feedback on button press
  triggerHaptic();
  
  // START BUTTON
  if (!isGameStarted) {
    hideStartOverlay();
    isGameStarted = true;
    loadScene("start");
    return;
  }

  const scene = gameData[currentScene];
  if (isTyping) return;

  if (scene.input && option === "A") {
    checkRiddleAnswer(scene);
    return;
  }

  if (option === "A") loadScene(scene.nextA);
  if (option === "B") loadScene(scene.nextB);
}

/* ===============================
   INIT
================================ */
function init() {
  const musicBtn = document.getElementById("musicToggle");
  const btnA = document.querySelector(".btnA");
  const btnB = document.querySelector(".btnB");

  musicBtn.addEventListener("click", () => {
    triggerHaptic();
    
    if (!audioPlaying) {
      soundtrack.play().catch(err => {
        console.log("Audio play failed:", err);
      });
      audioPlaying = true;
      musicBtn.textContent = "🔇 Music";
    } else {
      soundtrack.pause();
      audioPlaying = false;
      musicBtn.textContent = "🔊 Music";
    }
  });

  // Touch event listeners for better mobile responsiveness
  btnA.addEventListener("touchstart", (e) => {
    e.preventDefault();
    chooseOption("A");
  });
  
  btnB.addEventListener("touchstart", (e) => {
    e.preventDefault();
    chooseOption("B");
  });

  // Keep click events for compatibility
  btnA.addEventListener("click", () => chooseOption("A"));
  btnB.addEventListener("click", () => chooseOption("B"));

  // ONLY show start overlay here
  showStartOverlay();
}

/* ===============================
   KEYBOARD CONTROLS (for desktop testing)
================================ */
document.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();

  // START GAME
  if (!isGameStarted && key === "a") {
    chooseOption("A");
    return;
  }

  if (!isGameStarted) return;

  if (key === "a") chooseOption("A");
  if (key === "b") chooseOption("B");
});

/* ===============================
   SCREEN ORIENTATION HANDLING
================================ */
if (screen.orientation) {
  screen.orientation.addEventListener('change', () => {
    // Adjust layout on orientation change
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  });
}

/* ===============================
   RUN
================================ */
document.addEventListener("DOMContentLoaded", () => {
  init();
  
  // Prevent accidental page navigation
  window.addEventListener('beforeunload', (e) => {
    if (isGameStarted && currentScene !== 'start') {
      e.preventDefault();
      e.returnValue = '';
    }
  });
});