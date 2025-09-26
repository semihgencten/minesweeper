export default class Confetti {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.confettiPieces = [];
    this.animationFrame = null;

    window.addEventListener("resize", () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    });
  }

  startConfetti() {
    this.confettiPieces = Array.from({ length: 200 }).map(() => ({
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height - this.canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 10 + 10,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      tilt: Math.random() * 10 - 10,
    }));

    this.update();
  }

  update() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.confettiPieces.forEach((p) => {
      p.y += p.d * 0.2;
      p.x += Math.sin(p.y * 0.01);

      this.ctx.beginPath();
      this.ctx.fillStyle = p.color;
      this.ctx.ellipse(p.x, p.y, p.r, p.r / 2, p.tilt, 0, 2 * Math.PI);
      this.ctx.fill();
    });

    if (this.confettiPieces.some((p) => p.y < this.canvas.height)) {
      this.animationFrame = requestAnimationFrame(this.update.bind(this));
    }
  }

  stop() {
    this.confettiPieces = [];
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }
}
