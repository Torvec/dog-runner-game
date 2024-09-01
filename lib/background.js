class Background {
  constructor(game) {
    this.game = game;
    this.width = this.game.width;
    this.height = this.game.height;
    this.layerImages = [];
    this.backgroundLayers = [];
  }
  update() {
    this.backgroundLayers.forEach((layer) => {
      layer.update();
    });
  }
  draw(context) {
    // context.fillStyle = "gray";
    // context.fillRect(0, 0, this.width, this.height);
    this.backgroundLayers.forEach((layer) => {
      layer.draw(context);
    });
  }
}

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

export class BackgroundStartMenu extends Background {
  constructor(game) {
    super(game);
  }
}

export class BackgroundLevelOne extends Background {
  constructor(game) {
    super(game);
    this.width = 1667;
    this.height = 500;
    this.layerImages = [
      { src: "../assets/bg-forest/layer-1.png", speedModifier: 0 },
      { src: "../assets/bg-forest/layer-2.png", speedModifier: 0.2 },
      { src: "../assets/bg-forest/layer-3.png", speedModifier: 0.4 },
      { src: "../assets/bg-forest/layer-4.png", speedModifier: 0.8 },
      { src: "../assets/bg-forest/layer-5.png", speedModifier: 1 },
    ];
    this.backgroundLayers = this.layerImages.map((layer) => {
      const image = new Image();
      image.src = layer.src;
      image.onload = () => {
        //TODO: Need to tie this in with initializing each level so that all of the images are loaded before the level starts.
      };
      return new Layer(
        this.game,
        this.width,
        this.height,
        layer.speedModifier,
        image
      );
    });
  }
}

export class BackgroundLevelTwo extends Background {
  constructor(game) {
    super(game);
    this.width = 1667;
    this.height = 500;
    this.layerImages = [
      { src: "../assets/bg-city/layer-1.png", speedModifier: 0 },
      { src: "../assets/bg-city/layer-2.png", speedModifier: 0.2 },
      { src: "../assets/bg-city/layer-3.png", speedModifier: 0.4 },
      { src: "../assets/bg-city/layer-4.png", speedModifier: 0.8 },
      { src: "../assets/bg-city/layer-5.png", speedModifier: 1 },
    ];
    this.backgroundLayers = this.layerImages.map((layer) => {
      const image = new Image();
      image.src = layer.src;
      image.onload = () => {
        image.onload = () => {
          //TODO: Need to tie this in with initializing each level so that all of the images are loaded before the level starts.
        };
      };
      return new Layer(
        this.game,
        this.width,
        this.height,
        layer.speedModifier,
        image
      );
    });
  }
}

// TODO: Change src to different background images once they are created
export class BackgroundLevelThree extends Background {
  constructor(game) {
    super(game);
    this.width = 1667;
    this.height = 500;
    this.layerImages = [
      { src: "../assets/bg-city/layer-2.png", speedModifier: 0.2 },
      { src: "../assets/bg-city/layer-3.png", speedModifier: 0.4 },
      { src: "../assets/bg-city/layer-5.png", speedModifier: 1 },
    ];
    this.backgroundLayers = this.layerImages.map((layer) => {
      const image = new Image();
      image.src = layer.src;
      image.onload = () => {
        image.onload = () => {
          //TODO: Need to tie this in with initializing each level so that all of the images are loaded before the level starts.
        };
      };
      return new Layer(
        this.game,
        this.width,
        this.height,
        layer.speedModifier,
        image
      );
    });
  }
}

export class BackgroundGameComplete extends Background {
  constructor(game) {
    super(game);
  }
}

export class BackgroundScoreboard extends Background {
  constructor(game) {
    super(game);
  }
}

export class BackgroundCredits extends Background {
  constructor(game) {
    super(game);
  }
}
