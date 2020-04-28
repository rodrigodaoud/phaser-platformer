export default class Character extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key, config.frame);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        this.body.setSize(this.body.width - 20, this.body.height - 30).setOffset(10, 30);
    }

    update(keys) {
        if (keys.left.isDown && this.body.x <= 0) {
            this.body.x = 0;
        } else if (keys.right.isDown && this.body.x >= 6400) {
            this.body.x = 6400;
        }

        if (keys.left.isDown && this.body.x > 0) {
            this.body.setVelocityX(-200);
            if (this.body.onFloor()) {
                this.anims.play('walk', true);
            }
        } else if (keys.right.isDown && this.body.x < 6400) {
            this.body.setVelocityX(200);
            if (this.body.onFloor()) {
                this.anims.play('walk', true);
            }
        } else {
            this.body.setVelocityX(0);
            if (this.body.onFloor()) {
                this.anims.play('idle', true);
            }
        }

        if (keys.up.isDown && this.body.onFloor()) {
            this.body.setVelocityY(-520);
            this.anims.play('jump', true);
        }

        if (this.body.velocity.x > 0) {
           this.flipX = false;
        } else if (this.body.velocity.x < 0) {
            this.flipX = true;
        }
    }

    playerHit() {
        this.scene.stop('GameScene');
        this.scene.start('EndScene');
    }
}
