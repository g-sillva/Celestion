export class Controller {
  constructor(camera, player, aura) {
    this.camera = camera;
    this.player = player;
    this.aura = aura;
    this.keysPressed = {};

    this.accelerationRate = 0.01;
    this.maxSpeed = 0.09;
    this.dampingFactor = 0.9;

    this.keyMap = {
      a: () => (this.player.acceleration.x -= this.accelerationRate),
      d: () => (this.player.acceleration.x += this.accelerationRate),
      s: () => (this.player.acceleration.y -= this.accelerationRate),
      w: () => (this.player.acceleration.y += this.accelerationRate),
      " ": () => this.stopPlayer(),
    };

    document.addEventListener("keydown", (e) => this.setKeyPressed(e.key));
    document.addEventListener("keyup", (e) => this.setKeyReleased(e.key));
  }

  setKeyPressed(key) {
    this.keysPressed[key] = true;
  }

  setKeyReleased(key) {
    delete this.keysPressed[key];
  }

  stopPlayer() {
    if (this.player.velocity.x > 0) {
      this.player.acceleration.x = -this.accelerationRate;
    } else if (this.player.velocity.x < 0) {
      this.player.acceleration.x = this.accelerationRate;
    }
  
    if (this.player.velocity.y > 0) {
      this.player.acceleration.y = -this.accelerationRate;
    } else if (this.player.velocity.y < 0) {
      this.player.acceleration.y = this.accelerationRate;
    }
  }

  updateMoves() {
    Object.keys(this.keysPressed).forEach((key) => {
      if (this.keyMap[key]) {
        this.keyMap[key]();
      }
    });
    this.updatePlayerPosition();
    this.updateCamera();
    this.updateAura();
  }

  updatePlayerPosition() {
    this.player.acceleration.multiplyScalar(1 - this.dampingFactor);
    this.player.velocity.add(this.player.acceleration);
    this.player.velocity.clampLength(0, this.maxSpeed);
    this.player.position.add(this.player.velocity);
  }

  updateCamera() {
    this.camera.position.x = this.player.position.x;
    this.camera.position.y = this.player.position.y;
  }

  updateAura() {
    this.aura.updatePosition();
  }
}
