class Game {
<<<<<<< HEAD
  // private startMenu: StartMenu;
  private HowToPlay: HowToPlay;

  constructor() {
    // this.startMenu = new StartMenu();
    this.HowToPlay = new HowToPlay();
  }

  public update() {
    // this.startMenu.update();
    this.HowToPlay.update();
=======
  private GameEnd: GameEnd;

  constructor() {
    this.GameEnd = new GameEnd();
  }

  public update() {
    this.GameEnd.update();
>>>>>>> 90f7a1786b54a0140d3d32709781179c9f0d16fb
  }

  public draw() {
    background("#F0DEB5");
<<<<<<< HEAD
    // this.startMenu.draw();
    this.HowToPlay.draw();
  }

  public changeScreen(IScreen: any) {}
=======
    this.GameEnd.draw();
  }

  public changeScreen(screen: any) {}
>>>>>>> 90f7a1786b54a0140d3d32709781179c9f0d16fb
}
