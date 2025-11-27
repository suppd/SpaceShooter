import Entity from "./Entity.js";

export default class Player extends Entity {
    constructor(x, y) {
        super(x, y, 40, 40, "cyan");
        this.speed = 0.35;
    }

    update(dt, game) {
        const input = game.input;

        if (input.isDown("ArrowLeft")) this.x -= this.speed * dt;
        if (input.isDown("ArrowRight")) this.x += this.speed * dt;
        if (input.isDown("ArrowUp")) this.y -= this.speed * dt;
        if (input.isDown("ArrowDown")) this.y += this.speed * dt;


        this.x = Math.max(0, Math.min(game.canvas.width - this.width, this.x));
        this.y = Math.max(0, Math.min(game.canvas.height - this.height, this.y));
    }
}
