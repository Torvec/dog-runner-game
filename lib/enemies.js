import { Dust } from "./particles.js";

class Enemy {
  constructor(level) {
    this.level = level;
    this.frame = { x: 0, y: 0 };
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.markedForDeletion = false;
  }
  update(deltaTime) {
    this.position.x -= this.speed.x + this.level.speed;
    this.position.y += this.speed.y;
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frame.x < this.maxFrame) this.frame.x++;
      else this.frame.x = 0;
    } else {
      this.frameTimer += deltaTime;
    }
    if (this.position.x + this.width < 0) this.markedForDeletion = true;
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
  groundLevel() {
    return this.level.height - this.height - this.level.groundMargin;
  }
}

export class FlyingEnemy extends Enemy {
  constructor(level) {
    super(level);
    this.spriteWidth = 60;
    this.spriteHeight = 44;
    this.width = this.spriteWidth;
    this.height = this.spriteHeight;
    this.position = {
      x: this.level.width + Math.random() * this.level.width * 0.5,
      y: Math.random() * (this.level.height * 0.5),
    };
    this.speed = { x: Math.random() + 1, y: 0 };
    this.maxFrame = 5;
    this.angle = 0;
    this.va = Math.random() * 0.1 + 0.1;
    this.image = new Image();
    this.image.src = "../assets/sprites/enemy/enemy_fly.png";
  }
  update(deltaTime) {
    super.update(deltaTime);
    this.angle += this.va;
    this.position.y += Math.sin(this.angle);
  }
}

export class Bat extends FlyingEnemy {
  constructor(level) {
    super(level);
    this.spriteWidth = 266;
    this.spriteHeight = 188;
    this.width = this.spriteWidth * 0.35;
    this.height = this.spriteHeight * 0.35;
    this.image = new Image();
    this.image.src = "../assets/sprites/enemy/enemy_bat_3.png";
  }
}

export class Raven extends FlyingEnemy {
  constructor(level) {
    super(level);
    this.spriteWidth = 271;
    this.spriteHeight = 194;
    this.width = this.spriteWidth * 0.3;
    this.height = this.spriteHeight * 0.3;
    this.image = new Image();
    this.image.src = "../assets/sprites/enemy/enemy_raven.png";
  }
}

export class AngryGhost extends FlyingEnemy {
  constructor(level) {
    super(level);
    this.spriteWidth = 87.3;
    this.spriteHeight = 70;
    this.width = this.spriteWidth;
    this.height = this.spriteHeight;
    this.image = new Image();
    this.image.src = "../assets/sprites/enemy/enemy_ghost_3.png";
  }
}

export class GroundEnemy extends Enemy {
  constructor(level) {
    super(level);
    this.spriteWidth = 60;
    this.spriteHeight = 87;
    this.width = this.spriteWidth;
    this.height = this.spriteHeight;
    this.position = {
      x: this.level.width,
      y: this.groundLevel(),
    };
    this.speed = { x: 0, y: 0 };
    this.maxFrame = 1;
    this.image = new Image();
    this.image.src = "../assets/sprites/enemy/enemy_plant.png";
  }
}

export class GroundZombie extends GroundEnemy {
  constructor(level) {
    super(level);
    this.spriteWidth = 120.125;
    this.spriteHeight = 90;
    this.width = this.spriteWidth;
    this.height = this.spriteHeight;
    this.maxFrame = 7;
    this.image = new Image();
    this.image.src = "../assets/sprites/enemy/enemy_ground_zombie.png";
  }
}

