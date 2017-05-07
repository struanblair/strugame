var playState = {

  create: function() {
    //  A simple background for our game
    this.background = game.add.sprite(0, 0, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    this.platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    this.platforms.enableBody = true;

    // Here we create the ground.
    this.ground = this.platforms.create(0, game.world.height - 64, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    this.ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    this.ground.body.immovable = true;

    //  Now let's create two ledges
    this.ledge = this.platforms.create(400, 400, 'ground');

    this.ledge.body.immovable = true;

    this.ledge = this.platforms.create(-150, 250, 'ground');

    this.ledge.body.immovable = true;

    this.player = game.add.sprite(32, game.world.height - 150, 'tenth');
    this.cybercontroller = game.add.sprite(game.world.width - 64, game.world.height - 270, 'cybercontroller');
    this.dalek = game.add.sprite(32, game.world.height - 400, 'dalek');
    this.legocyberman = game.add.sprite(100, game.world.height - 200, 'legocyberman');

    game.physics.arcade.enable(this.player);
    game.physics.arcade.enable(this.cybercontroller);
    game.physics.arcade.enable(this.dalek);
    game.physics.arcade.enable(this.legocyberman);

    this.legocyberman.body.gravity.y = 300;

    this.player.body.bounce.y = 0.2;
    this.player.body.gravity.y = 300;
    this.player.body.collideWorldBounds = true;

    this.player.animations.add('left', [2], 10, true);
    this.player.animations.add('right', [0], 10, true);

    this.stars = game.add.group();
    this.stars.enableBody = true;
    

    for (var i = 0; i < 12; i++) {
      var star = this.stars.create(i * 70, 0, 'star');
      star.body.gravity.y = 6;
      star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }

    this.diamonds = game.add.group();
    this.diamonds.enableBody = true;

    for (var i = 0; i < 4; i++) {
      var diamond = this.diamonds.create(i * 250, 0, 'diamond');
      diamond.body.gravity.y = 40;
      diamond.body.bounce.y = 0.5;
    }

    this.baddies = game.add.group();
    this.baddies.enableBody = true;
    this.baddies.add(this.cybercontroller);
    this.baddies.add(this.legocyberman);
    this.baddies.add(this.dalek);

    this.cursors = game.input.keyboard.createCursorKeys();
    this.scoreText = game.add.text(16, 16, 'score: ' + game.global.score, { fontSize: '32px', fill: '#000' });
    this.livesText = game.add.text(600, 16, 'lives: ' + game.global.lives, { fontSize: '32px', fill: '#000' });

  },

  update: function() {
    game.physics.arcade.collide(this.player, this.platforms);
    game.physics.arcade.collide(this.legocyberman, this.platforms); 
    game.physics.arcade.collide(this.baddies, this.platforms);
    game.physics.arcade.collide(this.stars, this.platforms);
    game.physics.arcade.collide(this.diamonds, this.platforms);
    game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);
    game.physics.arcade.overlap(this.player, this.diamonds, this.bumpIntoDiamond, null, this);
    game.physics.arcade.overlap(this.player, this.baddies, this.collideWithBaddies, null, this);

    this.movePlayer(this.player, this.cursors);
  },

  movePlayer: function(player, cursors) {
    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
      //  Move to the left
      player.body.velocity.x = -150;

      player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
      //  Move to the right
      player.body.velocity.x = 150;

      player.animations.play('right');
    }
    else
    {
      //  Stand still
      player.animations.stop();

      player.frame = 1;
    }

    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down)
    {
      player.body.velocity.y = -350;
    }
  },

  collideWithBaddies: function(player, baddie) {
    game.global.lives -= 1;
    this.livesText.text = 'Lives: ' + game.global.lives;
  },

  collectStar: function(player, star) {
    star.kill();
    game.global.score += 10;
    this.scoreText.text = 'Score: ' + game.global.score;
  },

  bumpIntoDiamond: function(player, diamond) {
    diamond.kill();
    game.global.score -= 2;
    this.scoreText.text = 'Score: ' + game.global.score;
  }
};
