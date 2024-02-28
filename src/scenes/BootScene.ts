import * as Phaser from "phaser";

import { SceneKeys } from "../constants/scenes";

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: SceneKeys.BOOT, active: false });
  }

  create(): void {}

  preload(): void {}

  update(time: number, delta: number): void {}
}
