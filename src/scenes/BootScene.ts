import * as Phaser from "phaser";

import { SceneKeys } from "../constants/scenes";
import { AssetKeys } from "../constants/assets";

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: SceneKeys.BOOT, active: true });
  }

  preload(): void {
    this.load.image(AssetKeys.MAIN_SCENE_BACKGROUND, "./background.png");
  }

  create(): void {
    this.scene.start(SceneKeys.PRELOAD);
  }

  update(time: number, delta: number): void {}
}
