import {
  Loading,
  Ready,
  Play,
  Paused,
  GameOver,
  LevelComplete,
} from "./sceneStates.js";
import { Player } from "./player.js";
import { FlyingEnemy, GroundEnemy, ClimbingEnemy } from "./enemies.js";
import {
  BackgroundStartMenu,
  BackgroundHowToPlay,
  BackgroundLevelOne,
  BackgroundLevelTwo,
  BackgroundLevelThree,
  BackgroundLevelFour,
  BackgroundGameComplete,
  BackgroundScoreboard,
  BackgroundCredits,
} from "./background.js";
import { UI } from "./UI.js";

class Scene {
  constructor(game, type) {
    this.game = game;
    this.type = type;
    this.input = this.game.input;
    this.width = this.game.width;
    this.height = this.game.height;
    this.sceneTypes = {
      MENU: "Menu",
      LEVEL: "Level",
    };
    this.sceneStates = {
      LOADING: new Loading(this),
      READY: new Ready(this),
      PLAY: new Play(this),
      PAUSED: new Paused(this),
      GAME_OVER: new GameOver(this),
      LEVEL_COMPLETE: new LevelComplete(this),
    };
    this.currentState = null;
    this.setSceneState("LOADING");
  }
  setSceneState(state) {
    console.log(`Setting scene state to ${state}`);
    this.currentState = this.sceneStates[state];
    this.currentState.enter();
  }
  update() {
    this.currentState.changeState(this.input.keys);
  }
  draw(c) {
    this.background.draw(c);
  }
}

class Level extends Scene {
  constructor(game) {
    super(game, "LEVEL");
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
    super.update(deltaTime);
    this.handlePauseToggle(this.input.keys);
    // if (this.handleGameOver()) return;
    if (!this.isPaused) {
      this.time -= deltaTime;
      this.background.update();
      this.player.update(this.input.keys, deltaTime);
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
  handlePauseToggle(input) {
    // Prevents multiple key presses of the escape key due to update loop running multiple times a second
    // Probably a better way to handle this, but it works for now so yeah...
    if (
      input.includes("Escape") &&
      !this.escapePressed &&
      !this.gameOver
    ) {
      this.isPaused = !this.isPaused;
      this.escapePressed = true;
    } else if (!input.includes("Escape")) {
      this.escapePressed = false;
    }
  }
  handleGameOver(input) {
    if (this.lives <= 0) {
      if (input.includes(" ")) {
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

export class LevelOne extends Level {
  constructor(game) {
    super(game);
    this.background = new BackgroundLevelOne(this);
  }

  restart() {
    this.game.setScene("LEVEL_ONE");
  }
}

export class LevelTwo extends Level {
  constructor(game) {
    super(game);
    this.background = new BackgroundLevelTwo(this);
  }
  update(deltaTime) {
    super.update(deltaTime);
    // if (this.handleLevelComplete("LEVEL_THREE")) return;
  }
  restart() {
    this.game.setScene("LEVEL_TWO");
  }
}

export class LevelThree extends Level {
  constructor(game) {
    super(game);
    this.background = new BackgroundLevelThree(this);
    this.groundMargin = 80;
  }
  update(deltaTime) {
    super.update(deltaTime);
    // if (this.handleLevelComplete("LEVEL_FOUR")) return;
  }
  restart() {
    this.game.setScene("LEVEL_THREE");
  }
}

export class LevelFour extends Level {
  constructor(game) {
    super(game);
    this.background = new BackgroundLevelFour(this);
    this.groundMargin = 80;
  }
  update(deltaTime) {
    super.update(deltaTime);
    // if (this.handleLevelComplete("GAME_COMPLETE")) return;
  }
  restart() {
    this.game.setScene("LEVEL_FOUR");
  }
}

export class StartMenu extends Scene {
  constructor(game) {
    super(game, "MENU");
    this.background = new BackgroundStartMenu(this);
    this.startMenuText = {
      title: "THE RUNNING DOG",
      playerActionText: "Press [ Enter ] to Play",
    };
    
  }
  update() {
    super.update();
  }
  draw(c) {
    super.draw(c);
    c.fillStyle = "WHITE";
    c.font = "100px Impact";
    c.textAlign = "center";
    c.fillText(
      this.startMenuText.title,
      this.game.width * 0.5,
      this.game.height * 0.5
    );
    c.font = "32px Impact";
    c.fillText(
      this.startMenuText.playerActionText,
      this.game.width * 0.5,
      this.game.height * 0.5 + 100
    );
  }
}

export class HowToPlay extends Scene {
  constructor(game) {
    super(game, "MENU");
    this.background = new BackgroundHowToPlay(this);
    this.howToPlayText = {
      title: "How to Play",
      controls: {
        title: "Controls",
        content:
          "Press [ ] to Move Left, [ ] to Move Right,  [ ] to Jump, [ ] to Dive Bomb, [ ] to Fire Roll",
      },
      objective: {
        title: "Objective",
        content:
          "Get the highest Score within the time limit and with as many lives as possible",
      },
      playerAction: "Press [ Enter ] to Continue",
    };
  }
  draw(c) {
    super.draw(c);
    c.fillStyle = "WHITE";
    c.font = "48px Impact";
    c.textAlign = "center";
    c.fillText(this.howToPlayText.title, this.game.width * 0.5, 74);
    c.font = "36px Impact";
    c.textAlign = "left";
    c.fillText(this.howToPlayText.controls.title, 50, 122);
    c.font = "24px Arial";
    c.fillText(this.howToPlayText.controls.content, 50, 150);
    c.font = "36px Impact";
    c.textAlign = "left";
    c.fillText(this.howToPlayText.objective.title, 50, 222);
    c.font = "24px Arial";
    c.fillText(this.howToPlayText.objective.content, 50, 250);
    c.font = "24px Impact";
    c.textAlign = "center";
    c.fillText(
      this.howToPlayText.playerAction,
      this.game.width * 0.5,
      this.game.height - 50
    );
  }
}

export class GameComplete extends Scene {
  constructor(game) {
    super(game, "MENU");
    this.background = new BackgroundGameComplete(this);
    this.text = "GAME COMPLETE";
  }
  draw(c) {
    super.draw(c);
    c.fillStyle = "WHITE";
    c.font = "32px Impact";
    c.textAlign = "center";
    c.fillText(this.text, this.game.width * 0.5, this.game.height * 0.5);
  }
}

export class Scoreboard extends Scene {
  constructor(game) {
    super(game, "MENU");
    this.background = new BackgroundScoreboard(this);
    this.text = "SCOREBOARD";
  }
  draw(c) {
    super.draw(c);
    c.fillStyle = "WHITE";
    c.font = "32px Impact";
    c.textAlign = "center";
    c.fillText(this.text, this.game.width * 0.5, this.game.height * 0.5);
  }
}

export class Credits extends Scene {
  constructor(game) {
    super(game, "MENU");
    this.background = new BackgroundCredits(this);
    this.text = "CREDITS";
  }
  draw(c) {
    super.draw(c);
    c.fillStyle = "WHITE";
    c.font = "32px Impact";
    c.textAlign = "center";
    c.fillText(this.text, this.game.width * 0.5, this.game.height * 0.5);
  }
}
