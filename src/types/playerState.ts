import { Sprite } from 'pixi.js';

export interface playerState {
  player: Sprite;
  isMoving: boolean;
  direction: 'up' | 'down' | 'left' | 'right';
  targetPosition: { x: number; y: number };
  playerWidth: number;
  playerHeight: number;
  playerSpeed: number;
}
