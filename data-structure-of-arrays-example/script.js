import { getRandomInt, getRandomFloat, resizeCanvas } from "../modules/utils.js";

const canvas = /** @type {HTMLCanvasElement | null} */ (document.getElementById("canvas"));

if (!canvas) {
    throw new Error("Could not find canvas element in the DOM.");
}

const ctx = canvas.getContext("2d", { alpha: true });

// Cache width and height after init runs, to use during clearRect() and update() in animation loop
let canvasDimensionsWidth;
let canvasDimensionsHeight;

let xValues;
let yValues;
let rValues;
let dxValues;
let dyValues;
let flakeCount;

function init() {
    const [canvasWidth, canvasHeight] = resizeCanvas(canvas);
    canvasDimensionsWidth = canvasWidth;
    canvasDimensionsHeight = canvasHeight;
    
    ctx.fillStyle = "#fff";
    ctx.globalAlpha = 0.7;

    flakeCount = Math.floor(canvasDimensionsWidth / 3);
    xValues = new Uint16Array(flakeCount); // (0 to canvasWidth) range
    yValues = new Int16Array(flakeCount); // (0 to -canvasHeight)) range
    rValues = new Uint8Array(flakeCount); // (1 to 4) range
    dxValues = new Float32Array(flakeCount); // (-2 to 2) range
    dyValues = new Float32Array(flakeCount); // (2 to 5) range

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
    xValues[i] = getRandomInt(0, canvasDimensionsWidth);
    yValues[i] = getRandomInt(0, -canvasDimensionsHeight);
    rValues[i] = getRandomInt(1, 4);
    dxValues[i] = getRandomFloat(-2, 2);
    dyValues[i] = getRandomFloat(2, 5);
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvasDimensionsWidth, canvasDimensionsHeight);
    ctx.beginPath();

    for (let i = 0; i < flakeCount; i++) {
        // for each snowflake...
        xValues[i] += dxValues[i];
        yValues[i] += dyValues[i];

        // if the snowflake reaches the bottom of the screen,
        // reset to above the top
        if (yValues[i] + rValues[i] > canvasDimensionsHeight) {
            resetFlake(i);
        }

        ctx.moveTo(xValues[i], yValues[i]);
        ctx.arc(xValues[i], yValues[i], rValues[i], 0, Math.PI * 2, true);
    }

    // Call ctx.fill() only after batch tracing all flakes prior (better performance)
    ctx.fill();
}

init();
animate();
window.onresize = init;
