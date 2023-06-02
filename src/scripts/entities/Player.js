import * as THREE from "three";
import { Circle } from "./Circle";

export class Player extends THREE.Mesh {
  constructor(color, size, position) {
    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshBasicMaterial({ color });
    super(geometry, material);
    this.position.set(position.x, position.y, position.z);
    this.aura = new Circle(2 * this.scale.x, this);
    this.positionSpeed = new THREE.Vector3();
  }

  getMesh() {
    return this.mesh;
  }

  getAura() {
    return this.aura;
  }
}
