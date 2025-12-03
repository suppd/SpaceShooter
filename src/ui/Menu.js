export default class Menu {
    constructor() {}

    draw(ctx, canvas) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "white";
        ctx.font = "50px Arial";
        ctx.textAlign = "center";

        ctx.fillText("SPACE SHOOTER", canvas.width / 2, canvas.height / 2 - 50);

        ctx.font = "28px Arial";
        ctx.fillText("Press ENTER to Start", canvas.width / 2, canvas.height / 2 + 20);

        ctx.font = "18px Arial";
        ctx.fillText("Use Arrow Keys to Move, Space to Shoot", canvas.width / 2, canvas.height / 2 + 60);
    }
}
