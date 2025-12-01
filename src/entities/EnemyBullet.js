import Entity from "./Entity.js";

export default class EnemyBullet extends Entity {
    constructor(x, y) {
        super(x, y, 6, 12, "orange");
        this.speed = 0.45;
    }

    update(dt, game) {
        this.y += this.speed * dt;     
        if (this.y > game.canvas.height) {
            this.dead = true;
        }
    }
}