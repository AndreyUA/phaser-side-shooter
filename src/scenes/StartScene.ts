import * as Phaser from "phaser";

import { SceneKeys } from "../constants/scenes";
import { AssetKeys } from "../constants/assets";
import { defaultTextStyle } from "../constants/defaultTextStyle";

export class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: SceneKeys.START, active: false });
  }

  init(): void {
    console.log("Start scene was initialized!");
  }

  preload(): void {}

  create(data: unknown): void {
    console.log("Start scene was created!");

    this.createBackground();
    this.createTapText();
    this.createStats(data);
    this.createTapListener();
  }

  update(_time: number, _delta: number): void {}

  createBackground(): void {
    this.add.sprite(0, 0, AssetKeys.MAIN_SCENE_BACKGROUND).setOrigin(0, 0);
  }

  createStats(data: unknown): void {
    if (!data || typeof data !== "object" || Object.keys(data).length === 0) {
      return;
    }

    let score: number | null = null;
    let completed: boolean | null = null;

    if ("score" in data && typeof data.score === "number") {
      score = data.score;
    }

    if ("completed" in data && typeof data.completed === "boolean") {
      completed = data.completed;
    }

    const graphics: Phaser.GameObjects.Graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 0.5);
    graphics.fillRoundedRect(
      this.scene.scene.scale.width / 2 - 200,
      this.scene.scene.scale.height / 2 - 200,
      400,
      400
    );

    const statsTitle = completed ? "You won!" : "You lost!";
    const statsSubtitle: string = `Score: ${score}`;

    this.add
      .text(this.scene.scene.scale.width / 2, 250, statsTitle, defaultTextStyle)
      .setOrigin(0.5, 0.5);
    this.add
      .text(
        this.scene.scene.scale.width / 2,
        this.scene.scene.scale.height / 2,
        statsSubtitle,
        defaultTextStyle
      )
      .setOrigin(0.5, 0.5);
  }

  createTapListener(): void {
    this.input.once("pointerdown", () => {
      this.scene.start(SceneKeys.GAME);
    });
  }

  createTapText(): void {
    this.add
      .text(
        +this.game.config.width / 2,
        +this.game.config.height - +this.game.config.height / 3,
        "Tap to start",
        defaultTextStyle
      )
      .setOrigin(0.5, 0.5)
      .setDepth(3);
  }
}
