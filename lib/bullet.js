;(function() {
  "use strict";
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var RADIUS = 5;
  var COLOR = "#AEEEEE";
  var MAXV = 10;

  var Bullet = Asteroids.Bullet = function(game, vel, pos) {
    var moHash = {};
    moHash["pos"] = pos;
    moHash["radius"] = RADIUS;
    moHash["color"] = COLOR;
    moHash["vel"] = vel;
    moHash["game"] = game;
    moHash["maxV"] = MAXV;

    Asteroids.MovingObject.call(this, moHash);

  };


  Bullet.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof Asteroids.Asteroid && this.game.state === "playing") {
      this.asteroidCollision(otherObject);
      this.game.remove(otherObject);
      this.game.remove(this);
      this.game.score += 5
    }
  }




  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);


  })();
