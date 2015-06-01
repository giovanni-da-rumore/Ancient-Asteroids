;(function() {
  "use strict";
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var DIMX = 1360;
  var DIMY = 820;
  var NUMASTEROIDS = 0;
  var LIVES = 4;
  var STATES = ["off", "playing", "paused"]

  var Game = Asteroids.Game = function(width, height, highScore, state, numAsteroids) {

    this.dimX = width || DIMX;
    this.dimY = height || DIMY;
    this.numAsteroids = numAsteroids || NUMASTEROIDS;
    this.lives = LIVES;
    this.highScore = highScore || 0;
    this.score = 0;
    this.state = state || "off";
    this.asteroids = [];
    this.bullets = [];
    this.addShip();
    this.allObjects = this.getAllObjects();
    this.addAsteroids();
    this.backgrounds = ["./images/taormina.jpg", "./images/acropolis.jpg", "./images/gianicolo.jpg", "./images/alhambra.jpg"]
    this.level = 0;
    this.loadImage();
    this.newLevel = true;
    this.transitioning = false;

  };

  Game.prototype.addAsteroids = function() {
    if (this.state != "playing") {
      return;
    }

    var shipForceField = this.ship.forceField;

    while ( this.asteroids.length < this.numAsteroids) {
      var testAsteroid = new Asteroids.Asteroid(this.randomPosition(), this);
      if (testAsteroid.isCollidedWith(this.ship.forceField) && this.newLevel) {
        continue;
      } else {
        var asteroid = new Asteroids.Asteroid(this.randomPosition(), this)
        //this.addAsteroidImg(asteroid);
        asteroid.addImage();
        this.asteroids.push(asteroid);
        this.allObjects.push(asteroid);
      }
    }
    this.newLevel = false;
  };

  Game.prototype.addObject = function (obj) {
    if (obj instanceof Asteroids.Asteroid) {
      this.asteroids.push(obj);
    } else if (obj instanceof Asteroids.Bullet) {
      this.bullets.push(obj);
    }
    this.allObjects.push(obj);
  };


  Game.prototype.addShip = function() {
    this.ship = new Asteroids.Ship(this);
  }

  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, this.dimX, this.dimY);
    ctx.drawImage(this.image, 0, 0, this.dimX, this.dimY)
    this.ship.draw(ctx);
    this.allObjects.forEach(function (object) {
        object.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function() {
    this.allObjects.forEach(function (object) {
      object.move();
    });
    this.ship.forceField.pos = this.ship.pos;
  };

  Game.prototype.randomPosition = function() {
    var x = Math.floor(Math.random() * (this.dimX));
    var y = Math.floor(Math.random() * (this.dimY));
    return [x, y];
  };

  Game.prototype.wrap = function(pos) {
    return [(pos[0]+this.dimX) % this.dimX, (pos[1]+this.dimY) % this.dimY];
  };

  Game.prototype.outOfBounds = function(pos) {
    return ((pos[0] > this.dimX || pos[0] < 0) ||
        (pos[1] > this.dimY || pos[1] < 0))
  };


  Game.prototype.checkCollisions = function() {
    for (var i = 0; i < this.allObjects.length; i++) {
      for (var j = i; j < this.allObjects.length; j++) {
        if (i === j) {
          continue;
        } else {
          if (this.allObjects[i].isCollidedWith(this.allObjects[j])) {
            this.allObjects[i].collideWith(this.allObjects[j]);
          }
        }
      }
    }
  };


  Game.prototype.step = function() {
    this.moveObjects();
    this.checkCollisions();
    this.ship.addDrag();
    this.levelCompleted();
  };

  Game.prototype.remove = function(obj) {
    this.allObjects.splice(this.allObjects.indexOf(obj),1);
    if (obj instanceof Asteroids.Asteroid) {
      this.asteroids.splice(this.asteroids.indexOf(obj),1);
    }
  };


  Game.prototype.getAllObjects = function () {
    return this.asteroids.concat(this.ship);
  };


  Game.prototype.levelCompleted = function () {
    if (this.asteroids.length === 0 && this.state === "playing") {
      this.numAsteroids += 1;
      this.level += 1;
      // this.newLevel = true;
      // this.loadImage();
      // this.addAsteroids();

      if (this.level > 1) {
        var that = this;
        $(".curtain").toggleClass("show");
        $(".curtain").html("Level " + this.level + "!")
        this.transitioning = true;
        var intervalID = setTimeout(function() {
          $(".curtain").toggleClass("show");
          that.transitioning = false;
          that.newLevel = true;
          that.loadImage();
          that.addAsteroids();
        }, 1700);
      } else {
        this.newLevel = true;
        this.loadImage();
        this.addAsteroids();
      }
    }

  }

  Game.prototype.loadImage = function () {
    var img = new Image();
    var numImgs = this.backgrounds.length;
    var index = (this.level - 1) % numImgs;
    if (index >= 0) {
      img.src = this.backgrounds[index];
    } else {
      img.src = "./images/taormina.jpg";
    }
    this.image = img;
  }










  Game.prototype.startNew = function () {
    this.asteroids = []
    this.addShip();
    this.allObjects = this.getAllObjects();
    this.score = 0;
    this.lives = 4;
    this.level = 0;
    this.numAsteroids = 0;
    this.loadImage();

  }






})();
