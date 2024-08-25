// TODO: Scene State management
// On Load -> Start Menu, Press Play -> Level 1, Complete Level 1 -> Level 2, Complete Level 2 -> Level 3, Complete Level 3 -> Game Complete Screen -> Scoreboard Screen -> Credits Screen -> Start Menu Screen
// TODO: Start menu screen: Play, Credits, Scoreboard, Fullscreen, Music on/off, Sound on/off
// TODO: Game Levels
// Need a win condition, if achieved, show level complete message, then move to next level
// Need a lose condition, if achieved, show game over message, then allow player to restart level or go back to start menu
// All levels can be paused, and player can restart level or go back to start menu from pause menu
// Use object pools for enemies, particles, sounds, music, etc.
// TODO: Level 1: Forest
// TODO: Level 2: City
// TODO: Level 3: ???
// TODO: Game Complete Screen
// Some kind of congratulations message for a few seconds, can press a button to go to scoreboard screen
// TODO: Scoreboard Screen
// Show high scores for each level, time taken to complete, total score, etc. can press a button to go to credits screen
// TODO: Credits Screen
// Show credits for the game, can press a button to go back to start menu
// TODO: Back to start menu screen

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
      default:
        console.error(`Unknown scene: ${sceneName}`);
    }
    this.currentScene.start();
    return this.currentScene;
  }
  getCurrentScene() {
    return this.currentScene;
  }
  update(input) {
    this.currentScene.changeScene(input);
  }
  draw(context) {
    this.currentScene.start(context);
  }
}
