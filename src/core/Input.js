export default class Input {
    constructor(game) {
        this.game = game;
        this.keys = {};

        window.addEventListener("keydown", e => {
            this.keys[e.code] = true;
        });

        window.addEventListener("keyup", e => {
            this.keys[e.code] = false;
        });
    }

    isDown(key) {
        return !!this.keys[key];
    }
}
