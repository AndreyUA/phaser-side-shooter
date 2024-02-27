import * as Phaser from "phaser";

export class MainScene extends Phaser.Scene {
  constructor() {
    // TODO: create enum with scene keys
    super({ key: "main", active: true });
  }

  preload(): void {}

  create(): void {}

  update(time: number, delta: number): void {}
}
