// JS Initialization
console.log("JS is loaded");

// Canvas Initialization
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//Start Button
const startButton = document.getElementById("start");

//Create the Player
const player = new Component(0, 100, 25, 25, "black", ctx);
let game;
//Start Button on Click
startButton.onclick = function () {
  console.log("starting");
  game = new Game(ctx, canvas.width, canvas.height, player);
  game.start();
};

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

/*
addEventListener("keydown", (e) => {
  switch (e.code) {
    case "Space":
      this.balls += 1;
      break;
  }
  console.log("throw");
});
  */
/* document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {

    }
  }); */

// Stop Speed
document.addEventListener("keyup", () => {
  player.speedX = 0;
  player.speedY = 0;
});
