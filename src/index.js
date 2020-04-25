import 'phaser';

import TitleScene from './scenes/TitleScene';

const gameConfig = {
    width: 680,
    height: 400,
    scene: TitleScene
};

new Phaser.Game(gameConfig);
