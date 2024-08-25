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

import { StartMenu } from "./StartMenu.js";
import { LevelOne } from "./LevelOne.js";
import { LevelTwo } from "./LevelTwo.js";
import { LevelThree } from "./LevelThree.js";
import { GameComplete } from "./GameComplete.js";
import { Scoreboard } from "./Scoreboard.js";
import { Credits } from "./Credits.js";

export class Scene {
  constructor(game) {
    this.game = game;
    this.width = this.game.width;
    this.height = this.game.height;
    this.sceneList = [
      new StartMenu(this.game),
      new LevelOne(this.game),
      new LevelTwo(this.game),
      new LevelThree(this.game),
      new GameComplete(this.game),
      new Scoreboard(this.game),
      new Credits(this.game),
    ];
    this.currentScene = null;
  }
  selectScene(state) {
    this.currentScene = this.sceneList[state];
    this.currentScene.start();
  }
  update() {
    this.currentScene.changeScene(input);
  }
  draw(context) {
    this.currentScene = this.sceneList[0];
    this.currentScene.start(context);
  }
}
