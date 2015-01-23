var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Octopussy;
(function (Octopussy) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.preload = function () {
            this.load.image('logo_cupworks', 'assets/logo_cupworks.png');
        };

        Boot.prototype.create = function () {
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;

            this.game.state.start('MainMenu', true, false);
        };
        return Boot;
    })(Phaser.State);
    Octopussy.Boot = Boot;
})(Octopussy || (Octopussy = {}));
/// <reference path="node_modules\phaser\typescript\phaser.d.ts"/>
var Octopussy;
(function (Octopussy) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, 800, 600, Phaser.AUTO, 'content', null);

            this.state.add('Boot', Octopussy.Boot, false);
            this.state.add('MainMenu', Octopussy.MainMenu, false);

            this.state.start('Boot');
        }
        return Game;
    })(Phaser.Game);
    Octopussy.Game = Game;
})(Octopussy || (Octopussy = {}));

window.onload = function () {
    var game = new Octopussy.Game();
};
var Octopussy;
(function (Octopussy) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            _super.apply(this, arguments);
        }
        MainMenu.prototype.create = function () {
            this.logo = this.add.sprite(0, 0, 'logo_cupworks');
            console.log('Foo', this.world.centerX);
        };
        return MainMenu;
    })(Phaser.State);
    Octopussy.MainMenu = MainMenu;
})(Octopussy || (Octopussy = {}));
//# sourceMappingURL=game.js.map
