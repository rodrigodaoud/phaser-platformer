import 'phaser';

import BootScene from './scenes/BootScene';
import GameScene from './scenes/GameScene';
import TitleScene from './scenes/TitleScene';
import EndScene from './scenes/EndScene';

const gameConfig = {
    type: Phaser.WEBGL,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 800
            },
            debug: true
        }
    },
    scene: [
        BootScene,
        TitleScene,
        GameScene,
        EndScene
    ]
};

new Phaser.Game(gameConfig);
