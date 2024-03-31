import * as Phaser from "phaser";

import { SceneKeys } from "../constants/scenes";
import { AssetKeys } from "../constants/assets";

export class StartScene extends Phaser.Scene {
  private score: number | null = null;
  private completed: boolean | null = null;

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
    this.createTapListener();

    if (
      data &&
      typeof data === "object" &&
      "score" in data &&
      typeof data.score === "number"
    ) {
      this.score = data.score;
    }

    if (
      data &&
      typeof data === "object" &&
      "completed" in data &&
      typeof data.completed === "boolean"
    ) {
      this.completed = data.completed;
    }

    console.log("🚀 ~ StartScene ~ init ~ this.score:", this.score);
    console.log("🚀 ~ StartScene ~ init ~ this.completed:", this.completed);
  }

  update(_time: number, _delta: number): void {}

  createBackground(): void {
    this.add.sprite(0, 0, AssetKeys.MAIN_SCENE_BACKGROUND).setOrigin(0, 0);
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
        {
          fontSize: "40px",
          // TODO: Add custom font
          // fontFamily: "CurseCasual",
          color: "#fff",
        }
      )
      .setOrigin(0.5, 0.5)
      .setDepth(3);
  }
}
