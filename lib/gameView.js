;(function() {
  "use strict";
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.keys = {37: false, 38: false, 39: false, 40: false}
  };

  GameView.prototype.start = function() {
    this.bindKeyHandlers();
    window.setInterval((function() {
      this.game.step();
      this.checkPressed();
      this.game.draw(this.ctx);
    }).bind(this), 20);
  };

  GameView.prototype.bindKeyHandlers = function() {
    var canFire = true
    var keys = {37: false, 38: false, 39: false, 40: false}

    var that = this;
  $(document).keydown(function (e) {
    var key = e.keyCode
    if (key in that.keys) {
      that.keys[key] = true;
    }
    if (that.keys[38]) {
      game.ship.power("forward")
    }
    if (that.keys[40]) {
      game.ship.power("back")
    }
    if (that.keys[37]) {
      game.ship.power("left")
    }
    if (that.keys[39]) {
      game.ship.power("right")
    }

    if (key == 32 && canFire ) {
      game.ship.fireBullet();
      canFire = false;
    }

  });

  $(document).keyup(function (e) {
    var key = e.keyCode
    if (key in that.keys) {
      that.keys[key] = false;
    }
    if (key == 32) {
       canFire = true;
    }
  });


  GameView.prototype.checkPressed = function () {

    if (that.keys[38]) {
      game.ship.power("forward")
    }
    if (that.keys[40]) {
      game.ship.power("back")
    }
    if (that.keys[37]) {
      game.ship.power("left")
    }
    if (that.keys[39]) {
      game.ship.power("right")
    }

  }







}


})();
