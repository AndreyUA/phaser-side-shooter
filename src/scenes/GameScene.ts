import * as Phaser from "phaser";

import { SceneKeys } from "../constants/scenes";
import { AssetKeys } from "../constants/assets";
import { Dragon } from "../prefabs/Dragon";
import { Enemies } from "../prefabs/Enemies";
import { Fire } from "../prefabs/Fire";
import { Enemy } from "../prefabs/Enemy";
import { KILLED_EVENT } from "../constants/customEvents";

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
    this.createCompleteEvents();
    this.addOverlap();
  }

  update(_time: number, _delta: number): void {
    this.dragon?.onMove();

    if (this.backgroundTileSprite) {
      this.backgroundTileSprite.tilePositionX += 0.6;
    }
  }

  addOverlap(): void {
    if (!this.dragon?.fires || !this.enemyGroup) {
      return;
    }

    this.physics.add.overlap(
      this.dragon.fires,
      this.enemyGroup,
      this.onOverlap,
      undefined,
      this
    );

    this.physics.add.overlap(
      this.dragon,
      this.enemyGroup,
      this.onOverlap,
      undefined,
      this
    );
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

  createCompleteEvents(): void {
    this.dragon?.once(KILLED_EVENT, this.onComplete, this);
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

  onComplete(): void {
    console.log("GAME OVER.");
    this.scene.start(SceneKeys.START);
  }

  onOverlap(
    source:
      | Phaser.Tilemaps.Tile
      | Phaser.Types.Physics.Arcade.GameObjectWithBody,
    target:
      | Phaser.Tilemaps.Tile
      | Phaser.Types.Physics.Arcade.GameObjectWithBody
  ): void {
    if (
      (source instanceof Fire || source instanceof Dragon) &&
      target instanceof Enemy &&
      source.active &&
      target.active
    ) {
      source.setAlive(false);
      target.setAlive(false);
    }
  }
}
