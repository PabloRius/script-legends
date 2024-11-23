import { Container, Sprite, Texture } from 'pixi.js';
import { mapData } from '../types/mapData';

export const drawGround = (
  mapData: mapData,
  mapContainer: Container,
  tileset: { [key: string]: { [key: number]: Texture } },
  tileSize: number,
) => {
  const tiles = tileset[mapData.tilesetName];

  for (let i: number = 0; i < mapData.height; i++) {
    for (let j: number = 0; j < mapData.width; j++) {
      const layer0 = mapData.layers[0].data[i * mapData.width + j] - 1;
      const layer1 = mapData.layers[1].data[i * mapData.width + j] - 1;
      const layer2 = mapData.layers[2].data[i * mapData.width + j] - 1;
      const layer3 = mapData.layers[3].data[i * mapData.width + j] - 1;

      const tileSprite_l0 = new Sprite(tiles[layer0]);
      tileSprite_l0.x = j * tileSize;
      tileSprite_l0.y = i * tileSize;

      mapContainer.addChild(tileSprite_l0);

      const tileSprite_l1 = new Sprite(tiles[layer1]);
      tileSprite_l1.x = j * tileSize;
      tileSprite_l1.y = i * tileSize;

      mapContainer.addChild(tileSprite_l1);

      const tileSprite_l2 = new Sprite(tiles[layer2]);
      tileSprite_l2.x = j * tileSize;
      tileSprite_l2.y = i * tileSize;

      mapContainer.addChild(tileSprite_l2);

      const tileSprite_l3 = new Sprite(tiles[layer3]);
      tileSprite_l3.x = j * tileSize;
      tileSprite_l3.y = i * tileSize;

      mapContainer.addChild(tileSprite_l3);
    }
  }
};

export const drawRoofs = (
  mapData: mapData,
  mapContainer: Container,
  tileset: { [key: string]: { [key: number]: Texture } },
  tileSize: number,
) => {
  const tiles = tileset[mapData.tilesetName];

  for (let i: number = 0; i < mapData.height; i++) {
    for (let j: number = 0; j < mapData.width; j++) {
      const layer3 = mapData.layers[3].data[i * mapData.width + j] - 1;

      const tileSprite_l3 = new Sprite(tiles[layer3]);
      tileSprite_l3.x = j * tileSize;
      tileSprite_l3.y = i * tileSize;

      mapContainer.addChild(tileSprite_l3);
    }
  }
};

export const resetMap = (mapContainer: Container) => {
  mapContainer.removeChildren();
};
