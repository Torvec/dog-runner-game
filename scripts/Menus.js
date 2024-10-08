import { Background } from "./Background.js";
import {
  getHighScore,
  getFinalScore,
  saveFinalScore,
  clearScores,
} from "./utils.js";
import { UI } from "./UI.js";

const menuData = {
  intro: {
    title: "Press ESC to Start",
  },
  startMenu: {
    title: "THE RUNNING DOG",
    play: "PLAY GAME",
    howToPlay: "How to Play",
    scoreboard: "Scoreboard",
    credits: "Credits",
  },
  tutorial: {
    title: "Tutorial",
    goal: {
      title: "Goal:",
      content:
        "Get the highest score within the time limit without losing all of your health.",
    },
    ammo: {
      title: "Ammo:",
      content:
        "Ammo is limited, but it does replenish over a short period of time.",
    },
    power: {
      title: "Power Level:",
      line_01: "Your power level determines when you can use your roll attack.",
      line_02:
        "Power level increases by hitting enemies with a projectile attack or sitting.",
      line_03: "Power level decreases when you use your roll attack.",
    },
  },
  howToPlay: {
    title: "How to Play",
    movement: "Movement",
    moveLeft: "Left - ",
    moveRight: "Right - ",
    jump: "Jump - ",
    sit: "Sit - ",
    options: "Options",
    pauseLevel: "Pause/Resume Level - ",
    pauseMusic: "Pause/Play Music - ",
    attack: "Attack",
    shoot: "Shoot - ",
    roll: "Roll - ",
    dive: "Dive - ",
    diveplus: "+ ",
  },
  gameComplete: {
    title: "Congratulations! You've completed the game!",
    score: "Final Score",
    options: {
      startMenu: "Start Menu",
      scoreboard: "Scoreboard",
      credits: "Credits",
    },
  },
  scoreboard: {
    title: "High Scores",
    levelone: "Level 01",
    leveltwo: "Level 02",
    levelthree: "Level 03",
    levelfour: "Level 04",
    levelfive: "Boss Level",
    finalScore: "Final Total:",
    clearScores: "Clear Scores",
  },
  credits: {
    title: "Credits",
    modifiedBy: "Code Additions, Modifications, Projectile Sprites",
    edwardVonschondorf: "Edward Vonschondorf",
    mySite: "edward-vonschondorf.dev",
    artAssetsBy: "Art Assets",
    bevouliin: "bevouliin",
    bevouliinSite: "bevouliin.com",
    cuzco: "Cuzco",
    cuzcoSite: "opengameart.org/users/cuzco",
    originalCode: "Original Codebase",
    frankDvorak: "Frank Dvorak",
    franksLabSite: "youtube.com/@Frankslaboratory",
    musicBy: "Music",
    lrsf: "LittleRobotSoundFactory",
    lrsfLink: "freesound.org/people/LittleRobotSoundFactory",
    sfxBy: "Sound Effects",
    magnuswaker: "magnuswaker",
    magnuswakerLink: "freesound.org/people/magnuswaker",
    qubodup: "qubodup",
    qubodupLink: "freesound.org/people/qubodup",
    BaggoNotes: "BaggoNotes",
    BaggoNotesLink: "freesound.org/people/BaggoNotes",
    dklon: "dklon",
    dklonLink: "opengameart.org/users/dklon",
    virix: "ViRiX",
    virixLink: "opengameart.org/users/virix",
  },
  keys: {
    enter: "(ENTER) ",
    escape: "(ESC) ",
    shift: "(Shift) ",
    one: "(1) ",
    two: "(2) ",
    h: "(H) ",
    c: "(C) ",
    w: "(W) ",
    a: "(A) ",
    s: "(S) ",
    d: "(D) ",
    p: "(P) ",
    space: "(Space) ",
  },
  goTo: {
    startMenu: "Start Menu",
    continue: "Continue",
  },
};

