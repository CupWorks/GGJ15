/// <reference path="levelData.ts"/>
/// <reference path="framework/fullscreenState.ts"/>

module Octopussy {

    export enum Direction {
        Left, Up, Right, Down
    }

    export class Level extends FullscreenState {

        private tileSize: number =  128;
        private levelData: LevelData = new LevelData();
        private currentLevel: number = 0;
        private currentLevelData: string[] = this.levelData.get(this.currentLevel);
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
        private moveSpeed: number = 1;

        player: Phaser.Sprite;
        levelMusic: Phaser.Sound;

        private arrowMap: Phaser.Sprite[] = [null, null, null, null];
        private lifeMap: Phaser.Sprite[] = [null, null, null, null, null, null, null];

        lives: number = 7;
        liveSpritegroup: any;

        preload() {

            this.load.spritesheet('tiles', 'assets/level/tiles.png', 512, 512, 16);

            this.load.image('background', 'assets/level/img_background.jpg');
            this.load.image('background_fog', 'assets/level/img_background_fog.png');
            this.load.image('background_sun', 'assets/level/img_background_sun2.png');

            this.load.image('hud_mask','assets/level/hud/img_mask.png');
            this.load.image('hud_left','assets/level/hud/img_arrow_left.png');
            this.load.image('hud_right','assets/level/hud/img_arrow_right.png');
            this.load.image('hud_up','assets/level/hud/img_arrow_up.png');
            this.load.image('hud_down','assets/level/hud/img_arrow_down.png');
            this.load.image('hud_life','assets/level/hud/img_life.png');

            this.load.spritesheet('player', 'assets/tile_player_move.png', 512, 512);
            //this.load.audio('level1_background','assets/level1/sounds/octodwarfs_sad2.mp3');

        }

        create() {

            super.create();

            this.bindKeys();
            this.initLevel();
        }

