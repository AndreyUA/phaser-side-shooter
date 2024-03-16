import * as Phaser from "phaser";

import { GameScene } from "../scenes/GameScene";
import { Fire } from "./Fire";
import { Dragon } from "./Dragon";

export class Fires extends Phaser.Physics.Arcade.Group {
  scene: GameScene;
  dragon: Dragon | null = null;
  timer: Phaser.Time.TimerEvent | null = null;

  constructor(scene: GameScene, dragon: Dragon) {
    super(scene.physics.world, scene);

    this.scene = scene;
    this.dragon = dragon;
    this.initFiresTimer();
  }

  createFire(): void {
    const fire = this.getFirstDead() as Fire | null;

    if (!fire) {
      this.add(Fire.generateFire(this.scene, this.dragon!));
    } else {
      fire.reset(this.dragon!);
    }

    this.moveFires();
  }

  moveFires(): void {
    const firstFire = this.getChildren()[0] as Fire;
    if (firstFire) {
      this.setVelocityX(firstFire.velocity);
    }
  }

  initFiresTimer(): void {
    this.createFire();

    this.timer = this.scene.time.addEvent({
      delay: 500,
      callback: this.createFire,
      callbackScope: this,
      loop: true,
    });
  }
}
