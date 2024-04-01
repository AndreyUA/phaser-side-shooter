import { AssetKeys } from "../constants/assets";
import { DRAGON_KILLED } from "../constants/customEvents";
import { DragonFrames } from "../constants/dragonFrames";
import { DRAGON_VELOCITY } from "../constants/dragonVelocity";
import { GameScene } from "../scenes/GameScene";
import { AbstractPrefab } from "./AbstractPrefab";
import { Fires } from "./Fires";

const DRAGON_WIDTH = 153;
const DRAGON_HEIGHT = 119;

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
    this.generateAtlasAnimation();
  }

  onMove(): void {
    super.onMove();

    this.setVelocity(0);

    if (this.scene?.cursors?.left?.isDown && this.x > DRAGON_WIDTH / 2) {
      this.setVelocityX(-this.velocity);
    }

    if (
      this.scene?.cursors?.right?.isDown &&
      this.x < +this.scene.game.config.width - DRAGON_WIDTH / 2
    ) {
      this.setVelocityX(this.velocity);
    }

    if (this.scene?.cursors?.up?.isDown && this.y > DRAGON_HEIGHT / 2) {
      this.setVelocityY(-this.velocity);
    }

    if (
      this.scene?.cursors?.down?.isDown &&
      this.y < +this.scene.game.config.height - DRAGON_HEIGHT / 2
    ) {
      this.setVelocityY(this.velocity);
    }
  }

  generateAtlasAnimation(): void {
    const frames = this.scene.anims.generateFrameNames(AssetKeys.DRAGON_ATLAS, {
      prefix: "dragon",
      start: 1,
      end: 6,
    });

    this.scene.anims.create({
      key: DragonFrames.DRAGON_ANIMATION,
      frames,
      frameRate: 10,
      repeat: -1,
    });

    // this.scene.anims.play(DragonFrames.DRAGON_ANIMATION, this);
    this.play(DragonFrames.DRAGON_ANIMATION);
  }

  generateFires(): void {
    this.fires = new Fires(this.scene, this);
  }

  setAlive(isAlive: boolean): void {
    super.setAlive(isAlive);

    if (!this.fires?.timer) {
      return;
    }

    this.fires.timer.paused = !isAlive;

    if (!isAlive) {
      this.emit(DRAGON_KILLED);
    }
  }
}
