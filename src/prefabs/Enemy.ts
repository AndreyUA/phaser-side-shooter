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
      ENEMY_VELOCITY,
      Enemy.randomEnemyFrame()
    );

    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  setAlive(isAlive: boolean): void {
    // Activate or deactivate the body
    this.body!.enable = isAlive;
    // Show or hide the texture
    this.setVisible(isAlive);
    // Activate or deactivate the object
    this.setActive(isAlive);
  }

  reset(): void {
    const { x, y } = Enemy.calculateXAndY(this.scene);

    this.x = x;
    this.y = y;

    this.setFrame(Enemy.randomEnemyFrame());
    this.setAlive(true);
  }

  update(): void {
    if (this.active && this.x < -this.width) {
      this.setAlive(false);
    }
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
