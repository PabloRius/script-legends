import { Application, Container, Sprite } from 'pixi.js';
import { mapData } from '../types/mapData';
import { tiles } from './Tileset';

export const createMap = (
  mapData: mapData,
  tileSize: number,
  app: Application,
): Container => {
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
