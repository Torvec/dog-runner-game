// TODO: Implement all 10 player states (7 are currently implemented)

import { Dust, Fire, Splash } from "./particles.js";

class PlayerState {
  constructor(state, game) {
    this.state = state;
    this.game = game;
  }
}

export class Sitting extends PlayerState {
  constructor(game) {
    super("SITTING", game);
  }
  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 4;
    this.game.player.frameY = 5;
  }
  handleInput(input) {
    if (input.includes("ArrowLeft") || input.includes("ArrowRight")) {
      this.game.player.setState("RUNNING", 1);
    } else if (input.includes("Enter")) {
      this.game.player.setState("ROLLING", 2);
    }
  }
}

export class Running extends PlayerState {
  constructor(game) {
    super("RUNNING", game);
  }
  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 8;
    this.game.player.frameY = 3;
  }
  handleInput(input) {
    this.game.particles.unshift(
      new Dust(
        this.game,
        this.game.player.x + this.game.player.width * 0.6,
        this.game.player.y + this.game.player.height
      )
    );
    if (input.includes("ArrowDown")) {
      this.game.player.setState("SITTING", 0);
    } else if (input.includes("ArrowUp")) {
      this.game.player.setState("JUMPING", 1);
    } else if (input.includes("Enter")) {
      this.game.player.setState("ROLLING", 2);
    }
  }
}

export class Jumping extends PlayerState {
  constructor(game) {
    super("JUMPING", game);
  }
  enter() {
    if (this.game.player.onGround()) this.game.player.vy -= 27;
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 6;
    this.game.player.frameY = 1;
  }
  handleInput(input) {
    if (this.game.player.vy > this.game.player.weight) {
      this.game.player.setState("FALLING", 1);
    } else if (input.includes("Enter")) {
      this.game.player.setState("ROLLING", 2);
    } else if (input.includes("ArrowDown")) {
      this.game.player.setState("DIVING", 0);
    }
  }
}

export class Falling extends PlayerState {
  constructor(game) {
    super("FALLING", game);
  }
  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 6;
    this.game.player.frameY = 2;
  }
  handleInput(input) {
    if (this.game.player.onGround()) {
      this.game.player.setState("RUNNING", 1);
    } else if (input.includes("ArrowDown")) {
      this.game.player.setState("DIVING", 0);
    }
  }
}

export class Rolling extends PlayerState {
  constructor(game) {
    super("ROLLING", game);
  }
  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 6;
    this.game.player.frameY = 6;
  }
  handleInput(input) {
    this.game.particles.unshift(
      new Fire(
        this.game,
        this.game.player.x + this.game.player.width * 0.5,
        this.game.player.y + this.game.player.height * 0.5
      )
    );
    if (!input.includes("Enter") && this.game.player.onGround()) {
      this.game.player.setState("RUNNING", 1);
    } else if (!input.includes("Enter") && !this.game.player.onGround()) {
      this.game.player.setState("FALLING", 1);
    } else if (
      input.includes("Enter") &&
      input.includes("ArrowUp") &&
      this.game.player.onGround()
    ) {
      this.game.player.vy -= 27;
    } else if (input.includes("ArrowDown") && !this.game.player.onGround()) {
      this.game.player.setState("DIVING", 0);
    }
  }
}

export class Diving extends PlayerState {
  constructor(game) {
    super("DIVING", game);
  }
  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 6;
    this.game.player.frameY = 6;
    this.game.player.vy = 15;
  }
  handleInput(input) {
    this.game.particles.unshift(
      new Fire(
        this.game,
        this.game.player.x + this.game.player.width * 0.5,
        this.game.player.y + this.game.player.height * 0.5
      )
    );
    if (this.game.player.onGround()) {
      this.game.player.setState("RUNNING", 1);
      for (let i = 0; i < 30; i++) {
        this.game.particles.unshift(
          new Splash(
            this.game,
            this.game.player.x + this.game.player.width * 0.5,
            this.game.player.y + this.game.player.height
          )
        );
      }
    } else if (input.includes("Enter") && this.game.player.onGround()) {
      this.game.player.setState("ROLLING", 2);
    }
  }
}

export class Hit extends PlayerState {
  constructor(game) {
    super("HIT", game);
  }
  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 10;
    this.game.player.frameY = 4;
  }
  handleInput() {
    if (this.game.player.frameX >= 10 && this.game.player.onGround()) {
      this.game.player.setState("RUNNING", 1);
    } else if (this.game.player.frameX >= 10 && !this.game.player.onGround()) {
      this.game.player.setState("FALLING", 1);
    }
  }
}
