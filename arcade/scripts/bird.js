// ===============================
// MAGICAL CAT FLIGHT ✨🐱
// Sunnie Jae Arcade
// ===============================

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("highScore");

const screenEl = document.querySelector(".screen");
const btnA = document.querySelector(".btn.a");

// -------------------------------
// GAME STATE
// -------------------------------
let gameState = "start"; // start | playing | gameover
let frame = 0;
let obstacles = [];
let score = 0;

const HIGH_SCORE_KEY = "sunnieJaeFlappyHighScore";
let highScore = Number(localStorage.getItem(HIGH_SCORE_KEY)) || 0;
highScoreEl.textContent = highScore;

// -------------------------------
// PLAYER (CAT)
// -------------------------------
class Player {
  constructor() {
    this.x = 60;
    this.y = canvas.height / 2;
    this.radius = 8;
    this.vel = 0;
    this.gravity = 0.25;
    this.flapPower = -4;
  }

  flap() {
    this.vel = this.flapPower;
  }

  update() {
    this.vel += this.gravity;
    this.y += this.vel;

    if (this.y > canvas.height - this.radius) {
      this.y = canvas.height - this.radius;
      endGame();
    }

    if (this.y < this.radius) {
      this.y = this.radius;
      this.vel = 0;
    }
  }

  draw() {
    drawCat(this.x, this.y);
  }
}

let player = new Player();

// -------------------------------
// OBSTACLES
// -------------------------------
class Obstacle {
  constructor() {
    this.width = 22;
    this.gap = 80;
    this.x = canvas.width;
    this.top = Math.random() * 90 + 20;
    this.speed = 1.5;
  }

  update() {
    this.x -= this.speed;
  }

  draw() {
    ctx.fillStyle = "#c13886";
    ctx.fillRect(this.x, 0, this.width, this.top);
    ctx.fillRect(
      this.x,
      this.top + this.gap,
      this.width,
      canvas.height
    );
  }

  hits(p) {
    return (
      p.x + p.radius > this.x &&
      p.x - p.radius < this.x + this.width &&
      (p.y - p.radius < this.top ||
        p.y + p.radius > this.top + this.gap)
    );
  }
}

// -------------------------------
// CAT SILHOUETTE 🐈‍⬛
// -------------------------------
function drawCat(x, y) {
  ctx.fillStyle = "var(--teal)";
  ctx.beginPath();

  // Body
  ctx.ellipse(x, y + 2, 6, 5, 0, 0, Math.PI * 2);

  // Head
  ctx.moveTo(x + 6, y - 2);
  ctx.ellipse(x + 6, y - 4, 4, 4, 0, 0, Math.PI * 2);

  // Ears
  ctx.moveTo(x + 3, y - 10);
  ctx.lineTo(x + 5, y - 6);
  ctx.lineTo(x + 1, y - 6);

  ctx.moveTo(x + 9, y - 10);
  ctx.lineTo(x + 11, y - 6);
  ctx.lineTo(x + 7, y - 6);

  // Tail
  ctx.moveTo(x - 6, y + 2);
  ctx.quadraticCurveTo(x - 12, y - 2, x - 10, y - 8);

  ctx.fill();
}

// -------------------------------
// SCREENS
// -------------------------------
function drawStartScreen() {
  ctx.fillStyle = "#000010";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#ffb3d6";
  ctx.font = "16px monospace";
  ctx.fillText("FLAPPY", 60, 90);
  ctx.fillText("CAT", 85, 110);

  ctx.font = "10px monospace";
  ctx.fillStyle = "#ffffff";
  ctx.fillText("Tap screen or press A", 50, 145);
  ctx.fillText("to flap ✨", 95, 160);

  ctx.fillStyle = "#00c9c2";
  ctx.fillText(`BEST ${highScore}`, 95, 185);
}

function drawGameOver() {
  ctx.fillStyle = "rgba(0,0,16,0.75)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#ffb3d6";
  ctx.font = "16px monospace";
  ctx.fillText("GAME OVER", 70, 120);

  ctx.font = "10px monospace";
  ctx.fillText("tap / press A", 85, 145);
  ctx.fillText("to retry", 105, 160);
}

// -------------------------------
// GAME LOOP
// -------------------------------
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (gameState === "start") {
    drawStartScreen();
    requestAnimationFrame(update);
    return;
  }

if (gameState === "gameover") {
  drawGameOver();
  requestAnimationFrame(update);
  return;
}
  frame++;

  if (frame % 90 === 0) {
    obstacles.push(new Obstacle());
    score++;
    scoreEl.textContent = score;
  }

  obstacles.forEach((obs) => {
    obs.update();
    obs.draw();
    if (obs.hits(player)) endGame();
  });

  obstacles = obstacles.filter(o => o.x + o.width > 0);

  player.update();
  player.draw();

  requestAnimationFrame(update);
}

// -------------------------------
// GAME FLOW
// -------------------------------
function flap() {
  if (gameState === "start") {
    gameState = "playing";
  }

  if (gameState === "gameover") {
    restart();
    return;
  }

  player.flap();
}

function endGame() {
  gameState = "gameover";

  if (score > highScore) {
    highScore = score;
    localStorage.setItem(HIGH_SCORE_KEY, highScore);
    highScoreEl.textContent = highScore;
  }
}

function restart() {
  player = new Player();
  obstacles = [];
  frame = 0;
  score = 0;
  scoreEl.textContent = 0;
  gameState = "playing";
}

// -------------------------------
// INPUTS (MATCH YOUR HTML)
// -------------------------------
screenEl.addEventListener("pointerdown", flap);
btnA.addEventListener("pointerdown", flap);

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyA") {
    flap();
  }
});

// -------------------------------
// START
// -------------------------------
update();
