import { AssetKeys } from "../constants/assets";
import { FIRE_VELOCITY } from "../constants/fireVelocity";
import { GameScene } from "../scenes/GameScene";
import { AbstractPrefab } from "./AbstractPrefab";
import { Dragon } from "./Dragon";

export class Fire extends AbstractPrefab {
  constructor(scene: GameScene, x: number, y: number) {
    super(scene, x, y, AssetKeys.FIRE, FIRE_VELOCITY);

    super.subscribeOnUpdates();
  }

  reset(dragon: Dragon): void {
    this.x = dragon.x + dragon.width / 2;
    this.y = dragon.y;

    super.reset();
  }

  update(): void {
    super.update(this.isOverLeftScreenSide || this.isOverRightScreenSide);
  }

  static generateFire(scene: GameScene, dragon: Dragon): Fire {
    return new Fire(scene, dragon.x + dragon.width / 2, dragon.y);
  }
}
