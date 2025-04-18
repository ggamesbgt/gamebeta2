const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 400,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 600 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);
let player, cursors, platforms;

function preload() {
  this.load.image('sky', 'https://labs.phaser.io/assets/skies/sky1.png');
  this.load.image('ground', 'https://labs.phaser.io/assets/platform.png');
  this.load.image('player', 'https://labs.phaser.io/assets/sprites/phaser-dude.png');
}

function create() {
  this.add.image(400, 200, 'sky');

  // Platforms group
  platforms = this.physics.add.staticGroup();
  platforms.create(400, 390, 'ground').setScale(2).refreshBody();

  // Player
  player = this.physics.add.sprite(100, 300, 'player');
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  // Physics collision
  this.physics.add.collider(player, platforms);

  // Keyboard input
  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  player.setVelocityX(0);

  if (cursors.left.isDown) {
    player.setVelocityX(-160);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330);
  }
}
