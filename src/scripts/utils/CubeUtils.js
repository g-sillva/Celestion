import { Cube } from "../entities/Cube";
import { CUBE_GENERATION_RATE } from "./Constants";

export function generateCubes(scene, map, mass, velocity) {
  const cubesMap = new Map();
  const mapWidth = map.getWidth();
  const mapHeight = map.getHeight();
  
  const quantity = Math.floor(mapWidth * mapHeight) * CUBE_GENERATION_RATE;

  if (quantity === 0) quantity = 50;

  for (let i = 0; i < quantity; i++) {
    const cube = new Cube(0xc2352b, mass);
    const cubeRandomSpeed = Math.random() * velocity - velocity;

    const randomX = (Math.random() * mapWidth) - mapWidth/2;
    const randomY = (Math.random() * mapHeight) - mapHeight/2;

    cube.position.set(randomX, randomY);
    cube.rotationSpeed.set(cubeRandomSpeed, cubeRandomSpeed, 0);
    cube.velocity.set(cubeRandomSpeed, cubeRandomSpeed, 0);

    cubesMap.set(cube.id, cube);
  }

  scene.add(...cubesMap.values());
  return cubesMap;
}

export function animateCubes(cubes) {
  cubes.forEach((c) => {
    c.position.x += c.velocity.x;
    c.position.y += c.velocity.y;
    c.position.z += c.velocity.z;
    c.rotation.x += c.velocity.x;
    c.rotation.y += c.velocity.y;
  });
}
