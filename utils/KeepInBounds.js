export default function keepInBounds(x, lo, hi) {
  return x <= lo ? lo : x >= hi ? hi : x
}