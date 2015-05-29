;(function() {
  "use strict";
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var RADIUS = 60;
  // var RADIUS = 20;
  var COLOR = "#388E8E";
  var DEGREES = 0;


  var Asteroid = Asteroids.Asteroid = function (pos, game, vel, radius, color) {
    var moHash = {};
    moHash["pos"] = pos;
    if (typeof radius === "undefined") {
      moHash["radius"] = RADIUS;
    } else {
      moHash["radius"] = radius;
    }
    if (typeof color === "undefined") {
      moHash["color"] = COLOR;
    } else {
      moHash["color"] = color;
    }
    moHash["game"] = game;

    if (typeof vel === "undefined") {
      moHash["vel"] = randomVel(4);
    } else {
      moHash["vel"] = vel;
    }



    Asteroids.MovingObject.call(this, moHash);
  };

  var randomVel = function(length) {
    var x = (Math.random() * (length - -(length))) + -(length);
    var y = (Math.random() * (length - -(length))) + -(length);
    return [x,y];
  };

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
    var radius = this.radius / 1.5
    if (radius < 20 ) {
      return;
    }
    // var degrees = Math.atan(otherObject.vel[1], otherObject.vel[0]);
    // var degrees1 = degrees + (Math.PI / 2);
    // var degrees2 = degrees - (Math.PI / 2);
    // var degrees1 = degrees;
    // var degrees2 = degrees * -1;
    var vel1 = randomVel(4);
    var vel2 = [vel1[0] * -1, vel1[1] * -1];
    // vel1[0] = Math.cos(degrees1) * this.vel[0];
    // vel1[1] = Math.sin(degrees1) * this.vel[1];
    var pos1 = [this.pos[0] + (vel1[0] * 5), this.pos[1] + (vel1[1] * 5)]
    var asteroid1 = new Asteroids.Asteroid(pos1, this.game, vel1, radius)
    this.game.addObject(asteroid1)
    // vel2[0] = Math.cos(degrees2) * this.vel[0];
    // vel2[1] =  Math.sin(degrees2) * this.vel[1];
    // vel2 = randomVel(4);
    var pos2 = [this.pos[0] + (vel2[0] * 5), this.pos[1] + (vel2[1] * 5)]
    var asteroid2 = new Asteroids.Asteroid(pos2, this.game, vel2, radius)
    this.game.addObject(asteroid2);

    var vel3 = randomVel(4);

    var pos2 = [this.pos[0] + (vel2[0] * 5), this.pos[1] + (vel2[1] * 5)]
    var asteroid3 = new Asteroids.Asteroid(pos2, this.game, vel3, radius)
    this.game.addObject(asteroid3);
  }




})();
