// TODO: Start menu screen: Play, Credits, Scoreboard, Music on/off, Sound on/off
// TODO: Game Levels
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
import { UI } from "./UI.js";

class Scene {
  constructor(game) {
    this.game = game;
    this.width = this.game.width;
    this.height = this.game.height;
    this.background;
  }
  update() {
    this.background.update();
  }
  draw(c) {
    this.background.draw(c);
    c.fillStyle = "WHITE";
    c.font = "32px Impact";
    c.textAlign = "center";
  }
}

class GameLevel extends Scene {
  constructor(game) {
    super(game);
    this.groundMargin = 40;
    this.speed = 0;
    this.maxSpeed = 3;
    this.fontColor = "black";
    this.score = 0;
    this.time = 10000;
    this.lives = 10;
    this.UI = new UI(this);
    this.player = new Player(this);
    this.isPaused = false;
    this.escapePressed = false;
    this.gameOver = false;
    this.levelComplete = false;
    this.enemies = [];
    this.particles = [];
    this.collisions = [];
    this.floatingMessages = [];
    this.maxParticles = 200;
    this.enemyTimer = 0;
    this.enemeyInterval = 500;
    this.player.currentState = this.player.states.SITTING;
    this.player.currentState.enter();
  }
  update(deltaTime) {
    this.handlePauseToggle();
    if (this.handleGameOver()) return;
    if (!this.isPaused) {
      this.time -= deltaTime;
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
    this.UI.draw(c);
  }
  addEnemy() {
    if (this.speed > 0 && Math.random() < 0.5)
      this.enemies.push(new GroundEnemy(this));
    else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
    this.enemies.push(new FlyingEnemy(this));
  }
  //TODO: Implement ability to restart level from pause screen or go to start menu
  handlePauseToggle() {
    // Prevents multiple key presses of the escape key due to update loop running multiple times a second
    // Probably a better way to handle this, but it works for now so yeah...
    if (
      this.game.input.keys.includes("Escape") &&
      !this.escapePressed &&
      !this.gameOver
    ) {
      this.isPaused = !this.isPaused;
      this.escapePressed = true;
    } else if (!this.game.input.keys.includes("Escape")) {
      this.escapePressed = false;
    }
  }
  handleGameOver() {
    if (this.lives <= 0) {
      if (this.game.input.keys.includes(" ")) {
        this.restart();
      }
      this.gameOver = true;
      return true;
    }
    return false;
  }
  handleLevelComplete(sceneName) {
    if (this.time <= 0) {
      if (this.game.input.keys.includes(" ")) {
        this.game.setScene(sceneName);
      }
      this.time = 0;
      this.levelComplete = true;
      return true;
    }
    return false;
  }
}

export class LevelOne extends GameLevel {
  constructor(game) {
    super(game);
    this.background = new BackgroundLevelOne(this);
  }
  update(deltaTime) {
    super.update(deltaTime);
    if (this.handleLevelComplete("LEVEL_TWO")) return;
  }
  restart() {
    this.game.setScene("LEVEL_ONE");
  }
}

export class LevelTwo extends GameLevel {
  constructor(game) {
    super(game);
    this.background = new BackgroundLevelTwo(this);
    this.groundMargin = 80;
  }
  update(deltaTime) {
    super.update(deltaTime);
    if (this.handleLevelComplete("LEVEL_THREE")) return;
  }
  restart() {
    this.game.setScene("LEVEL_TWO");
  }
}

export class LevelThree extends GameLevel {
  constructor(game) {
    super(game);
    this.background = new BackgroundLevelThree(this);
    this.groundMargin = 80;
  }
  update(deltaTime) {
    super.update(deltaTime);
    if (this.handleLevelComplete("GAME_COMPLETE")) return;
  }
  restart() {
    this.game.setScene("LEVEL_THREE");
  }
}

export class StartMenu extends Scene {
  constructor(game) {
    super(game);
    this.background = new BackgroundStartMenu(this);
    this.gameTitleText = "Dog Runner Game Thing";
    this.startGameText = "Press 1 to Start";
  }
  draw(c) {
    super.draw(c);
    c.fillText(
      this.gameTitleText,
      this.game.width * 0.5,
      this.game.height * 0.5
    );
    c.fillText(
      this.startGameText,
      this.game.width * 0.5,
      this.game.height * 0.5 + 50
    );
  }
}

export class GameComplete extends Scene {
  constructor(game) {
    super(game);
    this.background = new BackgroundGameComplete(this);
    this.text = "GAME COMPLETE";
  }
  draw(c) {
    super.draw(c);
    c.fillText(this.text, this.game.width * 0.5, this.game.height * 0.5);
  }
}

export class Scoreboard extends Scene {
  constructor(game) {
    super(game);
    this.background = new BackgroundScoreboard(this);
    this.text = "SCOREBOARD";
  }
  draw(c) {
    super.draw(c);
    c.fillText(this.text, this.game.width * 0.5, this.game.height * 0.5);
  }
}

export class Credits extends Scene {
  constructor(game) {
    super(game);
    this.background = new BackgroundCredits(this);
    this.text = "CREDITS";
  }
  draw(c) {
    super.draw(c);
    c.fillText(this.text, this.game.width * 0.5, this.game.height * 0.5);
  }
}
