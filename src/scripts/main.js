import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";

import { Controller } from "./controller/Controller";
import { animateParticles, generateParticles, particlesTrailHandler } from "./utils/ParticleUtils";
import { buildRenderer, renderFarObjectsHandler } from "./utils/Renderer";
import {
  checkAuraCollision,
  checkParticlesBorderCollision,
  checkParticlesParticleCollision,
  checkPlayerBorderCollision,
} from "./utils/collisionDetection";
import { generatePlayer, generateRandomColor, renderPlayerParticles } from "./utils/PlayerUtils";
import { Map } from "./entities/Map";
import {
  BACKGROUND_COLOR,
  CAMERA_FAR_PLANE,
  CAMERA_FOV,
  CAMERA_NEAR_PLANE,
  PARTICLE_MASS,
  PARTICLE_DEFAULT_VELOCITY,
  MAP_BORDER_COLOR,
  MAP_HEIGHT,
  MAP_WIDTH,
  PLAYER_INITIAL_MASS,
} from "./utils/Constants";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  CAMERA_FOV,
  window.innerWidth / window.innerHeight,
  CAMERA_NEAR_PLANE,
  CAMERA_FAR_PLANE
);

const player = generatePlayer(
  camera,
  scene,
  generateRandomColor(),
  PLAYER_INITIAL_MASS,
  new THREE.Vector3(0, 0, 0)
);

const map = new Map(scene, MAP_WIDTH, MAP_HEIGHT, MAP_BORDER_COLOR);

const controller = new Controller(camera, player, player.getAura());

const renderer = buildRenderer(
  window.innerWidth,
  window.innerHeight,
  BACKGROUND_COLOR
);

const particles = generateParticles(
  scene,
  map,
  PARTICLE_MASS,
  PARTICLE_DEFAULT_VELOCITY
);

const composer = new EffectComposer(renderer);

const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  2,
  1,
  0
);
composer.addPass(bloomPass);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 1, 10);
scene.add(directionalLight);

function animate() {
  requestAnimationFrame(animate);
  animateParticles(scene, player, particles);
  particlesTrailHandler(scene);
  checkAuraCollision(scene, particles, player);
  renderPlayerParticles(scene, player);
  checkPlayerBorderCollision(map, player);
  checkParticlesParticleCollision(scene, player, particles);
  renderFarObjectsHandler(scene, camera, player);
  checkParticlesBorderCollision(scene, map, player, particles);
  controller.updateMoves();
  composer.render();
}
animate();
