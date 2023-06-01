import * as THREE from "three";

export function checkCollision(cubes, circle) {

    const circlePosition = new THREE.Vector2(circle.position.x, circle.position.y);
    
    cubes.forEach((cube) => {
      const cubePosition = new THREE.Vector2(cube.position.x, cube.position.y);
      const distance = cubePosition.distanceTo(circlePosition);

      if (distance <= circle.geometry.parameters.radius + cube.geometry.parameters.width / 2) {
        cube.scale.set(10, 10, 10);
        cube.material.color.setHex(0x0000ff);
      } else {
        cube.material.color.setHex(0xc2352b);   
        cube.scale.set(1, 1, 1);
      }
    });
  }