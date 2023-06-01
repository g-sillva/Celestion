import { Player } from "../entities/Player";

export function generatePlayer(scene, color, size, position) {
    const player = new Player(color, size, position);
    const circle = player.getAura();

    scene.add(player);
    scene.add(circle);
    return player;
}