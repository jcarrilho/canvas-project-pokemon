// JS Initialization
console.log("Game is loaded");

let backgroundMusic = new Audio("../docs/assets/audio/background.mp3");
backgroundMusic.loop = false;

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
    this.score = 1; // Add a property to track the player's score
    this.health = 3;
    this.crash = new Audio("../docs/assets/audio/collsion.mp3");
    this.crash.loop = false;
    this.catch = new Audio("../docs/assets/audio/catch-pokemon.mp3");
    this.catch.loop = false;
    this.throwingEnemy = new Audio("../docs/assets/audio/hit.mp3");
    this.throwingEnemy.loop = false;
    this.winning = new Audio("../docs/assets/audio/theme-song.mp3");
    this.winning.loop = false;
  }

  start() {
    this.intervalId = setInterval(this.update, 10);
    backgroundMusic.play();
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
   this.ctx.font = "33px myFirstFont";
    this.ctx.fillStyle = "white";

    // Width and height of the text
    const scoreText = `Pokedex: ${this.score}`;
    const scoreWidth = this.ctx.measureText(scoreText).width;
    const scoreHeight = 24;

    const healthText = `Health: ${this.health}`;
    const healthWidth = this.ctx.measureText(healthText).width;
    const healthHeight = 24; 

    // Background for the score
    this.ctx.fillStyle = "#FFCB05";
    this.ctx.fillRect(30, 25, scoreWidth + 28, scoreHeight + 20);

    // Draw the score text
    this.ctx.fillStyle = "black";
    this.ctx.fillText(scoreText, 40, 60);

    // Draw the background for the health
    this.ctx.fillStyle = "#02569B"; 
    this.ctx.fillRect(1470 - healthWidth - 35, 25, healthWidth + 28, healthHeight + 20);

    // Draw the health text
    this.ctx.fillStyle = "white";
    this.ctx.fillText(healthText, 1300, 60);
    this.checkGameOver();
  };
  // Stops The Game
  stop() {
    clearInterval(this.intervalId);
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
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

    img.src = "../docs/assets/images/pokemon-arena-1.png";
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

    // Add new pokemon every 150 frames
    if (this.frames % 150 === 0) {
      let x = this.width;
      let y = Math.floor(Math.random() * (this.height - 50));
      let pokemon = new Component(x, y, 80, 80, "pokemons", this.ctx);
      this.pokemons.push(pokemon);
    }
      // Check for collision with pokemons
    for (let i = 0; i < this.pokemons.length; i++) {
      if (this.player.crashWith(this.pokemons[i])) {
        this.crash.play();
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

    // Add new enemy every 250 frames
    if (this.frames % 250 === 0) {
      let x = this.width;
      let y = Math.floor(Math.random() * (this.height - 50));
      let enemy = new Component(x, y, 100, 100, "teamRocketEnemies", this.ctx);
      this.teamRocketEnemies.push(enemy);
    };
      // Check for collision with teamRocketEnemies
    for (let i = 0; i < this.teamRocketEnemies.length; i++) {
      if (this.player.crashWith(this.teamRocketEnemies[i])) {
        this.crash.play();
        this.health--;
        this.teamRocketEnemies.splice(i, 1);
      }
    }
  };

  throwBall() {
    let x = this.player.x + this.player.w; // Position the ball at the player's position
    let y = this.player.y + this.player.h / 2;

    this.balls.push(new Component(x, y, 20, 20, "ball", this.ctx));
  }

  updateBalls() {
    for (let i = 0; i < this.balls.length; i++) {
      this.balls[i].x += 4;
      this.balls[i].newPos();
      this.balls[i].draw();

      // Check for collision with pokemons
      for (let j = 0; j < this.pokemons.length; j++) {
        if (this.balls[i].crashWith(this.pokemons[j])) {
          this.catch.play();
          this.balls.splice(i, 1);
          this.pokemons.splice(j, 1);
       
          this.score += 5; // Increase the score for each caught pokemon

        }
      }

      // Check for collision with teamRocketEnemies

      for (let j = 0; j < this.teamRocketEnemies.length; j++) {
        if (this.balls[i].crashWith(this.teamRocketEnemies[j])) {
          this.throwingEnemy.play();
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
        this.ctx.font = "72px myFirstFont";
        this.ctx.fillText("Game Over", 600, this.height / 2);

        setTimeout(()=>{
          document.getElementById('game-end').style.display = 'block';
          document.getElementById('game-board').style.display = 'none';
        },1000)

        this.stop();
      } else if (this.score > 5) {
        this.winning.play();
        ctx.fillStyle = "blue";
        this.ctx.font = "72px myFirstFont";
        ctx.fillText("You completed the pokedex", 350, 350);

        setTimeout(()=>{
          document.getElementById('game-end').style.display = 'block';
          document.getElementById('game-board').style.display = 'none';
        },1000)

        this.stop();
      }  
  }

}
