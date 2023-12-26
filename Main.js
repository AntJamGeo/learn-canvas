import addEventListeners from "./eventListeners/EventListeners.js";
import initialiseCanvas from "./canvas/InitialiseCanvas.js";
import animate from "./canvas/Animate.js";

function main() {
  addEventListeners();
  initialiseCanvas();
  animate();
}

main();