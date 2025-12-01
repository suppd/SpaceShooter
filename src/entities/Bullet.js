import Entity from "./Entity.js";

export default class Bullet extends Entity {
    constructor(x, y) {
        super(x, y, 6, 12, "yellow");
        this.speed = 0.6; 
    }

    update(dt, game) {
        this.y -= this.speed * dt;
        if (this.y + this.height < 0) {
            this.dead = true;
        }
    }
}
