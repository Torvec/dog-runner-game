import { Dust } from "./particles.js";
import { Projectile } from "./Projectiles.js";

class Enemy {
  constructor(level) {
    this.level = level;
    this.frame = { x: 0, y: 0 };
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.hitpoints = 1;
    this.scoreAmount = 1;
    this.markedForDeletion = false;
  }
  update(deltaTime) {
    // Horizontal movement
    this.position.x -= this.speed.x + this.level.speed;
    // Vertical movement
    this.position.y += this.speed.y;
    // Sprite Animation
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frame.x < this.maxFrame) this.frame.x++;
      else this.frame.x = 0;
    } else {
      this.frameTimer += deltaTime;
    }
    // Garbage Collection
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
  groundLevel = () => this.level.height - this.height - this.level.groundMargin;
}

export class Plant extends Enemy {
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

export class GroundZombie extends Enemy {
  constructor(level) {
    super(level);
    this.spriteWidth = 120.125;
    this.spriteHeight = 90;
    this.width = this.spriteWidth;
    this.height = this.spriteHeight;
    this.position = {
      x: this.level.width,
      y: this.groundLevel(),
    };
    this.speed = { x: 0, y: 0 };
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

export class WalkingZombie extends Enemy {
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

class FlyingEnemy extends Enemy {
  constructor(level) {
    super(level);
    this.position = {
      x: this.level.width + Math.random() * this.level.width * 0.5,
      y: Math.random() * (this.level.height * 0.5),
    };
    this.speed = { x: Math.random() + 1, y: 0 };
    this.angle = 0;
    this.va = Math.random() * 0.1 + 0.1;
    this.maxFrame = 5;
  }
  update(deltaTime) {
    super.update(deltaTime);
    this.angle += this.va;
    this.position.y += Math.sin(this.angle);
  }
}

export class Fly extends FlyingEnemy {
  constructor(level) {
    super(level);
    this.spriteWidth = 60;
    this.spriteHeight = 44;
    this.width = this.spriteWidth;
    this.height = this.spriteHeight;
    this.image = new Image();
    this.image.src = "../assets/sprites/enemy/enemy_fly.png";
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

class ClimbingEnemy extends Enemy {
  constructor(level) {
    super(level);
    this.position = {
      x: this.level.width,
      y: (Math.random() * 0.9 + 0.1) * this.level.height * 0.5,
    };
    this.speed = { x: 0, y: Math.random() > 0.5 ? 1 : -1 };
  }
  update(deltaTime) {
    super.update(deltaTime);
    if (this.position.y > this.groundLevel()) this.speed.y *= -1;
    if (this.position.y < -this.height) this.markedForDeletion = true;
  }
}

export class Spiderling extends ClimbingEnemy {
  constructor(level) {
    super(level);
    this.spriteWidth = 310;
    this.spriteHeight = 175;
    this.width = this.spriteWidth * 0.4;
    this.height = this.spriteHeight * 0.4;
    this.maxFrame = 5;
    this.image = new Image();
    this.image.src = "../assets/sprites/enemy/enemy_spider.png";
  }
  draw(c) {
    super.draw(c);
    c.beginPath();
    c.moveTo(this.position.x + this.width * 0.5, 0);
    c.lineTo(this.position.x + this.width * 0.5, this.position.y + 50);
    c.stroke();
  }
}

export class Spider extends Spiderling {
  constructor(level) {
    super(level);
    this.spriteWidth = 120;
    this.spriteHeight = 144;
    this.width = this.spriteWidth;
    this.height = this.spriteHeight;
    this.image = new Image();
    this.image.src = "../assets/sprites/enemy/enemy_spider_big.png";
  }
}

export class BigGhost extends ClimbingEnemy {
  constructor(level) {
    super(level);
    this.spriteWidth = 80;
    this.spriteHeight = 89;
    this.width = this.spriteWidth;
    this.height = this.spriteHeight;
    this.maxFrame = 1;
    this.image = new Image();
    this.image.src = "../assets/sprites/enemy/enemy_ghost_2.png";
  }
  update(deltaTime) {
    super.update(deltaTime);
    if (this.position.y <= 0) this.speed.y *= -1;
  }
}

export class Spinner extends ClimbingEnemy {
  constructor(level) {
    super(level);
    this.spriteWidth = 213;
    this.spriteHeight = 212;
    this.width = this.spriteWidth * 0.3;
    this.height = this.spriteHeight * 0.3;
    this.speed = { x: 4, y: Math.random() >= 0.5 ? 4 : -4 };
    this.maxFrame = 8;
    this.image = new Image();
    this.image.src = "../assets/sprites/enemy/enemy_spinner.png";
  }
  update(deltaTime) {
    super.update(deltaTime);
    if (this.position.y <= 0) this.speed.y *= -1;
  }
}

export class BigBoss extends Enemy {
  constructor(level) {
    super(level);
    this.spriteWidth = 60.16;
    this.spriteHeight = 70;
    this.width = this.spriteWidth * 2.5;
    this.height = this.spriteHeight * 2.5;
    this.position = {
      x: this.level.width,
      y: this.height * 0.5,
    };
    this.speed = { x: 0, y: 0 };
    this.angle = 500;
    this.angleVelocity = 0.5;
    this.scoreAmount = 100;
    this.hitpoints = 50;
    this.projectiles = [];
    this.shootTimer = 0;
    this.shootInterval = 1000;
    this.ammo = Math.floor(Math.random() * 6) + 5; // min 5, max 10
    this.reloadTimer = 0;
    this.reloadInterval = Math.random() * 500 + 1500; // min 1.5s, max 2s  
    this.image = new Image();
    this.image.src = "../assets/sprites/enemy/enemy_ghost_4.png";
  }
  update(deltaTime) {
    super.update(deltaTime);
    this.position.x =
      this.level.width * 0.25 * Math.cos((this.angle * Math.PI) / 90) +
      (this.level.width * 0.75 - this.width * 0.5);
    this.position.y =
      this.level.height * 0.25 * Math.sin((this.angle * Math.PI) / 270) +
      (this.level.height * 0.5 - this.height * 0.5);
    this.angle += this.angleVelocity;
    // Projectiles
    this.shootProjectile(deltaTime);
    this.projectiles.forEach((projectile) => projectile.update());
    this.projectiles = this.projectiles.filter(
      (projectile) => !projectile.markedForDeletion
    );
  }
  draw(c) {
    super.draw(c);
    this.projectiles.forEach((projectile) => projectile.draw(c));
  }
  shootProjectile(deltaTime) {
    if (this.ammo > 0) {
      if (this.shootTimer > this.shootInterval) {
        this.projectiles.push(
          new Projectile({
            level: this.level,
            x: this.position.x + 64,
            y: this.position.y + 64,
            width: 64,
            height: 64,
            speed: 6,
            image: "../assets/sprites/particles/fireball_big.png",
            sound: "../assets/sounds/fire_ball.wav",
            direction: "left",
          })
        );
        this.shootTimer = 0;
        this.ammo--;
      } else {
        this.shootTimer += deltaTime;
      }
    } else {
      this.handleReload(deltaTime);
    }
  }
  handleReload(deltaTime) {
    if (this.ammo === 0)
      if (this.reloadTimer > this.reloadInterval) {
        this.ammo = 10;
        this.reloadTimer = 0;
      } else {
        this.reloadTimer += deltaTime;
      }
  }
}
