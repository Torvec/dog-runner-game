export class Projectile {
  constructor(level, x, y) {
    this.level = level;
    this.position = { x: x, y: y };
    this.width = 32;
    this.height = 32;
    this.speed = 10;
    this.markedForDeletion = false;
    this.image = new Image();
    this.image.src = "../assets/sprites/particles/fireball.png";
    this.sound = new Audio("../assets/sounds/shoot.wav");
    this.sound.play();
  }
  update() {
    this.position.x += this.speed + this.level.speed;
    if (this.position.x > this.level.width) this.markedForDeletion = true;
  }
  draw(c) {
    c.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
