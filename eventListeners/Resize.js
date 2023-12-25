export default function resize(globalState) {
  return () => globalState.initialiseCanvas();
}