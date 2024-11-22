import { Application, Container, Sprite } from 'pixi.js';
import { mapData } from '../types/mapData';
import { generate_tiles_data, loadTileset } from './Tileset';

export const createMap = async (
  mapData: mapData,
  tileSize: number,
  app: Application,
): Promise<Container> => {
  const tileset = await loadTileset('/tilesets/tileset.png');
  const tiles = generate_tiles_data(tileset, 64, 98);
  const mapContainer = new Container();
  app.stage.addChild(mapContainer);

  for (let i: number = 0; i < mapData.height; i++) {
    for (let j: number = 0; j < mapData.width; j++) {
      const tileId = mapData.layers[0].data[i * mapData.width + j] - 1;

      const tileSprite = new Sprite(tiles[tileId]);
      tileSprite.x = (j - 1) * tileSize;
      tileSprite.y = i * tileSize;

      mapContainer.addChild(tileSprite);
    }
  }
  return mapContainer;
};
