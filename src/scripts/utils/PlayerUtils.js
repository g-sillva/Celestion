import { checkPlayerCollision } from "./collisionDetection";
import { Player } from "../entities/Player";

export function playerConsumeHandler(camera, scene, cubes, player) {
    const cubeIndex = checkPlayerCollision(cubes, player);
    if (cubeIndex !== -1) {
        const cube = cubes.get(cubeIndex);
        cubes.delete(cubeIndex);
        scene.remove(cube);
        camera.position.z = 10 * player.mass;
        player.scale.x += 0.005;
        player.scale.y += 0.005;
        player.scale.z += 0.001;
        player.getAura().setRadius(2 * player.scale.x)
    }
}

export function generatePlayer(camera, scene, color, mass, position) {
    const player = new Player(color, mass, position);
    const circle = player.getAura();
    camera.position.z = 10 * mass;

    scene.add(player);
    scene.add(circle);
    return player;
}