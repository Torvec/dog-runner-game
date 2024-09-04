class SceneState {
  constructor(state, scene) {
    this.state = state;
    this.scene = scene;
  }
}

export class Loading extends SceneState {
  constructor(scene) {
    super("LOADING", scene);
    this.loading = true;
    this.loaded = false;
  }
  enter() {
    console.log("Loading Assets...");
    this.timeout = setTimeout(() => {
      this.loading = false;
      this.loaded = true;
      console.log("Assets Loaded");
    }, 2000);
  }
  changeState(input) {
    if (this.loaded) {
      clearInterval(this.timeout);
      this.scene.setSceneState("START");
    }
  }
}

export class Start extends SceneState {
  constructor(scene) {
    super("START", scene);
  }
  enter() {
    console.log("Ready to Start - Press Enter");
  }
  changeState(input) {
    if (input.includes("Enter")) {
      this.scene.setSceneState("PLAY");
    }
  }
}

export class Play extends SceneState {
  constructor(scene) {
    super("PLAY", scene);
    this.simulateLevelComplete = false;
    this.simulateGameOver = false;
  }
  enter() {
    console.log("Press Escape to Pause");
    console.log("Press 1 to simulate Level Complete");
    console.log("Press 2 to simulate Game Over");
  }
  changeState(input) {
    if (input.includes("Escape")) {
      this.isPaused = !this.isPaused;
      this.scene.setSceneState("PAUSED");
    }
    // if (this.scene.levelComplete) {
    //   this.scene.setSceneState("LEVEL_COMPLETE");
    // }
    if (input.includes("1")) {
      console.log("Simulating Level Complete...");
      this.scene.setSceneState("LEVEL_COMPLETE");
    }
    // if (this.scene.gameOver) {
    //   this.scene.setSceneState("GAME_OVER");
    // }
    if (input.includes("2")) {
      console.log("Simulating Game Over...");
      this.scene.setSceneState("GAME_OVER");
    }
  }
}

export class Paused extends SceneState {
  constructor(scene) {
    super("PAUSED", scene);
  }
  enter() {
    console.log("Press ESC to Resume");
    console.log("Press 1 to Restart");
    console.log("Press 2 to Quit to Start Menu");
  }
  changeState(input) {
    if (input.includes("Escape")) {
      this.isPaused = !this.isPaused
      this.scene.setSceneState("PLAY");
    }
    if (input.includes("1")) {
      this.scene.setSceneState("START");
    }
    if (input.includes("2")) {
      this.scene.game.setScene("START_MENU");
    }
  }
}

export class GameOver extends SceneState {
  constructor(scene) {
    super("GAME_OVER", scene);
  }
  enter() {
    console.log("Press Enter to Replay");
    console.log("Press Escape to Quit to Start Menu");
  }
  changeState(input) {
    if (input.includes("Enter")) {
      this.scene.setSceneState("START");
    }
    if (input.includes("Escape")) {
      this.scene.game.setScene("START_MENU");
    }
  }
}

export class LevelComplete extends SceneState {
  constructor(scene) {
    super("LEVEL_COMPLETE", scene);
  }
  enter() {
    console.log("Press Enter to Continue");
    console.log("Press Escape to Replay");
  }
  changeState(input) {
    if (input.includes("Enter")) {
      this.scene.game.nextScene();
    }
    if (input.includes("Escape")) {
      this.scene.setSceneState("START");
    }
  }
}
