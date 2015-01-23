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
        Boot.prototype.create = function () {
            this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
            this.game.scale.refresh();

            this.stage.disableVisibilityChange = true;

            this.game.state.start('Intro', true, false);
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
            this.state.add('Intro', Octopussy.Intro, false);
            this.state.add('Story', Octopussy.Story, false);
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
    var Intro = (function (_super) {
        __extends(Intro, _super);
        function Intro() {
            _super.apply(this, arguments);
        }
        Intro.prototype.preload = function () {
            this.load.image('logo_cupworks', 'assets/logo_cupworks.png');
        };

        Intro.prototype.create = function () {
            _super.prototype.create.call(this);

            var logo = this.add.sprite(this.world.centerX, this.world.centerY, 'logo_cupworks');
            logo.anchor.setTo(0.5, 0.5);
            logo.alpha = 0;

            var tween = this.add.tween(logo).to({ alpha: 1 }, 2000, Phaser.Easing.Bounce.InOut, true);
            tween.onComplete.add(this.changeState, this);
        };

        Intro.prototype.changeState = function () {
            this.game.state.start('MainMenu');
        };
        return Intro;
    })(Octopussy.FullscreenState);
    Octopussy.Intro = Intro;
})(Octopussy || (Octopussy = {}));
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
            this.game.state.start('Story');
        };

        MainMenu.prototype.creditsClick = function () {
            this.game.state.start('Credits');
        };
        return MainMenu;
    })(Octopussy.FullscreenState);
    Octopussy.MainMenu = MainMenu;
})(Octopussy || (Octopussy = {}));
/// <reference path="framework/fullscreenState.ts"/>
var Octopussy;
(function (Octopussy) {
    var Story = (function (_super) {
        __extends(Story, _super);
        function Story() {
            _super.apply(this, arguments);
            this.storyText = [
                'Hier könnte ihre Werbung stehen!',
                'Echt jetzt!',
                'Dann eben nicht!',
                'Fuuuuuu!!!'
            ];
            this.storyState = 0;
        }
        Story.prototype.create = function () {
            _super.prototype.create.call(this);

            this.stage.setBackgroundColor('#44FF10');

            var style = { font: "65px Arial", fill: "#ff0044", align: "center" };
            this.textElement = this.add.text(this.game.world.centerX, this.game.world.centerY, "", style);
            this.input.onDown.add(this.next, this);
        };

        Story.prototype.changeText = function (text) {
            this.textElement.text = text;
            this.textElement.anchor.x = Math.round(this.textElement.width * 0.5) / this.textElement.width;
            this.textElement.anchor.y = Math.round(this.textElement.height * 0.5) / this.textElement.height;
        };

        Story.prototype.next = function () {
            if (this.storyState == this.storyText.length) {
                this.game.state.start('Level');
            }

            this.changeText(this.storyText[this.storyState]);
            this.storyState++;
        };
        return Story;
    })(Octopussy.FullscreenState);
    Octopussy.Story = Story;
})(Octopussy || (Octopussy = {}));
//# sourceMappingURL=game.js.map
