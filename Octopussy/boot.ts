module Octopussy {

    export class Boot extends Phaser.State {

        preload() {
            this.load.image('logo_cupworks', 'assets/logo_cupworks.png');
        }

        create() {
            this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
            this.game.scale.refresh();

            this.stage.disableVisibilityChange = true;

            this.game.state.start('MainMenu', true, false);
        }
    }

}