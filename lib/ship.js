;(function() {
  "use strict";
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var RADIUS = 17;
  var COLOR = "#0099CC";

  var Ship = Asteroids.Ship = function(game) {
    var moHash = {};
    moHash["pos"] = [game.dimX / 2, game.dimY / 2];
    moHash["radius"] = RADIUS;
    moHash["color"] = COLOR;
    moHash["vel"] = [0,0];
    moHash["game"] = game;
    moHash["maxV"] = 7;

    Asteroids.MovingObject.call(this, moHash);
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.power = function(impulse) {
    if (impulse === "forward") {
      if (this.vel[1] > -1 * this.maxV) {
        this.vel[1] -= 1;
      }
    } else if (impulse === "back") {
        if (this.vel[1] < this.maxV) {
          this.vel[1] += 1;
        }
    } else if (impulse === "left") {
      if (this.vel[0] > -1 * this.maxV) {
          this.vel[0] -= 1;
        }
    } else if (impulse === "right") {
      // this.moveRight(ctx);
      if (this.vel[0] < this.maxV) {
        this.vel[0] += 1;
      }
    }

  };


  Ship.prototype.moveRight = function (ctx) {
    var deg = 5

    var rad = deg * Math.PI / 180;
    ctx.translate(this.pos[0], this.pos[1] - this.radius);
    ctx.rotate(rad);

    ctx.rotate(rad * (-1));

  }


  Ship.prototype.fireBullet = function () {
    var bulPos = [this.pos[0], this.pos[1] - this.radius - 1]
    var bulV = this.setBulletDir([this.vel[0], this.vel[1]]);
    var bullet = new Asteroids.Bullet(this.game, bulV, bulPos);
    this.game.addObject(bullet);
    debugger;

  };

  Ship.prototype.setBulletDir = function (dir1) {
    var dir = dir1;
    if (dir[1] > 0) {
      dir[1] = -1;
    } else if(dir[1] === 0) {
      dir[1] -= 2;
    } else if (dir[1] >= -2) {
      dir[1] -= 2
    } else if (dir[1] < -6) {
      dir[1] -= 5;
    } else if (dir[1] < -4) {
      dir[1] -= 4
    } else if (dir[1] < -3) {
      dir[1] -= 3;
    }
    return dir;
  };




  Ship.prototype.relocate = function () {
    this.pos = game.randomPosition();

  };

  Ship.prototype.draw = function (ctx) {
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      17,
      0,
      2 * Math.PI,
      false
    );
    ctx.fill();
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.pos[0], this.pos[1] - this.radius)
    ctx.lineTo(this.pos[0] - 9, this.pos[1] + this.radius);
    ctx.lineTo(this.pos[0] + 9, this.pos[1] + this.radius);
    ctx.fill();
  };






})();
