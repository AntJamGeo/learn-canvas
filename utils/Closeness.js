export function isClose(x1, x2, y1, y2, radius) {
  return (x1-x2)**2 + (y1-y2)**2 < radius**2;
}