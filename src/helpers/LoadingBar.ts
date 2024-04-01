import * as Phaser from "phaser";

import { PreloadScene } from "../scenes/PreloadScene";

export class LoadingBar {
  scene: PreloadScene;
  progressBox: Phaser.GameObjects.Graphics;
  progressBar: Phaser.GameObjects.Graphics;
  readonly style: Record<string, number> = {};

  constructor(scene: PreloadScene) {
    this.scene = scene;
    this.progressBox = this.scene.add.graphics().setDepth(6);
    this.progressBar = this.scene.add.graphics().setDepth(6);
    this.style = {
      boxColor: 0xd3d3d3,
      barColor: 0xfff8dc,
      x: this.scene.cameras.main.width / 2 - 450,
      y: this.scene.cameras.main.height / 2 + 250,
      width: 900,
      height: 25,
    };

    this.showProgressBox();
    this.setEvents();
  }

  setEvents(): void {
    this.scene.load.on("progress", this.showProgressBar, this);
  }

  showProgressBar(value: number): void {
    this.progressBar
      .clear()
      .fillStyle(this.style.barColor)
      .fillRect(
        this.style.x,
        this.style.y,
        this.style.width * value,
        this.style.height
      );
  }

  showProgressBox(): void {
    this.progressBox
      .fillStyle(this.style.boxColor)
      .fillRect(
        this.style.x,
        this.style.y,
        this.style.width,
        this.style.height
      );
  }
}
