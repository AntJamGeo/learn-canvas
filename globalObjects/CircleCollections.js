export const CircleCollections = {
  allCircles: [],
  circlesNearMouse: new Set(),
  linkedCirclePairs: new Set(),
}

export function initialiseCircleCollections() {
  CircleCollections.allCircles = [];
  CircleCollections.circlesNearMouse = new Set();
  CircleCollections.linkedCirclePairs = new Set();
}