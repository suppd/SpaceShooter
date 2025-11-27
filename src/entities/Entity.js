export default class Entity {
    constructor(x, y, width, height, color = "white") {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.dead = false;
    }

    update(dt, game) {}

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
