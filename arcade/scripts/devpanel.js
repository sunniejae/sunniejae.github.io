// ===============================
// TIMEWARP DEV PANEL
// ===============================
import { gameData } from "./scenes.js";
import { state, renderScene, renderBackground, updatePrompt } from "./playthrough.js";

// Panel elements
let devPanel, devHeader, statsDisplay, sceneList;
let isDragging = false, offsetX = 0, offsetY = 0;

// ===============================
// CREATE PANEL
// ===============================
function createDevPanel() {
  if (devPanel) return;

  devPanel = document.createElement("div");
  devPanel.id = "devPanel";
  devPanel.style.cssText = `
    position: fixed;
    top: 50px;
    left: 50px;
    width: 320px;
    background: rgba(0,0,0,0.9);
    color: white;
    font-family: monospace;
    z-index: 9999;
    border: 2px solid #ff69b4;
    border-radius: 12px;
    user-select: none;
    display: none;
    padding-bottom: 10px;
  `;

  // HEADER (draggable)
  devHeader = document.createElement("div");
  devHeader.style.cssText = `
    background: #ff69b4;
    padding: 8px;
    cursor: move;
    text-align: center;
    font-weight: bold;
  `;
  devHeader.innerText = "TIMEWARP DEV PANEL (~)";
  devPanel.appendChild(devHeader);

  // STATS DISPLAY
  statsDisplay = document.createElement("div");
  statsDisplay.style.cssText = `
    padding: 8px;
    font-size: 14px;
    border-bottom: 1px solid #fff;
  `;
  devPanel.appendChild(statsDisplay);

  // SCENE LIST CONTAINER
  sceneList = document.createElement("div");
  sceneList.style.cssText = `
    padding: 8px;
    max-height: 300px;
    overflow-y: auto;
  `;
  devPanel.appendChild(sceneList);

  // Add warp buttons for each scene
  Object.keys(gameData).forEach(sceneKey => {
    const btn = document.createElement("button");
    btn.innerText = sceneKey;
    btn.style.cssText = `
      display: block;
      width: 100%;
      margin-bottom: 4px;
      background: #333;
      color: #fff;
      border: none;
      padding: 6px;
      border-radius: 6px;
      cursor: pointer;
      text-align: left;
    `;
    btn.addEventListener("click", () => teleportTo(sceneKey));
    sceneList.appendChild(btn);
  });

  document.body.appendChild(devPanel);

  // ===============================
  // DRAG LOGIC
  // ===============================
  devHeader.addEventListener("mousedown", e => {
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

  window.addEventListener("mouseup", () => isDragging = false);
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
function teleportTo(sceneKey, page = 0) {
  if (!gameData[sceneKey]) return console.warn("Scene not found:", sceneKey);

  state.currentScene = sceneKey;
  state.currentPage = page;

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
// DEV ENDING CHECK
// ===============================
function getDevEnding() {
  const s = state.stats;
  let ending;
  if (s.courage >= s.charisma && s.courage >= s.curiosity && s.courage >= 3) ending = "Brave Ending";
  else if (s.charisma >= s.courage && s.charisma >= s.curiosity && s.charisma >= 3) ending = "Kind Ending";
  else if (s.curiosity >= s.courage && s.curiosity >= s.charisma && s.curiosity >= 3) ending = "Curious Ending";
  else ending = "Neutral Ending";

  alert(`Dev Ending: ${ending}\n\nStats:\nCourage: ${s.courage}\nCharisma: ${s.charisma}\nCuriosity: ${s.curiosity}\nRiddles Solved: ${s.riddlesSolved}`);
}

// ===============================
// KEYBIND SHORTCUTS
// ===============================
document.addEventListener("keydown", e => {
  if (e.key === "~") toggleDevPanel();
  if (e.key.toLowerCase() === "e" && devPanel?.style.display === "block") getDevEnding();
});

// ===============================
// EXPORT
// ===============================
export { createDevPanel, toggleDevPanel, teleportTo, updateStats, getDevEnding };
