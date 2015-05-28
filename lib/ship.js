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

    Asteroids.MovingObject.call(this, moHash);
  };

  Ship.prototype.power = function(impulse) {

  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

})();
