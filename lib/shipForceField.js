;(function() {
  "use strict";
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var RADIUS = 200;

  var ShipForceField = Asteroids.ShipForceField = function(game) {
    var moHash = {};
    moHash["pos"] = [game.dimX / 2, game.dimY / 2];
    moHash["radius"] = RADIUS;
    moHash["color"] = "#000000";
    moHash["vel"] = [0,0];
    moHash["game"] = game;

    Asteroids.MovingObject.call(this, moHash);
  };

  Asteroids.Util.inherits(ShipForceField, Asteroids.MovingObject);

})();
