class Platform extends GameEntity {
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

  public spawnPlatform() {
    image(
      this.img[this.imageIndex],
      this.posX,
      this.posY,
      this.width,
      this.height,
    );
  }
}
