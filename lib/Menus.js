import { Background } from "./Background.js";
import { getHighScore, getFinalScore } from "./utils.js";
import { UI } from "./UI.js";
import { loadJsonData } from "./utils.js";
const menuData = await loadJsonData("../assets/data/menuData.json");
const uiFont = await loadJsonData("../assets/data/uiFont.json");

class Menu {
  constructor(game) {
    this.game = game;
    this.width = this.game.width;
    this.height = this.game.height;
    this.input = this.game.input;
    this.data = menuData;
    this.font = uiFont;
    this.ui = new UI(this);
  }
  handleMenuChange(input) {
    if (input.includes("Escape") && this.constructor.name !== "StartMenu")
      this.game.setScene("START_MENU");
  }
  update() {
    this.handleMenuChange(this.input.keys);
  }
  draw(c) {
    c.fillStyle = "rgba(15, 15, 15, 1)";
    c.fillRect(0, 0, this.width, this.height);
  }
}

export class StartMenu extends Menu {
  constructor(game) {
    super(game);
    this.speed = this.game.speed;
    this.background = new Background(this, "startMenu");
    this.speed = 0.5;
  }
  handleMenuChange(input) {
    super.handleMenuChange(input);
    if (input.includes("Enter")) {
      this.game.setScene("TUTORIAL");
      this.game.sceneKeyIndex = 0;
      this.game.gameComplete = false;
    }
    if (input.includes("c")) this.game.setScene("CONTROLS");
    if (input.includes("s")) this.game.setScene("SCOREBOARD");
    if (input.includes("h")) this.game.setScene("CREDITS");
  }
  update() {
    super.update();
    this.background.update();
  }
  draw(c) {
    super.draw(c);
    this.background.draw(c);
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.xlarge,
      this.font.family.impact,
      this.font.color.white,
      this.data.startMenu.title,
      this.width * 0.5,
      this.height - this.height + 192
    );
    if (this.game.firstStart) {
      this.ui.drawText(
        c,
        this.font.align.center,
        this.font.size.base,
        this.font.family.impact,
        this.font.color.orange,
        this.data.keys.space + this.data.goTo.startMenu,
        this.width * 0.5,
        this.height * 0.5 + 35
      );
    } else {
      this.ui.drawText(
        c,
        this.font.align.center,
        this.font.size.base,
        this.font.family.impact,
        this.font.color.orange,
        this.data.keys.enter + this.data.startMenu.play,
        this.width * 0.5,
        this.height * 0.5 - 10
      );
      this.ui.drawText(
        c,
        this.font.align.center,
        this.font.size.small,
        this.font.family.sanserif,
        this.font.color.white,
        this.data.keys.c + this.data.startMenu.controls,
        this.width * 0.5,
        this.height * 0.5 + 35
      );
      this.ui.drawText(
        c,
        this.font.align.center,
        this.font.size.small,
        this.font.family.sanserif,
        this.font.color.white,
        this.data.keys.s + this.data.startMenu.scoreboard,
        this.width * 0.5,
        this.height * 0.5 + 75
      );
      this.ui.drawText(
        c,
        this.font.align.center,
        this.font.size.small,
        this.font.family.sanserif,
        this.font.color.white,
        this.data.keys.h + this.data.startMenu.credits,
        this.width * 0.5,
        this.height * 0.5 + 115
      );
    }
  }
}

