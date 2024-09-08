class Particle {
  constructor(level) {
    this.level = level;
    this.markedForDeletion = false;
  }
  update() {
    this.x -= this.speedX + this.level.speed;
    this.y -= this.speedY;
    this.size *= 0.95;
    if (this.size < 0.5) this.markedForDeletion = true;
  }
}

export class Dust extends Particle {
  constructor(level, x, y) {
    super(level);
    this.size = Math.random() * 10 + 10;
    this.x = x;
    this.y = y;
    this.speedX = Math.random();
    this.speedY = Math.random();
    this.color = "rgba(0, 0, 0, 0.25)";
  }
  draw(c) {
    c.beginPath();
    c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    c.fillStyle = this.color;
    c.fill();
  }
}

export class Splash extends Particle {
  constructor(level, x, y) {
    super(level);
    this.size = Math.random() * 100 + 100;
    this.x = x - this.size * 0.4;
    this.y = y - this.size * 0.5;
    this.speedX = Math.random() * 6 - 4;
    this.speedY = Math.random() * 2 + 2;
    this.gravity = 0;
    this.image = new Image();
    this.image.src = "../assets/sprites-particles/fire.png";
  }
  update() {
    super.update();
    this.gravity += 0.1;
    this.y += this.gravity;
  }
  draw(c) {
    c.drawImage(this.image, this.x, this.y, this.size, this.size);
  }
}

export class Fire extends Particle {
  constructor(level, x, y) {
    super(level);
    this.image = new Image();
    this.image.src = "../assets/sprites-particles/fire.png";
    this.size = Math.random() * 100 + 50;
    this.x = x;
    this.y = y;
    this.speedX = 1;
    this.speedY = 1;
    this.angle = 0;
    this.va = Math.random() * 0.2 - 0.1;
  }
  update() {
    super.update();
    this.angle += this.va;
    this.x += Math.sin(this.angle * 5);
  }
  draw(c) {
    c.save();
    c.translate(this.x, this.y);
    c.rotate(this.angle);
    c.drawImage(
      this.image,
      -this.size * 0.5,
      -this.size * 0.5,
      this.size,
      this.size
    );
    c.restore();
  }
}
