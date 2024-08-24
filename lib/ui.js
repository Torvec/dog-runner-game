export class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 30 + "px ";
    this.fontSizeSmall = 20 + "px ";
    this.fontSizeLarge = 60 + "px ";
    this.fontFamily = "Impact, sans-serif";
    this.livesImage = document.getElementById("lives");
    this.scoreText = "Score: ";
    this.timeText = "Time: ";
    this.gameOverText = "Game Over";
    this.gameOverWinText = "What are creatures of the night afraid of? YOU!";
    this.gameOverLoseText = "Better Luck Next Time!";
    this.gamePausedText = "Game Paused";
  }
  draw(context) {
    context.save();
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = "white";
    context.shadowBlur = 0;
    context.font = this.fontSize + this.fontFamily;
    context.textAlign = "left";
    context.fillStyle = this.game.fontColor;
    // Score
    context.fillText(this.scoreText + this.game.score, 20, 50);
    // Timer
    context.font = this.fontSize + this.fontFamily;
    context.fillText(
      this.timeText + (this.game.time * 0.001).toFixed(1),
      20,
      80
    );
    // Lives
    for (let i = 0; i < this.game.lives; i++) {
      context.drawImage(this.livesImage, 25 * i + 20, 95, 25, 25);
    }
    // Game Over
    if (this.game.gameOver) {
      context.textAlign = "center";
      // Win Game Message
      if (this.game.score > this.game.winningScore) {
        context.font = this.fontSizeLarge + this.fontFamily;
        context.fillText(
          this.gameOverText,
          this.game.width * 0.5,
          this.game.height * 0.5 - 20
        );
        context.font = this.fontSizeSmall + this.fontFamily;
        context.fillText(
          this.gameOverWinText,
          this.game.width * 0.5,
          this.game.height * 0.5 + 20
        );
      } else {
        // Lose Game Message
        context.font = this.fontSizeLarge + this.fontFamily;
        context.fillText(
          this.gameOverText,
          this.game.width * 0.5,
          this.game.height * 0.5 - 20
        );
        context.font = this.fontSizeSmall + this.fontFamily;
        context.fillText(
          this.gameOverLoseText,
          this.game.width * 0.5,
          this.game.height * 0.5 + 20
        );
      }
    }
    // Game Paused
    if (this.game.isPaused && !this.game.gameOver) {
      context.textAlign = "center";
      context.font = this.fontSizeLarge + this.fontFamily;
      context.fillText(
        this.gamePausedText,
        this.game.width * 0.5,
        this.game.height * 0.5
      );
    }
    context.restore();
  }
}
