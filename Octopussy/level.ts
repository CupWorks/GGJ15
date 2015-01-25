/// <reference path="levelData.ts"/>
/// <reference path="framework/fullscreenState.ts"/>

module Octopussy {

    export enum Direction {
        Left, Up, Right, Down
    }

    export class Level extends FullscreenState {

        private tileSize: number =  180;
        private levelData: LevelData = new LevelData();
        private currentLevel: number = 0;
        private currentLevelData: string[];
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
        private playerDirection: number = 0;
        private keyMap: Phaser.Key[] = [null, null, null, null];
        private moveSpeed: number = 1;
        private player: Phaser.Sprite;
        private messageBox: Phaser.Sprite;
        private levelMusic: Phaser.Sound;
        private sound_swim: Phaser.Sound;
        private sound_death: Phaser.Sound;
        private sound_trap: Phaser.Sound;
        private sound_friend_collect: Phaser.Sound;
        private sound_friend_lost: Phaser.Sound;
        private inputActive: boolean = true;

        private arrowMap: Phaser.Sprite[] = [null, null, null, null];
        private lifeMap: Phaser.Sprite[] = [null, null, null, null, null, null, null];

        private lifes: number = 0;

        preload() {

            this.load.spritesheet('tiles', 'assets/level/tiles.png', 512, 512, 20);

            this.load.image('background', 'assets/level/img_background_blue.jpg');
            this.load.image('background_fog', 'assets/level/img_background_fog.png');
            this.load.image('background_sun', 'assets/level/img_background_sun2.png');

            this.load.image('hud_mask','assets/level/hud/img_mask.png');
            this.load.image('hud_left','assets/level/hud/img_arrow_left.png');
            this.load.image('hud_right','assets/level/hud/img_arrow_right.png');
            this.load.image('hud_up','assets/level/hud/img_arrow_up.png');
            this.load.image('hud_down','assets/level/hud/img_arrow_down.png');
            this.load.image('hud_life','assets/level/hud/img_life.png');

            this.load.image('hud_cross_0', 'assets/level/msg/lbl_cross_0.png');
            this.load.image('hud_cross_1', 'assets/level/msg/lbl_cross_1.png');
            this.load.image('hud_dwarf_0', 'assets/level/msg/lbl_dwarf_0.png');
            this.load.image('hud_dwarf_1', 'assets/level/msg/lbl_dwarf_1.png');
            this.load.image('hud_gameover_0', 'assets/level/msg/lbl_gameover_0.png');
            this.load.image('hud_gameover_1', 'assets/level/msg/lbl_gameover_1.png');
            this.load.image('hud_intro_0', 'assets/level/msg/lbl_intro_0.png');
            this.load.image('hud_intro_1', 'assets/level/msg/lbl_intro_1.png');
            this.load.image('hud_intro_2', 'assets/level/msg/lbl_intro_2.png');
            this.load.image('hud_intro_3', 'assets/level/msg/lbl_intro_3.png');
            this.load.image('hud_trap', 'assets/level/msg/lbl_trap_0.png');
            this.load.image('hud_won_0', 'assets/level/msg/lbl_won_0.png');
            this.load.image('hud_won_1', 'assets/level/msg/lbl_won_1.png');
            this.load.image('hud_won_2', 'assets/level/msg/lbl_won_2.png');
            this.load.image('hud_won_3', 'assets/level/msg/lbl_won_3.png');
            this.load.image('hud_won_4', 'assets/level/msg/lbl_won_4.png');
            this.load.image('hud_won_5', 'assets/level/msg/lbl_won_5.png');
            this.load.image('hud_won_6', 'assets/level/msg/lbl_won_6.png');
            this.load.image('hud_won_7', 'assets/level/msg/lbl_won_7.png');


            this.load.spritesheet('player', 'assets/tile_player_move.png', 512, 512);

            this.load.audio('level_background_music','assets/level/sounds/music.mp3');
            this.load.audio('sound_death','assets/level/sounds/death.mp3');
            this.load.audio('sound_swim','assets/level/sounds/swim.mp3');
            this.load.audio('sound_trap','assets/level/sounds/trap.mp3');
            this.load.audio('sound_friend_collect','assets/level/sounds/friend_collected.mp3');
            this.load.audio('sound_friend_lost','assets/level/sounds/friend_lost.mp3');
        }

        create() {

            this.currentLevelData = this.levelData.get(this.currentLevel);

            super.create();

            this.bindKeys();
            this.initLevel();
            this.updatePlayer();
            this.displayStartMessage();
        }

