export default function mouseOut(globalState) {
  return function(event) {
    const mouse = globalState.mouse;
    if(event.clientY <= 0 || event.clientX <= 0 || (event.clientX >= innerWidth || event.clientY >= innerHeight)) {
      mouse.x = undefined;
      mouse.y = undefined;
    }
  }
}
