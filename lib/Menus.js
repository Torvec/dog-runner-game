import {
  BackgroundStartMenu,
  BackgroundHowToPlay,
  BackgroundScoreboard,
  BackgroundCredits,
  BackgroundGameComplete,
} from "./background.js";
import { getHighScore, getFinalScore } from "./highScores.js";

const menuData = {
  startMenu: {
    title: "THE RUNNING DOG",
    play: "PLAY GAME",
    howToPlay: "How to Play",
    scoreboard: "High Scores",
    credits: "Credits",
  },
  howToPlay: {
    title: "How to Play",
    controls: {
      move: "Movement",
      moveLeft: "Left",
      moveRight: "Right",
      jump: "Jump",
      sit: "Sit",
      attack: "Attack",
      roll: "Fire Roll",
      dive: "Dive Bomb",
    },
    objective: {
      title: "Objective",
      content:
        "Get the highest Score within the time limit and with as many lives as possible",
    },
  },
  gameComplete: {
    title: "Game Complete",
    congrats: "Congratulations! You have completed the game!",
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
    levelthree: "Level 03:",
    levelfour: "Level 04",
    finalScore: "Final Score",
  },
  credits: {
    title: "Credits",
    createdBy: "Original Codebase by Frank Dvorak of Frank's Laboratory",
    franksLab: "https://www.youtube.com/@Frankslaboratory",
    artAssetsBy: "Art Assets by bevouliin",
    bevouliin: "https://bevouliin.com/",
    modifiedBy: "Modified by Edward Vonschondorf",
    mySite: "https://edward-vonschondorf.dev/",
  },
  keys: {
    enter: "( ENTER ) ",
    escape: "( ESC ) ",
    shift: "(Shift) ",
    one: "(1) ",
    two: "(2) ",
    h: "(H) ",
    c: "(C) ",
    w: "(W) ",
    a: "(A) ",
    s: "(S) ",
    d: "(D) ",
  },
  goTo: {
    startMenu: "Start Menu",
    continue: "Continue",
  },
};

class Menu {
  constructor(game) {
    this.game = game;
    this.width = this.game.width;
    this.height = this.game.height;
    this.input = this.game.input;
  }
  handleMenuChange(input) {
    if (input.includes("Enter") && this.constructor.name === "StartMenu") {
      this.game.setScene("LEVEL_ONE");
      this.game.sceneKeyIndex = 0;
      this.game.gameComplete = false;
    } else if (input.includes("h")) {
      this.game.setScene("HOW_TO_PLAY");
    } else if (input.includes("s")) {
      this.game.setScene("SCOREBOARD");
    } else if (input.includes("c")) {
      this.game.setScene("CREDITS");
    } else if (
      this.constructor.name !== "StartMenu" &&
      input.includes("Escape")
    ) {
      this.game.setScene("START_MENU");
    }
  }
  update() {
    this.handleMenuChange(this.input.keys);
  }
  draw(c) {
    this.background.draw(c);
    c.fillStyle = "white";
  }
}

export class StartMenu extends Menu {
  constructor(game) {
    super(game);
    this.background = new BackgroundStartMenu(this);
  }
  draw(c) {
    super.draw(c);
    c.font = "96px Impact";
    c.textAlign = "center";
    c.fillText(
      menuData.startMenu.title,
      this.width * 0.5,
      this.height - this.height + 192
    );
    c.font = "32px impact";
    c.fillStyle = "orange";
    c.fillText(
      menuData.keys.enter + menuData.startMenu.play,
      this.width * 0.5,
      this.height * 0.5 - 10
    );
    c.font = "24px sans-serif";
    c.fillStyle = "white";
    c.fillText(
      menuData.keys.h + menuData.startMenu.howToPlay,
      this.width * 0.5,
      this.height * 0.5 + 35
    );
    c.fillText(
      menuData.keys.s + menuData.startMenu.scoreboard,
      this.width * 0.5,
      this.height * 0.5 + 75
    );
    c.fillText(
      menuData.keys.c + menuData.startMenu.credits,
      this.width * 0.5,
      this.height * 0.5 + 115
    );
  }
}

export class HowToPlay extends Menu {
  constructor(game) {
    super(game);
    this.background = new BackgroundHowToPlay(this);
  }
  draw(c) {
    super.draw(c);
    c.font = "48px Impact";
    c.textAlign = "center";
    c.fillText(
      menuData.howToPlay.title,
      this.width * 0.5,
      this.height - this.height + 64
    );
    c.font = "32px Impact";
    c.fillText(
      menuData.howToPlay.controls.move,
      this.width * 0.25,
      this.height * 0.5 - 100
    );
    c.font = "24px sans-serif";
    c.fillText(
      menuData.keys.w + menuData.howToPlay.controls.jump,
      this.width * 0.25,
      this.height * 0.5 - 60
    );
    c.fillText(
      menuData.keys.a + menuData.howToPlay.controls.moveLeft,
      this.width * 0.25 - 120,
      this.height * 0.5 - 20
    );
    c.fillText(
      menuData.keys.s + menuData.howToPlay.controls.sit,
      this.width * 0.25,
      this.height * 0.5 - 20
    );
    c.fillText(
      menuData.keys.d + menuData.howToPlay.controls.moveRight,
      this.width * 0.25 + 120,
      this.height * 0.5 - 20
    );
    c.font = "32px Impact";
    c.fillText(
      menuData.howToPlay.controls.attack,
      this.width * 0.75,
      this.height * 0.5 - 100
    );
    c.font = "24px sans-serif";
    c.fillText(
      menuData.keys.shift + menuData.howToPlay.controls.roll,
      this.width * 0.75,
      this.height * 0.5 - 60
    );
    c.fillText(
      menuData.keys.w +
        "+ " +
        menuData.keys.s +
        menuData.howToPlay.controls.dive,
      this.width * 0.75,
      this.height * 0.5 - 20
    );
    c.font = "32px Impact";
    c.fillText(
      menuData.howToPlay.objective.title,
      this.width * 0.5,
      this.height * 0.5 + 60
    );
    c.font = "24px sans-serif";
    c.fillText(
      menuData.howToPlay.objective.content,
      this.width * 0.5,
      this.height * 0.5 + 100
    );
    c.font = "24px Impact";
    c.textAlign = "center";
    c.fillText(
      menuData.keys.escape + menuData.goTo.startMenu,
      this.width * 0.5,
      this.height - 32
    );
  }
}

