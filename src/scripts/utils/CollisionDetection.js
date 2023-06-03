import * as THREE from "three";

export function checkAuraCollision(cubes, player) {
  const circle = player.getAura();
  const circlePosition = new THREE.Vector2(
    circle.position.x,
    circle.position.y
  );
  const G = 0.01;
  const circleRadius = circle.scale.x * circle.getRadius();

  cubes.forEach((cube) => {
    const cubePosition = new THREE.Vector2(cube.position.x, cube.position.y);
    const cubeRadius = cube.geometry.parameters.width / 2;
    const distance = cubePosition.distanceTo(circlePosition);

    if (distance <= circleRadius + cubeRadius) {
      const direction = cubePosition.clone().sub(circlePosition).normalize();
      const accelerationMagnitude = (G * player.mass) / Math.pow(distance, 2);

      cube.acceleration.add(direction.multiplyScalar(accelerationMagnitude));
      cube.velocity.x -= cube.acceleration.x;
      cube.velocity.y -= cube.acceleration.y;
      cube.velocity.clampLength(0, 0.5);
      cube.acceleration.set(0, 0);
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
