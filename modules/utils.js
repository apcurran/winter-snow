/**
 * @param {number} min 
 * @param {number} max 
 * @param {boolean} boolean 
 * @returns {number}
 */
function getRandomNum(min, max, boolean) {
    if (boolean === false) {
        // Calc float
        return min + Math.random() * (max - min);
    } else {
        // Calc int
        return Math.floor(min + Math.random() * (max - min));
    }
}

export {
    getRandomNum,
};