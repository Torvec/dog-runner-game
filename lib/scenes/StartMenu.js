export class StartMenu {
  constructor(game) {
    this.game = game;
  }
  start() {
    this.bgColor = "orange";
    this.textColor = "white";
    this.text = "Start Menu";
    this.textAlign = "center";
    this.textPosition = { x: this.width * 0.5, y: this.height * 0.5 };
  }
  changeScene(input) {
    if (input.keys.includes("1")) {
      this.game.scene.selectScene(1);
      this.game.scene.start();
    }
  }
}