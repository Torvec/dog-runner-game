// Handle sound effects, one shots and looped
// Handle music, looped with the ability pause and play
// Handle saving the play/pause state of the music in local storage
import { loadJsonData } from "./utils.js";
const soundData = await loadJsonData("../assets/data/sounds.json");

class Sound {
  constructor(game, file) {
    this.game = game;
    this.input = this.game.input;
    this.data = soundData;
    this.sound = new Audio();
    this.sound.src = `${this.data.rootDirectory}${file}`;
    this.sound.volume = 1.0;
  }
}

export class BackgroundMusic extends Sound {
  constructor(game, file) {
    super(game, file);
    this.sound.loop = true;
    this.sound.volume = 0.3;
    this.pKeyPressed = false;
    this.handlePauseAndPlay(this.input.keys);
  }
  handlePauseAndPlay(input) {
    if (input.includes("p") && !this.sound.paused && !this.pKeyPressed) {
      this.sound.pause();
      this.pKeyPressed = true;
    } else if (!input.includes("p")) this.pKeyPressed = false;
    if (input.includes("p") && this.sound.paused && !this.pKeyPressed) {
      this.sound.play();
      this.pKeyPressed = true;
    } else if (!input.includes("p")) this.pKeyPressed = false;
  }
}

export class SoundEffect extends Sound {
  constructor(game, file) {
    super(game, file);
    this.sound.loop = false;
  }
  handlePlayEvent(condition) {
    if (condition) this.sound.play();
  }
}