export class Worm extends Enemy {
  constructor(level) {
    super(level);
    this.spriteWidth = 80.3;
    this.spriteHeight = 60;
    this.width = this.spriteWidth;
    this.height = this.spriteHeight;
    this.position = {
      x: this.level.width,
      y: this.groundLevel(),
    };
    this.speed = { x: Math.random() + 1, y: 0 };
    this.maxFrame = 5;
    this.image = new Image();
    this.image.src = "../assets/sprites/enemy/enemy_worm.png";
  }
  update(deltaTime) {
    super.update(deltaTime);
    this.level.particles.unshift(
      new Dust(
        this.level,
        this.position.x + this.width * 0.3,
        this.position.y + this.height
      ),
      new Dust(
        this.level,
        this.position.x + this.width * 0.6,
        this.position.y + this.height
      ),
      new Dust(
        this.level,
        this.position.x + this.width * 0.8,
        this.position.y + this.height
      )
    );
  }
}

export class ZombieWalker extends Enemy {
  constructor(level) {
    super(level);
    this.spriteWidth = 292;
    this.spriteHeight = 410;
    this.width = this.spriteWidth * 0.25;
    this.height = this.spriteHeight * 0.25;
    this.position = {
      x: this.level.width,
      y: this.groundLevel(),
    };
    this.speed = { x: Math.random() + 1, y: 0 };
    this.maxFrame = 7;
    this.image = new Image();
    this.image.src = "../assets/sprites/enemy/enemy_zombie.png";
  }
}

export class ClimbingEnemy extends Enemy {
  constructor(level) {
    super(level);
    this.spriteWidth = 120;
    this.spriteHeight = 144;
    this.width = this.spriteWidth;
    this.height = this.spriteHeight;
    this.position = {
      x: this.level.width,
      y: Math.random() * this.level.height * 0.5,
    };
    this.speed = { x: 0, y: Math.random() > 0.5 ? 1 : -1 };
    this.maxFrame = 5;
    this.image = new Image();
    this.image.src = "../assets/sprites/enemy/enemy_spider_big.png";
  }
  update(deltaTime) {
    super.update(deltaTime);
    if (this.position.y > this.groundLevel()) this.speed.y *= -1;
    if (this.position.y < -this.height) this.markedForDeletion = true;
  }
  draw(c) {
    super.draw(c);
    c.beginPath();
    c.moveTo(this.position.x + this.width / 2, 0);
    c.lineTo(this.position.x + this.width / 2, this.position.y + 50);
    c.stroke();
  }
}

export class Spiderling extends ClimbingEnemy {
  constructor(level) {
    super(level);
    this.spriteWidth = 310;
    this.spriteHeight = 175;
    this.width = this.spriteWidth * 0.4;
    this.height = this.spriteHeight * 0.4;
    this.image = new Image();
    this.image.src = "../assets/sprites/enemy/enemy_spider.png";
  }
}

export class BigGhost extends Enemy {
  constructor(level) {
    super(level);
    this.spriteWidth = 80;
    this.spriteHeight = 89;
    this.width = this.spriteWidth;
    this.height = this.spriteHeight;
    this.position = {
      x: this.level.width,
      y: Math.random() * this.level.height * 0.5,
    };
    this.speed = { x: 0, y: Math.random() > 0.5 ? 1 : -1 };
    this.maxFrame = 1;
    this.image = new Image();
    this.image.src = "../assets/sprites/enemy/enemy_ghost_2.png";
  }
  update(deltaTime) {
    super.update(deltaTime);
    if (this.position.y > this.groundLevel()) this.speed.y *= -1;
    if (this.position.y <= 0) this.speed.y *= -1;
  }
}

export class Spinner extends Enemy {
  constructor(level) {
    super(level);
    this.spriteWidth = 213;
    this.spriteHeight = 212;
    this.width = this.spriteWidth * 0.3;
    this.height = this.spriteHeight * 0.3;
    this.position = {
      x: this.level.width,
      y: Math.random() * this.level.height * 0.5,
    };
    this.speed = { x: 2, y: Math.random() > 0.5 ? 1 : -1 };
    this.maxFrame = 8;
    this.image = new Image();
    this.image.src = "../assets/sprites/enemy/enemy_spinner.png";
  }
  update(deltaTime) {
    super.update(deltaTime);
    if (this.position.y > this.groundLevel()) this.speed.y *= -1;
    if (this.position.y <= 0) this.speed.y *= -1;
  }
}
