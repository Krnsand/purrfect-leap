class Player extends GameEntity {
  private name: string;
  private velocity: number;
  private gravity: number;
  private bounceVelocity: number;
  private soundFX: string;

  constructor(
    height: number,
    width: number,
    posX: number,
    posY: number,
    img: p5.Image[],
    imageIndex: number,
  ) {
    super(height, width, posX, posY, img, imageIndex);

    this.name = "Player1";
    this.velocity = 0;
    this.gravity = 0.5;
    this.soundFX = "";
    this.bounceVelocity = -15;
  }

  private automaticBounce() {
    this.velocity += this.gravity;

    this.posY += this.velocity;

    if (this.posY + this.height > height) {
      this.posY = height - this.height;
      this.velocity = this.bounceVelocity;
    }
    this.bounceAnimation();
  }
  private leftAndRight() {
    if (keyIsDown(LEFT_ARROW) === true) {
      this.posX -= 6;
    }

    if (keyIsDown(RIGHT_ARROW) === true) {
      this.posX += 6;
    }
  }

  private bounceAnimation() {
    if (keyIsDown(RIGHT_ARROW) === true) {
      if (this.velocity < -10) {
        this.imageIndex = 0;
      } else if (this.velocity < -3) {
        this.imageIndex = 1;
      } else if (this.velocity < 10) {
        this.imageIndex = 2;
      } else {
        this.imageIndex = 3;
      }
    } else if (keyIsDown(LEFT_ARROW) === true) {
      if (this.velocity < -10) {
        this.imageIndex = 4;
      } else if (this.velocity < -3) {
        this.imageIndex = 5;
      } else if (this.velocity < 10) {
        this.imageIndex = 6;
      } else {
        this.imageIndex = 7;
      }
    }
  }

  public update() {
    this.automaticBounce();
    this.leftAndRight();
  }

  public die() {}
  public renderPlayer() {}
}
