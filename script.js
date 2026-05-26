const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const gameOverScreen = document.getElementById("game-over-screen");
const gameBoard = document.getElementById("game-board");

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");

const levelNumberText = document.getElementById("level-number");
const scoreText = document.getElementById("score");
const highScoreText = document.getElementById("high-score");
const endTitle = document.getElementById("end-title");
const endMessage = document.getElementById("end-message");

const tileSize = 40;

let currentLevel = 1;
let score = 0;
let highScore = Number(localStorage.getItem("whereTheBoticaHighScore")) || 0;

let player = {
  x: 0,
  y: 0,
  width: 40,
  height: 40,
  element: null
};

let walls = [];
let batberries = [];
let electricTiles = [];
let teleporter = null;
let gate = null;

let electricActive = true;

highScoreText.textContent = highScore;

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", restartGame);

document.addEventListener("keydown", function (event) {
  movePlayerOneTile(event.key.toLowerCase());
});

function startGame() {
  startScreen.classList.add("hidden");
  gameOverScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");

  currentLevel = 1;
  score = 0;
  loadLevel1();
  gameLoop();
}

function restartGame() {
  startGame();
}

function clearBoard() {
  gameBoard.innerHTML = "";
  walls = [];
  batberries = [];
  electricTiles = [];
  teleporter = null;
  gate = null;
}

function createElement(className, x, y, width = 40, height = 40) {
  const element = document.createElement("div");
  element.className = `entity ${className}`;
  element.style.left = x + "px";
  element.style.top = y + "px";
  element.style.width = width + "px";
  element.style.height = height + "px";
  gameBoard.appendChild(element);

  return {
    x,
    y,
    width,
    height,
    element
  };
}

function createPlayer(x, y) {
  player = createElement("player", x, y,40,40);
  player.hitboxOffsetX = 8;
  player.hitboxOffsetY = 24;
  player.hitboxWidth = 28;
  player.hitboxHeight = 22;
}

function createWall(x, y) {
  const wall = createElement("wall", x, y);
  wall.hitboxOffsetY = 8;
  wall.hitboxHeight = 32;

  walls.push(wall);
}

function createBatberry(x, y) {
  const batberry = createElement("batberry", x, y);
  batberries.push(batberry);
}

function loadLevel1() {
  clearBoard();

  currentLevel = 1;
  levelNumberText.textContent = currentLevel;
  scoreText.textContent = score;

  gameBoard.style.background = "#d1d5db";

  createPlayer(0, 510);

  for (let i = 2; i <= 6; i++) createWall(i * tileSize, 440 - 8);
  for (let i = 3; i <= 7; i++) createWall(280, i * tileSize - 8);
  for (let i = 7; i <= 10; i++) createWall(i * tileSize, 160 - 8);
  for (let i = 4; i <= 9; i++) createWall(440, i * tileSize - 8);

  createBatberry(400, 400);
  createBatberry(360, 280);
  createBatberry(520, 120);

  teleporter = createElement("teleporter", 680, 80);
}

function loadLevel2() {
  clearBoard();

  currentLevel = 2;
  levelNumberText.textContent = currentLevel;

  gameBoard.style.background = "#312e81";

  createPlayer(320, 440);

  for (let i = 0; i < 20; i++) {
    createWall(i * tileSize, 0);
    createWall(i * tileSize, 520);
  }

  for (let i = 1; i < 13; i++) {
    createWall(0, i * tileSize);
    createWall(760, i * tileSize);
  }

  createWall(240, 160);
  createWall(280, 160);
  createWall(320, 160);
  createWall(480, 280);
  createWall(520, 280);

  createBatberry(120, 120);
  createBatberry(600, 120);
  createBatberry(160, 360);
  createBatberry(560, 400);
  createBatberry(680, 280);

  electricTiles.push(createElement("electric", 200, 400));
  electricTiles.push(createElement("electric", 400, 440));
  electricTiles.push(createElement("electric", 560, 200));

  gate = createElement("gate", 680, 440);
}

