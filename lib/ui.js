const uiFont = {
  family: "Impact, sans-serif",
  size: { base: 32 + "px ", medium: 48 + "px ", large: 64 + "px " },
  color: "orange",
  shadowColor: "black",
  align: { left: "left", center: "center", right: "right" },
};

const uiData = {
  lives: {
    title: "HP:",
  },
  ammo: {},
  power: {},
  timer: {
    title: "Time",
  },
  score: {
    title: "Score",
  },
  levelStart: {},
  levelComplete: {
    title: "Level Complete!",
    score: "Score: ",
  },
  gameOver: {
    title: "Game Over",
  },
  gamePaused: {
    title: "Game Paused",
  },
  options: {
    resume: "Resume",
    restart: "Restart Level",
    startMenu: "Start Menu",
    nextLevel: "Next Level",
  },
  keys: {
    enter: "(ENTER) ",
    esc: "(ESC) ",
    one: "(1) ",
    two: "(2) ",
  },
};

export class UI {
  constructor(level) {
    this.level = level;
    this.width = this.level.width;
    this.height = this.level.height;
    this.font = {
      family: "Impact",
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
  displayHealth(c) {
    this.heartImage = new Image();
    this.heartImage.src = "../assets/sprites/ui/heart.png";
    c.drawImage(this.heartImage, 22, 25, 20, 20);
    c.save();
    c.shadowOffsetX = 0;
    c.shadowOffsetY = 0;
    c.fillStyle = "darkorange";
    c.fillRect(50, 25, 220, 20);
    c.restore();
    for (let i = 0; i < this.level.player.health; i++) {
      c.fillRect(50 + 22 * i, 25, 20, 20);
    }
  }
  displayAmmo(c) {
    c.save();
    c.beginPath();
    c.fillStyle = "rgba(255, 165, 0, 0.75)";
    c.arc(34, 72, 12, 0, Math.PI * 2);
    c.fill();
    c.restore();
    this.drawText(c, "x", this.font.size.base, 54, 84, this.font.align.left);
    this.drawText(
      c,
      this.level.player.ammo,
      this.font.size.base,
      74,
      84,
      this.font.align.left
    );
  }
  displayPowerLevel(c) {
    this.powerImage = new Image();
    this.powerImage.src = "../assets/sprites/particles/fire.png";
    c.drawImage(this.powerImage, 155, 42, 48, 48);
    this.drawText(
      c,
      this.level.player.powerLevel + "%",
      this.font.size.base,
      270,
      84,
      this.font.align.right
    );
  }
  displayTimer(c) {
    this.drawText(
      c,
      uiData.timer.title,
      this.font.size.base,
      this.width * 0.5,
      40
    );
    this.drawText(
      c,
      (this.level.time * 0.001).toFixed(1),
      this.font.size.base,
      this.width * 0.5,
      70
    );
  }
  displayScore(c) {
    this.drawText(
      c,
      uiData.score.title,
      this.font.size.base,
      this.width - 60,
      40
    );
    this.drawText(
      c,
      this.level.score,
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
    this.drawRect(c);
    this.drawText(
      c,
      uiData.levelComplete.title,
      this.font.size.large,
      this.width * 0.5,
      this.height * 0.5 - 60
    );
    this.drawText(
      c,
      uiData.levelComplete.score + this.level.score,
      this.font.size.medium,
      this.width * 0.5,
      this.height * 0.5
    );
    this.drawText(
      c,
      uiData.keys.one + uiData.options.restart,
      this.font.size.base,
      this.width * 0.5,
      this.height * 0.5 + 50
    );
    this.drawText(
      c,
      uiData.keys.two + uiData.options.startMenu,
      this.font.size.base,
      this.width * 0.5,
      this.height * 0.5 + 90
    );
    this.drawText(
      c,
      uiData.keys.enter + uiData.options.nextLevel,
      this.font.size.base,
      this.width * 0.5,
      this.height * 0.5 + 130
    );
  }
  displayGameOverMessage(c) {
    this.drawRect(c);
    this.drawText(
      c,
      uiData.gameOver.title,
      this.font.size.large,
      this.width * 0.5,
      this.height * 0.5 - 60
    );
    this.drawText(
      c,
      uiData.keys.one + uiData.options.restart,
      this.font.size.base,
      this.width * 0.5,
      this.height * 0.5 + 10
    );
    this.drawText(
      c,
      uiData.keys.two + uiData.options.startMenu,
      this.font.size.base,
      this.width * 0.5,
      this.height * 0.5 + 50
    );
  }
  displayPauseMessage(c) {
    this.drawRect(c);
    this.drawText(
      c,
      uiData.gamePaused.title,
      this.font.size.large,
      this.width * 0.5,
      this.height * 0.5 - 60
    );
    this.drawText(
      c,
      uiData.keys.esc + uiData.options.resume,
      this.font.size.base,
      this.width * 0.5,
      this.height * 0.5 + 10
    );
    this.drawText(
      c,
      uiData.keys.one + uiData.options.restart,
      this.font.size.base,
      this.width * 0.5,
      this.height * 0.5 + 50
    );
    this.drawText(
      c,
      uiData.keys.two + uiData.options.startMenu,
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
    this.displayHealth(c);
    this.displayAmmo(c);
    this.displayPowerLevel(c);
    this.displayTimer(c);
    this.displayScore(c);
    if (this.level.countdownActive) this.displayLevelStartMessage(c);
    if (this.level.gameOver) this.displayGameOverMessage(c);
    if (this.level.levelComplete) this.displayLevelCompleteMessage(c);
    if (this.level.isPaused) this.displayPauseMessage(c);
    c.restore();
  }
}
