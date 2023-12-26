import { random, randomInt, randomSign } from '../utils/Random.js';
import MovingMouseInteractingCircle from '../circle/MovingMouseInteractingCircle.js';
import { CONSTANTS } from '../globalObjects/Constants.js';
import { CircleCollections, initialiseCircleCollections } from '../globalObjects/CircleCollections.js';
import { Mouse } from '../globalObjects/Mouse.js';


export default function initialiseCanvas() {
  setCanvasDimensions();
  initialiseCircleCollections();
  generateCircles();
  drawCircles();
}

function setCanvasDimensions() {
  CONSTANTS.canvas.width = innerWidth;
  CONSTANTS.canvas.height = innerHeight;
}

function getNumberOfCircles() {
  return Math.floor(innerWidth * innerHeight * CONSTANTS.circleDensity);
}

function generateCircles() {
  const numCircles = getNumberOfCircles();
  for (let i = 0; i < numCircles; i++) {
    const radius = random(CONSTANTS.minRadius, CONSTANTS.maxRadius);
    const x = random(radius, innerWidth-radius);
    const y = random(radius, innerHeight-radius);
    const dx = randomSign() * random(CONSTANTS.minHorizontalSpeed, CONSTANTS.maxHorizontalSpeed);
    const dy = randomSign() * Math.sqrt(CONSTANTS.speedSquared - dx**2);
    const colour = CONSTANTS.colourPalette[randomInt(0, CONSTANTS.colourPalette.length)];

    CircleCollections.allCircles.push(
      new MovingMouseInteractingCircle(
        x,
        y,
        radius,
        colour,
        dx,
        dy,
        CONSTANTS.interactionRadius,
        CONSTANTS.radiusOnInteraction,
        Mouse,
      )
    );
  }
}

function drawCircles() {
  for (const circle of CircleCollections.allCircles) {
    circle.draw(CONSTANTS.canvasContext);
  }
}