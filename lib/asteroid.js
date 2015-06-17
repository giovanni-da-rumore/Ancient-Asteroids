;(function() {
  "use strict";
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var RADIUS = 80;
  var COLOR = "#388E8E";
  var DEGREES = 0;

  var Asteroid = Asteroids.Asteroid = function (pos, game, radius, vel, color) {
    var moHash = {};
    moHash["pos"] = pos;
    moHash["radius"] = radius || RADIUS;
    moHash["color"] = color || COLOR;
    moHash["game"] = game;
    moHash["vel"] = vel || randomVel(4);

    Asteroids.MovingObject.call(this, moHash);
  };

  var randomVel = function(length) {
    var min = 0.7
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


  Asteroid.prototype.draw = function (ctx) {
      var degrees = Math.atan(this.vel[1], this.vel[0])
      var radius = this.radius
      ctx.save();
      ctx.translate(this.pos[0], this.pos[1])
      ctx.rotate(degrees);
      ctx.translate(-1 * this.pos[0], -1 * this.pos[1]);

      ctx.beginPath();
      ctx.arc(this.pos[0], this.pos[1] , radius, 0, Math.PI * 2, true);
      ctx.lineWidth = 8;
      ctx.strokeStyle = '#f27a00';
      ctx.stroke();
      ctx.closePath();
      ctx.clip();

      ctx.drawImage(this.image, this.pos[0] - radius, this.pos[1] - radius, radius * 2, radius * 2);
      ctx.restore();

  };

  Asteroid.prototype.collideWith = function(otherObject) {

    if (this.game.state != "playing") {
      return;
    }

    if (otherObject instanceof Asteroids.Ship) {
      this.game.lives -= 1;
      otherObject.relocate();


    } else if (otherObject instanceof Asteroids.Bullet) {
      this.asteroidCollision();
      this.game.remove(otherObject);
      this.game.remove(this);
      this.game.score += 5;
    }
  }



  Asteroid.prototype.asteroidCollision = function() {
    if (this.radius / 1.6 < 20 ) {
      return;
    }
    var vel1= randomVel(3.6);
    var vel2 = [(vel1[0] * -1) + offSetter(), (vel1[1] * -1) + offSetter()];
    var vel3 = [(vel1[0] * -1) + offSetter(), vel1[1] + offSetter()];
    this.addAsteroid(vel1);
    this.addAsteroid(vel2);
    this.addAsteroid(vel3);

    if (fourAsteroids()) {
      var vel4 = [(vel1[0]) + offSetter(), (vel1[1] * -1) + offSetter()];
      this.addAsteroid(vel4);
    }
  };


  Asteroid.prototype.addAsteroid = function (vel) {
    var radius = this.radius / 1.6
    var pos = [this.pos[0] + (vel[0] * 7), this.pos[1] + (vel[1] * 7)]
    var asteroid = new Asteroids.Asteroid(pos, this.game, radius, vel)
    asteroid.addImage();
    this.game.addObject(asteroid)

  };


  Asteroid.prototype.addImage = function (asteroid) {
    var index = Math.floor(Math.random() * this.game.vaseImages.length)
    this.image = this.game.vaseImages[index];

  }



})();
