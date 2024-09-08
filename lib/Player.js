import {
  Sitting,
  Running,
  Jumping,
  Falling,
  Rolling,
  Diving,
  Hit,
} from "./playerStates.js";
import { CollisionAnimation } from "./collisionAnimation.js";
import { FloatingMessage } from "./floatingMessages.js";

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
    this.image.src = "../assets/player.png";
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame;
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.speed = 0;
    this.maxSpeed = 10;
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
  }
  update(input, deltaTime) {
    this.checkCollision();
    this.currentState.handleInput(input);
    // Horizontal movement
    this.x += this.speed;
    if (input.includes("ArrowRight") && this.currentState !== this.states.HIT)
      this.speed = this.maxSpeed;
    else if (
      input.includes("ArrowLeft") &&
      this.currentState !== this.states.HIT
    )
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
  }
  draw(c) {
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
  setState(statename, speed) {
    this.currentState = this.states[statename];
    this.level.speed = this.level.maxSpeed * speed;
    this.currentState.enter();
  }
  checkCollision() {
    this.level.enemies.forEach((enemy) => {
      if (
        enemy.x < this.x + this.width &&
        enemy.x + enemy.width > this.x &&
        enemy.y < this.y + this.height &&
        enemy.y + enemy.height > this.y
      ) {
        enemy.markedForDeletion = true;
        this.level.collisions.push(
          new CollisionAnimation(
            this.level,
            enemy.x + enemy.width * 0.5,
            enemy.y + enemy.height * 0.5
          )
        );
        if (
          this.currentState === this.states.ROLLING ||
          this.currentState === this.states.DIVING
        ) {
          this.level.score++;
          this.level.floatingMessages.push(
            new FloatingMessage("+1", enemy.x, enemy.y, this.level.width - 60, 70)
          );
        } else {
          // Set state to hit state and stop movement
          this.setState("HIT", 0);
          this.level.score -= 2;
          this.level.lives--;
          if (this.level.lives <= 0) this.level.gameOver = true;
        }
      }
    });
  }
}
