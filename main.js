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

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.input = new InputHandler(this);
    this.scenes = {
      START_MENU: StartMenu,
      LEVEL_ONE: LevelOne,
      LEVEL_TWO: LevelTwo,
      LEVEL_THREE: LevelThree,
      GAME_COMPLETE: GameComplete,
      SCOREBOARD: Scoreboard,
      CREDITS: Credits,
    };
    this.currentScene = this.setScene("START_MENU");
  }
  setScene(sceneName) {
    const SceneClass = this.scenes[sceneName];
    this.currentScene = new SceneClass(this);
    return this.currentScene;
  }
  render(deltaTime, context) {
    this.currentScene.update(deltaTime);
    this.currentScene.draw(context);
  }
}

window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas1");
  const context = canvas.getContext("2d");
  canvas.width = 1200;
  canvas.height = 500;

  const game = new Game(canvas);

  let previousTimestamp = 0;

  function animate(timeStamp) {
    const deltaTime = timeStamp - previousTimestamp;
    previousTimestamp = timeStamp;
    context.clearRect(0, 0, canvas.width, canvas.height);
    game.render(deltaTime, context);
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
});
