class TitleScene extends Phaser.Scene {
    constructor() {
        super ({
            key: 'TitleScene'
        });
    }

    preload() {
    }

    create() {
        const width = this.sys.game.config.width;
        const height = this.sys.game.config.height;

        this.cameras.main.setBackgroundColor('rgba(162, 240, 240, 1)');

        this.add.bitmapText(width / 2, height / 1.2, 'font', 'PRESS SPACE TO START', 18).setOrigin(0.5);

        this.startKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (this.startKey.isDown) {
            this.startGame();
        }
    }

    startGame() {
        this.scene.stop('GameScene');
        this.scene.start('GameScene');
    }
}

export default TitleScene;
