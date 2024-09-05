import { Game } from "./lib/Game.js";

window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas1");
  const c = canvas.getContext("2d");
  canvas.width = 1200;
  canvas.height = 500;

  const game = new Game(canvas);

  let previousTimestamp = 0;

  function animate(timeStamp) {
    if (previousTimestamp === 0) previousTimestamp = timeStamp;
    const deltaTime = timeStamp - previousTimestamp;
    previousTimestamp = timeStamp;
    c.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(c);
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
});
