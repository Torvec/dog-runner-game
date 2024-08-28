// TODO: Start menu screen: Play, Credits, Scoreboard, Fullscreen, Music on/off, Sound on/off
// TODO: Game Levels
// Need a win condition, if achieved, show level complete message, then move to next level
// Need a lose condition, if achieved, show game over message, then allow player to restart level or go back to start menu
// All levels can be paused, and player can restart level or go back to start menu from pause menu
// Use object pools for enemies, particles, sounds, music, etc.
// TODO: Game Complete Screen
// Some kind of congratulations message for a few seconds, can press a button to go to scoreboard screen
// TODO: Scoreboard Screen
// Show high scores for each level, time taken to complete, total score, etc. can press a button to go to credits screen
// TODO: Credits Screen
// Show credits for the game, can press a button to go back to start menu

import { Player } from "./player.js";
import { FlyingEnemy, GroundEnemy, ClimbingEnemy } from "./enemies.js";
import {
  BackgroundStartMenu,
  BackgroundLevelOne,
  BackgroundLevelTwo,
  BackgroundLevelThree,
  BackgroundGameComplete,
  BackgroundScoreboard,
  BackgroundCredits,
} from "./background.js";
import { UI } from "./ui.js";

export class StartMenu {
  constructor(game) {
    this.game = game;
    this.background = new BackgroundStartMenu(this.game);
    this.text = "START MENU";
    //! FOR TESTING PURPOSES ONLY, WILL REMOVE LATER
    window.addEventListener("keydown", (e) => {
      if (e.key === "1") {
        this.game.setScene("LEVEL_ONE");
      }
    });
  }
  update(deltaTime) {
    this.background.update(deltaTime);
  }
  draw(context) {
    this.background.draw(context);
    context.fillStyle = "WHITE";
    context.font = "32px Impact";
    context.textAlign = "center";
    context.fillText(this.text, 100, 100);
  }
}

