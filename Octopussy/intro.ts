/// <reference path="framework/fullscreenState.ts"/>

module Octopussy {
    export class Intro extends FullscreenState {

        private logo: Phaser.Sprite;

        preload() {

            this.load.image('logo_cupworks', 'assets/logo_cupworks.png');
        }

        create() {
            super.create();

            this.logo = this.add.sprite(this.world.centerX, this.world.centerY, 'logo_cupworks');
            this.logo.anchor.setTo(0.5, 0.5);
            this.logo.alpha = 0;

            var tween = this.add.tween(this.logo).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.fateOut, this);
        }

        private fateOut() {

            var tween = this.add.tween(this.logo).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.changeState, this);
            //var timer = this.game.time.create(true);
            //timer.add(2000, this.changeState, this);
            //timer.start();
        }

        private changeState() {

            this.game.state.start('MainMenu');
        }
    }
}  