import {
  Sitting,
  Running,
  Jumping,
  Falling,
  Rolling,
  Diving,
  Shooting,
  Hit,
} from "./playerStates.js";
import { Projectile } from "./Projectiles.js";

export class Player {
  constructor(level) {
    this.level = level;
    this.width = 100;
    this.height = 91.3;
    this.position = {
      x: 0,
      y: this.groundLevel(),
    };
    this.velocity = { x: 0, y: 0 };
    this.gravity = 0.5;
    this.image = new Image();
    this.image.src = "../assets/sprites/player/player.png";
    this.sound = new Audio("../assets/sounds/fire_roll.wav");
    this.sound.volume = 0.5;
    this.frame = { x: 0, y: 0 };
    this.maxFrame;
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.speed = 0;
    this.maxSpeed = 10;
    this.health = 6;
    this.states = {
      SITTING: new Sitting(this.level),
      RUNNING: new Running(this.level),
      JUMPING: new Jumping(this.level),
      FALLING: new Falling(this.level),
      ROLLING: new Rolling(this.level),
      DIVING: new Diving(this.level),
      SHOOTING: new Shooting(this.level),
      HIT: new Hit(this.level),
    };
    this.currentState = null;
    this.projectiles = [];
    this.ammo = 5;
    this.maxAmmo = 20;
    this.ammoTimer = 0;
    this.ammoInterval = 500;
    this.powerLevel = 5;
    this.maxPowerLevel = 100;
    this.powerLevelTimer = 0;
    this.powerLevelInterval = 250;
    this.isInvincible = false;
  }
  update(input, deltaTime) {
    this.currentState.handleInput(input);
    this.handleAmmo(deltaTime);
    this.handlePowerLevel(input, deltaTime);
    // Horizontal movement
    this.position.x += this.speed;
    if (input.includes("d") && this.currentState !== this.states.HIT)
      this.speed = this.maxSpeed;
    else if (input.includes("a") && this.currentState !== this.states.HIT)
      this.speed = -this.maxSpeed;
    else this.speed = 0;
    // Horizontal boundaries
    if (this.position.x < 0) this.position.x = 0; // Left Side
    // Prevent player from moving past the center of the screen
    if (this.position.x > this.level.width * 0.5 - this.width)
      this.position.x = this.level.width * 0.5 - this.width;
    // Vertical movement
    this.position.y += this.velocity.y;
    if (!this.onGround()) this.velocity.y += this.gravity;
    else this.velocity.y = 0;
    // Vertical boundaries
    if (this.position.y > this.groundLevel())
      this.position.y = this.groundLevel();
    // Sprite Animation
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frame.x < this.maxFrame) this.frame.x++;
      else this.frame.x = 0;
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
      this.frame.x * this.width,
      this.frame.y * this.height,
      this.width,
      this.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
  onGround() {
    return this.position.y >= this.groundLevel();
  }
  groundLevel() {
    return this.level.height - this.height - this.level.groundMargin;
  }
  handlePowerLevel(input, deltaTime) {
    this.powerLevelTimer += deltaTime;
    if (this.powerLevelTimer > this.powerLevelInterval) {
      if (
        this.currentState === this.states.SITTING &&
        this.powerLevel < this.maxPowerLevel
      ) {
        this.powerLevel += 4;
      } else if (input.includes("Shift") && this.powerLevel > 0) {
        this.powerLevel--;
        if (this.sound.paused) this.sound.play();
      }
      this.powerLevelTimer = 0;
    } else if (!input.includes("Shift")) {
      if (!this.sound.paused) {
        this.sound.pause();
        this.sound.currentTime = 0;
      }
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
  shootProjectile() {
    if (this.ammo > 0) {
      this.projectiles.push(
        new Projectile(
          this.level,
          this.position.x + this.width,
          this.position.y + this.height * 0.4
        )
      );
      this.ammo--;
    }
  }
  setState(statename, speed) {
    this.currentState = this.states[statename];
    this.level.speed = this.level.maxSpeed * speed;
    this.currentState.enter();
  }
}
