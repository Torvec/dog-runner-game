import { InputHandler } from "./InputHandler.js";
import { StartMenu, HowToPlay, Scoreboard, Credits } from "./Menus.js";

export class Test {
  constructor(canvas) {
    console.log("Test constructor");
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.input = new InputHandler(this);
    this.currentMenu = null;
    this.menuStates = {
      START_MENU: new StartMenu(this),
      HOW_TO_PLAY: new HowToPlay(this),
      SCOREBOARD: new Scoreboard(this),
      CREDITS: new Credits(this),
    };
    this.setMenu("HOW_TO_PLAY");
  }
  setMenu(menuName) {
    this.currentMenu = this.menuStates[menuName];
  }
  update(deltaTime) {
    this.currentMenu.update(this.input.keys, deltaTime);
  }
  draw(c) {
    this.currentMenu.draw(c);
  }
}
