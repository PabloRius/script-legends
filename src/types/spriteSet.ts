import { Texture } from 'pixi.js';

export interface spriteSet {
  width: number;
  height: number;
  up: Array<Texture>;
  down: Array<Texture>;
  left: Array<Texture>;
  right: Array<Texture>;
}
