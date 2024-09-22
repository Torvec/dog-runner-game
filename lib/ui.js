import { loadJsonData } from "./utils.js";
const uiData = await loadJsonData("../assets/data/uiData.json");
const uiFont = await loadJsonData("../assets/data/uiFont.json");

export class UI {
  constructor(level) {
    this.level = level;
    this.width = this.level.width;
    this.height = this.level.height;
    this.font = uiFont;
    this.data = uiData;
  }
  drawText(c, align, fontSize, fontFamily, color, text, x, y) {
    c.save();
    c.textAlign = align;
    c.font = `${fontSize}px ${fontFamily}`;
    c.fillStyle = color;
    c.shadowColor = this.font.shadowColor.black;
    c.shadowOffsetX = this.font.shadowOffsetX.two;
    c.shadowOffsetY = this.font.shadowOffsetY.two;
    c.shadowBlur = this.font.shadowBlur.two;
    c.fillText(text, x, y);
    c.restore();
  }
  drawRect(c) {
    c.save();
    c.fillStyle = "rgba(0,0,0,0.5)";
    c.fillRect(0, this.height * 0.5 - 140, this.width, 280);
    c.restore();
  }
  drawButton(
    c,
    x,
    y,
    width,
    height,
    isHovered,
    fill,
    fillHovered,
    textAlign,
    fontSize,
    fontFamily,
    textColor,
    textColorHovered,
    text,
    textX,
    textY
  ) {
    c.save();
    c.fillStyle = isHovered ? fill : fillHovered;
    c.fillRect(x, y, width, height);
    c.textAlign = textAlign;
    c.font = fontSize + fontFamily;
    c.fillStyle = isHovered ? textColor : textColorHovered;
    c.fillText(text, textX, textY);
    c.restore();
  }
  showHealth(c) {
    this.heartImage = new Image();
    this.heartImage.src = this.data.health.heartImage;
    c.save();
    c.drawImage(this.heartImage, 22, 25, 20, 20);
    c.fillStyle = this.data.health.hpBarColor;
    c.fillRect(50, 25, 134, 22);
    c.restore();
    c.save();
    c.fillStyle = "orange";
    for (let i = 0; i < this.level.player.health; i++) {
      c.fillRect(52 + 22 * i, 26, 20, 20);
    }
    c.restore();
  }
  showAmmo(c) {
    c.save();
    c.beginPath();
    c.fillStyle = this.data.ammo.ammoImage;
    c.arc(205, 36, 12, 0, Math.PI * 2);
    c.fill();
    c.restore();
    this.drawText(
      c,
      this.font.align.left,
      this.font.size.small,
      this.font.family.impact,
      this.font.color.orange,
      this.data.ammo.x,
      227,
      44
    );
    this.drawText(
      c,
      this.font.align.left,
      this.font.size.small,
      this.font.family.impact,
      this.font.color.orange,
      this.level.player.ammo,
      245,
      44
    );
  }
  showPowerLevel(c) {
    this.powerImage = new Image();
    this.powerImage.src = this.data.power.powerImage;
    c.drawImage(this.powerImage, 10, 42, 48, 48);
    c.save();
    c.fillStyle = "darkorange";
    c.shadowColor = this.font.shadowColor.black;
    c.shadowOffsetX = this.font.shadowOffsetX.two;
    c.shadowOffsetY = this.font.shadowOffsetY.two;
    c.shadowBlur = this.font.shadowBlur.two;
    for (let i = 0; i < this.level.player.powerLevel; i++) {
      c.fillRect(52, 64, i, 20);
    }
    c.restore();
  }
  showTimer(c) {
    this.drawText(
      c,
      this.font.align.center,
      this.font.size.base,
      this.font.family.impact,
      this.font.color.orange,
      this.data.timer.title,
      this.width * 0.5,
      40
    );
    this.drawText(
      c,
      this.font.align.center,
      this.font.size.base,
      this.font.family.impact,
      this.font.color.orange,
      (this.level.time * 0.001).toFixed(1),
      this.width * 0.5,
      70
    );
  }
  showScore(c) {
    this.drawText(
      c,
      this.font.align.center,
      this.font.size.base,
      this.font.family.impact,
      this.font.color.orange,
      this.data.score.title,
      this.width - 60,
      40
    );
    this.drawText(
      c,
      this.font.align.center,
      this.font.size.base,
      this.font.family.impact,
      this.font.color.orange,
      this.level.score,
      this.width - 60,
      70
    );
  }
  levelStartMessage(c) {
    this.drawRect(c);
    this.drawText(
      c,
      this.font.align.center,
      this.font.size.large,
      this.font.family.impact,
      this.font.color.orange,
      this.level.levelName,
      this.width * 0.5,
      this.height * 0.5 - 40
    );
    this.drawText(
      c,
      this.font.align.center,
      this.font.size.large,
      this.font.family.impact,
      this.font.color.orange,
      this.level.countdown,
      this.width * 0.5,
      this.height * 0.5 + 50
    );
  }
  levelCompleteMenu(c) {
    this.drawRect(c);
    this.drawText(
      c,
      this.font.align.center,
      this.font.size.large,
      this.font.family.impact,
      this.font.color.orange,
      this.data.levelComplete.title,
      this.width * 0.5,
      this.height * 0.5 - 60
    );
    this.drawText(
      c,
      this.font.align.center,
      this.font.size.medium,
      this.font.family.impact,
      this.font.color.orange,
      this.data.levelComplete.score + this.level.score,
      this.width * 0.5,
      this.height * 0.5
    );
    this.drawText(
      c,
      this.font.align.center,
      this.font.size.base,
      this.font.family.impact,
      this.font.color.orange,
      this.data.keys.one + this.data.options.restart,
      this.width * 0.5,
      this.height * 0.5 + 50
    );
    this.drawText(
      c,
      this.font.align.center,
      this.font.size.base,
      this.font.family.impact,
      this.font.color.orange,
      this.data.keys.two + this.data.options.startMenu,
      this.width * 0.5,
      this.height * 0.5 + 90
    );
    this.drawText(
      c,
      this.font.align.center,
      this.font.size.base,
      this.font.family.impact,
      this.font.color.orange,
      this.data.keys.enter + this.data.options.nextLevel,
      this.width * 0.5,
      this.height * 0.5 + 130
    );
  }
  gameOverMenu(c) {
    this.drawRect(c);
    this.drawText(
      c,
      this.font.align.center,
      this.font.size.large,
      this.font.family.impact,
      this.font.color.orange,
      this.data.gameOver.title,
      this.width * 0.5,
      this.height * 0.5 - 60
    );
    this.drawText(
      c,
      this.font.align.center,
      this.font.size.base,
      this.font.family.impact,
      this.font.color.orange,
      this.data.keys.one + this.data.options.restart,
      this.width * 0.5,
      this.height * 0.5 + 10
    );
    this.drawText(
      c,
      this.font.align.center,
      this.font.size.base,
      this.font.family.impact,
      this.font.color.orange,
      this.data.keys.two + this.data.options.startMenu,
      this.width * 0.5,
      this.height * 0.5 + 50
    );
  }
  pauseMenu(c) {
    this.drawRect(c);
    this.drawText(
      c,
      this.font.align.center,
      this.font.size.large,
      this.font.family.impact,
      this.font.color.orange,
      this.data.gamePaused.title,
      this.width * 0.5,
      this.height * 0.5 - 60
    );
    this.drawText(
      c,
      this.font.align.center,
      this.font.size.base,
      this.font.family.impact,
      this.font.color.orange,
      this.data.keys.esc + this.data.options.resume,
      this.width * 0.5,
      this.height * 0.5 + 10
    );
    this.drawText(
      c,
      this.font.align.center,
      this.font.size.base,
      this.font.family.impact,
      this.font.color.orange,
      this.data.keys.one + this.data.options.restart,
      this.width * 0.5,
      this.height * 0.5 + 50
    );
    this.drawText(
      c,
      this.font.align.center,
      this.font.size.base,
      this.font.family.impact,
      this.font.color.orange,
      this.data.keys.two + this.data.options.startMenu,
      this.width * 0.5,
      this.height * 0.5 + 90
    );
  }
  draw(c) {
    this.showHealth(c);
    this.showAmmo(c);
    this.showPowerLevel(c);
    this.showTimer(c);
    this.showScore(c);
    if (this.level.countdownActive) this.levelStartMessage(c);
    if (this.level.gameOver) this.gameOverMenu(c);
    if (this.level.levelComplete) this.levelCompleteMenu(c);
    if (this.level.isPaused) this.pauseMenu(c);
  }
}
