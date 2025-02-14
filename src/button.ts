class Button {
  private text: string;
  private color: string;
  private posX: number;
  private posY: number;
  private width: number;
  private height: number;
  public buttonIndex: number;
  private sound: p5.SoundFile; // Explicitly allow null for safety

  constructor(
    text: string,
    color: string,
    posX: number,
    posY: number,
    width: number,
    height: number,
    buttonIndex: number,
    sound: p5.SoundFile, // Allow null in case no sound is passed
  ) {
    this.text = text;
    this.color = color;
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.buttonIndex = buttonIndex;
    this.sound = sound; // Assign the sound file
  }

  public handleActivate() {
    this.sound.play();
  }

  public draw(isActive: boolean) {
    // Draw button rectangle
    push();
    rectMode(CENTER);
    fill(this.color);
    noStroke();
    rect(this.posX, this.posY, this.width, this.height, 20);

    // Draw button text
    fill("#000");
    textFont("Fredoka", 45);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(this.text, this.posX, this.posY);
    pop();

    // Draw highlight border if active
    if (isActive) {
      push();
      rectMode(CENTER);
      stroke("#449ea1"); // Highlight border color
      noFill();
      strokeWeight(10);
      rect(this.posX, this.posY, this.width, this.height, 20);
      pop();
    }
  }
}
