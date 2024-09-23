import { InputHandler } from "./InputHandler.js";
import { Music } from "./Music.js";
import { LevelOne, LevelTwo, LevelThree, LevelFour } from "./Levels.js";
import {
  Intro,
  StartMenu,
  Tutorial,
  HowToPlay,
  GameComplete,
  Scoreboard,
  Credits,
} from "./Menus.js";
import { saveFinalScore } from "./utils.js";

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.input = new InputHandler(this, this.canvas);
    this.music = new Music(this);
    this.sceneKeys = [];
    this.sceneKeyIndex = 0;
    this.scenes = {
      LEVEL_ONE: LevelOne,
      LEVEL_TWO: LevelTwo,
      LEVEL_THREE: LevelThree,
      LEVEL_FOUR: LevelFour,
      GAME_COMPLETE: GameComplete,
      INTRO: Intro,
      START_MENU: StartMenu,
      TUTORIAL: Tutorial,
      HOW_TO_PLAY: HowToPlay,
      SCOREBOARD: Scoreboard,
      CREDITS: Credits,
    };
    this.sceneKeys = Object.keys(this.scenes);
    this.gameComplete = false;
    this.setScene("INTRO");
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
        this.music.changeTrack();
        this.gameComplete = true;
        saveFinalScore();
      }
      this.setScene(nextSceneKey);
    }
  }
  render(deltaTime, c) {
    this.currentScene.update(deltaTime);
    this.currentScene.draw(c);
    this.music.togglePause(this.input.keys);
  }
}
