import * as Phaser from "phaser";

import { SceneKeys } from "../constants/scenes";
import { AssetKeys } from "../constants/assets";
import { Dragon } from "../prefabs/Dragon";
import { Enemies } from "../prefabs/Enemies";
import { Fire } from "../prefabs/Fire";
import { Enemy } from "../prefabs/Enemy";
import { DRAGON_KILLED, ENEMIES_KILLED } from "../constants/customEvents";
import { defaultTextStyle } from "../constants/defaultTextStyle";
import { Boom } from "../prefabs/Boom";

export class GameScene extends Phaser.Scene {
  dragon: Dragon | null = null;
  enemyGroup: Enemies | null = null;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys | null = null;
  backgroundTileSprite: Phaser.GameObjects.TileSprite | null = null;
  score: number = 0;
  scoreText: Phaser.GameObjects.Text | null = null;

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
    this.createTapText();
    this.createSoundThemes();
  }

  update(_time: number, _delta: number): void {
    this.dragon?.onMove();

    if (this.backgroundTileSprite) {
      this.backgroundTileSprite.tilePositionX += 0.6;
    }

    if (
      this.enemyGroup?.countCreated === this.enemyGroup?.count &&
      this.enemyGroup?.getTotalUsed() === 0
    ) {
      this.enemyGroup.emit(ENEMIES_KILLED);
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
    this.dragon?.once(DRAGON_KILLED, this.onComplete, this);
    this.enemyGroup?.once(ENEMIES_KILLED, this.onComplete, this);
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

  createSoundThemes(): void {
    this.sound.play(AssetKeys.THEME_SOUND, {
      loop: true,
      volume: 0.2,
    });
  }

  onComplete(): void {
    console.log("GAME OVER.");

    this.sound.stopByKey(AssetKeys.THEME_SOUND);
    this.scene.start(SceneKeys.START, {
      score: this.score,
      completed: this.dragon?.active,
    });
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

    if (source instanceof Fire && target instanceof Enemy) {
      this.score++;
      this.scoreText?.setText(this.createScoreText());
    }

    if (target instanceof Enemy) {
      new Boom(this, target.x, target.y);
      this.sound.play(AssetKeys.BOOM_SOUND, {
        loop: false,
        volume: 0.1,
      });
    }
  }

  createTapText(): void {
    this.scoreText = this.add
      .text(50, 50, this.createScoreText(), defaultTextStyle)
      .setDepth(3);
  }

  private createScoreText(): string {
    return `Score: ${this.score}`;
  }
}
