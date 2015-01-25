/// <reference path="framework/fullscreenState.ts"/>

module Octopussy {
    export class MainMenu extends FullscreenState {

        private sound_title: Phaser.Sound;

        preload() {

            this.load.image('mainmenu_background', 'assets/mainmenu/img_background.png');
            this.load.spritesheet('mainmenu_title', 'assets/mainmenu/img_title.png', 600, 310, 5);
            this.load.audio('sound_title','assets/mainmenu/sounds/title.wav');
            
        }

        create() {
            super.create();

            this.sound_title = this.add.audio('sound_title', 1, true);

            this.add.sprite(0, 0, 'mainmenu_background');
            var mainmenu_title = this.add.sprite(this.game.world.centerX - 300, this.game.world.centerY - 230, 'mainmenu_title');
            mainmenu_title.animations.add('intro', [0,1,2,3,4], 10, true);
            mainmenu_title.animations.play('intro');

            this.sound_title.play('', 0, 1, true);

            this.game.input.keyboard.onDownCallback = function(e: KeyboardEvent) {

                if(e.keyCode != Phaser.Keyboard.C && e.keyCode != Phaser.Keyboard.F1) {

                    this.game.input.keyboard.onDownCallback = null;
                    this.game.state.start('Level');
                }
            }
        }

        shutdown() {
            this.sound_title.stop();
        }
    }
}