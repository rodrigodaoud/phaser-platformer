import makeAnimations from '../helpers/animations';

class BootScene extends Phaser.Scene {
    constructor() {
        super ({
            key: 'BootScene'
        });
    }

    preload() {
        const width = this.sys.game.config.width;
        const height = this.sys.game.config.height;

        const progress = this.add.graphics();

        this.load.on('progress', (value) => {
            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(0, height / 2, width  * value, 60);
        });

        this.load.on('complete', () => {
            makeAnimations(this);
            progress.destroy();
            this.scene.start('TitleScene');
        });

        this.load.image('background_image', 'assets/background.png');
        this.load.image('spike', 'assets/world/spike.png');
        this.load.image('coin', 'assets/world/coin.png');
        this.load.image('tiles', 'assets/world/platformPack_tilesheet.png');
        this.load.tilemapTiledJSON('map', 'assets/world/phaser_platformer_map.json');

        this.load.atlas('player', 'assets/character/character.png', 'assets/character/character_atlas.json');

        this.load.bitmapFont('font', 'assets/fonts/font.png', 'assets/fonts/font.fnt');

    }
}

export default BootScene;
