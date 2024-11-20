import React, { useEffect, useRef } from 'react';
import { Application, Container, Graphics } from 'pixi.js';

export const GameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const app = new Application();

    const initApp = async () => {
      await app.init({ width: 800, height: 500 });

      if (canvasRef.current) {
        canvasRef.current.appendChild(app.canvas);
      }
      const mapWidth = 1600;
      const mapHeight = 1200;

      const mapContainer = new Container();
      app.stage.addChild(mapContainer);

      const map = new Graphics();
      map.fill('rgb(146, 78, 78)');
      map.rect(0, 0, mapWidth, mapHeight);
      map.fill();
      mapContainer.addChild(map);

      const player = new Graphics();
      const playerSize = 40;
      player.fill('rgb(33, 53, 167)');
      player.rect(0, 0, playerSize, playerSize);
      player.fill();
      player.x = 100;
      player.y = 100;
      mapContainer.addChild(player);

      const speed = 5;
      const keys: Record<string, boolean> = {};

      window.addEventListener('keydown', (e) => (keys[e.key] = true));
      window.addEventListener('keyup', (e) => (keys[e.key] = false));

      const movePlayer = () => {
        if (keys['ArrowUp'] && player.y > 0) {
          player.y -= speed;
        }
        if (keys['ArrowDown'] && player.y + playerSize < mapHeight) {
          player.y += speed;
        }
        if (keys['ArrowLeft'] && player.x > 0) {
          player.x -= speed;
        }
        if (keys['ArrowRight'] && player.x + playerSize < mapWidth) {
          player.x += speed;
        }
      };

      const updateCamera = () => {
        mapContainer.x = -player.x + app.screen.width / 2 - playerSize / 2;
        mapContainer.y = -player.y + app.screen.height / 2 - playerSize / 2;

        mapContainer.x = Math.min(
          0,
          Math.max(mapContainer.x, -mapWidth + app.screen.width),
        );
        mapContainer.y = Math.min(
          0,
          Math.max(mapContainer.y, -mapHeight + app.screen.height),
        );
      };

      app.ticker.add(() => {
        movePlayer();
        updateCamera();
      });

      return () => {
        app.destroy();
      };
    };

    initApp();
  });

  return <div ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
};
