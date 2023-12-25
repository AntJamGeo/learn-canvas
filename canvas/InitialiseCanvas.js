import { random, randomInt, randomSign } from '../utils/Random.js';
import MovingMouseInteractingCircle from '../circle/MovingMouseInteractingCircle.js';

export default function initialiseCanvas(globalState) {
  globalState.canvas.width = innerWidth;
  globalState.canvas.height = innerHeight;
  globalState.circles = [];
  const numCircles = Math.floor(innerWidth * innerHeight * globalState.circleDensity);
  for (let i = 0; i < numCircles; i++) {
    const radius = random(globalState.minRadius, globalState.maxRadius);
    const x = random(radius, innerWidth-radius);
    const y = random(radius, innerHeight-radius);
    const dx = randomSign() * random(globalState.minHorizontalSpeed, globalState.maxHorizontalSpeed);
    const dy = randomSign() * Math.sqrt(globalState.speedSquared - dx**2);
    const colour = globalState.colourPalette[randomInt(0, globalState.colourPalette.length)];

    globalState.circles.push(
      new MovingMouseInteractingCircle(
        x,
        y,
        radius,
        colour,
        dx,
        dy,
        globalState.interactionRadius,
        globalState.radiusOnInteraction,
        globalState.mouse,
      )
    );
    globalState.circles[i].draw(globalState.c);
  }
}