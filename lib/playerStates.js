// TODO: Implement all 10 player states (7 are currently implemented)

import { Dust, Fire, Splash } from "./particles.js";

class PlayerState {
  constructor(state, gameLevel) {
    this.state = state;
    this.gameLevel = gameLevel;
  }
}

export class Sitting extends PlayerState {
  constructor(gameLevel) {
    super("SITTING", gameLevel);
  }
  enter() {
    this.gameLevel.player.frameX = 0;
    this.gameLevel.player.maxFrame = 4;
    this.gameLevel.player.frameY = 5;
  }
  handleInput(input) {
    if (input.includes("ArrowLeft") || input.includes("ArrowRight")) {
      this.gameLevel.player.setState("RUNNING", 1);
    } else if (input.includes("Shift")) {
      this.gameLevel.player.setState("ROLLING", 2);
    }
  }
}

export class Running extends PlayerState {
  constructor(gameLevel) {
    super("RUNNING", gameLevel);
  }
  enter() {
    this.gameLevel.player.frameX = 0;
    this.gameLevel.player.maxFrame = 8;
    this.gameLevel.player.frameY = 3;
  }
  handleInput(input) {
    this.gameLevel.particles.unshift(
      new Dust(
        this.gameLevel,
        this.gameLevel.player.x + this.gameLevel.player.width * 0.6,
        this.gameLevel.player.y + this.gameLevel.player.height
      )
    );
    if (input.includes("ArrowDown")) {
      this.gameLevel.player.setState("SITTING", 0);
    } else if (input.includes("ArrowUp")) {
      this.gameLevel.player.setState("JUMPING", 1);
    } else if (input.includes("Shift")) {
      this.gameLevel.player.setState("ROLLING", 2);
    }
  }
}

export class Jumping extends PlayerState {
  constructor(gameLevel) {
    super("JUMPING", gameLevel);
  }
  enter() {
    if (this.gameLevel.player.onGround()) this.gameLevel.player.vy -= 27;
    this.gameLevel.player.frameX = 0;
    this.gameLevel.player.maxFrame = 6;
    this.gameLevel.player.frameY = 1;
  }
  handleInput(input) {
    if (this.gameLevel.player.vy > this.gameLevel.player.weight) {
      this.gameLevel.player.setState("FALLING", 1);
    } else if (input.includes("Shift")) {
      this.gameLevel.player.setState("ROLLING", 2);
    } else if (input.includes("ArrowDown")) {
      this.gameLevel.player.setState("DIVING", 0);
    }
  }
}

export class Falling extends PlayerState {
  constructor(gameLevel) {
    super("FALLING", gameLevel);
  }
  enter() {
    this.gameLevel.player.frameX = 0;
    this.gameLevel.player.maxFrame = 6;
    this.gameLevel.player.frameY = 2;
  }
  handleInput(input) {
    if (this.gameLevel.player.onGround()) {
      this.gameLevel.player.setState("RUNNING", 1);
    } else if (input.includes("ArrowDown")) {
      this.gameLevel.player.setState("DIVING", 0);
    }
  }
}

export class Rolling extends PlayerState {
  constructor(gameLevel) {
    super("ROLLING", gameLevel);
  }
  enter() {
    this.gameLevel.player.frameX = 0;
    this.gameLevel.player.maxFrame = 6;
    this.gameLevel.player.frameY = 6;
  }
  handleInput(input) {
    this.gameLevel.particles.unshift(
      new Fire(
        this.gameLevel,
        this.gameLevel.player.x + this.gameLevel.player.width * 0.5,
        this.gameLevel.player.y + this.gameLevel.player.height * 0.5
      )
    );
    if (!input.includes("Shift") && this.gameLevel.player.onGround()) {
      this.gameLevel.player.setState("RUNNING", 1);
    } else if (!input.includes("Shift") && !this.gameLevel.player.onGround()) {
      this.gameLevel.player.setState("FALLING", 1);
    } else if (
      input.includes("Shift") &&
      input.includes("ArrowUp") &&
      this.gameLevel.player.onGround()
    ) {
      this.gameLevel.player.vy -= 27;
    } else if (input.includes("ArrowDown") && !this.gameLevel.player.onGround()) {
      this.gameLevel.player.setState("DIVING", 0);
    }
  }
}

export class Diving extends PlayerState {
  constructor(gameLevel) {
    super("DIVING", gameLevel);
  }
  enter() {
    this.gameLevel.player.frameX = 0;
    this.gameLevel.player.maxFrame = 6;
    this.gameLevel.player.frameY = 6;
    this.gameLevel.player.vy = 15;
  }
  handleInput(input) {
    this.gameLevel.particles.unshift(
      new Fire(
        this.gameLevel,
        this.gameLevel.player.x + this.gameLevel.player.width * 0.5,
        this.gameLevel.player.y + this.gameLevel.player.height * 0.5
      )
    );
    if (this.gameLevel.player.onGround()) {
      this.gameLevel.player.setState("RUNNING", 1);
      for (let i = 0; i < 30; i++) {
        this.gameLevel.particles.unshift(
          new Splash(
            this.gameLevel,
            this.gameLevel.player.x + this.gameLevel.player.width * 0.5,
            this.gameLevel.player.y + this.gameLevel.player.height
          )
        );
      }
    } else if (input.includes("Shift") && this.gameLevel.player.onGround()) {
      this.gameLevel.player.setState("ROLLING", 2);
    }
  }
}

export class Hit extends PlayerState {
  constructor(gameLevel) {
    super("HIT", gameLevel);
  }
  enter() {
    this.gameLevel.player.frameX = 0;
    this.gameLevel.player.maxFrame = 10;
    this.gameLevel.player.frameY = 4;
  }
  handleInput() {
    if (this.gameLevel.player.frameX >= 10 && this.gameLevel.player.onGround()) {
      this.gameLevel.player.setState("RUNNING", 1);
    } else if (this.gameLevel.player.frameX >= 10 && !this.gameLevel.player.onGround()) {
      this.gameLevel.player.setState("FALLING", 1);
    }
  }
}
