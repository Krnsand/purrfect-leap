class Platform extends GameEntity {
    constructor(
        height: number,
        width: number,
        posX: number,
        posY: number,
        img: p5.Image[],
        imageIndex: number
    ) {
        super(height, width, posX, posY, img, imageIndex);
    }
}