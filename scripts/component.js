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
    this.characterIndex = null;
  }

  draw() {
    const img = new Image();
    img.addEventListener("click", () => {
      this.img = img;
    });
    if (this.character === "player") {
      img.src = "../images/ash-pixel.png";
    } else if (this.character === "pokemons") {
      if (this.characterIndex === null) {
        this.characterIndex = Math.floor(Math.random() * 150);
      }
      img.src = `../images/pokemons/${this.characterIndex}.png`;
    } else if (this.character === "teamRocketEnemies") {
      img.src = "../images/giovanni-crop.png";
    } else if (this.character === "ball") {
      img.src = "../images/pokeball-crop.png";
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