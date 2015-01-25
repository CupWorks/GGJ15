/// <reference path="framework/fullscreenState.ts"/>

module Octopussy {
    export class Credits extends FullscreenState {

    	private credits = "Credits\n\nChristoph 'The Mantis Shrimp' Becher - Programming\n\nHenning Behrendt - Sound\n\nTim Beier - Art, Level Design\n\nKerstin Buzelan - Original Hacktopus Character Design\n\nMike 'The Black Eel' Gehrhardt - Programming\n\nSohyun Jung - Character Design\n\nKjell Nehring - Art\n\nAlita Pantea - Game Design, Scripting, PR\n\nNorman v. Rechenberg - Game Design, Art";

        create() {
            super.create();

            this.stage.setBackgroundColor('#000000');

            var style = { font: "65px Arial", fill: "#FFFFFF", align: "center" };
            var text = this.add.text(this.game.world.centerX, 2500, this.credits, style);
            text.anchor.x = Math.round(text.width * 0.5) / text.width;
            text.anchor.y = 1;

            var tween = this.add.tween(text).to({ y: 0 }, 30000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.changeState, this);
        }

        private changeState() {

        	this.game.state.start('MainMenu');
        }
    }
} 