function random(lo, hi) {
  return Math.random()*(hi - lo) + lo;
}

function randomSign() {
  return Math.sign(Math.random() - 0.5);
}

function isClose(x1, x2, y1, y2, radius) {
  return (x1-x2)**2 + (y1-y2)**2 < radius**2;
}

function keepInBounds(x, lo, hi) {
  return x <= lo ? lo : x >= hi ? hi : x
}

const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');

const maxSize = 100;

// for (let i = 0; i < 10; i++) {
//   c.fillStyle = `rgba(${random(0, 256)}, ${random(0, 256)}, ${random(0, 256)}, ${random(0.5, 1)})`;
//   c.fillRect(
//     random(0, window.innerWidth-maxSize),
//     random(0, window.innerHeight-maxSize),
//     random(0, maxSize),
//     random(0, maxSize),
//   );
// }

// // Lines
// c.beginPath();
// c.moveTo(random(0, window.innerWidth), random(0, window.innerHeight));
// c.lineTo(random(0, window.innerWidth), random(0, window.innerHeight));
// c.lineTo(random(0, window.innerWidth), random(0, window.innerHeight));
// c.strokeStyle = '#FFF';
// c.stroke();

// // Arc/Circle
// c.beginPath();
// c.arc(
//   random(maxSize, window.innerWidth-maxSize),
//   random(maxSize, window.innerHeight-maxSize),
//   random(0, maxSize),
//   0,
//   2*Math.PI,
// );
// c.stroke();

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

    if (isClose(this.x, mouse.x, this.y, mouse.y, hoverRadius)) {
        this.radius = hoverRadius;
        this.colour = 'red';
        this.x = keepInBounds(this.x, hoverRadius, innerWidth - hoverRadius);
        this.y = keepInBounds(this.y, hoverRadius, innerHeight - hoverRadius);
    } else if (this.radius > this.minRadius) {
      this.radius--;
      this.colour = 'aqua';
    }

    this.draw();
  }
}

let circles = [];
const hoverRadius = 50;
for (let i = 0; i < 50; i++) {
  const radius = random(10, 30);
  const x = random(radius, innerWidth-radius);
  const y = random(radius, innerHeight-radius);
  const dx = randomSign() * random(5, 15);
  const dy = randomSign() * random(5, 15);
  const red = random(0, 255);
  const green = random(0, 255);
  const blue = random(0, 255);
  const colour = `rgba(${red}, ${green}, ${blue}, 1)`;

  circles.push(new Circle(x, y, dx, dy, radius, hoverRadius, colour));
  circles[i].draw();
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  for (let circle of circles) {
    circle.update();
  }
}

animate();