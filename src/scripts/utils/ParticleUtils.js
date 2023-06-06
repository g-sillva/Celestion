import * as THREE from "three";

import { Particle } from "../entities/Particle";
import { PARTICLE_FADE_RATE, PARTICLE_GENERATION_RATE, PARTICLE_SIZE_DIVIDER, TRAIL_FADE_RATE } from "./Constants";

export function generateParticles(scene, map, mass, velocity) {
  const particlesMap = new Map();
  const mapWidth = map.getWidth();
  const mapHeight = map.getHeight();

  let quantity = Math.floor(mapWidth * mapHeight) * PARTICLE_GENERATION_RATE;

  if (quantity === 0) quantity = 50;

  for (let i = 0; i < quantity; i++) {
    const particle = new Particle(0xc2352b, mass);
    const particleRandomSpeed = Math.random() * velocity - velocity;

    const randomX = Math.random() * mapWidth - mapWidth / 2;
    const randomY = Math.random() * mapHeight - mapHeight / 2;

    particle.position.set(randomX, randomY, 0);
    particle.rotationSpeed.set(particleRandomSpeed, particleRandomSpeed, 0);
    particle.velocity.set(particleRandomSpeed, particleRandomSpeed, 0);

    particlesMap.set(particle.id, particle);
  }

  scene.add(...particlesMap.values());
  return particlesMap;
}

export function animateParticles(scene, particles) {
  particles.forEach((c) => {
    c.position.x += c.velocity.x;
    c.position.y += c.velocity.y;
    c.position.z += c.velocity.z;
    c.rotation.x += c.velocity.x;
    c.rotation.y += c.velocity.y;

    if (Math.abs(c.velocity.x) > 0.05 || Math.abs(c.velocity.y) > 0.05) {
      generateParticlesTrail(scene, c);
    }
  });
}

const trailParticlesList = [];

export function generateParticlesTrail(scene, particle) {
  const trailGeometry = new THREE.BufferGeometry();
  const trailPositions = new Map();
  trailPositions.set(particle.id, [
    particle.position.x,
    particle.position.y,
    particle.position.z,
  ]);
  const positionArray = Array.from(trailPositions.values()).flat();
  trailGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positionArray, 3)
  );

  const trailMaterial = new THREE.PointsMaterial({
    color: particle.material.color,
    size: particle.getMass() / PARTICLE_SIZE_DIVIDER,
    opacity: 0.5,
    transparent: true,
  });

  const trailParticles = new THREE.Points(trailGeometry, trailMaterial);
  scene.add(trailParticles);
  trailParticlesList.push(trailParticles);
}

export function particlesTrailHandler(scene) {
  const removalList = [];

  trailParticlesList.forEach((particle) => {
    const material = particle.material;
    material.opacity -= TRAIL_FADE_RATE;

    if (material.opacity <= 0) {
      removalList.push(particle);
      scene.remove(particle);
    }
  });

  removalList.forEach((particle) => {
    scene.remove(particle);
    trailParticlesList.splice(trailParticlesList.indexOf(particle), 1);
  });
}

export function particleDisappearAnimation(scene, particle, particles) {
  particle.material.opacity -= PARTICLE_FADE_RATE;
  particle.scale.addScalar(-PARTICLE_FADE_RATE);

  if (particle.material.opacity <= 0.0) {
    scene.remove(particle);
    particles.delete(particle.id);
  }
}
