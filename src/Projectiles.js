export class Projectile {
  constructor({ level, x, y, width, height, speed, image, sound, direction }) {
    this.level = level;
    this.position = { x: x, y: y };
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.image = new Image();
    this.image.src = image;
    this.sound = new Audio(sound);
    this.sound.play();
    this.direction = direction;
    this.markedForDeletion = false;
  }
  update() {
    if (this.direction === "left") {
      this.position.x -= this.speed + this.level.speed;
    } else if (this.direction === "right") {
      this.position.x += this.speed + this.level.speed;
    } else throw new Error("Invalid direction");
    if (this.position.x < 0 || this.position.x > this.level.width) {
      this.markedForDeletion = true;
    }
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
