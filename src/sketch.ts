//---- GLOBAL VARIABLES ----//
let game: Game;
let music: {
  mystery: p5.SoundFile;
};
let playerImages: p5.Image[];
let playerSelect: PlayerSelect;

/**
 * Built in preload function in P5
 * This is a good place to load assets such as
 * sound files, images etc...
 */
function preload() {
  music = {
    mystery: loadSound("/assets/music/mystery.mp3"),
  };

  playerImages = [];
  playerImages[0] = loadImage("/assets/images/cats/Player11.png");
  playerImages[1] = loadImage("/assets/images/cats/Player12.png");
  playerImages[2] = loadImage("/assets/images/cats/Player13.png");
  playerImages[3] = loadImage("/assets/images/cats/Player14.png");
  playerImages[4] = loadImage("/assets/images/cats/Player11M.png");
  playerImages[5] = loadImage("/assets/images/cats/Player12M.png");
  playerImages[6] = loadImage("/assets/images/cats/Player13M.png");
  playerImages[7] = loadImage("/assets/images/cats/Player14M.png");
  playerImages[8] = loadImage("/assets/images/platforms/Platform.png");
}

/**
 * Built in setup function in P5
 * This is a good place to create your first class object
 * and save it as a global variable so it can be used
 * in the draw function belows
 */
function setup() {
  createCanvas(1400, 700);
  frameRate(60);
  music.mystery.setVolume(0.8);
  game = new Game();
  game.setup();
}

/**
 * Built in draw function in P5
 * This is a good place to call public methods of the object
 * you created in the setup function above
 */
function draw() {
  game.update();
  game.draw();
}
