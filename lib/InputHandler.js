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
      "Escape",
      "Shift",
      "1",
      "2",
    ];
    window.addEventListener("keydown", (e) => {
      this.handleKeyDown(e);
    });
    window.addEventListener("keyup", (e) => {
      this.handleKeyUp(e);
    });
  }
  handleKeyDown(e) {
    if (this.validKeys.includes(e.key) && this.keys.indexOf(e.key) === -1) {
      this.keys.push(e.key);
    }
  }
  handleKeyUp(e) {
    if (this.validKeys.includes(e.key)) {
      this.keys.splice(this.keys.indexOf(e.key), 1);
    }
  }
}
