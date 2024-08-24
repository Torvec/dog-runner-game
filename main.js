import Game from "./lib/Game.js";

window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas1");
  const context = canvas.getContext("2d");
  canvas.width = 1200;
  canvas.height = 500;

  const game = new Game(canvas);
  let previousTimestamp = 0;
  function animate(timeStamp) {
    const deltaTime = timeStamp - previousTimestamp;
    previousTimestamp = timeStamp;
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (!game.isPaused || game.gameOver) game.update(deltaTime);
    game.draw(context);
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
});
