export default class HUD {
        constructor(ctx) {
        this.ctx = ctx;
    }
    update(game,ctx) {
        this.drawHUD(game,ctx);
        this.handleGameOver(game,ctx);
    }
    drawHUD(game,ctx) {
        // HUD
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText(`HP: ${game.player.hp}`, 20, 30);
        ctx.fillText(`Score: ${game.score}`, 20, 55);

        // Convert ms to seconds
        const timeSec = (game.timeSurvived / 1000).toFixed(1);
        ctx.fillText(`Time: ${timeSec}s`, 20, 80);
    }
    
    handleGameOver(game,ctx) {
        if (game.gameOver) {
            ctx.save();
            ctx.fillStyle = "rgba(0,0,0,0.7)";
            ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);

            ctx.fillStyle = "white";
            ctx.font = "50px Arial";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER", game.canvas.width / 2, game.canvas.height / 2 - 20);

            ctx.font = "24px Arial";
            const timeSec = (game.timeSurvived / 1000).toFixed(1);
            ctx.fillText(`Score: ${game.score}`, game.canvas.width / 2, game.canvas.height / 2 + 20);
            ctx.fillText(`Survived: ${timeSec}s`, game.canvas.width / 2, game.canvas.height / 2 + 50);
            ctx.fillText("Press R to Restart", game.canvas.width / 2, game.canvas.height / 2 + 100);
            ctx.restore();
        }    
    }
}