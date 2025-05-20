import { getRandomInt, getRandomFloat, resizeCanvas } from "../modules/utils.js";

const canvas = /** @type {HTMLCanvasElement | null} */ (document.getElementById("canvas"));

if (!canvas) {
    throw new Error("Could not find canvas element in the DOM.");
}

const ctx = canvas.getContext("2d", { alpha: true });

class Flake {
    /**
     * @param {number} x 
     * @param {number} y 
     * @param {number} radius 
     * @param {number} dx 
     * @param {number} dy 
     */
    constructor(x, y, radius, dx, dy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
    }
    
    reset() {
        this.x = getRandomInt(0, canvasDimensionsWidth);
        this.y = getRandomInt(0, -canvasDimensionsHeight);
        this.radius = getRandomInt(1, 4);
        this.dx = getRandomFloat(-2, 2);
        this.dy = getRandomFloat(2, 5);
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
    const [canvasWidth, canvasHeight] = resizeCanvas(canvas);
    // re-cache dimensions
    canvasDimensionsWidth = canvasWidth;
    canvasDimensionsHeight = canvasHeight;
    // Reset and re-fill totalFlakes arr
    totalFlakes = [];
    // Reset initial ctx state
    ctx.fillStyle = "#fff";
    ctx.globalAlpha = 0.7;
    
    const flakes = Math.floor(canvasDimensionsWidth / 3);

    for (let i = 0; i < flakes; i++) {
        let x = getRandomInt(0, canvasDimensionsWidth);
        let y = getRandomInt(0, -canvasDimensionsHeight);
        let radius = getRandomInt(1, 4);
        let dx = getRandomFloat(-2, 2);
        let dy = getRandomFloat(2, 5);

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

init();
animate();
window.onresize = init;
