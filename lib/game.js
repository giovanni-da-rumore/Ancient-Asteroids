;(function() {
  "use strict";
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var DIMX = 1360;
  var DIMY = 820;
  var NUMASTEROIDS = 5;
  var LIVES = 5;
  var STATES = ["off", "playing", "paused"]
  var LEVELS = ["Segesta", "Paestum", "Athens", "Selinunte", "Argigento", "Taormina", "Delphi"];
  var VASEIMAGES = ["./images/alc_sappho.jpg", "./images/alc_sappho.jpg", "./images/alc_sappho.jpg",
                    "./images/mainad.jpg", "./images/ganymede.jpg", "./images/zeus.jpg", "./images/eros.jpg",
                    "./images/heracles.jpg", "./images/ganymede.jpg"]

  var Game = Asteroids.Game = function(width, height, highScore, state, numAsteroids) {
    this.backgroundFiles = ["./images/segesta.jpg", "./images/paestum.jpg", "./images/acropolis_2.jpg", "./images/selinunte.jpg", "./images/agrigento.jpg",
     "./images/taormina.jpg", "./images/delphi.jpg" ]
     this.backgrounds = [];
    this.loadBackgrounds();
    this.loadVaseImages();

    this.dimX = width || DIMX;
    this.dimY = height || DIMY;
    this.numAsteroids = numAsteroids || NUMASTEROIDS;
    this.lives = LIVES;
    this.highScore = highScore || 0;
    this.score = 0;
    this.state = state || "off";
    this.asteroids = [];
    this.bullets = [];
    this.addShip();
    this.allObjects = this.getAllObjects();
    this.addAsteroids();
    this.level = 0;
    this.newLevel = true;
    this.transitioning = false;
    this.loadImage();

  };

  Game.prototype.addAsteroids = function() {
    if (this.state != "playing") {
      return;
    }


    this.asteroidsAdded = true;
     if (this.numAsteroids % 2 === 0) {
       var numAsteroids = this.numAsteroids / 2;
       var oddLevel = false;
    } else {
      var numAsteroids = Math.floor(this.numAsteroids / 2) + this.numAsteroids % 2;
      var oddLevel = true;
    }

    while ( this.asteroids.length < numAsteroids) {
      if (this.asteroids.length + 1 === numAsteroids && oddLevel == true) {
          var asteroid = new Asteroids.Asteroid(this.randomPosition(), this, 80 / 1.6);
      } else {
        var asteroid = new Asteroids.Asteroid(this.randomPosition(), this)
      }
      if (asteroid.isCollidedWith(this.ship.forceField) && this.newLevel) {
        continue;
      } else {
        asteroid.addImage();
        this.asteroids.push(asteroid);
        this.allObjects.push(asteroid);
      }
    }

// slight hack to make first level a little more interesting by adding two asteroids
    if (this.level === 1 && this.asteroids.length < 2) {
    var asteroid = new Asteroids.Asteroid(this.randomPosition(), this, 80 / 1.6);
    asteroid.addImage();
    this.asteroids.push(asteroid);
    this.allObjects.push(asteroid);
    }


    this.newLevel = false;
  };


  Game.prototype.addObject = function (obj) {
    if (obj instanceof Asteroids.Asteroid) {
      this.asteroids.push(obj);
    } else if (obj instanceof Asteroids.Bullet) {
      this.bullets.push(obj);
    }
    this.allObjects.push(obj);
  };


  Game.prototype.addShip = function() {
    this.ship = new Asteroids.Ship(this);
  }

  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, this.dimX, this.dimY);
    ctx.drawImage(this.image, 0, 0, this.dimX, this.dimY)
    this.ship.draw(ctx);
    this.allObjects.forEach(function (object) {
        object.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function() {
    this.allObjects.forEach(function (object) {
      object.move();
    });
    this.ship.forceField.pos = this.ship.pos;
  };

  Game.prototype.randomPosition = function() {
    var x = Math.floor(Math.random() * (this.dimX));
    var y = Math.floor(Math.random() * (this.dimY));
    return [x, y];
  };

  Game.prototype.wrap = function(pos) {
    return [(pos[0]+this.dimX) % this.dimX, (pos[1]+this.dimY) % this.dimY];
  };

  Game.prototype.outOfBounds = function(pos) {
    return ((pos[0] > this.dimX || pos[0] < 0) ||
        (pos[1] > this.dimY || pos[1] < 0))
  };


  Game.prototype.checkCollisions = function() {
    for (var i = 0; i < this.allObjects.length; i++) {
      for (var j = i; j < this.allObjects.length; j++) {
        if (i === j) {
          continue;
        } else {
          if (this.allObjects[i].isCollidedWith(this.allObjects[j])) {
            this.allObjects[i].collideWith(this.allObjects[j]);
          }
        }
      }
    }
  };


  Game.prototype.step = function() {
    this.moveObjects();
    this.checkCollisions();
    this.ship.addDrag();
    this.levelCompleted();
  };

  Game.prototype.remove = function(obj) {
    this.allObjects.splice(this.allObjects.indexOf(obj),1);
    if (obj instanceof Asteroids.Asteroid) {
      this.asteroids.splice(this.asteroids.indexOf(obj),1);
    }
  };


  Game.prototype.getAllObjects = function () {
    return this.asteroids.concat(this.ship);
  };


  Game.prototype.levelCompleted = function () {
    if (this.asteroids.length === 0 && this.state === "playing") {

      if (this.asteroidsAdded) {
        this.numAsteroids += 1;
        this.level += 1;
      }

        var that = this;
        $(".curtain").toggleClass("show");
        $(".curtain").html("Level " + this.level + "!<br>" + LEVELS[(this.level - 1) % LEVELS.length]);
        this.transitioning = true;
        this.asteroidsAdded = false;

        var intervalID = setTimeout(function() {
          $(".curtain").toggleClass("show");
          that.transitioning = false;
          that.newLevel = true;
          that.loadImage();
          that.addAsteroids();
          that.newLevel = true;
          that.loadImage();
          that.addAsteroids();
        }, 1700);


    }

  }

  Game.prototype.loadImage = function () {
    var img = new Image();
    var numImgs = this.backgrounds.length;
    var index = (this.level - 1) % numImgs;
    if (index >= 0 && this.backgrounds.length > 1) {
      this.image = this.backgrounds[index];
    } else {
      img.src = "./images/segesta.jpg";
      this.image = img;
    }
  }


  Game.prototype.loadBackgrounds = function () {
    this.backgroundFiles.forEach(function (image) {
      var img = new Image();
      img.src = image;
      this.backgrounds.push(img);
    }.bind(this));

  }

  Game.prototype.loadVaseImages = function () {
    this.vaseImages = [];
    VASEIMAGES.forEach(function (image) {
      var img = new Image();
      img.src = image;
      this.vaseImages.push(img);
    }.bind(this));

  }



  Game.prototype.startNew = function () {
    this.asteroids = []
    this.addShip();
    this.allObjects = this.getAllObjects();
    this.score = 0;
    this.lives = 5;
    this.level = 1;
    this.numAsteroids = 1;
    this.loadImage();
    this.asteroidsAdded = false;

  }






})();