function gameLoop() {
  // movePlayer();
  // checkWallCollision();
  // checkBatberries();
  // checkLevelExit();
  // checkElectricTiles();

  requestAnimationFrame(gameLoop);
}

// function movePlayer() {
//   let speed = 3;
//   let oldX = player.x;
//   let oldY = player.y;

//   if (keys["arrowup"] || keys["w"]) player.y -= speed;
//   if (keys["arrowdown"] || keys["s"]) player.y += speed;
//   if (keys["arrowleft"] || keys["a"]) player.x -= speed;
//   if (keys["arrowright"] || keys["d"]) player.x += speed;

//   if (player.x < 0) player.x = 0;
//   if (player.y < 0) player.y = 0;
//   if (player.x + player.width > 800) player.x = 800 - player.width;
//   if (player.y + player.height > 550) player.y = 550 - player.height;

//   player.oldX = oldX;
//   player.oldY = oldY;

//   updatePosition(player);
// }
function movePlayerOneTile(key) {
  let oldX = player.x;
  let oldY = player.y;

  if (key === "arrowup" || key === "w") {
    player.y -= 40;
  } else if (key === "arrowdown" || key === "s") {
    player.y += 40;
  } else if (key === "arrowleft" || key === "a") {
    player.x -= 40;
  } else if (key === "arrowright" || key === "d") {
    player.x += 40;
  } else {
    return;
  }

  player.oldX = oldX;
  player.oldY = oldY;

  if (player.x < 0) player.x = 0;
  if (player.y < 0) player.y = 0;
  if (player.x + player.width > 800) player.x = 800 - player.width;
  if (player.y + player.height > 550) player.y = 550 - player.height;

  updatePosition(player);

  checkWallCollision();
  checkBatberries();
  checkLevelExit();
  checkElectricTiles();
}

function updatePosition(entity) {
  entity.element.style.left = entity.x + "px";
  entity.element.style.top = entity.y + "px";
}
function getHitbox(entity) {
  return {
    x: entity.x + (entity.hitboxOffsetX || 0),
    y: entity.y + (entity.hitboxOffsetY || 0),
    width: entity.hitboxWidth || entity.width,
    height: entity.hitboxHeight || entity.height
  };
}
function collides(a, b) {
  const boxA = getHitbox(a);
  const boxB = getHitbox(b);

  return (
    boxA.x < boxB.x + boxB.width &&
    boxA.x + boxA.width > boxB.x &&
    boxA.y < boxB.y + boxB.height &&
    boxA.y + boxA.height > boxB.y
  );
}

function checkWallCollision() {
  for (let wall of walls) {
    if (collides(player, wall)) {
      player.x = player.oldX;
      player.y = player.oldY;
      updatePosition(player);
    }
  }
}

function checkBatberries() {
  for (let i = batberries.length - 1; i >= 0; i--) {
    if (collides(player, batberries[i])) {
      batberries[i].element.remove();
      batberries.splice(i, 1);
      score++;
      scoreText.textContent = score;
    }
  }
}

function checkLevelExit() {
  if (currentLevel === 1 && batberries.length === 0 && collides(player, teleporter)) {
    loadLevel2();
  }

  if (currentLevel === 2 && batberries.length === 0 && collides(player, gate)) {
    winGame();
  }
}

function checkElectricTiles() {
  if (currentLevel !== 2) return;

  for (let tile of electricTiles) {
    if (collides(player, tile)) {
      player.x = 320;
      player.y = 440;
      updatePosition(player);
    }
  }
}

function winGame() {
  gameScreen.classList.add("hidden");
  gameOverScreen.classList.remove("hidden");

  endTitle.textContent = "You Win!";
  endMessage.textContent = `You collected ${score} Batberries.`;

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("whereTheBoticaHighScore", highScore);
  }

  highScoreText.textContent = highScore;
}