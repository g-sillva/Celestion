import * as THREE from "three";

import { Player } from "../entities/Player";
import { AURA_BASE_SIZE, CAMERA_Z_POSITION, CUBE_ORBIT_DISTANCE, CUBE_ORBIT_VELOCITY } from "./Constants";

export function playerConsumeHandler(camera, cube, player) {
  player.setMass(player.getMass() + cube.getMass());
  player.getAura().setRadius(AURA_BASE_SIZE * player.scale.x);

  const distanceFromPlayer = AURA_BASE_SIZE * player.mass * CAMERA_Z_POSITION;

  const cameraPosition = new THREE.Vector3(0, 0, distanceFromPlayer);
  player.localToWorld(cameraPosition);
  camera.position.copy(cameraPosition);
}

export function renderPlayerParticles(scene, player) {
  const circle = player.getAura();
  const circlePosition = new THREE.Vector3(
    circle.position.x,
    circle.position.y,
    1
  );

  const angleIncrement = (2 * Math.PI) / player.getParticles().length;
  const time = performance.now();

  const orbitDistance = CUBE_ORBIT_DISTANCE * player.mass * (1 + Math.random());

  player.getParticles().forEach((cube, index) => {
    const cubeAngle = index * angleIncrement;

    if (cube.orbitRadius === undefined) {
      cube.initialOrbitRadius = orbitDistance;
    }

    cube.orbitRadius = cube.initialOrbitRadius;

    const orbitX =
      circlePosition.x + Math.cos(cubeAngle + time * CUBE_ORBIT_VELOCITY) * cube.orbitRadius;
    const orbitY =
      circlePosition.y + Math.sin(cubeAngle + time * CUBE_ORBIT_VELOCITY) * cube.orbitRadius;

    cube.position.x = orbitX;
    cube.position.y = orbitY;

    scene.add(cube);
  });
}

export function generatePlayer(camera, scene, color, mass, position) {
  const player = new Player(color, mass, position);
  const circle = player.getAura();

  const distanceFromPlayer = AURA_BASE_SIZE * player.mass * CAMERA_Z_POSITION;

  const cameraPosition = new THREE.Vector3(0, 0, distanceFromPlayer);
  player.localToWorld(cameraPosition);
  camera.position.copy(cameraPosition);

  scene.add(player);
  scene.add(circle);
  return player;
}
