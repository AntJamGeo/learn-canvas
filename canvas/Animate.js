import { CircleCollections } from "../globalObjects/CircleCollections.js";
import { CONSTANTS } from "../globalObjects/Constants.js";
import { drawLine, drawCircle } from "./CanvasDrawing.js";

const { canvasContext, lineProbability, lineColour } = CONSTANTS;

export default function animate() {
    requestAnimationFrame(animate);
    clearCanvas();
    deleteDepartedCirclesFromNearMouseSet();
    deleteNoLongerLinkedPairs();
    generateNewLinkedPairs();
    drawLines();
    drawCircles();
};

function clearCanvas() {
  canvasContext.clearRect(0,  0, innerWidth, innerHeight);
};

function deleteDepartedCirclesFromNearMouseSet() {
  for (const circle of CircleCollections.circlesNearMouse) {
    if (!circle.isNearMouse()) {
      CircleCollections.circlesNearMouse.delete(circle);
    }
  }
}

function deleteNoLongerLinkedPairs() {
  for (const pair of CircleCollections.linkedCirclePairs) {
    if (!CircleCollections.circlesNearMouse.has(pair[0]) || !CircleCollections.circlesNearMouse.has(pair[1])) {
      CircleCollections.linkedCirclePairs.delete(pair);
    }
  }
}

function generateNewLinkedPairs() {
  for (const circle of CircleCollections.allCircles) {
    if (!CircleCollections.circlesNearMouse.has(circle) && circle.isNearMouse()) {
      for (const nearbyCircle of CircleCollections.circlesNearMouse) {
        if (Math.random() < lineProbability) {
          CircleCollections.linkedCirclePairs.add([circle, nearbyCircle]);
        }
      }
      CircleCollections.circlesNearMouse.add(circle);
    }
  }
}

function drawLines() {
  for (const pair of CircleCollections.linkedCirclePairs) {
    drawLine(canvasContext, pair[0].x, pair[0].y, pair[1].x, pair[1].y, lineColour);
  }
}

function drawCircles() {
  for (const circle of CircleCollections.allCircles) {
    circle.update();
    circle.draw(canvasContext);
  }
}