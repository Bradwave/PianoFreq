// Origin
let xOrigin, yOrigin;
let PERCENTAGE = 0.7;

// Scale and descale factors
let minDim, scaleFactor, descaleFactor;

/**
 * Updates the coordinate system.
 */
function updateSystem() {
    minDim = min(width, height);

    // Scale and descale factors
    scaleFactor = width * PERCENTAGE;
    descaleFactor = 1.000000 / scaleFactor;

    // Origin
    xOrigin = - (1.5 * PERCENTAGE - 0.5) * width;
    yOrigin = height * 0.33;
}

/**
 * Converts screen coordinates to cartesian coordinates with origin in the center of the window.
 * @param {Number} x Coordinate x
 * @param {Number} y Coordinate y
 */
function toCartesian(x, y) {
    let cx = (x - xOrigin) * descaleFactor;
    let cy = (yOrigin - y) * descaleFactor;
    return { x: cx, y: cy };
}

/**
* Converts cartesian coordinates to screen coordinates with origin in the top left corner of the window.
* @param {Number} x Coordinate x
* @param {Number} y Coordinate y
*/
function toScreen(x, y) {
    let sx = x * scaleFactor + xOrigin;
    let sy = yOrigin - y * scaleFactor;
    return { x: sx, y: sy };
}

