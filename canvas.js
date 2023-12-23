function random(lo, hi) {
  return Math.random()*(hi - lo) + lo;
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

class Circle {
  constructor (x, y, dx, dy, radius, colour) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
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

    this.draw();
  }
}

let circles = [];
for (let i = 0; i < 50; i++) {
  const radius = random(20, 50);
  const red = random(0, 255);
  const green = random(0, 255);
  const blue = random(0, 255);
  const colour = `rgba(${red}, ${green}, ${blue}, 1)`;

  circles.push(
    new Circle(
      random(radius, innerWidth-radius),
      random(radius, innerHeight-radius),
      Math.sign(random(0, 1)-0.5) * random(5, 15),
      Math.sign(random(0, 1)-0.5) * random(5, 15),
      radius,
      colour,
    )
  )
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