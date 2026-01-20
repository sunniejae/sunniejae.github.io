const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const SIZE = 16;
const TILES = canvas.width / SIZE;

const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("highScore");

let snake, dir, food, score;

// Load high score from localStorage
let highScore = localStorage.getItem("magicalSnakeHighScore");
highScore = highScore ? parseInt(highScore) : 0;
highScoreEl.textContent = highScore;

/* ---------- RESET ---------- */
function reset() {
  snake = [{ x: 8, y: 8 }];
  dir = { x: 1, y: 0 };
  food = spawn();
  score = 0;
  scoreEl.textContent = score;
}

/* ---------- FOOD ---------- */
function spawn() {
  return {
    x: Math.floor(Math.random() * TILES),
    y: Math.floor(Math.random() * TILES)
  };
}

/* ---------- UPDATE ---------- */
function update() {
  const head = {
    x: snake[0].x + dir.x,
    y: snake[0].y + dir.y
  };

  // Collision = reset
  if (
    head.x < 0 || head.y < 0 ||
    head.x >= TILES || head.y >= TILES ||
    snake.some(s => s.x === head.x && s.y === head.y)
  ) {
    reset();
    return;
  }

  snake.unshift(head);

  // Eat food
  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreEl.textContent = score;

    // Update high score ✨
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("magicalSnakeHighScore", highScore);
      highScoreEl.textContent = highScore;
    }

    food = spawn();
  } else {
    snake.pop();
  }

  draw();
}

/* ---------- DRAW ---------- */
function draw() {
  ctx.fillStyle = "#0a0a0a";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Star food ✨
  ctx.fillStyle = "#00c9c2";
  ctx.beginPath();
  ctx.arc(
    food.x * SIZE + SIZE / 2,
    food.y * SIZE + SIZE / 2,
    SIZE / 2.5,
    0,
    Math.PI * 2
  );
  ctx.fill();

  // Snake
  snake.forEach((s, i) => {
    ctx.fillStyle = i === 0 ? "#f0f0f5" : "#ffb3d6";
    ctx.fillRect(s.x * SIZE, s.y * SIZE, SIZE, SIZE);
  });
}

/* ---------- INPUT ---------- */
document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp" && dir.y !== 1) dir = { x: 0, y: -1 };
  if (e.key === "ArrowDown" && dir.y !== -1) dir = { x: 0, y: 1 };
  if (e.key === "ArrowLeft" && dir.x !== 1) dir = { x: -1, y: 0 };
  if (e.key === "ArrowRight" && dir.x !== -1) dir = { x: 1, y: 0 };
});

document.querySelectorAll("[data-dir]").forEach(btn => {
  btn.addEventListener("click", () => {
    const d = btn.dataset.dir;
    if (d === "up" && dir.y !== 1) dir = { x: 0, y: -1 };
    if (d === "down" && dir.y !== -1) dir = { x: 0, y: 1 };
    if (d === "left" && dir.x !== 1) dir = { x: -1, y: 0 };
    if (d === "right" && dir.x !== -1) dir = { x: 1, y: 0 };
  });
});

/* ---------- START ---------- */
reset();
setInterval(update, 160);
