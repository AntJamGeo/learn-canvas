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

let radius = 50;
let x = random(radius, innerWidth-radius);
let y = random(radius, innerHeight-radius);
let dx = random(5, 25);
let dy = random(5, 25);
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  c.beginPath();
  c.arc(
    x,
    y,
    radius,
    0,
    2*Math.PI,
  );
  c.strokeStyle = '#000';
  c.stroke();
  if (x >= innerWidth - radius || x <= radius) {
    dx = -dx;
  }
  if (y >= innerHeight - radius || y <= radius) {
    dy = -dy;
  }
  x += dx;
  y += dy;
}

animate();