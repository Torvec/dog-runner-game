import { InputHandler } from "./lib/InputHandler.js";
import {
  StartMenu,
  LevelOne,
  LevelTwo,
  LevelThree,
  GameComplete,
  Scoreboard,
  Credits,
} from "./lib/scenes.js";

window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas1");
  const context = canvas.getContext("2d");
  canvas.width = 1200;
  canvas.height = 500;

  class Game {
    constructor(canvas) {
      this.canvas = canvas;
      this.width = this.canvas.width;
      this.height = this.canvas.height;
      this.input = new InputHandler(this);
      this.currentScene = this.setScene("START_MENU");
    }
    setScene(sceneName) {
      this.currentScene = null;
      switch (sceneName) {
        case "START_MENU":
          this.currentScene = new StartMenu(this);
          break;
        case "LEVEL_ONE":
          this.currentScene = new LevelOne(this);
          break;
        case "LEVEL_TWO":
          this.currentScene = new LevelTwo(this);
          break;
        case "LEVEL_THREE":
          this.currentScene = new LevelThree(this);
          break;
        case "GAME_COMPLETE":
          this.currentScene = new GameComplete(this);
          break;
        case "SCOREBOARD":
          this.currentScene = new Scoreboard(this);
          break;
        case "CREDITS":
          this.currentScene = new Credits(this);
          break;
      }
      return this.currentScene;
    }
    update(deltaTime) {
      this.currentScene.update(deltaTime);
    }
    draw(context) {
      this.currentScene.draw(context);
    }
  }

  const game = new Game(canvas);

  let previousTimestamp = 0;

  function animate(timeStamp) {
    const deltaTime = timeStamp - previousTimestamp;
    previousTimestamp = timeStamp;
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (!game.isPaused || game.gameOver) game.update(deltaTime);
    game.draw(context);
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
});
