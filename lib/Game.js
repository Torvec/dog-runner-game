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
    this.levelKeys = [];
    this.levelKeyIndex = 0;
    this.levels = {
      LEVEL_ONE: LevelOne,
      LEVEL_TWO: LevelTwo,
      LEVEL_THREE: LevelThree,
      LEVEL_FOUR: LevelFour,
    };
    this.levelKeys = Object.keys(this.levels); // Takes all of the keys from the levels object and puts them into an array in the order listed in the object
    this.menus = {
      START_MENU: StartMenu,
      HOW_TO_PLAY: HowToPlay,
      GAME_COMPLETE: GameComplete,
      SCOREBOARD: Scoreboard,
      CREDITS: Credits,
    };
    this.gameComplete = false; // This will be set to true when the player completes the last level
    this.overallScore = 0; // This will be the sum of all the scores from each level and will be shown on the game complete screen
    this.currentLevel = null;
    this.currentMenu = null;
    this.currentState = null;
    this.setMenu("START_MENU");
  }
  setMenu(menuName) {
    const menuClass = this.menus[menuName];
    const menuInstance = new menuClass(this);
    this.setGameState(menuInstance);
    this.currentMenu = menuName;
  }
  setLevel(levelName) {
    const LevelClass = this.levels[levelName];
    const levelInstance = new LevelClass(this);
    this.setGameState(levelInstance);
    this.currentLevel = levelName;
  }
  nextLevel() {
    this.levelKeyIndex++;
    if (this.levelKeyIndex > this.levelKeys.length - 1) {
      this.gameComplete = true;
      this.setMenu("GAME_COMPLETE");
    } else {
      this.setLevel(this.levelKeys[this.levelKeyIndex]);
    }
  }
  setGameState(state) {
    this.currentState = state;
    if (state.type === "level") {
      this.currentLevel = state;
      this.currentMenu = null;
    } else if (state.type === "menu") {
      this.currentMenu = state;
      this.currentLevel = null;
    }
  }
  render(deltaTime, c) {
    this.currentState.update(deltaTime);
    this.currentState.draw(c);
  }
}
