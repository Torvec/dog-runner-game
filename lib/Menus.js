import {
  BackgroundStartMenu,
  BackgroundHowToPlay,
  BackgroundScoreboard,
  BackgroundCredits,
} from "./background.js";

class Menu {
  constructor(game) {
    this.game = game;
    this.width = this.game.width;
    this.height = this.game.height;
    this.input = this.game.input;
  }
  update() {}
  draw(c) {
    this.background.draw(c);
  }
}

export class StartMenu extends Menu {
  constructor(game) {
    super(game);
    this.background = new BackgroundStartMenu(this);
    this.startMenuText = {
      title: "THE RUNNING DOG",
      play: "( Enter ) Play",
      howToPlay: "( 1 ) How to Play",
      scoreboard: "( 2 ) Scoreboard",
      credits: "( 3 ) Credits",
    };
  }
  update() {
    super.update();
  }
  draw(c) {
    super.draw(c);
    c.fillStyle = "WHITE";
    c.font = "96px Impact";
    c.textAlign = "center";
    c.fillText(
      this.startMenuText.title,
      this.game.width * 0.5,
      this.game.height * 0.4
    );
    c.font = "28px sans-serif";
    c.fillText(
      this.startMenuText.play,
      this.game.width * 0.5,
      this.game.height * 0.5 - 5
    );
    c.fillText(
      this.startMenuText.howToPlay,
      this.game.width * 0.5,
      this.game.height * 0.5 + 35
    );
    c.fillText(
      this.startMenuText.scoreboard,
      this.game.width * 0.5,
      this.game.height * 0.5 + 75
    );
    c.fillText(
      this.startMenuText.credits,
      this.game.width * 0.5,
      this.game.height * 0.5 + 115
    );
  }
}

export class HowToPlay extends Menu {
  constructor(game) {
    super(game);
    this.background = new BackgroundHowToPlay(this);
    this.howToPlayText = {
      title: "How to Play",
      controls: {
        title: "Controls",
        content:
          "Press ( x ) to Move Left, ( x ) to Move Right,  ( x ) to Jump, ( x ) to Dive Bomb, ( x ) to Fire Roll",
      },
      objective: {
        title: "Objective",
        content:
          "Get the highest Score within the time limit and with as many lives as possible",
      },
      playerAction: "Press [ Enter ] to Continue",
    };
  }
  draw(c) {
    super.draw(c);
    c.fillStyle = "WHITE";
    c.font = "48px Impact";
    c.textAlign = "center";
    c.fillText(this.howToPlayText.title, this.game.width * 0.5, 74);
    c.font = "36px Impact";
    c.textAlign = "left";
    c.fillText(this.howToPlayText.controls.title, 50, 122);
    c.font = "24px Arial";
    c.fillText(this.howToPlayText.controls.content, 50, 150);
    c.font = "36px Impact";
    c.textAlign = "left";
    c.fillText(this.howToPlayText.objective.title, 50, 222);
    c.font = "24px Arial";
    c.fillText(this.howToPlayText.objective.content, 50, 250);
    c.font = "24px Impact";
    c.textAlign = "center";
    c.fillText(
      this.howToPlayText.playerAction,
      this.game.width * 0.5,
      this.game.height - 50
    );
  }
}

export class Scoreboard extends Menu {
  constructor(game) {
    super(game);
    this.background = new BackgroundScoreboard(this);
    this.scoreboardText = {
      title: "Scoreboard",
      playerAction: "Press ( Enter ) to Continue",
    };
    this.scores = [];
    //TODO: Get top 10 scores from local storage
    //! Mock data
    for (let i = 0; i < 10; i++) {
      this.scores.push({
        name: "AAA",
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
      this.scoreboardText.title,
      this.game.width * 0.5,
      this.game.height - this.game.height + 64
    );
    c.font = "24px Arial";
    c.textAlign = "center";
    for (let i = 0; i < 10; i++) {
      c.fillText(
        `0${i + 1}) ${this.scores[i].name} - ${this.scores[i].score}`,
        this.game.width * 0.5,
        this.game.height - this.game.height + 128 + i * 32
      );
    }
    c.font = "24px Impact";
    c.textAlign = "center";
    c.fillText(
      this.scoreboardText.playerAction,
      this.game.width * 0.5,
      this.game.height - 32
    );
  }
}

export class Credits extends Menu {
  constructor(game) {
    super(game);
    this.background = new BackgroundCredits(this);
    this.creditsText = {
        title: "Credits",
        createdBy: "Created by: Frank",
        modifiedBy: "Modified by: Edward Vonschondorf",
        playerAction: "Press ( Enter ) to Continue",
    };
  }
  draw(c) {
    super.draw(c);
    c.fillStyle = "WHITE";
    c.font = "48px Impact";
    c.textAlign = "center";
    c.fillText(
      this.creditsText.title,
      this.game.width * 0.5,
      this.game.height - this.game.height + 64
    );
    c.font = "24px Impact";
    c.textAlign = "center";
    c.fillText(
      this.creditsText.playerAction,
      this.game.width * 0.5,
      this.game.height - 32
    );
  }
}
