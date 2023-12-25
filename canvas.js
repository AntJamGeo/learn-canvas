function random(lo, hi) {
  return Math.random()*(hi - lo) + lo;
}

function randomSign() {
  return Math.sign(Math.random() - 0.5);
}

function randomInt(lo, hi) {
  return Math.floor(random(lo, hi+1));
}

function isClose(x1, x2, y1, y2, radius) {
  return (x1-x2)**2 + (y1-y2)**2 < radius**2;
}

function keepInBounds(x, lo, hi) {
  return x <= lo ? lo : x >= hi ? hi : x
}

const canvas = document.querySelector('canvas');
const hoverRadius = 100;
const minRadius = 1;
const maxRadius = 4;
const radiusOnHover = 10;
const speedSquared = 10;
const minHorizontalSpeed = 1;
const maxHorizontalSpeed = Math.sqrt(speedSquared - minHorizontalSpeed**2);
const circleDensity = 0.0005;
const lineProbability = 0.1;
const lineColour = '#FFF';
const colourPalette = [
  "#05AFF2",
  "#0DB3D9",
  "#F2A950",
  "#F26716",
  "#F21F0C",
]
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {
  x: undefined,
  y: undefined,
};

addEventListener(
  'mousemove',
  function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
  }
);

addEventListener(
  'mouseout',
  function(event) {
    if(event.clientY <= 0 || event.clientX <= 0 || (event.clientX >= innerWidth || event.clientY >= innerHeight)) {
      mouse.x = undefined;
      mouse.y = undefined;
    }
  }
);

addEventListener(
  'resize',
  function() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
  }
)

class Circle {
  constructor (x, y, dx, dy, radius, hoverRadius, colour) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.hoverRadius = hoverRadius;
    this.colour = colour;
  }

  draw () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
    c.fillStyle = this.colour;
    c.fill();
  }

  update() {
    if (this.x >= innerWidth - this.radius || this.x <= this.radius) {
      this.dx = -this.dx;
    }
    if (this.y >= innerHeight - this.radius || this.y <= this.radius) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    if (this.isNearMouse() && this.radius <= radiusOnHover) {
      this.radius++;
      this.x = keepInBounds(this.x, this.radius, innerWidth - this.radius);
      this.y = keepInBounds(this.y, this.radius, innerHeight - this.radius);
    } else if (this.radius >= this.minRadius) {
      this.radius--;
    }

    this.draw();
  }

  isNearMouse() {
    return isClose(this.x, mouse.x, this.y, mouse.y, hoverRadius);
  }
}

let circles = [];
function init() {
  circles = [];
  const numCircles = Math.floor(innerWidth*innerHeight*circleDensity);
  for (let i = 0; i < numCircles; i++) {
    const radius = random(minRadius, maxRadius);
    const x = random(radius, innerWidth-radius);
    const y = random(radius, innerHeight-radius);
    const dx = randomSign() * random(minHorizontalSpeed, maxHorizontalSpeed);
    const dy = randomSign() * Math.sqrt(speedSquared - dx**2);
    const colour = colourPalette[randomInt(0, colourPalette.length)];

    circles.push(new Circle(x, y, dx, dy, radius, hoverRadius, colour));
    circles[i].draw();
  }

}

const circlesNearMouse = new Set();
const circlePairs = new Set();
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);

  // Remove circles that are no longer near mouse from circlesNearMouse
  for (const circle of circlesNearMouse) {
    if (!circle.isNearMouse()) {
      circlesNearMouse.delete(circle);
    }
  }
  // Remove pairs of circles where at least one of the circles is no
  // longer near the mouse
  for (const pair of circlePairs) {
    if (!circlesNearMouse.has(pair[0]) || !circlesNearMouse.has(pair[1])) {
      circlePairs.delete(pair);
    }
  }
  // Add new pairs for circles that have just come near to the mouse
  for (const circle of circles) {
    if (!circlesNearMouse.has(circle) && circle.isNearMouse()) {
      for (const nearbyCircle of circlesNearMouse) {
        if (Math.random() < lineProbability) {
          circlePairs.add([circle, nearbyCircle]);
        }
      }
      circlesNearMouse.add(circle);
    }
  }
  // Redraw all lines between the collected pairs of circles
  for (const pair of circlePairs) {
    c.beginPath();
    c.moveTo(pair[0].x, pair[0].y);
    c.lineTo(pair[1].x, pair[1].y);
    c.strokeStyle = lineColour;
    c.stroke();
  }
  // Draw all circles
  for (const circle of circles) {
    circle.update();
  }
}

init();

animate();
