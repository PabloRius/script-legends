import { Container, Sprite } from 'pixi.js';
import { playerState } from '../types/playerState';
import { mapData } from '../types/mapData';
import { spriteSet } from '../types/spriteSet';

export const createPlayer = (
  mapContainer: Container,
  spriteSet: spriteSet,
  tileSize: number,
): playerState => {
  const idleDown = spriteSet.down[1];

  const player = new Sprite(idleDown);
  player.width = spriteSet.width;
  player.height = spriteSet.height;

  player.x = 10 * tileSize;
  player.y = 10 * tileSize;
  mapContainer.addChild(player);

  return {
    player,
    playerWidth: spriteSet.width,
    playerHeight: spriteSet.height,
    direction: 'down',
    playerSpeed: 1,
    isMoving: false,
    targetPosition: { x: player.x, y: player.y },
  };
};

export const movePlayer = (
  playerState: playerState,
  keys: Record<string, boolean>,
  mapData: mapData,
  tileSize: number,
) => {
  const { player, isMoving, targetPosition, playerSpeed } = playerState;
  const obstacles = mapData.layers[2].data;

  if (isMoving) {
    // console.log(
    //   `Moving from [${player.x}, ${player.y}] to [${targetPosition.x}, ${targetPosition.y}]`,
    // );
    const dx = targetPosition.x - player.x;
    const dy = targetPosition.y - player.y;

    if (dx > 0) {
      player.x += playerSpeed;
    }
    if (dx < 0) {
      player.x -= playerSpeed;
    }
    if (dy > 0) {
      player.y += playerSpeed;
    }
    if (dy < 0) {
      player.y -= playerSpeed;
    }

    if (player.x === targetPosition.x && player.y === targetPosition.y) {
      playerState.isMoving = false;
    }
    return;
  }

  const playerCol = Math.floor(player.x / tileSize);
  const playerRow = Math.floor(player.y / tileSize);
  const UniDCoord = (player.y / 32 + 1) * mapData.width + player.x / 32;
  const surroundings = {
    up: obstacles[UniDCoord - mapData.width],
    down: obstacles[UniDCoord + mapData.width],
    left: obstacles[UniDCoord - 1],
    right: obstacles[UniDCoord + 1],
  };

  if (keys['ArrowUp']) {
    playerState.direction = 'up';
    if (playerRow > 0 && surroundings.up === 0) {
      playerState.targetPosition.y -= tileSize;
      playerState.isMoving = true;
    }
    return;
  }
  if (keys['ArrowDown']) {
    playerState.direction = 'down';
    if (playerRow < mapData.height - 1 && surroundings.down === 0) {
      playerState.targetPosition.y += tileSize;
      playerState.isMoving = true;
    }
    return;
  }
  if (keys['ArrowLeft']) {
    playerState.direction = 'left';
    if (playerCol > 0 && surroundings.left === 0) {
      playerState.targetPosition.x -= tileSize;
      playerState.isMoving = true;
    }
    return;
  }
  if (keys['ArrowRight']) {
    playerState.direction = 'right';
    if (playerCol < mapData.width - 1 && surroundings.right === 0) {
      playerState.targetPosition.x += tileSize;
      playerState.isMoving = true;
    }
    return;
  }
};

export const animatePlayer = (
  playerState: playerState,
  spriteSet: spriteSet,
) => {
  playerState.player.texture = spriteSet[playerState.direction][0];
};
