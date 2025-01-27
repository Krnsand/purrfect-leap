class Game {
  private activeScreen: IScreen;

  constructor() {
    this.activeScreen = new StartMenu();
  }

  public update() {
    this.activeScreen.update();
  }

  public draw() {
    background("#F0DEB5");
    this.activeScreen.draw();
  }

  public changeScreen(newScreen: IScreen) {
    this.activeScreen = newScreen;
  }
}
