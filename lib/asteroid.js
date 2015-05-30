;(function() {
  "use strict";
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var RADIUS = 80;
  // var RADIUS = 20;
  var COLOR = "#388E8E";
  var DEGREES = 0;


  var Asteroid = Asteroids.Asteroid = function (pos, game, vel, radius, color) {
    var moHash = {};
    moHash["pos"] = pos;
    moHash["radius"] = radius || RADIUS;
    moHash["color"] = color || COLOR;
    moHash["game"] = game;
    moHash["vel"] = vel || randomVel(4);

    Asteroids.MovingObject.call(this, moHash);
  };

  var randomVel = function(length) {
    var min = 0.5
    var x = (Math.random() * (length - min)) + min;
    var y = (Math.random() * (length - min)) + min;
    return [x,y];
  };

  var offSetter = function () {
    return (Math.random() * (.5)) + .5

  }

  var fourAsteroids = function () {
    return Math.random() > 0.5
  }


  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);


  Asteroid.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    } else if (otherObject instanceof Asteroids.Bullet) {
      this.asteroidCollision(otherObject);
        this.game.remove(otherObject);
        this.game.remove(this);
      }
  }



  Asteroid.prototype.asteroidCollision = function(otherObject) {
    if (this.radius / 1.6 < 20 ) {
      return;
    }
    var vel1= randomVel(4.5);
    var vel2 = [(vel1[0] * -1) + offSetter(), (vel1[1] * -1) + offSetter()];
    var vel3 = [(vel1[0] * -1) + offSetter(), vel1[1] + offSetter()];
    this.addAsteroid(vel1);
    this.addAsteroid(vel2);
    this.addAsteroid(vel3);

    if (fourAsteroids()) {
      debugger;
      var vel4 = [(vel1[0]) + offSetter(), (vel1[1] * -1) + offSetter()];
      this.addAsteroid(vel4);
    }
  };


  Asteroid.prototype.addAsteroid = function (vel) {
    var radius = this.radius / 1.6
    var pos = [this.pos[0] + (vel[0] * 6), this.pos[1] + (vel[1] * 6)]
    var asteroid1 = new Asteroids.Asteroid(pos, this.game, vel, radius)
    this.game.addObject(asteroid1)

  };




})();
