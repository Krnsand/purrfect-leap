//---- GLOBAL VARIABLES ----//
let game: Game;
let sound: { chooseSound: p5.SoundFile; enterSound: p5.SoundFile };
// let playerImages: p5.Image[];
let playerSelect: PlayerSelect;


/**
* Built in preload function in P5
* This is a good place to load assets such as
* sound files, images etc...
*/
function preload() {
 sound = {
   chooseSound: loadSound("/assets/sounds/boing.mp3", () =>
     console.log("Choose sound loaded!")
   ),
   enterSound: loadSound("/assets/sounds/boing.mp3", () =>
     console.log("Enter sound loaded!")
   ),
 };
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
 sound.chooseSound.setVolume(0.8);
 sound.enterSound.setVolume(0.8);
 game = new Game();
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
