// TODO: Add a start menu
// TODO: Add the ability to play multiple levels one after the other
// TODO: Add a game over screen for when the game is completed
// TODO: Add state management for the game, to keep track of what level or screen the game is on (start menu, game, game over, etc.)
// TODO: Make it playable on mobile devices
// TODO: Add sound effects
// TODO: Add music? (maybe)
// TODO: Add scoreboard system for each level and overal score, save in local storage (maybe)
// TODO: Change end level condition to be based on x distance traveled with minimum score threshold to pass

import { Scene } from "./scenes/Scene.js";
// import { Player } from "./Player.js";
import { InputHandler } from "./input.js";
// import { BackgroundForest, BackgroundCity } from "./background.js";
// import { FlyingEnemy, GroundEnemy, ClimbingEnemy } from "./enemies.js";
// import { UI } from "./ui.js";

export default class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.input = new InputHandler(this);
    this.scene = new Scene(this);
    this.scene.currentScene = this.scene.sceneList[0];
    this.scene.currentScene.start(this.context);
    // this.init();
  }
  init() {
    // this.groundMargin = 40;
    // this.speed = 0;
    // this.maxSpeed = 3;
    // this.currentLevel = 1;
    // this.background1 = new BackgroundForest(this);
    // this.background2 = new BackgroundCity(this);
    // this.player = new Player(this);
    // this.UI = new UI(this);
    // this.enemies = [];
    // this.particles = [];
    // this.collisions = [];
    // this.floatingMessages = [];
    // this.maxParticles = 200;
    // this.enemyTimer = 0;
    // this.enemeyInterval = 1000;
    // this.debug = false;
    // this.score = 0;
    // this.winningScore = 40;
    // this.fontColor = "black";
    // this.time = 0;
    // this.maxTime = 10000;
    // this.gameOver = false;
    // this.isPaused = false;
    // this.lives = 10;
    // this.player.currentState = this.player.states[0];
    // this.player.currentState.enter();
  }
  //! This will need to restart the level, not the game. Need to add level management first.
  restart() {
    this.init();
  }

  update(deltaTime) {
    if (this.gameOver) {
      if (this.input.keys.includes(" ")) {
        this.restart();
      }
      return;
    }
    this.time += deltaTime;
    if (this.time > this.maxTime) this.gameOver = true;
    // if (this.currentLevel === 1) {
    //   this.background1.update();
    // } else {
    //   this.background2.update();
    //   this.groundMargin = 80;
    // }
    // this.player.update(this.input.keys, deltaTime);
    // Handle Enemies
    // if (this.enemyTimer > this.enemeyInterval) {
    //   this.addEnemy();
    //   this.enemyTimer = 0;
    // } else {
    //   this.enemyTimer += deltaTime;
    // }
    // this.enemies.forEach((enemy) => {
    //   enemy.update(deltaTime);
    // });
    // Handle Particles
    // this.particles.forEach((particle) => {
    //   particle.update();
    // });
    // if (this.particles.length > this.maxParticles) {
    //   this.particles.length = this.maxParticles;
    // }
    // Handle Floating Messages
    // this.floatingMessages.forEach((message) => {
    //   message.update();
    // });
    // Handle Collisions
    // this.collisions.forEach((collision) => {
    //   collision.update(deltaTime);
    // });
    // Garbage Collection
    // this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);
    // this.particles = this.particles.filter(
    //   (particle) => !particle.markedForDeletion
    // );
    // this.collisions = this.collisions.filter(
    //   (collision) => !collision.markedForDeletion
    // );
    // this.floatingMessages = this.floatingMessages.filter(
    //   (message) => !message.markedForDeletion
    // );
  }
  draw(context) {
    this.scene.draw(context);
    // if (this.currentLevel === 1) {
    //   this.background1.draw(context);
    // } else {
    //   this.background2.draw(context);
    // }

    // this.player.draw(context);
    // this.enemies.forEach((enemy) => {
    //   enemy.draw(context);
    // });
    // this.particles.forEach((particle) => {
    //   particle.draw(context);
    // });
    // this.collisions.forEach((collision) => {
    //   collision.draw(context);
    // });
    // this.floatingMessages.forEach((message) => {
    //   message.draw(context);
    // });
    // this.UI.draw(context);
  }
  addEnemy() {
    // if (this.speed > 0 && Math.random() < 0.5)
    //   this.enemies.push(new GroundEnemy(this));
    // else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
    // this.enemies.push(new FlyingEnemy(this));
  }
}
