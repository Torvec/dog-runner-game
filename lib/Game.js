import { InputHandler } from "./InputHandler.js";
import {
  StartMenu,
  HowToPlay,
  LevelOne,
  LevelTwo,
  LevelThree,
  LevelFour,
  GameComplete,
  Scoreboard,
  Credits,
} from "./scenes.js";
import {
  Loading,
  Ready,
  Play,
  Paused,
  GameOver,
  LevelComplete,
} from "./sceneStates.js";

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.input = new InputHandler(this);
    this.sceneKeys = [];
    this.sceneKeyIndex = 0;
    this.sceneTypes = {
      MENU: "Menu",
      LEVEL: "Level",
    };
    this.scenes = {
      START_MENU: StartMenu,
      HOW_TO_PLAY: HowToPlay,
      LEVEL_ONE: LevelOne,
      LEVEL_TWO: LevelTwo,
      LEVEL_THREE: LevelThree,
      LEVEL_FOUR: LevelFour,
      GAME_COMPLETE: GameComplete,
      SCOREBOARD: Scoreboard,
      CREDITS: Credits,
    };
    this.sceneKeys = Object.keys(this.scenes); // Takes all of the keys from the scenes object and puts them into an array in the order listed in the object
    // this.sceneStates = {
    //   LOADING: new Loading(this),
    //   READY: new Ready(this),
    //   PLAY: new Play(this),
    //   PAUSED: new Paused(this),
    //   GAME_OVER: new GameOver(this),
    //   LEVEL_COMPLETE: new LevelComplete(this),
    // };
    this.setScene(this.sceneKeys[this.sceneKeyIndex]);
    // this.setSceneState("LOADING");
  }
  setScene(sceneName) {
    const SceneClass = this.scenes[sceneName];
    this.currentScene = new SceneClass(this, this.sceneTypes);
  }
  nextScene() {
    this.sceneKeyIndex++;
    if (this.sceneKeyIndex > this.sceneKeys.length - 1) {
      this.sceneKeyIndex = 0;
    }
    this.setScene(this.sceneKeys[this.sceneKeyIndex]);
  }
  // setSceneState(state) {
  //   this.currentState = this.sceneStates[state];
  //   this.currentState.enter();
  //   console.log(this.currentState.constructor.name);
  // }
  update(deltaTime) {
    this.currentScene.update(this.input.keys, deltaTime);
    // this.currentState.changeState(this.input.keys);
  }
  draw(c) {
    this.currentScene.draw(c);
  }
}
