import { InputHandler } from "./InputHandler.js";
import { LevelOne, LevelTwo, LevelThree, LevelFour } from "./levels.js";
import {
  StartMenu,
  HowToPlay,
  GameComplete,
  Scoreboard,
  Credits,
} from "./Menus.js";

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.input = new InputHandler(this);
    this.sceneKeys = [];
    this.sceneKeyIndex = 0;
    this.scenes = {
      LEVEL_ONE: LevelOne,
      LEVEL_TWO: LevelTwo,
      LEVEL_THREE: LevelThree,
      LEVEL_FOUR: LevelFour,
      GAME_COMPLETE: GameComplete,
      START_MENU: StartMenu,
      HOW_TO_PLAY: HowToPlay,
      SCOREBOARD: Scoreboard,
      CREDITS: Credits,
    };
    this.sceneKeys = Object.keys(this.scenes);
    this.gameComplete = false; // This will be set to true when the player completes the last level
    this.finalScore = 0; // This will be the sum of all the scores from each level and will be shown on the game complete screen
    this.setScene("START_MENU");
  }
  setScene(sceneName) {
    const SceneClass = this.scenes[sceneName];
    const sceneInstance = new SceneClass(this);
    sceneInstance.name = sceneName;
    this.currentScene = sceneInstance;
  }
  nextScene() {
    this.sceneKeyIndex++;
    if (this.sceneKeyIndex < this.sceneKeys.length) {
      const nextSceneKey = this.sceneKeys[this.sceneKeyIndex];
      if (nextSceneKey === "GAME_COMPLETE") {
        this.gameComplete = true;
      }
      this.setScene(nextSceneKey);
    }
  }
  render(deltaTime, c) {
    this.currentScene.update(deltaTime);
    this.currentScene.draw(c);
  }
}
