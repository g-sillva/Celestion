import * as THREE from "three";
import { AURA_COLOR, AURA_OPACITY, AURA_SEGMENTS } from "../utils/Constants";

export class Circle extends THREE.Mesh {
  constructor(radius, player) {
    const geometry = new THREE.CircleGeometry(radius, AURA_SEGMENTS);
    const material = new THREE.MeshBasicMaterial({ color: AURA_COLOR, transparent: true, opacity: AURA_OPACITY });
    super(geometry, material);
    this.radius = radius;
    this.player = player;
    this.scale.set(radius, radius, 1);
  }

  updatePosition() {
    this.position.copy(this.player.position);
  }

  setRadius(radius) {
    this.geometry.dispose();
    this.geometry = new THREE.CircleGeometry(radius, AURA_SEGMENTS);
    this.radius = radius;
    this.scale.set(radius, radius, 1);
  }

  getRadius() {
    return this.radius;
  }
}