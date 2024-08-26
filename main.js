import { InputHandler } from "./lib/InputHandler.js";
import { SceneManager } from "./lib/SceneManager.js";

window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas1");
  const context = canvas.getContext("2d");
  canvas.width = 1200;
  canvas.height = 500;

  class Game {
    constructor(canvas) {
      this.canvas = canvas;
      this.width = this.canvas.width;
      this.height = this.canvas.height;
      this.input = new InputHandler(this);
      this.sceneManager = new SceneManager(this);
      this.currentScene = this.sceneManager.setScene("START_MENU");
    }
    update(deltaTime) {
      this.sceneManager.update(deltaTime, this.input);
    }
    draw(context) {
      this.sceneManager.draw(context);
    }
  }

  const game = new Game(canvas);
  console.log(game);

  let previousTimestamp = 0;
  
  function animate(timeStamp) {
    const deltaTime = timeStamp - previousTimestamp;
    previousTimestamp = timeStamp;
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (!game.isPaused || game.gameOver) game.update(deltaTime);
    game.draw(context);
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
});
