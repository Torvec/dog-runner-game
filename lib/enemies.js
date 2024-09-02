// TODO: Add more enemies, enemies will be level specific

class Enemy {
  constructor() {
    this.frameX = 0;
    this.frameY = 0;
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.markedForDeletion = false;
  }
  update(deltaTime) {
    this.x -= this.speedX + this.gameLevel.speed;
    this.y += this.speedY;
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
    } else {
      this.frameTimer += deltaTime;
    }
    if (this.x + this.width < 0) this.markedForDeletion = true;
  }
  draw(c) {
    c.drawImage(
      this.image,
      this.frameX * this.width,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

export class FlyingEnemy extends Enemy {
  constructor(gameLevel) {
    super();
    this.gameLevel = gameLevel;
    this.width = 60;
    this.height = 44;
    this.x = this.gameLevel.width + Math.random() * this.gameLevel.width * 0.5;
    this.y = Math.random() * (this.gameLevel.height * 0.5);
    this.speedX = Math.random() + 1;
    this.speedY = 0;
    this.maxFrame = 5;
    this.image = new Image();
    this.image.src = "../assets/sprites-enemy/enemy_fly.png";
    this.angle = 0;
    this.va = Math.random() * 0.1 + 0.1;
  }
  update(deltaTime) {
    super.update(deltaTime);
    this.angle += this.va;
    this.y += Math.sin(this.angle);
  }
}

export class GroundEnemy extends Enemy {
  constructor(gameLevel) {
    super();
    this.gameLevel = gameLevel;
    this.width = 60;
    this.height = 87;
    this.x = this.gameLevel.width;
    this.y = this.gameLevel.height - this.height - this.gameLevel.groundMargin;
    this.image = new Image();
    this.image.src = "../assets/sprites-enemy/enemy_plant.png";
    this.speedX = 0;
    this.speedY = 0;
    this.maxFrame = 1;
  }
}

export class ClimbingEnemy extends Enemy {
  constructor(gameLevel) {
    super();
    this.gameLevel = gameLevel;
    this.width = 120;
    this.height = 144;
    this.x = this.gameLevel.width;
    this.y = Math.random() * this.gameLevel.height * 0.5;
    this.image = new Image();
    this.image.src = "../assets/sprites-enemy/enemy_spider_big.png";
    this.speedX = 0;
    this.speedY = Math.random() > 0.5 ? 1 : -1;
    this.maxFrame = 5;
  }
  update(deltaTime) {
    super.update(deltaTime);
    if (
      this.y >
      this.gameLevel.height - this.height - this.gameLevel.groundMargin
    ) {
      this.speedY *= -1;
    }
    if (this.y < -this.height) {
      this.markedForDeletion = true;
    }
  }
  draw(c) {
    super.draw(c);
    c.beginPath();
    c.moveTo(this.x + this.width / 2, 0);
    c.lineTo(this.x + this.width / 2, this.y + 50);
    c.stroke();
  }
}