        private displayStartMessage() {

            var timer = this.game.time.create(true);
            timer.add(1000, function() { this.showMessage('hud_intro_0', false); }, this);
            timer.add(3050, function() { this.showMessage('hud_intro_1', false); }, this);
            timer.add(4550, function() { this.showMessage('hud_intro_2', false); }, this);
            timer.add(7050, function() { this.showMessage('hud_intro_3', true); }, this);
            timer.start();
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
            } 

            for(var r = 0; r < 5; r++) {

                for(var c = 0; c < 5; c++) {

                    var sprite = this.add.sprite(0, 0, 'tiles');
                    sprite.scale.setTo(this.tileSize / 512, this.tileSize / 512);
                    this.visibleTiles[r][c] = sprite;
                }
            }

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
                this.playerDirection = direction;

                var timer = this.game.time.create(true);
                timer.add((1000 / this.moveSpeed) + 100, this.updateTilePositions, this);
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
                            sprite.loadTexture('tiles', 16);
                        break;

                        case 'I': 
                            sprite.loadTexture('tiles', 17);
                        break; 

                        case 'N': 
                            sprite.loadTexture('tiles', 18);
                        break; 

                        case 'E': 
                            sprite.loadTexture('tiles', 19);
                        break;   

                        case 'X':
                        case ' ':                        
                        case '#':
                        case 'B':
                        case 'T':
                            sprite.loadTexture('tiles', 11);

                        break;
                    }

