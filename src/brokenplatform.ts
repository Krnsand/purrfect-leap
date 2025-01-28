/// <reference path="gameentity.ts" />

class BrokenPlatform extends GameEntity {
  constructor(
    height: number,
    width: number,
    posX: number,
    posY: number,
    img: p5.Image[],
    imageIndex: number,
  ) {
    super(height, width, posX, posY, img, imageIndex);
  }

  public spawnBrokenPlatform() {
    image(
      this.img[this.imageIndex],
      this.posX,
      this.posY,
      this.width,
      this.height,
    );
  }

  public breakApart() {}
}
