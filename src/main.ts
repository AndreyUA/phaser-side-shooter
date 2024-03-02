import "./style.css";

import * as Phaser from "phaser";

import { BootScene } from "./scenes/BootScene";
import { PreloadScene } from "./scenes/PreloadScene";
import { MainScene } from "./scenes/MainScene";
import { GameScene } from "./scenes/GameScene";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  scene: [BootScene, PreloadScene, MainScene, GameScene],
};

new Phaser.Game(config);
