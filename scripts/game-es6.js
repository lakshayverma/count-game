// logic for the Count game

class NumberedBox extends createjs.Container {
  constructor (number = 0) {
    super();

    let movieClip = new lib.NumberedBox();
    movieClip.numberText.text = number;

    this.addChild(movieClip);

    this.setBounds(0, 0, 50, 50);

  }
}

class Game {
  constructor() {
    console.log(`Welcome to the game. Version ${this.version()}`);

    this.canvas = document.getElementById("game-canvas");
    this.stage = new createjs.Stage(this.canvas);

    this.stage.width = this.canvas.width;
    this.stage.height = this.canvas.height;

    window.debugStage = this.stage;

    createjs.Ticker.setFPS(60);

    // Keep re-drawing the stage.
    createjs.Ticker.on("tick", this.stage);

    // background
    this.stage.addChild(new lib.Background());

    // code
    // this.stage.addChild(new NumberedBox(88));
    this.generateMultipleBoxes();
  }

  version() {
    return '1.0.0';
  }

  generateMultipleBoxes (amount=10) {
    for (let i = amount; i > 0; i--) {
      let movieClip = new NumberedBox(i);
      this.stage.addChild(movieClip);

      // random position
      movieClip.x = Math.random() * (this.stage.width - movieClip.getBounds().width);
      movieClip.y = Math.random() * (this.stage.height - movieClip.getBounds().height);
    }
  }
}

// start the game
let game = new Game();
