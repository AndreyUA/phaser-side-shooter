import * as Phaser from "phaser";

import { SceneKeys } from "../constants/scenes";
import { AssetKeys } from "../constants/assets";
import { Dragon } from "../prefabs/Dragon";

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: SceneKeys.GAME, active: false });
  }

  preload(): void {}

  create(): void {
    console.log("Game scene was created!");

    this.createBackground();
    this.createDragon();
  }

  update(_time: number, _delta: number): void {}

  createBackground(): void {
    this.add.sprite(0, 0, AssetKeys.MAIN_SCENE_BACKGROUND).setOrigin(0, 0);
  }

  createDragon(): void {
    const dragon = new Dragon(
      this,
      +this.game.config.width * 0.1,
      +this.game.config.height / 2
    );
  }
}
