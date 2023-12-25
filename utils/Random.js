export function random(lo, hi) {
  return Math.random()*(hi - lo) + lo;
}

export function randomSign() {
  return Math.sign(Math.random() - 0.5);
}

export function randomInt(lo, hi) {
  return Math.floor(random(lo, hi+1));
}
