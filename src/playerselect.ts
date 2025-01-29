class PlayerSelect implements IScreen {
  private playerSelectButton1: Button;
  private playerSelectButton2: Button;
  private playerSelectButton3: Button;
  private playerSelectButton4: Button;
  private gameStartButton: Button;
  private returnButton: Button;
  private activeButtonIndex: number;
  private lastKeyPressed: string | null;
  private playerImage1: p5.Image;
  private playerImage2: p5.Image;
  private playerImage3: p5.Image;
  private playerImage4: p5.Image;
  private prevIsKeyPressed: boolean;
  private lastPlayerButtonIndex: number | null;
  private selectedPlayers: number;

  constructor() {
    this.playerSelectButton1 = new Button(
      "1 PLAYER",
      "#F96B6B",
      210,
      80,
      250,
      100,
      0,
      sound.catSound1 
    );
    this.playerSelectButton2 = new Button(
      "2 PLAYER",
      "#C2E1B5",
      535,
      80,
      250,
      100,
      1,
      sound.catSound2
    );
    this.playerSelectButton3 = new Button(
      "3 PLAYER",
      "#F0AB63",
      855,
      80,
      250,
      100,
      2,
      sound.catSound3
    );
    this.playerSelectButton4 = new Button(
      "4 PLAYER",
      "#CBA3D2",
      1185,
      80,
      250,
      100,
      3,
      sound.catSound4
    );
    this.gameStartButton = new Button(
      "START GAME",
      "#F96B6B",
      698,
      500,
      350,
      150,
      4,
      sound.enterSound 
    );
    this.returnButton = new Button(
      "RETURN",
      "#F0AB63",
      width * 0.5,
      625,
      200,
      70,
      5,
      sound.menuSound,
    );
 

    this.activeButtonIndex = 0;
    this.lastKeyPressed = null;
    this.prevIsKeyPressed = keyIsPressed;
    this.lastPlayerButtonIndex = null;
    this.selectedPlayers = 0;

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
    this.returnButton.draw(this.activeButtonIndex === 5);
  }

  private drawPlayerImages() {
    // 1 player
    image(this.playerImage1, 160, 160, 120, 100);
    // 2 player
    image(this.playerImage1, 460, 160, 120, 100);
    image(this.playerImage2, 530, 185, 120, 100);
    // 3 player
    image(this.playerImage1, 780, 160, 120, 100);
    image(this.playerImage2, 850, 185, 120, 100);
    image(this.playerImage3, 760, 220, 120, 100);
    // 4 player
    image(this.playerImage1, 1105, 160, 120, 100);
    image(this.playerImage2, 1175, 185, 120, 100);
    image(this.playerImage3, 1085, 220, 120, 100);
    image(this.playerImage4, 1170, 240, 130, 110);
  }

  private activateButton(index: number) {
    switch (index) {
      case 0:
        this.playerSelectButton1.handleActivate();
        this.selectedPlayers = 1;
        console.log("1 PLAYER selected");
        break;
      case 1:
        this.playerSelectButton2.handleActivate();
        this.selectedPlayers = 2;
        console.log("2 PLAYER selected");
        break;
      case 2:
        this.playerSelectButton3.handleActivate();
        this.selectedPlayers = 3;
        console.log("3 PLAYER selected");
        break;
      case 3:
        this.playerSelectButton4.handleActivate();
        this.selectedPlayers = 4;
        console.log("4 PLAYER selected");
        break;
      case 4:
        this.gameStartButton.handleActivate();
        console.log("START GAME selected");
    
        if (this.selectedPlayers > 0) {
          const playerImages: p5.Image[][] = [
            [
              loadImage("/assets/images/cats/Player11.png"),
              loadImage("/assets/images/cats/Player12.png"),
              loadImage("/assets/images/cats/Player13.png"),
              loadImage("/assets/images/cats/Player14.png"),
              loadImage("/assets/images/cats/Player11M.png"),
              loadImage("/assets/images/cats/Player12M.png"),
              loadImage("/assets/images/cats/Player13M.png"),
              loadImage("/assets/images/cats/Player14M.png"),
            ],
            [
              loadImage("/assets/images/cats/Player21.png"),
              loadImage("/assets/images/cats/Player22.png"),
              loadImage("/assets/images/cats/Player23.png"),
              loadImage("/assets/images/cats/Player24.png"),
              loadImage("/assets/images/cats/Player21M.png"),
              loadImage("/assets/images/cats/Player22M.png"),
              loadImage("/assets/images/cats/Player23M.png"),
              loadImage("/assets/images/cats/Player24M.png"),
            ],
            [
              loadImage("/assets/images/cats/Player31.png"),
              loadImage("/assets/images/cats/Player32.png"),
              loadImage("/assets/images/cats/Player33.png"),
              loadImage("/assets/images/cats/Player34.png"),
              loadImage("/assets/images/cats/Player31M.png"),
              loadImage("/assets/images/cats/Player32M.png"),
              loadImage("/assets/images/cats/Player33M.png"),
              loadImage("/assets/images/cats/Player34M.png"),
            ],
            [
              loadImage("assets/images/cats/Player41.png"),
              loadImage("assets/images/cats/Player42.png"),
              loadImage("assets/images/cats/Player43.png"),
              loadImage("assets/images/cats/Player44.png"),
              loadImage("assets/images/cats/Player41M.png"),
              loadImage("assets/images/cats/Player42M.png"),
              loadImage("assets/images/cats/Player43M.png"),
              loadImage("assets/images/cats/Player44M.png"),
            ]
          ];
  
          const controls = [
            { left: 37, right: 39, action: 38 }, // LeftArrow, RightArrow, UpArrow
            { left: 81, right: 69, action: 87 }, // Q, E, W
            { left: 73, right: 80, action: 79 }, // I, P, O
            { left: 90, right: 67, action: 88 }, // Z, C, X
          ];
  
          const players: Player[] = [];
          for (let i = 0; i < this.selectedPlayers; i++) {
            players.push(
              new Player(
                75,
                100,
                (width - this.selectedPlayers * 250) / 2 + i * 250,
                300,
                playerImages[i],
                playerImages[i],
                0,
                controls[i],
              ),
            );
          }
          const gameBoard = new GameBoard(players);
          game.changeScreen(gameBoard);
        } 
        break;
    case 5: 
      this.returnButton.handleActivate();
      console.log("RETURN to Start Menu");
      game.changeScreen(new StartMenu());
      break;
    default:
      console.error("Invalid button index");
  }

  }

  public update() {
    const pressedThisFrame = keyIsPressed && !this.prevIsKeyPressed;
  
    if (pressedThisFrame) {
      
      if (keyCode === LEFT_ARROW && this.lastKeyPressed !== "LEFT") {
        if (this.activeButtonIndex !== 4 && this.activeButtonIndex !== 5) {        
          this.activeButtonIndex = (this.activeButtonIndex - 1 + 4) % 4; 
        }
        this.lastKeyPressed = "LEFT";
      } else if (keyCode === RIGHT_ARROW && this.lastKeyPressed !== "RIGHT") {
        if (this.activeButtonIndex !== 4 && this.activeButtonIndex !== 5) {   
          this.activeButtonIndex = (this.activeButtonIndex + 1) % 4; 
        }
        this.lastKeyPressed = "RIGHT";
      }
      // Handle up/down navigation between gameStartButton and returnButton
      else if (keyCode === DOWN_ARROW && this.lastKeyPressed !== "DOWN") {
        if (this.activeButtonIndex === 4) {
          // Move from "START GAME" to "RETURN"
          this.activeButtonIndex = 5;
        }
        this.lastKeyPressed = "DOWN";
      } else if (keyCode === UP_ARROW && this.lastKeyPressed !== "UP") {
        if (this.activeButtonIndex === 5) {
          // Move from "RETURN" back to "START GAME"
          this.activeButtonIndex = 4;
        }
        this.lastKeyPressed = "UP";
      }
      else if (keyCode === ENTER) {
        this.activateButton(this.activeButtonIndex);

        if (this.activeButtonIndex >= 0 && this.activeButtonIndex <= 3) {
          // Update selected players and move focus to START GAME button
          this.selectedPlayers = this.activeButtonIndex + 1;
          this.lastPlayerButtonIndex = this.activeButtonIndex;
          this.activeButtonIndex = 4; // Focus on START GAME after selection
        }
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
