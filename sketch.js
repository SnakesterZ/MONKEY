//Global Variables
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey, monkeyAnimation, banana, bananaImg, stone, stoneImg;
var ground, groundImg, restart, restartImg, gameOver, gameOverImg,       habitat, habitatImg, score = 0;
var gravity;

function preload(){
  monkeyAnimation = loadAnimation('Monkey_03.png','Monkey_02.png','Monkey_01.png','Monkey_10.png','Monkey_08.png','Monkey_09.png','Monkey_07.png','Monkey_05.png','Monkey_06.png','Monkey_04.png');
  
  bananaImg = loadImage('Banana.png');
  
  stoneImg = loadImage('stone.png');
  
  groundImg = loadImage('ground.png');
  
  restartImg = loadImage('restart.png');
  
  gameOverImg = loadImage('gameOver.png');
  
  habitatImg = loadImage('jungle.jpg');
}


function setup() {
  createCanvas(600,300);
  edges = createEdgeSprites();
 
  ground = createSprite(600,190,600,0);
  ground.addImage('Ground',groundImg);
  ground.scale = 1
  ground.x = ground.width/2;
  
  gravity = 3; 
  
  monkey = createSprite(40,260,9,9);
  monkey.scale = 0.15;
  monkey.addAnimation('MonkeyRun',monkeyAnimation);
  monkey.collide(edges[4]);
  
  BananaGroup = new Group();
  stoneGroup = new Group();
  
  gameOver = createSprite(300,100);
  restart = createSprite(300,160);
  gameOver.addImage("gameOver",gameOverImg);
  gameOver.scale = 1;
  restart.addImage("restart",restartImg);
  
    gameOver.visible = false;
  restart.visible = false;

}


function draw(){
 background(255); 
   
  text('score'+score,350,20);
  
  if(gameState == PLAY){
    
   ground.velocityX = -6;
    
   score = score + Math.round(getFrameRate()/60);
  
   if(keyWentDown('space') && monkey.y>166){
      monkey.velocityY = -35;
  }
  monkey.velocityY = monkey.velocityY + gravity; 
  if(ground.x<0){
    ground.x = ground.width/2;
  }
 
    spawnBanana();
    spawnStone();
   
  }

  if(stoneGroup.isTouching(monkey)){
     gameState = END;
  }

    
    if(gameState == END) {
    gameOver.visible = true;
    restart.visible = true;
      
    ground.velocityX = 0;
    monkey.velocityY = 0;
    stone.setVelocityXEach(0);
    BananaGroup.setVelocityXEach(0);
    
    stoneGroup.setLifetimeEach(-1);
    BananaGroup.setLifetimeEach(-1);
      
       if(mousePressedOver(restart)) {
    reset();
  }
}
  
 
  drawSprites();
}

function spawnBanana() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var bana = createSprite(600,220,40,10);
    bana.y =  Math.round(random(120,200));
    bana.addAnimation('clod',bananaImg);
    bana.scale = 0.05;
    bana.velocityX = -3;
    bana.lifetime = 200;
    BananaGroup.add(bana)
  }
}

function spawnStone() {
  if(frameCount % 60 === 0) {
    var ston = createSprite(600,280,10,40);
        ston.velocityX = -6;
        var rand = Math.round(random(1,6));
        ston.scale = 1;
        ston.lifetime = 200;
        stoneGroup.add(ston);
  }
}

function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  stoneGroup.destroyEach();
  BananaGroup.destroyEach();
  score = 0;
}


