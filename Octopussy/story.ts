/// <reference path="framework/fullscreenState.ts"/>

module Octopussy {
    export class StoryStep {

        constructor(time: number, board: string) {
            
            this.time = time;
            this.board = board;
        }

        public time: number = 0;
        public board: string = '';
    }

    export class Story extends FullscreenState {

        private storySteps: StoryStep[] = 
        [
                new StoryStep(3, 'story_board_0'),
                new StoryStep(2, 'story_board_1'),
                new StoryStep(2, 'story_board_2'),
                new StoryStep(2, 'story_board_3'),
                new StoryStep(2, 'story_board_4'),
                new StoryStep(2, 'story_board_5'),
                new StoryStep(6, 'story_board_6'),
                new StoryStep(4, 'story_board_7'),
                new StoryStep(3, 'story_board_8'),
                new StoryStep(3, 'story_board_9'),
                new StoryStep(3, 'story_board_10'),
                new StoryStep(5, 'story_board_11'),
                new StoryStep(3, 'story_board_12'),
                new StoryStep(3, 'story_board_13')
        ];
        private storyState: number = 0;
        private board: Phaser.Sprite;

        private sound2_long: Phaser.Sound;

        preload() {

            for(var i = 0; i < 14; i++) {

                this.load.image('story_board_' + i, 'assets/story/lbl_story_' + i + '.png');
                this.load.audio('story_audio_0','assets/story/newspaper.mp3');
                this.load.audio('story_audio_1','assets/story/intro.mp3');
            }
        }

        create() {

            this.storyState = 0;

            super.create();

            this.board = this.add.sprite(0, 0, null);
            this.changeBoard(this.storySteps[this.storyState]);
        }

        private changeBoard(step: StoryStep) {

            this.board.loadTexture(step.board, 0);

            var timer = this.game.time.create(true);
            timer.add(step.time * 1000, this.next, this);
            timer.start();
        }

        update() {

            if (this.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {

                this.game.state.start('Level');
            }
        }

        private next() {

            this.storyState++;
            if (this.storyState >= this.storySteps.length) {

                this.game.state.start('Level');
            } 
            else {

                if (this.storyState > 0 && this.storyState < 6) {

                    var audio = this.add.audio('story_audio_0');
                    audio.play('');
                }
                if (this.storyState == 6) {

                    this.sound2_long = this.add.audio('story_audio_1');
                    this.sound2_long.play('');
                } 
                this.changeBoard(this.storySteps[this.storyState]);
            }


        }

        shutdown() {
            if(this.sound2_long){
                this.sound2_long.stop();
            }
        }
    }
} 