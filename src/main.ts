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

ctx.fillRect(0, 0, canvas.width, canvas.height);
