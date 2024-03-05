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
var jumps = 2;
//
var restartButton;
//
var score = 0;
//
var worldWidht = 9600
function preload() {
    this.load.image('fon+', 'assets/fon+.jpg');
    //
    this.load.image('But1', 'assets/Button_1.png');
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
    this.load.image('win1', 'assets/win1.webp');
}
function create() {

    //
    this.add.tileSprite(0, 0, worldWidht, 1080, "fon+").setOrigin(0, 0);

    platforms = this.physics.add.staticGroup();
    //this.add.image(960, 500, 'sky');
    
    for (var x = 77; x < worldWidht; x = x + 76) {
        console.log(x)
        platforms.create(x, 892, 'ground2').setOrigin(0,0).refreshBody();
    }
    ; kyst = this.physics.add.staticGroup();
    
     platforms.create(40, 932, 'ground1').setScale(1).refreshBody();
    // platforms.create(127, 932, 'ground2').setScale(1).refreshBody();
    // platforms.create(203, 932, 'ground2').setScale(1).refreshBody();
    // platforms.create(279, 932, 'ground2').setScale(1).refreshBody();
    // platforms.create(355, 932, 'ground2').setScale(1).refreshBody();
    // platforms.create(431, 932, 'ground2').setScale(1).refreshBody();
    // platforms.create(507, 932, 'ground2').setScale(1).refreshBody();
    // platforms.create(583, 932, 'ground2').setScale(1).refreshBody();
    // platforms.create(659, 932, 'ground2').setScale(1).refreshBody();
    // platforms.create(735, 932, 'ground2').setScale(1).refreshBody();
    // platforms.create(811, 932, 'ground2').setScale(1).refreshBody();
    // platforms.create(887, 932, 'ground2').setScale(1).refreshBody();
    // platforms.create(963, 932, 'ground2').setScale(1).refreshBody();
    // platforms.create(1039, 932, 'ground2').setScale(1).refreshBody();
    // platforms.create(1115, 932, 'ground2').setScale(1).refreshBody();
    // platforms.create(1191, 932, 'ground2').setScale(1).refreshBody();
    // platforms.create(1267, 932, 'ground2').setScale(1).refreshBody();
    // platforms.create(1343, 932, 'ground2').setScale(1).refreshBody();
    // platforms.create(1419, 932, 'ground2').setScale(1).refreshBody();
    // platforms.create(1495, 932, 'ground2').setScale(1).refreshBody();
    // platforms.create(1571, 932, 'ground2').setScale(1).refreshBody();
    // platforms.create(1647, 932, 'ground2').setScale(1).refreshBody();
    // platforms.create(1723, 932, 'ground2').setScale(1).refreshBody();
    // platforms.create(1799, 932, 'ground2').setScale(1).refreshBody();
    // platforms.create(1875, 932, 'ground3').setScale(1).refreshBody();

    player = this.physics.add.sprite(100, 450, 'dude').setDepth(5);
    player.setBounce(0.2);
    player.setCollideWorldBounds(false);
    //
    //платформа кусти,дерева,камні
    for (var y = 0; y < worldWidht; y = y + 1920) {
        console.log(y)
        kyst.create(1100+y, 874, 'ks_1').setScale(1).refreshBody().setDepth(Phaser.Math.Between(1, 10));
        kyst.create(1700+y, 874, 'ks_2').setScale(1).refreshBody().setDepth(Phaser.Math.Between(1, 10));
        kyst.create(450+y, 879, 's_1').setScale(1).refreshBody().setDepth(Phaser.Math.Between(1, 10));
        kyst.create(1470+y, 880, 'd_3').setScale(1).refreshBody().setDepth(Phaser.Math.Between(1, 10));
        kyst.create(600+y, 801, 'd_1').setScale(1).refreshBody().setDepth(Phaser.Math.Between(1, 10));
        kyst.create(2000+y, 810, 'd_2').setScale(1).refreshBody().setDepth(Phaser.Math.Between(1, 10));
            //
        platforms.create(1825+y, 754, 'ground_3').setScale(1).refreshBody();
        platforms.create(1749+y, 754, 'ground_2').setScale(1).refreshBody();
        platforms.create(1674+y, 753, 'ground_1').setScale(1).refreshBody();
        kyst.create(1750+y, 644, 'd_2').setScale(1).refreshBody().setDepth(Phaser.Math.Between(1, 10));
        kyst.create(1670+y, 712, 's_1').setScale(1).refreshBody().setDepth(Phaser.Math.Between(1, 10));
        //
        platforms.create(1425+y, 614, 'ground_3').setScale(1).refreshBody();
        platforms.create(1349+y, 614, 'ground_2').setScale(1).refreshBody();
        platforms.create(1274+y, 614, 'ground_2').setScale(1).refreshBody();
        platforms.create(1198+y, 613, 'ground_1').setScale(1).refreshBody();
        kyst.create(1300+y, 567, 'ks_1').setScale(1).refreshBody().setDepth(Phaser.Math.Between(1, 10));
        //
        platforms.create(1025+y, 714, 'ground_3').setScale(1).refreshBody();
        platforms.create(949+y, 714, 'ground_2').setScale(1).refreshBody();
        platforms.create(874+y, 714, 'ground_2').setScale(1).refreshBody();
        platforms.create(798+y, 713, 'ground_1').setScale(1).refreshBody();
        kyst.create(850+y, 672, 's_1').setScale(1).refreshBody().setDepth(Phaser.Math.Between(1, 10));
        //
        platforms.create(725+y, 534, 'ground_3').setScale(1).refreshBody();
        platforms.create(649+y, 534, 'ground_2').setScale(1).refreshBody();
        platforms.create(572+y, 534, 'ground_2').setScale(1).refreshBody();
        platforms.create(497+y, 534, 'ground_2').setScale(1).refreshBody();
        platforms.create(422+y, 533, 'ground_1').setScale(1).refreshBody();
        kyst.create(600+y, 487, 'ks_1').setScale(1).refreshBody().setDepth(Phaser.Math.Between(1, 10));
        kyst.create(470+y, 493, 'd_3').setScale(1).refreshBody().setDepth(Phaser.Math.Between(1, 10));
        //
        platforms.create(297+y, 384, 'ground_3').setScale(1).refreshBody();
        platforms.create(222+y, 383, 'ground_1').setScale(1).refreshBody();
        kyst.create(250+y, 274, 'd_2').setScale(1).refreshBody().setDepth(Phaser.Math.Between(1, 10));
        //
    }
    //-----------------
    win = this.physics.add.group();
    win.create(9525, 600, 'win1').setDisplaySize(70, 70);
    //-------------------
    but = this.physics.add.staticGroup();
    but.create(100, 120, 'But1').setScale(1).refreshBody();
    //
    this.cameras.main.setBounds(0,0,worldWidht,1080);
    this.physics.world.setBounds(0,0,worldWidht,1080);
    this.cameras.main.startFollow(player);
    //
    restartButton = this.add.sprite(100, 120, 'But1')
        .setInteractive()
        .on('pointerdown', function () {
            restartGame();
        });

    restartButton.visible = false;
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 4 }],
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
        repeat: 135,
        setXY: { x: 180, y: 0, stepX: 70 }
    });

    stars.children.iterate(function (child) {

        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    bombs = this.physics.add.group();

    scoreText = this.add.text(200, 100, 'score: 0', { fontSize: '32px', fill: '#000' });

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(bombs, platforms);
    this.physics.add.overlap(player, stars, collectStar, null, this);
    this.physics.add.collider(player, bombs, hitBomb, null, this);
    jumpSound = this.sound.add('jumpSound');
    this.physics.add.collider(win, platforms);
    badGuy = this.physics.add.sprite(1140, 450, 'dude_angry').setDepth(4);
    badGuy.setBounce(0.2);
    badGuy.setCollideWorldBounds(true);
    badGuy.setGravityY(0);
    this.physics.add.collider(badGuy, platforms,);
    this.physics.add.collider(player, badGuy,hitBomb, null, this);

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

function update() {
    if (gameOver) {
        return;
    }
    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
        jumpSound.play();
        jumps--;
    }
    if (cursors.up.isUp && player.body.touching.down) {
        jumps = 2;
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
    player.x = Phaser.Math.Clamp(player.x, 0, worldWidht - player.width);
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
        endGame(false);

    });
    if (badGuy.body.velocity.x > 0) {
        badGuy.anims.play('badGuyRight', true);
    } else if (badGuy.body.velocity.x < 0) {
        badGuy.anims.play('badGuyLeft', true);
    } else {
        badGuy.anims.play('badGuyTurn');
    }
    //
    if (stars.countActive(true) === 0) {
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
        var winText = this.add.text(config.width / 2 - 100, config.height / 2 - 50, 'You Lose!', { fontSize: '32px', fill: '#fff' });
    }

    gameOver = true;
    restartButton.visible = true;
}

function collectStar(player, star) {
    star.disableBody(true, true);
    score += 10;
    scoreText.setText('Score: ' + score);
    var x = Phaser.Math.Between(0, config.width);
    var bomb = bombs.create(x, 16, 'bomb');
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    bomb.allowGravity = false;

    if (stars.countActive(true) === 0) {
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
function hitBomb(player, bomb) {
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');
    gameOver = true;
    var winText = this.add.text(config.width / 2 - 100, config.height / 2 - 50, 'You are dead!', { fontSize: '32px', fill: '#fff' });
}

function restartGame() {
    // Stop the physics
    this.physics.pause();

    // Clean up game objects
    player.destroy();
    badGuy.destroy();
    stars.clear(true, true);
    bombs.clear(true, true);
    platforms.clear(true, true);
    kyst.clear(true, true);
    but.clear(true, true);
    restartButton.destroy();

    // Restart the scene
    this.scene.restart();
}
