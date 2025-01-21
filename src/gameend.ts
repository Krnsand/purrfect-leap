class GameEnd implements IScreen {
  private buttons: Button[];
  private activeButtonIndex: number;
  private deadCat: p5.Image;

  constructor() {
    this.buttons = [
      new Button("PLAY AGAIN", "#c2e1b5", 450, 500, 300, 100, 0),
      new Button("MAIN MENU", "#f0ab63", 950, 500, 300, 100, 1),
    ];
    this.activeButtonIndex = 0;
    this.deadCat = loadImage("/assets/images/cats/skeletonHead.png");
  }

  public update() {
    if (keyIsDown(RIGHT_ARROW)) {
      this.activeButtonIndex = +1;
    } else if (keyIsDown(LEFT_ARROW)) {
      this.activeButtonIndex = 0;
    } else if (keyIsDown(ENTER)) {
      this.activateButton(this.activeButtonIndex);
    }
  }

  private drawTitle() {
    push();
    fill("#8B8985");
    textFont("Fredoka", 80);
    textStyle(BOLD);
    textAlign("center", "center");

    fill("#F96B6B");
    text("GAME OVER", 700, 150);
    pop();
  }

  private drawImage() {
    image(this.deadCat, 600, 250, 200, 150);
  }

  private drawButtons() {
    this.buttons.forEach((button) => {
      button.draw(button.buttonIndex === this.activeButtonIndex);
    });
  }

  public draw() {
    this.drawTitle();
    this.drawImage();
    this.drawButtons();
  }

  private activateButton(index: number) {
    if (index === 0) {
      // Change to GameBoard
    } else if (index === 1) {
      // Change to StartMenu
    }
  }
}
