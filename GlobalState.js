import addEventListeners from "./eventListeners/EventListeners.js";
import initialiseCanvas from "./canvas/InitialiseCanvas.js";
import animate from "./canvas/Animate.js";

export default class GlobalState {
  constructor() {
    // Canvas
    this.canvas = document.querySelector('canvas');
    this.c = this.canvas.getContext('2d');

    // Circle Properties - Size
    this.minRadius = 1;
    this.maxRadius = 4;
    // Circle Properties - Movement
    this.speedSquared = 10;
    this.minHorizontalSpeed = 1;
    this.maxHorizontalSpeed = Math.sqrt(this.speedSquared - this.minHorizontalSpeed**2);
    // Circle Properties - Interactivity
    this.interactionRadius = 100;
    this.radiusOnInteraction = 10;

    this.circleDensity = 0.0005;

    // Line Properties
    this.lineProbability = 0.1;
    this.lineColour = '#FFF';

    // Colours
    this.colourPalette = [
      "#05AFF2",
      "#0DB3D9",
      "#F2A950",
      "#F26716",
      "#F21F0C",
    ]

    this.mouse = {
      x: undefined,
      y: undefined,
    };

    // Circle collections
    this.circles = [];
    this.circlesNearMouse = new Set();
    this.circlePairs = new Set();
  }
  
  addEventListeners() {
    addEventListeners(this);
  }

  initialiseCanvas() {
    initialiseCanvas(this);
  }

  animate() {
    animate(this); 
  }
}