// JS Initialization
console.log("Component is loaded");
class Component {
  constructor(x, y, w, h, character, ctx) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.character = character;
    this.ctx = ctx;
    this.speedX = 0;
    this.speedY = 0;
    this.acceleration = 1.9; // adjust as necessary
    this.friction = 0.1; // adjust as necessary
    this.characterIndex = null;

    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        player.speedX = -player.acceleration;
      } else if (event.key === "ArrowRight") {
        player.speedX = player.acceleration;
      } else if (event.key === "ArrowUp") {
        player.speedY = -player.acceleration;
      } else if (event.key === "ArrowDown") {
        player.speedY = player.acceleration;
      }
    });
    document.addEventListener("keyup", (event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        player.speedX = player.speedX > 0 ? player.speedX - player.friction : player.speedX + player.friction;
      } else if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        player.speedY = player.speedY > 0 ? player.speedY - player.friction : player.speedY + player.friction;
      }
    });
  }

  
  draw() {
    const img = new Image();
    img.addEventListener("click", () => {
      this.img = img;
    });
    if (this.character === "player") {
      img.src = "../docs/assets/images/ash-pixel.png";
    } else if (this.character === "pokemons") {
      if (this.characterIndex === null) {
        this.characterIndex = Math.floor(Math.random() * 150);
      }
      img.src = `../docs/assets/images/pokemons/${this.characterIndex}.png`;
    } else if (this.character === "teamRocketEnemies") {
      img.src = "../docs/assets/images/giovanni-crop.png";
    } else if (this.character === "ball") {
      img.src = "../docs/assets/images/pokeball-crop.png";
    }

    this.ctx.drawImage(img, this.x, this.y, this.w, this.h);
  }

  newPos() {
    if (player.x < 0) {
      player.x = 1;
      player.speedX = 0;
    } else if (player.x + player.w > canvas.width) {
      player.x = canvas.width - player.w;
      player.speedX = 0;
    }
    if (player.y < 0) {
      player.y = 1;
      player.speedY = 0;
    } else if (player.y + player.h > canvas.height) {
      player.y = canvas.height - player.h;
      player.speedY = 0;
    }
    this.x += this.speedX;
    this.y += this.speedY;
  }

  top() {
    return this.y;
  }

  bottom() {
    return this.y + this.h;
  }

  left() {
    return this.x;
  }

  right() {
    return this.x + this.w;
  }

  crashWith(enemy) {
    return (
      this.top() < enemy.bottom() &&
      this.right() > enemy.left() &&
      this.left() < enemy.right() &&
      this.bottom() > enemy.top()
    );
  }
}