class GameLevel {
  constructor(game) {
    this.game = game;
    this.groundMargin = 40;
    this.speed = 0;
    this.maxSpeed = 3;
    this.currentLevel = 1;
    this.enemies = [];
    this.particles = [];
    this.collisions = [];
    this.floatingMessages = [];
    this.maxParticles = 200;
    this.enemyTimer = 0;
    this.enemeyInterval = 1000;
    this.debug = false;
    this.score = 0;
    this.winningScore = 40;
    this.fontColor = "black";
    this.time = 0;
    this.maxTime = 10000;
    this.gameOver = false;
    this.isPaused = false;
    this.lives = 10;
    this.UI = new UI(this);
    this.player = new Player(this);
    this.player.currentState = this.player.states.SITTING;
    this.player.currentState.enter();
  }
  update(deltaTime) {
    if (this.gameOver) {
      if (this.game.input.keys.includes(" ")) {
        this.restart();
      }
      return;
    }
    this.time += deltaTime;
    if (this.time > this.maxTime) this.gameOver = true;
    this.player.update(this.game.input.keys, deltaTime);
    // Handle Enemies
    if (this.enemyTimer > this.enemeyInterval) {
      this.addEnemy();
      this.enemyTimer = 0;
    } else {
      this.enemyTimer += deltaTime;
    }
    this.enemies.forEach((enemy) => {
      enemy.update(deltaTime);
    });
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
  draw(context) {
    this.player.draw(context);
    this.enemies.forEach((enemy) => {
      enemy.draw(context);
    });
    this.particles.forEach((particle) => {
      particle.draw(context);
    });
    this.collisions.forEach((collision) => {
      collision.draw(context);
    });
    this.floatingMessages.forEach((message) => {
      message.draw(context);
    });
    this.UI.draw(context);
  }
  addEnemy() {
    if (this.speed > 0 && Math.random() < 0.5)
      this.enemies.push(new GroundEnemy(this));
    else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
    this.enemies.push(new FlyingEnemy(this));
  }
}

export class LevelOne {
  constructor(game) {
    this.game = game;
    this.width = this.game.width;
    this.height = this.game.height;
    this.groundMargin = 40;
    this.speed = 0;
    this.maxSpeed = 3;
    this.background = new BackgroundLevelOne(this);
    this.UI = new UI(this);
    this.player = new Player(this);
    this.enemies = [];
    this.particles = [];
    this.collisions = [];
    this.floatingMessages = [];
    this.maxParticles = 200;
    this.enemyTimer = 0;
    this.enemeyInterval = 1000;
    this.debug = false;
    this.score = 0;
    this.winningScore = 40;
    this.fontColor = "black";
    this.time = 0;
    this.maxTime = 10000;
    this.gameOver = false;
    this.isPaused = false;
    this.lives = 10;
    this.player.currentState = this.player.states.SITTING;
    this.player.currentState.enter();

    //! FOR TESTING PURPOSES ONLY, WILL REMOVE LATER
    window.addEventListener("keydown", (e) => {
      if (e.key === "2") {
        this.game.setScene("LEVEL_TWO");
      }
    });
  }
  update(deltaTime) {
    if (this.gameOver) {
      if (this.game.input.keys.includes(" ")) {
        this.restart();
      }
      return;
    }
    this.time += deltaTime;
    if (this.time > this.maxTime) this.gameOver = true;
    this.background.update();
    this.player.update(this.game.input.keys, deltaTime);
    // Handle Enemies
    if (this.enemyTimer > this.enemeyInterval) {
      this.addEnemy();
      this.enemyTimer = 0;
    } else {
      this.enemyTimer += deltaTime;
    }
    this.enemies.forEach((enemy) => {
      enemy.update(deltaTime);
    });
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
  draw(context) {
    this.background.draw(context);
    this.player.draw(context);
    this.enemies.forEach((enemy) => {
      enemy.draw(context);
    });
    this.particles.forEach((particle) => {
      particle.draw(context);
    });
    this.collisions.forEach((collision) => {
      collision.draw(context);
    });
    this.floatingMessages.forEach((message) => {
      message.draw(context);
    });
    this.UI.draw(context);
  }
  addEnemy() {
    if (this.speed > 0 && Math.random() < 0.5)
      this.enemies.push(new GroundEnemy(this));
    else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
    this.enemies.push(new FlyingEnemy(this));
  }
  restart() {
    this.game.setScene("LEVEL_ONE");
  }
}

export class LevelTwo {
  constructor(game) {
    this.game = game;
    this.width = this.game.width;
    this.height = this.game.height;
    this.groundMargin = 80;
    this.speed = 0;
    this.maxSpeed = 3;
    this.background = new BackgroundLevelTwo(this);
    this.UI = new UI(this);
    this.player = new Player(this);
    this.enemies = [];
    this.particles = [];
    this.collisions = [];
    this.floatingMessages = [];
    this.maxParticles = 200;
    this.enemyTimer = 0;
    this.enemeyInterval = 1000;
    this.debug = false;
    this.score = 0;
    this.winningScore = 40;
    this.fontColor = "black";
    this.time = 0;
    this.maxTime = 10000;
    this.gameOver = false;
    this.isPaused = false;
    this.lives = 10;
    this.player.currentState = this.player.states.SITTING;
    this.player.currentState.enter();

    //! FOR TESTING PURPOSES ONLY, WILL REMOVE LATER
    window.addEventListener("keydown", (e) => {
      if (e.key === "3") {
        this.game.setScene("LEVEL_THREE");
      }
    });
  }
  update(deltaTime) {
    if (this.gameOver) {
      if (this.game.input.keys.includes(" ")) {
        this.restart();
      }
      return;
    }
    this.time += deltaTime;
    if (this.time > this.maxTime) this.gameOver = true;
    this.background.update();
    this.player.update(this.game.input.keys, deltaTime);
    // Handle Enemies
    if (this.enemyTimer > this.enemeyInterval) {
      this.addEnemy();
      this.enemyTimer = 0;
    } else {
      this.enemyTimer += deltaTime;
    }
    this.enemies.forEach((enemy) => {
      enemy.update(deltaTime);
    });
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
  draw(context) {
    this.background.draw(context);
    this.player.draw(context);
    this.enemies.forEach((enemy) => {
      enemy.draw(context);
    });
    this.particles.forEach((particle) => {
      particle.draw(context);
    });
    this.collisions.forEach((collision) => {
      collision.draw(context);
    });
    this.floatingMessages.forEach((message) => {
      message.draw(context);
    });
    this.UI.draw(context);
  }
  addEnemy() {
    if (this.speed > 0 && Math.random() < 0.5)
      this.enemies.push(new GroundEnemy(this));
    else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
    this.enemies.push(new FlyingEnemy(this));
  }
  restart() {
    this.game.setScene("LEVEL_TWO");
  }
}

export class LevelThree {
  constructor(game) {
    this.game = game;
    this.width = this.game.width;
    this.height = this.game.height;
    this.groundMargin = 80;
    this.speed = 0;
    this.maxSpeed = 3;
    this.background = new BackgroundLevelThree(this);
    this.UI = new UI(this);
    this.player = new Player(this);
    this.enemies = [];
    this.particles = [];
    this.collisions = [];
    this.floatingMessages = [];
    this.maxParticles = 200;
    this.enemyTimer = 0;
    this.enemeyInterval = 1000;
    this.debug = false;
    this.score = 0;
    this.winningScore = 40;
    this.fontColor = "black";
    this.time = 0;
    this.maxTime = 10000;
    this.gameOver = false;
    this.isPaused = false;
    this.lives = 10;
    this.player.currentState = this.player.states.SITTING;
    this.player.currentState.enter();

    //! FOR TESTING PURPOSES ONLY, WILL REMOVE LATER
    window.addEventListener("keydown", (e) => {
      if (e.key === "4") {
        this.game.setScene("GAME_COMPLETE");
      }
    });
  }
  update(deltaTime) {
    if (this.gameOver) {
      if (this.game.input.keys.includes(" ")) {
        this.restart();
      }
      return;
    }
    this.time += deltaTime;
    if (this.time > this.maxTime) this.gameOver = true;
    this.background.update();
    this.player.update(this.game.input.keys, deltaTime);
    // Handle Enemies
    if (this.enemyTimer > this.enemeyInterval) {
      this.addEnemy();
      this.enemyTimer = 0;
    } else {
      this.enemyTimer += deltaTime;
    }
    this.enemies.forEach((enemy) => {
      enemy.update(deltaTime);
    });
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
  draw(context) {
    this.background.draw(context);
    this.player.draw(context);
    this.enemies.forEach((enemy) => {
      enemy.draw(context);
    });
    this.particles.forEach((particle) => {
      particle.draw(context);
    });
    this.collisions.forEach((collision) => {
      collision.draw(context);
    });
    this.floatingMessages.forEach((message) => {
      message.draw(context);
    });
    this.UI.draw(context);
  }
  addEnemy() {
    if (this.speed > 0 && Math.random() < 0.5)
      this.enemies.push(new GroundEnemy(this));
    else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
    this.enemies.push(new FlyingEnemy(this));
  }
  restart() {
    this.game.setScene("LEVEL_THREE");
  }
}

export class GameComplete {
  constructor(game) {
    this.game = game;
    this.background = new BackgroundGameComplete(this.game);
    this.text = "GAME COMPLETE";
    //! FOR TESTING PURPOSES ONLY, WILL REMOVE LATER
    window.addEventListener("keydown", (e) => {
      if (e.key === "5") {
        this.game.setScene("SCOREBOARD");
      }
    });
  }
  update() {
    this.background.update();
  }
  draw(context) {
    this.background.draw(context);
    context.fillStyle = "WHITE";
    context.font = "32px Impact";
    context.textAlign = "center";
    context.fillText(this.text, 100, 100);
  }
}

export class Scoreboard {
  constructor(game) {
    this.game = game;
    this.background = new BackgroundScoreboard(this.game);
    this.text = "SCOREBOARD";
    //! FOR TESTING PURPOSES ONLY, WILL REMOVE LATER
    window.addEventListener("keydown", (e) => {
      if (e.key === "6") {
        this.game.setScene("CREDITS");
      }
    });
  }
  update() {
    this.background.update();
  }
  draw(context) {
    this.background.draw(context);
    context.fillStyle = "WHITE";
    context.font = "32px Impact";
    context.textAlign = "center";
    context.fillText(this.text, 100, 100);
  }
}

export class Credits {
  constructor(game) {
    this.game = game;
    this.background = new BackgroundCredits(this.game);
    this.text = "CREDITS";
    //! FOR TESTING PURPOSES ONLY, WILL REMOVE LATER
    window.addEventListener("keydown", (e) => {
      if (e.key === "0") {
        this.game.setScene("START_MENU");
      }
    });
  }
  update() {
    this.background.update();
  }
  draw(context) {
    this.background.draw(context);
    context.fillStyle = "WHITE";
    context.font = "32px Impact";
    context.textAlign = "center";
    context.fillText(this.text, 100, 100);
  }
}
