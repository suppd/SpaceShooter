import Entity from "./Entity.js";
import Collision from "../engine/Collision.js";
import EnemyBullet from "../entities/EnemyBullet.js";

export default class Enemy extends Entity {
    constructor(game, x, y) {
        super(x, y, 40, 40, "red");
        this.speed = 0.2;
        this.hp = 2;
        this.shootCooldown = Math.random() * 60 + 60; 
    }

    update(dt, game) {
        this.y += this.speed * dt;

        if (this.y > game.canvas.height) {
            this.dead = true;
        }
        if (Collision.checkCollision(this, game.player)) {
            game.player.takeDamage(1);
            this.dead = true;
        }

        this.shootCooldown--;
        if (this.shootCooldown <= 0) {
            this.shoot(game);
            this.shootCooldown = Math.random() * 60 + 60; 
        }
    }
    
    shoot(game) {
        const bx = this.x + this.width / 2 - 3;
        const by = this.y + this.height;
        game.enemyBullets.push(new EnemyBullet(bx, by));
    }
   takeDamage(amount,game) {
        this.hp -= amount;
        if (this.hp <= 0) {
            this.dead = true;
            game.addScore(1);
        }
    }
}
