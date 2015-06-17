;(function() {
  "use strict";
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var RADIUS = 24;
  var COLOR = "#00FFFF";
  var DEGREES = 270;
  var RADS = Math.PI/180;

  var Ship = Asteroids.Ship = function(game) {
    var moHash = {};
    moHash["pos"] = [game.dimX / 2, game.dimY / 2];
    moHash["radius"] = RADIUS;
    moHash["color"] = COLOR;
    moHash["vel"] = [0,0];
    moHash["game"] = game;
    moHash["maxV"] = 9;
    moHash["rad"] = 0;
    moHash["degrees"] = DEGREES;
    moHash["forceField"] = new Asteroids.ShipForceField(game);

    Asteroids.MovingObject.call(this, moHash);
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.power = function(impulse) {
    if (impulse === "forward") {
      this.vel[0] += Math.cos(this.degrees * RADS) / 7
      this.vel[1] += Math.sin(this.degrees * RADS) / 7
      this.renderFlame(ctx);

    } else if (impulse === "back") {
      this.vel[0] -= Math.cos(this.degrees * RADS) / 7
      this.vel[1] -= Math.sin(this.degrees * RADS) / 7
    } else if (impulse === "left") {
      this.degrees -= 7;
    } else if (impulse === "right") {
      this.degrees += 7;
    }

    this.ensureMaxV();

  };

  Ship.prototype.ensureMaxV = function () {
    if (this.vel[0] > this.maxV) {
      this.vel[0] = this.maxV;
    } else if (this.vel[0] < (this.maxV * -1)) {
      this.vel[0] = this.maxV * -1;
    }

    if (this.vel[1] > this.maxV) {
      this.vel[1] = this.maxV;
    } else if (this.vel[1] < (this.maxV * -1)) {
      this.vel[1] = this.maxV * -1;
    }
  };


  Ship.prototype.fireBullet = function () {
    var bulPos = [this.forwardPoint()[0], this.forwardPoint()[1]]
    var bulV = this.setBulletV([this.vel[0], this.vel[1]]);
    var bullet = new Asteroids.Bullet(this.game, bulV, bulPos);
    this.game.addObject(bullet);

  };

  Ship.prototype.setBulletV = function (vel) {
    vel[0] += Math.cos(this.degrees * RADS) * 16
    vel[1] += Math.sin(this.degrees * RADS) * 16
    return vel;
  };

  Ship.prototype.forwardPoint = function () {
    return [this.pos[0] + ((Math.cos(this.degrees * RADS) * this.radius)), this.pos[1] + (this.radius * Math.sin(this.degrees * RADS))]
  }



  Ship.prototype.getRelPoint = function (degrees, radius) {
    return [this.pos[0] + ((Math.cos(degrees * RADS) * radius)), this.pos[1] + (radius * Math.sin(degrees * RADS))]
  }



  Ship.prototype.relocate = function () {
    this.pos = game.randomPosition();

  };

  Ship.prototype.draw = function (ctx) {
    // ctx.fillStyle = "#fff";
    // ctx.beginPath();
    // ctx.arc(
    //   this.pos[0],
    //   this.pos[1],
    //   this.radius,
    //   0,
    //   2 * Math.PI,
    //   false
    // );
    // ctx.fill();
    ctx.fillStyle = this.color;
    ctx.beginPath();
    var setDegrees =
    ctx.moveTo(this.forwardPoint()[0], this.forwardPoint()[1]);
    ctx.lineTo(this.pos[0] + (Math.cos((this.degrees - 150) * RADS) * this.radius), this.pos[1] + (this.radius * Math.sin((this.degrees - 150) * RADS)));
    ctx.lineTo(this.getRelPoint(this.degrees + 180, this.radius / 3)[0], this.getRelPoint(this.degrees + 180, this.radius / 3)[1]);
    ctx.lineTo(this.pos[0] + (Math.cos((this.degrees + 150) * RADS) * this.radius), this.pos[1] + (this.radius * Math.sin((this.degrees + 150) * RADS)));
    ctx.lineTo(this.forwardPoint()[0], this.forwardPoint()[1]);
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#003F87';
    ctx.stroke();

    if (this.isThrusting && this.toggleFlameNum % 4 == 0) {
      this.renderFlame(ctx);
    }
    this.toggleFlameNum += 1;
  };


  Ship.prototype.renderFlame = function (ctx) {
    ctx.fillStyle = "#990000";
    ctx.beginPath();
    ctx.moveTo(this.getRelPoint(this.degrees + 180, this.radius / 2.8)[0], this.getRelPoint(this.degrees + 180, this.radius / 2.8)[1]);
    var rad = this.radius
    ctx.lineTo(this.getRelPoint(this.degrees - 150, rad / 1.3)[0], this.getRelPoint(this.degrees - 150, rad / 1.3)[1]);
    ctx.lineTo(this.getRelPoint(this.degrees + 180, rad * 1.5)[0], this.getRelPoint(this.degrees + 180, rad * 1.5)[1]);
    ctx.lineTo(this.getRelPoint(this.degrees + 150, rad / 1.3)[0], this.getRelPoint(this.degrees + 150, rad/ 1.3)[1]);
    ctx.fill();



  };



  Ship.prototype.addDrag = function () {
    if (this.vel[0] > 0) {
      this.vel[0] -= .03;
    }

    if (this.vel[0] < 0) {
      this.vel[0] += .03;
    }

    if (this.vel[1] > 0) {
      this.vel[1] -= .03;
    }

    if (this.vel[1] < 0) {
      this.vel[1] += .03;
    }

  };

  Ship.prototype.collideWith = function (otherObject) {

    if (otherObject instanceof Asteroids.Asteroid && this.game.state === "playing") {
      this.game.lives -= 1;
      this.relocate();
    }
  };






})();
