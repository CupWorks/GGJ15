/// <reference path="node_modules\phaser\typescript\phaser.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Octopussy;
(function (Octopussy) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, 800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create });
        }
        Game.prototype.preload = function () {
            this.load.image('logo', 'img/phaser2.png');
        };

        Game.prototype.create = function () {
            var logo = this.add.sprite(this.world.centerX, this.world.centerY, 'logo');
            logo.anchor.setTo(0.5, 0.5);
            logo.scale.setTo(0.2, 0.2);
            this.add.tween(logo.scale).to({ x: 1, y: 1 }, 2000, Phaser.Easing.Bounce.Out, true);
        };
        return Game;
    })(Phaser.Game);
    Octopussy.Game = Game;
})(Octopussy || (Octopussy = {}));

window.onload = function () {
    var game = new Octopussy.Game();
};
//# sourceMappingURL=game.js.map
