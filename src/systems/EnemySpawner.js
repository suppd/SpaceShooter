import Enemy from "../entities/Enemy.js";

export default class EnemySpawner {
    constructor(game) {
        this.timer = 0;
        this.interval = 1500; //1.5 sec
    }

    update(dt, game) {
        this.timer += dt;

        if (this.timer >= this.interval) {
            this.timer = 0;
            this.spawnEnemy(game);
        }
    }

    spawnEnemy(game) {
        const x = Math.random() * (game.canvas.width - 40);
        const enemy = new Enemy(game,x, -40);
        game.enemies.push(enemy);
    }
}
