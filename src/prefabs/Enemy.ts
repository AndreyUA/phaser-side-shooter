import * as Phaser from "phaser";

import { AssetKeys } from "../constants/assets";
import { EnemyFrames } from "../constants/enemyFrames";
import { GameScene } from "../scenes/GameScene";

export class Enemy extends Phaser.Physics.Arcade.Sprite {
  scene: GameScene;

  constructor(scene: GameScene, x: number, y: number) {
    super(scene, x, y, AssetKeys.ENEMY_ATLAS, EnemyFrames.ENEMY_1);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    if (this.body) {
      this.body.enable = true;
    }
  }
}
