import { InputHandler } from "./InputHandler.js";
import {
  StartMenu,
  LevelOne,
  LevelTwo,
  LevelThree,
  GameComplete,
  Scoreboard,
  Credits,
} from "./scenes.js";

export class Game {
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
  render(deltaTime, c) {
    this.currentScene.update(deltaTime);
    this.currentScene.draw(c);
  }
}
