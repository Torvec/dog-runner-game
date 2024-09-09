import { Game } from "./lib/Game.js";

const canvas = document.getElementById("canvas1");
const c = canvas.getContext("2d");
canvas.width = 1200;
canvas.height = 500;

const game = new Game(canvas);

let previousTimestamp = 0;

function animationLoop(timeStamp) {
  if (previousTimestamp === 0) previousTimestamp = timeStamp;
  const deltaTime = timeStamp - previousTimestamp;
  previousTimestamp = timeStamp;
  c.clearRect(0, 0, canvas.width, canvas.height);
  game.render(deltaTime, c);
  requestAnimationFrame(animationLoop);
}
requestAnimationFrame(animationLoop);
