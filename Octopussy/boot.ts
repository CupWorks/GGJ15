module Octopussy {

    export class Boot extends Phaser.State {

        preload() {
            this.load.image('logo_cupworks', 'assets/logo_cupworks.png');
        }

        create() {

            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;

            this.game.state.start('MainMenu', true, false);
        }

    }

}