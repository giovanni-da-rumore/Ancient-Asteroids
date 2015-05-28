;(function() {
  "use strict";
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var DIMX = 1360;
  var DIMY = 820;
  var NUMASTEROIDS = 4;

  var Game = Asteroids.Game = function(width, height) {
    if (typeof width === "undefined") {
      this.dimX = DIMX;
    } else {
      this.dimX = width;
    }
    if (typeof height === "undefined") {
      this.dimY = DIMY;
    } else {
      this.dimY = height;
    }
    this.numAsteroids = NUMASTEROIDS;
    this.asteroids = [];
    this.ship = this.addShip();
    this.addAsteroids();
  };

  Game.prototype.addAsteroids = function() {
    var shipForceField = new Asteroids.ShipForceField(this);

    while ( this.asteroids.length < this.numAsteroids) {
      var testAsteroid = new Asteroids.Asteroid(this.randomPosition(), this);
      if ( testAsteroid.isCollidedWith(shipForceField) ) {
        continue;
      } else {
        this.asteroids.push(new Asteroids.Asteroid(this.randomPosition(), this));
      }
    }
  };

  Game.prototype.addShip = function() {
    return new Asteroids.Ship(this);
  }

  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, this.dimX, this.dimY);
    this.ship.draw(ctx);
    this.asteroids.forEach(function (roid) {
      roid.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function() {
    this.asteroids.forEach(function (roid) {
      roid.move();
    });
  };

  Game.prototype.randomPosition = function() {
    var x = Math.floor(Math.random() * (this.dimX));
    var y = Math.floor(Math.random() * (this.dimY));
    return [x, y];
  };

  Game.prototype.wrap = function(pos) {
    return [(pos[0]+this.dimX) % this.dimX, (pos[1]+this.dimY) % this.dimY];
  };

  Game.prototype.checkCollisions = function() {
    for (var i = 0; i < this.asteroids.length; i++) {
      for (var j = i; j < this.asteroids.length; j++) {
        if (i === j) {
          continue;
        } else {
          if (this.asteroids[i].isCollidedWith(this.asteroids[j])) {
            this.asteroids[i].collideWith(this.asteroids[j]);
          }
        }
      }
    }
  };

  Game.prototype.step = function() {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.remove = function(asteroid) {
    this.asteroids.splice(this.asteroids.indexOf(asteroid),1);
  };

})();
