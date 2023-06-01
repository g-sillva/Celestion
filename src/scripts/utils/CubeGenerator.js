import * as THREE from "three";

export function generateCubes(scene, quantity, color, size, speed) {
  const cubes = [];
  for (let i = 0; i < quantity; i++) {
    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshBasicMaterial({ color });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = Math.floor(Math.random() * i * 2) - i;
    cube.position.y = Math.floor(Math.random() * i) - i;
    cube.rotationSpeed = new THREE.Vector3(
      Math.random() * speed - speed,
      Math.random() * speed - speed,
      0
    );
    cube.positionSpeed = new THREE.Vector3(
      Math.random() * speed - speed,
      Math.random() * speed - speed,
      Math.random() * speed - speed
    );
    cubes.push(cube);
  }

  scene.add(...cubes);
  return cubes;
}

export function animateCubes(cubes) {
  cubes.forEach((c) => {
    c.position.x += c.positionSpeed.x;
    c.position.y += c.positionSpeed.y;
    c.position.z += c.positionSpeed.z;
    c.rotation.x += c.rotationSpeed.x;
    c.rotation.y += c.rotationSpeed.y;
  })
}