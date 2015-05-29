;(function() {
  "use strict";
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var DIMX = 1360;
  var DIMY = 820;
  var NUMASTEROIDS = 1;

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
    this.bullets = [];
    this.ship = this.addShip();
    this.addAsteroids();
    this.allObjects = this.allObjects();
    this.loadImage();
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

  Game.prototype.addObject = function (obj) {
    if (obj instanceof Asteroids.Asteroid) {
      this.asteroids.push(obj);
    } else if (obj instanceof Asteroids.Bullet) {
      this.bullets.push(obj);
    }
    this.allObjects.push(obj);
  };


  Game.prototype.addShip = function() {
    return new Asteroids.Ship(this);
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
    this.allObjects.forEach(function (roid) {
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
  };

  Game.prototype.remove = function(obj) {
    this.allObjects.splice(this.allObjects.indexOf(obj),1);
  };


  Game.prototype.allObjects = function () {
    return this.asteroids.concat(this.ship);
  };

  Game.prototype.loadImage = function () {
    var img = new Image();
    img.onload = function () {
      ctx.drawImage(img, 0, 0);
    };
    img.src = "./images/taormina_2.jpg"
    this.image = img;
  }


})();
