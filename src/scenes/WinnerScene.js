class WinnerScene extends Phaser.Scene {
    constructor() {
        super ({
            key: 'WinnerScene'
        });
    }

    preload() {
    }

    create() {
        const width = this.sys.game.config.width;
        const height = this.sys.game.config.height;

        this.cameras.main.setBackgroundColor('rgba(162, 240, 240, 1)');

        this.add.bitmapText(width / 2, height / 2, 'font', 'YOU WIN!', 24).setOrigin(0.5);

        this.time.addEvent({ 
            delay: 2000,
            callback: () => {
                this.scene.stop('WinnerScene');
                this.scene.start('TitleScene');
            },
            callbackScope: this,
            loop: true
        });
    }
}

export default WinnerScene;
