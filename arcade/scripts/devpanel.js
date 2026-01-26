// ===============================
// DEV PANEL
// ===============================
import { gameData } from "./scenes.js";
import { state, renderScene, renderBackground, updatePrompt } from "./playthrough.js";

// Dev panel state
let devPanel, devPanelHeader, statsDisplay, sceneList;
let isDragging = false;
let offsetX = 0, offsetY = 0;

// ===============================
// CREATE PANEL
// ===============================
function createDevPanel() {
  // Only create once
  if (devPanel) return;

  devPanel = document.createElement("div");
  devPanel.id = "devPanel";
  devPanel.style.cssText = `
    position: fixed;
    top: 50px;
    left: 50px;
    width: 300px;
    background: rgba(0,0,0,0.85);
    color: white;
    font-family: monospace;
    z-index: 9999;
    border: 2px solid #ff69b4;
    border-radius: 12px;
    user-select: none;
    display: none;
  `;

  // Header (for drag)
  devPanelHeader = document.createElement("div");
  devPanelHeader.style.cssText = `
    background: #ff69b4;
    padding: 6px;
    cursor: move;
    text-align: center;
    font-weight: bold;
  `;
  devPanelHeader.innerText = "DEV PANEL (~)";
  devPanel.appendChild(devPanelHeader);

  // Stats display
  statsDisplay = document.createElement("div");
  statsDisplay.style.cssText = "padding: 8px; font-size: 14px; border-bottom: 1px solid #fff;";
  devPanel.appendChild(statsDisplay);

  // Scene list
  sceneList = document.createElement("div");
  sceneList.style.cssText = "padding: 8px; max-height: 300px; overflow-y: auto;";
  devPanel.appendChild(sceneList);

  // Create teleport buttons for each scene
  for (let key in gameData) {
    const btn = document.createElement("button");
    btn.innerText = key;
    btn.style.cssText = `
      display: block;
      width: 100%;
      margin-bottom: 4px;
      background: #333;
      color: #fff;
      border: none;
      padding: 4px;
      border-radius: 6px;
      cursor: pointer;
    `;
    btn.onclick = () => teleportTo(key);
    sceneList.appendChild(btn);
  }

  document.body.appendChild(devPanel);

  // Drag logic
  devPanelHeader.addEventListener("mousedown", e => {
    isDragging = true;
    offsetX = e.clientX - devPanel.offsetLeft;
    offsetY = e.clientY - devPanel.offsetTop;
  });

  window.addEventListener("mousemove", e => {
    if (isDragging) {
      devPanel.style.left = e.clientX - offsetX + "px";
      devPanel.style.top = e.clientY - offsetY + "px";
    }
  });

  window.addEventListener("mouseup", () => {
    isDragging = false;
  });
}

// ===============================
// TOGGLE PANEL
// ===============================
function toggleDevPanel() {
  if (!devPanel) createDevPanel();
  devPanel.style.display = devPanel.style.display === "none" ? "block" : "none";
  updateStats();
}

// ===============================
// TELEPORT FUNCTION
// ===============================
function teleportTo(sceneKey) {
  if (!gameData[sceneKey]) return console.warn("Scene not found:", sceneKey);

  // Reset page
  state.currentScene = sceneKey;
  state.currentPage = 0;

  // Render scene properly
  const scene = gameData[sceneKey];
  renderBackground(scene.background);
  renderScene(scene);
  updatePrompt(scene);

  updateStats();
}

// ===============================
// UPDATE STATS DISPLAY
// ===============================
function updateStats() {
  if (!statsDisplay) return;
  const s = state.stats;
  statsDisplay.innerHTML = `
    <b>Stats</b><br>
    Courage: ${s.courage}<br>
    Charisma: ${s.charisma}<br>
    Curiosity: ${s.curiosity}<br>
    Riddles Solved: ${s.riddlesSolved}
  `;
}

// ===============================
// STAT REVEAL / ENDING CHECK
// ===============================
function getDevEnding() {
  const s = state.stats;
  let ending;
  if (s.courage >= s.charisma && s.courage >= s.curiosity && s.courage >= 3) ending = "Brave Ending";
  else if (s.charisma >= s.courage && s.charisma >= s.curiosity && s.charisma >= 3) ending = "Kind Ending";
  else if (s.curiosity >= s.courage && s.curiosity >= s.charisma && s.curiosity >= 3) ending = "Curious Ending";
  else ending = "Neutral Ending";

  alert(`Dev Ending: ${ending}\nStats:\nCourage: ${s.courage}\nCharisma: ${s.charisma}\nCuriosity: ${s.curiosity}\nRiddles Solved: ${s.riddlesSolved}`);
}

// ===============================
// KEYBIND
// ===============================
document.addEventListener("keydown", (e) => {
  if (e.key === "~") toggleDevPanel();
  if (e.key === "e" && devPanel.style.display === "block") getDevEnding();
});

// ===============================
// EXPORT
// ===============================
export { createDevPanel, toggleDevPanel, teleportTo, updateStats, getDevEnding };
