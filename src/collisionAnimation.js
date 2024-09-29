export class CollisionAnimation {
  constructor(level, x, y, type) {
    this.level = level;
    if (type === "enemy") {
      this.image = new Image();
      this.image.src = "sprites/particles/boom.png";
      this.sound = new Audio("sounds/puff.wav");
      this.spriteWidth = 100;
      this.spriteHeight = 90;
      this.sizeModifier = Math.random() + 0.5;
      this.maxFrame = 4;
    } else if (type === "boss") {
      this.image = new Image();
      this.image.src = "sprites/particles/explosion.png";
      this.sound = new Audio("sounds/explosion.wav");
      this.sound.volume = 0.6;
      this.spriteWidth = 64;
      this.spriteHeight = 64;
      this.sizeModifier = 8;
      this.maxFrame = 15;
    }
    this.width = this.spriteWidth * this.sizeModifier;
    this.height = this.spriteHeight * this.sizeModifier;
    this.position = { x: x - this.width * 0.5, y: y - this.height * 0.5 };
    this.frame = { x: 0, y: 0 };
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
