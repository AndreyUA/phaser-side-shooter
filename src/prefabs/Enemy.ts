import * as Phaser from "phaser";

import { AssetKeys } from "../constants/assets";
import { EnemyFrames } from "../constants/enemyFrames";
import { GameScene } from "../scenes/GameScene";
import { AbstractPrefab } from "./AbstractPrefab";
import { ENEMY_VELOCITY } from "../constants/enemyVelocity";
import { Bullets } from "./Bullets";

export class Enemy extends AbstractPrefab {
  bullets: Bullets | null = null;

  constructor(scene: GameScene, x: number, y: number) {
    super(
      scene,
      x,
      y,
      AssetKeys.ENEMY_ATLAS,
      ENEMY_VELOCITY,
      Enemy.randomEnemyFrame()
    );

    super.subscribeOnUpdates();
    this.generateFires();
  }

  generateFires(): void {
    this.bullets = new Bullets(this.scene, this);
  }

  reset(): void {
    const { x, y } = Enemy.calculateXAndY(this.scene);

    this.x = x;
    this.y = y;

    this.setFrame(Enemy.randomEnemyFrame());
    super.reset();
  }

  setAlive(isAlive: boolean): void {
    super.setAlive(isAlive);

    if (!this.bullets?.timer) {
      return;
    }

    this.bullets.timer.paused = !isAlive;
  }

  update(): void {
    super.update(this.isOverLeftScreenSide);
  }

  static calculateXAndY(scene: GameScene): { x: number; y: number } {
    const x = +scene.game.config.width + +scene.game.config.width * 0.1;
    const y = Phaser.Math.RND.between(
      +scene.game.config.height * 0.06,
      +scene.game.config.height * 0.94
    );

    return { x, y };
  }

  static generateEnemy(scene: GameScene): Enemy {
    const { x, y } = Enemy.calculateXAndY(scene);

    return new Enemy(scene, x, y);
  }

  static randomEnemyFrame(): EnemyFrames {
    return Phaser.Math.RND.pick(Object.values(EnemyFrames));
  }
}
