import { Rectangle, Texture } from 'pixi.js';
import { loadTileset } from './Tileset';

const generate_sprite_data = (
  tileset: Texture,
  spriteWidth: number,
  spriteHeight: number,
) => {
  return {
    width: spriteWidth,
    height: spriteHeight,
    spriteHeight,
    down: [
      new Texture({
        source: tileset.source,
        frame: new Rectangle(0, 0, spriteWidth, spriteHeight),
      }),
      new Texture({
        source: tileset.source,
        frame: new Rectangle(spriteWidth, 0, spriteWidth, spriteHeight),
      }),
      new Texture({
        source: tileset.source,
        frame: new Rectangle(spriteWidth * 2, 0, spriteWidth, spriteHeight),
      }),
      new Texture({
        source: tileset.source,
        frame: new Rectangle(spriteWidth * 3, 0, spriteWidth, spriteHeight),
      }),
    ],
    up: [
      new Texture({
        source: tileset.source,
        frame: new Rectangle(0, spriteHeight, spriteWidth, spriteHeight),
      }),
      new Texture({
        source: tileset.source,
        frame: new Rectangle(
          spriteWidth,
          spriteHeight,
          spriteWidth,
          spriteHeight,
        ),
      }),
      new Texture({
        source: tileset.source,
        frame: new Rectangle(
          spriteWidth * 2,
          spriteHeight,
          spriteWidth,
          spriteHeight,
        ),
      }),
      new Texture({
        source: tileset.source,
        frame: new Rectangle(
          spriteWidth * 3,
          spriteHeight,
          spriteWidth,
          spriteHeight,
        ),
      }),
    ],
    left: [
      new Texture({
        source: tileset.source,
        frame: new Rectangle(0, spriteHeight * 2, spriteWidth, spriteHeight),
      }),
      new Texture({
        source: tileset.source,
        frame: new Rectangle(
          spriteWidth,
          spriteHeight * 2,
          spriteWidth,
          spriteHeight,
        ),
      }),
      new Texture({
        source: tileset.source,
        frame: new Rectangle(
          spriteWidth * 2,
          spriteHeight * 2,
          spriteWidth,
          spriteHeight,
        ),
      }),
      new Texture({
        source: tileset.source,
        frame: new Rectangle(
          spriteWidth * 3,
          spriteHeight * 2,
          spriteWidth,
          spriteHeight,
        ),
      }),
    ],
    right: [
      new Texture({
        source: tileset.source,
        frame: new Rectangle(0, spriteHeight * 3, spriteWidth, spriteHeight),
      }),
      new Texture({
        source: tileset.source,
        frame: new Rectangle(
          spriteWidth,
          spriteHeight * 3,
          spriteWidth,
          spriteHeight,
        ),
      }),
      new Texture({
        source: tileset.source,
        frame: new Rectangle(
          spriteWidth * 2,
          spriteHeight * 3,
          spriteWidth,
          spriteHeight,
        ),
      }),
      new Texture({
        source: tileset.source,
        frame: new Rectangle(
          spriteWidth * 3,
          spriteHeight * 3,
          spriteWidth,
          spriteHeight,
        ),
      }),
    ],
  };
};
export const initSprites = async () => {
  const Red_tileset = await loadTileset('/sprites/Red.png');
  const Red_tiles = generate_sprite_data(Red_tileset, 32, 64);

  return {
    Red: Red_tiles,
  };
};
