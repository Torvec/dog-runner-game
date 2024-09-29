export class FloatingMessage {
  constructor(value, x, y, targetX, targetY) {
    this.value = value;
    this.position = { x: x, y: y };
    this.target = { x: targetX, y: targetY };
    this.markedForDeletion = false;
    this.timer = 0;
  }
  update() {
    this.position.x += (this.target.x - this.position.x) * 0.03;
    this.position.y += (this.target.y - this.position.y) * 0.03;
    this.timer++;
    if (this.timer > 100) this.markedForDeletion = true;
  }
  draw(c) {
    c.font = "24px impact";
    c.fillStyle = "black";
    c.fillText(this.value, this.position.x, this.position.y);
    c.fillStyle = "orange";
    c.fillText(this.value, this.position.x - 2, this.position.y - 2);
  }
}
