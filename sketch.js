var trex, trex_running, trexmorto, pulo, check, die
var ground, groundImg, gamestarteimg, gameoverimg, gameS, gameO
var invisibleground
var cloud, cloundimg, cact1, cact2, cact3, cact4, cact5, cact6, cactos
var pontos = 0
var play = 1
var end = 0
var gamestarte = play
var grupodecact
var grupodenuvem

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png")
  groundImg = loadImage("ground2.png")
  cloundimg = loadImage("cloud.png")
  gameoverimg = loadImage("gameOver.png")
  gamestarteimg = loadImage("restart.png")
  trexmorto = loadImage("trex_collided.png")
  pulo = loadSound("jump.mp3")
  die = loadSound("die.mp3")
  check = loadSound("checkpoint.mp3")
  cact1 = loadImage("obstacle1.png")
  cact2 = loadImage("obstacle2.png")
  cact3 = loadImage("obstacle3.png")
  cact4 = loadImage("obstacle4.png")
  cact5 = loadImage("obstacle5.png")
  cact6 = loadImage("obstacle6.png")
}

function setup() {
  createCanvas(600, 200)
  //create a trex sprite
  trex = createSprite(50, 140, 20, 50)
  trex.addAnimation("running", trex_running)
  trex.addImage("collided", trexmorto)
  trex.scale = 0.5
  ground = createSprite(200, 180, 400, 20)
  ground.addImage(groundImg)
  invisibleground = createSprite(200, 190, 400, 10)
  invisibleground.visible = false
  gameO = createSprite(300, 100)
  gameS = createSprite(300, 140)
  gameO.addImage(gameoverimg)
  gameS.addImage(gamestarteimg)
  gameO.scale = 0.5
  gameS.scale = 0.5
  gameO.visible = false
  gameS.visible = false
  grupodecact = new Group()
  grupodenuvem = new Group()
  trex.setCollider("circle", 0, 0, 40)
  trex.debug = true
}

function draw() {

  background("white")
  text("pontuaçao " + pontos, 500, 50)

  if (gamestarte === play) {
    pontos = Math.round(pontos +getFrameRate() / 60)
    ground.velocityX = -(4 + 3 * pontos / 100)
    if (pontos % 100 === 0 && pontos > 0) {
      check.play()
    }
    if (keyDown("space") && trex.y > 140) {
      trex.velocityY = -10
      pulo.play()
    }
    trex.velocityY = trex.velocityY + 0.8
    if (ground.x < 0) {
      ground.x = ground.width / 2
    }
    spawclouds()
    spawcactos()
    if (grupodecact.isTouching(trex)) {
      gamestarte = end
      die.play()
      //trex.velocityY=-10
    }
  } else if (gamestarte === end) {
    ground.velocityX = 0
    grupodenuvem.setVelocityXEach(0)
    grupodecact.setVelocityXEach(0)
    trex.velocityY = 0
    trex.changeAnimation("collided")
    gameO.visible = true
    gameS.visible = true
    grupodenuvem.setLifetimeEach(-1)
    grupodecact.setLifetimeEach(-1)
    if (mousePressedOver(gameS)) {
      reset()
    }
  }


  trex.collide(invisibleground)



  drawSprites()
}

function reset() {
  gamestarte = play
  grupodecact.destroyEach()
  grupodenuvem.destroyEach()
  gameS.visible = false
  gameO.visible = false
  trex.changeAnimation("running")
  pontos = 0
}

function spawclouds() {
  if (frameCount % 60 === 0) {
    cloud = createSprite(600, 100, 40, 10)
    cloud.velocityX = -3
    cloud.addImage(cloundimg)
    cloud.scale = 0.7
    cloud.y = Math.round(random(20, 80))
    cloud.lifetime = 200
    cloud.depth = trex.depth
    trex.depth += 1


    grupodenuvem.add(cloud)
  }
}

function spawcactos() {
  if (frameCount % 60 === 0) {
    cacto = createSprite(600, 165, 10, 40)
    cacto.velocityX = -(6 + pontos / 100)
    var rand = Math.round(random(1, 6))
    switch (rand) {
      case 1:
        cacto.addImage(cact1)
        break;
      case 2:
        cacto.addImage(cact2)
        break;
      case 3:
        cacto.addImage(cact3)
        break;
      case 4:
        cacto.addImage(cact4)
        break;
      case 5:
        cacto.addImage(cact5)
        break;
      case 6:
        cacto.addImage(cact6)
        break;
      default:
        break;
    }
    cacto.lifetime = 200
    cacto.scale = 0.5
    grupodecact.add(cacto)
  }
}