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
    this.menuKeys = [];
    this.menuKeysIndex = 0;
    this.menus = {
      START_MENU: StartMenu,
      HOW_TO_PLAY: HowToPlay,
      GAME_COMPLETE: GameComplete,
      SCOREBOARD: Scoreboard,
      CREDITS: Credits,
    };
    this.gameComplete = false; // This will be set to true when the player completes the last level
    this.overallScore = 0; // This will be the sum of all the scores from each level and will be shown on the game complete screen
    this.setMenu("START_MENU");
  }
  setMenu(menuName) {
    const menuClass = this.menus[menuName];
    this.stateManager.setState(new menuClass(this));
  }
  setLevel(levelName) {
    const LevelClass = this.levels[levelName];
    this.stateManager.setState(new LevelClass(this));
  }
  nextLevel() {
    this.levelKeyIndex++;
    if (this.levelKeyIndex > this.levelKeys.length - 1) {
      this.gameComplete = true;
      this.setMenu("START_MENU");
    } else {
      this.setLevel(this.levelKeys[this.levelKeyIndex]);
    }
  }
  render(deltaTime, c) {
    this.stateManager.render(deltaTime, c);
  }
}
