import { drawCircle } from '../canvas/CanvasDrawing.js';

export default class Circle {
  constructor (x, y, radius, colour) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.colour = colour;
  }

  draw (canvasContext) {
    drawCircle(canvasContext, this.x, this.y, this.radius, this.colour);
  }
}