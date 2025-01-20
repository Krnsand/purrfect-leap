
class PlayerSelect implements IScreen {
  private playerSelectButton1: Button;
  private playerSelectButton2: Button;
  private playerSelectButton3: Button;
  private playerSelectButton4: Button;
  private gameStartButton: Button;

  constructor() {
    this.playerSelectButton1 = new Button('1 PLAYER', '#F96B6B', 90, 20, 250, 100);
    this.playerSelectButton2 = new Button('2 PLAYER', '#C2E1B5', 415, 20, 250, 100);
    this.playerSelectButton3 = new Button('3 PLAYER', '#F0AB63', 745, 20, 250, 100);
    this.playerSelectButton4 = new Button('4 PLAYER', '#CBA3D2', 1065, 20, 250, 100);
    this.gameStartButton = new Button('START GAME', '#F96B6B', 525, 450, 350, 150);
   
  }

  private drawImage() {
//  const img = loadImage('/assets/images/cats/Purr4.jpg');
//  image(img, 0, 0, width, height); 

  }
  private drawPlayerSelectButton() {
    
  }
  private drawStartButton() {
    
  }

  public update() {}

    public draw() {
       fill('#F0DEB5')
        noStroke();
        rect(390, 190, 580, 350, 50);
        this.playerSelectButton1.draw();
        this.playerSelectButton2.draw();
        this.playerSelectButton3.draw();
        this.playerSelectButton4.draw();
        this.gameStartButton.draw();

    }
}