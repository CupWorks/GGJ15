/// <reference path="framework/fullscreenState.ts"/>

module Octopussy {
    export class Level extends FullscreenState {

        private tileSize: number =  128;

        private levelData: string[] = 
        [
            '###########',
            '###########',
            '##      S##',
            '## #### ###',
            '## #### ###',
            '##      ###',
            '###########',
            '###########'
        ];

        private visibleTiles: Phaser.Sprite[][] = 
        [
            [null, null, null, null, null],
            [null, null, null, null, null],
            [null, null, null, null, null],
            [null, null, null, null, null],
            [null, null, null, null, null],
        ];

        private playerPosition: Phaser.Point = new Phaser.Point();

        player: Phaser.Sprite;
        levelMusic: Phaser.Sound;
        hud: Phaser.Sprite;

        preload() {

            this.load.image('tile_block', 'assets/level/tile_block.png');
            this.load.image('tile_way', 'assets/level/tile_way.png');

            //this.load.image('hud','assets/level1/interface_mock_1.png');
            //this.load.spritesheet('player', 'assets/level1/Sprite_2500x500er.png', 500, 500);
            //this.load.audio('level1_background','assets/level1/sounds/octodwarfs_sad2.mp3');

        }

        create() {

            super.create();

            this.createLevel();

            this.bindKeys();
            this.initLevel();
        }

        private createLevel() {

            for(var r = 0; r < this.levelData.length; r++) {

                for(var c = 0; c < this.levelData[r].length; c++) {

                    var symbol = this.levelData[r][c];

                    switch (symbol) {
                        case 'S':
                            this.playerPosition.set(c, r);                    
                            break;
                    }

                }
            };  

            for(var r = 0; r < 5; r++) {

                for(var c = 0; c < 5; c++) {

                    this.visibleTiles[r][c] = this.add.sprite(0, 0, 'tile_block');
                }
            };

            this.updatePosition(this.playerPosition); 
        }

        private updatePosition(position: Phaser.Point) {            

            for(var r = 0; r < 5; r++) {

                for(var c = 0; c < 5; c++) {

                    var symbol = this.levelData[position.y + r - 2][position.x + c - 2];
                    var sprite = this.visibleTiles[c][r];

                    switch (symbol) {

                        case '#':
                            sprite.loadTexture('tile_block', 0);
                        break;

                        case 'S':
                        case ' ':
                            sprite.loadTexture('tile_way', 0);
                        break;
                    }

                    sprite.position.x = this.tileSize * (c - 2) + this.game.world.centerX - this.tileSize / 2;
                    sprite.position.y = this.tileSize * (r - 2) + this.game.world.centerY - this.tileSize / 2;
                }
            };
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

            this.stage.setBackgroundColor('#C0C0C0');

            //this.player = this.initPlayer();
            //this.initHud();
            //this.initSound();

        }

        initSound() {

            this.levelMusic = this.add.audio('level1_background', 1, true);
            this.levelMusic.play('', 0, 1, true);
        }

        initHud() {

            this.hud = this.add.sprite(0, 0, 'hud');
            this.hud.fixedToCamera = true;
        }

        initPlayer() {

            var player = this.add.sprite(730, 320, 'player');
            player.scale.setTo(0.8, 0.8);
            player.anchor.setTo(0.5, 0.5);
            player.animations.add('up', [0], 10, false);
            player.animations.add('down', [1], 10, false);
            player.animations.add('waiting', [2], 10, false);
            player.animations.add('right', [3], 10, false);
            player.animations.add('left', [4], 10, false);
            player.animations.play('waiting');

            return player;
        }

        onCollusion() {

            console.log('collusion');
        }

        update() {


            var downKey = this.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            downKey.onDown.add(this.downPressed, this);
            var upKey = this.input.keyboard.addKey(Phaser.Keyboard.UP);
            upKey.onDown.add(this.upPressed, this);
            var leftKey = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            leftKey.onDown.add(this.leftPressed, this);
            var rightKey = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
            rightKey.onDown.add(this.rightPressed, this);
        }

        private canMove(x: number, y: number): boolean {

            var symbol = this.levelData[y][x];

            if(symbol == '#') {

                return false;
            }

            return true;
        }

        private leftPressed() {

            if(this.canMove(this.playerPosition.x - 1, this.playerPosition.y)) {

                this.playerPosition.x = this.playerPosition.x - 1;
                this.updatePosition(this.playerPosition);
            }
        }  

        private rightPressed() {

            if(this.canMove(this.playerPosition.x + 1, this.playerPosition.y)) {

                this.playerPosition.x = this.playerPosition.x + 1;
                this.updatePosition(this.playerPosition);
            }
        }  

        private upPressed() {

            if(this.canMove(this.playerPosition.x , this.playerPosition.y - 1)) {

                this.playerPosition.y = this.playerPosition.y - 1;
                this.updatePosition(this.playerPosition);
            }
        }  

        private downPressed() {

            if(this.canMove(this.playerPosition.x , this.playerPosition.y + 1)) {

                this.playerPosition.y = this.playerPosition.y + 1;
                this.updatePosition(this.playerPosition);
            }
        }   
    }

}