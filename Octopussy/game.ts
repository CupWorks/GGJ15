/// <reference path="node_modules\phaser\typescript\phaser.d.ts"/>

module Octopussy {
    export class Game extends Phaser.Game {

        constructor() {
            
            super(900, 450, Phaser.AUTO, 'content', null);

            this.state.add('Boot', Boot, false);
            this.state.add('MainMenu', MainMenu, false);
            this.state.add('Level', Level, false);

            this.state.start('Boot');
        }
    }
}

window.onload = () => {
    var game = new Octopussy.Game();
};
