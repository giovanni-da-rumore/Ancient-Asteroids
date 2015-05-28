;(function() {
  "use strict";
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var RADIUS = 53;
  var COLOR = "#388E8E";


  var Asteroid = Asteroids.Asteroid = function (pos, game, radius, color) {
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
    moHash["vel"] = randomVel(4);
    moHash["game"] = game;

    Asteroids.MovingObject.call(this, moHash);
  };

  var randomVel = function(length) {
    // length = max, -length = min
    var x = (Math.random() * (length - -(length))) + -(length);
    var y = (Math.random() * (length - -(length))) + -(length);
    return [x,y];
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

})();
