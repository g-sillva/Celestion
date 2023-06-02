import * as THREE from "three";

export class Cube extends THREE.Mesh {
  constructor(color, size) {
    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshBasicMaterial({ color });
    super(geometry, material);
    
    this.rotationSpeed = new THREE.Vector3();
    this.acceleration = new THREE.Vector3();
    this.velocity = new THREE.Vector3();
  }
}