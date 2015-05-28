;(function(){
  "use strict";
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function(moHash) {
    this.pos = moHash["pos"];
    this.radius = moHash["radius"];
    this.color = moHash["color"];
    this.vel = moHash["vel"];
    this.game = moHash["game"];
  };

  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    ctx.fill();
  };

  MovingObject.prototype.move = function () {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    this.pos = this.game.wrap(this.pos);
  };

  MovingObject.prototype.isCollidedWith = function(otherObject) {
    return getDist(this, otherObject) < (this.radius + otherObject.radius);
  };

  MovingObject.prototype.collideWith = function(otherObject) {
    // this.game.remove(otherObject);
    // this.game.remove(this);
  };


  var getDist = function(first, second) {
    var x = Math.pow((first.pos[0] - second.pos[0]), 2);
    var y = Math.pow((first.pos[1] - second.pos[1]), 2);
    return Math.sqrt(x + y);
  };

})();
