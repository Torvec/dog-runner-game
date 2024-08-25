class Scene {
  constructor(game) {
    this.game = game;
  }
}
export class StartMenu extends Scene {
  constructor(game) {
    super(game);
    console.log("Start Menu");
  }
  start() {
    console.log("Start Menu Started");
  }
  changeScene(input) {
    if (input.includes("1")) {
      this.game.sceneManager.setScene("LEVEL_ONE");
    }
  }
}
class GameLevel extends Scene {
  constructor(game) {
    super(game);
  }
}
export class LevelOne extends GameLevel {
  constructor(game) {
    super(game);
    console.log("Level One");
  }
  start() {
    console.log("Level One Started");
  }
  changeScene(input) {
    if (input.includes("2")) {
      this.game.sceneManager.setScene("LEVEL_TWO");
    }
  }
}
export class LevelTwo extends GameLevel {
  constructor(game) {
    super(game);
    console.log("Level Two");
  }
  start() {
    console.log("Level Two Started");
  }
  changeScene(input) {
    if (input.includes("3")) {
      this.game.sceneManager.setScene("LEVEL_THREE");
    }
  }
}
export class LevelThree extends GameLevel {
  constructor(game) {
    super(game);
    console.log("Level Three");
  }
  start() {
    console.log("Level Three Started");
  }
  changeScene(input) {
    if (input.includes("4")) {
      this.game.sceneManager.setScene("GAME_COMPLETE");
    }
  }
}
export class GameComplete extends Scene {
  constructor(game) {
    super(game);
    console.log("Game Complete");
  }
  start() {
    console.log("Game Complete Started");
  }
  changeScene(input) {
    if (input.includes("5")) {
      this.game.sceneManager.setScene("SCOREBOARD");
    }
  }
}
export class Scoreboard extends Scene {
  constructor(game) {
    super(game);
    console.log("Scoreboard");
  }
  start() {
    console.log("Scoreboard Started");
  }
  changeScene(input) {
    if (input.includes("6")) {
      this.game.sceneManager.setScene("CREDITS");
    }
  }
}
export class Credits extends Scene {
  constructor(game) {
    super(game);
    console.log("Credits");
  }
  start() {
    console.log("Credits Started");
  }
  changeScene(input) {
    if (input.includes("7")) {
      this.game.sceneManager.setScene("START_MENU");
    }
  }
}
