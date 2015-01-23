module Octopussy {
    export class MainMenu extends FullscreenState {

        logo: Phaser.Sprite;

        create() {
            super.create();

            this.stage.setBackgroundColor('#C0C0C0');
            this.logo = this.add.sprite(0, 0, 'logo_cupworks');
            this.logo.scale.x = 0.5;
            this.logo.scale.y = 0.5;

            this.game.state.start('Level');
        }
    }
}