type Coordinates = {
  x: number;
  y: number;
};

type PlayerType = {
  position: Coordinates;
  rotation: number;
  velocity: Coordinates;
};

const PLAYER_COLOR = "white";
const PLAYER_SPEED = 2;
const PLAYER_ROTATIONAL_SPEED = 0.025;
const PLAYER_FRICTION = 0.97;

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

class Player {
  position: Coordinates;
  rotation: number;
  velocity: Coordinates;

  constructor({ position, velocity }: PlayerType) {
    this.position = position; // { x, y }
    this.rotation = 0;
    this.velocity = velocity;
  }

  draw() {
    if (!ctx) {
      throw new Error(
        "Unable to draw the player on the canvas! Is the context available?"
      );
    }

    ctx.strokeStyle = PLAYER_COLOR;

    ctx.save();

    // Rotating the player relative to canvas center
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(this.rotation);
    ctx.translate(-this.position.x, -this.position.y);

    ctx.beginPath();
    // Circle inside the player triangle
    ctx.arc(this.position.x, this.position.y, 5, 0, Math.PI * 2);

    // Drawing the triangular player form
    ctx.moveTo(this.position.x + 30, this.position.y);
    ctx.lineTo(this.position.x - 10, this.position.y - 10);
    ctx.lineTo(this.position.x - 10, this.position.y + 10);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

const player = new Player({
  position: { x: canvas.width / 2, y: canvas.height / 2 },
  rotation: 0,
  velocity: { x: 0, y: 0 },
});

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

window.addEventListener("keydown", ({ code: keyCode }) => {
  switch (keyCode) {
    case "KeyW":
    case "ArrowUp":
      keys.w.pressed = true;
      break;
    case "KeyD":
    case "ArrowRight":
      keys.d.pressed = true;
      break;
    case "KeyA":
    case "ArrowLeft":
      keys.a.pressed = true;
      break;
  }
});

window.addEventListener("keyup", ({ code: keyCode }) => {
  switch (keyCode) {
    case "KeyW":
    case "ArrowUp":
      keys.w.pressed = false;
      break;
    case "KeyD":
    case "ArrowRight":
      keys.d.pressed = false;
      break;
    case "KeyA":
    case "ArrowLeft":
      keys.a.pressed = false;
      break;
  }
});

const animate = () => {
  // Create a new  black canvas background on every frame
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  player.update();

  window.requestAnimationFrame(animate);

  if (keys.w.pressed) {
    player.velocity.x = Math.cos(player.rotation) * PLAYER_SPEED;
    player.velocity.y = Math.sin(player.rotation) * PLAYER_SPEED;
  } else if (!keys.w.pressed) {
    player.velocity.x *= PLAYER_FRICTION;
    player.velocity.y *= PLAYER_FRICTION;
  }

  if (keys.d.pressed) player.rotation += PLAYER_ROTATIONAL_SPEED;
  if (keys.a.pressed) player.rotation -= PLAYER_ROTATIONAL_SPEED;
};

animate();
