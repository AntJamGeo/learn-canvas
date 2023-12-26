import { Mouse } from "../globalObjects/Mouse.js";

export default function mouseMove() {
  return function(event) {
    Mouse.x = event.x;
    Mouse.y = event.y;
  }
}
