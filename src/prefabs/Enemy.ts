import * as Phaser from "phaser";

import { AssetKeys } from "../constants/assets";
import { EnemyFrames } from "../constants/enemyFrames";
import { GameScene } from "../scenes/GameScene";
import { AbstractPrefab } from "./AbstractPrefab";

const ENEMY_VELOCITY = -250;

export class Enemy extends AbstractPrefab {
  constructor(scene: GameScene, x: number, y: number) {
    super(
      scene,
      x,
      y,
      AssetKeys.ENEMY_ATLAS,
      Enemy.randomEnemyFrame(),
      ENEMY_VELOCITY
    );
  }

  onMove(): void {
    super.onMove();

    this.setVelocityX(this.velocity);
  }

  static generateEnemy(scene: GameScene): Enemy {
    const x = +scene.game.config.width + +scene.game.config.width * 0.1;
    const y = Phaser.Math.RND.between(
      +scene.game.config.height * 0.06,
      +scene.game.config.height * 0.94
    );

    return new Enemy(scene, x, y);
  }

  static randomEnemyFrame(): EnemyFrames {
    return Phaser.Math.RND.pick(Object.values(EnemyFrames));
  }
}
