import * as Phaser from "phaser";

import { AssetKeys } from "../constants/assets";
import { GameScene } from "../scenes/GameScene";
import { AbstractPrefab } from "./AbstractPrefab";
import { Dragon } from "./Dragon";

const FIRE_VELOCITY = 300;

export class Fire extends AbstractPrefab {
  constructor(scene: GameScene, x: number, y: number) {
    super(scene, x, y, AssetKeys.FIRE, FIRE_VELOCITY);
  }

  static generateFire(scene: GameScene, dragon: Dragon): Fire {
    const fire = new Fire(scene, dragon.x + dragon.width / 2, dragon.y);
    fire.setVelocityX(fire.velocity);

    return fire;
  }
}
