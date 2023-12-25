export default function MovingMixin(Base) {
  return class extends Base {
    setDx(dx) {
      this.dx = dx;
    }

    setDy(dy) {
      this.dy = dy;
    }

    setVelocity(dx, dy) {
      this.setDx(dx);
      this.setDy(dy);
    }

    movingUpdate() {
      if (this.x >= innerWidth - this.radius || this.x <= this.radius) {
        this.setDx(-this.dx);
      }
      if (this.y >= innerHeight - this.radius || this.y <= this.radius) {
        this.setDy(-this.dy);
      }
      this.x += this.dx;
      this.y += this.dy;
    }
  }
}