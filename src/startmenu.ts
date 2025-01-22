class StartMenu implements Screen {
  private startButton: Button;

  constructor() {
    this.startButton = new Button("START", "#F96B6B", 100, 50, 750, 280);
  }

  private drawButtons() {
    this.startButton.draw();
  }

  private drawTitle() {
    fill("#000");
    stroke("#FFF");
    textFont("Arial", 30); //test, should be Fredroka One
    textAlign("center");
    text("PURRFECT LEAP", 750, 150);
  }

  public update() {}

  public draw() {
    this.drawTitle();
    this.drawButtons();
  }
}
