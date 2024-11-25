import React, { useEffect, useRef } from 'react';
import { Application, Container } from 'pixi.js';
import { drawMap } from '../game/Map';
import { animatePlayer, createPlayer, movePlayer } from '../game/Player';
import { updateCamera } from '../game/Camera';
import { Pallet_town_map } from '../game/Maps/Pallet_Town/Pallet_Town';
import { initTilesets } from '../game/Tileset';
import { initSprites } from '../game/Sprite';
import { setupMenu } from '../game/Menu';

let mapData = Pallet_town_map;

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
      const tilesets = await initTilesets();
      const sprites = await initSprites();

      const playerLayer = new Container();
      const playerState = createPlayer(playerLayer, sprites.Red, tileSize);

      const mapContainer = drawMap(
        app,
        playerLayer,
        mapData,
        tilesets,
        tileSize,
      );

      const menuContainer = await setupMenu(app, playerState);
      app.stage.addChild(menuContainer);

      const keys: Record<string, boolean> = {};

      window.addEventListener('keydown', (e) => (keys[e.key] = true));
      window.addEventListener('keyup', (e) => (keys[e.key] = false));

      app.ticker.add((delta) => {
        const VMap = movePlayer(
          app,
          playerLayer,
          playerState,
          keys,
          mapData,
          tileSize,
          sprites.Red,
          tilesets,
        );
        if (VMap) mapData = VMap;
        if (playerState.isMoving) {
          animatePlayer(
            playerState,
            sprites.Red,
            delta.deltaTime * (1000 / 60),
          );
        }
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
