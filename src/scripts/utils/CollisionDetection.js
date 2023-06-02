import * as THREE from "three";

export function checkAuraCollision(cubes, player) {
    const circle = player.getAura();
    const circlePosition = new THREE.Vector2(circle.position.x, circle.position.y);
    
    cubes.forEach((cube) => {
      const cubePosition = new THREE.Vector2(cube.position.x, cube.position.y);
      const distance = cubePosition.distanceTo(circlePosition);

      if (distance <= circle.geometry.parameters.radius + cube.geometry.parameters.width / 2) {
        cube.material.color.setHex(0x0000ff);
      } else {
        cube.material.color.setHex(0xc2352b);   
      }
    });
  }

export function checkPlayerCollision(cubes, player) {
  const playerBox = new THREE.Box3().setFromObject(player);

  for (let i = 0; i < cubes.length; i++) {
    const cube = cubes[i];
    const cubeBox = new THREE.Box3().setFromObject(cube);

    if (cubeBox.intersectsBox(playerBox)) {
      return i;
    }
  }
  return -1;
}