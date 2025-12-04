export default class Screenshake {
    constructor() {
        this.duration = 0;
        this.magnitude = 0;
        this.timer = 0;
        this.offsetX = 0;
        this.offsetY = 0;
    }

    shake(duration, magnitude) {
        this.duration = duration;
        this.magnitude = magnitude;
        this.timer = 0;
    }

    update(dt) {
        if (this.timer < this.duration) {
            this.timer += dt;
            const progress = 1 - (this.timer / this.duration);

            const power = progress * this.magnitude;

            this.offsetX = (Math.random() * 2 - 1) * power;
            this.offsetY = (Math.random() * 2 - 1) * power;
        } else {
            this.offsetX = 0;
            this.offsetY = 0;
        }
    }

    getOffset() {
        return { x: this.offsetX, y: this.offsetY };
    }
}
