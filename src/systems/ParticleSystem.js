import Particle from "../entities/Particle.js";

export default class ParticleSystem {
    static burst(game, x, y, count = 20, color = "orange") {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 0.1 + Math.random() * 0.4;
            const size = 2 + Math.random() * 4;
            const life = 200 + Math.random() * 300;

            game.particles.push(
                new Particle(x, y, color, size, life, speed, angle)
            );
        }
    }

    static hit(game, x, y) {
        this.burst(game, x, y, 8, "yellow");
    }

    static explosion(game, x, y) {
        this.burst(game, x, y, 40, "orange");
    }
}
