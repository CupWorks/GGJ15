/// <reference path="framework/fullscreenState.ts"/>

module Octopussy {
    export class MainMenu extends FullscreenState {


        preload() {

            this.load.image('mainmenu_background', 'assets/mainmenu/img_background.png');
            this.load.image('mainmenu_title', 'assets/mainmenu/img_title_0.png');

        }

        create() {
            super.create();

            this.add.sprite(0, 0, 'mainmenu_background');
            this.add.sprite(0, 0, 'mainmenu_title');

            this.game.input.keyboard.onDownCallback = function(e: KeyboardEvent) {

                if(e.keyCode != Phaser.Keyboard.C && e.keyCode != Phaser.Keyboard.F1) {

                    this.game.input.keyboard.onDownCallback = null;
                    this.game.state.start('Level');
                }
            }
        }
    }
}