class GameEntity {
  public height: number;
  public width: number;
  public posX: number;
  public posY: number;
  public img: p5.Image[];
  public imageIndex: number;

  constructor(
    height: number,
    width: number,
    posX: number,
    posY: number,
    img: p5.Image[],
    imageIndex: number
  ) {
    this.height = height;
    this.width = width;
    this.posX = posX;
    this.posY = posY;
    this.img = img;
    this.imageIndex = imageIndex;
  }

  public draw() {
    if (this.img && this.img.length > 0) {
      image(
        this.img[this.imageIndex],
        this.posX,
        this.posY,
        this.width,
        this.height
      );
      // rita ut entitet med p5 metoder
    }
  }
  public update() {}
}
