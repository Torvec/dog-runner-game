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
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "0",
    ];
    window.addEventListener("keydown", (e) => {
      if (this.validKeys.includes(e.key) && this.keys.indexOf(e.key) === -1) {
        this.keys.push(e.key);
      } else if (e.key === "`") {
        this.game.debug = !this.game.debug;
      } else if (e.key === "Escape") {
        this.game.isPaused = !this.game.isPaused;
      }
      //! FOR TESTING PURPOSES ONLY, WILL REMOVE LATER vvv
      if (e.key === "1") {
        this.game.setScene("LEVEL_ONE");
      }
      if (e.key === "2") {
        this.game.setScene("LEVEL_TWO");
      }
      if (e.key === "3") {
        this.game.setScene("LEVEL_THREE");
      }
      if (e.key === "4") {
        this.game.setScene("GAME_COMPLETE");
      }
      if (e.key === "5") {
        this.game.setScene("SCOREBOARD");
      }
      if (e.key === "6") {
        this.game.setScene("CREDITS");
      }
      if (e.key === "0") {
        this.game.setScene("START_MENU");
      }
      //! FOR TESTING PURPOSES ONLY, WILL REMOVE LATER ^^^
    });
    window.addEventListener("keyup", (e) => {
      if (this.validKeys.includes(e.key)) {
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }
    });
  }
}
