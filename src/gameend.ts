class GameEnd implements IScreen {
  private buttons: Button[];
  private activeButtonIndex: number;
  private deadCat: p5.Image;
  private enterKeyHasBeenReleased: boolean;

  constructor() {
    this.enterKeyHasBeenReleased = false;
    this.buttons = [
      new Button("PLAY AGAIN", "#c2e1b5", 450, 500, 300, 100, 0, sound.retrySound),
      new Button("MAIN MENU", "#f0ab63", 950, 500, 300, 100, 1, sound.menuSound),   
    ];
    this.activeButtonIndex = 0;
    this.deadCat = loadImage("/assets/images/cats/skeletonHead.png");
  }

  public update() {
    if (keyIsDown(ENTER) && this.enterKeyHasBeenReleased) {
      this.enterKeyHasBeenReleased = false;
      // Play the sound for the active button
      const activeButton = this.buttons[this.activeButtonIndex];
      activeButton.handleActivate();
      if (this.activeButtonIndex === 0) {
        game.changeScreen(new PlayerSelect()); 
      } else if (this.activeButtonIndex === 1) {
        game.changeScreen(new StartMenu()); 
      }
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.activeButtonIndex = 1; 
    } else if (keyIsDown(LEFT_ARROW)) {
      this.activeButtonIndex = 0; 
    }
    if (!keyIsDown(ENTER)) {
      this.enterKeyHasBeenReleased = true;
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
}
