import * as Phaser from "phaser";

import { SceneKeys } from "../constants/scenes";
import { AssetKeys } from "../constants/assets";
import { Dragon } from "../prefabs/Dragon";
import { Enemies } from "../prefabs/Enemies";

export class GameScene extends Phaser.Scene {
  dragon: Dragon | null = null;
  enemyGroup: Enemies | null = null;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys | null = null;
  backgroundTileSprite: Phaser.GameObjects.TileSprite | null = null;

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
    this.createEnemiesGroup();
  }

  update(_time: number, _delta: number): void {
    this.dragon?.onMove();

    if (this.backgroundTileSprite) {
      this.backgroundTileSprite.tilePositionX += 0.6;
    }
  }

  createBackground(): void {
    this.backgroundTileSprite = this.add
      .tileSprite(
        0,
        0,
        +this.game.config.width,
        +this.game.config.height,
        AssetKeys.MAIN_SCENE_BACKGROUND
      )
      .setOrigin(0, 0);
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

  createEnemiesGroup(): void {
    this.enemyGroup = new Enemies(this);
  }
}
