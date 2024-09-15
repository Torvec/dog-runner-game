export class UI {
  constructor(level) {
    this.level = level;
    this.width = this.level.width;
    this.height = this.level.height;
    this.font = {
      family: "Impact, sans-serif",
      size: { base: 32 + "px ", medium: 48 + "px ", large: 64 + "px " },
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
    c.fillRect(0, this.height * 0.5 - 140, this.width, 280);
    c.restore();
  }
  displayLives(c) {
    this.lives = {
      text: "Lives",
      image: new Image(),
      src: "../assets/sprites/ui/heart.png",
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
    c.save();
    c.shadowOffsetX = 0;
    c.shadowOffsetY = 2;
    c.shadowBlur = 2;
    c.shadowColor = "white";
    for (let i = 0; i < this.level.lives; i++) {
      c.drawImage(this.lives.image, 20 + 25 * i, 50, 20, 20);
    }
    c.restore();
  }
  displayAmmo(c) {
    for (let i = 0; i < this.level.ammo; i++) {
      c.fillRect(20 + 7 * i, 80, 5, 10);
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
    this.levelCompleteText = {
      title: "Level Complete!",
      score: "Score: " + this.level.score,
      replay: "(1) Replay Level",
      startMenu: "(2) Start Menu",
      nextLevel: "(Enter) Next Level",
    };
    this.drawRect(c);
    this.drawText(
      c,
      this.levelCompleteText.title,
      this.font.size.large,
      this.width * 0.5,
      this.height * 0.5 - 60
    );
    this.drawText(
      c,
      this.levelCompleteText.score,
      this.font.size.medium,
      this.width * 0.5,
      this.height * 0.5
    );
    this.drawText(
      c,
      this.levelCompleteText.replay,
      this.font.size.base,
      this.width * 0.5,
      this.height * 0.5 + 50
    );
    this.drawText(
      c,
      this.levelCompleteText.startMenu,
      this.font.size.base,
      this.width * 0.5,
      this.height * 0.5 + 90
    );
    this.drawText(
      c,
      this.levelCompleteText.nextLevel,
      this.font.size.base,
      this.width * 0.5,
      this.height * 0.5 + 130
    );
  }
  displayGameOverMessage(c) {
    this.gameOverText = {
      title: "Game Over",
      restart: "(1) Restart Level",
      startMenu: "(2) Start Menu",
    };
    this.drawRect(c);
    this.drawText(
      c,
      this.gameOverText.title,
      this.font.size.large,
      this.width * 0.5,
      this.height * 0.5 - 60
    );
    this.drawText(
      c,
      this.gameOverText.restart,
      this.font.size.base,
      this.width * 0.5,
      this.height * 0.5 + 10
    );
    this.drawText(
      c,
      this.gameOverText.startMenu,
      this.font.size.base,
      this.width * 0.5,
      this.height * 0.5 + 50
    );
  }
  displayPauseMessage(c) {
    this.gamePausedText = {
      title: "Game Paused",
      resume: "(ESC) Resume",
      restart: "(1) Restart Level",
      startMenu: "(2) Start Menu",
    };
    this.drawRect(c);
    this.drawText(
      c,
      this.gamePausedText.title,
      this.font.size.large,
      this.width * 0.5,
      this.height * 0.5 - 60
    );
    this.drawText(
      c,
      this.gamePausedText.resume,
      this.font.size.base,
      this.width * 0.5,
      this.height * 0.5 + 10
    );
    this.drawText(
      c,
      this.gamePausedText.restart,
      this.font.size.base,
      this.width * 0.5,
      this.height * 0.5 + 50
    );
    this.drawText(
      c,
      this.gamePausedText.startMenu,
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
    this.displayAmmo(c);
    this.displayTimer(c);
    this.displayScore(c);
    if (this.level.countdownActive) this.displayLevelStartMessage(c);
    if (this.level.gameOver) this.displayGameOverMessage(c);
    if (this.level.levelComplete) this.displayLevelCompleteMessage(c);
    if (this.level.isPaused) this.displayPauseMessage(c);
    c.restore();
  }
}
