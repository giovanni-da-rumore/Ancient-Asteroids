# Ancient Asteroids

> "What mad pursuit? What struggle to escape?
What wild ecstacy?"


[Live Link](giovanni-da-rumore.github.io/Ancient-Asteroids)

# About

"Ancient Asteroids: War Among the Ruins" is a "Classical" spin off of the classic arcade game from which it takes its name.
In this game, however, instead playing through space and shooting asteroids, one plays across
Ancient Greek ruins (mostly temples) and shoots Ancient Greek vase paintings.

The levels 7 levels are Segesta, Paestum, Athens, Selinunte, Agrigento, Taormina and Delphi.
Background images and red-figure vase paintings (all of which are images of real greek vases)
can be found in the [images folder](./iamges).


The game's controls are rather simple: one uses the arrow keys to move the ship
and presses the spacebar to shoot. For menus, one presses P to pause or play the game and M to pause or play it's background music, Kraftwerk's *Europe Endless.*

> "Heard melodies are sweet, but those unheard
Are sweeter; therefore, ye soft pipes, play on;"

To complete a level, the player must destroy all of the
"asteroids" or vases, upon she will be taken to another idyllic scene for more destruction.

#Code

Ancient Asteroids is built primarily through Javascript and HTML5 Canvas.
It uses Jquery for click events, such as pausing, playing, moving and shooting.
Levels are done through CSS and Jquery transition events and pausing is done through using Jquery to toggle a modal.
Positioning is done through Canvas drawing and basic trig.


Probably the most difficult part of the game was keeping track of its state (i.e. paused, playing, transitioning), where all objects are, and how to act accordingly. The [Game class](./bin/game.js) is mostly responsible for altering the game according to current data, e.g. when objects collide and how to react, how many asteroids to add per level, when and where to spawn them according to the ship's position or the game's state.

The [Game class](./bin/game.js) is where one would go to alter difficulty, by changing asteroid size, number of asteroids per level, or number of lives. One would go to the [Asteroid class](./bin/asteroid.js) to alter the number of asteroids that spawn when a parent asteroid is shot, or the average asteroid speed.


The overall game itself (an endless setInterval loop) is run through the [GameView class](gameView.js), which is also responsible for click handlers. It is sort of the go-between (or Hermes, if you will) for the back and [front](./index.html) ends of the game.

In order to track whether one is holding down on a key, (e.g. allow a player to move continuously forward and change directions while shooting) I had to first record when specific key down and key up events happened. But more than that, I had to stick a keyhandler in the GameView's setInterval loop, to continue registering said key as down until its up event occurred. To compensate for such constant checking, the ship's velocity and direction are altered in [very small increments](./bin/ship.js), giving the object smooth maneuvering.


As one can imagine, since almost everything in the game moves, keeping different tabs on each object would involve a lot of repetition. By having all "moving objects" inherit from a [MovingObject](./bin/movingObject.js) class, I was able to DRY up a good bit of the code.

A last point of interest, the game uses simple trig to change an object's positioning based on it's
current velocity. This also means that the ships velocity is determined by the angle it's facing; thus, the left and right keys
don't actually alter it's velocity, just positioning. One can get a better idea of trig handling browsing the [ship](./bin/ship.js) file.
