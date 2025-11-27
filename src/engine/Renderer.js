export default class Renderer {
    constructor(ctx) {
        this.ctx = ctx;
    }

    render(game) {

        const ctx = this.ctx;
        const canvas = game.canvas;

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        [...game.entities, ...game.enemies, ...game.bullets, ...game.particles]
            .forEach(e => e.draw(ctx));
    }
}
