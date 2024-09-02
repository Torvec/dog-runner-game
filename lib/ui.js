export class UI {
  constructor(gameLevel) {
    this.gameLevel = gameLevel;
    this.width = this.gameLevel.width;
    this.height = this.gameLevel.height;
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
    for (let i = 0; i < this.gameLevel.lives; i++) {
      c.drawImage(this.lives.image, 25 * i + 20, 50, 20, 20);
    }
  }
  displayTimer(c) {
    this.timer = {
      text: "Time",
      value: (this.gameLevel.time * 0.001).toFixed(1),
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
      value: this.gameLevel.score,
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
    this.levelStart = {
      titleText: "Level " + this.gameLevel.level,
      startLevelText: "(Enter) Start Level",
    };
    this.drawText(
      c,
      this.levelStart.titleText,
      this.font.size.large,
      this.width * 0.5,
      this.height * 0.5 - 40
    );
    this.drawText(
      c,
      this.levelStart.text,
      this.font.size.base,
      this.width * 0.5,
      this.height * 0.5
    );
  }
  displayLevelCompleteMessage(c) {
    this.levelComplete = {
      titleText: "Level Complete!",
      scoreText: "Score: " + this.gameLevel.score,
      replayText: "(1) Replay Level",
      nextLevelText: "(Enter) Next Level",
    };
    this.drawText(
      c,
      this.levelComplete.titleText,
      this.font.size.large,
      this.width * 0.5,
      this.height * 0.5 - 40
    );
    this.drawText(
      c,
      this.levelComplete.scoreText,
      this.font.size.base,
      this.width * 0.5,
      this.height * 0.5
    );
    this.drawText(
      c,
      this.levelComplete.replayText,
      this.font.size.base,
      this.width * 0.5,
      this.height * 0.5 + 40
    );
    this.drawText(
      c,
      this.levelComplete.nextLevelText,
      this.font.size.base,
      this.width * 0.5,
      this.height * 0.5 + 80
    );
  }
  displayGameOverMessage(c) {
    this.gameOver = {
      text: "Game Over",
      restartText: "(1) Restart Level",
      startMenuText: "(2) Start Menu",
    };
    this.drawText(
      c,
      this.gameOver.text,
      this.font.size.large,
      this.width * 0.5,
      this.height * 0.5 - 40
    );
    this.drawText(
      c,
      this.gameOver.restartText,
      this.font.size.base,
      this.width * 0.5,
      this.height * 0.5
    );
    this.drawText(
      c,
      this.gameOver.startMenuText,
      this.font.size.base,
      this.width * 0.5,
      this.height * 0.5 + 40
    );
  }
  displayPauseMessage(c) {
    this.gamePaused = {
      titleText: "Game Paused",
      resumeText: "(ESC) Resume Level",
      restartText: "(1) Restart Level",
      startMenuText: "(2) Start Menu",
    };
    this.drawText(
      c,
      this.gamePaused.titleText,
      this.font.size.large,
      this.width * 0.5,
      this.height * 0.5 - 40
    );
    this.drawText(
      c,
      this.gamePaused.resumeText,
      this.font.size.base,
      this.width * 0.5,
      this.height * 0.5
    );
    this.drawText(
      c,
      this.gamePaused.restartText,
      this.font.size.base,
      this.width * 0.5,
      this.height * 0.5 + 40
    );
    this.drawText(
      c,
      this.gamePaused.startMenuText,
      this.font.size.base,
      this.width * 0.5,
      this.height * 0.5 + 80
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
    if (this.gameLevel.levelStart) {
      this.displayLevelStartMessage(c);
    }
    if (this.gameLevel.gameOver) {
      this.displayGameOverMessage(c);
    }
    if (this.gameLevel.levelComplete && !this.gameLevel.gameOver) {
      this.displayLevelCompleteMessage(c);
    }
    if (
      this.gameLevel.isPaused &&
      !this.gameLevel.gameOver &&
      !this.gameLevel.levelComplete
    ) {
      this.displayPauseMessage(c);
    }
    c.restore();
  }
}
