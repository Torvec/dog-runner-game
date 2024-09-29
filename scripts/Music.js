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
    this.levelMusicList = levelMusicList.map((music) => new Audio(music));
    this.currentMusic = this.menuMusic;
    this.pKeyPressed = false;
    this.musicPaused = this.checkPauseState();
    this.levelMusicList.forEach((audio) => {
      audio.addEventListener("ended", () => {
        this.playNextTrack();
      });
    });
  }
  initPlay() {
    this.currentMusic.loop = true;
    this.currentMusic.volume = 0.3;
    if (!this.checkPauseState()) {
      this.currentMusic.play();
    }
  }
  checkPauseState() {
    let isMusicPaused = localStorage.getItem("musicPaused");
    if (isMusicPaused === null) {
      isMusicPaused = "false";
      this.musicPaused = isMusicPaused;
      this.storePausedState("musicPaused", isMusicPaused);
    }
    return isMusicPaused === "true";
  }
  storePausedState() {
    localStorage.setItem("musicPaused", this.musicPaused);
  }
  togglePause(input) {
    if (input.includes("p") && !this.pKeyPressed) {
      if (this.musicPaused) {
        this.currentMusic.play();
        this.musicPaused = false;
      } else {
        this.currentMusic.pause();
        this.musicPaused = true;
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
    if (this.currentMusic === this.menuMusic) {
      this.currentTrackIndex = 0;
      this.currentMusic = this.levelMusicList[this.currentTrackIndex];
      this.currentMusic.loop = false;
    } else {
      this.currentMusic = this.menuMusic;
      this.currentMusic.loop = true;
    }
    this.currentMusic.volume = 0.3;
    if (!this.musicPaused) this.currentMusic.play();
  }
  playNextTrack() {
    this.stopTrack();
    this.currentTrackIndex =
      (this.currentTrackIndex + 1) % this.levelMusicList.length;
    this.currentMusic = this.levelMusicList[this.currentTrackIndex];
    this.currentMusic.volume = 0.3;
    this.currentMusic.play();
  }
}