const uiFont = {
  family: {
    impact: "Impact",
    sanserif: "sans-serif",
  },
  size: {
    xsmall: 18,
    small: 24,
    base: 32,
    medium: 48,
    large: 64,
    xlarge: 96,
  },
  color: {
    orange: "orange",
    white: "white",
    black: "black",
  },
  shadowColor: {
    black: "black",
    white: "white",
  },
  shadowOffsetX: {
    zero: 0,
    two: 2,
  },
  shadowOffsetY: {
    zero: 0,
    two: 2,
  },
  shadowBlur: {
    zero: 0,
    two: 2,
  },
  align: {
    left: "left",
    center: "center",
    right: "right",
  },
};

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
    if (this.constructor.name !== "StartMenu")
      if (input.includes("Escape")) this.game.setScene("START_MENU");
    if (this.constructor.name === "Intro")
      if (input.includes("Escape")) this.game.music.initPlay();
    if (this.constructor.name === "StartMenu") {
      if (input.includes("Enter")) this.game.setScene("TUTORIAL");
      if (input.includes("h")) this.game.setScene("HOW_TO_PLAY");
      if (input.includes("s")) this.game.setScene("SCOREBOARD");
      if (input.includes("c")) this.game.setScene("CREDITS");
    }
    if (this.constructor.name === "Tutorial")
      if (input.includes(" ")) {
        this.game.sceneKeyIndex = 0;
        this.game.gameComplete = false;
        this.game.setScene("LEVEL_ONE");
        this.game.music.changeTrack();
      }
    if (this.constructor.name === "GameComplete") {
      if (input.includes("s")) this.game.setScene("SCOREBOARD");
      if (input.includes("c")) this.game.setScene("CREDITS");
    }
    if (this.constructor.name === "Scoreboard")
      if (input.includes("c")) clearScores();
  }
  update() {
    this.handleMenuChange(this.input.keys);
  }
  draw(c) {
    c.fillStyle = "rgba(15, 15, 15, 1)";
    c.fillRect(0, 0, this.width, this.height);
  }
}

export class Intro extends Menu {
  constructor(game) {
    super(game);
    this.background = new Background(this, "startMenu");
  }
  draw(c) {
    super.draw(c);
    this.background.draw(c);
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.medium,
      this.font.family.impact,
      this.font.color.orange,
      this.data.intro.title,
      this.width * 0.5,
      this.height * 0.5
    );
  }
}

export class StartMenu extends Menu {
  constructor(game) {
    super(game);
    this.background = new Background(this, "startMenu");
    this.speed = 0.5;
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
      this.data.keys.h + this.data.startMenu.howToPlay,
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
      this.data.keys.c + this.data.startMenu.credits,
      this.width * 0.5,
      this.height * 0.5 + 115
    );
  }
}

