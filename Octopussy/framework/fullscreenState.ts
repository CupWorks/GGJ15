module Octopussy {
    export class FullscreenState extends Phaser.State {

        create() {

            var keyFullScreen = this.input.keyboard.addKey(Phaser.Keyboard.F1);
            keyFullScreen.onDown.add(this.goFullScreen, this);

            var keyCup = this.input.keyboard.addKey(Phaser.Keyboard.C);
            keyCup.onDown.add(this.hailToTheCup, this);
        }

        private hailToTheCup() {

            this.game.state.start('Intro');
        }

        private goFullScreen() {

            if (this.scale.isFullScreen) {

                this.scale.stopFullScreen();
            } else {

                this.scale.startFullScreen(true);
            }
        }
    }
} 