        private createLevel() {

            for(var r = 0; r < this.currentLevelData.length; r++) {

                for(var c = 0; c < this.currentLevelData[r].length; c++) {

                    var symbol = this.currentLevelData[r][c];

                    switch (symbol) {
                        case 'S':
                            this.playerPosition.set(c, r);                    
                            break;
                    }

                }
            };  

            for(var r = 0; r < 5; r++) {

                for(var c = 0; c < 5; c++) {

                    var sprite = this.add.sprite(0, 0, 'tiles');
                    sprite.scale.setTo(0.25, 0.25);
                    this.visibleTiles[r][c] = sprite;
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
                timer.add((1000 / this.moveSpeed) + 200, this.updateTilePositions, this);
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

            this.positionEvent(this.currentLevelData[this.playerPosition.y][this.playerPosition.x]);

            for(var r = 0; r < 5; r++) {

                for(var c = 0; c < 5; c++) {

                    var symbol = this.currentLevelData[this.playerPosition.y + r - 2][this.playerPosition.x + c - 2];
                    var sprite = this.visibleTiles[c][r];

                    switch (symbol) {

                        case '1':
                            sprite.loadTexture('tiles', 0);
                        break;

                        case '2':
                            sprite.loadTexture('tiles', 1);
                        break;

                        case '3':
                            sprite.loadTexture('tiles', 2);
                        break;

                        case '4':
                            sprite.loadTexture('tiles', 3);
                        break;

                        case '-':
                            sprite.loadTexture('tiles', 4);
                        break;

                        case '|':
                            sprite.loadTexture('tiles', 5);
                        break;
						
						case 'V':
                        sprite.loadTexture('tiles', 6);
                        break;
						
						case '^':
                        sprite.loadTexture('tiles', 7);
                        break;

						case '<':
                        sprite.loadTexture('tiles', 8);
                        break;
						
						case '>':
                        sprite.loadTexture('tiles', 9);
                        break;
						
						case '+':
                        sprite.loadTexture('tiles', 10);
                        break;
						
						case 'T':
                        sprite.loadTexture('tiles', 11);
                        break;
						
						case 'R':
                        sprite.loadTexture('tiles', 12);
                        break;
						
						case 'L':
                        sprite.loadTexture('tiles', 13);
                        break;
						
						case 'D':
                        sprite.loadTexture('tiles', 14);
                        break;
						
						case 'U':
                        sprite.loadTexture('tiles', 15);
                        break;
						
                        case 'S':
                        sprite.loadTexture('tiles', 11);
                        break;
						
                        case ' ':
                        sprite.loadTexture('tiles', 11);
                        break;
						
						case '#':
                        sprite.loadTexture('tiles', 11);
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

            this.add.sprite(0, 0, 'background');
            var backgroundFog = this.add.sprite(0, 0, 'background_fog');
            this.add.tween(backgroundFog).to({ x: 300 }, 1500, Phaser.Easing.Linear.None)
            .to({ x: 0 }, 1500, Phaser.Easing.Linear.None)
            .loop().start();

            this.createLevel();
            this.player = this.initPlayer();

            var backgroundSun = this.add.sprite(-400, 0, 'background_sun');
            this.add.tween(backgroundSun).to({ x: 400 }, 8000, Phaser.Easing.Linear.None)
            .to({ x: -200 }, 8000, Phaser.Easing.Linear.None)
            .loop().start();

            this.initHud();
            //this.initSound();

        }

        initSound() {

            this.levelMusic = this.add.audio('level1_background', 1, true);
            this.levelMusic.play('', 0, 1, true);
        }

        initHud() {

            this.add.sprite(0, 0, 'hud_mask');

            this.arrowMap[Direction.Left] = this.add.sprite(1160, 280, 'hud_left');
            this.arrowMap[Direction.Left].scale.setTo(0.12, 0.12);
            this.arrowMap[Direction.Left].alpha = 0.2;
            this.arrowMap[Direction.Up] = this.add.sprite(1230, 220, 'hud_up');
            this.arrowMap[Direction.Up].scale.setTo(0.12, 0.12);
            this.arrowMap[Direction.Up].alpha = 0.2;
            this.arrowMap[Direction.Right] = this.add.sprite(1300, 280, 'hud_right');
            this.arrowMap[Direction.Right].scale.setTo(0.12, 0.12);
            this.arrowMap[Direction.Right].alpha = 0.2;
            this.arrowMap[Direction.Down] = this.add.sprite(1230, 340, 'hud_down');
            this.arrowMap[Direction.Down].scale.setTo(0.12, 0.12);
            this.arrowMap[Direction.Down].alpha = 0.2;

            for(var i = 0; i < 7; i++) {
;
            this.lifeMap[i] = this.add.sprite(this.world.centerX - (6 * 116 / 2 + 32) + (i * 116), 615, 'hud_life');
            this.lifeMap[i].scale.setTo(0.37 , 0.37);
            this.lifeMap[i].alpha = 0.2;
            }

        }

        initPlayer() {

            var player = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'player');
            player.height = this.tileSize * 1.5;
            player.width = this.tileSize * 1.5;
            player.anchor.setTo(0.5, 0.5);
            player.animations.add('up', [19,19,19,19,20,20,20,20,21,21,21,22,22,23,23,21,21,22,22,23,23,20,20], 20, true);
            player.animations.add('down', [17,17,17,16,16,13,13,14,14,14,13,13,13,13,14,14,14,15,15,15,16,16,16], 20, true);
            player.animations.add('waiting', [0,0,0,0,1,1,1,1,2,2,2,2,1,1,1,1,], 15, true);
            player.animations.add('right', [8,8,8,8,8,9,10,11,11,10,9,9], 15, true);
            player.animations.add('left', [27,27,27,27,27,26,25,24,24,25,26,26], 15, true);
            player.animations.play('waiting');

            return player;
        }

        update() {

            if(this.keyMap[Direction.Left].isDown) {
                this.leftPressed();
            }
            else if(this.keyMap[Direction.Up].isDown) {
                this.upPressed();
            }
            else if(this.keyMap[Direction.Right].isDown) {
                this.rightPressed();
            }
            else if(this.keyMap[Direction.Down].isDown) {
                this.downPressed();
            }
        }

        private canMove(direction: Direction): boolean {

            var change = this.getPositionChange(direction);
            var symbol = this.currentLevelData[this.playerPosition.y + change.y][this.playerPosition.x + change.x];

            if(symbol == '#' || symbol == '-' || symbol == '|' ||
               symbol == '1' || symbol == '2'|| symbol == '3'||
			   symbol == '4' || symbol == 'V'|| symbol == '^'||
			   symbol == '<' || symbol == '>'|| symbol == '+'||
			   symbol == 'M' || symbol == 'R'|| symbol == 'L'||
               symbol == 'D' || symbol == 'U') {

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