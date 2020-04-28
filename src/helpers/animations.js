export default function makeAnimations(scene) {
    scene.anims.create({
        key: 'walk',
        frames: scene.anims.generateFrameNames('player', {
            prefix: 'platformchar_walk_',
            start: 1,
            end: 2,
        }),
        frameRate: 10,
        repeat: -1
    });

    scene.anims.create({
        key: 'idle',
        frames: [{ key: 'player', frame: 'platformchar_idle' }],
        frameRate: 10
    });

    scene.anims.create({
        key: 'jump',
        frames: [{ key: 'player', frame: 'platformchar_jump' }],
        frameRate: 10
    });

    scene.anims.create({
        key: 'enemy_walk',
        frames: scene.anims.generateFrameNames('enemy', {
            prefix: 'zombie_walk_',
            start: 1,
            end: 2,
        }),
        frameRate: 10,
        repeat: -1
    })
}