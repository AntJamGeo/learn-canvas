import MovingMixin from '../mixins/MovingMixin.js';
import Circle from './Circle.js';

export default class MovingCircle extends MovingMixin(Circle) {
  constructor(x, y, radius, colour, dx, dy) {
    super(x, y, radius, colour);
    this.setVelocity(dx, dy);
  }
}