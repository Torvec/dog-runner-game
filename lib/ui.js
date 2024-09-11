export class UI {
  constructor(level) {
    this.level = level;
    this.width = this.level.width;
    this.height = this.level.height;
    this.font = {
      family: "Impact, sans-serif",
      size: { small: 20 + "px ", base: 30 + "px ", large: 60 + "px " },
      color: "orange",
      shadowColor: "black",
      align: { left: "left", center: "center", right: "right" },
    };
  }
  drawText(c, text, fontSize, x, y, align = this.font.align.center) {
    c.textAlign = align;
    c.font = fontSize + this.font.family;
    c.fillText(text, x, y);
  }
  drawRect(c) {
    c.save();
    c.fillStyle = "rgba(0,0,0,0.5)";
    c.fillRect(0, this.height * 0.5 - 125, this.width, 250);
    c.restore();
  }
  displayLives(c) {
    this.lives = {
      text: "Lives",
      image: new Image(),
      src: "../assets/sprites-ui/heart.png",
    };
    this.lives.image.src = this.lives.src;
    this.drawText(
      c,
      this.lives.text,
      this.font.size.base,
      20,
      40,
      this.font.align.left
    );
    for (let i = 0; i < this.level.lives; i++) {
      c.drawImage(this.lives.image, 25 * i + 20, 50, 20, 20);
    }
  }
  displayTimer(c) {
    this.timer = {
      text: "Time",
      value: (this.level.time * 0.001).toFixed(1),
    };
    this.drawText(
      c,
      this.timer.text,
      this.font.size.base,
      this.width * 0.5,
      40
    );
    this.drawText(
      c,
      this.timer.value,
      this.font.size.base,
      this.width * 0.5,
      70
    );
  }
  displayScore(c) {
    this.score = {
      text: "Score",
      value: this.level.score,
    };
    this.drawText(c, this.score.text, this.font.size.base, this.width - 60, 40);
    this.drawText(
      c,
      this.score.value,
      this.font.size.base,
      this.width - 60,
      70
    );
  }
  displayLevelStartMessage(c) {
    this.drawRect(c);
    this.drawText(
      c,
      this.level.levelName,
      this.font.size.large,
      this.width * 0.5,
      this.height * 0.5 - 40
    );
    this.drawText(
      c,
      this.level.countdown,
      this.font.size.large,
      this.width * 0.5,
      this.height * 0.5 + 50
    );
  }
  displayLevelCompleteMessage(c) {
    this.levelComplete = {
      titleText: "Level Complete!",
      scoreText: "Score: " + this.level.score,
      replayText: "(1) Replay Level",
      nextLevelText: "(Enter) Next Level",
    };
    this.drawRect(c);
    this.drawText(
      c,
      this.levelComplete.titleText,
      this.font.size.large,
      this.width * 0.5,
      this.height * 0.5 - 50
    );
    this.drawText(
      c,
      this.levelComplete.scoreText,
      this.font.size.base,
      this.width * 0.5,
      this.height * 0.5 + 10
    );
    this.drawText(
      c,
      this.levelComplete.replayText,
      this.font.size.base,
      this.width * 0.5,
      this.height * 0.5 + 50
    );
    this.drawText(
      c,
      this.levelComplete.nextLevelText,
      this.font.size.base,
      this.width * 0.5,
      this.height * 0.5 + 90
    );
  }
  displayGameOverMessage(c) {
    this.gameOver = {
      text: "Game Over",
      restartText: "(1) Restart Level",
      startMenuText: "(2) Start Menu",
    };
    this.drawRect(c);
    this.drawText(
      c,
      this.gameOver.text,
      this.font.size.large,
      this.width * 0.5,
      this.height * 0.5 - 50
    );
    this.drawText(
      c,
      this.gameOver.restartText,
      this.font.size.base,
      this.width * 0.5,
      this.height * 0.5 + 10
    );
    this.drawText(
      c,
      this.gameOver.startMenuText,
      this.font.size.base,
      this.width * 0.5,
      this.height * 0.5 + 50
    );
  }
  displayPauseMessage(c) {
    this.gamePaused = {
      titleText: "Game Paused",
      resumeText: "(ESC) Resume",
      restartText: "(1) Restart Level",
      startMenuText: "(2) Start Menu",
    };
    this.drawRect(c);
    this.drawText(
      c,
      this.gamePaused.titleText,
      this.font.size.large,
      this.width * 0.5,
      this.height * 0.5 - 50
    );
    this.drawText(
      c,
      this.gamePaused.resumeText,
      this.font.size.base,
      this.width * 0.5,
      this.height * 0.5 + 10
    );
    this.drawText(
      c,
      this.gamePaused.restartText,
      this.font.size.base,
      this.width * 0.5,
      this.height * 0.5 + 50
    );
    this.drawText(
      c,
      this.gamePaused.startMenuText,
      this.font.size.base,
      this.width * 0.5,
      this.height * 0.5 + 90
    );
  }
  draw(c) {
    c.save();
    c.shadowOffsetX = 2;
    c.shadowOffsetY = 2;
    c.shadowColor = this.font.shadowColor;
    c.shadowBlur = 0;
    c.font = this.font.size.base + this.font.family;
    c.fillStyle = this.font.color;
    this.displayLives(c);
    this.displayTimer(c);
    this.displayScore(c);
    if (this.level.countdownActive) {
      this.displayLevelStartMessage(c);
    }
    if (this.level.gameOver) {
      this.displayGameOverMessage(c);
    }
    if (this.level.levelComplete && !this.level.gameOver) {
      this.displayLevelCompleteMessage(c);
    }
    if (
      this.level.isPaused &&
      !this.level.gameOver &&
      !this.level.levelComplete
    ) {
      this.displayPauseMessage(c);
    }
    c.restore();
  }
}
