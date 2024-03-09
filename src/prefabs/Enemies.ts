import * as Phaser from "phaser";

import { GameScene } from "../scenes/GameScene";
import { Enemy } from "./Enemy";

export class Enemies extends Phaser.Physics.Arcade.Group {
  scene: GameScene;

  constructor(scene: GameScene) {
    super(scene.physics.world, scene);

    this.scene = scene;
    this.initEnemies();
  }

  initEnemies(): void {
    this.add(Enemy.generateEnemy(this.scene));
    this.add(Enemy.generateEnemy(this.scene));
    this.add(Enemy.generateEnemy(this.scene));
  }
}
