import * as THREE from "three";

export class Player extends THREE.Mesh {
  constructor(color, size, position) {
    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshBasicMaterial({ color });
    super(geometry, material);
    this.position.set(position.x, position.y, position.z);
    this.positionSpeed = new THREE.Vector3();
  }

  getMesh() {
    return this.mesh;
  }
}