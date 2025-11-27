import Entity from "./Entity.js";
import Collision from "../engine/Collision.js";

export default class Enemy extends Entity {
    constructor(x, y) {
        super(x, y, 40, 40, "red");
        this.speed = 0.2;
        this.hp = 2;
    }

    update(dt, game) {
        this.y += this.speed * dt;

        if (this.y > game.canvas.height) {
            this.dead = true;
        }
    }
}
