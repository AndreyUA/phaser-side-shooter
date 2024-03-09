import * as Phaser from "phaser";

import { AssetKeys } from "../constants/assets";
import { EnemyFrames } from "../constants/enemyFrames";
import { GameScene } from "../scenes/GameScene";
import { DragonFrames } from "../constants/dragonFrames";

export abstract class AbstractPrefab extends Phaser.Physics.Arcade.Sprite {
  scene: GameScene;
  protected velocity: number = 0;

  constructor(
    scene: GameScene,
    x: number,
    y: number,
    atlasKey: AssetKeys,
    frameKey: EnemyFrames | DragonFrames,
    velocity: number
  ) {
    super(scene, x, y, atlasKey, frameKey);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    if (this.body) {
      this.body.enable = true;
    }
    this.velocity = velocity;
  }

  onMove(): void {}
}
