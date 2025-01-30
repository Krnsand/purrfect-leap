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
  private powerUpImages: p5.Image[];
  private powerUpTimer: number;
  private powerUpInterval: number;
  private powerUps: (HighJumpPower | ExtraLifePower | ThrowYarnPower)[] = [];
  private speedUpCounter: number;
  private gameStartTime: number;

  constructor(players: Player[]) {
    this.playerImages = [];
    this.players = players;
    this.platforms = [];
    this.platformSpawnTimer = millis();
    this.platformSpawnInterval = 500;
    this.translateY = 0;
    this.time = new Time();
    this.startPlatform = null;
    this.startPlatformSpawnTime = 0;
    this.startPlatformSpawned = false;
    this.powerUpImages = [];
    this.loadImages();
    this.powerUpTimer = 0;
    this.powerUpInterval = 2000;
    this.speedUpCounter = 2;
    this.gameStartTime = millis();
  }

  private loadImages() {
    this.backgroundImage = loadImage(
      "/assets/images/background/purrfectLeapBackground.jpg",
    );
    this.playerImages[100] = loadImage("/assets/images/platforms/Platform.png");
    this.playerImages[101] = loadImage(
      "/assets/images/platforms/startPlatform.png",
    );
    this.playerImages[102] = loadImage(
      "/assets/images/platforms/startPlatformFlashing.gif",
    );
    this.powerUpImages[0] = loadImage(
      "/assets/images/powerups/catnip-power.png",
    );
    this.powerUpImages[1] = loadImage(
      "/assets/images/powerups/extralife-power.png",
    );
    this.powerUpImages[2] = loadImage("/assets/images/powerups/yarnpower.png");
  }

  private playerCollision() {
    // Loop through all players
    for (let i = 0; i < this.players.length; i++) {
      // Compare with remaining players
      for (let j = i + 1; j < this.players.length; j++) {
        const player1 = this.players[i];
        const player2 = this.players[j];

        // Calculate boundaries
        const player1Left = player1.posX;
        const player1Right = player1.posX + player1.width;
        const player1Top = player1.posY;
        const player1Bottom = player1.posY + player1.height;

        const player2Left = player2.posX;
        const player2Right = player2.posX + player2.width;
        const player2Top = player2.posY;
        const player2Bottom = player2.posY + player2.height;

        // First check if there's any collision at all
        if (
          player1Left < player2Right &&
          player1Right > player2Left &&
          player1Top < player2Bottom &&
          player1Bottom > player2Top
        ) {
          // Find if collision is more horizontal or vertical
          //Math.min returns the lowest number in the list
          const horizontalOverlap = Math.min(
            player1Right - player2Left,
            player2Right - player1Left,
          );
          const verticalOverlap = Math.min(
            player1Bottom - player2Top,
            player2Bottom - player1Top,
          );

          if (horizontalOverlap < verticalOverlap) {
            if (player1Left < player2Left) {
              player1.posX -= horizontalOverlap / 2;
              player2.posX += horizontalOverlap / 2;

              player1.horizontalVelocity = -10;
              player2.horizontalVelocity = 10;
            } else {
              player1.posX += horizontalOverlap / 2;
              player2.posX -= horizontalOverlap / 2;

              player1.horizontalVelocity = 10;
              player2.horizontalVelocity = -10;
            }
          } else {
            if (player1.velocity > 0 && player1Bottom > player2Top) {
              player1.velocity -= 15;
              player2.velocity += 5;
            }
            if (player2.velocity > 0 && player2Bottom > player1Top) {
              player2.velocity -= 15;
              player2.velocity += 5;
            }
          }
        }
      }
    }
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
      const newPlatform = new Platform(
        30,
        100,
        random(100, 1300),
        50 - this.translateY,
        this.playerImages,
        100,
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
      this.playerImages,
      101,
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

  private spawnPowerUp() {
    this.powerUpTimer += deltaTime;
    if (this.powerUpTimer > this.powerUpInterval) {
      const powerUps = [
        new HighJumpPower(
          60,
          42,
          random(100, 1300),
          -this.translateY - 50,
          this.powerUpImages,
          0,
        ),
        new ExtraLifePower(
          40,
          80,
          random(100, 1300),
          -this.translateY - 50,
          this.powerUpImages,
          1,
        ),
        new ThrowYarnPower(
          45,
          60,
          random(100, 1300),
          -this.translateY - 50,
          this.powerUpImages,
          2,
        ),
      ];
      this.powerUps.push(powerUps[floor(random(0, 3))]);

      // Reset timer
      this.powerUpTimer = 0;
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
      this.startPlatform.imageIndex = 102;
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
    this.playerCollision();
    this.removeOffScreenPlatforms();
    this.spawnPowerUp();

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
      this.startPlatform.spawnPlatform();
    }

    this.drawTimerBorder();

    translate(0, this.translateY);
    this.platforms.forEach((platform) => platform.draw());
    this.powerUps.forEach((powerUp) => powerUp.draw());
    pop();
  }
}
