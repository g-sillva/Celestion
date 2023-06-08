import * as THREE from "three";
import { particleDisappearAnimation } from "./ParticleUtils";
import { playerConsumeHandler, playerSpawnAnimation } from "./PlayerUtils";
import { GRAVITACIONAL_CONSTANT } from "./Constants";

export function checkAuraCollision(camera, scene, particles, player) {
  if (player.spawned) return;

  playerSpawnAnimation(player);

  const circle = player.getAura();
  const circlePosition = new THREE.Vector3(
    circle.position.x,
    circle.position.y,
    1
  );
  const G = GRAVITACIONAL_CONSTANT;
  const circleRadius = circle.scale.x * circle.getRadius();
  const orbitDistance = circleRadius / 1.5;

  const playerParticlesSet = new Set(player.getParticles());

  particles.forEach((particle) => {
    if (particle.position.z === 0 && !particle.isDisappearing && !playerParticlesSet.has(particle)) {
      const particlePosition = new THREE.Vector2(particle.position.x, particle.position.y);
      const particleRadius = particle.geometry.parameters.width / 2;
      const distance = particlePosition.distanceTo(circlePosition);

      if (distance < orbitDistance) {
        playerConsumeHandler(scene, particle, player, particles);
      } else if (distance <= circleRadius + particleRadius) {
        const direction = particlePosition.clone().sub(circlePosition).normalize();
        const accelerationMagnitude = (G * player.mass) / Math.pow(distance, 2);

        particle.acceleration.add(direction.multiplyScalar(accelerationMagnitude));
        particle.velocity.x -= particle.acceleration.x;
        particle.velocity.y -= particle.acceleration.y;
        particle.velocity.clampLength(0, 0.5);
      }
    }
  });
}

export function checkParticlesParticleCollision(scene, player, particles) {
  const gridSize = 100;
  const grid = {};

  particles.forEach((particle) => {
    const cellX = Math.floor(particle.position.x / gridSize);
    const cellY = Math.floor(particle.position.y / gridSize);
    const cellKey = `${cellX}_${cellY}`;

    if (!grid[cellKey]) {
      grid[cellKey] = [];
    }

    grid[cellKey].push(particle);
  });

  const playerParticlesSet = new Set(player.getParticles());

  Object.values(grid).forEach((cell) => {
    for (let i = 0; i < cell.length; i++) {
      const particleA = cell[i];

      for (let j = i + 1; j < cell.length; j++) {
        const particleB = cell[j];

        const boxA = new THREE.Box3().setFromObject(particleA);
        const boxB = new THREE.Box3().setFromObject(particleB);
  
        if (boxA.intersectsBox(boxB)) {
          if (playerParticlesSet.has(particleA) || playerParticlesSet.has(particleB)) {
            return;
          } else {
            scene.remove(particleA);
            particleB.addMass(particleA.getMass() * 2);
            particleB.material.color.setHex(0xffffff);
          }
        }
      }
    }
  });
}

export function checkPlayerBorderCollision(map, player) {
  const playerPosition = player.position;

  if (
    playerPosition.x + player.scale.x > map.getWidth() / 2 ||
    playerPosition.x - player.scale.x < -map.getWidth() / 2 ||
    playerPosition.y + player.scale.y > map.getHeight() / 2 ||
    playerPosition.y - player.scale.y < -map.getHeight() / 2
  ) {
    const centerPosition = new THREE.Vector3(0, 0, playerPosition.z);

    const direction = centerPosition.clone().sub(playerPosition).normalize();

    const accelerationChange = direction.multiplyScalar(0.003);
    player.acceleration.add(accelerationChange);
    player.velocity.add(player.acceleration);
  }
}

export function checkParticlesBorderCollision(scene, map, particles) {
  const mapWidth = map.getWidth();
  const mapHeight = map.getHeight();

  particles.forEach((particle) => {
    const particlePosition = particle.position;
    const particleScale = particle.scale;

    if (
      particlePosition.x + particleScale.x > mapWidth / 2 ||
      particlePosition.x - particleScale.x < -mapWidth / 1.5 ||
      particlePosition.y + particleScale.y > mapHeight / 1.5 ||
      particlePosition.y - particleScale.y < -mapHeight / 1.5
    ) {
      particle.isDisappearing = true;
      particleDisappearAnimation(scene, particle, particles);
    }
  });
}
