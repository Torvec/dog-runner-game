const menuMusic = "../assets/music/run_for_your_life_00.wav";
const levelMusicList = [
  "../assets/music/run_for_your_life_01.wav",
  "../assets/music/run_for_your_life_02.wav",
  "../assets/music/run_for_your_life_03.wav",
];

export class Music {
  constructor(game) {
    this.game = game;
    this.input = this.game.input;
    this.menuMusic = new Audio(menuMusic);
    this.levelMusic = new Audio(levelMusicList[2]);
    this.currentMusic = this.menuMusic;
    this.pKeyPressed = false;
    this.soundPaused = this.checkPauseState();
  }
  initPlay() {
    this.currentMusic.loop = true;
    this.currentMusic.volume = 0.3;
    if (!this.checkPauseState()) {
      this.currentMusic.play();
    }
  }
  checkPauseState() {
    let isSoundPaused = localStorage.getItem("soundPaused");
    if (isSoundPaused === null) {
      isSoundPaused = "false";
      this.soundPaused = isSoundPaused;
      this.storePausedState("soundPaused", isSoundPaused);
    }
    return isSoundPaused === "true";
  }
  storePausedState() {
    localStorage.setItem("soundPaused", this.soundPaused);
  }
  togglePause(input) {
    if (input.includes("p") && !this.pKeyPressed) {
      if (this.soundPaused) {
        this.currentMusic.play();
        this.soundPaused = false;
      } else {
        this.currentMusic.pause();
        this.soundPaused = true;
      }
      this.storePausedState();
      this.pKeyPressed = true;
    } else if (!input.includes("p")) {
      this.pKeyPressed = false;
    }
  }
  stopTrack() {
    this.currentMusic.pause();
    this.currentMusic.currentTime = 0;
  }
  changeTrack() {
    this.stopTrack();
    this.currentMusic =
      this.currentMusic === this.menuMusic ? this.levelMusic : this.menuMusic;
    this.currentMusic.loop = true;
    this.currentMusic.volume = 0.3;
    this.currentMusic.play();
  }
}
