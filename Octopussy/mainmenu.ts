module Octopussy {
    export class MainMenu extends Phaser.State {

        logo: Phaser.Sprite;

        create() {

            this.logo = this.add.sprite(0, 0, 'logo_cupworks');
            console.log('Foo', this.world.centerX);
        }

    }
}