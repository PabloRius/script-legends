import { Application, Container, Graphics } from 'pixi.js';

export const updateCamera = (
  mapContainer: Container,
  player: Graphics,
  app: Application,
  mapWidth: number,
  mapHeight: number,
) => {
  const cameraX = -player.x + app.screen.width / 2 - player.width / 2;
  const cameraY = -player.y + app.screen.height / 2 - player.height / 2;

  mapContainer.x = Math.min(0, Math.max(cameraX, -mapWidth + app.screen.width));
  mapContainer.y = Math.min(
    0,
    Math.max(cameraY, -mapHeight + app.screen.height),
  );
  mapContainer.x = Math.min(
    Math.max(
      -player.x + (app.screen.width - 32) / 2,
      -mapWidth + 32 + app.screen.width,
    ),
    0,
  );
  mapContainer.y = Math.min(
    Math.max(
      -player.y + (app.screen.height - 32) / 2,
      -mapHeight + app.screen.height,
    ),
    0,
  );
};
