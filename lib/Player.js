import {
  Sitting,
  Running,
  Jumping,
  Falling,
  Rolling,
  Diving,
  Hit,
} from "./playerStates.js";
import { Projectile } from "./Projectiles.js";

export class Player {
  constructor(level) {
    this.level = level;
    this.width = 100;
    this.height = 91.3;
    this.x = 0;
    this.y = this.level.height - this.height - this.level.groundMargin;
    this.vy = 0;
    this.weight = 1;
    this.image = new Image();
    this.image.src = "../assets/sprites/player/player.png";
    this.sound = new Audio("../assets/sounds/fire_roll.wav");
    this.sound.volume = 0.5;
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame;
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.speed = 0;
    this.maxSpeed = 10;
    this.health = 10;
    this.states = {
      SITTING: new Sitting(this.level),
      RUNNING: new Running(this.level),
      JUMPING: new Jumping(this.level),
      FALLING: new Falling(this.level),
      ROLLING: new Rolling(this.level),
      DIVING: new Diving(this.level),
      HIT: new Hit(this.level),
    };
    this.currentState = null;
    this.spacePressed = false;
    this.projectiles = [];
    this.ammo = 15;
    this.maxAmmo = 30;
    this.ammoTimer = 0;
    this.ammoInterval = 1000;
    this.powerLevel = 0;
    this.maxPowerLevel = 100;
    this.powerLevelTimer = 0;
    this.powerLevelInterval = 500;
  }
  update(input, deltaTime) {
    this.currentState.handleInput(input);
    this.shootProjectile(input);
    this.handleAmmo(deltaTime);
    this.handlePowerLevel(input, deltaTime);
    // Horizontal movement
    this.x += this.speed;
    if (input.includes("d") && this.currentState !== this.states.HIT)
      this.speed = this.maxSpeed;
    else if (input.includes("a") && this.currentState !== this.states.HIT)
      this.speed = -this.maxSpeed;
    else this.speed = 0;
    // Horizontal boundaries
    if (this.x < 0) this.x = 0;
    if (this.x > this.level.width - this.width)
      this.x = this.level.width - this.width;
    // Vertical movement
    this.y += this.vy;
    if (!this.onGround()) this.vy += this.weight;
    else this.vy = 0;
    // Vertical boundaries
    if (this.y > this.level.height - this.height - this.level.groundMargin)
      this.y = this.level.height - this.height - this.level.groundMargin;
    // Sprite Animation
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
    } else {
      this.frameTimer += deltaTime;
    }
    // Projectiles
    this.projectiles.forEach((projectile) => projectile.update());
    this.projectiles = this.projectiles.filter(
      (projectile) => !projectile.markedForDeletion
    );
  }
  draw(c) {
    this.projectiles.forEach((projectile) => projectile.draw(c));
    c.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  onGround() {
    return this.y >= this.level.height - this.height - this.level.groundMargin;
  }
  handlePowerLevel(input, deltaTime) {
    this.powerLevelTimer += deltaTime;
    if (this.powerLevelTimer > this.powerLevelInterval) {
      if (
        this.currentState === this.states.SITTING &&
        this.powerLevel < this.maxPowerLevel
      ) {
        this.powerLevel++;
      } else if (input.includes("Shift") && this.powerLevel > 0) {
        this.powerLevel--;
        this.sound.play();
      }
      this.powerLevelTimer = 0;
    } else if (
      !input.includes("Shift") ||
      this.level.levelComplete ||
      this.level.gameOver ||
      this.level.isPaused
    ) {
      this.sound.pause();
      this.sound.currentTime = 0;
    }
    this.powerLevel = Math.max(
      0,
      Math.min(this.powerLevel, this.maxPowerLevel)
    );
  }
  handleAmmo(deltaTime) {
    if (this.ammoTimer > this.ammoInterval) {
      if (this.ammo < this.maxAmmo) this.ammo++;
      this.ammoTimer = 0;
    } else {
      this.ammoTimer += deltaTime;
    }
    if (this.ammo > this.maxAmmo) this.ammo = this.maxAmmo;
  }
  shootProjectile(input) {
    if (
      input.includes(" ") &&
      this.ammo > 0 &&
      !this.spacePressed &&
      this.currentState !== this.states.HIT &&
      this.currentState !== this.states.DIVING &&
      this.currentState !== this.states.ROLLING
    ) {
      this.projectiles.push(
        new Projectile(
          this.level,
          this.x + this.width,
          this.y + this.height * 0.5
        )
      );
      this.ammo--;
      this.spacePressed = true;
    } else if (!input.includes(" ")) {
      this.spacePressed = false;
    }
  }
  setState(statename, speed) {
    this.currentState = this.states[statename];
    this.level.speed = this.level.maxSpeed * speed;
    this.currentState.enter();
  }
}
