module Octopussy {
    export class FullscreenState extends Phaser.State {

        create() {

            var key = this.input.keyboard.addKey(Phaser.Keyboard.F1);
            key.onDown.add(this.goFullScreen, this);
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