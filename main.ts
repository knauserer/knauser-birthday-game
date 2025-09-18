enum ActionKind {
    Walking,
    Idle,
    Jumping
}
namespace SpriteKind {
    export const CoinKind = SpriteKind.create()
}
scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    if (sprite.isHittingTile(CollisionDirection.Bottom)) {
        numberOfJumpRemaining = numberOfJumps
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile`, function (sprite, location) {
    game.gameOver(false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.CoinKind, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    sprites.destroy(otherSprite)
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    doJump()
})
function doJump () {
    if (numberOfJumpRemaining > 0) {
        hero.vy = 0 - Math.sqrt(jumpHeight * (2 * gravity))
        numberOfJumpRemaining += -1
        music.play(music.createSoundEffect(WaveShape.Square, 400, 600, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
    }
}
let jumpHeight = 0
let numberOfJumpRemaining = 0
let numberOfJumps = 0
let gravity = 0
let coin: Sprite = null
let hero: Sprite = null
hero = sprites.create(assets.image`monkey`, SpriteKind.Player)
scene.setBackgroundColor(9)
scene.cameraFollowSprite(hero)
tiles.setCurrentTilemap(tilemap`level4`)
tiles.placeOnRandomTile(hero, assets.tile`start_tile`)
for (let value of tiles.getTilesByType(assets.tile`start_tile`)) {
    tiles.setTileAt(value, assets.tile`transparency16`)
}
for (let value of tiles.getTilesByType(assets.tile`myTile0`)) {
    coin = sprites.create(img`
        . . b b b b . . 
        . b 5 5 5 5 b . 
        b 5 d 3 3 d 5 b 
        b 5 3 5 5 1 5 b 
        c 5 3 5 5 1 d c 
        c d d 1 1 d d c 
        . f d d d d f . 
        . . f f f f . . 
        `, SpriteKind.CoinKind)
    tiles.placeOnTile(coin, value)
    tiles.setTileAt(value, assets.tile`transparency16`)
    animation.runImageAnimation(
    coin,
    [img`
        . . b b b b . . 
        . b 5 5 5 5 b . 
        b 5 d 3 3 d 5 b 
        b 5 3 5 5 1 5 b 
        c 5 3 5 5 1 d c 
        c d d 1 1 d d c 
        . f d d d d f . 
        . . f f f f . . 
        `,img`
        . . b b b . . . 
        . b 5 5 5 b . . 
        b 5 d 3 d 5 b . 
        b 5 3 5 1 5 b . 
        c 5 3 5 1 d c . 
        c 5 d 1 d d c . 
        . f d d d f . . 
        . . f f f . . . 
        `,img`
        . . . b b . . . 
        . . b 5 5 b . . 
        . b 5 d 1 5 b . 
        . b 5 3 1 5 b . 
        . c 5 3 1 d c . 
        . c 5 1 d d c . 
        . . f d d f . . 
        . . . f f . . . 
        `,img`
        . . . b b . . . 
        . . b 5 5 b . . 
        . . b 1 1 b . . 
        . . b 5 5 b . . 
        . . b d d b . . 
        . . c d d c . . 
        . . c 3 3 c . . 
        . . . f f . . . 
        `,img`
        . . . b b . . . 
        . . b 5 5 b . . 
        . b 5 1 d 5 b . 
        . b 5 1 3 5 b . 
        . c d 1 3 5 c . 
        . c d d 1 5 c . 
        . . f d d f . . 
        . . . f f . . . 
        `,img`
        . . . b b b . . 
        . . b 5 5 5 b . 
        . b 5 d 3 d 5 b 
        . b 5 1 5 3 5 b 
        . c d 1 5 3 5 c 
        . c d d 1 d 5 c 
        . . f d d d f . 
        . . . f f f . . 
        `],
    100,
    true
    )
}
gravity = 350
numberOfJumps = 1
numberOfJumpRemaining = numberOfJumps
jumpHeight = 34
let isFacingLeft = false
let isWalking = false
let isInAir = false
hero.ay = gravity
characterAnimations.loopFrames(
hero,
[img`
    . . . . f f f f f . . . . . . . 
    . . . f e e e e e f . . . . . . 
    . . f d d d d e e e f . . . . . 
    . c d f d d f d e e f f . . . . 
    . c d f d d f d e e d d f . . . 
    c d e e d d d d e e b d c . . . 
    c d d d d c d d e e b d c . f f 
    c c c c c d d d e e f c . f e f 
    . f d d d d d e e f f . . f e f 
    . . f f f f f e e e e f . f e f 
    . . . . f e e e e e e e f f e f 
    . . . f e f f e f e e e e f f . 
    . . . f e f f e f e e e e f . . 
    . . . f d b f d b f f e f . . . 
    . . . f d d c d d b b d f . . . 
    . . . . f f f f f f f f f . . . 
    `,img`
    . . . . f f f f f . . . . . . . 
    . . . f e e e e e f . . . . . . 
    . . f d d d d e e e f . . . . . 
    . c d f d d f d e e f . . . . . 
    . c d f d d f d e e f f . . . . 
    c d e e d d d d e e d d f . . . 
    c d d d d c d d e e b d c . . . 
    c c c c c d d e e e b d c . f f 
    . f d d d d e e e f f c . f e f 
    . f f f f f f e e e e f . f e f 
    . f f f f e e e e e e e f f e f 
    f d d f d d f e f e e e e f f . 
    f d b f d b f e f e e e e f . . 
    f f f f f f f f f f f f e f . . 
    . . . . . . . . . f c d d f . . 
    . . . . . . . . . . f f f f . . 
    `,img`
    . . . . f f f f f . . . . . . . 
    . . . f e e e e e f . . . . . . 
    . . f d d d d e e e f f . . . . 
    . c d d d d d d e e d d f . . . 
    . c d f d d f d e e b d c . . . 
    c d d f d d f d e e b d c . f f 
    c d e e d d d d e e f c . f e f 
    c d d d d c d e e e f . . f e f 
    . f c c c d e e e f f . . f e f 
    . . f f f f f e e e e f . f e f 
    . . . . f e e e e e e e f f f . 
    . . f f e f e e f e e e e f . . 
    . f e f f e e f f f e e e f . . 
    f d d b d d c f f f f f f b f . 
    f d d c d d d f . . f c d d f . 
    . f f f f f f f . . . f f f . . 
    `,img`
    . . . . f f f f f . . . . . . . 
    . . . f e e e e e f f f . . . . 
    . . f d d d e e e e d d f . . . 
    . c d d d d d e e e b d c . . . 
    . c d d d d d d e e b d c . . . 
    c d d f d d f d e e f c . f f . 
    c d d f d d f d e e f . . f e f 
    c d e e d d d d e e f . . f e f 
    . f d d d c d e e f f . . f e f 
    . . f f f d e e e e e f . f e f 
    . . . . f e e e e e e e f f f . 
    . . . . f f e e e e e b f f . . 
    . . . f e f f e e c d d f f . . 
    . . f d d b d d c f f f . . . . 
    . . f d d c d d d f f . . . . . 
    . . . f f f f f f f . . . . . . 
    `,img`
    . . . . f f f f f . . . . . . . 
    . . . f e e e e e f . . . . . . 
    . . f d d d d e e e f . . . . . 
    . c d f d d f d e e f f . . . . 
    . c d f d d f d e e d d f . . . 
    c d e e d d d d e e b d c . . . 
    c d d d d c d d e e b d c . . . 
    c c c c c d d e e e f c . . . . 
    . f d d d d e e e f f . . . . . 
    . . f f f f f e e e e f . . . . 
    . . . . f f e e e e e e f . f f 
    . . . f e e f e e f e e f . e f 
    . . f e e f e e f e e e f . e f 
    . f b d f d b f b b f e f f e f 
    . f d d f d d f d d b e f f f f 
    . . f f f f f f f f f f f f f . 
    `],
100,
characterAnimations.rule(Predicate.MovingLeft, Predicate.HittingWallDown)
)
characterAnimations.loopFrames(
hero,
[img`
    . . . . . . . f f f f f . . . . 
    . . . . . . f e e e e e f . . . 
    . . . . . f e e e d d d d f . . 
    . . . . f f e e d f d d f d c . 
    . . . f d d e e d f d d f d c . 
    . . . c d b e e d d d d e e d c 
    f f . c d b e e d d c d d d d c 
    f e f . c f e e d d d c c c c c 
    f e f . . f f e e d d d d d f . 
    f e f . f e e e e f f f f f . . 
    f e f f e e e e e e e f . . . . 
    . f f e e e e f e f f e f . . . 
    . . f e e e e f e f f e f . . . 
    . . . f e f f b d f b d f . . . 
    . . . f d b b d d c d d f . . . 
    . . . f f f f f f f f f . . . . 
    `,img`
    . . . . . . . f f f f f . . . . 
    . . . . . . f e e e e e f . . . 
    . . . . . f e e e d d d d f . . 
    . . . . . f e e d f d d f d c . 
    . . . . f f e e d f d d f d c . 
    . . . f d d e e d d d d e e d c 
    . . . c d b e e d d c d d d d c 
    f f . c d b e e e d d c c c c c 
    f e f . c f f e e e d d d d f . 
    f e f . f e e e e f f f f f f . 
    f e f f e e e e e e e f f f f . 
    . f f e e e e f e f d d f d d f 
    . . f e e e e f e f b d f b d f 
    . . f e f f f f f f f f f f f f 
    . . f d d c f . . . . . . . . . 
    . . f f f f . . . . . . . . . . 
    `,img`
    . . . . . . . f f f f f . . . . 
    . . . . . . f e e e e e f . . . 
    . . . . f f e e e d d d d f . . 
    . . . f d d e e d d d d d d c . 
    . . . c d b e e d f d d f d c . 
    f f . c d b e e d f d d f d d c 
    f e f . c f e e d d d d e e d c 
    f e f . . f e e e d c d d d d c 
    f e f . . f f e e e d c c c f . 
    f e f . f e e e e f f f f f . . 
    . f f f e e e e e e e f . . . . 
    . . f e e e e f e e f e f f . . 
    . . f e e e f f f e e f f e f . 
    . f b f f f f f f c d d b d d f 
    . f d d c f . . f d d d c d d f 
    . . f f f . . . f f f f f f f . 
    `,img`
    . . . . . . . f f f f f . . . . 
    . . . . f f f e e e e e f . . . 
    . . . f d d e e e e d d d f . . 
    . . . c d b e e e d d d d d c . 
    . . . c d b e e d d d d d d c . 
    . f f . c f e e d f d d f d d c 
    f e f . . f e e d f d d f d d c 
    f e f . . f e e d d d d e e d c 
    f e f . . f f e e d c d d d f . 
    f e f . f e e e e e d f f f . . 
    . f f f e e e e e e e f . . . . 
    . . f f b e e e e e f f . . . . 
    . . f f d d c e e f f e f . . . 
    . . . . f f f c d d b d d f . . 
    . . . . . f f d d d c d d f . . 
    . . . . . . f f f f f f f . . . 
    `,img`
    . . . . . . . f f f f f . . . . 
    . . . . . . f e e e e e f . . . 
    . . . . . f e e e d d d d f . . 
    . . . . f f e e d f d d f d c . 
    . . . f d d e e d f d d f d c . 
    . . . c d b e e d d d d e e d c 
    . . . c d b e e d d c d d d d c 
    . . . . c f e e e d d c c c c c 
    . . . . . f f e e e d d d d f . 
    . . . . f e e e e f f f f f . . 
    f f . f e e e e e e f f . . . . 
    f e . f e e f e e f e e f . . . 
    f e . f e e e f e e f e e f . . 
    f e f f e f b b f b d f d b f . 
    f f f f e b d d f d d f d d f . 
    . f f f f f f f f f f f f f . . 
    `],
100,
characterAnimations.rule(Predicate.MovingRight, Predicate.HittingWallDown)
)
controller.moveSprite(hero, 100, 0)
game.setGameOverEffect(false, effects.melt)
info.setScore(0)
info.setLife(3)
game.onUpdate(function () {
    if (controller.left.isPressed()) {
        isFacingLeft = true
    }
    if (controller.right.isPressed()) {
        isFacingLeft = false
    }
    if (Math.abs(hero.vx) > 0) {
        isWalking = true
    } else {
        isWalking = false
    }
    if (Math.abs(hero.vy) > 0) {
        isInAir = true
    } else {
        isInAir = false
    }
    if (hero.isHittingTile(CollisionDirection.Bottom) && !(isWalking)) {
        if (isFacingLeft) {
            hero.setImage(img`
                . . . . f f f f f . . . . . . . 
                . . . f e e e e e f . . . . . . 
                . . f d d d d e e e f . . . . . 
                . c d f d d f d e e f f . . . . 
                . c d f d d f d e e d d f . . . 
                c d e e d d d d e e b d c . . . 
                c d d d d c d d e e b d c . . . 
                c c c c c d d e e e f c . . . . 
                . f d d d d e e e f f . . . . . 
                . . f f f f f e e e e f . . . . 
                . . . . f f e e e e e e f . f f 
                . . . f e e f e e f e e f . e f 
                . . f e e f e e f e e e f . e f 
                . f b d f d b f b b f e f f e f 
                . f d d f d d f d d b e f f f f 
                . . f f f f f f f f f f f f f . 
                `)
        } else {
            hero.setImage(img`
                . . . . . . . f f f f f . . . . 
                . . . . . . f e e e e e f . . . 
                . . . . . f e e e d d d d f . . 
                . . . . f f e e d f d d f d c . 
                . . . f d d e e d f d d f d c . 
                . . . c d b e e d d d d e e d c 
                . . . c d b e e d d c d d d d c 
                . . . . c f e e e d d c c c c c 
                . . . . . f f e e e d d d d f . 
                . . . . f e e e e f f f f f . . 
                f f . f e e e e e e f f . . . . 
                f e . f e e f e e f e e f . . . 
                f e . f e e e f e e f e e f . . 
                f e f f e f b b f b d f d b f . 
                f f f f e b d d f d d f d d f . 
                . f f f f f f f f f f f f f . . 
                `)
        }
    }
    if (!(hero.isHittingTile(CollisionDirection.Bottom)) && isInAir) {
        if (isFacingLeft) {
            if (hero.vy < 0) {
                hero.setImage(img`
                    . . . . f f f f f . . . . . . . 
                    . . . f e e e e e f . . . . . . 
                    . . f d d d d e e e f . . . . . 
                    . c d f d d f d e e f . . . . . 
                    . c d f d d f d e e f f . . . . 
                    c d e e d d d d e e d d f . . . 
                    c d d d d c d d e e b d c . . . 
                    c c c c c d d e e e b d c . f f 
                    . f d d d d e e e f f c . f e f 
                    . f f f f f f e e e e f . f e f 
                    . f f f f e e e e e e e f f e f 
                    f d d f d d f e f e e e e f f . 
                    f d b f d b f e f e e e e f . . 
                    f f f f f f f f f f f f e f . . 
                    . . . . . . . . . f c d d f . . 
                    . . . . . . . . . . f f f f . . 
                    `)
            } else {
                hero.setImage(img`
                    . . . . f f f f f . . . . . . . 
                    . . . f e e e e e f f f . . . . 
                    . . f d d d e e e e d d f . . . 
                    . c d d d d d e e e b d c . . . 
                    . c d d d d d d e e b d c . . . 
                    c d d f d d f d e e f c . f f . 
                    c d d f d d f d e e f . . f e f 
                    c d e e d d d d e e f . . f e f 
                    . f d d d c d e e f f . . f e f 
                    . . f f f d e e e e e f . f e f 
                    . . . . f e e e e e e e f f f . 
                    . . . . f f e e e e e b f f . . 
                    . . . f e f f e e c d d f f . . 
                    . . f d d b d d c f f f . . . . 
                    . . f d d c d d d f f . . . . . 
                    . . . f f f f f f f . . . . . . 
                    `)
            }
        } else {
            if (hero.vy < 0) {
                hero.setImage(img`
                    . . . . . . . f f f f f . . . . 
                    . . . . . . f e e e e e f . . . 
                    . . . . . f e e e d d d d f . . 
                    . . . . . f e e d f d d f d c . 
                    . . . . f f e e d f d d f d c . 
                    . . . f d d e e d d d d e e d c 
                    . . . c d b e e d d c d d d d c 
                    f f . c d b e e e d d c c c c c 
                    f e f . c f f e e e d d d d f . 
                    f e f . f e e e e f f f f f f . 
                    f e f f e e e e e e e f f f f . 
                    . f f e e e e f e f d d f d d f 
                    . . f e e e e f e f b d f b d f 
                    . . f e f f f f f f f f f f f f 
                    . . f d d c f . . . . . . . . . 
                    . . f f f f . . . . . . . . . . 
                    `)
            } else {
                hero.setImage(img`
                    . . . . . . . f f f f f . . . . 
                    . . . . f f f e e e e e f . . . 
                    . . . f d d e e e e d d d f . . 
                    . . . c d b e e e d d d d d c . 
                    . . . c d b e e d d d d d d c . 
                    . f f . c f e e d f d d f d d c 
                    f e f . . f e e d f d d f d d c 
                    f e f . . f e e d d d d e e d c 
                    f e f . . f f e e d c d d d f . 
                    f e f . f e e e e e d f f f . . 
                    . f f f e e e e e e e f . . . . 
                    . . f f b e e e e e f f . . . . 
                    . . f f d d c e e f f e f . . . 
                    . . . . f f f c d d b d d f . . 
                    . . . . . f f d d d c d d f . . 
                    . . . . . . f f f f f f f . . . 
                    `)
            }
        }
    }
})
