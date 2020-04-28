export default class Enemy extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key, config.frame);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        this.body.setSize(this.body.width - 20, this.body.height - 30).setOffset(10, 30);
        this.speed = 100;
        this.initialPosX = config.x;
    }

    update() {
        if (this.body.onFloor()) {
            this.anims.play('enemy_walk', true);
        }

        if (this.body.velocity.x == 0) {
            this.body.setVelocityX(this.speed);
        }

        if (this.body.velocity.x > 0 && this.body.x >= this.initialPosX + 100) {
            this.body.setVelocityX(-this.speed);
            this.flipX = true;
        } else if (this.body.velocity.x < 0 && this.body.x <= this.initialPosX) {
            this.body.setVelocityX(this.speed);
            this.flipX = false;
        }
    }
}
