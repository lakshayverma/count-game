// logic for the Count game

class NumberedBox extends createjs.Container {
  constructor (number = 0) {
    super();

    var movieClip = new lib.NumberedBox();
    movieClip.numberText.text = number;

    this.addChild(movieClip);

    // random position
    movieClip.x = Math.random() * 200;
    movieClip.y = Math.random() * 200;
  }
}

class Game {
  constructor() {
    console.log(`Welcome to the game. Version ${this.version()}`);

    this.canvas = document.getElementById("game-canvas");
    this.stage = new createjs.Stage(this.canvas);

    window.debugStage = this.stage;

    createjs.Ticker.setFPS(60);

    // Keep re-drawing the stage.
    createjs.Ticker.on("tick", this.stage);

    // background
    this.stage.addChild(new lib.Background());

    // Testing code
    this.stage.addChild(new NumberedBox(88));
  }
  version() {
    return '1.0.0';
  }
}

// start the game
var game = new Game();
