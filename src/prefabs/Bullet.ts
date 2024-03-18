import { AssetKeys } from "../constants/assets";
import { BULLET_VELOCITY } from "../constants/bulletVelocity";
import { GameScene } from "../scenes/GameScene";
import { AbstractPrefab } from "./AbstractPrefab";
import { Enemy } from "./Enemy";

export class Bullet extends AbstractPrefab {
  constructor(scene: GameScene, x: number, y: number) {
    super(scene, x, y, AssetKeys.BULLET, BULLET_VELOCITY);

    super.subscribeOnUpdates();
  }

  reset(enemy: Enemy): void {
    this.x = enemy.x - enemy.width / 2;
    this.y = enemy.y;

    super.reset();
  }

  update(): void {
    super.update(this.isOverLeftScreenSide || this.isOverRightScreenSide);
  }

  static generateBullet(scene: GameScene, enemy: Enemy): Bullet {
    return new Bullet(scene, enemy.x + enemy.width / 2, enemy.y);
  }
}
