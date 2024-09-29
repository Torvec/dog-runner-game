import { Dust, Fire, Splash } from "./particles.js";

const controls = {
  moveLeft: "a",
  moveRight: "d",
  jump: "w",
  sit: "s",
  roll: "Shift",
  shoot: " ",
};

class PlayerState {
  constructor(state, level) {
    this.state = state;
    this.level = level;
  }
}

export class Sitting extends PlayerState {
  constructor(level) {
    super("SITTING", level);
  }
  enter() {
    this.level.player.frame.x = 0;
    this.level.player.maxFrame = 4;
    this.level.player.frame.y = 5;
  }
  handleInput(input) {
    if (
      input.includes(controls.moveLeft) ||
      input.includes(controls.moveRight)
    ) {
      this.level.player.setState("RUNNING", 1);
    } else if (
      input.includes(controls.roll) &&
      this.level.player.powerLevel > 0
    ) {
      this.level.player.setState("ROLLING", 2);
    } else if (input.includes(controls.jump)) {
      this.level.player.setState("JUMPING", 1);
    } else if (input.includes(controls.shoot)) {
      this.level.player.setState("SHOOTING", 0);
    }
  }
}

export class Running extends PlayerState {
  constructor(level) {
    super("RUNNING", level);
  }
  enter() {
    this.level.player.frame.x = 0;
    this.level.player.maxFrame = 8;
    this.level.player.frame.y = 3;
  }
  handleInput(input) {
    this.level.particles.unshift(
      new Dust(
        this.level,
        this.level.player.position.x + this.level.player.width * 0.6,
        this.level.player.position.y + this.level.player.height
      )
    );
    if (input.includes(controls.sit)) {
      this.level.player.setState("SITTING", 0);
    } else if (input.includes(controls.jump)) {
      this.level.player.setState("JUMPING", 1);
    } else if (
      input.includes(controls.roll) &&
      this.level.player.powerLevel > 0
    ) {
      this.level.player.setState("ROLLING", 2);
    } else if (input.includes(controls.shoot)) {
      this.level.player.setState("SHOOTING", 1);
    }
  }
}

export class Jumping extends PlayerState {
  constructor(level) {
    super("JUMPING", level);
  }
  enter() {
    if (this.level.player.onGround()) this.level.player.velocity.y -= 20;
    this.level.player.frame.x = 0;
    this.level.player.maxFrame = 6;
    this.level.player.frame.y = 1;
  }
  handleInput(input) {
    if (this.level.player.velocity.y > this.level.player.gravity) {
      this.level.player.setState("FALLING", 1);
    } else if (
      input.includes(controls.roll) &&
      this.level.player.powerLevel > 0
    ) {
      this.level.player.setState("ROLLING", 2);
    } else if (input.includes(controls.sit)) {
      this.level.player.setState("DIVING", 0);
    } else if (input.includes(controls.shoot)) {
      this.level.player.setState("SHOOTING", 1);
    }
  }
}

export class Falling extends PlayerState {
  constructor(level) {
    super("FALLING", level);
  }
  enter() {
    this.level.player.frame.x = 0;
    this.level.player.maxFrame = 6;
    this.level.player.frame.y = 2;
  }
  handleInput(input) {
    if (this.level.player.onGround()) {
      this.level.player.setState("RUNNING", 1);
    } else if (input.includes(controls.sit)) {
      this.level.player.setState("DIVING", 0);
    } else if (input.includes(controls.shoot)) {
      this.level.player.setState("SHOOTING", 1);
    }
  }
}

export class Rolling extends PlayerState {
  constructor(level) {
    super("ROLLING", level);
  }
  enter() {
    this.level.player.frame.x = 0;
    this.level.player.maxFrame = 6;
    this.level.player.frame.y = 6;
  }
  handleInput(input) {
    this.level.particles.unshift(
      new Fire(
        this.level,
        this.level.player.position.x + this.level.player.width * 0.5,
        this.level.player.position.y + this.level.player.height * 0.5
      )
    );
    if (
      (!input.includes(controls.roll) || this.level.player.powerLevel === 0) &&
      this.level.player.onGround()
    ) {
      this.level.player.setState("RUNNING", 1);
    } else if (
      !input.includes(controls.roll) &&
      !this.level.player.onGround()
    ) {
      this.level.player.setState("FALLING", 1);
    } else if (
      input.includes(controls.roll) &&
      input.includes(controls.jump) &&
      this.level.player.onGround()
    ) {
      this.level.player.velocity.y -= 20;
    } else if (input.includes(controls.sit) && !this.level.player.onGround()) {
      this.level.player.setState("DIVING", 0);
    }
  }
}

export class Diving extends PlayerState {
  constructor(level) {
    super("DIVING", level);
  }
  enter() {
    this.level.player.frame.x = 0;
    this.level.player.maxFrame = 6;
    this.level.player.frame.y = 6;
    this.level.player.velocity.y = 15;
    this.sound = new Audio("sounds/fire_ball.wav");
    this.sound.play();
  }
  handleInput(input) {
    this.level.particles.unshift(
      new Fire(
        this.level,
        this.level.player.position.x + this.level.player.width * 0.5,
        this.level.player.position.y + this.level.player.height * 0.5
      )
    );
    if (this.level.player.onGround()) {
      for (let i = 0; i < 30; i++) {
        this.level.particles.unshift(
          new Splash(
            this.level,
            this.level.player.position.x + this.level.player.width * 0.5,
            this.level.player.position.y + this.level.player.height
          )
        );
      }
      this.level.player.setState("RUNNING", 1);
      if (input.includes(controls.roll)) {
        this.level.player.setState("ROLLING", 2);
      }
    }
  }
}

export class Shooting extends PlayerState {
  constructor(level) {
    super("SHOOTING", level);
  }
  enter() {
    this.level.player.frame.x = 0;
    this.level.player.maxFrame = 6;
    this.level.player.frame.y = 7;
    this.level.player.shootProjectile();
  }
  handleInput(input) {
    if (this.level.player.frame.x >= this.level.player.maxFrame) {
      if (this.level.player.onGround()) {
        if (this.level.player.speed === 0)
          this.level.player.setState("SITTING", 0);
        if (input.includes(controls.jump))
          this.level.player.setState("JUMPING", 1);
      }
      if (!this.level.player.onGround()) {
        this.level.player.setState("FALLING", 1);
      }
      if (
        input.includes(controls.moveLeft) ||
        input.includes(controls.moveRight)
      ) {
        this.level.player.setState("RUNNING", 1);
      }
    }
  }
}

export class Hit extends PlayerState {
  constructor(level) {
    super("HIT", level);
  }
  enter() {
    this.level.player.frame.x = 0;
    this.level.player.maxFrame = 10;
    this.level.player.frame.y = 4;
    this.level.player.isInvincible = true;
  }
  handleInput() {
    if (this.level.player.frame.x >= this.level.player.maxFrame) {
      if (this.level.player.onGround()) {
        this.level.player.setState("SITTING", 0);
        this.level.player.isInvincible = false;
      }
      if (!this.level.player.onGround()) {
        this.level.player.setState("FALLING", 1);
        this.level.player.isInvincible = false;
      }
    }
  }
}
