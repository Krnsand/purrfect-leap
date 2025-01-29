class GameBoard implements IScreen {
  private backgroundImage!: p5.Image;
  private platformImages: p5.Image[];
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
  private speedUpCounter: number;
  private gameStartTime: number;

  constructor(players: Player[]) {
    this.players = players;
    this.platforms = [];
    this.platformSpawnTimer = millis();
    this.platformSpawnInterval = 500;
    this.translateY = 0;
    this.time = new Time();
    this.startPlatform = null;
    this.startPlatformSpawnTime = 0;
    this.startPlatformSpawned = false;
    this.platformImages = [];
    this.loadImages();
    this.speedUpCounter = 2;
    this.gameStartTime = millis();
  }

  private loadImages() {
    this.backgroundImage = loadImage(
      "/assets/images/background/purrfectLeapBackground.jpg",
    );
    this.platformImages = [];
    (this.platformImages[0] = loadImage(
      "/assets/images/platforms/startPlatform.png",
    )),
      (this.platformImages[1] = loadImage(
        "/assets/images/platforms/startPlatformFlashing.gif",
      )),
      (this.platformImages[2] = loadImage(
        "/assets/images/platforms/Platform.png",
      )),
      (this.platformImages[3] = loadImage(
        "/assets/images/platforms/PlatformBroken.png",
      ));
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
            player.velocity > 2 &&
            playerLeft < platformRight &&
            playerRight > platformLeft &&
            playerBottom >= platformTop &&
            playerBottom < platformBottom &&
            playerTop < platformTop
          ) {
            player.automaticBounce(platformTop);

            if (platform.isBreakable) {
              platform.breakApart();

              // If durability is 0, remove the platform from the platform array
              if (platform.durability <= 0) {
                const index = this.platforms.indexOf(platform);
                if (index > -1) {
                  this.platforms.splice(index, 1); // Remove the broken platform from the array
                }
              }

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
  }

  private speedUpGame() {
    const gameTime = millis() - this.gameStartTime;
    if (gameTime >= 40 * 1000) {
      this.speedUpCounter = 5;
    } else if (gameTime >= 30 * 1000) {
      this.speedUpCounter = 3.5;
    } else if (gameTime >= 20 * 1000) {
      this.speedUpCounter = 2.5;
    }
  }

  private drawBackground() {
    image(this.backgroundImage, 0, 0, 1400, 700);
  }

  private spawnPlatform() {
    if (millis() - this.platformSpawnTimer > this.platformSpawnInterval) {
      // create a new array that excludes start-platform image
      const platformOnlyImages = this.platformImages.slice(2);

      const isBreakable = random() < 0.2;
      // if isBreakable = true then use imageIndex 2 or else 1
      const imageIndex = isBreakable ? 1 : 0;

      const newPlatform = new Platform(
        30,
        100,
        random(100, 1300),
        50 - this.translateY,
        platformOnlyImages,
        imageIndex,
        isBreakable,
        isBreakable ? 1 : 0,
      );
      this.platforms.push(newPlatform);

      // Reset timer
      this.platformSpawnTimer = millis();
    }
  }

  private spawnStartPlatform() {
    this.startPlatform = new Platform(
      70,
      1200,
      100,
      600,
      [this.platformImages[0]],
      0,
      false,
      1,
    );
    this.startPlatformSpawnTime = millis();
  }

  private checkForWinner() {
    const alivePlayers = this.players.filter((player) => player.isAlive);

    if (this.players.length === 1) {
      // Singleplayer-logik
      if (alivePlayers.length === 0) {
        game.changeScreen(new GameEnd(null));
      }
    } else {
      // Multiplayer-logik
      if (alivePlayers.length === 1) {
        const lastPlayerStanding = alivePlayers[0];
        lastPlayerStanding.onDeath = () => {
          const winnerIndex = this.players.indexOf(lastPlayerStanding);
          game.changeScreen(new GameEnd(winnerIndex));
        };
      }
    }
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

    if (this.startPlatform && millis() - this.startPlatformSpawnTime > 5000) {
      this.startPlatform.imageIndex = 0;
    }

    if (this.startPlatform && millis() - this.startPlatformSpawnTime > 7000) {
      this.startPlatform = null;
    }

    this.players.forEach((player) => {
      player.update();
      // when player falls off the screen they die, player.die in player class = true
      if (player.posY > height) {
        player.die();
      }
    });

    this.translateY += this.speedUpCounter;

    this.detectHit();

    this.removeOffScreenPlatforms();

    this.speedUpGame();

    this.checkForWinner();
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
      this.startPlatform.drawPlatform();
    }

    this.drawTimerBorder();

    translate(0, this.translateY);
    this.platforms.forEach((platform) => platform.draw());
    pop();
  }
}
