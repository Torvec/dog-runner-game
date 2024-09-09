import { InputHandler } from "./InputHandler.js";
import { LevelOne, LevelTwo, LevelThree, LevelFour } from "./levels.js";
import { StartMenu, HowToPlay, Scoreboard, Credits } from "./Menus.js";

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.input = new InputHandler(this);
    this.levels = {
      LEVEL_ONE: new LevelOne(this),
      LEVEL_TWO: new LevelTwo(this),
      LEVEL_THREE: new LevelThree(this),
      LEVEL_FOUR: new LevelFour(this),
    };
    this.currentLevel = null;
    this.setLevel("LEVEL_ONE");
    this.menus = {
      START_MENU: new StartMenu(this),
      HOW_TO_PLAY: new HowToPlay(this),
      SCOREBOARD: new Scoreboard(this),
      CREDITS: new Credits(this),
    };
    this.currentMenu = null;
  }
  setLevel(levelName) {
    this.currentLevel = this.levels[levelName];
    console.log(this.currentLevel);
  }
  update(deltaTime) {
    this.currentLevel.update(deltaTime);
  }
  draw(c) {
    this.currentLevel.draw(c);
  }
}
