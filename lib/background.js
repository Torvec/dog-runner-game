class Background {
  constructor(game) {
    this.game = game;
    this.width = this.game.width;
    this.height = this.game.height;
    this.layerImages = [];
    this.backgroundLayers = [];
  }
  handleBackgroundImages(imgObjArr) {
    return imgObjArr.map((layer) => {
      const image = new Image();
      image.src = layer.src;
      return new Layer(
        this.game,
        this.width,
        this.height,
        layer.scrollXRate,
        image
      );
    });
  }
  update() {
    this.backgroundLayers.forEach((layer) => {
      layer.update();
    });
  }
  draw(c) {
    this.backgroundLayers.forEach((layer) => {
      layer.draw(c);
    });
  }
}

class Layer {
  constructor(game, width, height, scrollXRate, image) {
    this.game = game;
    this.width = width;
    this.height = height;
    this.scrollXRate = scrollXRate;
    this.image = image;
    this.position = { x: 0, y: 0 };
  }
  update() {
    if (this.position.x < -this.width) this.position.x = 0;
    else this.position.x -= this.game.speed * this.scrollXRate;
  }
  draw(c) {
    c.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    c.drawImage(
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
    this.width = 1667;
    this.height = 500;
    this.layerImages = [
      { src: "../assets/backgrounds/city/layer-3.png", scrollXRate: 0.1 },
      { src: "../assets/backgrounds/forest/layer-5.png", scrollXRate: 0.5 },
    ];
    this.backgroundLayers = this.handleBackgroundImages(this.layerImages);
  }
}

export class BackgroundLevelOne extends Background {
  constructor(game) {
    super(game);
    this.width = 1667;
    this.height = 500;
    this.layerImages = [
      { src: "../assets/backgrounds/forest/layer-1.png", scrollXRate: 0 },
      { src: "../assets/backgrounds/forest/layer-2.png", scrollXRate: 0.2 },
      { src: "../assets/backgrounds/forest/layer-3.png", scrollXRate: 0.4 },
      { src: "../assets/backgrounds/forest/layer-4.png", scrollXRate: 0.8 },
      { src: "../assets/backgrounds/forest/layer-5.png", scrollXRate: 1 },
    ];
    this.backgroundLayers = this.handleBackgroundImages(this.layerImages);
  }
}

export class BackgroundLevelTwo extends Background {
  constructor(game) {
    super(game);
    this.width = 1667;
    this.height = 500;
    this.layerImages = [
      { src: "../assets/backgrounds/forest/layer-2.png", scrollXRate: 0.2 },
      { src: "../assets/backgrounds/forest/layer-3.png", scrollXRate: 0.4 },
      { src: "../assets/backgrounds/forest/layer-4.png", scrollXRate: 0.8 },
      { src: "../assets/backgrounds/forest/layer-5.png", scrollXRate: 1 },
    ];
    this.backgroundLayers = this.handleBackgroundImages(this.layerImages);
  }
}


export class BackgroundLevelThree extends Background {
  constructor(game) {
    super(game);
    this.width = 1667;
    this.height = 500;
    this.layerImages = [
      { src: "../assets/backgrounds/city/layer-1.png", scrollXRate: 0 },
      { src: "../assets/backgrounds/city/layer-2.png", scrollXRate: 0.1 },
      { src: "../assets/backgrounds/city/layer-3.png", scrollXRate: 0.2 },
      { src: "../assets/backgrounds/city/layer-4.png", scrollXRate: 0.4 },
      { src: "../assets/backgrounds/city/layer-5.png", scrollXRate: 1 },
    ];
    this.backgroundLayers = this.handleBackgroundImages(this.layerImages);
  }
}

export class BackgroundLevelFour extends Background {
  constructor(game) {
    super(game);
    this.width = 1667;
    this.height = 500;
    this.layerImages = [
      { src: "../assets/backgrounds/city/layer-2.png", scrollXRate: 0.1 },
      { src: "../assets/backgrounds/city/layer-3.png", scrollXRate: 0.2 },
      { src: "../assets/backgrounds/city/layer-4.png", scrollXRate: 0.4 },
      { src: "../assets/backgrounds/city/layer-5.png", scrollXRate: 1 },
    ];
    this.backgroundLayers = this.handleBackgroundImages(this.layerImages);
  }
}