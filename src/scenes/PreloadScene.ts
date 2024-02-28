import * as Phaser from "phaser";

import { SceneKeys } from "../constants/scenes";

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: SceneKeys.PRELOAD, active: false });
  }

  preload(): void {}

  create(): void {
    this.scene.start(SceneKeys.MAIN);
  }

  update(time: number, delta: number): void {}
}
