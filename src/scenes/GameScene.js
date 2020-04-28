
import Character from '../sprites/Character';
import Enemy from '../sprites/Enemy';
import Enemies from '../helpers/enemies';

class GameScene extends Phaser.Scene {
    constructor() {
        super ({ key: 'GameScene' });
    }

    create() {
        this.cameras.main.setBounds(0, 0, 6400, 600);
        this.cameras.main.setBackgroundColor('rgba(162, 240, 240, 1)');

        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('phaser_platformer', 'tiles');
        const platform = map.createStaticLayer('world', tileset, 0, -20);
        const decorations = map.createStaticLayer('decoration', tileset, 0, -20);
        const water = map.createStaticLayer('water', tileset, 0, -20);
        const coinObjects = map.getObjectLayer('coins')['objects'];

        this.coins = this.physics.add.staticGroup();
        this.enemies = this.physics.add.group();

        coinObjects.forEach(object => {
            let obj = this.coins.create(object.x, object.y - 80, 'coin').setOrigin(0, 0);
            obj.setSize(object.width, object.height).setOffset(48, 48);
        });

        Enemies.positions.forEach(enemy => {
            let enemyObject;
            enemyObject = new Enemy({
                scene: this,
                key: 'enemy',
                x: enemy.x,
                y: enemy.y,
                frame: 'zombie_idle'
            });
            this.enemies.add(enemyObject);
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
        this.physics.add.collider(this.enemies, platform);
        this.physics.add.collider(this.player, this.enemies, this.player.playerHit, null, this);
        this.physics.add.collider(this.player, this.coins, this.collectCoin, null, this);

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

        this.enemies.children.entries.forEach((sprite) => {
            sprite.update();
        });

        if (this.coinScore >= 20) {
            this.scene.stop('GameScene');
            this.scene.start('WinnerScene');
        }
    }
}

export default GameScene;
