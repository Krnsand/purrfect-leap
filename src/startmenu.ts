class StartMenu implements IScreen {
  private buttons: Button[];
  private activeButtonIndex: number;
  private enterKeyHasBeenReleased: boolean;

  constructor() {
    this.enterKeyHasBeenReleased = false;
    this.buttons = [
      new Button("START", "#F96B6B", width * 0.5, 280, 350, 100, 0, sound.chooseSound),
      new Button("HOW TO PLAY", "#F0AB63", width * 0.5, 410, 350, 100, 1, sound.chooseSound),
    ];

    this.activeButtonIndex = 0;
  }

  private drawButtons() {
    this.buttons.forEach((button) => {
      button.draw(button.buttonIndex === this.activeButtonIndex);
    });
  }

  private drawTitle() {
    push();
    fill("#8B8985");
    textFont("Fredoka", 80);
    textStyle(BOLD);
    textAlign("center", "center");
    text("PURRFECT LEAP", 705, 105);

    fill("#F96B6B");
    text("PURRFECT LEAP", 700, 100);
    pop();
  }

  public update() {
    if (keyIsDown(ENTER) && this.enterKeyHasBeenReleased) {
      this.enterKeyHasBeenReleased = false;
      // Play sound for the active button
      this.buttons[this.activeButtonIndex].handleActivate();
      if (this.activeButtonIndex === 0) {
        game.changeScreen(new PlayerSelect());
      } else if (this.activeButtonIndex === 1) {
        game.changeScreen(new HowToPlay());
      }
    }

    if (keyIsDown(DOWN_ARROW)) {
      this.activeButtonIndex = +1;
    } else if (keyIsDown(UP_ARROW)) {
      this.activeButtonIndex = 0;
    }

    if (!keyIsDown(ENTER)) {
      this.enterKeyHasBeenReleased = true;
    }
  }

  public draw() {
    push();
    rectMode(CENTER);
    fill("#C2E1B5");
    noStroke();
    rect(width * 0.5, 350, 580, 340, 50);
    pop();
    this.drawTitle();
    this.drawButtons();
  }
}
