import {
  Application,
  Container,
  Graphics,
  Texture,
  Rectangle,
  Sprite,
  Text,
  TextStyle,
} from 'pixi.js';
import { playerState } from '../types/playerState';
import { loadTileset } from './Tileset';

let isMenuOpen = false;

const menuOptions: Array<string> = ['Save', 'Close'];

const frameWidth = 16;
const optionWidth = 80;
const optionHeight = 32;

let selectedIndex = 0;

const updateArrowPosition = (arrow: Text) => {
  arrow.y =
    frameWidth +
    selectedIndex * optionHeight +
    (optionHeight - arrow.height) / 2;
};

export const setupMenu = async (app: Application, playerState: playerState) => {
  const menuContainer = new Container();

  const background = new Graphics();

  const tileset = await loadTileset('/tilesets/Frame.png');
  const frameTextures = {
    'top-left': new Texture({
      source: tileset.source,
      frame: new Rectangle(0, 0, frameWidth, frameWidth),
    }),
    top: new Texture({
      source: tileset.source,
      frame: new Rectangle(frameWidth, 0, frameWidth, frameWidth),
    }),
    'top-right': new Texture({
      source: tileset.source,
      frame: new Rectangle(frameWidth * 2, 0, frameWidth, frameWidth),
    }),
    'mid-left': new Texture({
      source: tileset.source,
      frame: new Rectangle(0, frameWidth, frameWidth, frameWidth),
    }),
    mid: new Texture({
      source: tileset.source,
      frame: new Rectangle(frameWidth, frameWidth, frameWidth, frameWidth),
    }),
    'mid-right': new Texture({
      source: tileset.source,
      frame: new Rectangle(frameWidth * 2, frameWidth, frameWidth, frameWidth),
    }),
    'bottom-left': new Texture({
      source: tileset.source,
      frame: new Rectangle(0, frameWidth * 2, frameWidth, frameWidth),
    }),
    bottom: new Texture({
      source: tileset.source,
      frame: new Rectangle(frameWidth, frameWidth * 2, frameWidth, frameWidth),
    }),
    'bottom-right': new Texture({
      source: tileset.source,
      frame: new Rectangle(
        frameWidth * 2,
        frameWidth * 2,
        frameWidth,
        frameWidth,
      ),
    }),
  };

  const menuHeight = menuOptions.length * optionHeight + 2 * frameWidth;
  const menuWidth = optionWidth + frameWidth * 2;

  menuContainer.x = app.canvas.width - menuWidth;

  for (let y = frameWidth; y < menuHeight - frameWidth; y += frameWidth) {
    for (let x = frameWidth; x < menuWidth - frameWidth; x += frameWidth) {
      const midTile = new Sprite(frameTextures['mid']);
      midTile.x = x;
      midTile.y = y;
      menuContainer.addChild(midTile);
    }
  }
  for (let y = 0; y < menuHeight; y += frameWidth) {
    for (let x = 0; x < menuWidth; x += frameWidth) {
      let tile: Sprite | null = null;

      if (y === 0 && x === 0) tile = new Sprite(frameTextures['top-left']);
      else if (y === 0 && x === menuWidth - frameWidth)
        tile = new Sprite(frameTextures['top-right']);
      else if (y === menuHeight - frameWidth && x === 0)
        tile = new Sprite(frameTextures['bottom-left']);
      else if (y === menuHeight - frameWidth && x === menuWidth - frameWidth)
        tile = new Sprite(frameTextures['bottom-right']);
      else if (y === 0) tile = new Sprite(frameTextures['top']);
      else if (y === menuHeight - frameWidth)
        tile = new Sprite(frameTextures['bottom']);
      else if (x === 0) tile = new Sprite(frameTextures['mid-left']);
      else if (x === menuWidth - frameWidth)
        tile = new Sprite(frameTextures['mid-right']);

      if (tile) {
        tile.x = x;
        tile.y = y;
        menuContainer.addChild(tile);
      }
    }
  }
  menuContainer.addChild(background);

  const style = new TextStyle({
    fontFamily: 'FireRed',
    fill: '#000000',
    fontSize: 16,
  });

  menuOptions.map((option, index) => {
    const optionText = new Text({ text: option, style });
    optionText.x = frameWidth + 14;
    optionText.y =
      frameWidth +
      index * optionHeight +
      (optionHeight - optionText.height) / 2;
    menuContainer.addChild(optionText);
    return optionText;
  });
  const arrow = new Text({
    text: '➤',
    style,
  });
  arrow.x = frameWidth;
  arrow.y = frameWidth + (optionHeight - arrow.height) / 2;
  arrow.width = 10;
  menuContainer.addChild(arrow);

  menuContainer.visible = false;
  app.stage.addChild(menuContainer);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'x') {
      if (isMenuOpen) {
        closeMenu(menuContainer, playerState);
      } else {
        openMenu(menuContainer, playerState, arrow);
      }
    }
    if (isMenuOpen) {
      if (e.key === 'ArrowDown') {
        selectedIndex = (selectedIndex + 1) % menuOptions.length;
        updateArrowPosition(arrow);
      } else if (e.key === 'ArrowUp') {
        selectedIndex =
          (selectedIndex - 1 + menuOptions.length) % menuOptions.length;
        updateArrowPosition(arrow);
      } else if (e.key === 'Enter') {
        const selectedOption = menuOptions[selectedIndex];
        if (selectedOption === 'Close') {
          closeMenu(menuContainer, playerState);
        } else if (selectedOption === 'Save') {
          console.log('Game saved!');
        }
      }
    }
  });

  return menuContainer;
};

export const openMenu = (
  menuContainer: Container,
  playerState: playerState,
  arrow: Text,
) => {
  isMenuOpen = true;
  menuContainer.visible = true;
  selectedIndex = 0;
  updateArrowPosition(arrow);
  playerState.canMove = false;
};

export const closeMenu = (
  menuContainer: Container,
  playerState: playerState,
) => {
  isMenuOpen = false;
  menuContainer.visible = false;

  playerState.canMove = true;
};
