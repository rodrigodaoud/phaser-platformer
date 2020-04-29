class TitleScene extends Phaser.Scene {
    constructor() {
        super ({
            key: 'TitleScene'
        });
    }

    create() {
        const width = this.sys.game.config.width;
        const height = this.sys.game.config.height;
        const currentLocation = parseInt(localStorage.getItem('positionX')) || 50;

        this.cameras.main.setBackgroundColor('rgba(162, 240, 240, 1)');

        if (currentLocation == 50) {
            this.add.bitmapText(width / 2, height / 1.2, 'font', 'PRESS SPACE TO START', 18).setOrigin(0.5);
        } else {
            this.add.bitmapText(width / 2, height / 1.2, 'font', 'PRESS SPACE TO CONTINUE', 18).setOrigin(0.5);
        }
        

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
