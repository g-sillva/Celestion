import * as THREE from "three";

export function buildRenderer(width, height, backgroundColor) {
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  renderer.setClearColor(backgroundColor);

  document.body.appendChild(renderer.domElement);
  return renderer;
}

export function renderFarObjectsHandler(scene, camera, player) {
  const playerPosition = player.position;

  scene.traverse(function (object) {
    if (object instanceof THREE.Mesh) {
      object.geometry.computeBoundingSphere();

      const distance = playerPosition.distanceTo(object.position);

      object.visible = distance <= camera.position.z * 1.5;
    }
  });
}