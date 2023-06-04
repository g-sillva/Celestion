import * as THREE from "three";
import { Circle } from "./Circle";
import { AURA_BASE_SIZE } from "../utils/Constants";

export class Player extends THREE.Mesh {
  constructor(color, mass, position) {
    const geometry = new THREE.BoxGeometry(mass, mass, mass);
    const material = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0 });
    super(geometry, material);
    this.position.set(position.x, position.y, position.z);
    this.aura = new Circle(AURA_BASE_SIZE * mass, this);
    this.mass = mass;
    this.acceleration = new THREE.Vector3();
    this.velocity = new THREE.Vector3();
    this.particles = [];
  }

  getMesh() {
    return this.mesh;
  }

  getAura() {
    return this.aura;
  }

  getParticles() {
    return this.particles;
  }

  addParticles(particle) {
    particle.material.color.set(0x4287f5);
    this.particles.push(particle);
  }

  getMass() {
    return this.mass;
  }

  setMass(mass) {
    this.scale.set(mass, mass, mass);
    this.geometry = new THREE.BoxGeometry(mass, mass, mass);
    this.aura.setRadius(this.aura.getRadius() * mass);
    this.mass = mass;
  }
}
