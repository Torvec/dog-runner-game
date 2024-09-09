import { InputHandler } from "./InputHandler.js";
import { LevelOne, LevelTwo, LevelThree, LevelFour } from "./levels.js";
import { StartMenu, HowToPlay, Scoreboard, Credits } from "./Menus.js";

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.input = new InputHandler(this);
    this.currentLevel = null;
    this.levelKeys = [];
    this.levelKeyIndex = 0;
    this.levels = {
      LEVEL_ONE: LevelOne,
      LEVEL_TWO: LevelTwo,
      LEVEL_THREE: LevelThree,
      LEVEL_FOUR: LevelFour,
    };
    this.levelKeys = Object.keys(this.levels); // Takes all of the keys from the levels object and puts them into an array in the order listed in the object
    this.setLevel(this.levelKeys[this.levelKeyIndex]);
    this.gameComplete = false; // This will be set to true when the player completes the last level
    this.menus = {
      START_MENU: new StartMenu(this),
      HOW_TO_PLAY: new HowToPlay(this),
      SCOREBOARD: new Scoreboard(this),
      CREDITS: new Credits(this),
    };
    this.currentMenu = null;
  }
  setLevel(levelName) {
    const LevelClass = this.levels[levelName];
    this.currentLevel = new LevelClass(this);
  }
  nextLevel() {
    this.levelKeyIndex++;
    if (this.levelKeyIndex > this.levelKeys.length - 1) {
      this.levelKeyIndex = 0; // This will loop back to the first level, TODO: Needs to go to a game complete menu screen and set game complete to true
    }
    this.setLevel(this.levelKeys[this.levelKeyIndex]);
  }
  render(deltaTime, c) {
    this.currentLevel.update(deltaTime);
    this.currentLevel.draw(c);
  }
}
