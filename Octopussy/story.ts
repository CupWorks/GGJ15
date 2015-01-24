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
                new StoryStep(3, 'story_board_6'),
                new StoryStep(3, 'story_board_7'),
                new StoryStep(3, 'story_board_8'),
                new StoryStep(3, 'story_board_9'),
                new StoryStep(3, 'story_board_10'),
                new StoryStep(2, 'story_board_11'),
                new StoryStep(2, 'story_board_12'),
                new StoryStep(2, 'story_board_13'),
        ];
        private storyState: number = 0;
        private board: Phaser.Sprite;

        preload() {

            for(var i = 0; i < 14; i++) {

                this.load.image('story_board_' + i, 'assets/story/lbl_story_' + i + '.png');
            }

        }

        create() {
            super.create();

            this.board = this.add.sprite(0, 0, this.storySteps[this.storyState].board);
            this.changeBoard(this.storySteps[this.storyState]);
        }

        private changeBoard(step: StoryStep) {

            this.board.loadTexture(step.board, 0);

            var timer = this.game.time.create(true);
            timer.add(step.time * 1000, this.next, this);
            timer.start();
        }

        private next() {

            if (this.storyState == this.storySteps.length) {

                this.game.state.start('Level');
            }

            this.storyState++;
            this.changeBoard(this.storySteps[this.storyState]);
        }
    }
} 