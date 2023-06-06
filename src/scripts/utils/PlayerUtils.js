import * as THREE from "three";

import { Player } from "../entities/Player";
import {
  AURA_BASE_SIZE,
  CAMERA_Z_POSITION,
  CUBE_ORBIT_VELOCITY,
  CUBE_MIN_ORBIT_DISTANCE,
} from "./Constants";

export function playerConsumeHandler(camera, cube, player) {
  player.setMass(player.getMass() + cube.getMass());

  const distanceFromPlayer = AURA_BASE_SIZE * CAMERA_Z_POSITION + Math.log2(player.getMass());
  camera.position.z = distanceFromPlayer;

  const cameraTargetPosition = player.localToWorld(new THREE.Vector3());
  camera.lookAt(cameraTargetPosition);
}

export function renderPlayerParticles(scene, player) {
  const circle = player.getAura();
  const circlePosition = new THREE.Vector3(
    circle.position.x,
    circle.position.y,
    circle.position.z
  );

  const angleIncrement = (2 * Math.PI) / player.getParticles().length;
  const time = performance.now();
  
  player.getParticles().forEach((cube, index) => {
    const cubeAngle = index * angleIncrement;
    const orbitDistance = Math.random() * (player.getAura().getRadius() - CUBE_MIN_ORBIT_DISTANCE) + CUBE_MIN_ORBIT_DISTANCE;

    if (cube.orbitRadius === undefined) {
      cube.initialOrbitRadius = orbitDistance;
    }

    cube.orbitRadius = cube.initialOrbitRadius;

    const orbitX =
      circlePosition.x + Math.cos(cubeAngle + time * CUBE_ORBIT_VELOCITY + player.rotation.x) * cube.orbitRadius;
    const orbitY =
      circlePosition.y + Math.sin(cubeAngle + time * CUBE_ORBIT_VELOCITY + player.rotation.y) * cube.orbitRadius;

    cube.position.x = orbitX;
    cube.position.y = orbitY;

    scene.add(cube);
  });
}

export function playerSpawnAnimation(player) {
  const circle = player.getAura();
  if (player.material.opacity < 1) {
    player.material.opacity += 0.01;
  }
  if (player.material.opacity >= 0.5 && circle.getRadius() < AURA_BASE_SIZE) {
    circle.setRadius(circle.getRadius() + 0.05);
  }
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

export function generateRandomColor() {
  const minBrightness = 32;
  const maxBrightness = 255;

  let color = 0;
  let brightness = 0;

  do {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    brightness = (red + green + blue) / 3;
    color = (red << 16) + (green << 8) + blue;
  } while (brightness < minBrightness || brightness > maxBrightness);

  return color;
}
