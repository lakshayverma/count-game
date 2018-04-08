// logic for the Count game

class NumberedBox extends createjs.Container {
  constructor (game, number = 0) {
    super();

    this.game = game;
    this.number = number;

    let movieClip = new lib.NumberedBox();
    movieClip.numberText.text = number;

    this.addChild(movieClip);

    this.setBounds(0, 0, 50, 50);

    this.on('click', this.handleClick.bind(this));
  }

  handleClick() {
    this.game.handleClick(this);
  }
}

class GameData {
  constructor() {
    this.amountOfBox = 20;
    this.resetData();
  }

  resetData() {
    this.currentNumber = 1;
  }

  nextNumber() {
    this.currentNumber += 1;
  }

  isRightNumber(number) {
    return (number === this.currentNumber);
  }

  isGameWin() {
    return (this.currentNumber > this.amountOfBox);
  }
}

class Game {
  constructor() {
    console.log(`Welcome to the game. Version ${this.version()}`);

    this.canvas = document.getElementById("game-canvas");
    this.stage = new createjs.Stage(this.canvas);

    // enable taps on touch devices
    createjs.Touch.enable(this.stage);

    this.stage.enableMouseOver();

    this.stage.width = this.canvas.width;
    this.stage.height = this.canvas.height;

    window.debugStage = this.stage;

    // set the framerate
    createjs.Ticker.framerate = 60;

    // Keep re-drawing the stage.
    createjs.Ticker.on("tick", this.stage);

    this.gameData = new GameData();

    // background
    this.stage.addChild(new lib.Background());

    // code
    this.generateMultipleBoxes(this.gameData.amountOfBox);

    // enable retina display
    this.retinalize();
  }

  version() {
    return '1.0.0';
  }

  generateMultipleBoxes (amount=10) {
    for (let i = amount; i > 0; i--) {
      let movieClip = new NumberedBox(this, i);
      this.stage.addChild(movieClip);

      // random position
      movieClip.x = Math.random() * (this.stage.width - movieClip.getBounds().width);
      movieClip.y = Math.random() * (this.stage.height - movieClip.getBounds().height);
    }
  }

  handleClick(numberedBox) {
    if (this.gameData.isRightNumber(numberedBox.number)) {
      this.stage.removeChild(numberedBox);
      this.gameData.nextNumber();

      // is game over?
      if (this.gameData.isGameWin()) {
        var gameOverView = new lib.GameOverView();
        this.stage.addChild(gameOverView);
      }
    }
  }

  retinalize() {
    let ratio = window.devicePixelRatio;

    if (ratio === undefined) {
      return;
    }

    this.stage.width = this.canvas.width;
    this.stage.height = this.canvas.height;

    this.canvas.setAttribute('width', Math.round(this.stage.width * ratio));
    this.canvas.setAttribute('height', Math.round(this.stage.height * ratio));

    this.stage.scaleX = this.stage.scaleY = ratio;

    // set CSS style
    this.canvas.style.width = this.stage.width + 'px';
    this.canvas.style.height = this.stage.height + 'px';
  }
}

// start the game
let game = new Game();
