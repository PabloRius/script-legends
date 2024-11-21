import { Container, Graphics } from 'pixi.js';
import { playerState } from '../types/playerState';

export const createPlayer = (
  mapContainer: Container,
  tileSize: number,
): playerState => {
  const player = new Graphics();
  const playerSize = 32;
  const playerSpeed = 1;

  player.fill(0xff0000);
  player.rect(0, 0, playerSize, playerSize);
  player.fill();
  player.x = 3 * tileSize;
  player.y = 2 * tileSize;
  mapContainer.addChild(player);

  return {
    player,
    playerSize,
    playerSpeed,
    isMoving: false,
    targetPosition: { x: player.x, y: player.y },
  };
};

export const movePlayer = (
  playerState: playerState,

  keys: Record<string, boolean>,
  mapData: number[][],
) => {
  const { player, isMoving, targetPosition, playerSize, playerSpeed } =
    playerState;

  if (isMoving) {
    console.log(
      `Moving from [${player.x}, ${player.y}] to [${targetPosition.x}, ${targetPosition.y}]`,
    );
    const dx = targetPosition.x - player.x;
    const dy = targetPosition.y - player.y;

    if (dx > 0) player.x += playerSpeed;
    if (dx < 0) player.x -= playerSpeed;
    if (dy > 0) player.y += playerSpeed;
    if (dy < 0) player.y -= playerSpeed;

    if (player.x === targetPosition.x && player.y === targetPosition.y) {
      playerState.isMoving = false;
    }
    return;
  }

  const playerCol = Math.floor(player.x / playerSize);
  const playerRow = Math.floor(player.y / playerSize);

  if (
    keys['ArrowUp'] &&
    playerRow > 0 &&
    mapData[playerRow - 1][playerCol] >= 0
  ) {
    playerState.targetPosition.y -= playerSize;
    playerState.isMoving = true;
    return;
  }
  if (
    keys['ArrowDown'] &&
    playerRow < mapData.length - 1 &&
    mapData[playerRow + 1][playerCol] >= 0
  ) {
    playerState.targetPosition.y += playerSize;
    playerState.isMoving = true;
    return;
  }
  if (
    keys['ArrowLeft'] &&
    playerCol > 0 &&
    mapData[playerRow][playerCol - 1] >= 0
  ) {
    playerState.targetPosition.x -= playerSize;
    playerState.isMoving = true;
    return;
  }
  if (
    keys['ArrowRight'] &&
    playerCol < mapData[0].length - 1 &&
    mapData[playerRow][playerCol + 1] >= 0
  ) {
    playerState.targetPosition.x += playerSize;
    playerState.isMoving = true;
    return;
  }
};
