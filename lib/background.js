class Layer {
  constructor(game, width, height, speedModifier, image) {
    this.game = game;
    this.width = width;
    this.height = height;
    this.speedModifier = speedModifier;
    this.image = image;
    this.position = { x: 0, y: 0 };
  }
  update() {
    if (this.position.x < -this.width) this.position.x = 0;
    else this.position.x -= this.game.speed * this.speedModifier;
  }
  draw(context) {
    context.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    context.drawImage(
      this.image,
      this.position.x + this.width,
      this.position.y,
      this.width,
      this.height
    );
  }
}

class StaticBackground {
  constructor(game) {
    this.game = game;
    this.width = this.game.width;
    this.height = this.game.height;
  }
  update() {
    // Do nothing
  }
  draw(context) {
    context.fillStyle = "gray";
    context.fillRect(0, 0, this.width, this.height);
  }
}

export class BackgroundStartMenu extends StaticBackground {
  constructor(game) {
    super(game);
  }
}

export class BackgroundLevelOne {
  constructor(gameLevel) {
    this.gameLevel = gameLevel;
    this.width = 1667;
    this.height = 500;
    this.layer1image = new Image();
    this.layer1image.src = "../assets/bg-forest/layer-1.png";
    this.layer2image = new Image();
    this.layer2image.src = "../assets/bg-forest/layer-2.png";
    this.layer3image = new Image();
    this.layer3image.src = "../assets/bg-forest/layer-3.png";
    this.layer4image = new Image();
    this.layer4image.src = "../assets/bg-forest/layer-4.png";
    this.layer5image = new Image();
    this.layer5image.src = "../assets/bg-forest/layer-5.png";
    this.layer1 = new Layer(
      this.gameLevel,
      this.width,
      this.height,
      0,
      this.layer1image
    );
    this.layer2 = new Layer(
      this.gameLevel,
      this.width,
      this.height,
      0.2,
      this.layer2image
    );
    this.layer3 = new Layer(
      this.gameLevel,
      this.width,
      this.height,
      0.4,
      this.layer3image
    );
    this.layer4 = new Layer(
      this.gameLevel,
      this.width,
      this.height,
      0.8,
      this.layer4image
    );
    this.layer5 = new Layer(
      this.gameLevel,
      this.width,
      this.height,
      1,
      this.layer5image
    );
    this.backgroundLayers = [
      this.layer1,
      this.layer2,
      this.layer3,
      this.layer4,
      this.layer5,
    ];
  }
  update() {
    this.backgroundLayers.forEach((layer) => {
      layer.update();
    });
  }
  draw(context) {
    this.backgroundLayers.forEach((layer) => {
      layer.draw(context);
    });
  }
}

export class BackgroundLevelTwo {
  constructor(gameLevel) {
    this.gameLevel = gameLevel;
    this.width = 1667;
    this.height = 500;
    this.layer1image = new Image();
    this.layer1image.src = "../assets/bg-city/layer-1.png";
    this.layer2image = new Image();
    this.layer2image.src = "../assets/bg-city/layer-2.png";
    this.layer3image = new Image();
    this.layer3image.src = "../assets/bg-city/layer-3.png";
    this.layer4image = new Image();
    this.layer4image.src = "../assets/bg-city/layer-4.png";
    this.layer5image = new Image();
    this.layer5image.src = "../assets/bg-city/layer-5.png";
    this.layer1 = new Layer(
      this.gameLevel,
      this.width,
      this.height,
      0,
      this.layer1image
    );
    this.layer2 = new Layer(
      this.gameLevel,
      this.width,
      this.height,
      0.2,
      this.layer2image
    );
    this.layer3 = new Layer(
      this.gameLevel,
      this.width,
      this.height,
      0.4,
      this.layer3image
    );
    this.layer4 = new Layer(
      this.gameLevel,
      this.width,
      this.height,
      0.8,
      this.layer4image
    );
    this.layer5 = new Layer(
      this.gameLevel,
      this.width,
      this.height,
      1,
      this.layer5image
    );
    this.backgroundLayers = [
      this.layer1,
      this.layer2,
      this.layer3,
      this.layer4,
      this.layer5,
    ];
  }
  update() {
    this.backgroundLayers.forEach((layer) => {
      layer.update();
    });
  }
  draw(context) {
    this.backgroundLayers.forEach((layer) => {
      layer.draw(context);
    });
  }
}

// TODO: Change src to different background images once they are created
export class BackgroundLevelThree {
  constructor(gameLevel) {
    this.gameLevel = gameLevel;
    this.width = 1667;
    this.height = 500;
    this.layer1image = new Image();
    this.layer1image.src = "../assets/bg-city/layer-1.png";
    this.layer2image = new Image();
    this.layer2image.src = "../assets/bg-city/layer-2.png";
    this.layer3image = new Image();
    this.layer3image.src = "../assets/bg-city/layer-3.png";
    this.layer4image = new Image();
    this.layer4image.src = "../assets/bg-city/layer-4.png";
    this.layer5image = new Image();
    this.layer5image.src = "../assets/bg-city/layer-5.png";
    // this.layer1 = new Layer(
    //   this.gameLevel,
    //   this.width,
    //   this.height,
    //   0,
    //   this.layer1image
    // );
    this.layer2 = new Layer(
      this.gameLevel,
      this.width,
      this.height,
      0.2,
      this.layer2image
    );
    this.layer3 = new Layer(
      this.gameLevel,
      this.width,
      this.height,
      0.4,
      this.layer3image
    );
    // this.layer4 = new Layer(
    //   this.gameLevel,
    //   this.width,
    //   this.height,
    //   0.8,
    //   this.layer4image
    // );
    this.layer5 = new Layer(
      this.gameLevel,
      this.width,
      this.height,
      1,
      this.layer5image
    );
    this.backgroundLayers = [
      // this.layer1,
      this.layer2,
      this.layer3,
      // this.layer4,
      this.layer5,
    ];
  }
  update() {
    this.backgroundLayers.forEach((layer) => {
      layer.update();
    });
  }
  draw(context) {
    this.backgroundLayers.forEach((layer) => {
      layer.draw(context);
    });
  }
}

export class BackgroundGameComplete extends StaticBackground {
  constructor(game) {
    super(game);
  }
}

export class BackgroundScoreboard extends StaticBackground {
  constructor(game) {
    super(game);
  }
}

export class BackgroundCredits extends StaticBackground {
  constructor(game) {
    super(game);
  }
}
