import * as THREE from "three";

export function buildRenderer(width, height, backgroundColor) {
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  renderer.setClearColor(backgroundColor);

  document.body.appendChild(renderer.domElement);
  return renderer;
}
