export class Projectile {
    constructor(level, x, y) {
        this.level = level;
        this.x = x;
        this.y = y;
        this.width = 25;
        this.height = 25;
        this.speed = 5;
        this.markedForDeletion = false;
    }
    update() {
        this.x += this.speed + this.level.speed;
        if (this.x > this.level.width * 0.75) this.markedForDeletion = true;
    }
    draw(c) {
        c.fillStyle = "orange";
        c.beginPath();
        c.arc(this.x, this.y, this.width / 2, 0, Math.PI * 2);
        c.fill();
    }
}