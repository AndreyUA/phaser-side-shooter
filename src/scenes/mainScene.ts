import * as Phaser from "phaser";

import { SceneKeys } from "../constants/scenes";
import { AssetKeys } from "../constants/assets";

export class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: SceneKeys.MAIN, active: false });
  }

  create(): void {
    this.createBackground();
  }

  createBackground(): void {
    this.add.sprite(0, 0, AssetKeys.MAIN_SCENE_BACKGROUND).setOrigin(0, 0);
  }

  preload(): void {
    this.load.image(AssetKeys.MAIN_SCENE_BACKGROUND, "./background.png");
  }

  update(time: number, delta: number): void {}
}
