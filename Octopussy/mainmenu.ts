/// <reference path="framework/fullscreenState.ts"/>

module Octopussy {
    export class MainMenu extends FullscreenState {

        preload() {

            this.load.image('button_start', 'assets/mainmenu/button_start.png');
            this.load.image('button_credits', 'assets/mainmenu/button_credits.png');

        }

        create() {
            super.create();

            this.stage.setBackgroundColor('#C0C0C0');
            var button = this.add.button(this.game.world.centerX - 250, this.game.world.centerY - 275, 'button_start', this.startClick, this);
            var button = this.add.button(this.game.world.centerX - 250, this.game.world.centerY - 75, 'button_credits', this.creditsClick, this);
        }

        private startClick() {

            this.game.state.start('Story');
        }

        private creditsClick() {

            this.game.state.start('Credits');
        }
    }
}