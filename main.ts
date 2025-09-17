scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    if (sprite.isHittingTile(CollisionDirection.Bottom)) {
        numberOfJumpRemaining = numberOfJumps
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    doJump()
})
function doJump () {
    if (numberOfJumpRemaining > 0) {
        hero.vy = 0 - Math.sqrt(jumpHeight * (2 * gravity))
        numberOfJumpRemaining += -1
    }
}
let jumpHeight = 0
let numberOfJumpRemaining = 0
let numberOfJumps = 0
let gravity = 0
let hero: Sprite = null
scene.setBackgroundColor(6)
hero = sprites.create(assets.image`monkey`, SpriteKind.Player)
character.loopFrames(
hero,
[img`
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
    `],
200,
character.rule(Predicate.MovingLeft, Predicate.HittingWallDown)
)
character.loopFrames(
hero,
assets.animation`walking left`,
200,
character.rule(Predicate.MovingRight, Predicate.HittingWallDown)
)
character.loopFrames(
hero,
assets.animation`facing left`,
200,
character.rule(Predicate.FacingLeft, Predicate.HittingWallDown, Predicate.NotMoving)
)
character.loopFrames(
hero,
assets.animation`facing right`,
200,
character.rule(Predicate.FacingRight, Predicate.HittingWallDown, Predicate.NotMoving)
)
scene.cameraFollowSprite(hero)
tiles.setCurrentTilemap(tilemap`level0`)
controller.moveSprite(hero, 100, 0)
gravity = 350
hero.ay = gravity
numberOfJumps = 2
numberOfJumpRemaining = numberOfJumps
jumpHeight = 32
