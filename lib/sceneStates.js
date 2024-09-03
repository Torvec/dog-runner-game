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
  changeState() {
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
  changeState() {
    if (this.scene.game.input.keys.includes("Enter")) {
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
    console.log("Playing...");
    console.log("Press Escape to Pause");
    console.log("Press 1 to simulate Level Complete");
    console.log("Press 2 to simulate Game Over");
  }
  changeState() {
    if (this.scene.game.input.keys.includes("Escape")) {
      this.scene.setSceneState("PAUSED");
    }
    // if (this.scene.levelComplete) {
    //   this.scene.setSceneState("LEVEL_COMPLETE");
    // }
    if (this.scene.game.input.keys.includes("1")) {
      console.log("Simulating Level Complete...");
      this.scene.setSceneState("LEVEL_COMPLETE");
    }
    // if (this.scene.gameOver) {
    //   this.scene.setSceneState("GAME_OVER");
    // }
    if (this.scene.game.input.keys.includes("2")) {
      console.log("Simulating Game Over...");
      this.scene.setSceneState("GAME_OVER");
    }
  }
}

export class Paused extends SceneState {
  constructor(scene) {
    super("PAUSED", scene);
    this.escapePressed = false;
    this.isPaused = true;
  }
  enter() {
    console.log("Paused");
    console.log("Press Enter to Resume");
    console.log("Press 1 to Restart");
    console.log("Press 2 to Quit to Start Menu");
  }
  changeState() {
    if (this.scene.game.input.keys.includes("Enter")) {
      this.scene.setSceneState("PLAY");
    }
    if (this.scene.game.input.keys.includes("1")) {
      this.scene.setSceneState("START");
    }
    if (this.scene.game.input.keys.includes("2")) {
      this.scene.game.setScene("START_MENU");
    }
  }
}

export class GameOver extends SceneState {
  constructor(scene) {
    super("GAME_OVER", scene);
  }
  enter() {
    console.log("Game Over");
    console.log("Press 3 to Replay");
    console.log("Press 4 to Quit to Start Menu");
  }
  changeState() {
    if (this.scene.game.input.keys.includes("3")) {
      this.scene.setSceneState("START");
    }
    if (this.scene.game.input.keys.includes("4")) {
      this.scene.game.setScene("START_MENU");
    }
  }
}

export class LevelComplete extends SceneState {
  constructor(scene) {
    super("LEVEL_COMPLETE", scene);
  }
  enter() {
    console.log("Level Complete");
    console.log("Press 3 to Continue");
    console.log("Press 4 to Replay");
  }
  changeState() {
    if (this.scene.game.input.keys.includes("3")) {
      this.scene.game.setScene("START_MENU");
    }
    if (this.scene.game.input.keys.includes("4")) {
      this.scene.setSceneState("START");
    }
  }
}
