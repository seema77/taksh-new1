var PLAY = 1;
var END = 0;
var gameState = PLAY;
var player, playerImg;
var redImg, greenImg, yellowImg;
var bricks, brick;
var score = 0
var congrat;
var life=3;
var blast;

function preload(){
bgImg=loadImage("assets/bg.jpg")
playerImg=loadImage("assets/boy.png");
greenImg=loadImage("assets/greenB.png")
redImg=loadImage("assets/redB.png")
yellowImg=loadImage("assets/yellowB.png")
cImg= loadAnimation("assets/Congrats.gif")
bBoom = loadAnimation("assets/blueBoom.png")
yBoom = loadAnimation("assets/yellowBoom.png")
rBoom = loadImage("assets/redBoom.png")
}

function setup(){
createCanvas(1150,600)

player=createSprite(570,450,20,20);
player.addImage(playerImg)
player.scale=0.3;

ground=createSprite(600,590,1200,20)
ground.shapeColor="blue"

congrat=createSprite(600, 300, 20, 20)
congrat.addAnimation("c1", cImg)
congrat.scale=0.5
congrat.visible=false
redGroup=new Group()
yellowGroup = new Group()
greenGroup = new Group()
player.setCollider("rectangle", 0, 0, 200, 380)
player.debug= true

}

function draw(){
background(bgImg);
textSize(30)
fill("white")
text("Score: "+ score,970, 50)

textSize(30)
fill("white")
text("Life: "+ life,870, 50)

    if (keyDown(UP_ARROW) && player.y>=480) {
      player.velocityY-=5
    }

    if (keyDown(DOWN_ARROW)) {
        player.y += 2.5;
    }

    if (keyDown(LEFT_ARROW)) {
        player.x -= 5;
      }
  
      if (keyDown(RIGHT_ARROW)) {
        player.x += 5;
      }
      
      player.velocityY=player.velocityY+0.5

      if(yellowGroup.isTouching(player)){
        score+=5
        yellowGroup.destroyEach()
      }

      if(greenGroup.isTouching(player)){
        score+=2
        greenGroup.destroyEach()

      }

      // newly added condition

      if(redGroup.collide(player)){
        handleBlast1(redBricks)
       
      }

      if(score >=200){
        congrat.visible=true
        player.destroy()
      }
      player.collide(ground)

      redBricks()
      yellowBricks()
      greenBricks()
drawSprites();
}

function redBricks(){
  if(frameCount % 140 === 0){
    brick=createSprite(random(0,1000),50,20,20)
   // brick.addImage("red",rBoom)
    brick.velocityY+=3+score/5
    brick.addImage(redImg)
    brick.scale=0.1
    redGroup.add(brick)
  }
}

function yellowBricks(){
  if(frameCount % 150 === 0){
    brick1=createSprite(random(300,600),50,20,20)
    brick1.velocityY+=3
    brick1.addImage(yellowImg)
    brick1.scale=0.1
    yellowGroup.add(brick1)
  }
}

function greenBricks(){
  if(frameCount % 200 === 0){
    brick2=createSprite(random(600,1000),50,20,20)
    brick2.velocityY+=3
    brick2.addImage(greenImg)
    brick2.scale=0.1
    greenGroup.add(brick2)
  }
}

function handleBlast1(brickGroup){
  if(life>0){
   life=life-1;
  }
  blast=createSprite(brick.x,brick.y,20,20)
  blast.addImage(rBoom)
  blast.scale=0.1;
  blast.lifetime=10;
  redGroup.destroyEach();
 
}