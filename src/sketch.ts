//---- GLOBAL VARIABLES ----//
let game: Game;
let sound: { 
  chooseSound: p5.SoundFile; 
  enterSound: p5.SoundFile;
  retrySound: p5.SoundFile;
  menuSound: p5.SoundFile; 
  catSound1: p5.SoundFile; 
  catSound2: p5.SoundFile; 
  catSound3: p5.SoundFile; 
  catSound4: p5.SoundFile; 
  
};
// let playerImages: p5.Image[];
let playerSelect: PlayerSelect;


/**
* Built in preload function in P5
* This is a good place to load assets such as
* sound files, images etc...
*/
function preload() {
 sound = {
   chooseSound: loadSound("/assets/sounds/button-pressed.mp3", () =>
   console.log('Choose sound loaded:', sound.chooseSound.isLoaded())
   ),
   enterSound: loadSound("/assets/sounds/button-pressed.mp3", () =>
   console.log('Enter sound loaded:', sound.enterSound.isLoaded())
   ),
   retrySound: loadSound("/assets/sounds/button-pressed.mp3", () =>
   console.log('Choose sound loaded:', sound.chooseSound.isLoaded())
   ),
   menuSound: loadSound("/assets/sounds/boing.mp3", () =>
   console.log('Enter sound loaded:', sound.enterSound.isLoaded())
   ),
   catSound1: loadSound("/assets/sounds/1playerCat.mp3", () =>
   console.log('Choose sound loaded:', sound.chooseSound.isLoaded())
   ),
   catSound2: loadSound("/assets/sounds/2playerCat.mp3", () =>
   console.log('Enter sound loaded:', sound.enterSound.isLoaded())
   ),
   catSound3: loadSound("/assets/sounds/3playerCat.mp3", () =>
   console.log('Choose sound loaded:', sound.chooseSound.isLoaded())
   ),
   catSound4: loadSound("/assets/sounds/4playerCat.mp3", () =>
   console.log('Enter sound loaded:', sound.enterSound.isLoaded())
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
 sound.chooseSound.setVolume(0.5);
 sound.enterSound.setVolume(0.5);
 sound.retrySound.setVolume(0.5);
 sound.menuSound.setVolume(0.5);
 sound.catSound1.setVolume(0.5);
 sound.catSound2.setVolume(0.5);
 sound.catSound3.setVolume(0.5);
 sound.catSound4.setVolume(0.5);
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
