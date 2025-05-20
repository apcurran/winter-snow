/**
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
function getRandomInt(min, max) {
    return Math.floor(min + Math.random() * (max - min));
}

/**
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
function getRandomFloat(min, max) {
    return min + Math.random() * (max - min);
}

/**
 * @param {HTMLCanvasElement} canvas 
 * @returns {[number, number]} - [canvasWidth, canvasHeight]
 */
function resizeCanvas(canvas) {
    // Re-size canvas
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;

    return [canvas.width, canvas.height];
}

export {
    getRandomInt,
    getRandomFloat,
    resizeCanvas,
};
