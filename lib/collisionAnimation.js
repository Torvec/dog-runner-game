
export class CollisionAnimation {
  constructor(level, x, y) {
    this.level = level;
    this.image = new Image();
    this.image.src = "../assets/sprites/particles/boom.png";
    this.sound = new Audio("../assets/sounds/puff.wav");
    this.spriteWidth = 100;
    this.spriteHeight = 90;
    this.sizeModifier = Math.random() + 0.5;
    this.width = this.spriteWidth * this.sizeModifier;
    this.height = this.spriteHeight * this.sizeModifier;
    this.position = { x: x - this.width * 0.5, y: y - this.height * 0.5 };
    this.frame = { x: 0, y: 0 };
    this.maxFrame = 4;
    this.markedForDeletion = false;
    this.fps = Math.random() * 10 + 5;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
  }
  update(deltaTime) {
    if (this.frame.x === 0) this.sound.play();
    this.position.x -= this.level.speed;
    if (this.frameTimer > this.frameInterval) {
      this.frame.x++;
      this.frameTimer = 0;
    } else {
      this.frameTimer += deltaTime;
    }
    if (this.frame.x > this.maxFrame) this.markedForDeletion = true;
  }
  draw(c) {
    c.drawImage(
      this.image,
      this.frame.x * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