export class Tutorial extends Menu {
  handleMenuChange(input) {
    super.handleMenuChange(input);
    if (input.includes(" ")) {
      this.game.setScene("LEVEL_ONE");
    }
  }
  draw(c) {
    super.draw(c);
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.medium,
      this.font.family.impact,
      this.font.color.white,
      this.data.tutorial.title,
      this.width * 0.5,
      this.height - this.height + 64
    );
    this.ui.drawText(
      c,
      this.font.align.left,
      this.font.size.base,
      this.font.family.impact,
      this.font.color.orange,
      this.data.tutorial.goal.title,
      64,
      this.height * 0.5 - 144
    );
    this.ui.drawText(
      c,
      this.font.align.left,
      this.font.size.small,
      this.font.family.sanserif,
      this.font.color.white,
      this.data.tutorial.goal.content,
      80,
      this.height * 0.5 - 112
    );
    this.ui.drawText(
      c,
      this.font.align.left,
      this.font.size.base,
      this.font.family.impact,
      this.font.color.orange,
      this.data.tutorial.ammo.title,
      64,
      this.height * 0.5 - 64
    );
    this.ui.drawText(
      c,
      this.font.align.left,
      this.font.size.small,
      this.font.family.sanserif,
      this.font.color.white,
      this.data.tutorial.ammo.content,
      80,
      this.height * 0.5 - 32
    );
    this.ui.drawText(
      c,
      this.font.align.left,
      this.font.size.base,
      this.font.family.impact,
      this.font.color.orange,
      this.data.tutorial.power.title,
      64,
      this.height * 0.5 + 16
    );
    this.ui.drawText(
      c,
      this.font.align.left,
      this.font.size.small,
      this.font.family.sanserif,
      this.font.color.white,
      this.data.tutorial.power.content,
      80,
      this.height * 0.5 + 48
    );
    this.ui.drawText(
      c,
      this.font.align.left,
      this.font.size.small,
      this.font.family.sanserif,
      this.font.color.white,
      this.data.tutorial.power.content2,
      80,
      this.height * 0.5 + 80
    );
    this.ui.drawText(
      c,
      this.font.align.left,
      this.font.size.base,
      this.font.family.impact,
      this.font.color.orange,
      this.data.tutorial.scoring.title,
      64,
      this.height * 0.5 + 128
    );
    this.ui.drawText(
      c,
      this.font.align.left,
      this.font.size.small,
      this.font.family.sanserif,
      this.font.color.white,
      this.data.tutorial.scoring.content,
      80,
      this.height * 0.5 + 160
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.small,
      this.font.family.impact,
      this.font.color.white,
      this.data.keys.escape + this.data.goTo.startMenu,
      this.width * 0.3,
      this.height - 32
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.small,
      this.font.family.impact,
      this.font.color.white,
      this.data.keys.space + this.data.goTo.continue,
      this.width * 0.7,
      this.height - 32
    );
  }
}

