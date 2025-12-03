import Entity from "./Entity.js";

export default class Particle extends Entity {
    constructor(x, y, color = "white", size = 4, life = 300, speed = 0.2, angle = 0) {
        super(x, y, size, size, color);

        //angle in radians, life in ms
        this.life = life;
        this.maxLife = life;
        this.speed = speed;
        this.angle = angle;
    }

    update(dt, game) {
        this.x += Math.cos(this.angle) * this.speed * dt;
        this.y += Math.sin(this.angle) * this.speed * dt;

        this.life -= dt;
        if (this.life <= 0) {
            this.dead = true;
        }
    }

    draw(ctx) {
        const alpha = this.life / this.maxLife;

        ctx.globalAlpha = alpha;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.globalAlpha = 1;
    }
}
