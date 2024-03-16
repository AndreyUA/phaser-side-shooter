import * as Phaser from "phaser";

import { AssetKeys } from "../constants/assets";
import { EnemyFrames } from "../constants/enemyFrames";
import { GameScene } from "../scenes/GameScene";
import { DragonFrames } from "../constants/dragonFrames";
import { Dragon } from "./Dragon";
import { Enemy } from "./Enemy";

export abstract class AbstractPrefab extends Phaser.Physics.Arcade.Sprite {
  scene: GameScene;
  velocity: number = 0;

  constructor(
    scene: GameScene,
    x: number,
    y: number,
    atlasKey: AssetKeys,
    velocity?: number,
    frameKey?: EnemyFrames | DragonFrames
  ) {
    super(scene, x, y, atlasKey, frameKey);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    if (this.body) {
      this.body.enable = true;
    }
    this.velocity = velocity ?? 0;
  }

  onMove(): void {}

  reset(_dragon?: Dragon | Enemy): void {
    this.setAlive(true);
  }

  setAlive(isAlive: boolean): void {
    // Activate or deactivate the body
    this.body!.enable = isAlive;
    // Show or hide the texture
    this.setVisible(isAlive);
    // Activate or deactivate the object
    this.setActive(isAlive);
  }

  subscribeOnUpdates(): void {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  update(isTimeForUpdate: boolean): void {
    if (this.active && isTimeForUpdate) {
      this.setAlive(false);
    }
  }

  get isOverLeftScreenSide(): boolean {
    return this.x < -this.width;
  }

  get isOverRightScreenSide(): boolean {
    return this.x > this.scene.scale.width;
  }
}
