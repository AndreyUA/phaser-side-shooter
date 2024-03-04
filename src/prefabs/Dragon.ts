import * as Phaser from "phaser";

import { AssetKeys } from "../constants/assets";
import { DragonFrames } from "../constants/dragonFrames";

export class Dragon extends Phaser.GameObjects.Sprite {
  scene: Phaser.Scene;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, AssetKeys.DRAGON_ATLAS, DragonFrames.DRAGON_1);
    this.scene = scene;
    this.scene.add.existing(this);

    this.setOrigin(0, 0);
  }
}
