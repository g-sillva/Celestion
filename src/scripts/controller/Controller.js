import { PLAYER_ACCELERATION_RATE, PLAYER_DAMPING_FACTOR, PLAYER_MAX_SPEED, PLAYER_ROTATION_RATE } from "../utils/Constants";
import { consumeOrbitParticles } from "../utils/ParticleUtils";

export class Controller {
  constructor(scene, camera, player, aura) {
    this.camera = camera;
    this.scene = scene;
    this.player = player;
    this.aura = aura;
    this.keysPressed = {};

    this.accelerationRate = PLAYER_ACCELERATION_RATE;
    this.maxSpeed = PLAYER_MAX_SPEED;
    this.dampingFactor = PLAYER_DAMPING_FACTOR;

    this.keyMap = {
      a: () => (this.player.acceleration.x -= this.accelerationRate),
      d: () => (this.player.acceleration.x += this.accelerationRate),
      s: () => (this.player.acceleration.y -= this.accelerationRate),
      w: () => (this.player.acceleration.y += this.accelerationRate),
      e: () => consumeOrbitParticles(this.scene, this.camera, this.player),
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
        if (this.player.spawned) this.player.spawned = false;
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

    const rotationFactor = this.player.velocity.length() / this.maxSpeed;
    this.player.rotation.y += PLAYER_ROTATION_RATE * rotationFactor;
    this.player.rotation.z += PLAYER_ROTATION_RATE * rotationFactor;
  }

  updateCamera() {
    this.camera.position.x = this.player.position.x;
    this.camera.position.y = this.player.position.y;
  }

  updateAura() {
    this.aura.updatePosition();
  }
}
