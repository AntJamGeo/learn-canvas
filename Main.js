import GlobalState from "./GlobalState.js";

function main() {
  const globalState = new GlobalState();
  globalState.addEventListeners();
  globalState.initialiseCanvas();
  globalState.animate();
}

main();