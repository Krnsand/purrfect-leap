class HowToPlay implements IScreen {
  private returnButton: Button;
  private controlImage: p5.Image;
  private enterKeyHasBeenReleased: boolean;
  private activeButtonIndex: number;

  constructor() {
    this.enterKeyHasBeenReleased = false;
    this.returnButton = new Button(
      "RETURN",
      "#F0AB63",
      width * 0.5,
      625,
      200,
      70,
      0,
      sound.menuSound,
    );
    this.controlImage = loadImage("/assets/images/control-image/keyboard.png");
    this.activeButtonIndex = 0;
  }

  private drawTitle() {
    push();
    fill("#000");
    textFont("Fredoka", 50);
    textStyle(BOLD);
    textAlign("center", "center");
    text("HOW TO PLAY", width / 2, 100);
    pop();
  }

  private drawText() {
    const marginX = 200; // Marginal från vänster och höger
    const marginY = 150; // Marginal från toppen
    const textWidth = width - marginX * 2;

    push();
    fill("#000");
    textFont("Fredoka", 20);
    textAlign(LEFT, TOP);
    text(
      "Purrfect leap is a fast-paced single- or multiplayer platform game where up to 4 players take on the roles of adorable cat characters. As the game board scrolls continuously upwards, the players must climb through the blocks by steering the characters to jump left or right with the keyboard. The mission is to avoid falling off the bottom of the screen. Watch out for broken platforms as they will fall apart when jumping on them. You can jump off the game's right or left side and appear on the opposite side to tackle challenging platform jumps. The player who manages to stay in the game the longest without falling becomes the ultimate cat climber.",
      marginX,
      marginY,
      textWidth,
    );
    pop();
  }

  private drawButtons() {
    this.returnButton.draw(this.activeButtonIndex === 0);
  }

  public update() {
    if (keyIsDown(ENTER)) {
      if (this.enterKeyHasBeenReleased) {
        if (this.activeButtonIndex === 0) {
          this.returnButton.handleActivate(); 
          game.changeScreen(new StartMenu()); 
        }
        this.enterKeyHasBeenReleased = false;
      }
    } else {
      this.enterKeyHasBeenReleased = true;
    }
  }

  private drawInstructionImage() {
    image(this.controlImage, 320, 275, 800, 325);
  }
  public draw() {
    this.drawTitle();
    this.drawText();
    this.drawButtons();
    this.drawInstructionImage();
  }
}
