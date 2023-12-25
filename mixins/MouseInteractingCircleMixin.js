import { isClose } from "../utils/Closeness.js"
import keepInBounds from "../utils/KeepInBounds.js";

export default function MouseInteractingCircleMixin(Base) {
  return class extends Base {
    setInteractionRadius(interactionRadius) {
      this.interactionRadius = interactionRadius;
    }

    setRadiusOnInteraction(radiusOnInteraction) {
      this.radiusOnInteraction = radiusOnInteraction;
    }

    setMinRadius(minRadius) {
      this.minRadius = minRadius;
    }

    setMouse(mouse) {
      this.mouse = mouse;
    }

    isNearMouse() {
      return isClose(this.x, this.mouse.x, this.y, this.mouse.y, this.interactionRadius);
    }

    mouseInteractingCircleUpdate() {
      if (this.isNearMouse() && this.radius <= this.radiusOnInteraction) {
        this.radius++;
        this.x = keepInBounds(this.x, this.radius, innerWidth - this.radius);
        this.y = keepInBounds(this.y, this.radius, innerHeight - this.radius);
      } else if (this.radius >= this.minRadius) {
        this.radius--;
      }
    }
  }
}