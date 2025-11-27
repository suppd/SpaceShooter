import Entity from "./Entity.js";
import Bullet from "./Bullet.js";

export default class Player extends Entity {
    constructor(x, y) {
        super(x, y, 40, 40, "cyan");
        this.speed = 0.35;
        this.fireCooldown = 200;
        this.fireTimer = 0;
        this.hp = 1;
    }

    update(dt, game) {
        const input = game.input;

        if (input.isDown("ArrowLeft"))  this.x -= this.speed * dt;
        if (input.isDown("ArrowRight")) this.x += this.speed * dt;
        if (input.isDown("ArrowUp"))    this.y -= this.speed * dt;
        if (input.isDown("ArrowDown"))  this.y += this.speed * dt;

        this.fireTimer -= dt;
        if (input.isDown("Space") && this.fireTimer <= 0) {
            this.shoot(game);
            this.fireTimer = this.fireCooldown;
        }
        this.x = Math.max(0, Math.min(game.canvas.width - this.width, this.x));
        this.y = Math.max(0, Math.min(game.canvas.height - this.height, this.y));

        if (this.hp <= 0) {
            console.log("GAME OVER");
            game.gameOver = true;
        }
    }

    shoot(game) {
        const bulletX = this.x + this.width / 2 - 3;
        const bulletY = this.y - 10;
        const bullet = new Bullet(bulletX, bulletY);

        game.bullets.push(bullet);
    }

    takeDamage(amount, game) {
        this.hp -= amount;
        console.log("Player HP:", this.hp);

    }
}