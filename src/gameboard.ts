class GameBoard implements IScreen {
  private backgroundImage!: p5.Image;
  private playerImages: p5.Image[];
  private players: Player[];
  private platforms: Platform[];
  private platformSpawnTimer: number;
  private platformSpawnInterval: number;
  private translateY: number;
  private backgroundMusic?: string;
  private time: Time;
  private startPlatform: Platform | null;
  private startPlatformSpawnTime: number;
  private startPlatformSpawned: boolean;

  constructor() {
    this.playerImages = [];
    this.players = [];
    this.platforms = [];
    this.platformSpawnTimer = millis();
    this.platformSpawnInterval = 700;
    this.translateY = 0;
    this.time = new Time();
    this.startPlatform = null;
    this.startPlatformSpawnTime = 0;
    this.startPlatformSpawned = false;
    this.loadImages();
    this.spawnPlayer();
  }

  private loadImages() {
    this.backgroundImage = loadImage(
      "/assets/images/background/purrfectLeapBackground.jpg",
    );
    this.playerImages[0] = loadImage("/assets/images/cats/Player11.png");
    this.playerImages[1] = loadImage("/assets/images/cats/Player12.png");
    this.playerImages[2] = loadImage("/assets/images/cats/Player13.png");
    this.playerImages[3] = loadImage("/assets/images/cats/Player14.png");
    this.playerImages[4] = loadImage("/assets/images/cats/Player11M.png");
    this.playerImages[5] = loadImage("/assets/images/cats/Player12M.png");
    this.playerImages[6] = loadImage("/assets/images/cats/Player13M.png");
    this.playerImages[7] = loadImage("/assets/images/cats/Player14M.png");
    this.playerImages[8] = loadImage("/assets/images/platforms/Platform.png");
    this.playerImages[9] = loadImage(
      "/assets/images/platforms/starting-platform.png",
    );
  }

  private detectHit() {
    for (const player of this.players) {
      if (this.startPlatform) {
        const startPlatformTop = 600 - this.translateY;

        if (player.velocity > 0 && player.posY > startPlatformTop) {
          player.automaticBounce(startPlatformTop + this.translateY);
        }
      }

      for (const player of this.players) {
        for (const platform of this.platforms) {
          const playerLeft = player.posX;
          const playerRight = player.posX + player.width;
          const platformLeft = platform.posX;
          const platformRight = platform.posX + platform.width;

          const playerTop = player.posY;
          const playerBottom = player.posY + player.height;
          const platformTop = platform.posY + this.translateY;
          const platformBottom =
            platform.posY + platform.height + this.translateY;

          if (
            player.velocity > 0 &&
            playerLeft < platformRight &&
            playerRight > platformLeft &&
            playerTop < platformBottom &&
            playerBottom > platformTop
          ) {
            player.automaticBounce(platformTop);

            // if (gameObject instanceof Platform) {
            // Avgör om man föll ner på plattformen först
            // 1. flytta spelaren till ovanpå platformen
            // 2. trigga stuts
            // 3. spela ljud
            //4.
            // }
          }
        }
      }
    }
  }

  private drawBackground() {
    image(this.backgroundImage, 0, 0, 1400, 700);
  }

  private spawnPlatform() {
    if (millis() - this.platformSpawnTimer > this.platformSpawnInterval) {
      const newPlatform = new Platform(
        30,
        100,
        random(100, 1300),
        50 - this.translateY,
        this.playerImages,
        8,
      );
      this.platforms.push(newPlatform);

      // Reset timer
      this.platformSpawnTimer = millis();
    }
  }

  private spawnStartPlatform() {
    this.startPlatform = new Platform(100, 900, 250, 600, this.playerImages, 9);
    this.startPlatformSpawnTime = millis();
  }

  private spawnPlayer() {
    this.players.push(new Player(75, 100, 200, 300, this.playerImages, 0));
  }

  public update() {
    // Updates the countdown and when countdown is over runs the else condition (starts timer)
    if (!this.time.countdownEnd) {
      this.time.updateCountdown();
    } else {
      this.time.updateTimer();
      this.spawnPlatform();
    }

    if (!this.startPlatformSpawned) {
      this.spawnStartPlatform();
      this.startPlatformSpawned = true;
    }

    if (this.startPlatform && millis() - this.startPlatformSpawnTime > 7000) {
      this.startPlatform = null;
    }

    this.players.forEach((player) => player.update());

    this.translateY += 2;

    this.detectHit();

    this.removeOffScreenPlatforms();
  }

  private removeOffScreenPlatforms() {
    // Filter platforms, keeping only those within the visible screen in game
    this.platforms = this.platforms.filter(
      (platform) => platform.posY < 700 + this.translateY,
    );
  }

  private drawTimerBorder() {
    // Example: Line across the top of the screen under the timer
    // stroke(255);
    // strokeWeight(5);
    // line(0, 60, 1400, 50);

    // Example: Border around the timer area
    noFill();
    rectMode(CORNER);
    stroke(255);
    strokeWeight(5);
    rect(2, 1, 1396, 55);
  }

  public draw() {
    push();
    this.drawBackground();
    this.players.forEach((player) => player.draw());
    this.time.drawCountdown();
    this.time.drawTimer();
    if (this.startPlatform) {
      this.startPlatform.spawnPlatform();
    }

    this.drawTimerBorder();

    translate(0, this.translateY);
    this.platforms.forEach((platform) => platform.draw());
    pop();
  }
}
