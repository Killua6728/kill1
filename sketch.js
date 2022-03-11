var garden,rabbit;
var gardenImg,rabbitImg;
var select_sprites=Math.round(random(1,3))
var redL,redImg,orange,orangeImg,apple,appleImg
function preload(){
  gardenImg = loadImage("garden.png");
  rabbitImg = loadImage("rabbit.png");
  appleImg = loadImage("apple.png");
  orangeImg = loadImage("orangeLeaf.png");
  redImg = loadImage("redImage.png"); 
}

function setup(){
  
  createCanvas(400,400);
  
// mover o fundo
garden=createSprite(200,200);
garden.addImage(gardenImg);

//criar sprite do coelho
rabbit = createSprite(180,340,30,30);
rabbit.scale =0.09;
rabbit.addImage(rabbitImg);
rabbit.x=word.mouseX
}


function draw() {
  background(0);

  function draw() {
    background(0);
  if (frameCount % 80 == 0) {
  if (select_sprites = 1) {
  createApples();
  } } else 
  if (select_sprites == 2) {
  createOrange();
  }else 
  if (select_sprites==3){
  createRed();
  } 
  

  
  edges= createEdgeSprites();
  rabbit.collide(edges);

  drawSprites();
  
}
function createOrange(){
  orange=createSprite(random(50,350),40,10,10)
  orange=addImage(orangeImg)
  orange.scale=0.08
  orange.velocityY=-3
  orange.lifetime=150
}
function createRed(){
  redL=createsprite(random(50,350),40,10,10)
  redL=addImage(redImg)
  redL.scale=0.06
  redL.velocityY=3
  redL.lifetime=150
} 
function createApples() {
  apple = createSprite(random(50, 350),40, 10, 10);
  apple.addImage(appleImg);
  apple.scale-0.07;
  apple.velocityY = 3;
  apple.lifetime = 150
}