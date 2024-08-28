import {
  StartMenu,
  LevelOne,
  LevelTwo,
  LevelThree,
  GameComplete,
  Scoreboard,
  Credits,
} from "./scenes.js";

export class SceneManager {
  constructor(game) {
    this.game = game;
    this.currentScene = null; // Set to null on SceneManager instantiation
  }
  setScene(sceneName) {
    this.currentScene = null; // Set to null before setting a new scene
    switch (sceneName) {
      case "START_MENU":
        this.currentScene = new StartMenu(this.game);
        break;
      case "LEVEL_ONE":
        this.currentScene = new LevelOne(this.game);
        break;
      case "LEVEL_TWO":
        this.currentScene = new LevelTwo(this.game);
        break;
      case "LEVEL_THREE":
        this.currentScene = new LevelThree(this.game);
        break;
      case "GAME_COMPLETE":
        this.currentScene = new GameComplete(this.game);
        break;
      case "SCOREBOARD":
        this.currentScene = new Scoreboard(this.game);
        break;
      case "CREDITS":
        this.currentScene = new Credits(this.game);
        break;
    }
  }
  update() {
    this.currentScene.update();
  }
  draw(context) {
    this.currentScene.draw(context);
  }
}