export class Controls extends Menu {
  draw(c) {
    super.draw(c);
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.medium,
      this.font.family.impact,
      this.font.color.white,
      this.data.controls.title,
      this.width * 0.5,
      this.height - this.height + 64
    );
    // Movement
    this.ui.drawText(
      c,
      this.font.align.left,
      this.font.size.base,
      this.font.family.impact,
      this.font.color.orange,
      this.data.controls.movement,
      this.width * 0.1,
      this.height * 0.5 - 96
    );
    this.ui.drawText(
      c,
      this.font.align.left,
      this.font.size.small,
      this.font.family.sanserif,
      this.font.color.white,
      this.data.controls.jump + this.data.keys.w,
      this.width * 0.1,
      this.height * 0.5 - 48
    );
    this.ui.drawText(
      c,
      this.font.align.left,
      this.font.size.small,
      this.font.family.sanserif,
      this.font.color.white,
      this.data.controls.moveLeft + this.data.keys.a,
      this.width * 0.1,
      this.height * 0.5
    );
    this.ui.drawText(
      c,
      this.font.align.left,
      this.font.size.small,
      this.font.family.sanserif,
      this.font.color.white,
      this.data.controls.moveRight + this.data.keys.s,
      this.width * 0.1,
      this.height * 0.5 + 48
    );
    this.ui.drawText(
      c,
      this.font.align.left,
      this.font.size.small,
      this.font.family.sanserif,
      this.font.color.white,
      this.data.controls.sit + this.data.keys.d,
      this.width * 0.1,
      this.height * 0.5 + 96
    );
    // Attack
    this.ui.drawText(
      c,
      this.font.align.left,
      this.font.size.base,
      this.font.family.impact,
      this.font.color.orange,
      this.data.controls.attack,
      this.width * 0.4,
      this.height * 0.5 - 96
    );
    this.ui.drawText(
      c,
      this.font.align.left,
      this.font.size.small,
      this.font.family.sanserif,
      this.font.color.white,
      this.data.controls.shoot + this.data.keys.space,
      this.width * 0.4,
      this.height * 0.5 - 48
    );
    this.ui.drawText(
      c,
      this.font.align.left,
      this.font.size.small,
      this.font.family.sanserif,
      this.font.color.white,
      this.data.controls.roll + this.data.keys.shift,
      this.width * 0.4,
      this.height * 0.5
    );
    this.ui.drawText(
      c,
      this.font.align.left,
      this.font.size.small,
      this.font.family.sanserif,
      this.font.color.white,
      this.data.controls.dive + this.data.keys.w + this.data.keys.s,
      this.width * 0.4,
      this.height * 0.5 + 48
    );
    // Options
    this.ui.drawText(
      c,
      this.font.align.left,
      this.font.size.base,
      this.font.family.impact,
      this.font.color.orange,
      this.data.controls.options,
      this.width * 0.7,
      this.height * 0.5 - 96
    );
    this.ui.drawText(
      c,
      this.font.align.left,
      this.font.size.small,
      this.font.family.sanserif,
      this.font.color.white,
      this.data.controls.pauseLevel + this.data.keys.escape,
      this.width * 0.7,
      this.height * 0.5 - 48
    );
    this.ui.drawText(
      c,
      this.font.align.left,
      this.font.size.small,
      this.font.family.sanserif,
      this.font.color.white,
      this.data.controls.pauseMusic + this.data.keys.p,
      this.width * 0.7,
      this.height * 0.5
    );
    // Start Menu
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.small,
      this.font.family.impact,
      this.font.color.white,
      this.data.keys.escape + this.data.goTo.startMenu,
      this.width * 0.5,
      this.height - 32
    );
  }
}

export class GameComplete extends Menu {
  handleMenuChange(input) {
    super.handleMenuChange(input);
    if (input.includes("s")) this.game.setScene("SCOREBOARD");
    if (input.includes("h")) this.game.setScene("CREDITS");
  }
  draw(c) {
    super.draw(c);
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.medium,
      this.font.family.impact,
      this.font.color.white,
      this.data.gameComplete.title,
      this.width * 0.5,
      this.height - this.height + 64
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.medium,
      this.font.family.impact,
      this.font.color.orange,
      this.data.gameComplete.score,
      this.width * 0.5,
      this.height * 0.5 - 32
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.large,
      this.font.family.impact,
      this.font.color.orange,
      getFinalScore(),
      this.width * 0.5,
      this.height * 0.5 + 64
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.small,
      this.font.family.impact,
      this.font.color.white,
      this.data.keys.escape + this.data.gameComplete.options.startMenu,
      this.width * 0.2,
      this.height - 32
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.small,
      this.font.family.impact,
      this.font.color.white,
      this.data.keys.s + this.data.gameComplete.options.scoreboard,
      this.width * 0.5,
      this.height - 32
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.small,
      this.font.family.impact,
      this.font.color.white,
      this.data.keys.h + this.data.gameComplete.options.credits,
      this.width * 0.8,
      this.height - 32
    );
  }
}