export class GameComplete extends Menu {
  constructor(game) {
    super(game);
    this.background = new BackgroundGameComplete(this);
  }
  draw(c) {
    super.draw(c);
    c.font = "48px Impact";
    c.textAlign = "center";
    c.fillText(
      menuData.gameComplete.title,
      this.width * 0.5,
      this.height - this.height + 64
    );
    c.font = "36px Impact";
    c.fillText(
      menuData.gameComplete.congrats,
      this.width * 0.5,
      this.height * 0.5 - 96
    );
    c.fillStyle = "orange";
    c.fillText(
      menuData.gameComplete.score,
      this.width * 0.5,
      this.height * 0.5
    );
    c.fillText(getFinalScore(), this.width * 0.5, this.height * 0.5 + 64);
    c.font = "24px Impact";
    c.fillStyle = "white";
    c.fillText(
      menuData.keys.escape + menuData.gameComplete.options.startMenu,
      this.width * 0.2,
      this.height - 32
    );
    c.fillText(
      menuData.keys.s + menuData.gameComplete.options.scoreboard,
      this.width * 0.5,
      this.height - 32
    );
    c.fillText(
      menuData.keys.c + menuData.gameComplete.options.credits,
      this.width * 0.8,
      this.height - 32
    );
  }
}

export class Scoreboard extends Menu {
  constructor(game) {
    super(game);
    this.background = new BackgroundScoreboard(this);
  }
  draw(c) {
    super.draw(c);
    c.font = "48px Impact";
    c.textAlign = "center";
    c.fillText(
      menuData.scoreboard.title,
      this.width * 0.5,
      this.height - this.height + 64
    );
    c.font = "32px Impact";
    c.fillStyle = "orange";
    c.fillText(
      menuData.scoreboard.levelone,
      this.width * 0.2,
      this.height * 0.5 - 64
    );
    c.fillText(
      getHighScore("Level-01"),
      this.width * 0.2,
      this.height * 0.5 - 16
    );
    c.fillText(
      menuData.scoreboard.leveltwo,
      this.width * 0.4,
      this.height * 0.5 - 64
    );
    c.fillText(
      getHighScore("Level-02"),
      this.width * 0.4,
      this.height * 0.5 - 16
    );
    c.fillText(
      menuData.scoreboard.levelthree,
      this.width * 0.6,
      this.height * 0.5 - 64
    );
    c.fillText(
      getHighScore("Level-03"),
      this.width * 0.6,
      this.height * 0.5 - 16
    );
    c.fillText(
      menuData.scoreboard.levelfour,
      this.width * 0.8,
      this.height * 0.5 - 64
    );
    c.fillText(
      getHighScore("Level-04"),
      this.width * 0.8,
      this.height * 0.5 - 16
    );
    c.fillText(
      menuData.scoreboard.finalScore,
      this.width * 0.5,
      this.height * 0.5 + 64
    );
    c.fillText(getFinalScore(), this.width * 0.5, this.height * 0.5 + 112);
    c.font = "24px Impact";
    c.fillStyle = "white";
    c.fillText(
      menuData.keys.escape + menuData.goTo.startMenu,
      this.width * 0.5,
      this.height - 32
    );
  }
}

export class Credits extends Menu {
  constructor(game) {
    super(game);
    this.background = new BackgroundCredits(this);
  }
  draw(c) {
    super.draw(c);
    c.font = "48px Impact";
    c.textAlign = "center";
    c.fillText(
      menuData.credits.title,
      this.width * 0.5,
      this.height - this.height + 64
    );
    c.font = "28px sans-serif";
    c.fillText(
      menuData.credits.createdBy,
      this.width * 0.5,
      this.height * 0.5 - 100
    );
    c.font = "24px sans-serif";
    c.fillText(
      menuData.credits.franksLab,
      this.width * 0.5,
      this.height * 0.5 - 70
    );
    c.font = "28px sans-serif";
    c.fillText(
      menuData.credits.artAssetsBy,
      this.width * 0.5,
      this.height * 0.5
    );
    c.font = "24px sans-serif";
    c.fillText(
      menuData.credits.bevouliin,
      this.width * 0.5,
      this.height * 0.5 + 30
    );
    c.font = "28px sans-serif";
    c.fillText(
      menuData.credits.modifiedBy,
      this.width * 0.5,
      this.height * 0.5 + 100
    );
    c.font = "24px sans-serif";
    c.fillText(
      menuData.credits.mySite,
      this.width * 0.5,
      this.height * 0.5 + 130
    );
    c.font = "24px Impact";
    c.fillText(
      menuData.keys.escape + menuData.goTo.startMenu,
      this.width * 0.5,
      this.height - 32
    );
  }
}
