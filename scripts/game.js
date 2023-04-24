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
    this.teamRocketEnemies = [];
    this.pokemons = []; // Add an array to hold Pokemon objects
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
    this.updateTeamRocketEnemies();
    this.updatePokemons();
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

  updatePokemons() {
      for (let i = 0; i < this.pokemons.length; i++) {
        this.pokemons[i].x -= 2; // Pokemons come from the right
        this.pokemons[i].draw();
  
        // Remove pokemons that leave the canvas
        if (this.pokemons[i].x < -this.pokemons[i].w) {
          this.pokemons.splice(i, 1);
          i--;
        }
      }
  
      // Add new pokemon every 200 frames
      if (this.frames % 200 === 0) {
        let x = this.width;
        let y = Math.floor(Math.random() * (this.height - 50));
        let pokemon = new Component(x, y, 50, 50, "green", this.ctx);
        this.pokemons.push(pokemon);
      }
    }
  
    updateTeamRocketEnemies() {
      for (let i = 0; i < this.teamRocketEnemies.length; i++) {
        this.teamRocketEnemies[i].x -= 3; // Enemies come from the right faster
        this.teamRocketEnemies[i].draw();
  
        // Remove enemies that leave the canvas
        if (this.teamRocketEnemies[i].x < -this.teamRocketEnemies[i].w) {
          this.teamRocketEnemies.splice(i, 1);
          i--;
        }
      }
  
      // Add new enemy every 400 frames
      if (this.frames % 400 === 0) {
        let x = this.width;
        let y = Math.floor(Math.random() * (this.height - 50));
        let enemy = new Component(x, y, 50, 50, "red", this.ctx);
        this.teamRocketEnemies.push(enemy);
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