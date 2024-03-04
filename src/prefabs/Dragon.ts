import * as Phaser from "phaser";

import { AssetKeys } from "../constants/assets";
import { DragonFrames } from "../constants/dragonFrames";
import { GameScene } from "../scenes/GameScene";

export class Dragon extends Phaser.Physics.Arcade.Sprite {
  scene: GameScene;
  private readonly velocity: number = 500;

  constructor(scene: GameScene, x: number, y: number) {
    super(scene, x, y, AssetKeys.DRAGON_ATLAS, DragonFrames.DRAGON_1);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    if (this.body) {
      this.body.enable = true;
    }
  }

  onMove(): void {
    this.setVelocity(0);

    if (this.scene?.cursors?.left?.isDown) {
      this.setVelocityX(-this.velocity);
    }

    if (this.scene?.cursors?.right?.isDown) {
      this.setVelocityX(this.velocity);
    }

    if (this.scene?.cursors?.up?.isDown) {
      this.setVelocityY(-this.velocity);
    }

    if (this.scene?.cursors?.down?.isDown) {
      this.setVelocityY(this.velocity);
    }
  }
}
