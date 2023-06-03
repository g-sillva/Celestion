import * as THREE from 'three';

import { checkPlayerCubeCollision } from "./collisionDetection";
import { Player } from "../entities/Player";
import { AURA_BASE_SIZE, CAMERA_Z_POSITION, CUBE_MASS } from "./Constants";

export function playerConsumeHandler(camera, scene, cubes, player) {
    const cubeIndex = checkPlayerCubeCollision(cubes, player);
    if (cubeIndex !== -1) {
        const cube = cubes.get(cubeIndex);
        cubes.delete(cubeIndex);
        scene.remove(cube);

        player.setMass(player.getMass() + cube.getMass());
        player.getAura().setRadius(AURA_BASE_SIZE * player.scale.x);

        const distanceFromPlayer = AURA_BASE_SIZE * player.mass * CAMERA_Z_POSITION;

        const cameraPosition = new THREE.Vector3(0, 0, distanceFromPlayer);
        player.localToWorld(cameraPosition);
        camera.position.copy(cameraPosition);
    }
}

export function generatePlayer(camera, scene, color, mass, position) {
    const player = new Player(color, mass, position);
    const circle = player.getAura();

    const distanceFromPlayer = AURA_BASE_SIZE * player.mass * CAMERA_Z_POSITION;

    const cameraPosition = new THREE.Vector3(0, 0, distanceFromPlayer);
    player.localToWorld(cameraPosition);
    camera.position.copy(cameraPosition);

    scene.add(player);
    scene.add(circle);
    return player;
}