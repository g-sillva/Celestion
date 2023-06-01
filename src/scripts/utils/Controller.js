export class Controller {
  constructor(camera, player) {
    this.camera = camera;
    this.player = player;
    this.keysPressed = {};

    this.keyMap = {
      a: () => (this.player.position.x -= 0.1),
      d: () => (this.player.position.x += 0.1),
      s: () => (this.player.position.y -= 0.1),
      w: () => (this.player.position.y += 0.1),
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

  updateMoves() {
    Object.keys(this.keysPressed).forEach((key) => {
      if (this.keyMap[key]) {
        this.keyMap[key]();
      }
    });
    this.updateCamera();
  }

  updateCamera() {
    this.camera.position.x = this.player.position.x;
    this.camera.position.y = this.player.position.y;
  }
}
