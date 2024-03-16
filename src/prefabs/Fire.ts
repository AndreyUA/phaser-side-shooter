import { AssetKeys } from "../constants/assets";
import { FIRE_VELOCITY } from "../constants/fireVelocity";
import { GameScene } from "../scenes/GameScene";
import { AbstractPrefab } from "./AbstractPrefab";
import { Dragon } from "./Dragon";
import { Enemy } from "./Enemy";

export class Fire extends AbstractPrefab {
  constructor(scene: GameScene, x: number, y: number) {
    super(scene, x, y, AssetKeys.FIRE, FIRE_VELOCITY);

    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  reset(dragon: Dragon | Enemy): void {
    this.x = dragon.x + dragon.width / 2;
    this.y = dragon.y;

    this.setAlive(true);
  }

  update(): void {
    if (
      this.active &&
      (this.isOverLeftScreenSide || this.isOverRightScreenSide)
    ) {
      this.setAlive(false);
    }
  }

  static generateFire(scene: GameScene, dragon: Dragon): Fire {
    return new Fire(scene, dragon.x + dragon.width / 2, dragon.y);
  }
}
