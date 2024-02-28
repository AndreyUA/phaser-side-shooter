import * as Phaser from "phaser";

import { SceneKeys } from "../constants/scenes";

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: SceneKeys.PRELOAD, active: false });
  }

  create(): void {}

  preload(): void {}

  update(time: number, delta: number): void {}
}
