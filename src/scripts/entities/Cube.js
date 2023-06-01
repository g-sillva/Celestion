import * as THREE from "three";

export class Cube {
  constructor() {
    const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const material = new THREE.MeshBasicMaterial({ color: 0xc2352b });
    this.mesh = new THREE.Mesh(geometry, material);
    this.rotationSpeed = new THREE.Vector3();
    this.zSpeed = 0;
    this.positionSpeed = new THREE.Vector3();
  }

  setPosition(x, y) {
    this.mesh.position.x = x;
    this.mesh.position.y = y;
  }

  setRotationSpeed(x, y, z) {
    this.rotationSpeed.set(x, y, z);
  }

  setZSpeed(zSpeed) {
    this.zSpeed = zSpeed;
  }

  setPositionSpeed(x, y, z) {
    this.positionSpeed.set(x, y, z);
  }

  getMesh() {
    return this.mesh;
  }
}