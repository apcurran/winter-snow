import { getRandomInt, getRandomFloat } from "../modules/utils.js";

const canvas = /** @type {HTMLCanvasElement | null} */ (document.getElementById("canvas"));

if (!canvas) {
    throw new Error("Could not find canvas element in the DOM.");
}

const ctx = canvas.getContext("2d", { alpha: true });

// Cache width and height after init runs, to use during clearRect() and update() in animation loop
let canvasDimensionsWidth;
let canvasDimensionsHeight;
let totalFlakes;

function init() {
    
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvasDimensionsWidth, canvasDimensionsHeight);
    
    // Begin path
    ctx.beginPath();

    // loop here

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
