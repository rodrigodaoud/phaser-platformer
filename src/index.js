import 'phaser';

import BootScene from './scenes/BootScene';
import GameScene from './scenes/GameScene';
import TitleScene from './scenes/TitleScene';
import EndScene from './scenes/EndScene';
import WinnerScene from './scenes/WinnerScene';

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
            debug: false
        }
    },
    scene: [
        BootScene,
        TitleScene,
        GameScene,
        EndScene,
        WinnerScene
    ]
};

new Phaser.Game(gameConfig);
