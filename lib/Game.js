import { InputHandler } from "./InputHandler.js";
import { LevelOne, LevelTwo, LevelThree, LevelFour } from "./levels.js";
import {
  StartMenu,
  HowToPlay,
  GameComplete,
  Scoreboard,
  Credits,
} from "./Menus.js";
import { saveFinalScore } from "./highScores.js";

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
    this.gameComplete = false;
    this.sound = new Audio();
    this.sound.src = "../assets/sounds/loop_run_for_your_life_02.wav";
    this.sound.loop = true;
    this.sound.volume = 0.5;
    this.pKeyPressed = false;
    this.firstStart = true;
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
        saveFinalScore();
      }
      this.setScene(nextSceneKey);
    }
  }
  handleMusic(input) {
    if (input.includes("p") && !this.sound.paused && !this.pKeyPressed) {
      this.sound.pause();
      this.pKeyPressed = true;
    } else if (!input.includes("p")) this.pKeyPressed = false;
    if (input.includes("p") && this.sound.paused && !this.pKeyPressed) {
      this.sound.play();
      this.pKeyPressed = true;
    } else if (!input.includes("p")) this.pKeyPressed = false;
  }
  render(deltaTime, c) {
    this.currentScene.update(deltaTime);
    this.currentScene.draw(c);
    this.handleMusic(this.input.keys);
  }
}
