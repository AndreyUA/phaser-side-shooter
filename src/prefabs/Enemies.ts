import * as Phaser from "phaser";

import { GameScene } from "../scenes/GameScene";
import { Enemy } from "./Enemy";

export class Enemies extends Phaser.Physics.Arcade.Group {
  readonly count: number = 5;
  countCreated: number = 0;
  scene: GameScene;
  timer: Phaser.Time.TimerEvent | null = null;

  constructor(scene: GameScene) {
    super(scene.physics.world, scene);

    this.scene = scene;
    this.initEnemiesTimer();
  }

  createEnemy(): void {
    if (this.countCreated >= this.count) {
      this.timer?.remove();

      return;
    }

    const enemy = this.getFirstDead() as Enemy | null;

    if (!enemy) {
      this.add(Enemy.generateEnemy(this.scene));
    } else {
      enemy.reset();
    }

    this.moveEnemies();
    this.countCreated++;
  }

  moveEnemies(): void {
    const firstEnemy = this.getChildren()[0] as Enemy;
    if (firstEnemy) {
      this.setVelocityX(firstEnemy.velocity);
    }
  }

  initEnemiesTimer(): void {
    this.timer = this.scene.time.addEvent({
      delay: 1_000,
      callback: this.createEnemy,
      callbackScope: this,
      loop: true,
    });
  }
}
