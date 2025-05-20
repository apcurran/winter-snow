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

export {
    getRandomInt,
    getRandomFloat,
};
