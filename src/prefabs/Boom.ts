import { AssetKeys } from "../constants/assets";
import { BoomFrames } from "../constants/boomFrames";
import { GameScene } from "../scenes/GameScene";
import { AbstractPrefab } from "./AbstractPrefab";

export class Boom extends AbstractPrefab {
  constructor(scene: GameScene, x: number, y: number) {
    super(scene, x, y, AssetKeys.BOOM, 0, BoomFrames.BOOM_1);

    this.generateAtlasAnimation();

    this.once("animationcomplete", () => {
      this.destroy();
    });
  }

  generateAtlasAnimation(): void {
    const frames = this.scene.anims.generateFrameNames(AssetKeys.BOOM, {
      prefix: "boom",
      start: 1,
      end: 4,
    });

    this.scene.anims.create({
      key: BoomFrames.BOOM_ANIMATION,
      frames,
      frameRate: 10,
      repeat: 1,
    });

    this.play(BoomFrames.BOOM_ANIMATION);
  }
}
