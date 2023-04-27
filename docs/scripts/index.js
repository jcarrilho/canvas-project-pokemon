// JS Initialization
console.log("JS is loaded");
// Canvas Initialization
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
//Start Button
const startButton = document.getElementById("start");

//Create the Player
let player = new Component(0, 100, 80, 80, "player", ctx);
let game;
//Start Button on Click
window.onload = () => {
  document.getElementById("start").onclick = () => {
    startGame();
    document.getElementById("game-intro").style.display = "none";
    document.getElementById("game-board").style.display = "block";
  };

  document.getElementById("restart").onclick = () => {
    player = new Component(0, 100, 80, 80, "player", ctx);
    startGame();
    document.getElementById("game-end").style.display = "none";
    document.getElementById("game-board").style.display = "block";
  };

  function startGame() {
    game = new Game(ctx, canvas.width, canvas.height, player);
    game.start();
  }
};

let myFirstFont = new FontFace(
  "myFirstFont",
  "url(docs/styles/font/PokemonHollow.ttf)"
);
myFirstFont.load().then(function (font) {
  document.fonts.add(font);
});

let mySecondFont = new FontFace(
  "mySecondFont",
  "url(docs/styles/font/PokemonSolid.ttf)"
);
mySecondFont.load().then(function (font) {
  document.fonts.add(font);
});

// Move the Player
document.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowUp":
      player.speedY -= 1;
      break;
    case "ArrowDown":
      player.speedY += 1;
      break;
    case "ArrowLeft":
      player.speedX -= 1;
      break;
    case "ArrowRight":
      player.speedX += 1;
      break;
    case "KeyB":
      game.throwBall();
      break;
  }
});

// Stop Speed
document.addEventListener("keyup", () => {
  player.speedX = 0;
  player.friction = 0;
  player.speedY = 0;
});