export class Tutorial extends Menu {
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
      this.height * 0.5 - 128
    );
    this.ui.drawText(
      c,
      this.font.align.left,
      this.font.size.small,
      this.font.family.sanserif,
      this.font.color.white,
      this.data.tutorial.goal.content,
      80,
      this.height * 0.5 - 96
    );
    this.ui.drawText(
      c,
      this.font.align.left,
      this.font.size.base,
      this.font.family.impact,
      this.font.color.orange,
      this.data.tutorial.ammo.title,
      64,
      this.height * 0.5 - 32
    );
    this.ui.drawText(
      c,
      this.font.align.left,
      this.font.size.small,
      this.font.family.sanserif,
      this.font.color.white,
      this.data.tutorial.ammo.content,
      80,
      this.height * 0.5
    );
    this.ui.drawText(
      c,
      this.font.align.left,
      this.font.size.base,
      this.font.family.impact,
      this.font.color.orange,
      this.data.tutorial.power.title,
      64,
      this.height * 0.5 + 64
    );
    this.ui.drawText(
      c,
      this.font.align.left,
      this.font.size.small,
      this.font.family.sanserif,
      this.font.color.white,
      this.data.tutorial.power.line_01,
      80,
      this.height * 0.5 + 96
    );
    this.ui.drawText(
      c,
      this.font.align.left,
      this.font.size.small,
      this.font.family.sanserif,
      this.font.color.white,
      this.data.tutorial.power.line_02,
      80,
      this.height * 0.5 + 128
    );
    this.ui.drawText(
      c,
      this.font.align.left,
      this.font.size.small,
      this.font.family.sanserif,
      this.font.color.white,
      this.data.tutorial.power.line_03,
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

export class HowToPlay extends Menu {
  draw(c) {
    super.draw(c);
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.medium,
      this.font.family.impact,
      this.font.color.white,
      this.data.howToPlay.title,
      this.width * 0.5,
      this.height - this.height + 64
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.base,
      this.font.family.impact,
      this.font.color.orange,
      this.data.howToPlay.movement,
      this.width * 0.2,
      this.height * 0.5 - 96
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.small,
      this.font.family.sanserif,
      this.font.color.white,
      this.data.howToPlay.jump + this.data.keys.w,
      this.width * 0.2,
      this.height * 0.5 - 48
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.small,
      this.font.family.sanserif,
      this.font.color.white,
      this.data.howToPlay.moveLeft + this.data.keys.a,
      this.width * 0.2,
      this.height * 0.5
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.small,
      this.font.family.sanserif,
      this.font.color.white,
      this.data.howToPlay.moveRight + this.data.keys.s,
      this.width * 0.2,
      this.height * 0.5 + 48
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.small,
      this.font.family.sanserif,
      this.font.color.white,
      this.data.howToPlay.sit + this.data.keys.d,
      this.width * 0.2,
      this.height * 0.5 + 96
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.base,
      this.font.family.impact,
      this.font.color.orange,
      this.data.howToPlay.attack,
      this.width * 0.5,
      this.height * 0.5 - 96
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.small,
      this.font.family.sanserif,
      this.font.color.white,
      this.data.howToPlay.shoot + this.data.keys.space,
      this.width * 0.5,
      this.height * 0.5 - 48
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.small,
      this.font.family.sanserif,
      this.font.color.white,
      this.data.howToPlay.roll + this.data.keys.shift,
      this.width * 0.5,
      this.height * 0.5
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.small,
      this.font.family.sanserif,
      this.font.color.white,
      this.data.howToPlay.dive +
        this.data.keys.w +
        this.data.howToPlay.diveplus +
        this.data.keys.s,
      this.width * 0.5,
      this.height * 0.5 + 48
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.base,
      this.font.family.impact,
      this.font.color.orange,
      this.data.howToPlay.options,
      this.width * 0.8,
      this.height * 0.5 - 96
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.small,
      this.font.family.sanserif,
      this.font.color.white,
      this.data.howToPlay.pauseLevel + this.data.keys.escape,
      this.width * 0.8,
      this.height * 0.5 - 48
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.small,
      this.font.family.sanserif,
      this.font.color.white,
      this.data.howToPlay.pauseMusic + this.data.keys.p,
      this.width * 0.8,
      this.height * 0.5
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

export class GameComplete extends Menu {
  constructor(game) {
    super(game);
    this.game.music.changeTrack();
    this.game.gameComplete = true;
    saveFinalScore();
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
      this.data.keys.c + this.data.gameComplete.options.credits,
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
      this.font.color.white,
      this.data.scoreboard.levelone,
      this.width * 0.1,
      this.height * 0.45 - 64
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.medium,
      this.font.family.impact,
      this.font.color.orange,
      getHighScore("LV01"),
      this.width * 0.1,
      this.height * 0.45
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.base,
      this.font.family.sanserif,
      this.font.color.white,
      this.data.scoreboard.leveltwo,
      this.width * 0.3,
      this.height * 0.45 - 64
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.medium,
      this.font.family.impact,
      this.font.color.orange,
      getHighScore("LV02"),
      this.width * 0.3,
      this.height * 0.45
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.base,
      this.font.family.sanserif,
      this.font.color.white,
      this.data.scoreboard.levelthree,
      this.width * 0.5,
      this.height * 0.45 - 64
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.medium,
      this.font.family.impact,
      this.font.color.orange,
      getHighScore("LV03"),
      this.width * 0.5,
      this.height * 0.45
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.base,
      this.font.family.sanserif,
      this.font.color.white,
      this.data.scoreboard.levelfour,
      this.width * 0.7,
      this.height * 0.45 - 64
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.medium,
      this.font.family.impact,
      this.font.color.orange,
      getHighScore("LV04"),
      this.width * 0.7,
      this.height * 0.45
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.base,
      this.font.family.sanserif,
      this.font.color.white,
      this.data.scoreboard.levelfive,
      this.width * 0.9,
      this.height * 0.45 - 64
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.medium,
      this.font.family.impact,
      this.font.color.orange,
      getHighScore("LV05"),
      this.width * 0.9,
      this.height * 0.45
    );
    this.ui.drawText(
      c,
      this.font.align.left,
      this.font.size.medium,
      this.font.family.impact,
      this.font.color.white,
      this.data.scoreboard.finalScore,
      this.width * 0.35,
      this.height * 0.7
    );
    this.ui.drawText(
      c,
      this.font.align.left,
      this.font.size.medium,
      this.font.family.impact,
      this.font.color.orange,
      getFinalScore(),
      this.width * 0.55,
      this.height * 0.7
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.small,
      this.font.family.impact,
      this.font.color.white,
      this.data.keys.escape + this.data.goTo.startMenu,
      this.width * 0.4,
      this.height - 32
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.small,
      this.font.family.impact,
      this.font.color.orange,
      this.data.keys.c + this.data.scoreboard.clearScores,
      this.width * 0.6,
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
      this.font.size.xsmall,
      this.font.family.sanserif,
      this.font.color.white,
      this.data.credits.modifiedBy,
      this.width * 0.25,
      this.height - this.height + 48
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.small,
      this.font.family.impact,
      this.font.color.white,
      this.data.credits.edwardVonschondorf,
      this.width * 0.25,
      this.height - this.height + 80
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.xsmall,
      this.font.family.sanserif,
      this.font.color.orange,
      this.data.credits.mySite,
      this.width * 0.25,
      this.height - this.height + 104
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.xsmall,
      this.font.family.sanserif,
      this.font.color.white,
      this.data.credits.artAssetsBy,
      this.width * 0.25,
      this.height * 0.5 - 96
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.small,
      this.font.family.impact,
      this.font.color.white,
      this.data.credits.bevouliin,
      this.width * 0.25,
      this.height * 0.5 - 64
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.xsmall,
      this.font.family.sanserif,
      this.font.color.orange,
      this.data.credits.bevouliinSite,
      this.width * 0.25,
      this.height * 0.5 - 40
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.small,
      this.font.family.impact,
      this.font.color.white,
      this.data.credits.cuzco,
      this.width * 0.25,
      this.height * 0.5
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.xsmall,
      this.font.family.sanserif,
      this.font.color.orange,
      this.data.credits.cuzcoSite,
      this.width * 0.25,
      this.height * 0.5 + 24
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.xsmall,
      this.font.family.sanserif,
      this.font.color.white,
      this.data.credits.originalCode,
      this.width * 0.25,
      this.height * 0.5 + 72
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.small,
      this.font.family.impact,
      this.font.color.white,
      this.data.credits.frankDvorak,
      this.width * 0.25,
      this.height * 0.5 + 104
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.xsmall,
      this.font.family.sanserif,
      this.font.color.orange,
      this.data.credits.franksLabSite,
      this.width * 0.25,
      this.height * 0.5 + 128
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.xsmall,
      this.font.family.sanserif,
      this.font.color.white,
      this.data.credits.musicBy,
      this.width * 0.75,
      this.height - this.height + 48
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.small,
      this.font.family.impact,
      this.font.color.white,
      this.data.credits.lrsf,
      this.width * 0.75,
      this.height - this.height + 80
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.xsmall,
      this.font.family.sanserif,
      this.font.color.orange,
      this.data.credits.lrsfLink,
      this.width * 0.75,
      this.height - this.height + 104
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.xsmall,
      this.font.family.sanserif,
      this.font.color.white,
      this.data.credits.sfxBy,
      this.width * 0.75,
      this.height * 0.5 - 96
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.small,
      this.font.family.impact,
      this.font.color.white,
      this.data.credits.magnuswaker,
      this.width * 0.75,
      this.height * 0.5 - 64
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.xsmall,
      this.font.family.sanserif,
      this.font.color.orange,
      this.data.credits.magnuswakerLink,
      this.width * 0.75,
      this.height * 0.5 - 40
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.small,
      this.font.family.impact,
      this.font.color.white,
      this.data.credits.qubodup,
      this.width * 0.75,
      this.height * 0.5
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.xsmall,
      this.font.family.sanserif,
      this.font.color.orange,
      this.data.credits.qubodupLink,
      this.width * 0.75,
      this.height * 0.5 + 24
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.small,
      this.font.family.impact,
      this.font.color.white,
      this.data.credits.BaggoNotes,
      this.width * 0.75,
      this.height * 0.5 + 64
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.xsmall,
      this.font.family.sanserif,
      this.font.color.orange,
      this.data.credits.BaggoNotesLink,
      this.width * 0.75,
      this.height * 0.5 + 88
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.small,
      this.font.family.impact,
      this.font.color.white,
      this.data.credits.dklon,
      this.width * 0.75,
      this.height * 0.5 + 128
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.xsmall,
      this.font.family.sanserif,
      this.font.color.orange,
      this.data.credits.dklonLink,
      this.width * 0.75,
      this.height * 0.5 + 152
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.small,
      this.font.family.impact,
      this.font.color.white,
      this.data.credits.virix,
      this.width * 0.75,
      this.height * 0.5 + 186
    );
    this.ui.drawText(
      c,
      this.font.align.center,
      this.font.size.xsmall,
      this.font.family.sanserif,
      this.font.color.orange,
      this.data.credits.virixLink,
      this.width * 0.75,
      this.height * 0.5 + 204
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
