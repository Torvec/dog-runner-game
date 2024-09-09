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
      content:
        "( A ) Move Left, ( D ) Move Right,  ( W ) Jump, ( S ) Sit, ( Shift ) Fire Roll, ( W ) + ( S ) Dive Bomb",
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
    createdBy: "Created by: Frank",
    modifiedBy: "Modified by: Edward Vonschondorf",
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
  }
}

export class StartMenu extends Menu {
  constructor(game) {
    super(game);
    this.background = new BackgroundStartMenu(this);
  }
  draw(c) {
    super.draw(c);
    c.fillStyle = "WHITE";
    c.font = "96px Impact";
    c.textAlign = "center";
    c.fillText(
      menuData.startMenu.title,
      this.game.width * 0.5,
      this.game.height * 0.4
    );
    c.font = "28px sans-serif";
    c.fillText(
      menuData.startMenu.play,
      this.game.width * 0.5,
      this.game.height * 0.5 - 5
    );
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
    c.fillStyle = "WHITE";
    c.font = "48px Impact";
    c.textAlign = "center";
    c.fillText(
      menuData.howToPlay.title,
      this.game.width * 0.5,
      this.game.height - this.game.height + 64
    );
    c.font = "36px Impact";
    c.textAlign = "left";
    c.fillText(
      menuData.howToPlay.controls.title,
      50,
      this.game.height * 0.5 - 60
    );
    c.font = "24px Arial";
    c.fillText(
      menuData.howToPlay.controls.content,
      50,
      this.game.height * 0.5 - 30
    );
    c.font = "36px Impact";
    c.textAlign = "left";
    c.fillText(
      menuData.howToPlay.objective.title,
      50,
      this.game.height * 0.5 + 30
    );
    c.font = "24px Arial";
    c.fillText(
      menuData.howToPlay.objective.content,
      50,
      this.game.height * 0.5 + 60
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
    c.fillStyle = "WHITE";
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

export class Scoreboard extends Menu {
  constructor(game) {
    super(game);
    this.background = new BackgroundScoreboard(this);
    //TODO: Get top 10 scores from local storage
    //! Mock data
    for (let i = 1; i <= 10; i++) {
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let name = "";
      for (let n = 0; n < 3; n++) {
        name += letters[Math.floor(Math.random() * letters.length)];
      }
      menuData.scoreboard.scores.push({
        name: name,
        score: i * 100,
      });
    }
    //! Mock Data
  }
  draw(c) {
    super.draw(c);
    c.fillStyle = "WHITE";
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
    c.fillStyle = "WHITE";
    c.font = "48px Impact";
    c.textAlign = "center";
    c.fillText(
      menuData.credits.title,
      this.game.width * 0.5,
      this.game.height - this.game.height + 64
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
