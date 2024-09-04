import { InputHandler } from "./InputHandler.js";
import {
  StartMenu,
  HowToPlay,
  // LevelOne,
  // LevelTwo,
  // LevelThree,
  // LevelFour,
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
    this.sceneKeys = [];
    this.sceneKeyIndex = 0;
    this.scenes = {
      START_MENU: StartMenu,
      HOW_TO_PLAY: HowToPlay,
      // LEVEL_ONE: LevelOne,
      // LEVEL_TWO: LevelTwo,
      // LEVEL_THREE: LevelThree,
      // LEVEL_FOUR: LevelFour,
      GAME_COMPLETE: GameComplete,
      SCOREBOARD: Scoreboard,
      CREDITS: Credits,
    };
    this.sceneKeys = Object.keys(this.scenes); // Takes all of the keys from the scenes object and puts them into an array in the order listed in the object
    this.setScene(this.sceneKeys[this.sceneKeyIndex]);
  }
  setScene(sceneName) {
    const SceneClass = this.scenes[sceneName];
    this.currentScene = new SceneClass(this);
    return this.currentScene;
  }
  nextScene() {
    this.sceneKeyIndex++;
    if (this.sceneKeyIndex > this.sceneKeys.length - 1) {
      this.sceneKeyIndex = 0;
    }
    this.setScene(this.sceneKeys[this.sceneKeyIndex]);
  }
  render(deltaTime, c) {
    this.currentScene.update(this.input.keys, deltaTime);
    this.currentScene.draw(c);
  }
}
