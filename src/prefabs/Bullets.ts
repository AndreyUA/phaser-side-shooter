import * as Phaser from "phaser";

import { GameScene } from "../scenes/GameScene";
import { Enemy } from "./Enemy";
import { Bullet } from "./Bullet";

export class Bullets extends Phaser.Physics.Arcade.Group {
  scene: GameScene;
  enemy: Enemy | null = null;
  timer: Phaser.Time.TimerEvent | null = null;

  constructor(scene: GameScene, enemy: Enemy) {
    super(scene.physics.world, scene);

    this.scene = scene;
    this.enemy = enemy;
    this.initFiresTimer();
  }

  createFire(): void {
    const fire = this.getFirstDead() as Bullet | null;

    if (!fire) {
      this.add(Bullet.generateBullet(this.scene, this.enemy!));
    } else {
      fire.reset(this.enemy!);
    }

    this.moveFires();
  }

  moveFires(): void {
    const firstFire = this.getChildren()[0] as Bullet;
    if (firstFire) {
      this.setVelocityX(firstFire.velocity);
    }
  }

  initFiresTimer(): void {
    this.createFire();

    this.timer = this.scene.time.addEvent({
      delay: 1_000,
      callback: this.createFire,
      callbackScope: this,
      loop: true,
    });
  }
}
