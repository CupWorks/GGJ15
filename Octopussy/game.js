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
            this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
            this.game.scale.refresh();

            this.stage.disableVisibilityChange = true;

            this.game.state.start('MainMenu', true, false);
        };
        return Boot;
    })(Phaser.State);
    Octopussy.Boot = Boot;
})(Octopussy || (Octopussy = {}));
var Octopussy;
(function (Octopussy) {
    var FullscreenState = (function (_super) {
        __extends(FullscreenState, _super);
        function FullscreenState() {
            _super.apply(this, arguments);
        }
        FullscreenState.prototype.create = function () {
            var key = this.input.keyboard.addKey(Phaser.Keyboard.F1);
            key.onDown.add(this.goFullScreen, this);
        };

        FullscreenState.prototype.goFullScreen = function () {
            if (this.scale.isFullScreen) {
                this.scale.stopFullScreen();
            } else {
                this.scale.startFullScreen(true);
            }
        };
        return FullscreenState;
    })(Phaser.State);
    Octopussy.FullscreenState = FullscreenState;
})(Octopussy || (Octopussy = {}));
/// <reference path="framework/fullscreenState.ts"/>
var Octopussy;
(function (Octopussy) {
    var Credits = (function (_super) {
        __extends(Credits, _super);
        function Credits() {
            _super.apply(this, arguments);
        }
        Credits.prototype.create = function () {
            _super.prototype.create.call(this);

            this.stage.setBackgroundColor('#99EE24');
        };
        return Credits;
    })(Octopussy.FullscreenState);
    Octopussy.Credits = Credits;
})(Octopussy || (Octopussy = {}));
/// <reference path="node_modules\phaser\typescript\phaser.d.ts"/>
var Octopussy;
(function (Octopussy) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, 1440, 720, Phaser.AUTO, 'content', null);

            this.state.add('Boot', Octopussy.Boot, false);
            this.state.add('MainMenu', Octopussy.MainMenu, false);
            this.state.add('Credits', Octopussy.Credits, false);
            this.state.add('Level', Octopussy.Level, false);

            this.state.start('Boot');
        }
        return Game;
    })(Phaser.Game);
    Octopussy.Game = Game;
})(Octopussy || (Octopussy = {}));

window.onload = function () {
    var game = new Octopussy.Game();
};
/// <reference path="framework/fullscreenState.ts"/>
var Octopussy;
(function (Octopussy) {
    var Level = (function (_super) {
        __extends(Level, _super);
        function Level() {
            _super.apply(this, arguments);
        }
        Level.prototype.create = function () {
            _super.prototype.create.call(this);

            this.stage.setBackgroundColor('#FF9933');
        };
        return Level;
    })(Octopussy.FullscreenState);
    Octopussy.Level = Level;
})(Octopussy || (Octopussy = {}));
/// <reference path="framework/fullscreenState.ts"/>
var Octopussy;
(function (Octopussy) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            _super.apply(this, arguments);
        }
        MainMenu.prototype.preload = function () {
            this.load.image('button_start', 'assets/mainmenu/button_start.png');
            this.load.image('button_credits', 'assets/mainmenu/button_credits.png');
        };

        MainMenu.prototype.create = function () {
            _super.prototype.create.call(this);

            this.stage.setBackgroundColor('#C0C0C0');
            var button = this.add.button(this.game.world.centerX - 250, this.game.world.centerY - 275, 'button_start', this.startClick, this);
            var button = this.add.button(this.game.world.centerX - 250, this.game.world.centerY - 75, 'button_credits', this.creditsClick, this);
        };

        MainMenu.prototype.startClick = function () {
            this.game.state.start('Level');
        };

        MainMenu.prototype.creditsClick = function () {
            this.game.state.start('Credits');
        };
        return MainMenu;
    })(Octopussy.FullscreenState);
    Octopussy.MainMenu = MainMenu;
})(Octopussy || (Octopussy = {}));
//# sourceMappingURL=game.js.map
