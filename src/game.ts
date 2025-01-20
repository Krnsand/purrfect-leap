class Game {
  // private startMenu: StartMenu;
  private HowToPlay: HowToPlay;

  constructor() {
    // this.startMenu = new StartMenu();
    this.HowToPlay = new HowToPlay();
  }

  public update() {
    // this.startMenu.update();
    this.HowToPlay.update();
  }

  public draw() {
    background("#F0DEB5");
    // this.startMenu.draw();
    this.HowToPlay.draw();
  }

  public changeScreen(IScreen: any) {}
}
