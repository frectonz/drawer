let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");

let hue = 0;
let incrementWidth = true;
let isDrawing = false;
let lastX = 0;
let lastY = 0;

const resize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.linJoin = "round";
  ctx.lineCap = "round";
  ctx.lineWidth = 20;
};

function draw(e) {
  if (!isDrawing) return;

  if (ctx.lineWidth >= 200 || ctx.lineWidth <= 10) {
    incrementWidth = !incrementWidth;
  }

  if (incrementWidth) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }

  ctx.globalCompositeOperator = "multiply";
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();

  [lastX, lastY] = [e.offsetX, e.offsetY];
  hue++;
}

window.addEventListener("load", () => {
  ctx.linJoin = "round";
  ctx.lineCap = "round";
  ctx.lineWidth = 20;
});

window.addEventListener("mousedown", (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

window.addEventListener("mousemove", draw);
window.addEventListener("mouseup", () => (isDrawing = false));
window.addEventListener("mouseout", () => (isDrawing = false));

window.addEventListener("resize", resize);

resize();
