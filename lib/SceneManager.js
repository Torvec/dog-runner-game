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
    this.currentScene = null;
  }
  setScene(sceneName) {
    this.currentScene = null;
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
    this.currentScene.start();
    return this.currentScene;
  }
  //! Need to refactor this, might not need changeScene method
  update(deltaTime, input) {
    this.currentScene.changeScene(input);
    this.currentScene.update(deltaTime);
  }
  //! Need to refactor this, might not need start method
  draw(context) {
    this.currentScene.start(context);
    this.currentScene.draw(context);
  }
}
