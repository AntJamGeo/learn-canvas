import { Mouse } from "../globalObjects/Mouse.js";

export default function mouseOut() {
  return function(event) {
    if(event.clientY <= 0 || event.clientX <= 0 || (event.clientX >= innerWidth || event.clientY >= innerHeight)) {
      Mouse.x = undefined;
      Mouse.y = undefined;
    }
  }
}
