import * as THREE from "three";
import { Controller } from "./utils/controller";
import { animateCubes, generateCubes } from "./utils/CubeGenerator";
import { buildRenderer } from "./utils/Renderer";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 10;

const controller = new Controller(camera);
const renderer = buildRenderer(window.innerWidth, window.innerHeight, 0x131414);

let cubes = generateCubes(scene, 1000, 0xc2352b, 0.1, 0.001);

function animate() {
  requestAnimationFrame(animate);
  animateCubes(cubes);
  controller.updateMoves();
  renderer.render(scene, camera);
}
animate();
