import { UI } from "./UI.js";
import { Player } from "./Player.js";
import {
  BackgroundLevelOne,
  BackgroundLevelTwo,
  BackgroundLevelThree,
  BackgroundLevelFour,
} from "./background.js";
import { FlyingEnemy, GroundEnemy, ClimbingEnemy } from "./enemies.js";

class Level {
  constructor(game) {
    this.game = game;
    this.width = this.game.width;
    this.height = this.game.height;
    this.input = this.game.input;
    this.groundMargin = 40;
    this.init();
  }
  init() {
    this.speed = 0;
    this.maxSpeed = 3;
    this.score = 0;
    this.time = 10000;
    this.lives = 10;
    this.ui = new UI(this);
    this.player = new Player(this);
    this.background = null;
    this.enemies = [];
    this.particles = [];
    this.collisions = [];
    this.floatingMessages = [];
    this.maxParticles = 200;
    this.enemyTimer = 0;
    this.enemeyInterval = 500;
    this.player.currentState = this.player.states.SITTING;
    this.player.currentState.enter();
    this.startPlaying = false;
    this.isPaused = false;
    this.gameOver = false;
    this.levelComplete = false;
    this.escPressed = false;
  }
  update(deltaTime) {
    this.handleStart(this.input.keys);
    this.handlePauseToggle(this.input.keys);
    this.handleGameOver(this.input.keys);
    this.handleLevelComplete(this.input.keys);
    if (
      this.startPlaying &&
      !this.isPaused &&
      !this.gameOver &&
      !this.levelComplete
    ) {
      this.time -= deltaTime;
      this.background.update();
      this.player.update(this.input.keys, deltaTime);
      this.handleEnemies(deltaTime);
      // Handle Particles
      this.particles.forEach((particle) => {
        particle.update();
      });
      if (this.particles.length > this.maxParticles) {
        this.particles.length = this.maxParticles;
      }
      // Handle Floating Messages
      this.floatingMessages.forEach((message) => {
        message.update();
      });
      // Handle Collisions
      this.collisions.forEach((collision) => {
        collision.update(deltaTime);
      });
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
    this.background.draw(c);
    this.player.draw(c);
    this.enemies.forEach((enemy) => {
      enemy.draw(c);
    });
    this.particles.forEach((particle) => {
      particle.draw(c);
    });
    this.collisions.forEach((collision) => {
      collision.draw(c);
    });
    this.floatingMessages.forEach((message) => {
      message.draw(c);
    });
    this.ui.draw(c);
  }
  addEnemy() {
    if (this.speed > 0 && Math.random() < 0.5)
      this.enemies.push(new GroundEnemy(this));
    else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
    this.enemies.push(new FlyingEnemy(this));
  }
  handleEnemies(deltaTime) {
    if (this.enemyTimer > this.enemeyInterval) {
      this.addEnemy();
      this.enemyTimer = 0;
    } else {
      this.enemyTimer += deltaTime;
    }
    this.enemies.forEach((enemy) => {
      enemy.update(deltaTime);
    });
  }
  handleStart(input) {
    if (input.includes("Enter")) {
      this.startPlaying = true;
    }
  }
  handlePauseToggle(input) {
    if (input.includes("Escape") && !this.escPressed && !this.gameOver) {
      this.isPaused = !this.isPaused;
      this.escPressed = true;
    } else if (!input.includes("Escape")) {
      this.escPressed = false;
    }
  }
  handleGameOver(input) {
    if (this.lives <= 0) {
      this.lives = 0;
      this.gameOver = true;
      if (input.includes("Enter")) {
        this.init();
      }
    }
  }
  handleLevelComplete(input) {
    if (this.time <= 0) {
      this.time = 0;
      this.levelComplete = true;
      if (input.includes("Enter")) {
        this.game.setLevel(null);
      }
    }
  }
}

export class LevelOne extends Level {
  constructor(game) {
    super(game);
    this.groundMargin = 40;
    this.init();
  }
  init() {
    super.init();
    this.background = new BackgroundLevelOne(this);
  }
  handleLevelComplete(input) {
    if (this.time <= 0) {
      this.time = 0;
      this.levelComplete = true;
      if (input.includes("Enter")) {
        this.game.setLevel("LEVEL_TWO");
      }
    }
  }
}

export class LevelTwo extends Level {
  constructor(game) {
    super(game);
    this.groundMargin = 40;
    this.init();
  }
  init() {
    super.init();
    this.background = new BackgroundLevelTwo(this);
  }
  handleLevelComplete(input) {
    if (this.time <= 0) {
      this.time = 0;
      this.levelComplete = true;
      if (input.includes("Enter")) {
        this.game.setLevel("LEVEL_THREE");
      }
    }
  }
}

export class LevelThree extends Level {
  constructor(game) {
    super(game);
    this.groundMargin = 80;
    this.init();
  }
  init() {
    super.init();
    this.background = new BackgroundLevelThree(this);
  }
  handleLevelComplete(input) {
    if (this.time <= 0) {
      this.time = 0;
      this.levelComplete = true;
      if (input.includes("Enter")) {
        this.game.setLevel("LEVEL_FOUR");
      }
    }
  }
}

export class LevelFour extends Level {
  constructor(game) {
    super(game);
    this.groundMargin = 80;
    this.init();
  }
  init() {
    super.init();
    this.background = new BackgroundLevelFour(this);
  }
  handleLevelComplete(input) {
    if (this.time <= 0) {
      this.time = 0;
      this.levelComplete = true;
      if (input.includes("Enter")) {
        this.game.setLevel("LEVEL_FOUR");
      }
    }
  }
}
