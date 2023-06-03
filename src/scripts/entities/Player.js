import * as THREE from "three";
import { Circle } from "./Circle";

export class Player extends THREE.Mesh {
  constructor(color, mass, position) {
    const geometry = new THREE.BoxGeometry(mass, mass, mass);
    const material = new THREE.MeshBasicMaterial({ color });
    super(geometry, material);
    this.position.set(position.x, position.y, position.z);
    this.aura = new Circle(2, this);
    this.mass = mass;
    this.acceleration = new THREE.Vector3();
    this.velocity = new THREE.Vector3();
  }

  getMesh() {
    return this.mesh;
  }

  getAura() {
    return this.aura;
  }
}
