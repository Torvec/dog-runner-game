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
      "Escape",
      " ",
    ];
    window.addEventListener("keydown", (e) => {
      if (this.validKeys.includes(e.key) && this.keys.indexOf(e.key) === -1) {
        this.keys.push(e.key);
      } 
      //! FOR TESTING PURPOSES ONLY, WILL REMOVE LATER vvv
      if (e.key === "1") {
        this.game.setScene("START_MENU");
      }
      if (e.key === "2") {
        this.game.setScene("HOW_TO_PLAY");
      }
      if (e.key === "3") {
        this.game.setScene("LEVEL_ONE");
      }
      if (e.key === "4") {
        this.game.setScene("LEVEL_TWO");
      }
      if (e.key === "5") {
        this.game.setScene("LEVEL_THREE");
      }
      if (e.key === "6") {
        this.game.setScene("LEVEL_FOUR");
      }
      if (e.key === "7") {
        this.game.setScene("GAME_COMPLETE");
      }
      if (e.key === "8") {
        this.game.setScene("SCOREBOARD");
      }
      if (e.key === "9") {
        this.game.setScene("CREDITS");
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
