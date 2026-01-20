// home.js - Automatic Menu System
// Just drop this in and it creates a menu on the canvas!

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('highScore');

// Menu state
let selectedIndex = 0;
let animFrame = 0;

// Menu items with links
const menuItems = [
{ label: 'DESKTOP', icon: '🏠', link: '/index.html' },
  { label: 'FLAPPY CAT', icon: '🐱', link: 'flappycat.html' },
  { label: 'SNAKIE JAE', icon: '🐍', link: 'snake.html' },
  { label: 'LUIS G MANSION', icon: '👻', link: '/luisg/enter.html' }
];

// Colors matching your theme
const colors = {
  bg: '#0a0a0a',
  pink: '#ffb3d6',
  pinkDark: '#c13886',
  lavender: '#9a9ad4',
  purple: '#3f3d7a',
  teal: '#00c9c2',
  white: '#ffffff'
};

// Initialize
function init() {
  // Update score display to show menu info
  scoreDisplay.textContent = 'MENU';
  highScoreDisplay.textContent = 'SELECT';
  
  // Start animation loop
  animate();
  
  // Set up controls
  setupControls();
}

// Draw menu
function drawMenu() {
  // Clear canvas
  ctx.fillStyle = colors.bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw twinkling stars
  drawStars();
  
  // Draw title
  ctx.font = 'bold 24px monospace';
  ctx.textAlign = 'center';
  
  // Pulsing title effect
  const titleAlpha = 0.7 + Math.sin(animFrame * 0.05) * 0.3;
  ctx.globalAlpha = titleAlpha;
  ctx.fillStyle = colors.pink;
  ctx.fillText('★ GAMES ★', canvas.width / 2, 40);
  ctx.globalAlpha = 1;
  
  // Draw subtitle
  ctx.font = '10px monospace';
  ctx.fillStyle = colors.lavender;
  ctx.fillText('USE D-PAD TO SELECT', canvas.width / 2, 55);
  
  // Draw menu items
  const startY = 80;
  const itemHeight = 35;
  
  menuItems.forEach((item, index) => {
    const y = startY + (index * itemHeight);
    const isSelected = index === selectedIndex;
    
    // Draw selection box
    if (isSelected) {
      // Animated selection with glow
      const glowSize = 2 + Math.sin(animFrame * 0.1) * 1;
      ctx.shadowBlur = glowSize * 5;
      ctx.shadowColor = colors.pink;
      ctx.fillStyle = colors.pinkDark;
      roundRect(ctx, 20, y - 12, canvas.width - 40, 28, 8);
      ctx.shadowBlur = 0;
    } else {
      ctx.fillStyle = colors.purple;
      roundRect(ctx, 20, y - 12, canvas.width - 40, 28, 8);
    }
    
    // Draw icon
    ctx.font = '16px monospace';
    ctx.textAlign = 'left';
    ctx.fillStyle = isSelected ? colors.white : colors.lavender;
    ctx.fillText(item.icon, 35, y + 5);
    
    // Draw label
    ctx.font = 'bold 12px monospace';
    ctx.fillText(item.label, 60, y + 5);
    
    // Draw arrow for selected item
    if (isSelected && Math.floor(animFrame / 20) % 2 === 0) {
      ctx.textAlign = 'right';
      ctx.fillText('◄', canvas.width - 35, y + 5);
    }
  });
  
  // Draw instructions at bottom
  ctx.font = '9px monospace';
  ctx.textAlign = 'center';
  ctx.fillStyle = colors.lavender;
  ctx.fillText('PRESS A TO START', canvas.width / 2, canvas.height - 15);
}

// Draw twinkling background stars
function drawStars() {
  const stars = [
    { x: 30, y: 20 }, { x: 80, y: 15 }, { x: 200, y: 25 },
    { x: 50, y: 100 }, { x: 150, y: 110 }, { x: 220, y: 95 },
    { x: 40, y: 180 }, { x: 120, y: 200 }, { x: 190, y: 175 },
    { x: 70, y: 230 }, { x: 180, y: 240 }
  ];
  
  stars.forEach((star, i) => {
    const twinkle = 0.2 + Math.sin((animFrame + i * 20) * 0.08) * 0.3;
    ctx.globalAlpha = twinkle;
    ctx.fillStyle = i % 2 === 0 ? colors.white : colors.pink;
    ctx.fillRect(star.x, star.y, 3, 3);
  });
  
  ctx.globalAlpha = 1;
}

// Helper function for rounded rectangles
function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  ctx.fill();
}

// Animation loop
function animate() {
  animFrame++;
  drawMenu();
  requestAnimationFrame(animate);
}

// Navigation
function navigateUp() {
  selectedIndex = selectedIndex > 0 ? selectedIndex - 1 : menuItems.length - 1;
}

function navigateDown() {
  selectedIndex = selectedIndex < menuItems.length - 1 ? selectedIndex + 1 : 0;
}

function selectItem() {
  const selected = menuItems[selectedIndex];
  console.log('Selected:', selected.label);
  
  // Navigate to the game
  if (selected.link) {
    window.location.href = selected.link;
  }
}

// Setup controls
function setupControls() {
  // D-pad buttons
  const dpadButtons = document.querySelectorAll('.dpad button');
  dpadButtons.forEach(button => {
    button.addEventListener('click', () => {
      const dir = button.dataset.dir;
      if (dir === 'up') navigateUp();
      if (dir === 'down') navigateDown();
    });
  });
  
  // A/B buttons
  const btnA = document.querySelector('.btn.a');
  const btnB = document.querySelector('.btn.b');
  
  if (btnA) {
    btnA.addEventListener('click', selectItem);
  }
  
  if (btnB) {
    btnB.addEventListener('click', selectItem);
  }
  
  // Keyboard controls
  document.addEventListener('keydown', (e) => {
    switch(e.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        e.preventDefault();
        navigateUp();
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        e.preventDefault();
        navigateDown();
        break;
      case 'Enter':
      case ' ':
      case 'a':
      case 'A':
        e.preventDefault();
        selectItem();
        break;
    }
  });
  
  // Click on canvas to select
  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    
    // Check which menu item was clicked
    const startY = 80;
    const itemHeight = 35;
    
    menuItems.forEach((item, index) => {
      const itemY = startY + (index * itemHeight);
      if (y >= itemY - 12 && y <= itemY + 16) {
        selectedIndex = index;
        selectItem();
      }
    });
  });
}

// Start the menu
init();