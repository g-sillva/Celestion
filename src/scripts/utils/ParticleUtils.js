import { Particle } from "../entities/Particle";
import { PARTICLE_DEFAULT_COLOR, PARTICLE_FADE_RATE, PARTICLE_GENERATION_RATE } from "./Constants";

export function generateParticles(scene, map, mass, velocity) {
  const particlesMap = new Map();
  const mapWidth = map.getWidth();
  const mapHeight = map.getHeight();

  let quantity = Math.floor(mapWidth * mapHeight) * PARTICLE_GENERATION_RATE;

  if (quantity === 0) quantity = 50;

  for (let i = 0; i < quantity; i++) {
    const particle = new Particle(PARTICLE_DEFAULT_COLOR, mass);
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

export function animateParticles(particles) {
  particles.forEach((c) => {
    c.position.x += c.velocity.x;
    c.position.y += c.velocity.y;
    c.position.z += c.velocity.z;
    c.rotation.x += c.velocity.x;
    c.rotation.y += c.velocity.y;
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
