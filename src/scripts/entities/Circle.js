import * as THREE from "three";

export class Circle extends THREE.Mesh {
  constructor(radius, player) {
    const geometry = new THREE.CircleGeometry(radius, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    super(geometry, material);
    this.player = player;
  }

  updatePosition() {
    this.position.copy(this.player.position);
  }
}