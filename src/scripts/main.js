import * as THREE from "three";
import { Controller } from "./controller/Controller";
import { animateCubes, generateCubes } from "./utils/CubeUtils";
import { buildRenderer } from "./utils/Renderer";
import {
  checkAuraCollision,
  checkPlayerBorderCollision,
} from "./utils/collisionDetection";
import { playerConsumeHandler, generatePlayer } from "./utils/PlayerUtils";
import { Map } from "./entities/Map";
import {
  BACKGROUND_COLOR,
  CAMERA_FAR_PLANE,
  CAMERA_FOV,
  CAMERA_NEAR_PLANE,
  CUBE_DEFAULT_SIZE,
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
  CUBE_DEFAULT_SIZE,
  CUBE_DEFAULT_VELOCITY
);

function animate() {
  requestAnimationFrame(animate);
  animateCubes(cubes);
  checkAuraCollision(cubes, player);
  playerConsumeHandler(camera, scene, cubes, player);
  checkPlayerBorderCollision(map, player);
  controller.updateMoves();
  renderer.render(scene, camera);
}
animate();
