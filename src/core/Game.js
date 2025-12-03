import Input from "./Input.js";
import Renderer from "../engine/Renderer.js";
import Player from "../entities/Player.js";
import EnemySpawner from "../systems/EnemySpawner.js";
import Collision from "../engine/Collision.js";
import HUD from "../ui/HUD.js";
import ParticleSystem from "../systems/ParticleSystem.js";

export default class Game {
    constructor() {
        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.state = "menu";

        this.lastTime = performance.now();

        this.input = new Input(this);
        this.renderer = new Renderer(this.ctx);
        this.enemySpawner = new EnemySpawner(this);
        this.hud = new HUD(this.ctx);

        this.entities = [];
        this.bullets = [];
        this.enemies = [];
        this.enemyBullets = [];
        this.particles = [];

        this.player = new Player(this.canvas.width / 2 - 20, this.canvas.height - 80);
        this.entities.push(this.player);
        //Game Logic Variables
        this.score = 0;
        this.timeSurvived = 0;
        this.gameOver = false;

        this.addListeners();
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
        if (this.gameOver){
            return;
        }
        this.timeSurvived += dt;
        // update all gameobjects
        [...this.entities, ...this.enemies, ...this.bullets, ...this.enemyBullets].forEach(e => {
            if (!e.dead) e.update(dt, this);
        });

        this.enemySpawner.update(dt, this);

        this.entities = this.entities.filter(e => !e.dead);
        this.enemies = this.enemies.filter(e => !e.dead);
        this.bullets = this.bullets.filter(e => !e.dead);
        this.enemyBullets = this.enemyBullets.filter(e => !e.dead);

        this.handleCollisions();
        
    }

    handleCollisions() {
        /// collision detection bullets enemies
        this.bullets.forEach(bullet => {
            this.enemies.forEach(enemy => {
                if (Collision.checkCollision(bullet, enemy)) {
                    enemy.takeDamage(1,this);
                    bullet.dead = true;
                }
            });
        });
        // collision detection enemy bullets on player
        this.enemyBullets.forEach(bullet => {
            if (Collision.checkCollision(bullet, this.player)) {
                this.player.takeDamage(1, this);
                bullet.dead = true;
            }
        });
    }
    addListeners() {
        window.addEventListener("keydown", e => {
        if (this.gameOver && e.code === "KeyR") {
            this.restartLevel();
        }
    });
    }  
    render() {
        this.renderer.render(this);
        this.hud.update(this, this.ctx);
    }
    //helper methods
    restartLevel() {
        // clear everything
        this.score = 0;
        this.timeSurvived = 0;
        this.gameOver = false;

        this.player.x = this.canvas.width / 2 - 20;
        this.player.y = this.canvas.height - 80;
        this.player.hp = 3;


        this.enemies = [];
        this.bullets = [];
        this.entities = [this.player];
    }
    addScore(amount) {
        this.score += amount;
    }
}
