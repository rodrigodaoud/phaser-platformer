
import Character from '../sprites/Character';

class GameScene extends Phaser.Scene {
    constructor() {
        super ({ key: 'GameScene' });
    }

    create() {
        this.cameras.main.setBounds(0, 0, 6400, 600);
        this.cameras.main.setBackgroundColor('rgba(162, 240, 240, 1)');

        this.load.image('spike', 'assets/world/spike.png');

        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('phaser_platformer', 'tiles');
        const platform = map.createStaticLayer('world', tileset, 0, -660);
        const decorations = map.createStaticLayer('decoration', tileset, 0, -660);
        const water = map.createStaticLayer('water', tileset, 0, -660);
        const spikeObjects = map.getObjectLayer('spikes')['objects'];
        const coinObjects = map.getObjectLayer('coins')['objects'];

        this.coins = this.physics.add.staticGroup();
        this.spikes = this.physics.add.staticGroup();

        coinObjects.forEach(object => {
            let obj = this.coins.create(object.x, object.y - 720, 'coin').setOrigin(0, 0);
            obj.setSize(object.width, object.height).setOffset(48, 48);
        });

        spikeObjects.forEach(object => {
            let obj = this.spikes.create(object.x, object.y - 720, 'spike').setOrigin(0, 0);
            obj.setSize(object.width + 32, object.height).setOffset(32 , 64);
        });

        this.player = new Character({
            scene: this,
            key: 'player',
            x: 50,
            y: 500,
            frame: 'platformchar_idle'
        });

        this.coinScore = 0;
        this.text = this.add.text(680, 20, `Coins: ${this.coinScore}`, {
            fontSize: '20px',
            fill: '#fff'
        });
        this.text.setScrollFactor(0);

        platform.setCollisionByExclusion(-1, true);

        this.physics.add.collider(this.player, platform);
        this.physics.add.collider(this.player, this.coins, this.collectCoin, null, this);
        this.physics.add.collider(this.player, this.spikes, this.player.playerHit, null, this);

        this.keys = this.input.keyboard.createCursorKeys();

        this.cameras.main.startFollow(this.player);
    }

    collectCoin(player, coin) {
        coin.destroy(coin.x, coin.y);
        this.coinScore ++;
        this.text.setText(`Coins: ${this.coinScore}`);
        return false;
    }

    update() {
        this.player.update(this.keys);
    }
}

export default GameScene;
