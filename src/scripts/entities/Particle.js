import * as THREE from "three";
import { PARTICLE_MAX_MASS } from "../utils/Constants";
export class Particle extends THREE.Mesh {
  constructor(color, mass) {
    const geometry = new THREE.BoxGeometry(mass, mass, mass);
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
    let newMass = this.mass + mass;
    if (newMass > PARTICLE_MAX_MASS) {
      newMass = newMass - PARTICLE_MAX_MASS;
    }
    this.mass = newMass;
    this.geometry = new THREE.BoxGeometry(mass, mass, mass);
  }
}