import { AssetKeys } from "../constants/assets";
import { DragonFrames } from "../constants/dragonFrames";
import { GameScene } from "../scenes/GameScene";
import { AbstractPrefab } from "./AbstractPrefab";
import { Fire } from "./Fire";

const DRAGON_VELOCITY = 500;

export class Dragon extends AbstractPrefab {
  constructor(scene: GameScene, x: number, y: number) {
    super(
      scene,
      x,
      y,
      AssetKeys.DRAGON_ATLAS,
      DRAGON_VELOCITY,
      DragonFrames.DRAGON_1
    );

    const fire = Fire.generateFire(this.scene, this);
  }

  onMove(): void {
    super.onMove();

    this.setVelocity(0);

    if (this.scene?.cursors?.left?.isDown) {
      this.setVelocityX(-this.velocity);
    }

    if (this.scene?.cursors?.right?.isDown) {
      this.setVelocityX(this.velocity);
    }

    if (this.scene?.cursors?.up?.isDown) {
      this.setVelocityY(-this.velocity);
    }

    if (this.scene?.cursors?.down?.isDown) {
      this.setVelocityY(this.velocity);
    }
  }
}
