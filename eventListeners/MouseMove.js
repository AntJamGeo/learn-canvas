export default function mouseMove(globalState) {
  return function(event) {
    globalState.mouse.x = event.x;
    globalState.mouse.y = event.y;
  }
}