                    sprite.position.x = this.tileSize * (c - 2) + this.game.world.centerX - this.tileSize / 2;
                    sprite.position.y = this.tileSize * (r - 2) + this.game.world.centerY - this.tileSize / 2;
                }
            }
            this.updatePlayer();
            this.isUpdating = false;
        }

        private updatePlayer() {

            if(this.player) {

                this.player.animations.play('waiting');
                this.updateArrows();
            }

            this.positionEvent(this.currentLevelData[this.playerPosition.y][this.playerPosition.x]);
        }

        private updateArrows() {

            for(var i = 0; i < 4; i++) {

                if(this.canMove(i)) {

                    this.arrowMap[i].alpha = 1.0;
                } else {

                    this.arrowMap[i].alpha = 0.3;
                }
            }
        }

        bindKeys() {

            this.keyMap[Direction.Left] = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            this.keyMap[Direction.Up] = this.input.keyboard.addKey(Phaser.Keyboard.UP);
            this.keyMap[Direction.Right] = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
            this.keyMap[Direction.Down] = this.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        }

        private setInputActive() {

            this.inputActive = true;
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
            this.initSound();

        }

        initSound() {

            this.levelMusic = this.add.audio('level_background_music', 1, true);
            this.sound_swim = this.add.audio('sound_swim', 1, true);
            this.sound_death= this.add.audio('sound_death');
            this.sound_trap= this.add.audio('sound_trap');
            this.sound_friend_collect= this.add.audio('sound_friend_collect');
            this.sound_friend_lost= this.add.audio('sound_friend_lost');
            this.levelMusic.play('', 0, 0.5, true);
        }

        initHud() {

            this.add.sprite(0, 0, 'hud_mask');

            this.arrowMap[Direction.Left] = this.add.sprite(1160, 280, 'hud_left');
            this.arrowMap[Direction.Left].scale.setTo(0.12, 0.12);
            this.arrowMap[Direction.Left].alpha = 0.3;
            this.arrowMap[Direction.Up] = this.add.sprite(1230, 220, 'hud_up');
            this.arrowMap[Direction.Up].scale.setTo(0.12, 0.12);
            this.arrowMap[Direction.Up].alpha = 0.3;
            this.arrowMap[Direction.Right] = this.add.sprite(1300, 280, 'hud_right');
            this.arrowMap[Direction.Right].scale.setTo(0.12, 0.12);
            this.arrowMap[Direction.Right].alpha = 0.3;
            this.arrowMap[Direction.Down] = this.add.sprite(1230, 340, 'hud_down');
            this.arrowMap[Direction.Down].scale.setTo(0.12, 0.12);
            this.arrowMap[Direction.Down].alpha = 0.3;

            for(var i = 0; i < 7; i++) {

                this.lifeMap[i] = this.add.sprite(this.world.centerX - (6 * 116 / 2 + 32) + (i * 116), 615, 'hud_life');
                this.lifeMap[i].scale.setTo(0.37 , 0.37);
                this.lifeMap[i].alpha = 0.3;
            }

            this.messageBox = this.add.sprite(80, 100);

        }

        initPlayer() {

            var player = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'player');
            player.height = this.tileSize * 2;
            player.width = this.tileSize * 2;
            player.anchor.setTo(0.5, 0.5);
            player.animations.add('up', [19,19,19,19,20,20,20,20,21,21,21,22,22,23,23,21,21,22,22,23,23,20,20], 20, true);
            player.animations.add('down', [17,17,17,16,16,13,13,14,14,14,13,13,13,13,14,14,14,15,15,15,16,16,16], 20, true);
            player.animations.add('waiting', [0,0,0,0,1,1,1,1,2,2,2,2,1,1,1,1], 15, true);
            player.animations.add('right', [8,8,8,8,8,9,10,11,11,10,9,9], 15, true);
            player.animations.add('left', [27,27,27,27,27,26,25,24,24,25,26,26], 15, true);
            player.animations.add('player_death', [30,31,30,31,32,31,32,33,33,33,33,34,34,35,35,36,36,37,37], 10, false);
            player.animations.add('clone_rescued', [3,3,4,4,5,5,38,38,39,39,40,40,41,41,3,3,4,4,5,5,38,38,39,39,40,40,41,41,3,3,0,0,0,0,1,1,1,1,2,2,2,2,1,1,1,1], 20, false);
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
            else if(this.keyMap[Direction.Down].isUp &&
                this.keyMap[Direction.Up].isUp &&
                this.keyMap[Direction.Right].isUp &&
                this.keyMap[Direction.Left].isUp) {

                this.setInputActive();
                this.sound_swim.loop = false;
            }

            if(this.keyMap[Direction.Right].justDown){
                this.sound_swim.play('',0,1,true);
            }

            if(this.keyMap[Direction.Left].justDown){
                this.sound_swim.play('',0,1,true);
            }
            if(this.keyMap[Direction.Up].justDown){
                this.sound_swim.play('',0,1,true);
            }
            if(this.keyMap[Direction.Down].justDown){
                this.sound_swim.play('',0,1,true);
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

            switch (symbol) {
                case 'B':
                    this.addLife();
                    break;

                case 'X':
                    this.displayQuestion();
                    break;

                case 'E':
                    this.won();
                    break;

                case 'T':
                    this.trap();
                    break;
            }
        }

        private trap() {

            this.player.animations.play('player_death');
            this.sound_death.play();

            if(this.lifes == 0) {

                this.sound_trap.play();
                this.gameOver();
            }
            else {

                this.sound_friend_lost.play();
                this.showMessage('hud_trap', true);
                this.lifes = this.lifes - 1;
                this.lifeMap[this.lifes].alpha = 0.3;
                var timer = this.game.time.create(true);
                timer.add(3000, function() { this.player.animations.play('waiting'); }, this);
                timer.start();
            }
        }

        private gameOver() {

            this.showMessage('hud_gameover_0', false);
            var timer = this.game.time.create(true);
            timer.add(3000, function() { this.showMessage('hud_gameover_1', true); }, this);
            timer.add(5000, function() { this.game.state.start('MainMenu'); }, this);
            timer.start();
        }

        private won() {

            this.showMessage('hud_won_' + this.lifes, false);
            var timer = this.game.time.create(true);
            timer.add(5000, function() { this.game.state.start('MainMenu'); }, this);
            timer.start();
        }

        private showMessage(imageKey: string, fade: boolean) {

            this.messageBox.loadTexture(imageKey, 0);
            this.messageBox.alpha = 1;
            if(fade == true) {

            this.add.tween(this.messageBox).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None)
                .to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None).start();                
            }

            this.inputActive = false;
        }

        private displayQuestion() {

            if(this.lifes == 0) {

                this.showMessage('hud_cross_0', true);
            } else {

                this.showMessage('hud_cross_1', true);
            }

        }

        private addLife() {

            this.sound_friend_collect.play();
            this.player.animations.play('clone_rescued');
            this.lifeMap[this.lifes].alpha = 1;
            this.lifes = this.lifes + 1;
            var line = this.currentLevelData[this.playerPosition.y];
            line = line.substr(0, this.playerPosition.x) +  ' ' + line.substr(this.playerPosition.x + 1);
            this.currentLevelData[this.playerPosition.y] = line;
            this.showMessage('hud_dwarf_0', false);
            var timer = this.game.time.create(true);
            timer.add(2050, function() { this.showMessage('hud_dwarf_1', true); }, this);
            timer.start();
        }

        private leftPressed() {

            if(this.canMove(Direction.Left) && this.inputActive) {

                this.player.animations.play('left');
                this.startUpdatePosition(Direction.Left);
            }
        }

        private rightPressed() {

            if(this.canMove(Direction.Right) && this.inputActive) {

                this.player.animations.play('right');
                this.startUpdatePosition(Direction.Right);
            }
        }   

        private upPressed() {

            if(this.canMove(Direction.Up) && this.inputActive) {

                this.player.animations.play('up');
                this.startUpdatePosition(Direction.Up);
            }
        }  

        private downPressed() {

            if(this.canMove(Direction.Down) && this.inputActive) {

                this.player.animations.play('down');
                this.startUpdatePosition(Direction.Down);
            }
        } 
    }
}