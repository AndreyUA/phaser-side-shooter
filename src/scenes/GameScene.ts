import * as Phaser from "phaser";

import { SceneKeys } from "../constants/scenes";
import { AssetKeys } from "../constants/assets";
import { Dragon } from "../prefabs/Dragon";

export class GameScene extends Phaser.Scene {
  dragon: Dragon | null = null;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys | null = null;

  constructor() {
    super({ key: SceneKeys.GAME, active: false });
  }

  init(): void {
    console.log("Game scene was initialized!");

    this.createCursorKeys();
  }

  preload(): void {}

  create(): void {
    console.log("Game scene was created!");

    this.createBackground();
    this.createDragon();
  }

  update(_time: number, _delta: number): void {
    this.dragon?.onMove();
  }

  createBackground(): void {
    this.add.sprite(0, 0, AssetKeys.MAIN_SCENE_BACKGROUND).setOrigin(0, 0);
  }

  createCursorKeys(): void {
    if (!this.input.keyboard) {
      return;
    }

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  createDragon(): void {
    this.dragon = new Dragon(
      this,
      +this.game.config.width * 0.1,
      +this.game.config.height / 2
    );
  }
}
