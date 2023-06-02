import * as THREE from "three";

export function checkAuraCollision(cubes, player) {
  const circle = player.getAura();
  const circlePosition = new THREE.Vector2(
    circle.position.x,
    circle.position.y
  );

  cubes.forEach((cube) => {
    const cubePosition = new THREE.Vector2(cube.position.x, cube.position.y);
    const distance = cubePosition.distanceTo(circlePosition);

    if (
      distance <=
      circle.geometry.parameters.radius + cube.geometry.parameters.width / 2
    ) {
      cube.material.color.setHex(0x0000ff);
    } else {
      cube.material.color.setHex(0xc2352b);
    }
  });
}

export function checkPlayerCollision(cubes, player) {
  const playerBox = new THREE.Box3().setFromCenterAndSize(
    player.position,
    new THREE.Vector3(player.scale.x, player.scale.y, player.scale.z)
  );

  let index = -1;
  cubes.forEach((cube, key) => {
    const cubeSize = cube.scale.x;
    const cubeBox = new THREE.Box3().setFromCenterAndSize(
      cube.position,
      new THREE.Vector3(cubeSize, cubeSize, cubeSize)
    );

    if (cubeBox.intersectsBox(playerBox)) {
      index = key;
    }
  });

  return index;
}
