import { getRandomNum } from "./modules/utils.js";

const canvas = /** @type {HTMLCanvasElement | null} */ (document.getElementById("canvas"));

if (!canvas) {
    throw new Error("Could not find canvas element in the DOM.");
}

const ctx = canvas.getContext("2d", { alpha: true });

class Flake {
    constructor(x, y, radius, dx, dy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
    }
    
    reset() {
        this.x = getRandomNum(0, canvasDimensionsWidth, true);
        this.y = getRandomNum(0, -canvasDimensionsHeight, true);
        this.radius = getRandomNum(1, 4, true);
        this.dx = getRandomNum(-2, 2, false);
        this.dy = getRandomNum(2, 5, false);
    }
    
    draw() {
        ctx.moveTo(this.x, this.y);
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
    }
    
    update() {
        this.x += this.dx;
        this.y += this.dy;

        if (this.y + this.radius > canvasDimensionsHeight) {
            this.reset();
        }
    }
}

// Cache width and height after init runs, to use during clearRect() and update() in animation loop
let canvasDimensionsWidth;
let canvasDimensionsHeight;
let totalFlakes;

function init() {
    // Re-calc canvas width and height, then re-assign vals
    resizeCanvas();

    // Reset and re-fill totalFlakes arr
    totalFlakes = [];
    // Reset initial ctx state
    ctx.fillStyle = "#fff";
    ctx.globalAlpha = 0.7;
    
    const flakes = Math.floor(canvasDimensionsWidth / 3);

    for (let i = 0; i < flakes; i++) {
        let x = getRandomNum(0, canvasDimensionsWidth, true);
        let y = getRandomNum(0, -canvasDimensionsHeight, true);
        let radius = getRandomNum(1, 4, true);
        let dx = getRandomNum(-2, 2, false);
        let dy = getRandomNum(2, 5, false);

        totalFlakes.push(new Flake(x, y, radius, dx, dy));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvasDimensionsWidth, canvasDimensionsHeight);
    
    // Begin path
    ctx.beginPath();

    for (let i = 0; i < totalFlakes.length; i++) {
        // Update and trace all flakes in one batch.
        totalFlakes[i].update();
        totalFlakes[i].draw();
    }

    // Call fill() only after batch tracing all flakes.
    ctx.fill();
}

function resizeCanvas() {
    // Re-size canvas
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
    // Re-cache canvas dimensions
    canvasDimensionsWidth = canvas.width;
    canvasDimensionsHeight = canvas.height;
}

init();
animate();
window.onresize = init;