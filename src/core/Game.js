import Input from "./Input.js";
import Renderer from "../engine/Renderer.js";
import Player from "../entities/Player.js";
import EnemySpawner from "../systems/EnemySpawner.js";
import Collision from "../engine/Collision.js";

export default class Game {
    constructor() {
        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");

        this.lastTime = performance.now();

        this.input = new Input(this);
        this.renderer = new Renderer(this.ctx);
        this.enemySpawner = new EnemySpawner(this);

        this.entities = [];
        this.bullets = [];
        this.enemies = [];
        this.particles = [];

        this.player = new Player(this.canvas.width / 2 - 20, this.canvas.height - 80);
        this.entities.push(this.player);

        Boolean.gameOver = false;
    }

    start() {
        requestAnimationFrame(this.loop.bind(this));
    }

    loop(timestamp) {
        const dt = timestamp - this.lastTime;
        this.lastTime = timestamp;

        this.update(dt);
        this.render();
        requestAnimationFrame(this.loop.bind(this));
    }

    update(dt) {
        if (this.gameOver) return; // Stop updating if game is over (player died)

        [...this.entities, ...this.enemies, ...this.bullets].forEach(e => {
            if (!e.dead) e.update(dt, this);
        });

        this.enemySpawner.update(dt, this);

        this.entities = this.entities.filter(e => !e.dead);
        this.enemies = this.enemies.filter(e => !e.dead);
        this.bullets = this.bullets.filter(e => !e.dead);

        this.bullets.forEach(bullet => {
            this.enemies.forEach(enemy => {
                if (Collision.checkCollision(bullet, enemy)) {
                    enemy.takeDamage(1);
                    bullet.dead = true;
                }
            });
        });
    }

    render() {
        this.renderer.render(this);
    }
    
}
