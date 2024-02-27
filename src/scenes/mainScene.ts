import * as Phaser from "phaser";

import { SceneKeys } from "../constants/scenes";

export class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: SceneKeys.MAIN, active: true });
  }

  preload(): void {}

  create(): void {}

  update(time: number, delta: number): void {}
}
