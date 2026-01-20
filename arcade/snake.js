// -----------------------------
// SNAKE GAME (GameBoy Style)
// -----------------------------

// KEY CODES
const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const KEY_A = 65; // A key for start

// GRID SIZE
const COLS = 20;
const ROWS = 20;

let canvas, ctx;
let frames = 0;
let score = 0;
let highScore = 0;
let isDead = true;

let snake = [];
let dir = "UP";
let food = null;

// GAME COLORS
const GRADIENT_START = "#9a9ad4";
const GRADIENT_END = "#c13886";
const APPLE_COLOR = "#000000";

const CELL = 20;

// KEYS
const keystate = {};

// -----------------------------
// UTILS
// -----------------------------
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function reset() {
  score = 0;
  frames = 0;
  isDead = false;
  dir = "UP";
  snake = [{ x: Math.floor(COLS / 2), y: ROWS - 1 }];
  placeFood();
}

function placeFood() {
  let x, y;
  do {
    x = randomInt(0, COLS - 1);
    y = randomInt(0, ROWS - 1);
  } while (snake.some(p => p.x === x && p.y === y));
  food = { x, y, eaten: false };
}

function loadHighScore() {
  highScore = parseInt(localStorage.getItem("snakeHighScore") || "0", 10);
}

function saveHighScore() {
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("snakeHighScore", highScore);
  }
}

// -----------------------------
// DRAW
// -----------------------------
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // background
  ctx.fillStyle = "#0a0a0a";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // snake gradient
  const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  grad.addColorStop(0, GRADIENT_START);
  grad.addColorStop(1, GRADIENT_END);

  // draw snake
  snake.forEach((p, i) => {
    ctx.fillStyle = grad;
    ctx.fillRect(p.x * CELL, p.y * CELL, CELL, CELL);
  });

  // draw apple
  ctx.fillStyle = APPLE_COLOR;
  ctx.fillRect(food.x * CELL, food.y * CELL, CELL, CELL);

  // score
  ctx.font = "18px Starbim";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(`SCORE: ${score}`, 10, 22);
  ctx.fillText(`HIGH: ${highScore}`, 10, 44);
}

// -----------------------------
// UPDATE
// -----------------------------
function update() {
  if (isDead) return;

  frames++;

  if (frames % 7 !== 0) return;

  const head = { ...snake[0] };

  if (keystate[KEY_UP] && dir !== "DOWN") dir = "UP";
  if (keystate[KEY_DOWN] && dir !== "UP") dir = "DOWN";
  if (keystate[KEY_LEFT] && dir !== "RIGHT") dir = "LEFT";
  if (keystate[KEY_RIGHT] && dir !== "LEFT") dir = "RIGHT";

  if (dir === "UP") head.y--;
  if (dir === "DOWN") head.y++;
  if (dir === "LEFT") head.x--;
  if (dir === "RIGHT") head.x++;

  // check walls
  if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) {
    die();
    return;
  }

  // check self
  if (snake.some(p => p.x === head.x && p.y === head.y)) {
    die();
    return;
  }

  snake.unshift(head);

  // eat food
  if (head.x === food.x && head.y === food.y) {
    score++;
    placeFood();
  } else {
    snake.pop();
  }
}

function die() {
  isDead = true;
  saveHighScore();
  startDeathAnimation();
}

// -----------------------------
// DEATH ANIMATION
// -----------------------------
function startDeathAnimation() {
  const overlay = document.getElementById("startOverlay");
  overlay.innerText = "YOU DIED\nPRESS A TO RESTART";
  overlay.style.display = "flex";
  overlay.classList.add("shake");
}

// -----------------------------
// MAIN LOOP
// -----------------------------
function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

// -----------------------------
// INPUT
// -----------------------------
function setupInput() {
  document.addEventListener("keydown", (e) => {
    keystate[e.keyCode] = true;

    if (e.keyCode === KEY_A && isDead) {
      document.getElementById("startOverlay").style.display = "none";
      reset();
    }
  });

  document.addEventListener("keyup", (e) => {
    delete keystate[e.keyCode];
  });
}

// -----------------------------
// INIT
// -----------------------------
function init() {
  canvas = document.getElementById("snakeCanvas");
  ctx = canvas.getContext("2d");

  // canvas pixel size
  canvas.width = COLS * CELL;
  canvas.height = ROWS * CELL;

  loadHighScore();
  setupInput();

  // show start screen
  document.getElementById("startOverlay").style.display = "flex";
  document.getElementById("startOverlay").classList.remove("shake");

  loop();
}

window.onload = init;
