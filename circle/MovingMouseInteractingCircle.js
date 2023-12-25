import MouseInteractingCircleMixin from "../mixins/MouseInteractingCircleMixin.js";
import MovingCircle from "./MovingCircle.js";

export default class MovingMouseInteractingCircle extends MouseInteractingCircleMixin(MovingCircle) {
  constructor(x, y, radius, colour, dx, dy, interactionRadius, radiusOnInteraction, mouse) {
    super(x, y, radius, colour, dx, dy);
    this.setInteractionRadius(interactionRadius);
    this.setRadiusOnInteraction(radiusOnInteraction);
    this.setMinRadius(radius);
    this.setMouse(mouse);
  }

  update() {
    this.movingUpdate();
    this.mouseInteractingCircleUpdate();
  }
}