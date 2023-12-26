import mouseMove from "./MouseMove.js";
import mouseOut from "./MouseOut.js";
import resize from "./Resize.js";

export default function addEventListeners() {
  addEventListener("mousemove", mouseMove());
  addEventListener("mouseout", mouseOut());
  addEventListener("resize", resize());
}