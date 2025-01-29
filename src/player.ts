class Player extends GameEntity {
  private name: string;
  public velocity: number;
  private gravity: number;
  private bounceVelocity: number;
  private soundFX: string;
  private keyReleased: boolean;
  private lastDirection: string;
  public playerImages: p5.Image[];
  public controls: { left: number; right: number; action: number };
  public isAlive: boolean;
  public onDeath: (() => void) | null = null;

  constructor(
    height: number,
    width: number,
    posX: number,
    posY: number,
    img: p5.Image[],
    playerImages: p5.Image[],
    imageIndex: number,
    controls: { left: number; right: number; action: number },
  ) {
    super(height, width, posX, posY, img, imageIndex);
    this.isAlive = true;

    this.name = "Player1";
    this.velocity = 0;
    this.gravity = 0.5;
    this.soundFX = "";
    this.bounceVelocity = -15;
    this.keyReleased = false;
    this.lastDirection = "right";
    this.playerImages = playerImages;
    this.controls = controls;
    this.isAlive = true;
  }

  private bounceAnimation() {
    this.keyReleased = false;
    if (keyIsDown(this.controls.right) === true) {
      this.keyReleased = true;
      this.lastDirection = "right";
      if (this.velocity < -10) {
        this.imageIndex = 0;
      } else if (this.velocity < -3) {
        this.imageIndex = 1;
      } else if (this.velocity < 10) {
        this.imageIndex = 2;
      } else {
        this.imageIndex = 3;
      }
    } else if (keyIsDown(this.controls.left) === true) {
      this.keyReleased = true;
      this.lastDirection = "left";
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

    if (!this.keyReleased) {
      if (this.lastDirection === "right") {
        if (this.velocity < -10) {
          this.imageIndex = 0;
        } else if (this.velocity < -3) {
          this.imageIndex = 1;
        } else if (this.velocity < 10) {
          this.imageIndex = 2;
        } else {
          this.imageIndex = 3;
        }
      } else if (this.lastDirection === "left") {
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
      // }
      //   // If player is not moving continue animation based on last direction (left or right)
      //   if (!this.keyReleased) {
      //     if (this.lastDirection === "right") {
      //       this.imageIndex = Math.floor((frameCount / 10) % 4);
      //     } else if (this.lastDirection === "left") {
      //       this.imageIndex = 4 + Math.floor((frameCount / 10) % 4); // +4 to use imageIndex 4-7
      //     }
      //   }
    }
  }

  public automaticBounce(platformTop: number) {
    const originalPlatformTop = platformTop;
    if (this.posY + this.height > originalPlatformTop) {
      this.posY = originalPlatformTop - this.height;
      this.velocity = this.bounceVelocity;
    }
    this.bounceAnimation();
  }

  private leftAndRight() {
    if (keyIsDown(this.controls.left) === true) {
      this.posX -= 6;
    }

    if (keyIsDown(this.controls.right) === true) {
      this.posX += 6;
    }
  }

  private wallJumper() {
    if (this.posX > 1350) {
      this.posX = 0;
    } else if (this.posX < -50) {
      this.posX = 1340;
    }
  }

  public update() {
    this.velocity += this.gravity;
    this.posY += this.velocity;
    this.bounceAnimation();
    this.leftAndRight();
    this.wallJumper();
  }

  public die() {
    // game.changeScreen(new GameEnd());
    this.isAlive = false;
    if (this.onDeath) {
      this.onDeath();
    }
  }
}
