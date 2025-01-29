class Platform extends GameEntity {
  public isBreakable: boolean;
  public durability: number;

  constructor(
    height: number,
    width: number,
    posX: number,
    posY: number,
    img: p5.Image[],
    imageIndex: number,
    isBreakable: boolean = true,
    durability: number = 1,
  ) {
    super(height, width, posX, posY, img, imageIndex);
    this.isBreakable = isBreakable;
    this.durability = durability;
  }

  public drawPlatform() {
    if (this.durability > 0) {
      super.draw();
    }
  }

  public breakApart() {
    if (this.isBreakable) {
      this.durability--;
      if (this.durability <= 0) {
      }
    }
  }
}
