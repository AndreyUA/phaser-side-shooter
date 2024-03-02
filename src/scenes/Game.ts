import * as Phaser from "phaser";

import { SceneKeys } from "../constants/scenes";
import { AssetKeys } from "../constants/assets";

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: SceneKeys.GAME, active: false });
  }

  preload(): void {}

  create(): void {
    console.log("Game scene was created!");

    this.createBackground();
  }

  update(time: number, delta: number): void {}

  createBackground(): void {
    this.add.sprite(0, 0, AssetKeys.MAIN_SCENE_BACKGROUND).setOrigin(0, 0);
  }
}
