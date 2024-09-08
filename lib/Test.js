import { InputHandler } from "./InputHandler.js";
import { StartMenu, HowToPlay, Scoreboard, Credits } from "./Menus.js";

export class Test {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.input = new InputHandler(this);
    this.currentMenu = null;
    this.menuList = {
      START_MENU: new StartMenu(this),
      HOW_TO_PLAY: new HowToPlay(this),
      SCOREBOARD: new Scoreboard(this),
      CREDITS: new Credits(this),
    };
    this.setMenu("START_MENU");
    this.keyPressed = false; // Prevents multiple key presses from registering
    this.gameCompleted = false;
  }
  setMenu(menuName) {
    this.currentMenu = this.menuList[menuName];
  }
  handleMenuChange(input) {
    if (input.includes("1") && !this.keyPressed) {
      this.setMenu("HOW_TO_PLAY");
      this.keyPressed = true;
    } else if (input.includes("2") && !this.keyPressed) {
      this.setMenu("SCOREBOARD");
      this.keyPressed = true;
    } else if (input.includes("3") && !this.keyPressed) {
      this.setMenu("CREDITS");
      this.keyPressed = true;
    } else if (input.length === 0) {
      this.keyPressed = false;
    }
  }
  update(deltaTime) {
    this.handleMenuChange(this.input.keys);
    this.currentMenu.update(this.input.keys, deltaTime);
  }
  draw(c) {
    this.currentMenu.draw(c);
  }
}
