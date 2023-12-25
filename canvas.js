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
const maxRadius = 10;
const speedSquared = 10;
const circleDensity = 0.0005;
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

    if (
      isClose(this.x, mouse.x, this.y, mouse.y, hoverRadius)
      && this.radius <= maxRadius
    ) {
      this.radius++;
      this.x = keepInBounds(this.x, this.radius, innerWidth - this.radius);
      this.y = keepInBounds(this.y, this.radius, innerHeight - this.radius);
    } else if (this.radius >= this.minRadius) {
      this.radius--;
    }

    this.draw();
  }
}

let circles = [];
function init() {
  circles = [];
  const numCircles = Math.floor(innerWidth*innerHeight*circleDensity);
  for (let i = 0; i < numCircles; i++) {
    const radius = random(1, 4);
    const x = random(radius, innerWidth-radius);
    const y = random(radius, innerHeight-radius);
    const dx = randomSign() * random(1, 3);
    const dy = randomSign() * Math.sqrt(speedSquared - dx**2);
    const colour = colourPalette[randomInt(0, colourPalette.length)];

    circles.push(new Circle(x, y, dx, dy, radius, hoverRadius, colour));
    circles[i].draw();
  }

}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  for (let circle of circles) {
    circle.update();
  }
}

init();

animate();
