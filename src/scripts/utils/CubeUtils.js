import { Cube } from "../entities/Cube";

export function generateCubes(scene, quantity, color, size, speed) {
  const cubesMap = new Map();
  for (let i = 0; i < quantity; i++) {
    const cube = new Cube(color, size);
    const cubeRandomSpeed = Math.random() * speed - speed;

    cube.position.set(Math.floor(Math.random() * i * 2) - i, Math.floor(Math.random() * i) - i);
    cube.rotationSpeed.set(cubeRandomSpeed, cubeRandomSpeed, 0);
    cube.velocity.set(cubeRandomSpeed, cubeRandomSpeed, 0);
    cubesMap.set(cube.id, cube);
  }

  scene.add(...cubesMap.values())
  return cubesMap;
}

export function animateCubes(cubes) {
  cubes.forEach((c) => {
    c.position.x += c.velocity.x;
    c.position.y += c.velocity.y;
    c.position.z += c.velocity.z;
    c.rotation.x += c.velocity.x;
    c.rotation.y += c.velocity.y;
  })
}