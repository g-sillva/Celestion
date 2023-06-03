import * as THREE from "three";

export class Map extends THREE.Mesh {
  constructor(scene, width, height, borderColor) {
    const mapGeometry = new THREE.BoxGeometry(width, height, 0);
    const mapMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });
    super(mapGeometry, mapMaterial);

    const borderGeometry = new THREE.EdgesGeometry(mapGeometry);
    const borderMaterial = new THREE.LineBasicMaterial({ color: borderColor });
    this.border = new THREE.LineSegments(borderGeometry, borderMaterial);

    scene.add(this);
    scene.add(this.border);
  }

  getBorder() {
    return this.border;
  }
}