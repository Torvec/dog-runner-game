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
      " ",
      "1",
      "2",
    ];
    window.addEventListener("keydown", (e) => {
      if (this.validKeys.includes(e.key) && this.keys.indexOf(e.key) === -1) {
        this.keys.push(e.key);
        console.log(this.keys);
      } 
    });
    window.addEventListener("keyup", (e) => {
      if (this.validKeys.includes(e.key)) {
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }
    });
  }
}
