import React, { useEffect, useRef } from 'react';
import { Application } from 'pixi.js';
import { createMap } from '../game/Map';
import { createPlayer, movePlayer } from '../game/Player';
import { updateCamera } from '../game/Camera';
import { defaultMap } from '../game/Maps/default';

const mapData = defaultMap;

const tileSize = 32;

export const GameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const app = new Application();

    const initApp = async () => {
      await app.init({
        width: Math.min(tileSize * mapData.width, tileSize * 25),
        height: Math.min(tileSize * mapData.height, tileSize * 15),
      });

      if (canvasRef.current) {
        canvasRef.current.appendChild(app.canvas);
      }
      const mapContainer = await createMap(mapData, tileSize, app);
      const playerState = createPlayer(mapContainer, tileSize);

      const keys: Record<string, boolean> = {};

      window.addEventListener('keydown', (e) => (keys[e.key] = true));
      window.addEventListener('keyup', (e) => (keys[e.key] = false));

      app.ticker.add(() => {
        movePlayer(playerState, keys, mapData);
        updateCamera(
          mapContainer,
          playerState.player,
          app,
          mapData.width * tileSize,
          mapData.height * tileSize,
        );
      });

      return () => {
        app.destroy();
      };
    };

    initApp();
  });

  return <div ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
};
