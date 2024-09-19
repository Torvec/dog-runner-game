import { UI } from "./UI.js";
import { CollisionAnimation } from "./collisionAnimation.js";
import { FloatingMessage } from "./floatingMessages.js";
import { Player } from "./Player.js";
import { Background } from "./Background.js";
import {
  FlyingEnemy,
  Bat,
  Raven,
  AngryGhost,
  GroundEnemy,
  Worm,
  ZombieWalker,
  GroundZombie,
  ClimbingEnemy,
  Spiderling,
  BigGhost,
  Spinner,
} from "./enemies.js";
import { checkCollision } from "./utils.js";
import { saveHighScore } from "./highScores.js";

class Level {
  constructor(game) {
    this.game = game;
    this.width = this.game.width;
    this.height = this.game.height;
    this.input = this.game.input;
    this.groundMargin = 40;
    this.countdown = 3;
    this.startCountdown();
    this.init();
  }
  startCountdown() {
    this.countdownActive = true;
    const countdownInterval = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        clearInterval(countdownInterval);
        this.countdownActive = false;
      }
    }, 1000);
  }
  init() {
    this.speed = 0;
    this.maxSpeed = 3;
    this.score = 0;
    this.time = 60000;
    this.ui = new UI(this);
    this.player = new Player(this);
    this.enemies = [];
    this.particles = [];
    this.collisions = [];
    this.floatingMessages = [];
    this.maxParticles = 200;
    this.enemyTimer = 0;
    this.enemeyInterval = 500;
    this.player.currentState = this.player.states.SITTING;
    this.player.currentState.enter();
    this.isPaused = false;
    this.gameOver = false;
    this.levelComplete = false;
    this.escPressed = false;
  }
  update(deltaTime) {
    this.handlePauseToggle(this.input.keys);
    this.handleGameOver(this.input.keys);
    this.handleLevelComplete(this.input.keys);
    if (
      !this.countdownActive &&
      !this.isPaused &&
      !this.gameOver &&
      !this.levelComplete
    ) {
      this.time -= deltaTime;
      this.background.update();
      this.player.update(this.input.keys, deltaTime);
      this.handleEnemies(deltaTime);
      this.particles.forEach((particle) => particle.update());
      if (this.particles.length > this.maxParticles) {
        this.particles.length = this.maxParticles;
      }
      this.floatingMessages.forEach((message) => message.update());
      this.collisions.forEach((collision) => collision.update(deltaTime));
      // Garbage Collection
      this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);
      this.particles = this.particles.filter(
        (particle) => !particle.markedForDeletion
      );
      this.collisions = this.collisions.filter(
        (collision) => !collision.markedForDeletion
      );
      this.floatingMessages = this.floatingMessages.filter(
        (message) => !message.markedForDeletion
      );
    }
  }
  draw(c) {
    c.fillStyle = "rgba(20, 20, 20, 1)";
    c.fillRect(0, 0, this.width, this.height);
    this.background.draw(c);
    this.player.draw(c);
    this.enemies.forEach((enemy) => enemy.draw(c));
    this.particles.forEach((particle) => particle.draw(c));
    this.collisions.forEach((collision) => collision.draw(c));
    this.floatingMessages.forEach((message) => message.draw(c));
    this.ui.draw(c);
  }
  //! TODO: Refactor this method, handles way too much
  handleEnemies(deltaTime) {
    if (this.enemyTimer > this.enemeyInterval) {
      this.addEnemy();
      this.enemyTimer = 0;
    } else {
      this.enemyTimer += deltaTime;
    }
    this.enemies.forEach((enemy) => {
      enemy.update(deltaTime);
      // Player Enemy Collisions
      if (checkCollision(this.player, enemy)) {
        enemy.markedForDeletion = true;
        this.collisions.push(
          new CollisionAnimation(
            this,
            enemy.x + enemy.width * 0.5,
            enemy.y + enemy.height * 0.5
          )
        );
        if (
          this.player.currentState === this.player.states.ROLLING ||
          this.player.currentState === this.player.states.DIVING
        ) {
          this.score++;
          this.floatingMessages.push(
            new FloatingMessage("+1", enemy.x, enemy.y, this.width - 60, 70)
          );
        } else {
          this.player.setState("HIT", 0);
          this.score--;
          this.player.health--;
        }
      }
      // Projectile Enemy Collisions
      this.player.projectiles.forEach((projectile) => {
        if (checkCollision(projectile, enemy)) {
          enemy.markedForDeletion = true;
          projectile.markedForDeletion = true;
          this.collisions.push(
            new CollisionAnimation(
              this,
              enemy.x + enemy.width * 0.5,
              enemy.y + enemy.height * 0.5
            )
          );
          this.player.powerLevel += 5;
          this.player.ammo += 2;
          this.score++;
          this.floatingMessages.push(
            new FloatingMessage("+1", enemy.x, enemy.y, this.width - 60, 70)
          );
        }
      });
    });
  }
  handlePauseToggle(input) {
    if (
      input.includes("Escape") &&
      !this.escPressed &&
      !this.gameOver &&
      !this.levelComplete &&
      !this.countdownActive
    ) {
      this.isPaused = !this.isPaused;
      this.escPressed = true;
    } else if (!input.includes("Escape")) {
      this.escPressed = false;
    }
    if (this.isPaused) {
      if (input.includes("1")) {
        this.restartLevel();
      }
      if (input.includes("2")) {
        this.game.setScene("START_MENU");
      }
    }
  }
  handleGameOver(input) {
    if (this.player.health <= 0) {
      this.player.health = 0;
      this.gameOver = true;
      if (input.includes("1")) {
        this.restartLevel();
      }
      if (input.includes("2")) {
        this.game.setScene("START_MENU");
      }
    }
  }
  handleLevelComplete(input) {
    if (this.time <= 0) {
      this.time = 0;
      this.levelComplete = true;
      saveHighScore(this.levelName, this.score);
      if (input.includes("Enter")) {
        this.game.nextScene();
      }
      if (input.includes("1")) {
        this.restartLevel();
      }
      if (input.includes("2")) {
        this.game.setScene("START_MENU");
      }
    }
  }
  restartLevel() {
    this.game.setScene(this.game.currentScene.name);
  }
}

