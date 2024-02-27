var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
var player;
var stars;
var bombs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;
var game = new Phaser.Game(config);
var badGuy;
var jumpSound;
//
var restartButton;
//
function preload ()
{
    this.load.image('ground1', 'assets/1pl.png');
    this.load.image('ground2', 'assets/2pl.png');
    this.load.image('ground3', 'assets/3pl.png');
    this.load.image('ground_1', 'assets/1up.png');
    this.load.image('ground_2', 'assets/2up.png');
    this.load.image('ground_3', 'assets/3up.png');

    this.load.image('ks_1', 'assets/kyst1.png');
    this.load.image('ks_2', 'assets/kyst2.png');
    this.load.image('d_1', 'assets/dub1.png');
    this.load.image('d_2', 'assets/dub2.png');
    this.load.image('d_3', 'assets/dub3.png');
    this.load.image('s_1', 'assets/stone.png');

    this.load.image('sky', 'assets/fon.jpg');
    //
    this.load.image('ground', 'assets/platform1.png');
    //
    this.load.image('star', 'assets/pngwing.com.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/dude1.png', { frameWidth: 32, frameHeight: 48 });
    this.load.audio('jumpSound', 'assets/pryjok-mario.mp3');
    this.load.spritesheet('dude_angry', 'assets/dude_angry.png', { frameWidth: 32, frameHeight: 48 });
}
function create ()
{
    restartButton = this.add.text(16, 50, 'Restart', { fontSize: '24px', fill: '#000' })
        .setInteractive()
        .on('pointerdown', restartGame);

    this.input.keyboard.on('keydown-SPACE', function (event) {
        if (gameOver) {
            restartGame.call(this);
        }
    }, this);
        //
    this.add.image(960, 500, 'sky');
    platforms = this.physics.add.staticGroup();
    platforms.create(50, 932, 'ground1').setScale(1).refreshBody();
    platforms.create(127, 932, 'ground2').setScale(1).refreshBody();
    platforms.create(203, 932, 'ground2').setScale(1).refreshBody();
    platforms.create(279, 932, 'ground2').setScale(1).refreshBody();
    platforms.create(355, 932, 'ground2').setScale(1).refreshBody();
    platforms.create(431, 932, 'ground2').setScale(1).refreshBody();
    platforms.create(507, 932, 'ground2').setScale(1).refreshBody();
    platforms.create(583, 932, 'ground2').setScale(1).refreshBody();
    platforms.create(659, 932, 'ground2').setScale(1).refreshBody();
    platforms.create(735, 932, 'ground2').setScale(1).refreshBody();
    platforms.create(811, 932, 'ground2').setScale(1).refreshBody();
    platforms.create(887, 932, 'ground2').setScale(1).refreshBody();
    platforms.create(963, 932, 'ground2').setScale(1).refreshBody();
    platforms.create(1039, 932, 'ground2').setScale(1).refreshBody();
    platforms.create(1115, 932, 'ground2').setScale(1).refreshBody();
    platforms.create(1191, 932, 'ground2').setScale(1).refreshBody();
    platforms.create(1267, 932, 'ground2').setScale(1).refreshBody();
    platforms.create(1343, 932, 'ground2').setScale(1).refreshBody();
    platforms.create(1419, 932, 'ground2').setScale(1).refreshBody();
    platforms.create(1495, 932, 'ground2').setScale(1).refreshBody();
    platforms.create(1571, 932, 'ground2').setScale(1).refreshBody();
    platforms.create(1647, 932, 'ground2').setScale(1).refreshBody();
    platforms.create(1723, 932, 'ground2').setScale(1).refreshBody();
    platforms.create(1799, 932, 'ground2').setScale(1).refreshBody();
    platforms.create(1875, 932, 'ground3').setScale(1).refreshBody();    
    //
    platforms.create(1825, 754, 'ground_3').setScale(1).refreshBody();
    platforms.create(1749, 754, 'ground_2').setScale(1).refreshBody();
    platforms.create(1674, 753, 'ground_1').setScale(1).refreshBody();
    //
    platforms.create(1425, 614, 'ground_3').setScale(1).refreshBody();
    platforms.create(1349, 614, 'ground_2').setScale(1).refreshBody();
    platforms.create(1274, 614, 'ground_2').setScale(1).refreshBody();
    platforms.create(1198, 613, 'ground_1').setScale(1).refreshBody();
    //
    platforms.create(1025, 714, 'ground_3').setScale(1).refreshBody();
    platforms.create(949, 714, 'ground_2').setScale(1).refreshBody();
    platforms.create(874, 714, 'ground_2').setScale(1).refreshBody();
    platforms.create(798, 713, 'ground_1').setScale(1).refreshBody();
    //
    platforms.create(725, 534, 'ground_3').setScale(1).refreshBody();
    platforms.create(649, 534, 'ground_2').setScale(1).refreshBody();
    platforms.create(572, 534, 'ground_2').setScale(1).refreshBody();
    platforms.create(497, 534, 'ground_2').setScale(1).refreshBody();
    platforms.create(422, 533, 'ground_1').setScale(1).refreshBody();
    //
    platforms.create(297, 384, 'ground_3').setScale(1).refreshBody();
    platforms.create(222, 383, 'ground_1').setScale(1).refreshBody();
    //
    player = this.physics.add.sprite(100, 450, 'dude');

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    //
;   kyst = this.physics.add.staticGroup();
    kyst.create(1100, 874, 'ks_1').setScale(1).refreshBody();
    kyst.create(1700, 874, 'ks_2').setScale(1).refreshBody();
    kyst.create(600, 487, 'ks_1').setScale(1).refreshBody();
    kyst.create(1300, 567, 'ks_1').setScale(1).refreshBody();
    kyst.create(600, 801, 'd_1').setScale(1).refreshBody();
    kyst.create(250, 273, 'd_2').setScale(1).refreshBody();
    kyst.create(1750, 643, 'd_2').setScale(1).refreshBody();
    kyst.create(450, 879, 's_1').setScale(1).refreshBody();
    kyst.create(850, 672, 's_1').setScale(1).refreshBody();
    kyst.create(1670, 712, 's_1').setScale(1).refreshBody();
    kyst.create(470, 493, 'd_3').setScale(1).refreshBody();
    kyst.create(1470, 880, 'd_3').setScale(1).refreshBody();
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    cursors = this.input.keyboard.createCursorKeys();

    stars = this.physics.add.group({
        key: 'star',
        repeat:24,
        setXY: { x: 180, y: 0, stepX: 70 }
    });

    stars.children.iterate(function (child) {

        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    bombs = this.physics.add.group();

    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(bombs, platforms);
    this.physics.add.overlap(player, stars, collectStar, null, this);
    this.physics.add.collider(player, bombs, hitBomb, null, this);
    jumpSound = this.sound.add('jumpSound');
    badGuy = this.physics.add.sprite(1140, 450, 'dude_angry');
    badGuy.setBounce(0.2);
    badGuy.setCollideWorldBounds(true);
    badGuy.setGravityY(0);
    this.physics.add.collider(badGuy, platforms);

    this.anims.create({
        key: 'badGuyLeft',
        frames: this.anims.generateFrameNumbers('dude_angry', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'badGuyTurn',
        frames: [{ key: 'dude_angry', frame: 4 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'badGuyRight',
        frames: this.anims.generateFrameNumbers('dude_angry', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

}

function update ()
{
    if (gameOver)
    {
        return;
    }
    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
        jumpSound.play();
    }
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play('left', true);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play('right', true);
    } else {
        player.setVelocityX(0);
        player.anims.play('turn');
    }
    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
        jumpSound.play();
    }
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play('left', true);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play('right', true);
    } else {
        player.setVelocityX(0);
        player.anims.play('turn');
    }
     if (Math.random() < 0.02) {
        badGuy.setVelocityX(Phaser.Math.Between(-200, 200));
    }
    this.physics.world.collide(player, badGuy, function () {
        endGame();
        
    });
    if (badGuy.body.velocity.x > 0) {
        badGuy.anims.play('badGuyRight', true);
    } else if (badGuy.body.velocity.x < 0) {
        badGuy.anims.play('badGuyLeft', true);
    } else {
        badGuy.anims.play('badGuyTurn');
    }
    //
    if (stars.countActive(true) === 0)
    {
        endGame(true); 
    }
}
//
function endGame(isWin) {
    this.physics.pause();
    
    if (isWin) {
        var winText = this.add.text(config.width / 2 - 100, config.height / 2 - 50, 'You Win!', { fontSize: '32px', fill: '#fff' });
    } else {
        player.setTint(0xff0000);
        player.anims.play('turn');
    }

    gameOver = true;
    restartButton.visible = true;
}

function collectStar (player, star)
{
    star.disableBody(true, true);
    score += 10;
    scoreText.setText('Score: ' + score);
    var x = Phaser.Math.Between(0, config.width);
    var bomb = bombs.create(x, 16, 'bomb');
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    bomb.allowGravity = false;

    if (stars.countActive(true) === 0)
    {
        stars.children.iterate(function (child) {
            child.enableBody(true, child.x, 0, true, true);
        });
        for (var i = 0; i < 12; i++) {
            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
            var newStar = stars.create(x, 0, 'star');
            newStar.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        }
        for (var i = 0; i < bombs.children.entries.length; i++) {
            bombs.children.entries[i].destroy();
        }
    }
}
function hitBomb (player, bomb)
{
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');
    gameOver = true;
    var winText = this.add.text(config.width / 2 - 100, config.height / 2 - 50, 'You Lose!', { fontSize: '32px', fill: '#fff' });
}
//
function restartGame() {
    gameOver = false;
    score = 0;
    this.scene.restart();
}