class KineticScroll {
    /**
     *
     * @param {*} element
     * @param {Function} callback - called with the current scroll
     * @param {*} direction
     */
    constructor(element, callback, direction = 'y') {
        this.element = element;
        this.direction = direction === 'y' ? 'y' : 'x';

        this.callback = callback;

        this.timeConstant = 325;

        this.pressed = false;

        this.timestamp = Date.now();
        this.offset = 0;
        this.frame;

        this.velocity;
        this.amplitude;

        this.trackOnTouchStart;
        this.reference;

        // Minimum and Maximum velocity
        this.max = 500;
        this.min = 0;

        this.addEvents();
    }

    callbackWithMinOrMax(val) {
        // this.offset = val > this.max ? this.max : val < this.min ? this.min : val;
        this.offset = val;
        this.callback(this.offset);
    }

    trackVelocity() {
        var now = Date.now();
        var elapsed = now - this.timestamp;
        this.timestamp = now;
        var delta = this.offset - this.frame;
        this.frame = this.offset;

        var v = (1000 * delta) / (1 + elapsed);
        var old_vel = this.velocity;
        this.velocity = 0.8 * v + 0.2 * this.velocity;

        console.log(`Velocity change: ${old_vel} -> ${this.velocity}`)
    }

    returnYPosition(event) {
        // touch event
        if (event.targetTouches && event.targetTouches.length >= 1) {
            return event.targetTouches[0].clientY;
        }

        // mouse event
        return event.clientY;
    }

    onTap(event) {
        this.pressed = true;
        this.reference = this.returnYPosition(event);

        // Reset our velocity and amplitude when first touching
        this.velocity = this.amplitude = 0;
        this.frame = this.offset;
        this.timestamp = Date.now();

        clearInterval(this.trackOnTouchStart);

        // Track our pointer position every 100ms
        this.trackOnTouchStart = setInterval(this.trackVelocity.bind(this), 100);

        // e.preventDefault();
        // e.stopPropagation();
    }

    onDrag(event) {
        if (this.pressed) {
            var y = this.returnYPosition(event);
            var delta = this.reference - y;
            if (delta > 2 || delta < -2) {
                this.reference = y;
                this.callbackWithMinOrMax(delta);
            }
        }
        // e.preventDefault();
        // e.stopPropagation();
        // return false;
    }

    onRelease(event) {
        this.pressed = false;

        clearInterval(this.trackOnTouchStart);
        if (this.velocity > 10 || this.velocity < -10) {
            this.amplitude = 0.8 * this.velocity;
            this.target = Math.round(this.offset + this.amplitude);
            this.timestamp = Date.now();
            requestAnimationFrame(this.autoScroll.bind(this));
        }

        // e.preventDefault();
        // e.stopPropagation();
        // return false;
    }

    autoScroll() {
        if (this.amplitude) {
            var elapsed = Date.now() - this.timestamp;
            var delta = this.amplitude * Math.exp(-elapsed / this.timeConstant);
            if (delta > 0.5 || delta < -0.5) {
                this.callbackWithMinOrMax(delta);
                requestAnimationFrame(this.autoScroll.bind(this));
            } else {
                this.callbackWithMinOrMax(0);
            }
        }
    }

    addEvents() {
        if (typeof window.ontouchstart !== 'undefined') {
            this.element.addEventListener('touchstart', this.onTap.bind(this));
            this.element.addEventListener('touchmove', this.onDrag.bind(this));
            this.element.addEventListener('touchend', this.onRelease.bind(this));
        }
        this.element.addEventListener('mousedown', this.onTap.bind(this));
        this.element.addEventListener('mousemove', this.onDrag.bind(this));
        this.element.addEventListener('mouseup', this.onRelease.bind(this));
    }
}

// module.exports = KineticScroll;
