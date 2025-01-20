class Game {
  // private startMenu: StartMenu;
  private howToPlay: HowToPlay;

  constructor() {
    // this.startMenu = new StartMenu();
    this.howToPlay = new HowToPlay();
  }

  public update() {
    // this.startMenu.update();
    this.howToPlay.update();
  }

  public draw() {
    background("#F0DEB5");
    // this.startMenu.draw();
    this.howToPlay.draw();
  }

  public changeScreen(IScreen: any) {}
}
