import * as THREE from "three";

export class Circle extends THREE.Mesh {
  constructor(radius, player) {
    const geometry = new THREE.CircleGeometry(radius, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.1 });
    super(geometry, material);
    this.player = player;
  }

  updatePosition() {
    this.position.copy(this.player.position);
  }

  setRadius(radius) {
    this.geometry.dispose();
    this.geometry = new THREE.CircleGeometry(radius, 32);
  }
}