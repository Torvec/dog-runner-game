import { Dust } from "./particles.js";

class Enemy {
  constructor(level) {
    this.level = level;
    this.frameX = 0;
    this.frameY = 0;
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.markedForDeletion = false;
  }
  update(deltaTime) {
    this.x -= this.speedX + this.level.speed;
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
      this.frameX * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

export class FlyingEnemy extends Enemy {
  constructor(level) {
    super(level);
    this.spriteWidth = 60;
    this.spriteHeight = 44;
    this.width = this.spriteWidth;
    this.height = this.spriteHeight;
    this.x = this.level.width + Math.random() * this.level.width * 0.5;
    this.y = Math.random() * (this.level.height * 0.5);
    this.speedX = Math.random() + 1;
    this.speedY = 0;
    this.maxFrame = 5;
    this.image = new Image();
    this.image.src = "../assets/sprites/enemy/enemy_fly.png";
    this.angle = 0;
    this.va = Math.random() * 0.1 + 0.1;
  }
  update(deltaTime) {
    super.update(deltaTime);
    this.angle += this.va;
    this.y += Math.sin(this.angle);
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
    this.x = this.level.width;
    this.y = this.level.height - this.height - this.level.groundMargin;
    this.image = new Image();
    this.image.src = "../assets/sprites/enemy/enemy_plant.png";
    this.speedX = 0;
    this.speedY = 0;
    this.maxFrame = 1;
  }
}

export class GroundZombie extends GroundEnemy {
  constructor(level) {
    super(level);
    this.spriteWidth = 120.125;
    this.spriteHeight = 90;
    this.width = this.spriteWidth;
    this.height = this.spriteHeight;
    this.image = new Image();
    this.image.src = "../assets/sprites/enemy/enemy_ground_zombie.png";
    this.maxFrame = 7;
  }
}

export class Worm extends Enemy {
  constructor(level) {
    super(level);
    this.spriteWidth = 80.3;
    this.spriteHeight = 60;
    this.width = this.spriteWidth;
    this.height = this.spriteHeight;
    this.x = this.level.width;
    this.y = this.level.height - this.height - this.level.groundMargin;
    this.image = new Image();
    this.image.src = "../assets/sprites/enemy/enemy_worm.png";
    this.speedX = Math.random() + 1;
    this.speedY = 0;
    this.maxFrame = 5;
  }
  update(deltaTime) {
    super.update(deltaTime);
    this.level.particles.unshift(
      new Dust(this.level, this.x + this.width * 0.3, this.y + this.height),
      new Dust(this.level, this.x + this.width * 0.6, this.y + this.height),
      new Dust(this.level, this.x + this.width * 0.8, this.y + this.height)
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
    this.x = this.level.width;
    this.y = this.level.height - this.height - this.level.groundMargin;
    this.image = new Image();
    this.image.src = "../assets/sprites/enemy/enemy_zombie.png";
    this.speedX = Math.random() + 1;
    this.speedY = 0;
    this.maxFrame = 7;
  }
}

export class ClimbingEnemy extends Enemy {
  constructor(level) {
    super(level);
    this.spriteWidth = 120;
    this.spriteHeight = 144;
    this.width = this.spriteWidth;
    this.height = this.spriteHeight;
    this.x = this.level.width;
    this.y = Math.random() * this.level.height * 0.5;
    this.image = new Image();
    this.image.src = "../assets/sprites/enemy/enemy_spider_big.png";
    this.speedX = 0;
    this.speedY = Math.random() > 0.5 ? 1 : -1;
    this.maxFrame = 5;
  }
  update(deltaTime) {
    super.update(deltaTime);
    if (this.y > this.level.height - this.height - this.level.groundMargin) {
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
    this.x = this.level.width;
    this.y = Math.random() * this.level.height * 0.5;
    this.image = new Image();
    this.image.src = "../assets/sprites/enemy/enemy_ghost_2.png";
    this.speedX = 0;
    this.speedY = Math.random() > 0.5 ? 1 : -1;
    this.maxFrame = 1;
  }
  update(deltaTime) {
    super.update(deltaTime);
    if (this.y > this.level.height - this.height - this.level.groundMargin) {
      this.speedY *= -1;
    }
    if (this.y <= 0) {
      this.speedY *= -1;
    }
  }
}

export class Spinner extends Enemy {
  constructor(level) {
    super(level);
    this.spriteWidth = 213;
    this.spriteHeight = 212;
    this.width = this.spriteWidth * 0.3;
    this.height = this.spriteHeight * 0.3;
    this.x = this.level.width;
    this.y = Math.random() * this.level.height * 0.5;
    this.image = new Image();
    this.image.src = "../assets/sprites/enemy/enemy_spinner.png";
    this.speedX = 2;
    this.speedY = Math.random() > 0.5 ? 1 : -1;
    this.maxFrame = 8;
  }
  update(deltaTime) {
    super.update(deltaTime);
    if (this.y > this.level.height - this.height - this.level.groundMargin) {
      this.speedY *= -1;
    }
    if (this.y <= 0) {
      this.speedY *= -1;
    }
  }
}
