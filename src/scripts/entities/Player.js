import * as THREE from "three";
import { Circle } from "./Circle";
import { PLAYER_MAX_MASS, PLAYER_SCALE_MULTIPLIER } from "../utils/Constants";

export class Player extends THREE.Mesh {
  constructor(color, mass, position) {
    const geometry = new THREE.SphereGeometry(mass * PLAYER_SCALE_MULTIPLIER, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0 });
    super(geometry, material);
    this.color = color;
    this.spawned = true;
    this.position.set(position.x, position.y, position.z);
    this.aura = new Circle(0.5, this);
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
  
  setParticles(particles) {
    this.particles = particles;
  }

  removeParticle(particle) {
    const index = this.particles.indexOf(particle);
    if (index !== -1) {
      this.particles.splice(index, 1);
    }
  }

  addParticles(particle) {
    particle.material.color.set(this.color);
    particle.material.emissive.set(this.color);
    this.particles.push(particle);
  }

  getMass() {
    return this.mass;
  }

  addMass(mass) {
    if (this.mass + mass < PLAYER_MAX_MASS) {
      this.mass += mass;
      this.geometry = new THREE.SphereGeometry(this.mass * PLAYER_SCALE_MULTIPLIER, 32, 32);
    }
  }

  setMass(mass) {
    this.geometry = new THREE.SphereGeometry(mass * PLAYER_SCALE_MULTIPLIER, 32, 32);
    this.mass = mass;
  }
}
