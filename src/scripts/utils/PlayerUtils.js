import { checkPlayerCollision } from "./collisionDetection";

export function playerConsumeHandler(camera, scene, cubes, player) {
    const cubeIndex = checkPlayerCollision(cubes, player);
    if (cubeIndex !== -1) {
        const cube = cubes.splice(cubeIndex, 1)[0];

        scene.remove(cube);
        camera.position.z += 0.05;
        player.scale.x += 0.005;
        player.scale.y += 0.005;
        player.scale.z += 0.001;
        player.getAura().setRadius(2 * player.scale.x)
    }
}