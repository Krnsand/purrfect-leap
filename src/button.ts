class Button {
  private text: string;
  private color: string;
  private posX: number;
  private posY: number;
  private width: number;
  private height: number;
  public buttonIndex: number;
  private sound: p5.SoundFile | null; // Explicitly allow null for safety

  constructor(
    text: string,
    color: string,
    posX: number,
    posY: number,
    width: number,
    height: number,
    buttonIndex: number,
    sound: p5.SoundFile | null, // Allow null in case no sound is passed
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

  private playSound(): void {
    console.log(`Attempting to play sound for button: ${this.text}`);
    if (this.sound) {
      if (this.sound.isLoaded()) {
        this.sound.play();
      } else {
        console.error(`Sound file not loaded for button: ${this.text}`);
      }
    } else {
      console.error(`No sound assigned for button: ${this.text}`);
    }
  }

  public handleActivate() {
    if (this.sound) {
      if (this.sound.isPlaying()) {
        this.sound.stop(); // Stoppa musiken om den spelar
        console.log(`Music stopped: ${this.text}`);
      } else {
        this.sound.play(); // Spela musiken om den inte redan spelas
        console.log(`Music started: ${this.text}`);
      }
    } else {
      console.error(`No sound assigned for button: ${this.text}`);
    }
  }

  public draw(isActive: boolean) {
    // Draw button rectangle
    push();
    rectMode(CENTER);
    rectMode(CENTER);
    fill(this.color);
    noStroke();
    rect(this.posX, this.posY, this.width, this.height, 20);

    // Draw button text
    fill("#000");
    textFont("Fredoka", 45);
    textStyle(BOLD);
    textAlign("center", "center");
    text(this.text, this.posX, this.posY);
    textAlign("center", "center");
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
