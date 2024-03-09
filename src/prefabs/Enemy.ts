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
      EnemyFrames.ENEMY_1,
      ENEMY_VELOCITY
    );
  }

  onMove(): void {
    super.onMove();

    this.setVelocityX(this.velocity);
  }
}
