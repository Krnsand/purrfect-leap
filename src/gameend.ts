class GameEnd implements IScreen {
  private playAgainButton: Button;
  private startMenuButton: Button;

  constructor() {
    this.playAgainButton = new Button(
      "PLAY AGAIN",
      "#c2e1b5",
      300,
      500,
      300,
      100
    );
    this.startMenuButton = new Button(
      "MAIN MENU",
      "#f0ab63",
      800,
      500,
      300,
      100
    );
  }

  public update() {}

  private drawTitle() {
    push();
    fill("#8B8985");
    textFont("Fredoka", 80);
    textStyle(BOLD);
    textAlign("center", "center");
    // text("GAME OVER", 705, 115);

    fill("#F96B6B");
    text("GAME OVER", 700, 150);
    pop();
  }

  private drawImage() {}

  private drawButtons() {
    this.playAgainButton.draw();
    this.startMenuButton.draw();
  }

  public draw() {
    this.drawTitle();
    this.drawImage();
    this.drawButtons();
  }
}
