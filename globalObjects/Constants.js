// Canvas
const canvas = document.querySelector('canvas');
const canvasContext = canvas.getContext('2d');

// Circle Properties - Size
const minRadius = 1;
const maxRadius = 4;
// Circle Properties - Movement
const minHorizontalSpeed = 1;
const maxHorizontalSpeed = 3;
const speedSquared = minHorizontalSpeed**2 + maxHorizontalSpeed**2;
// Circle Properties - Interactivity
const interactionRadius = 100;
const radiusOnInteraction = 10;

const circleDensity = 0.0002;

// Line Properties
const lineProbability = 0.1;
const lineColour = '#FFF';

// Colours
const colourPalette = [
  "#05AFF2",
  "#0DB3D9",
  "#F2A950",
  "#F26716",
  "#F21F0C",
]

export const CONSTANTS = {
  canvas: canvas,
  canvasContext: canvasContext,
  minRadius: minRadius,
  maxRadius: maxRadius,
  minHorizontalSpeed: minHorizontalSpeed,
  maxHorizontalSpeed: maxHorizontalSpeed,
  speedSquared: speedSquared,
  interactionRadius: interactionRadius,
  radiusOnInteraction: radiusOnInteraction,
  circleDensity: circleDensity,
  lineProbability: lineProbability,
  lineColour: lineColour,
  colourPalette: colourPalette,
}

