export default class Renderer {
    constructor(ctx) {
        this.ctx = ctx;
    }

    render(game) {

        const ctx = this.ctx;
        const canvas = game.canvas;

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // draw all gameobjects (dont forget to add new game object arrays here)
        [...game.entities, ...game.enemies, ...game.bullets, ...game.particles, ...game.enemyBullets]
            .forEach(e => e.draw(ctx)); 
    }   
}
