/// <reference path="framework/fullscreenState.ts"/>

module Octopussy {

    export enum Direction {
        Left, Up, Right, Down
    }

    export class Level extends FullscreenState {

        private tileSize: number =  128;
        private levelData: string[] = 
        [
            '##############',
            '##############',
            '##      S## ##',
            '##T#### ### ##',
            '##T#### ### ##',
            '##          ##',
            '##############',
            '##############'
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

        private keyMap: Phaser.Key[] = [null, null, null, null];

        private moveSpeed: number = 5;

        player: Phaser.Sprite;
        levelMusic: Phaser.Sound;
        hud: Phaser.Sprite;
        lives: number = 7;
        liveSpritegroup: any;

        preload() {

            this.load.image('tile_block', 'assets/level/tile_block.png');
            this.load.image('tile_way', 'assets/level/tile_way.png');

            this.load.image('hud_mask','assets/level/hud/mask_hud_main.png');
            this.load.image('hud_btn_left','assets/level/hud/btn_hud_left.png');
            this.load.image('hud_btn_right','assets/level/hud/btn_hud_right.png');
            this.load.image('hud_btn_up','assets/level/hud/btn_hud_up.png');
            this.load.image('hud_btn_down','assets/level/hud/btn_hud_down.png');
            this.load.image('ico_hud_live','assets/level/hud/ico_hud_live.png');

            this.load.spritesheet('player', 'assets/tile_player_move.png', 512, 512);
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
                timer.add((1000 / this.moveSpeed) + 50, this.updateTilePositions, this);
                timer.start();

                for(var r = 0; r < 5; r++) {

                    for(var c = 0; c < 5; c++) {

                        var sprite = this.visibleTiles[c][r];

                        var spriteX = sprite.position.x - change.x * this.tileSize;
                        var spriteY = sprite.position.y - change.y * this.tileSize;

                        var tween = this.add.tween(sprite).to({ x: spriteX, y: spriteY }, 1000 / this.moveSpeed, Phaser.Easing.Linear.None, true);
                    }
                }
            }
        }

        private updateTilePositions() {  

            this.positionEvent(this.levelData[this.playerPosition.y][this.playerPosition.x]);

            for(var r = 0; r < 5; r++) {

                for(var c = 0; c < 5; c++) {

                    var symbol = this.levelData[this.playerPosition.y + r - 2][this.playerPosition.x + c - 2];
                    var sprite = this.visibleTiles[c][r];

                    switch (symbol) {

                        case '#':
                            sprite.loadTexture('tile_block', 0);
                        break;

                        case 'T':
                        case 'S':
                        case ' ':
                            sprite.loadTexture('tile_way', 0);
                        break;
                    }

                    sprite.position.x = this.tileSize * (c - 2) + this.game.world.centerX - this.tileSize / 2;
                    sprite.position.y = this.tileSize * (r - 2) + this.game.world.centerY - this.tileSize / 2;
                }
            }
            this.onAnimationCompletePlayDefault();
            this.isUpdating = false;
        }

        private onAnimationCompletePlayDefault() {
            if(this.player){
                this.player.animations.play('waiting');
            }
        }

        bindKeys() {

            this.keyMap[Direction.Left] = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            this.keyMap[Direction.Up] = this.input.keyboard.addKey(Phaser.Keyboard.UP);
            this.keyMap[Direction.Right] = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
            this.keyMap[Direction.Down] = this.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        }

        initLevel() {

            this.stage.setBackgroundColor('#FFFFFF');

            this.player = this.initPlayer();
            this.initHud();
            //this.initSound();

        }

        initSound() {

            this.levelMusic = this.add.audio('level1_background', 1, true);
            this.levelMusic.play('', 0, 1, true);
        }

        initHud() {

            this.hud = this.add.sprite(0, 0, 'hud_mask');
            this.hud.fixedToCamera = true;
        }

        initPlayer() {

            var player = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'player');
            player.height = this.tileSize*1.5;
            player.width = this.tileSize*1.5;
            player.anchor.setTo(0.5, 0.5);
            player.animations.add('up', [18,19,20,21,22,23], 10, true);
            player.animations.add('down', [12,13,14,15,16,17], 10, true);
            player.animations.add('waiting', [0,1,2], 5, true);
            player.animations.add('right', [6,7,8,9,10,11], 10, true);
            player.animations.add('left', [24,25,26,27,28,29], 10, true);
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

        private positionEvent(symbol: string) {

            console.log(symbol);
        }

        private leftPressed() {

            if(this.canMove(Direction.Left)) {

                this.player.animations.play('left');
                this.startUpdatePosition(Direction.Left);
            }
        }

        private rightPressed() {

            if(this.canMove(Direction.Right)) {

                this.player.animations.play('right');
                this.startUpdatePosition(Direction.Right);
            }
        }   

        private upPressed() {

            if(this.canMove(Direction.Up)) {

                this.player.animations.play('up');
                this.startUpdatePosition(Direction.Up);
            }
        }  

        private downPressed() {

            if(this.canMove(Direction.Down)) {

                this.player.animations.play('down');
                this.startUpdatePosition(Direction.Down);
            }
        }   
    }

}