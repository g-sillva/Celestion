import * as THREE from "three";

import { Cube } from "../entities/Cube";
import { CUBE_GENERATION_RATE } from "./Constants";

export function generateCubes(scene, map, mass, velocity) {
  const cubesMap = new Map();
  const mapWidth = map.getWidth();
  const mapHeight = map.getHeight();

  let quantity = Math.floor(mapWidth * mapHeight) * CUBE_GENERATION_RATE;

  if (quantity === 0) quantity = 50;

  for (let i = 0; i < quantity; i++) {
    const cube = new Cube(0xc2352b, mass);
    const cubeRandomSpeed = Math.random() * velocity - velocity;

    const randomX = Math.random() * mapWidth - mapWidth / 2;
    const randomY = Math.random() * mapHeight - mapHeight / 2;

    cube.position.set(randomX, randomY, 0);
    cube.rotationSpeed.set(cubeRandomSpeed, cubeRandomSpeed, 0);
    cube.velocity.set(cubeRandomSpeed, cubeRandomSpeed, 0);

    cubesMap.set(cube.id, cube);
  }

  scene.add(...cubesMap.values());
  return cubesMap;
}

export function animateCubes(scene, cubes) {
  cubes.forEach((c) => {
    c.position.x += c.velocity.x;
    c.position.y += c.velocity.y;
    c.position.z += c.velocity.z;
    c.rotation.x += c.velocity.x;
    c.rotation.y += c.velocity.y;

    if (Math.abs(c.velocity.x) > 0.05 || Math.abs(c.velocity.y) > 0.05) {
      generateCubesTrail(scene, c);
    }
  });
}

export function generateCubesTrail(scene, cube) {
  const trailGeometry = new THREE.BufferGeometry();
  const trailPositions = new Map();
  trailPositions.set(cube.id, [
    cube.position.x,
    cube.position.y,
    cube.position.z,
  ]);
  const positionArray = Array.from(trailPositions.values()).flat();
  trailGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positionArray, 3)
  );

  const trailMaterial = new THREE.PointsMaterial({
    color: cube.material.color,
    size: cube.getMass() * 5,
    opacity: 0.5,
    transparent: true,
  });

  const trailParticles = new THREE.Points(trailGeometry, trailMaterial);
  scene.add(trailParticles);
}

export function cubeDisappearAnimation(scene, cube, cubes) {
  cube.material.opacity -= 0.02;
  cube.scale.addScalar(-0.02);

  if (cube.material.opacity <= 0.0) {
    scene.remove(cube);
    cubes.delete(cube.id);
  }
}
