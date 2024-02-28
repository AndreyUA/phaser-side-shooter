import * as Phaser from "phaser";

import { SceneKeys } from "../constants/scenes";
import { AssetKeys } from "../constants/assets";

export class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: SceneKeys.MAIN, active: false });
  }

  preload(): void {}

  create(): void {
    this.createBackground();
  }

  update(time: number, delta: number): void {}

  createBackground(): void {
    this.add.sprite(0, 0, AssetKeys.MAIN_SCENE_BACKGROUND).setOrigin(0, 0);
  }
}
