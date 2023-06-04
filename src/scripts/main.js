import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";

import { Controller } from "./controller/Controller";
import { animateCubes, generateCubes, particlesTrailHandler } from "./utils/CubeUtils";
import { buildRenderer, renderFarObjectsHandler } from "./utils/Renderer";
import {
  checkAuraCollision,
  checkCubesBorderCollision,
  checkPlayerBorderCollision,
} from "./utils/collisionDetection";
import { generatePlayer, renderPlayerParticles } from "./utils/PlayerUtils";
import { Map } from "./entities/Map";
import {
  BACKGROUND_COLOR,
  CAMERA_FAR_PLANE,
  CAMERA_FOV,
  CAMERA_NEAR_PLANE,
  CUBE_MASS,
  CUBE_DEFAULT_VELOCITY,
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
  0xc2352b,
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

const cubes = generateCubes(
  scene,
  map,
  CUBE_MASS,
  CUBE_DEFAULT_VELOCITY
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
  animateCubes(scene, cubes);
  particlesTrailHandler(scene);
  checkAuraCollision(camera, scene, cubes, player);
  checkPlayerBorderCollision(map, player);
  checkCubesBorderCollision(scene, map, cubes);
  renderPlayerParticles(scene, player);
  renderFarObjectsHandler(scene, camera, player);
  controller.updateMoves();

  composer.render();
}
animate();
