import {
  BackgroundStartMenu,
  BackgroundHowToPlay,
  BackgroundScoreboard,
  BackgroundCredits,
  BackgroundGameComplete,
} from "./background.js";

const menuData = {
  startMenu: {
    title: "THE RUNNING DOG",
    play: "( Enter ) Play",
    howToPlay: "( 1 ) How to Play",
    scoreboard: "( 2 ) Scoreboard",
    credits: "( 3 ) Credits",
  },
  howToPlay: {
    title: "How to Play",
    controls: {
      title: "Controls",
      movement: "Move: ( A ) Left, ( D ) Right,  ( W ) Jump, ( S ) Sit",
      attack: "Attacks: ( Shift ) Fire Roll, ( W ) + ( S ) Dive Bomb",
    },
    objective: {
      title: "Objective",
      content:
        "Get the highest Score within the time limit and with as many lives as possible",
    },
  },
  gameComplete: {
    title: "Game Complete",
    score: "Overall Score: ",
  },
  scoreboard: {
    title: "Scoreboard",
    scores: [],
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
  keyEvent: {
    escape: "( ESC ) Return to Start Menu",
    enter: "( Enter ) Continue",
  },
};

class Menu {
  constructor(game) {
    this.game = game;
    this.type = "menu";
    this.width = this.game.width;
    this.height = this.game.height;
    this.input = this.game.input;
  }
  update() {
    if (
      this.constructor.name !== StartMenu &&
      this.input.keys.includes("Escape")
    ) {
      this.game.setMenu("START_MENU");
    }
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
      this.game.width * 0.5,
      this.game.height - this.game.height + 192
    );
    c.font = "32px sans-serif";
    c.fillText(
      menuData.startMenu.play,
      this.game.width * 0.5,
      this.game.height * 0.5 - 10
    );
    c.font = "24px sans-serif";
    c.fillText(
      menuData.startMenu.howToPlay,
      this.game.width * 0.5,
      this.game.height * 0.5 + 35
    );
    c.fillText(
      menuData.startMenu.scoreboard,
      this.game.width * 0.5,
      this.game.height * 0.5 + 75
    );
    c.fillText(
      menuData.startMenu.credits,
      this.game.width * 0.5,
      this.game.height * 0.5 + 115
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
      this.game.width * 0.5,
      this.game.height - this.game.height + 64
    );
    c.font = "32px Impact";
    c.textAlign = "left";
    c.fillText(
      menuData.howToPlay.controls.title,
      50,
      this.game.height * 0.5 - 100
    );
    c.font = "24px sans-serif";
    c.fillText(
      menuData.howToPlay.controls.movement,
      50,
      this.game.height * 0.5 - 60
    );
    c.fillText(
      menuData.howToPlay.controls.attack,
      50,
      this.game.height * 0.5 - 20
    );
    c.font = "32px Impact";
    c.fillText(
      menuData.howToPlay.objective.title,
      50,
      this.game.height * 0.5 + 60
    );
    c.font = "24px sans-serif";
    c.fillText(
      menuData.howToPlay.objective.content,
      50,
      this.game.height * 0.5 + 100
    );
    c.font = "24px Impact";
    c.textAlign = "center";
    c.fillText(
      menuData.keyEvent.escape,
      this.game.width * 0.5,
      this.game.height - 32
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
      this.game.width * 0.5,
      this.game.height - this.game.height + 64
    );
    c.font = "24px Impact";
    c.textAlign = "center";
    c.fillText(
      menuData.gameComplete.score + this.game.overallScore,
      this.game.width * 0.5,
      this.game.height * 0.5
    );
    c.fillText(
      menuData.keyEvent.enter,
      this.game.width * 0.5,
      this.game.height - 32
    );
  }
}

//TODO: Get top 10 scores from local storage
export class Scoreboard extends Menu {
  constructor(game) {
    super(game);
    this.background = new BackgroundScoreboard(this);
    //! Mock data
    // Iterates 10 times to create a random 3 letter name and score between 100 and 200 and push it to the scoreboard.score array in order by highest to lowest score
    for (let i = 1; i <= 10; i++) {
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let name = "";
      const randomScore = Math.floor(Math.random() * 101) + 100;
      for (let n = 0; n < 3; n++) {
        name += letters[Math.floor(Math.random() * letters.length)];
      }
      menuData.scoreboard.scores.push({
        name: name,
        score: randomScore,
      });
    }
    menuData.scoreboard.scores.sort((a, b) => b.score - a.score);
  }
  draw(c) {
    super.draw(c);
    c.font = "48px Impact";
    c.textAlign = "center";
    c.fillText(
      menuData.scoreboard.title,
      this.game.width * 0.5,
      this.game.height - this.game.height + 64
    );
    c.font = "24px Arial";
    c.textAlign = "center";
    for (let i = 0; i < 10; i++) {
      c.fillText(
        `${i + 1} ${menuData.scoreboard.scores[i].name} - ${
          menuData.scoreboard.scores[i].score
        }`,
        this.game.width * 0.5,
        this.game.height - this.game.height + 128 + i * 32
      );
    }
    c.font = "24px Impact";
    c.textAlign = "center";
    c.fillText(
      menuData.keyEvent.escape,
      this.game.width * 0.5,
      this.game.height - 32
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
      this.game.width * 0.5,
      this.game.height - this.game.height + 64
    );
    c.font = "28px sans-serif";
    c.fillText(
      menuData.credits.createdBy,
      this.game.width * 0.5,
      this.game.height * 0.5 - 100
    );
    c.font = "24px sans-serif";
    c.fillText(
      menuData.credits.franksLab,
      this.game.width * 0.5,
      this.game.height * 0.5 - 70
    );
    c.font = "28px sans-serif";
    c.fillText(
      menuData.credits.artAssetsBy,
      this.game.width * 0.5,
      this.game.height * 0.5
    );
    c.font = "24px sans-serif";
    c.fillText(
      menuData.credits.bevouliin,
      this.game.width * 0.5,
      this.game.height * 0.5 + 30
    );
    c.font = "28px sans-serif";
    c.fillText(
      menuData.credits.modifiedBy,
      this.game.width * 0.5,
      this.game.height * 0.5 + 100
    );
    c.font = "24px sans-serif";
    c.fillText(
      menuData.credits.mySite,
      this.game.width * 0.5,
      this.game.height * 0.5 + 130
    );
    c.font = "24px Impact";
    c.fillText(
      menuData.keyEvent.escape,
      this.game.width * 0.5,
      this.game.height - 32
    );
  }
}
