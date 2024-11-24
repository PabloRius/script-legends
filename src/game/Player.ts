import { Application, Container, Sprite, Texture } from 'pixi.js';
import { playerState } from '../types/playerState';
import { mapData } from '../types/mapData';
import { spriteSet } from '../types/spriteSet';
import { changeMap } from './Map';

export const createPlayer = (
  mapContainer: Container,
  spriteSet: spriteSet,
  tileSize: number,
): playerState => {
  const idleDown = spriteSet.down[0];

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
    currentFrame: 0,
    animationTimer: 0,
    animationSpeed: 100,
  };
};

export const movePlayer = (
  app: Application,
  playerLayer: Container,
  playerState: playerState,
  keys: Record<string, boolean>,
  mapData: mapData,
  tileSize: number,
  spriteSet: spriteSet,
  tileset: { [key: string]: { [key: number]: Texture } },
): mapData | undefined => {
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
      idlePlayer(playerState, spriteSet);
      playerState.isMoving = false;
      const transition = mapData.mapTransitions.find(
        (t) =>
          t.entryX === player.x / tileSize &&
          t.entryY === player.y / tileSize + 1,
      );
      if (transition) {
        return changeMap(
          app,
          transition,
          playerLayer,
          playerState,
          spriteSet,
          tileset,
          tileSize,
          transition.direction,
        );
      }
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
    rotatePlayer(playerState, spriteSet, 'up');
    if (playerRow > 0 && surroundings.up === 0) {
      playerState.targetPosition.y -= tileSize;
      playerState.isMoving = true;
    }
    return;
  }
  if (keys['ArrowDown']) {
    rotatePlayer(playerState, spriteSet, 'down');
    if (playerRow < mapData.height - 1 && surroundings.down === 0) {
      playerState.targetPosition.y += tileSize;
      playerState.isMoving = true;
    }
    return;
  }
  if (keys['ArrowLeft']) {
    rotatePlayer(playerState, spriteSet, 'left');
    if (playerCol > 0 && surroundings.left === 0) {
      playerState.targetPosition.x -= tileSize;
      playerState.isMoving = true;
    }
    return;
  }
  if (keys['ArrowRight']) {
    rotatePlayer(playerState, spriteSet, 'right');
    if (playerCol < mapData.width - 1 && surroundings.right === 0) {
      playerState.targetPosition.x += tileSize;
      playerState.isMoving = true;
    }
    return;
  }
};

export const idlePlayer = (playerState: playerState, spriteSet: spriteSet) => {
  const direction = playerState.direction;
  const idleFrame = spriteSet[direction][0];
  playerState.player.texture = idleFrame;
};

export const rotatePlayer = (
  playerState: playerState,
  spriteSet: spriteSet,
  direction: 'up' | 'down' | 'left' | 'right',
) => {
  const idleFrame = spriteSet[direction][0];
  playerState.direction = direction;
  playerState.player.texture = idleFrame;
};

export const animatePlayer = (
  playerState: playerState,
  spriteSet: spriteSet,
  deltaTime: number,
) => {
  const direction = playerState.direction;
  const frames = spriteSet[direction];
  playerState.animationTimer += deltaTime;

  if (playerState.animationTimer >= playerState.animationSpeed) {
    playerState.animationTimer = 0;

    playerState.currentFrame = (playerState.currentFrame + 1) % frames.length;

    playerState.player.texture = frames[playerState.currentFrame];
  }
};
