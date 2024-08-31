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
  constructor(gameLevel) {
    this.gameLevel = gameLevel;
    this.width = 100;
    this.height = 91.3;
    this.x = 0;
    this.y = this.gameLevel.height - this.height - this.gameLevel.groundMargin;
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
      SITTING: new Sitting(this.gameLevel),
      RUNNING: new Running(this.gameLevel),
      JUMPING: new Jumping(this.gameLevel),
      FALLING: new Falling(this.gameLevel),
      ROLLING: new Rolling(this.gameLevel),
      DIVING: new Diving(this.gameLevel),
      HIT: new Hit(this.gameLevel),
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
    if (this.x > this.gameLevel.width - this.width)
      this.x = this.gameLevel.width - this.width;
    // Vertical movement
    this.y += this.vy;
    if (!this.onGround()) this.vy += this.weight;
    else this.vy = 0;
    // Vertical boundaries
    if (this.y > this.gameLevel.height - this.height - this.gameLevel.groundMargin)
      this.y = this.gameLevel.height - this.height - this.gameLevel.groundMargin;
    // Sprite Animation
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
    } else {
      this.frameTimer += deltaTime;
    }
  }
  draw(context) {
    context.drawImage(
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
    return this.y >= this.gameLevel.height - this.height - this.gameLevel.groundMargin;
  }
  setState(statename, speed) {
    this.currentState = this.states[statename];
    this.gameLevel.speed = this.gameLevel.maxSpeed * speed;
    this.currentState.enter();
  }
  checkCollision() {
    this.gameLevel.enemies.forEach((enemy) => {
      if (
        enemy.x < this.x + this.width &&
        enemy.x + enemy.width > this.x &&
        enemy.y < this.y + this.height &&
        enemy.y + enemy.height > this.y
      ) {
        enemy.markedForDeletion = true;
        this.gameLevel.collisions.push(
          new CollisionAnimation(
            this.gameLevel,
            enemy.x + enemy.width * 0.5,
            enemy.y + enemy.height * 0.5
          )
        );
        if (
          this.currentState === this.states.ROLLING ||
          this.currentState === this.states.DIVING
        ) {
          this.gameLevel.score++;
          this.gameLevel.floatingMessages.push(
            new FloatingMessage("+1", enemy.x, enemy.y, 150, 50)
          );
        } else {
          // Set state to hit state and stop movement
          this.setState("HIT", 0);
          this.gameLevel.score -= 2;
          this.gameLevel.lives--;
          if (this.gameLevel.lives <= 0) this.gameLevel.gameOver = true;
        }
      }
    });
  }
}
