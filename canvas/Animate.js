import { drawLine } from "./CanvasDrawing.js";

export default function animate(globalState) {
    requestAnimationFrame(() => animate(globalState));
    globalState.c.clearRect(0, 0, innerWidth, innerHeight);

    // Remove circles that are no longer near mouse from circlesNearMouse
    for (const circle of globalState.circlesNearMouse) {
      if (!circle.isNearMouse()) {
        globalState.circlesNearMouse.delete(circle);
      }
    }
    // Remove pairs of circles where at least one of the circles is no
    // longer near the mouse
    for (const pair of globalState.circlePairs) {
      if (!globalState.circlesNearMouse.has(pair[0]) || !globalState.circlesNearMouse.has(pair[1])) {
        globalState.circlePairs.delete(pair);
      }
    }
    // Add new pairs for circles that have just come near to the mouse
    for (const circle of globalState.circles) {
      if (!globalState.circlesNearMouse.has(circle) && circle.isNearMouse()) {
        for (const nearbyCircle of globalState.circlesNearMouse) {
          if (Math.random() < globalState.lineProbability) {
            globalState.circlePairs.add([circle, nearbyCircle]);
          }
        }
        globalState.circlesNearMouse.add(circle);
      }
    }
    // Redraw all lines between the collected pairs of circles
    for (const pair of globalState.circlePairs) {
      drawLine(globalState.c, pair[0].x, pair[0].y, pair[1].x, pair[1].y, globalState.lineColour);
    }
    // Draw all circles
    for (const circle of globalState.circles) {
      circle.update();
      circle.draw(globalState.c);
    }
}