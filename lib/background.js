import { loadJsonData } from "./utils.js";
const backgroundData = await loadJsonData("../data/backgrounds.json");

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
