import { Application, Container, Graphics } from 'pixi.js';

export const updateCamera = (
  mapContainer: Container,
  player: Graphics,
  app: Application,
  mapWidth: number,
  mapHeight: number,
) => {
  mapContainer.x = -player.x + app.screen.width / 2 - player.width / 2;
  mapContainer.y = -player.y + app.screen.height / 2 - player.height / 2;

  mapContainer.x = Math.min(
    0,
    Math.max(mapContainer.x, -mapWidth + app.screen.width),
  );
  mapContainer.y = Math.min(
    0,
    Math.max(mapContainer.y, -mapHeight + app.screen.height),
  );
};
