;(function() {
  "use strict";
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };

  GameView.prototype.start = function() {
    this.bindKeyHandlers();
    window.setInterval((function() {
      this.game.step();
      this.game.draw(this.ctx);
    }).bind(this), 20);
  };

  GameView.prototype.bindKeyHandlers = function() {
    var that = this;
    key('w, up, i', function() {
      that.game.ship.power("forward")}
    );
    key('s, down, k', function () {
      that.game.ship.power("back")
    });
    key('a, left, j', function () {
      that.game.ship.power("left")
    });
    key('d, right, l', function () {
      that.game.ship.power("right")
    });
    key('space', function () {
      that.game.ship.fireBullet();
    });

  };


})();
