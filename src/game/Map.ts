import { Application, Container, Graphics } from 'pixi.js';

const terrain: { [key: number]: number } = {
  0: 0x7f7f7f,
  1: 0x1e90ff,
  2: 0x32cd32,
};

export const createMap = (
  mapData: number[][],
  tileSize: number,
  app: Application,
) => {
  const mapContainer = new Container();
  app.stage.addChild(mapContainer);

  for (let row: number = 0; row < mapData.length; row++) {
    for (let col: number = 0; col < mapData[row].length; col++) {
      const tileType = mapData[row][col];
      const tileContent = terrain[tileType] || 0x000000;

      const tile = new Graphics();
      tile.fill(tileContent);
      tile.rect(col * tileSize, row * tileSize, tileSize, tileSize);
      tile.fill();

      mapContainer.addChild(tile);
    }
  }
  return { mapContainer };
};
