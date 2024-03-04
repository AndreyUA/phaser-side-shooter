import * as Phaser from "phaser";

import { SceneKeys } from "../constants/scenes";
import { AssetKeys } from "../constants/assets";

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: SceneKeys.BOOT, active: true });
  }

  init(): void {
    console.log("Boot scene was initialized!");
  }

  preload(): void {
    this.load.image(AssetKeys.MAIN_SCENE_BACKGROUND, "./background.png");
  }

  create(): void {
    console.log("Boot scene was created!");

    this.scene.start(SceneKeys.PRELOAD);
  }

  update(_time: number, _delta: number): void {}
}
