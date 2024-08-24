// TODO: Add touch controls for mobile, change control scheme for desktop

export class InputHandler {
  constructor(game) {
    this.game = game;
    this.keys = [];
    this.validKeys = [
      "ArrowDown",
      "ArrowUp",
      "ArrowLeft",
      "ArrowRight",
      "Enter",
      " ",
    ];
    window.addEventListener("keydown", (e) => {
      if (this.validKeys.includes(e.key) && this.keys.indexOf(e.key) === -1) {
        this.keys.push(e.key);
      } else if (e.key === "`") {
        this.game.debug = !this.game.debug;
      } else if (e.key === "Escape") {
        this.game.isPaused = !this.game.isPaused;
      }
    });
    window.addEventListener("keyup", (e) => {
      if (this.validKeys.includes(e.key)) {
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }
    });
  }
}
