import {
  BackgroundStartMenu,
  BackgroundHowToPlay,
  BackgroundScoreboard,
  BackgroundCredits,
  BackgroundGameComplete,
} from "./background.js";

class Menu {
  constructor(game) {
    this.game = game;
    this.type = "menu";
    this.width = this.game.width;
    this.height = this.game.height;
    this.input = this.game.input;
    this.startMenuText = {
      title: "THE RUNNING DOG",
      play: "( Enter ) Play",
      howToPlay: "( 1 ) How to Play",
      scoreboard: "( 2 ) Scoreboard",
      credits: "( 3 ) Credits",
    };
    this.howToPlayText = {
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
      playerAction: "[ ESC ] Return to Start Menu",
    };
    this.gameCompleteText = {
      title: "Game Complete",
      score: "Overall Score: ",
      scoreValue: this.game.overallScore,
      playerAction: "( Enter ) to Continue",
    };
    this.scoreboardText = {
      title: "Scoreboard",
      playerAction: "[ ESC ] Return to Start Menu",
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
    this.creditsText = {
      title: "Credits",
      createdBy: "Created by: Frank",
      modifiedBy: "Modified by: Edward Vonschondorf",
      playerAction: "[ ESC ] Return to Start Menu",
    };
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
  }
  draw(c) {
    super.draw(c);
    c.fillStyle = "WHITE";
    c.font = "48px Impact";
    c.textAlign = "center";
    c.fillText(
      this.howToPlayText.title,
      this.game.width * 0.5,
      this.game.height - this.game.height + 64
    );
    c.font = "36px Impact";
    c.textAlign = "left";
    c.fillText(
      this.howToPlayText.controls.title,
      50,
      this.game.height * 0.5 - 60
    );
    c.font = "24px Arial";
    c.fillText(
      this.howToPlayText.controls.content,
      50,
      this.game.height * 0.5 - 30
    );
    c.font = "36px Impact";
    c.textAlign = "left";
    c.fillText(
      this.howToPlayText.objective.title,
      50,
      this.game.height * 0.5 + 30
    );
    c.font = "24px Arial";
    c.fillText(
      this.howToPlayText.objective.content,
      50,
      this.game.height * 0.5 + 60
    );
    c.font = "24px Impact";
    c.textAlign = "center";
    c.fillText(
      this.howToPlayText.playerAction,
      this.game.width * 0.5,
      this.game.height - 32
    );
  }
}

export class GameComplete extends Menu {
  constructor(game) {
    super(game);
    this.background = new BackgroundGameComplete(this);
    console.log(this.game.overallScore);
  }
  draw(c) {
    super.draw(c);
    c.fillStyle = "WHITE";
    c.font = "48px Impact";
    c.textAlign = "center";
    c.fillText(
      this.gameCompleteText.title,
      this.game.width * 0.5,
      this.game.height - this.game.height + 64
    );
    c.font = "24px Impact";
    c.textAlign = "center";
    c.fillText(
      this.gameCompleteText.score + this.gameCompleteText.scoreValue,
      this.game.width * 0.5,
      this.game.height * 0.5
    );
    c.fillText(
      this.gameCompleteText.playerAction,
      this.game.width * 0.5,
      this.game.height - 32
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
