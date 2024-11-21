import { Assets, Rectangle, Texture } from 'pixi.js';

export const loadTileset = async (tilesetImage: string): Promise<Texture> => {
  await Assets.load(tilesetImage);
  const texture = Texture.from(tilesetImage);

  return texture;
};
const tileset = await loadTileset('/tilesets/tileset.png');

function generate_tiles_data(
  tileset: Texture,
  tilesetWidth: number,
  tilesetHeight: number,
): { [key: number]: Texture } {
  const tiles: { [key: number]: Texture } = {};
  for (let i: number = 0; i < tilesetHeight; i++) {
    for (let j: number = 0; j < tilesetWidth; j++) {
      const index = i * tilesetWidth + j;
      tiles[index] = new Texture({
        source: tileset.source,
        frame: new Rectangle(j * 32, i * 32, 32, 32),
      });
    }
  }
  return tiles;
}
export const tiles = generate_tiles_data(tileset, 64, 98);
