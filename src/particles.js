class Particle {
  constructor(level) {
    this.level = level;
    this.markedForDeletion = false;
  }
  update() {
    this.position.x -= this.speed.x + this.level.speed;
    this.position.y -= this.speed.y;
    this.size *= 0.95;
    if (this.size < 0.5) this.markedForDeletion = true;
  }
}

export class Dust extends Particle {
  constructor(level, x, y) {
    super(level);
    this.size = Math.random() * 10 + 10;
    this.position = { x: x, y: y };
    this.speed = { x: Math.random(), y: Math.random() };
    this.color = "rgba(50, 50, 50, 0.2)";
  }
  draw(c) {
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2);
    c.fillStyle = this.color;
    c.fill();
  }
}

export class Splash extends Particle {
  constructor(level, x, y) {
    super(level);
    this.size = Math.random() * 100 + 100;
    this.position = { x: x - this.size * 0.4, y: y - this.size * 0.5 };
    this.speed = { x: Math.random() * 6 - 4, y: Math.random() * 2 + 2 };
    this.gravity = 0;
    this.image = new Image();
    this.image.src = "sprites/particles/fire.png";
  }
  update() {
    super.update();
    this.gravity += 0.1;
    this.position.y += this.gravity;
  }
  draw(c) {
    c.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }
}

export class Fire extends Particle {
  constructor(level, x, y) {
    super(level);
    this.image = new Image();
    this.image.src = "sprites/particles/fire.png";
    this.size = Math.random() * 100 + 50;
    this.position = { x: x, y: y };
    this.speed = { x: 1, y: 1 };
    this.angle = 0;
    this.va = Math.random() * 0.2 - 0.1;
  }
  update() {
    super.update();
    this.angle += this.va;
    this.position.x += Math.sin(this.angle * 5);
  }
  draw(c) {
    c.save();
    c.translate(this.position.x, this.position.y);
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
