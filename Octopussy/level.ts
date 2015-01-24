/// <reference path="framework/fullscreenState.ts"/>

module Octopussy {
    export class Level extends FullscreenState {

        player: any;
        levelMusic: any;
        hud: any;
        layer:any;
        collusion:any;

        preload() {
            this.load.image('level1', 'assets/level1/level_test.png');
            this.load.image('hud','assets/level1/interface_mock_1.png');
            this.load.tilemap('level1map', 'assets/level1/level_test.json', null, Phaser.Tilemap.TILED_JSON);
            this.load.spritesheet('player', 'assets/level1/Sprite_2500x500er.png', 500, 500);
            this.load.audio('level1_background','assets/level1/sounds/octodwarfs_sad2.mp3');

        }

        create() {
            super.create();
            this.bindKeys();
            this.initLevel();
        }

        bindKeys() {
            this.game.input.keyboard.addKeyCapture([
                Phaser.Keyboard.LEFT,
                Phaser.Keyboard.RIGHT,
                Phaser.Keyboard.UP,
                Phaser.Keyboard.DOWN
            ]);
        }

        initLevel() {
            this.stage.setBackgroundColor('#000000');
            var map = this.add.tilemap('level1map');
            map.addTilesetImage('level_test', 'level1');
            console.log('map',map);
            this.collusion = map.createLayer('Background');
            this.layer = map.createLayer('Allowed');
            this.layer.resizeWorld();
            this.collusion.resizeWorld();
            this.physics.arcade.enable(this.collusion);
            this.collusion.enableBody = true;
            this.game.camera.x+=1000;
            this.game.camera.y+=600;
            this.player = this.initPlayer();
            this.initHud();
            this.initSound();

        }

        initSound() {
            this.levelMusic = this.add.audio('level1_background',1,true);
            this.levelMusic.play('',0,1,true);
        }

        initHud() {
            this.hud = this.add.sprite(0, 0, 'hud');
            this.hud.fixedToCamera = true;
        }

        initPlayer() {
            var player = this.add.sprite(768, 360, 'player');
            player.scale.setTo(0.8, 0.8);
            player.anchor.setTo(0.5, 0.5);
            player.animations.add('up', [0], 10, false);
            player.animations.add('down', [1], 10, false);
            player.animations.add('waiting', [2], 10, false);
            player.animations.add('right', [3], 10, false);
            player.animations.add('left', [4], 10, false);
            this.physics.arcade.enable(player);
            player.fixedToCamera = true;
            player.animations.play('waiting');
            return player;
        }

        update() {
            this.physics.arcade.collide(this.player, this.collusion,function(){
                console.log('collusion');
            });

            if (this.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                this.camera.y -= 4;
                this.player.animations.play('up');
            }
            else if (this.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
                this.camera.y += 4;
                this.player.animations.play('down');
            }
            else if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this.game.camera.x -= 4;
                this.player.animations.play('left');
            }
            else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                this.camera.x += 4;
                this.player.animations.play('right');
            } else {
                this.player.animations.play('waiting');
            }
         }

       render() {
           //this.game.debug.cameraInfo(this.game.camera, 32, 32);
       }
    }

}