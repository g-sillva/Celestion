import * as THREE from "three";

import { Player } from "../entities/Player";
import {
  AURA_BASE_SIZE,
  CAMERA_Z_POSITION,
  PARTICLE_ORBIT_VELOCITY,
  PARTICLE_MIN_ORBIT_DISTANCE,
} from "./Constants";

export function playerConsumeHandler(
  scene,
  particle,
  player,
  particlesList
) {
  player.addParticles(particle);
  scene.remove(particle);
  particlesList.delete(particle);
}

export function renderPlayerParticles(scene, player) {
  const circle = player.getAura();
  const circlePosition = new THREE.Vector3(
    circle.position.x,
    circle.position.y,
    circle.position.z
  );

  const particles = player.getParticles();
  const auraRadius = circle.getRadius();
  const time = performance.now();

  const particlesToAdd = [];

  particles.forEach((particle) => {
    if (particle.orbitRadius === undefined) {
      particle.orbitRadius = PARTICLE_MIN_ORBIT_DISTANCE + Math.random() * (auraRadius - PARTICLE_MIN_ORBIT_DISTANCE);
      particle.particleAngle = Math.random() * 2 * Math.PI;
    }

    const orbitX = circlePosition.x + Math.cos(particle.particleAngle + time * PARTICLE_ORBIT_VELOCITY + player.rotation.x) * particle.orbitRadius;
    const orbitY = circlePosition.y + Math.sin(particle.particleAngle + time * PARTICLE_ORBIT_VELOCITY + player.rotation.y) * particle.orbitRadius;

    particle.position.x = orbitX;
    particle.position.y = orbitY;

    particlesToAdd.push(particle);
  });

  particlesToAdd.forEach(p => {
    scene.add(p);
  })
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

  const distanceFromPlayer =
    AURA_BASE_SIZE * player.getMass() * CAMERA_Z_POSITION;

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
