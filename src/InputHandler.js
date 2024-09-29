export class InputHandler {
  constructor(game, canvas) {
    this.game = game;
    this.canvas = canvas;
    this.keys = [];
    this.validKeys = [
      "Enter",
      "Escape",
      "Shift",
      "1",
      "2",
      "h",
      "c",
      "w",
      "a",
      "s",
      "d",
      "p",
      " ",
    ];
    window.addEventListener("keydown", (e) => {
      this.handleKeyDown(e);
    });
    window.addEventListener("keyup", (e) => {
      this.handleKeyUp(e);
    });
  }
  handleKeyDown(e) {
    let key = e.key;
    if (["H", "C", "W", "A", "S", "D", "P"].includes(key)) {
      key = key.toLowerCase();
    }
    if (this.validKeys.includes(key) && this.keys.indexOf(key) === -1) {
      this.keys.push(key);
    }
  }
  handleKeyUp(e) {
    let key = e.key;
    if (["H", "C", "W", "A", "S", "D", "P"].includes(key)) {
      key = key.toLowerCase();
    }
    if (this.validKeys.includes(key)) {
      this.keys.splice(this.keys.indexOf(key), 1);
    }
  }
}
