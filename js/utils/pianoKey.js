class PianoKey {

    /**
     * Creates a key, given the (x,y) Cartesian coordinates and the key type.
     * @param {Number} x Coordinate x (Cartesian coordinate system)
     * @param {Number} y Coordinate y (Cartesian coordinate system)
     * @param {Boolean} flat True for a flat (white) key, false otherwise
     */
    constructor(x = 10, y = 10, flat, letter) {
        // Position (Cartesian coordinate system)
        this.x = x;
        this.y = y;

        // Flat or Sharp
        this.flat = flat;

        // Letter
        this.letter = letter;

        // Size
        this.scale = this.flat ? 1 : 0.5;
        this.setSize();

        // Wave timer
        this.DURATION = 15;
        this.t = 0;
    }

    /**
     * Gets the frequency of the key.
     */
    getFrequency() {
        return this.x;
    }

    /**
     * Translates key by given amount in the screen coordinate system,
     * only if the new position is in bounds.
     * @param {*} x Translation on x screen axis 
     * @param {*} y Translation on y screen axis
     */
    translate(x, y) {
        // New position
        let newX = this.x - x * descaleFactor;
        let newY = this.y + y * descaleFactor;

        // Check if in bounds and eventually translates
        if ((newX - 1) * (newX - 2) <= 0)
            this.x = newX;
        if ((newY - minCartesianY - 0.1) * (newY - maxCartesianY) <= 0)
            this.y = newY;
    }

    /**
     * Sets the size of the key according to the coordinate system.
     */
    setSize() {
        this.width = 0.08 * scaleFactor * this.scale;
        this.height = 0.25 * scaleFactor * this.scale;
    }

    /**
     * Draws the connection line between the key and the frequency line.
     */
    drawConnections() {
        // Position
        let p = toScreen(this.x, this.y);

        // Render
        line(p.x, p.y + 3, p.x,
            yOrigin + (this.t > 0) * this.getAmp() * waveSize * 1.1);
    }

    /**
     * Draws the key.
     */
    drawKey() {
        // Colors
        let c = this.flat ? 0 : 1;
        stroke(255 * c);
        strokeWeight(3 - 1 * c);
        fill(255 * (1 - c));

        // Position
        let x = toScreenX(this.x);
        let y = toScreenY(this.y);

        // Render key
        rect(x - this.width * 0.5, y, this.width, this.height);

        // Render letter (need fixes)
        let tSize = waveSize / 3;
        fill(255 * c);
        strokeWeight(1 - c);
        textSize(tSize);
        text(this.letter, x - this.width / 2 + tSize / 2.5, y + this.height - tSize / 2);
    }

    /**
     * Returns true if (x,y) is inside the key bounds, false otherwise.
     * @param {Number} x Coordinate x (Screen coordinate system)
     * @param {Number} y Coordinate y (Screen coordinate system)
     */
    selected(x, y) {
        // Position
        let p = toScreen(this.x, this.y);

        return (x - p.x + this.width * 0.5) * (x - p.x - this.width * 0.5) < 0
            && (y - p.y) * (y - p.y - this.height) < 0;
    }

    /**
     * Plays the key.
     */
    play() {
        loop();
        this.t = this.DURATION;
    }

    /**
     * Returns true if the key is currently played, false otherwise.
     */
    played() {
        return this.t > 0;
    }

    /**
     * Returns the fading state as a number between 0 and 1.
     */
    getFade() {
        return (1 - this.t / this.DURATION);
    }

    /**
     * Returns the visual amplitude of the note
     * according to the current fade state.
     */
    getAmp() {
        return 2 * Math.sin(PI * this.getFade()) / TWO_PI
    }

    /**
     * Makes the note fade.
     */
    fade() {
        this.t--;
    }

}