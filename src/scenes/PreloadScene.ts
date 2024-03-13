import * as Phaser from "phaser";

import { SceneKeys } from "../constants/scenes";
import { AssetKeys } from "../constants/assets";

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: SceneKeys.PRELOAD, active: false });
  }

  init(): void {
    console.log("Preload scene was initialized!");
  }

  preload(): void {
    this.load.atlas(AssetKeys.DRAGON_ATLAS, "./dragon.png", "./dragon.json");
    this.load.atlas(AssetKeys.ENEMY_ATLAS, "./enemy.png", "./enemy.json");
    this.load.image(AssetKeys.FIRE, "./fire.png");
  }

  create(): void {
    console.log("Preload scene was created!");

    this.scene.start(SceneKeys.START);
  }

  update(_time: number, _delta: number): void {}
}
