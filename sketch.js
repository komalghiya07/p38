var tower,towerImage;
var ghost,ghostImage;
var door,doorImage,doorGroup;
var climber,climberImage,climberGroup;
var PLAY=1;
var END=0;
var gameState=PLAY;
var block,blockGroup;
var ground;

function preload(){
  towerImage=loadImage("tower.png");
  doorImage=loadImage("door.png");
  climberImage=loadImage("climber.png");
  ghostImage=loadImage("ghost-standing.png");
}

function setup(){
  createCanvas(displayWidth,displayHeight);
  
  tower=createSprite(displayWidth/2,camera.y,displayWidth,displayHeight);
  tower.addImage("bg",towerImage);
  tower.velocityY=3;
  tower.scale=3;
  
  ground=createSprite(displayWidth/2,displayHeight/2+50,50,10);

  ghost=createSprite(displayWidth/2,displayHeight/2,10,50);
  ghost.addImage("ghost",ghostImage);
  ghost.scale=0.4;
  
  doorGroup=new Group();
  climberGroup=new Group();
  blockGroup=new Group();
}

function draw(){
  background(0);
  
  if(gameState===PLAY){
  
  if(tower.y>displayHeight){
    tower.y=displayHeight/2;
  }
  
  if(keyDown("space")){
    ghost.velocityY=-5;
    ground.destroy();
  }
  ghost.velocityY=ghost.velocityY+0.5;
  camera.position.x=displayWidth/2;
  camera.position.y=ghost.y;
  if(keyDown("left")){
     ghost.x=ghost.x-3;  
  }
  
   if(keyDown("right")){
     ghost.x=ghost.x+3;  
  }
  
  if(ghost.isTouching(climberGroup)){
     ghost.velocityY=0;
  }
    
 if(ghost.isTouching(blockGroup) || ghost.y>600){
   gameState=END;
 }
  SpawnDoor();
  
  drawSprites();
  }
  if(gameState===END){
    fill("yellow");
    textSize(50);
    text("GAME OVER",displayWidth/2-150,displayHeight/2-150);
  }
}
function SpawnDoor(){
  if(frameCount%200==0){
  door=createSprite(300,0,20,20);
  door.x=Math.round(random(displayWidth/2-670,displayWidth/2+670));
  door.addImage("door",doorImage);
  door.velocityY=3;
  door.lifeTime=500;
  door.scale=2;
    
  climber=createSprite(300,100,20,20);
  climber.x=door.x;
  climber.addImage("climber",climberImage);
  climber.velocityY=3;
  climber.lifeTime=500;
  climber.scale=2;
    
  block=createSprite(300,110,20,5);
  block.width=climber.width;
 // block.height=climber.height;
  block.x=door.x;
  block.velocityY=3;
  block.lifeTime=200;
  block.visible=false;
  //block.debug=true;
    
  blockGroup.add(block);
  climberGroup.add(climber);
  doorGroup.add(door);
    
    door.depth=ghost.depth;
    ghost.depth=ghost.depth+1;
  }
  
}

