class PlayerSelect implements IScreen {
  private playerSelectButton1: Button;
  private playerSelectButton2: Button;
  private playerSelectButton3: Button;
  private playerSelectButton4: Button;
  private gameStartButton: Button;
  private activeButtonIndex: number;
  private lastKeyPressed: string | null;
  private playerImage1: p5.Image;
  private playerImage2: p5.Image;
  private playerImage3: p5.Image;
  private playerImage4: p5.Image;
  private prevIsKeyPressed: boolean;
  private lastPlayerButtonIndex: number | null;
  // private isStartGameHighlighted: boolean;

  constructor() {
    this.playerSelectButton1 = new Button(
      "1 PLAYER",
      "#F96B6B",
      210,
      80,
      250,
      100,
      0,
      sound.chooseSound, // Use preloaded sound,
    );
    this.playerSelectButton2 = new Button(
      "2 PLAYER",
      "#C2E1B5",
      535,
      80,
      250,
      100,
      1,
      sound.chooseSound, // Use preloaded sound,
    );
    this.playerSelectButton3 = new Button(
      "3 PLAYER",
      "#F0AB63",
      855,
      80,
      250,
      100,
      2,
      sound.chooseSound, // Use preloaded sound,
    );
    this.playerSelectButton4 = new Button(
      "4 PLAYER",
      "#CBA3D2",
      1185,
      80,
      250,
      100,
      3,
      sound.chooseSound, // Use preloaded sound,
    );
    this.gameStartButton = new Button(
      "START GAME",
      "#F96B6B",
      698,
      500,
      350,
      150,
      4,
      sound.enterSound, // Use enter sound
    );

    this.activeButtonIndex = 0;
    this.lastKeyPressed = null;
    this.prevIsKeyPressed = keyIsPressed;
    this.lastPlayerButtonIndex = null;
    // this.isStartGameHighlighted = false;

    this.playerImage1 = loadImage("/assets/images/cats/Player1Head.png");
    this.playerImage2 = loadImage("/assets/images/cats/Player2Head.png");
    this.playerImage3 = loadImage("/assets/images/cats/Player3Head.png");
    this.playerImage4 = loadImage("/assets/images/cats/Player4Head.png");
  }

  private drawButtons() {
    this.playerSelectButton1.draw(
      this.activeButtonIndex === 0 || this.lastPlayerButtonIndex === 0,
    );
    this.playerSelectButton2.draw(
      this.activeButtonIndex === 1 || this.lastPlayerButtonIndex === 1,
    );
    this.playerSelectButton3.draw(
      this.activeButtonIndex === 2 || this.lastPlayerButtonIndex === 2,
    );
    this.playerSelectButton4.draw(
      this.activeButtonIndex === 3 || this.lastPlayerButtonIndex === 3,
    );
    this.gameStartButton.draw(this.activeButtonIndex === 4);
  }

  private drawPlayerImages() {
    image(this.playerImage1, 160, 160, 120, 100);

    image(this.playerImage1, 460, 160, 120, 100);
    image(this.playerImage2, 530, 185, 120, 100);

    image(this.playerImage1, 780, 160, 120, 100);
    image(this.playerImage2, 850, 185, 120, 100);
    image(this.playerImage3, 760, 220, 120, 100);

    image(this.playerImage1, 1105, 160, 120, 100);
    image(this.playerImage2, 1175, 185, 120, 100);
    image(this.playerImage3, 1085, 220, 120, 100);
    image(this.playerImage4, 1170, 240, 130, 110);
  }

  private activateButton(index: number) {
    switch (index) {
      case 0:
        this.playerSelectButton1.handleActivate();
        console.log("1 PLAYER selected");
        break;
      case 1:
        this.playerSelectButton2.handleActivate();
        console.log("2 PLAYER selected");
        break;
      case 2:
        this.playerSelectButton3.handleActivate();
        console.log("3 PLAYER selected");
        break;
      case 3:
        this.playerSelectButton4.handleActivate();
        console.log("4 PLAYER selected");
        break;
      case 4:
        this.gameStartButton.handleActivate();
        console.log("START GAME selected");
  
        // Trigger the start game logic here (if any)
        game.changeScreen("GameBoard"); // Ensure this logic is implemented
        break;
      default:
        console.error("Invalid button index");
    }
  }
  

  public update() {
    const pressedThisFrame = keyIsPressed && !this.prevIsKeyPressed;
  
    if (pressedThisFrame) {
      if (keyCode === LEFT_ARROW && this.lastKeyPressed !== "LEFT") {
        this.activeButtonIndex = (this.activeButtonIndex - 1 + 5) % 5;
        this.lastKeyPressed = "LEFT";
      } else if (keyCode === RIGHT_ARROW && this.lastKeyPressed !== "RIGHT") {
        this.activeButtonIndex = (this.activeButtonIndex + 1) % 5;
        this.lastKeyPressed = "RIGHT";
      } else if (keyCode === ENTER) {
        this.activateButton(this.activeButtonIndex);
      }
    }
  
    if (!keyIsPressed && this.prevIsKeyPressed) {
      this.lastKeyPressed = null;
    }
  
    this.prevIsKeyPressed = keyIsPressed;
  }
  

  public draw() {
    fill("#F0DEB5");
    noStroke();
    rect(390, 190, 580, 350, 50);
    this.drawButtons();
    this.drawPlayerImages();
  }
}
