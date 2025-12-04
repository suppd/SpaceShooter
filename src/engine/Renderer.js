import Menu from "../ui/Menu.js";
export default class Renderer {
    constructor(ctx) {
        this.ctx = ctx;
        this.menu = new Menu();
    }

    render(game) {
        if (game.state === "menu") {
            this.menu.draw(this.ctx, game.canvas);
            return;
        }
        const ctx = this.ctx;
        const canvas = game.canvas;
        ctx.save();
        
        const shake = game.screenshake.getOffset();
        ctx.translate(shake.x, shake.y);
        
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.textAlign = "left";

        // draw all gameobjects (dont forget to add new game object arrays here)
        [...game.entities, ...game.enemies, ...game.bullets, ...game.particles, ...game.enemyBullets]
            .forEach(e => e.draw(ctx));
        ctx.restore();
    }
}
