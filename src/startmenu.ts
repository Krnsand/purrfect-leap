class StartMenu implements IScreen {
  private buttons: Button[];
  private activeButtonIndex: number;

  constructor() {
    this.buttons = [
      new Button("START", "#F96B6B", width * 0.5, 280, 350, 100, 0),
      new Button("HOW TO PLAY", "#F0AB63", width * 0.5, 410, 350, 100, 1),
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
    if (keyIsDown(DOWN_ARROW)) {
      this.activeButtonIndex = +1;
    } else if (keyIsDown(UP_ARROW)) {
      this.activeButtonIndex = 0;
    } else if (keyIsDown(ENTER)) {
      this.activateButton(this.activeButtonIndex);
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

  private activateButton(index: number) {
    if (index === 0) {
      // Change to PlayerSelect
    } else if (index === 1) {
      // Change to HowToPlay
    }
  }
}
