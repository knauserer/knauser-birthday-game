controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    hero.vy = -1 * Math.sqrt(32 * (2 * gravity))
})
let gravity = 0
let hero: Sprite = null
scene.setBackgroundColor(6)
hero = sprites.create(assets.image`monkey`, SpriteKind.Player)
scene.cameraFollowSprite(hero)
tiles.setCurrentTilemap(tilemap`level1`)
controller.moveSprite(hero, 100, 0)
gravity = 350
game.onUpdate(function () {
    hero.ay = gravity
})
