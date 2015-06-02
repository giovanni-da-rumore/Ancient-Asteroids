;(function() {
  "use strict";
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var RADIUS = 5;
  var COLOR = '#ff0'
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

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);


  Bullet.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof Asteroids.Asteroid && this.game.state === "playing") {
      otherObject.asteroidCollision();
      this.game.remove(otherObject);
      this.game.remove(this);
      this.game.score += 5
    }
  }

  Bullet.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1] , this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#f26200';
    ctx.stroke();
    ctx.closePath();

  }




  // Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);


  })();
