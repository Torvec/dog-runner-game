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

class Scene {
  constructor(game) {
    this.game = game;
  }
  update(deltaTime) {}
  draw(context) {}
}
// TODO: Start menu screen: Play, Credits, Scoreboard, Fullscreen, Music on/off, Sound on/off
export class StartMenu extends Scene {
  constructor(game) {
    super(game);
    console.log("Start Menu");
  }
  start() {}
  changeScene(input) {
    if (input.keys.includes("1")) {
      this.game.sceneManager.setScene("LEVEL_ONE");
    }
  }
}
// TODO: Game Levels
// Need a win condition, if achieved, show level complete message, then move to next level
// Need a lose condition, if achieved, show game over message, then allow player to restart level or go back to start menu
// All levels can be paused, and player can restart level or go back to start menu from pause menu
// Use object pools for enemies, particles, sounds, music, etc.
class GameLevel extends Scene {
  constructor(game) {
    super(game);
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
    super.update(deltaTime);
    if (this.gameOver) {
      if (this.input.keys.includes(" ")) {
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
    super.draw(context);
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
export class LevelOne extends GameLevel {
  constructor(game) {
    super(game);
    console.log("Level One");
  }
  start() {}
  changeScene(input) {
    if (input.keys.includes("2")) {
      this.game.sceneManager.setScene("LEVEL_TWO");
    }
  }
}
export class LevelTwo extends GameLevel {
  constructor(game) {
    super(game);
    console.log("Level Two");
  }
  start() {}
  changeScene(input) {
    if (input.keys.includes("3")) {
      this.game.sceneManager.setScene("LEVEL_THREE");
    }
  }
}
export class LevelThree extends GameLevel {
  constructor(game) {
    super(game);
    console.log("Level Three");
  }
  start() {}
  changeScene(input) {
    if (input.keys.includes("4")) {
      this.game.sceneManager.setScene("GAME_COMPLETE");
    }
  }
}
// TODO: Game Complete Screen
// Some kind of congratulations message for a few seconds, can press a button to go to scoreboard screen
export class GameComplete extends Scene {
  constructor(game) {
    super(game);
    console.log("Game Complete");
  }
  start() {}
  changeScene(input) {
    if (input.keys.includes("5")) {
      this.game.sceneManager.setScene("SCOREBOARD");
    }
  }
}
// TODO: Scoreboard Screen
// Show high scores for each level, time taken to complete, total score, etc. can press a button to go to credits screen
export class Scoreboard extends Scene {
  constructor(game) {
    super(game);
    console.log("Scoreboard");
  }
  start() {}
  changeScene(input) {
    if (input.keys.includes("6")) {
      this.game.sceneManager.setScene("CREDITS");
    }
  }
}
// TODO: Credits Screen
// Show credits for the game, can press a button to go back to start menu
export class Credits extends Scene {
  constructor(game) {
    super(game);
    console.log("Credits");
  }
  start() {}
  changeScene(input) {
    if (input.keys.includes("7")) {
      this.game.sceneManager.setScene("START_MENU");
    }
  }
}