export class LevelOne extends Level {
  constructor(game) {
    super(game);
    this.levelName = "Level-01";
    this.groundMargin = 40;
    this.init();
  }
  init() {
    super.init();
    this.background = new Background(this, "levelOne");
  }
  addEnemy() {
    if (this.speed > 0 && Math.random() < 0.5)
      this.enemies.push(new GroundEnemy(this));
    else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
    this.enemies.push(new FlyingEnemy(this));
  }
}

export class LevelTwo extends Level {
  constructor(game) {
    super(game);
    this.levelName = "Level-02";
    this.groundMargin = 40;
    this.init();
  }
  init() {
    super.init();
    this.background = new Background(this, "levelTwo");
  }
  addEnemy() {
    if (this.speed > 0 && Math.random() < 0.5)
      this.enemies.push(new Worm(this));
    else if (this.speed > 0) this.enemies.push(new Spiderling(this));
    this.enemies.push(new Bat(this));
  }
}

export class LevelThree extends Level {
  constructor(game) {
    super(game);
    this.levelName = "Level-03";
    this.groundMargin = 80;
    this.init();
  }
  init() {
    super.init();
    this.background = new Background(this, "levelThree");
  }
  addEnemy() {
    if (this.speed > 0 && Math.random() < 0.5)
      this.enemies.push(new GroundZombie(this));
    else if (this.speed > 0) this.enemies.push(new BigGhost(this));
    this.enemies.push(new Raven(this));
  }
}

export class LevelFour extends Level {
  constructor(game) {
    super(game);
    this.levelName = "Level-04";
    this.groundMargin = 80;
    this.init();
  }
  init() {
    super.init();
    this.background = new Background(this, "levelFour");
  }
  addEnemy() {
    if (this.speed > 0 && Math.random() <= 0.6)
      this.enemies.push(new ZombieWalker(this));
    else if (this.speed > 0) this.enemies.push(new Spinner(this));
    this.enemies.push(new AngryGhost(this));
  }
}
