import { InputHandler } from "./InputHandler.js";
import { LevelOne, LevelTwo, LevelThree, LevelFour } from "./levels.js";
import {
  StartMenu,
  HowToPlay,
  GameComplete,
  Scoreboard,
  Credits,
} from "./Menus.js";
import { StateManager } from "./StateManager.js";

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.input = new InputHandler(this);
    this.stateManager = new StateManager(this);
    this.levelKeys = [];
    this.levelKeyIndex = 0;
    this.levels = {
      LEVEL_ONE: LevelOne,
      LEVEL_TWO: LevelTwo,
      LEVEL_THREE: LevelThree,
      LEVEL_FOUR: LevelFour,
    };
    this.levelKeys = Object.keys(this.levels); // Takes all of the keys from the levels object and puts them into an array in the order listed in the object
    // this.setLevel(this.levelKeys[this.levelKeyIndex]);
    this.gameComplete = false; // This will be set to true when the player completes the last level
    this.overallScore = 0; // This will be the sum of all the scores from each level and will be shown on the game complete screen
    this.menus = {
      START_MENU: new StartMenu(this),
      HOW_TO_PLAY: new HowToPlay(this),
      GAME_COMPLETE: new GameComplete(this),
      SCOREBOARD: new Scoreboard(this),
      CREDITS: new Credits(this),
    };
    this.setLevel("LEVEL_ONE");
    // this.setMenu("START_MENU");
  }
  setMenu(menuName) {
    this.stateManager.setState(this.menus[menuName]);
  }
  setLevel(levelName) {
    const LevelClass = this.levels[levelName];
    this.stateManager.setState(new LevelClass(this));
  }
  nextLevel() {
    this.levelKeyIndex++;
    if (this.levelKeyIndex > this.levelKeys.length - 1) {
      this.gameComplete = true;
      // this.levelKeyIndex = 0; // This will loop back to the first level, TODO: Needs to go to a game complete menu screen and set game complete to true
      this.setMenu("GAME_COMPLETE");
    } else {
      this.setLevel(this.levelKeys[this.levelKeyIndex]);
    }
  }
  render(deltaTime, c) {
    this.stateManager.render(deltaTime, c);
  }
}
