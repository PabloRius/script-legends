import { Assets, Rectangle, Texture } from 'pixi.js';

export const loadTileset = async (tilesetImage: string): Promise<Texture> => {
  await Assets.load(tilesetImage);
  const texture = Texture.from(tilesetImage);

  return texture;
};

export function generate_tiles_data(
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

export const initTilesets = async () => {
  const outdoor_tileset = await loadTileset('/tilesets/Outdoors.png');
  const outdoor_tiles = generate_tiles_data(outdoor_tileset, 64, 100);
  const indoor_tileset = await loadTileset('/tilesets/Indoors.png');
  const indoor_tiles = generate_tiles_data(indoor_tileset, 64, 100);

  return {
    Outdoors: outdoor_tiles,
    Indoors: indoor_tiles,
  };
};
