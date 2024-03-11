import * as Phaser from "phaser";

import { GameScene } from "../scenes/GameScene";
import { Enemy } from "./Enemy";

export class Enemies extends Phaser.Physics.Arcade.Group {
  readonly count: number = 10;
  scene: GameScene;
  timer: Phaser.Time.TimerEvent | null = null;

  constructor(scene: GameScene) {
    super(scene.physics.world, scene);

    this.scene = scene;
    this.initEnemiesTimer();
  }

  createEnemy(): void {
    if (this.getLength() >= this.count) {
      this.timer?.remove();

      return;
    }

    this.add(Enemy.generateEnemy(this.scene));
  }

  initEnemiesTimer(): void {
    this.timer = this.scene.time.addEvent({
      delay: 1000,
      callback: this.createEnemy,
      callbackScope: this,
      loop: true,
    });
  }
}
