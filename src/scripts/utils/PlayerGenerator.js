import { Player } from "../entities/Player";

export function generatePlayer(color, size, position) {
    const player = new Player(color, size, position);

    return player;
}