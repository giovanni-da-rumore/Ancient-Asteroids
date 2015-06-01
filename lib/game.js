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
    this.loadImage();
    this.newLevel = true;
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
    var img = this.image
    ctx.clearRect(0, 0, this.dimX, this.dimY);
    ctx.drawImage(img, 0, 0, this.dimX, this.dimY)
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
      this.newLevel = true;
      this.addAsteroids();
    }

  }

  Game.prototype.loadImage = function () {
    var img = new Image();
    img.onload = function () {
      ctx.drawImage(img, 0, 0);
    };
    img.src = "./images/taormina_2.jpg"
    this.image = img;
  }


  Game.prototype.startNew = function () {
    this.asteroids = []
    this.addShip();
    this.allObjects = this.getAllObjects();
    this.score = 0;
    this.lives = 4;
    this.level = 1;
    this.numAsteroids = 0;

  }






})();
