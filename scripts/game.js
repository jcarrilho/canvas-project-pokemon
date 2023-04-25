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
    this.balls = []; // Add an array to hold ball objects thrown by the player
    this.score = 0; // Add a property to track the player's score
    this.health = 2;
  }

  start() {
    this.intervalId = setInterval(this.update, 10);
  }

  update = () => {
    this.frames++;
    this.clear();
    this.createBackground();
    this.player.newPos();
    this.player.draw();
    this.updateTeamRocketEnemies();
    this.updatePokemons();
    this.updateBalls();
    this.ctx.fillStyle = "black";
    this.ctx.font = "24px Arial";
    this.ctx.fillText(`Score: ${this.score}`, 20, 40); // Display the score
    this.ctx.fillText(`Health: ${this.health}`, 1080, 40); // Display the health
    this.checkGameOver();
  };
  // Stops The Game
  stop() {
    clearInterval(this.intervalId);
  };
  // Clears Canvas
  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    ctx.fillText(`Score ${this.score}`, 80, 30)
  };

  createBackground() {
    const img = new Image();
    img.addEventListener("load", () => {
      this.img = img;
    });

    img.src = "../images/background.jpeg";
    this.ctx.drawImage(img, 0, 0, this.width, this.height);
  };

  updatePokemons() {
    for (let i = 0; i < this.pokemons.length; i++) {
      this.pokemons[i].x -= 2; // Pokemons come from the right
      this.pokemons[i].draw();

      // Remove pokemons that leave the canvas
      if (this.pokemons[i].x < -this.pokemons[i].w) {
        this.pokemons.splice(i, 1);
      };
    }

    // Add new pokemon every 200 frames
    if (this.frames % 200 === 0) {
      let x = this.width;
      let y = Math.floor(Math.random() * (this.height - 50));
      let pokemon = new Component(x, y, 20, 20, "pokemons", this.ctx);
      this.pokemons.push(pokemon);
    }
      // Check for collision with pokemons
    for (let i = 0; i < this.pokemons.length; i++) {
      if (this.player.crashWith(this.pokemons[i])) {
        this.health--;
        this.pokemons.splice(i, 1);
      }
    }
  }

  updateTeamRocketEnemies() {
    for (let i = 0; i < this.teamRocketEnemies.length; i++) {
      this.teamRocketEnemies[i].x -= 3; // Enemies come from the right faster
      this.teamRocketEnemies[i].draw();

      // Remove enemies that leave the canvas
      if (this.teamRocketEnemies[i].x < -this.teamRocketEnemies[i].w) {
        this.teamRocketEnemies.splice(i, 1);
      };
    }

    // Add new enemy every 300 frames
    if (this.frames % 300 === 0) {
      let x = this.width;
      let y = Math.floor(Math.random() * (this.height - 50));
      let enemy = new Component(x, y, 40, 40, "teamRocketEnemies", this.ctx);
      this.teamRocketEnemies.push(enemy);
    };
      // Check for collision with teamRocketEnemies
    for (let i = 0; i < this.teamRocketEnemies.length; i++) {
      if (this.player.crashWith(this.teamRocketEnemies[i])) {
        this.health--;
        this.teamRocketEnemies.splice(i, 1);
      }
    }
  };

  throwBall() {
    let x = this.player.x + this.player.w; // Position the ball at the player's position
    let y = this.player.y + this.player.h / 2;

    this.balls.push(new Component(x, y, 10, 10, "ball", this.ctx));
  }

  updateBalls() {
    for (let i = 0; i < this.balls.length; i++) {
      this.balls[i].x += 1;
      this.balls[i].newPos();
      this.balls[i].draw();

      // Check for collision with pokemons
      for (let j = 0; j < this.pokemons.length; j++) {
        if (this.balls[i].crashWith(this.pokemons[j])) {
          this.balls.splice(i, 1);
          this.pokemons.splice(j, 1);
       
          this.score += 10; // Increase the score for each caught pokemon

        }
      }

      // Check for collision with teamRocketEnemies

      for (let j = 0; j < this.teamRocketEnemies.length; j++) {
        if (this.balls[i].crashWith(this.teamRocketEnemies[j])) {
          this.balls.splice(i, 1);
          this.teamRocketEnemies.splice(j, 1);

          this.health -=1;
     
        };
      };

      // Remove balls that leave the canvas
      if (this.balls[i].x > this.width) {
        this.balls.splice(i, 1);
      
      };
    };
  }
  
    checkGameOver() {
      if (this.health === 0) {
        ctx.fillStyle = "red";
        this.ctx.font = "72px Arial";
        this.ctx.fillText("Game Over", 420, this.height / 2);
        this.stop();
      } else if (this.score === 20) {
        ctx.fillStyle = "blue";
        this.ctx.font = "72px Arial";
        ctx.fillText("You completed the pokedex", 135, 350);
        this.stop();
      }  
  }
}


    
    
