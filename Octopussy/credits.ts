/// <reference path="framework/fullscreenState.ts"/>

module Octopussy {
    export class Credits extends FullscreenState {

    	private credits = "Credits\nChristoph 'The Mantis Shrimp' Becher - Programming\nHenning Behrendt - Sound\nTim Beier - Art, Level Design\n Kerstin Buzelan - Original Hacktopus Character Design\nMike 'The Black Eel' Gehrhardt - Programming\nSohyun Jung - Character Design\nKjell Nehring - Art\nAlita Pantea - Game Design, Scripting, PR\nNorman v. Rechenberg - Game Design, Art";

        create() {
            super.create();

            this.stage.setBackgroundColor('#99EE24');

            var style = { font: "65px Arial", fill: "#ff0044", align: "center" };
            var text = this.add.text(this.game.world.centerX, 0, this.credits, style);
            text.anchor.x = Math.round(text.width * 0.5) / text.width;
            text.anchor.y = 1;

            var tween = this.add.tween(text).to({ y: 2000 }, 30000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.changeState, this);
        }

        private changeState() {

        	this.game.state.start('MainMenu');
        }
    }
} 