class Button {
  private text: string;
  private color: string;
  private posX: number;
  private posY: number;
  private width: number;
  private height: number;
  public buttonIndex: number;

  constructor(
    text: string,
    color: string,
    posX: number,
    posY: number,
    width: number,
    height: number,
    buttonIndex: number,
  ) {
    this.text = text;
    this.color = color;
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.buttonIndex = buttonIndex;
    this.buttonIndex = buttonIndex;
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

    //If active button
    if (isActive) {
      push();
      rectMode(CENTER);
      stroke("#449ea1");
      noFill();
      strokeWeight(10);
      rect(this.posX, this.posY, this.width, this.height, 20);
      pop();
    }
  }
}
