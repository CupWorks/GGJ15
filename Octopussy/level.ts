/// <reference path="framework/fullscreenState.ts"/>

module Octopussy {

    export enum Direction {
        Left, Up, Right, Down
    }

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
        private isUpdating: boolean = false;
        private playerPosition: Phaser.Point = new Phaser.Point();

        private keyMap : Phaser.Key[] = [null, null, null, null];

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

            this.bindKeys();
            this.createLevel();
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

            this.updateTilePositions();
        }

        private getPositionChange(direction: Direction) : Phaser.Point {

            var point = new Phaser.Point();

            switch (direction) {
                case Direction.Left:
                    point.x = -1;
                    break;

                case Direction.Right:
                    point.x = 1;
                    break;

                case Direction.Up:
                    point.y = -1;
                    break;

                case Direction.Down:
                    point.y = 1;
                    break;                
            }

            return point;
        }

        private startUpdatePosition(direction: Direction) {

            if(this.isUpdating == false) {

                this.isUpdating = true;

                var change = this.getPositionChange(direction);

                this.playerPosition.x = this.playerPosition.x + change.x;
                this.playerPosition.y = this.playerPosition.y + change.y;

                var timer = this.game.time.create(true);
                timer.add(1050, this.updateTilePositions, this);
                timer.start();

                for(var r = 0; r < 5; r++) {

                    for(var c = 0; c < 5; c++) {

                        var sprite = this.visibleTiles[c][r];

                        var spriteX = sprite.position.x - change.x * this.tileSize;
                        var spriteY = sprite.position.y - change.y * this.tileSize;

                        var tween = this.add.tween(sprite).to({ x: spriteX, y: spriteY }, 1000, Phaser.Easing.Linear.None, true);
                    }
                }
            }
        }

        private updateTilePositions() {  

            for(var r = 0; r < 5; r++) {

                for(var c = 0; c < 5; c++) {

                    var symbol = this.levelData[this.playerPosition.y + r - 2][this.playerPosition.x + c - 2];
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
            }

            this.isUpdating = false;
        }

        bindKeys() {

            this.keyMap[Direction.Left] = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            this.keyMap[Direction.Up] = this.input.keyboard.addKey(Phaser.Keyboard.UP);
            this.keyMap[Direction.Right] = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
            this.keyMap[Direction.Down] = this.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        }

        initLevel() {

            this.stage.setBackgroundColor('#FFFFFF');

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

        update() {

            if(this.keyMap[Direction.Left].isDown) {
                this.leftPressed();
            }
            if(this.keyMap[Direction.Up].isDown) {
                this.upPressed();
            }
            if(this.keyMap[Direction.Right].isDown) {
                this.rightPressed();
            }
            if(this.keyMap[Direction.Down].isDown) {
                this.downPressed();
            }
        }

        private canMove(direction: Direction): boolean {

            var change = this.getPositionChange(direction);
            var symbol = this.levelData[this.playerPosition.y + change.y][this.playerPosition.x + change.x];

            if(symbol == '#') {

                return false;
            }

            return true;
        }

        private leftPressed() {

            if(this.canMove(Direction.Left)) {

                this.startUpdatePosition(Direction.Left);
            }
        }  

        private rightPressed() {

            if(this.canMove(Direction.Right)) {

                this.startUpdatePosition(Direction.Right);
            }
        }   

        private upPressed() {

            if(this.canMove(Direction.Up)) {

                this.startUpdatePosition(Direction.Up);
            }
        }  

        private downPressed() {

            if(this.canMove(Direction.Down)) {

                this.startUpdatePosition(Direction.Down);
            }
        }   
    }

}