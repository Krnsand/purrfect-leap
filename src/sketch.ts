//---- GLOBAL VARIABLES ----//
let game: Game;
let music: {
  mystery: p5.SoundFile;
};
let playerImages: p5.Image[] = [];
let player1: Player;

/**
 * Built in preload function in P5
 * This is a good place to load assets such as
 * sound files, images etc...
 */
function preload() {
  music = {
    mystery: loadSound("/assets/music/mystery.mp3"),
  };
  playerImages.push(loadImage("/assets/images/cats/Purr1.jpg"));
  playerImages.push(loadImage("/assets/images/cats/Purr2.jpg"));
  playerImages.push(loadImage("/assets/images/cats/Purr3.jpg"));
  playerImages.push(loadImage("/assets/images/cats/Purr4.jpg"));
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
  player1 = new Player(100, 200, 50, 50, playerImages, 0);
}

/**
 * Built in draw function in P5
 * This is a good place to call public methods of the object
 * you created in the setup function above
 */
function draw() {
  game.update();
  game.draw();
  player1.renderPlayer();
  player1.leftAndRight();
}
