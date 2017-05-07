var loadState = {

	preload: function () {		
		// Add a loading label 
		var loadingLabel = game.add.text(game.world.centerX, 150, 'loading...', { font: '30px Arial', fill: '#ffffff' });
		loadingLabel.anchor.setTo(0.5, 0.5);

		// Add a progress bar
		var progressBar = game.add.sprite(game.world.centerX, 200, 'progressBar');
		progressBar.anchor.setTo(0.5, 0.5);
		game.load.setPreloadSprite(progressBar);

		// Load all assets
		game.load.spritesheet('mute', 'assets/muteButton.png', 28, 22);
		game.load.image('sky', 'assets/sky.png');
		game.load.image('ground', 'assets/platform.png');
		game.load.image('star', 'assets/star.png');
		game.load.image('diamond', 'assets/diamond.png');
		game.load.spritesheet('dalek', 'assets/dalek.png', 48, 57);
		game.load.spritesheet('cybercontroller', 'assets/cybercontroller.png', 48, 73);
		game.load.spritesheet('legocyberman', 'assets/legocyberman.png', 43, 71);
		game.load.spritesheet('tenth', 'assets/tenth.png', 48, 86);
	},

	create: function() { 
		game.state.start('menu');
	}
	};
