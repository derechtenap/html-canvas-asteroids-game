type Coordinates = {
  x: number;
  y: number;
};

type PlayerType = {
  position: Coordinates;
  velocity: number;
};

const PLAYER_COLOR = "white";

const canvas = document.querySelector("canvas");

if (!canvas) {
  throw new Error(
    "Failed to find the canvas element. Please ensure that the HTML DOM is loaded correctly and contains a canvas element."
  );
}

const ctx = canvas.getContext("2d");

if (!ctx) {
  throw new Error(
    "Failed to get the 2D rendering context for the canvas. Please make sure that the browser supports the HTML5 Canvas API."
  );
}

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// Create a black canvas background
ctx.fillRect(0, 0, canvas.width, canvas.height);

class Player {
  position: Coordinates;
  velocity: number;

  constructor({ position, velocity }: PlayerType) {
    this.position = position; // { x, y }
    this.velocity = velocity;
  }

  draw() {
    if (!ctx) {
      throw new Error(
        "Unable to draw the player on the canvas! Is the context available?"
      );
    }

    ctx.strokeStyle = PLAYER_COLOR;

    // Circle inside the player triangle
    ctx.arc(this.position.x, this.position.y, 5, 0, Math.PI * 2);

    // Drawing the triangular player form
    ctx.moveTo(this.position.x + 30, this.position.y);
    ctx.lineTo(this.position.x - 10, this.position.y - 10);
    ctx.lineTo(this.position.x - 10, this.position.y + 10);
    ctx.closePath();
    ctx.stroke();
  }
}

const player = new Player({
  position: { x: canvas.width / 2, y: canvas.height / 2 },
  velocity: 0,
});

player.draw();
