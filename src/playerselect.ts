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

  constructor() {
    this.playerSelectButton1 = new Button(
      "1 PLAYER",
      "#F96B6B",
      210,
      80,
      250,
      100,
      0,
    );
    this.playerSelectButton2 = new Button(
      "2 PLAYER",
      "#C2E1B5",
      535,
      80,
      250,
      100,
      1,
    );
    this.playerSelectButton3 = new Button(
      "3 PLAYER",
      "#F0AB63",
      855,
      80,
      250,
      100,
      2,
    );
    this.playerSelectButton4 = new Button(
      "4 PLAYER",
      "#CBA3D2",
      1185,
      80,
      250,
      100,
      3,
    );
    this.gameStartButton = new Button(
      "START GAME",
      "#F96B6B",
      698,
      500,
      350,
      150,
      4,
    );

    this.activeButtonIndex = 0; // Highlight the "1 PLAYER" button by default
    this.lastKeyPressed = null;
    this.prevIsKeyPressed = keyIsPressed;

    this.playerImage1 = loadImage("/assets/images/cats/Player1Head.png");
    this.playerImage2 = loadImage("/assets/images/cats/Player2Head.png");
    this.playerImage3 = loadImage("/assets/images/cats/Player3Head.png");
    this.playerImage4 = loadImage("/assets/images/cats/Player4Head.png");
  }

  // Draw all buttons, highlighting the active one
  private drawButtons() {
    this.playerSelectButton1.draw(this.activeButtonIndex === 0);
    this.playerSelectButton2.draw(this.activeButtonIndex === 1);
    this.playerSelectButton3.draw(this.activeButtonIndex === 2);
    this.playerSelectButton4.draw(this.activeButtonIndex === 3);
    this.gameStartButton.draw(this.activeButtonIndex === 4);
  }

  // Draw all player images under their respective buttons
  private drawPlayerImages() {
    image(this.playerImage1, 160, 160, 120, 100); // 1 PLAYER

    image(this.playerImage1, 460, 160, 120, 100); // 2 PLAYER
    image(this.playerImage2, 530, 185, 120, 100); // 2 PLAYER

    image(this.playerImage1, 780, 160, 120, 100); // 3 PLAYER
    image(this.playerImage2, 850, 185, 120, 100); // 3 PLAYER
    image(this.playerImage3, 760, 220, 120, 100); // 3 PLAYER

    image(this.playerImage1, 1105, 160, 120, 100); // 4 PLAYER
    image(this.playerImage2, 1175, 185, 120, 100); // 4 PLAYER
    image(this.playerImage3, 1085, 220, 120, 100); // 4 PLAYER
    image(this.playerImage4, 1170, 240, 130, 110); // 4 PLAYER
  }

  // Handle button activation (Enter key)
  private activateButton(index: number) {
    if (index === 0) {
      console.log("1 PLAYER selected");
    } else if (index === 1) {
      console.log("2 PLAYER selected");
    } else if (index === 2) {
      console.log("3 PLAYER selected");
    } else if (index === 3) {
      console.log("4 PLAYER selected");
    } else if (index === 4) {
      console.log("START GAME selected");
      game.changeScreen("GameBoard");
    }
  }

  public update() {
    const pressedThisFrame = keyIsPressed && !this.prevIsKeyPressed;

    if (pressedThisFrame) {
      if (keyCode === LEFT_ARROW && this.lastKeyPressed !== "LEFT") {
        this.activeButtonIndex = (this.activeButtonIndex - 1 + 4) % 4; // Loop between 0-3
        this.lastKeyPressed = "LEFT";
      } else if (keyCode === RIGHT_ARROW && this.lastKeyPressed !== "RIGHT") {
        this.activeButtonIndex = (this.activeButtonIndex + 1) % 4; // Loop between 0-3
        this.lastKeyPressed = "RIGHT";
      } else if (keyCode === ENTER) {
        if (this.activeButtonIndex !== 4) {
          // Navigate to "START GAME" button if ENTER is pressed
          this.activeButtonIndex = 4;
        } else {
          // Activate the "START GAME" button if already selected
          this.activateButton(this.activeButtonIndex);
        }
      }
    }

    if (!keyIsPressed && this.prevIsKeyPressed) {
      this.lastKeyPressed = null;
    }

    // Update previous key press state
    this.prevIsKeyPressed = keyIsPressed;
  }
  public setup() {}
  // Draw everything
  public draw() {
    fill("#F0DEB5");
    noStroke();
    rect(390, 190, 580, 350, 50);
    this.drawButtons();
    this.drawPlayerImages();
  }
}
