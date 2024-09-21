// Find the audio file(s) to play from the provided json file
// Play Background Music on loop unless paused or changed to a different track when a player goes to/from a menu or to/from a level
// Pause and resume play of the background music via key press at all times
// The play/pause state of the music should be saved in local storage
// FOr one off sound effects need to be able to play the sound whenever the event for it is triggered
// For looping sound effects, need to be able to play the sound on loop until the event is over or anytime a menu in game is open (i.e. pause, level complete, game over)
//! BUG: Background music pauses and resumes like it should when you first go to the start menu, but when you go to another menu you can't pause and when you come back to the start menu you can't pause, it just plays the same track on top of itself

import { loadJsonData } from "./utils.js";
const soundData = await loadJsonData("../assets/data/sounds.json");

class Sound {
  constructor(game, type, name) {
    this.game = game;
    this.input = this.game.input;
    this.data = soundData;
    this.initSound(type, name);
  }
  initSound(type, name) {
    this.sound = new Audio(this.getSoundFileName(type, name));
    this.sound.volume = 1.0;
  }
  getSoundFileName(type, name) {
    if (type === "backgroundMusic") return this.data.backgroundMusic[name];
    if (type === "soundEffect") return this.data.soundEffects[name];
  }
  playOnce() {
    this.sound.loop = false;
    this.sound.play();
    this.soundPaused = false;
  }
  playLoop() {
    this.sound.loop = true;
    this.sound.play();
    this.soundPaused = false;
  }
  pause() {
    this.sound.pause();
    this.soundPaused = true;
  }
  stop() {
    this.sound.pause();
    this.sound.currentTime = 0;
  }
}

export class BackgroundMusic extends Sound {
  constructor(game, type, name) {
    super(game, type, name);
    this.sound.volume = 0.3;
    this.pKeyPressed = false;
    this.currentTrack = null;
    this.handlePauseAndPlay(this.input.keys);
  }
  handlePauseAndPlay(input) {
    if (input.includes("p") && !this.soundPaused && !this.pKeyPressed) {
      this.pause();
      this.pKeyPressed = true;
    } else if (!input.includes("p")) this.pKeyPressed = false;
    if (input.includes("p") && this.soundPaused && !this.pKeyPressed) {
      this.playLoop();
      this.pKeyPressed = true;
    } else if (!input.includes("p")) this.pKeyPressed = false;
  }
  stopCurrentTrack() {
    if (this.currentTrack) this.currentTrack.stop();
  }
  playTrack(name) {
    this.stopCurrentTrack();
    this.initSound("backgroundMucic", name);
    this.playLoop();
    this.currentTrack = this;
  }
}

export class SoundEffect extends Sound {
  constructor(game, name) {
    super(game, "soundEffect", name);
  }
  handlePlayEvent(condition) {
    if (condition) this.playOnce();
  }
  handlePlayEventLooped(condition) {
    if (condition) {
      this.playLoop();
      this.sound.volume = 0.25;
    } else if (
      this.game.level.isPaused ||
      this.game.level.levelComplete ||
      this.game.level.gameOver
    )
      this.stop();
  }
}
