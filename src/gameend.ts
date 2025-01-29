class GameEnd implements IScreen {
  private buttons: Button[];
  private activeButtonIndex: number;
  private deadCat: p5.Image;
  private enterKeyHasBeenReleased: boolean;
  private winnerCats: p5.Image[];
  private winnerPlayerIndex: number | null;

  constructor(winnerPlayerIndex: number | null) {
    this.winnerPlayerIndex = winnerPlayerIndex;
    this.enterKeyHasBeenReleased = false;
    this.buttons = [
      new Button("PLAY AGAIN", "#c2e1b5", 450, 500, 300, 100, 0, sound.retrySound),
      new Button("MAIN MENU", "#f0ab63", 950, 500, 300, 100, 1, sound.menuSound),   
    ];
    this.activeButtonIndex = 0;
    this.deadCat = loadImage("/assets/images/cats/skeletonHead.png");
    this.winnerCats = [
      loadImage("/assets/images/cats/Player1Winner.png"),
      loadImage("/assets/images/cats/Player2Winner.png"),
      loadImage("/assets/images/cats/Player3Winner.png"),
      loadImage("/assets/images/cats/Player4Winner.png"),
    ];
  }

  public update() {
    if (keyIsDown(ENTER) && this.enterKeyHasBeenReleased) {
      this.enterKeyHasBeenReleased = false;
      // Play the sound for the active button
      const activeButton = this.buttons[this.activeButtonIndex];
      activeButton.handleActivate();
      if (this.activeButtonIndex === 0) {
        game.changeScreen(new PlayerSelect()); 
      } else if (this.activeButtonIndex === 1) {
        game.changeScreen(new StartMenu()); 
      }
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.activeButtonIndex = 1; 
    } else if (keyIsDown(LEFT_ARROW)) {
      this.activeButtonIndex = 0; 
    }
    if (!keyIsDown(ENTER)) {
      this.enterKeyHasBeenReleased = true;
    }
  }

  private drawTitle() {
    push();
    fill("#8B8985");
    textFont("Fredoka", 80);
    textStyle(BOLD);
    textAlign("center", "center");

    fill("#F96B6B");
    if (this.winnerPlayerIndex === 0) {
      text("Player 1 Wins!", 700, 150);
      pop();
    } else if (this.winnerPlayerIndex === 1) {
      text("Player 2 Wins!", 700, 150);
      pop();
    } else if (this.winnerPlayerIndex === 2) {
      text("Player 3 Wins!", 700, 150);
      pop();
    } else if (this.winnerPlayerIndex === 3) {
      text("Player 4 Wins!", 700, 150);
      pop();
    } else {
      text("GAME OVER", 700, 150);
      pop();
    }
  }

  private drawImage() {
    if (this.winnerPlayerIndex !== null) {
      image(this.winnerCats[this.winnerPlayerIndex], 600, 200, 200, 250);
    } else {
      image(this.deadCat, 600, 200, 200, 250);
    }
  }

  private drawButtons() {
    this.buttons.forEach((button) => {
      button.draw(button.buttonIndex === this.activeButtonIndex);
    });
  }

  public draw() {
    this.drawTitle();
    this.drawImage();
    this.drawButtons();
  }
}
