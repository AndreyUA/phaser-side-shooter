import "./style.css";

import * as Phaser from "phaser";

import { BootScene } from "./scenes/Boot";
import { PreloadScene } from "./scenes/Preload";
import { StartScene } from "./scenes/Start";
import { GameScene } from "./scenes/Game";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  scene: [BootScene, PreloadScene, StartScene, GameScene],
};

new Phaser.Game(config);