export class Scoreboard extends Menu {
  draw(c) {
    super.draw(c);
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.medium,
      this.font.family.impact,
      this.font.color.white,
      this.data.scoreboard.title,
      this.width * 0.5,
      this.height - this.height + 64
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.base,
      this.font.family.sanserif,
      this.font.color.orange,
      this.data.scoreboard.levelone,
      this.width * 0.2,
      this.height * 0.5 - 64
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.medium,
      this.font.family.impact,
      this.font.color.white,
      getHighScore("Level-01"),
      this.width * 0.2,
      this.height * 0.5
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.base,
      this.font.family.sanserif,
      this.font.color.orange,
      this.data.scoreboard.leveltwo,
      this.width * 0.4,
      this.height * 0.5 - 64
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.medium,
      this.font.family.impact,
      this.font.color.white,
      getHighScore("Level-02"),
      this.width * 0.4,
      this.height * 0.5
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.base,
      this.font.family.sanserif,
      this.font.color.orange,
      this.data.scoreboard.levelthree,
      this.width * 0.6,
      this.height * 0.5 - 64
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.medium,
      this.font.family.impact,
      this.font.color.white,
      getHighScore("Level-03"),
      this.width * 0.6,
      this.height * 0.5
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.base,
      this.font.family.sanserif,
      this.font.color.orange,
      this.data.scoreboard.levelfour,
      this.width * 0.8,
      this.height * 0.5 - 64
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.medium,
      this.font.family.impact,
      this.font.color.white,
      getHighScore("Level-04"),
      this.width * 0.8,
      this.height * 0.5
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.base,
      this.font.family.sanserif,
      this.font.color.orange,
      this.data.scoreboard.finalScore,
      this.width * 0.5,
      this.height * 0.625
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.medium,
      this.font.family.impact,
      this.font.color.white,
      getFinalScore(),
      this.width * 0.5,
      this.height * 0.75
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.small,
      this.font.family.impact,
      this.font.color.white,
      this.data.keys.escape + this.data.goTo.startMenu,
      this.width * 0.5,
      this.height - 32
    );
  }
}

export class Credits extends Menu {
  draw(c) {
    super.draw(c);
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.medium,
      this.font.family.impact,
      this.font.color.white,
      this.data.credits.title,
      this.width * 0.5,
      this.height - this.height + 64
    );
    this.ui.drawText(
      c,
      this.font.align.left,
      this.font.size.small,
      this.font.family.impact,
      this.font.color.white,
      this.data.credits.createdBy,
      64,
      this.height * 0.5 - 128
    );
    this.ui.drawText(
      c,
      this.font.align.left,
      this.font.size.small,
      this.font.family.sanserif,
      this.font.color.white,
      this.data.credits.frankDvorak,
      64,
      this.height * 0.5 - 96
    );
    this.ui.drawText(
      c,
      this.font.align.left,
      this.font.size.small,
      this.font.family.sanserif,
      this.font.color.orange,
      this.data.credits.franksLabSite,
      64,
      this.height * 0.5 - 64
    );
    this.ui.drawText(
      c,
      this.font.align.left,
      this.font.size.small,
      this.font.family.impact,
      this.font.color.white,
      this.data.credits.artAssetsBy,
      64,
      this.height * 0.5 - 16
    );
    this.ui.drawText(
      c,
      this.font.align.left,
      this.font.size.small,
      this.font.family.sanserif,
      this.font.color.white,
      this.data.credits.bevouliin,
      64,
      this.height * 0.5 + 16
    );
    this.ui.drawText(
      c,
      this.font.align.left,
      this.font.size.small,
      this.font.family.sanserif,
      this.font.color.orange,
      this.data.credits.bevouliinSite,
      64,
      this.height * 0.5 + 48
    );
    this.ui.drawText(
      c,
      this.font.align.left,
      this.font.size.small,
      this.font.family.impact,
      this.font.color.white,
      this.data.credits.modifiedBy,
      64,
      this.height * 0.5 + 96
    );
    this.ui.drawText(
      c,
      this.font.align.left,
      this.font.size.small,
      this.font.family.sanserif,
      this.font.color.white,
      this.data.credits.edwardVonschondorf,
      64,
      this.height * 0.5 + 128
    );
    this.ui.drawText(
      c,
      this.font.align.left,
      this.font.size.small,
      this.font.family.sanserif,
      this.font.color.orange,
      this.data.credits.mySite,
      64,
      this.height * 0.5 + 160
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.small,
      this.font.family.impact,
      this.font.color.white,
      this.data.keys.escape + this.data.goTo.startMenu,
      this.width * 0.5,
      this.height - 32
    );
  }
}
