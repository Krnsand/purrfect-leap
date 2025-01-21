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

  public changeScreen(
    screenName:
      | "StartMenu"
      | "PlayerSelect"
      | "HowToPlay"
      | "GameBoard"
      | "GameEnd",
  ) {
    switch (screenName) {
      case "StartMenu":
        this.activeScreen = new StartMenu();
        break;
      case "PlayerSelect":
        this.activeScreen = new PlayerSelect();
        break;
      case "HowToPlay":
        this.activeScreen = new HowToPlay();
        break;
      case "GameBoard":
        this.activeScreen = new GameBoard();
        break;
      case "GameEnd":
        this.activeScreen = new GameEnd();
        break;
    }
  }
}
