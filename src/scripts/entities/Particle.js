import * as THREE from "three";

export class Particle extends THREE.Mesh {
  constructor(color, mass) {
    const geometry = new THREE.BoxGeometry(mass * 20, mass * 20, mass * 20);
    const material = new THREE.MeshStandardMaterial({ color, transparent: true, opacity: 1, emissive: color, roughness: 0.5 });
    super(geometry, material);
    
    this.rotationSpeed = new THREE.Vector3();
    this.acceleration = new THREE.Vector3();
    this.velocity = new THREE.Vector3();
    this.mass = mass;
  }

  getMass() {
    return this.mass;
  }

  addMass(mass) {
    this.mass += mass;
    this.geometry = new THREE.BoxGeometry(mass * 20, mass * 20, mass * 20);
  }
}