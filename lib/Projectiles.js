export class Projectile {
  constructor(level, x, y) {
    this.level = level;
    this.position = { x: x, y: y };
    this.width = 24;
    this.height = 24;
    this.speed = 5;
    this.markedForDeletion = false;
    this.sound = new Audio("../assets/sounds/shoot.wav");
    this.sound.play();
  }
  update() {
    this.position.x += this.speed + this.level.speed;
    if (this.position.x > this.level.width) this.markedForDeletion = true;
  }
  draw(c) {
    c.fillStyle = "rgba(255, 165, 0, 0.75)";
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.width / 2, 0, Math.PI * 2);
    c.fill();
  }
}
