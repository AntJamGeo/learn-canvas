import mouseMove from "./MouseMove.js";
import mouseOut from "./MouseOut.js";
import resize from "./Resize.js";

export default function addEventListeners(globalState) {
  addEventListener("mousemove", mouseMove(globalState));
  addEventListener("mouseout", mouseOut(globalState));
  addEventListener("resize", resize(globalState));
}