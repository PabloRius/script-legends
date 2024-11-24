import { Application, Container, Sprite } from 'pixi.js';

export const updateCamera = (
  mapContainer: Container,
  player: Sprite,
  app: Application,
  mapWidth: number,
  mapHeight: number,
) => {
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
