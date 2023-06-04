import * as THREE from "three";
import { cubeDisappearAnimation } from "./CubeUtils";
import { playerConsumeHandler } from "./PlayerUtils";
import { GRAVITACIONAL_CONSTANT } from "./Constants";

export function checkAuraCollision(camera, scene, cubes, player) {
  const circle = player.getAura();
  const circlePosition = new THREE.Vector3(
    circle.position.x,
    circle.position.y,
    1
  );
  const G = GRAVITACIONAL_CONSTANT;
  const circleRadius = circle.scale.x * circle.getRadius();
  const orbitDistance = circleRadius / 2;

  cubes.forEach((cube) => {
    if (cube.position.z === 0 && !cube.isDisappearing) {
      const cubePosition = new THREE.Vector2(cube.position.x, cube.position.y);
      const cubeRadius = cube.geometry.parameters.width / 2;
      const distance = cubePosition.distanceTo(circlePosition);

      if (distance < orbitDistance) {
        cube.velocity.set(0, 0);
        cube.acceleration.set(0, 0);

        player.addParticles(cube);
        playerConsumeHandler(camera, cube, player);
        cubes.delete(cube.id);
        scene.remove(cube);
      } else if (distance <= circleRadius + cubeRadius) {
        const direction = cubePosition.clone().sub(circlePosition).normalize();
        const accelerationMagnitude = (G * player.mass) / Math.pow(distance, 2);

        cube.acceleration.add(direction.multiplyScalar(accelerationMagnitude));
        cube.velocity.x -= cube.acceleration.x;
        cube.velocity.y -= cube.acceleration.y;
        cube.velocity.clampLength(0, 0.5);
        cube.acceleration.set(0, 0);
      }
    }
  });
}

export function checkPlayerCubeCollision(cubes, player) {
  const playerBox = new THREE.Box3().setFromObject(player);

  let index = -1;
  cubes.forEach((cube, key) => {
    const cubeBox = new THREE.Box3().setFromObject(cube);

    if (cubeBox.intersectsBox(playerBox)) {
      index = key;
    }
  });

  return index;
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

export function checkCubesBorderCollision(scene, map, cubes) {
  const mapWidth = map.getWidth();
  const mapHeight = map.getHeight();

  cubes.forEach((cube) => {
    const cubePosition = cube.position;
    const cubeScale = cube.scale;

    if (
      cubePosition.x + cubeScale.x > mapWidth / 2 ||
      cubePosition.x - cubeScale.x < -mapWidth / 1.5 ||
      cubePosition.y + cubeScale.y > mapHeight / 1.5 ||
      cubePosition.y - cubeScale.y < -mapHeight / 1.5
    ) {
      cube.isDisappearing = true;
      cubeDisappearAnimation(scene, cube, cubes);
    }
  });
}
