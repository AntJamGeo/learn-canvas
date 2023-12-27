import utils, { distance, randomColor, randomFromRange } from './utils.js'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

const GRAVITY = 0.5;

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

// Objects
class Ball {
  constructor(x, y, radius, color, elasticity) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.energy = this.gpe();
    this.dy = 0;
    this.elasticity = elasticity;
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
  }

  update() {
    console.log(this.y, this.dy);
    if (this.gpe() >= this.energy) {
      this.y = innerHeight - this.energy / GRAVITY;
      this.dy = 0;
    }
    const maxY = innerHeight - this.radius;
    if (this.y > maxY) {
      this.energy *= Math.sqrt(this.elasticity);
      this.y = maxY;
      this.dy = -Math.sqrt(2 * this.energy);
    } else {
      this.dy += GRAVITY;
      this.y += this.dy;
    }

    // if (distance(this.x, this.y, mouse.x, mouse.y) <= this.radius) {
    //   this.showDetails();
    // }
    this.draw()
  }

  gpe() {
    return GRAVITY * (innerHeight - this.y);
  }

  showDetails() {
    c.fillStyle = this.color;
    c.fillText(`Elasticity = ${this.elasticity}`, mouse.x, mouse.y-2*this.radius);
  }
}

// Implementation
let objects
function init() {
  objects = []

  for (let i = 0; i < 100; i++) {
    const radius = randomFromRange(10, 20);
    const x = randomFromRange(radius, innerWidth-radius);
    const y = randomFromRange(radius, innerHeight/2-radius);
    const color = randomColor(colors);
    const elasticity = randomFromRange(0.6, 0.9);
    objects.push(new Ball(x, y, radius, color, elasticity));
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)

  objects.forEach(object => {
   object.update()
  })
}

init()
animate()
