// JS Initialization
console.log("Game is loaded");

class Game {
  constructor(ctx, width, height, player) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.player = player;
    this.intervalId = null;
    this.frames = 0;
    this.enemies = [];
    // this.pokemons = []; // Add an array to hold Pokemon objects
    //this.balls = []; // Add an array to hold ball objects thrown by the player
    //this.score = 0; // Add a property to track the player's score
  }

  start() {
    this.intervalId = setInterval(this.update, 10);
  }

  update = () => {
    this.frames++;
    // Updating Score
    // this.score += 1;
    this.clear();
    this.player.newPos();
    this.player.draw();
    this.updateEnemies();
    this.checkGameOver();
  };
  // Stops The Game
  stop() {
    clearInterval(this.intervalId);
  }
  // Clears Canvas
  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    //ctx.fillText(`Score ${this.score}`, 80, 30)
  }

  // Updates Enemies
  updateEnemies() {
    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].x -= 1; // Enemy goes More to The Right
      this.enemies[i].draw(); // Continue to Draw Enemy
    }

    if (this.frames % 200 === 0) {
      let x = 1200;
      let minHeight = 5; // at least 20px of min Height
      let maxHeight = 50; // max height of 400px

      let height = Math.floor(
        Math.random() * (maxHeight - minHeight + 1) + minHeight
      );

      let minGap = 95;
      let maxGap = 200;

      let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);

      // Top Obstacle
      this.enemies.push(new Component(x, 0, 50, height, "red", this.ctx));

      // Bottom Obstacle
      this.enemies.push(
        new Component(x, height + gap, 50, x - height - gap, "green", this.ctx)
      );
    }
  }

  checkGameOver() {
    const crashed = this.enemies.some((enemy) => {
      return this.player.crashWith(enemy);
    });

    if (crashed) {
      this.stop();
      ctx.fillStyle = "red";
      this.ctx.font = "72px Arial";
      this.ctx.fillText("Game Over", 0, this.height / 2);
      //ctx.fillText('Your final score', 135, 350);
      //this.ctx.fillText(`${this.score}`, 230, 400);
    }
  }
}
