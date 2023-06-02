import * as THREE from "three";

export function checkAuraCollision(cubes, player) {
  const circle = player.getAura();
  const circlePosition = new THREE.Vector2(
    circle.position.x,
    circle.position.y
  );
  const circleRadius = circle.scale.x * circle.getRadius();
  const accelerationIncrease = 0.01;
  const playerPosition = player.position;

  cubes.forEach((cube) => {
    const cubePosition = new THREE.Vector2(cube.position.x, cube.position.y);
    const cubeRadius = cube.geometry.parameters.width / 2;
    const distance = cubePosition.distanceTo(circlePosition);

    if (distance <= circleRadius + cubeRadius) {
      cube.acceleration.x +=
        cubePosition.x > playerPosition.x
          ? -accelerationIncrease
          : accelerationIncrease;
      cube.acceleration.y +=
        cubePosition.y > playerPosition.y
          ? -accelerationIncrease
          : accelerationIncrease;

      cube.acceleration.multiplyScalar(1 - 0.9);
      cube.velocity.add(cube.acceleration);
      cube.velocity.clampLength(0, 0.1);
    }
  });
}

export function checkPlayerCollision(cubes, player) {
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
