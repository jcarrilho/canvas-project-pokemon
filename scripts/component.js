// JS Initialization
console.log("Component is loaded");

class Component {
  constructor(x, y, w, h, color, ctx) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.ctx = ctx;
    this.speedX = 0;
    this.speedY = 0;
  }

  draw() {
    if (this.img) {
      // Creating new Image and Load
      const img = new Image();
      img.addEventListener("load", () => {
        this.img = img;
      });
      // Source Image
      img.src = "../images/ash.png";
      this.ctx.drawImage(img, this.x, this.y, this.w, this.h);
    } else {
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(this.x, this.y, this.w, this.h);
    }
  }

  newPos() {
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
