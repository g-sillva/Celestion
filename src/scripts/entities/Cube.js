import * as THREE from "three";

export class Cube extends THREE.Mesh {
  constructor(color, mass) {
    const geometry = new THREE.BoxGeometry(mass * 20, mass * 20, mass * 20);
    const material = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 1 });
    super(geometry, material);
    
    this.rotationSpeed = new THREE.Vector3();
    this.acceleration = new THREE.Vector3();
    this.velocity = new THREE.Vector3();
    this.mass = mass;
  }

  getMass() {
    return this.mass;
  }
}