import * as Phaser from "phaser";

import { SceneKeys } from "../constants/scenes";

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: SceneKeys.GAME, active: false });
  }

  preload(): void {}

  create(): void {
    console.log("!!!");
  }

  update(time: number, delta: number): void {}
}
