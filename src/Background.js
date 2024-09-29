const backgroundData = {
  startMenu: {
    "layer-01": {
      src: "backgrounds/city/layer-3.png",
      scrollXSpeed: 0.1,
    },
    "layer-02": {
      src: "backgrounds/forest/layer-5.png",
      scrollXSpeed: 0.5,
    },
  },
  levelOne: {
    "layer-01": {
      src: "backgrounds/forest/layer-1.png",
      scrollXSpeed: 0,
    },
    "layer-02": {
      src: "backgrounds/forest/layer-2.png",
      scrollXSpeed: 0.2,
    },
    "layer-03": {
      src: "backgrounds/forest/layer-3.png",
      scrollXSpeed: 0.4,
    },
    "layer-04": {
      src: "backgrounds/forest/layer-4.png",
      scrollXSpeed: 0.8,
    },
    "layer-05": {
      src: "backgrounds/forest/layer-5.png",
      scrollXSpeed: 1,
    },
  },
  levelTwo: {
    "layer-01": {
      src: "backgrounds/forest/layer-1_alt.png",
      scrollXSpeed: 0,
    },
    "layer-02": {
      src: "backgrounds/forest/layer-2.png",
      scrollXSpeed: 0.2,
    },
    "layer-03": {
      src: "backgrounds/forest/layer-3.png",
      scrollXSpeed: 0.4,
    },
    "layer-04": {
      src: "backgrounds/forest/layer-4.png",
      scrollXSpeed: 0.8,
    },
    "layer-05": {
      src: "backgrounds/forest/layer-5.png",
      scrollXSpeed: 1,
    },
  },
  levelThree: {
    "layer-01": {
      src: "backgrounds/city/layer-1.png",
      scrollXSpeed: 0,
    },
    "layer-02": {
      src: "backgrounds/city/layer-2.png",
      scrollXSpeed: 0.1,
    },
    "layer-03": {
      src: "backgrounds/city/layer-3.png",
      scrollXSpeed: 0.2,
    },
    "layer-04": {
      src: "backgrounds/city/layer-4.png",
      scrollXSpeed: 0.4,
    },
    "layer-05": {
      src: "backgrounds/city/layer-5.png",
      scrollXSpeed: 1,
    },
  },
  levelFour: {
    "layer-01": {
      src: "backgrounds/city/layer-1_alt.png",
      scrollXSpeed: 0,
    },
    "layer-02": {
      src: "backgrounds/city/layer-2.png",
      scrollXSpeed: 0.1,
    },
    "layer-03": {
      src: "backgrounds/city/layer-3.png",
      scrollXSpeed: 0.2,
    },
    "layer-04": {
      src: "backgrounds/city/layer-4.png",
      scrollXSpeed: 0.4,
    },
    "layer-05": {
      src: "backgrounds/city/layer-5.png",
      scrollXSpeed: 1,
    },
  },
  levelBoss: {
    "layer-01": {
      src: "backgrounds/city/layer-1_alt_flip.png",
      scrollXSpeed: 0,
    },
    "layer-02": {
      src: "backgrounds/city/layer-2_alt.png",
      scrollXSpeed: 0.5,
    },
    "layer-03": {
      src: "backgrounds/city/layer-5_alt.png",
      scrollXSpeed: 1,
    },
  },
};

export class Background {
  constructor(game, scene) {
    this.game = game;
    this.width = 1667;
    this.height = 500;
    this.data = backgroundData[scene];
    this.backgroundLayers = this.handleBackgroundImages(this.data);
  }
  handleBackgroundImages(imgObjArr) {
    return Object.values(imgObjArr).map((layer) => {
      const image = new Image();
      image.src = layer.src;
      return new Layer(
        this.game,
        this.width,
        this.height,
        layer.scrollXSpeed,
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
  constructor(game, width, height, scrollXSpeed, image) {
    this.game = game;
    this.width = width;
    this.height = height;
    this.scrollXSpeed = scrollXSpeed;
    this.image = image;
    this.position = { x: 0, y: 0 };
  }
  update() {
    if (this.position.x < -this.width) this.position.x = 0;
    else this.position.x -= this.game.speed * this.scrollXSpeed;
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
      this.position.x + this.width - 1, // -1 to prevent gaps
      this.position.y,
      this.width,
      this.height
    );
  }
}
