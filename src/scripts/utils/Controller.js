export class Controller {
  constructor(camera) {
    this.camera = camera;
    this.keysPressed = {};

    this.keyMap = {
      a: () => (this.camera.position.x -= 0.1),
      d: () => (this.camera.position.x += 0.1),
      s: () => (this.camera.position.y -= 0.1),
      w: () => (this.camera.position.y += 0.1),
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
  }
}
