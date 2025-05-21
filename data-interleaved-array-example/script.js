import { getRandomInt, getRandomFloat, resizeCanvas } from "../modules/utils.js";

const canvas = /** @type {HTMLCanvasElement | null} */ (document.getElementById("canvas"));

if (!canvas) {
    throw new Error("Could not find canvas element in the DOM.");
}

const ctx = canvas.getContext("2d", { alpha: true });

// Cache width and height after init runs, to use during clearRect() and update() in animation loop
let canvasDimensionsWidth;
let canvasDimensionsHeight;

const FLAKE_DATA_CHUNK_SIZE = 5; // x, y, dx, dy, r -> chunk within interleaved array
let flakeCount;
let flakeData;

function init() {
    const [canvasWidth, canvasHeight] = resizeCanvas(canvas);
    canvasDimensionsWidth = canvasWidth;
    canvasDimensionsHeight = canvasHeight;
    
    ctx.fillStyle = "#fff";
    ctx.globalAlpha = 0.7;

    flakeCount = Math.floor(canvasDimensionsWidth / 3);
    flakeData = new Float32Array(flakeCount * FLAKE_DATA_CHUNK_SIZE);

    for (let i = 0; i < flakeCount; i++) {
        // initial creation of dimensions for each snowflake
        resetFlake(i);
    }
}

/**
 * @param {number} i 
 * @returns {void}
 */
function resetFlake(i) {
    const base = i * FLAKE_DATA_CHUNK_SIZE;
    flakeData[base + 0] = getRandomInt(0, canvasDimensionsWidth); // x
    flakeData[base + 1] = getRandomInt(0, -canvasDimensionsHeight); // y
    flakeData[base + 2] = getRandomFloat(-2, 2); // dx
    flakeData[base + 3] = getRandomFloat(2, 5); // dy
    flakeData[base + 4] = getRandomInt(1, 4); // radius
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvasDimensionsWidth, canvasDimensionsHeight);
    ctx.beginPath();

    for (let i = 0; i < flakeCount; i++) {
        const base = i * FLAKE_DATA_CHUNK_SIZE;
        const x = flakeData[base + 0] += flakeData[base + 2]; // x += dx
        const y = flakeData[base + 1] += flakeData[base + 3]; // y += dy
        const radius = flakeData[base + 4];

        // if the snowflake reaches the bottom of the screen,
        // reset to above the top
        if (y - radius > canvasDimensionsHeight) {
            resetFlake(i);

            continue;
        }

        // ctx.moveTo(x, y)
        ctx.moveTo(x, y);
        // ctx.arc(x, y, radius, 0, Math.PI * 2, true)
        ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    }

    // Call ctx.fill() only after batch tracing all flakes prior (better performance)
    ctx.fill();
}

init();
animate();
window.onresize = init;
