import { AssetKeys } from "../constants/assets";
import { DragonFrames } from "../constants/dragonFrames";
import { GameScene } from "../scenes/GameScene";
import { AbstractPrefab } from "./AbstractPrefab";
import { Fires } from "./Fires";

const DRAGON_VELOCITY = 500;

export class Dragon extends AbstractPrefab {
  fires: Fires | null = null;

  constructor(scene: GameScene, x: number, y: number) {
    super(
      scene,
      x,
      y,
      AssetKeys.DRAGON_ATLAS,
      DRAGON_VELOCITY,
      DragonFrames.DRAGON_1
    );

    this.generateFires();
  }

  onMove(): void {
    super.onMove();

    this.setVelocity(0);

    this.scene?.cursors?.space?.once(
      "down",
      this.fires!.createFire.bind(this.fires)
    );

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

  generateFires(): void {
    this.fires = new Fires(this.scene, this);
  }
}
