import * as THREE from "three";
import { Controller } from "./controller/Controller";
import { animateCubes, generateCubes } from "./utils/CubeUtils";
import { buildRenderer } from "./utils/Renderer";
import { checkAuraCollision } from "./utils/collisionDetection";
import { playerConsumeHandler, generatePlayer } from "./utils/PlayerUtils";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 10;

const player = generatePlayer(camera, scene, 0xc2352b, 1, new THREE.Vector3(0, 0, 0));
const controller = new Controller(camera, player, player.getAura());
const renderer = buildRenderer(window.innerWidth, window.innerHeight, 0x131414);
const cubes = generateCubes(scene, 1000, 0xc2352b, 0.1, 0.001);

function animate() {
  requestAnimationFrame(animate);
  animateCubes(cubes);
  checkAuraCollision(cubes, player);
  playerConsumeHandler(camera, scene, cubes, player);
  controller.updateMoves();
  renderer.render(scene, camera);
}
animate();
