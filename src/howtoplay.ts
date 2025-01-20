class HowToPlay implements IScreen {
  private returnButton: Button;

  constructor() {
    this.returnButton = new Button("RETURN", "#F0AB63", 350, 100, 500, 300);
  }

  private drawTitle() {
    fill("#0000");
    textFont("Fredoka", 50);
    textStyle(BOLD);
    textAlign("center", "center");
    text("HOW TO PLAY", 705, 115);
  }

  private drawText() {
    fill("#0000");
    textFont("Fredoka", 30);
    textAlign("center", "center");
    text(
      "Ett fartfyllt multiplayer plattformsspel där upp till 4 spelare tar rollen som söta kattkaraktärer. Spelplanen skrollar ständigt uppåt och spelarna måste ta sig upp mellan slumpmässigt genererade block för att undvika att falla utanför skärmens nederkant. Man kan hoppa ut från spelets höger- och vänstersida och komma fram på den andra sidan för att komma åt svåra plattformshopp. Den spelare som kan hålla sig kvar längst utan att falla blir den ultimata kattklättraren. Använd power-ups för att ge dig själv en fördel eller för att sabotera dina motståndare i denna hektiska, konkurrenskraftiga klättring mot toppen.",
      705,
      115
    );
  }

  private drawButtons() {
    this.returnButton.draw();
  }
  public update() {}

  private drawInstructionImage() {}
  public draw() {
    this.drawTitle();
    this.drawText();
    this.drawButtons();
    this.drawInstructionImage();
  }
}
