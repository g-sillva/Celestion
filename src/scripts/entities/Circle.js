import * as THREE from "three";

export class Circle extends THREE.Mesh {
  constructor(radius, player) {
    const geometry = new THREE.CircleGeometry(radius, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.1 });
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
    this.geometry = new THREE.CircleGeometry(radius, 32);
    this.radius = radius;
  }

  getRadius() {
    return this.radius;
  }
}