import { Graphics } from 'pixi.js';

export interface playerState {
  player: Graphics;
  isMoving: boolean;
  targetPosition: { x: number; y: number };
  playerSize: number;
  playerSpeed: number;
}
