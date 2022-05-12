var penguin, penguinImg;
var backgroundImg;
var bg;
var iceberg, icebergImg;
var invisibleGround;
var gameState = "start";
var icebergGroup;

function preload () {
  backgroundImg = loadImage ("images/bg.png");
  penguinImg = loadAnimation ("images/penguin-1.png","images/penguin-2.png");
  icebergImg = loadImage ("images/iceberg.png");
}

function setup() {
  createCanvas(1000,700);
  
  bg = createSprite (500, 350);
  bg.addImage (backgroundImg);
  bg.scale = 2.6;
 

  penguin = createSprite(150, 350);
  penguin.addAnimation ("swimming", penguinImg);
  penguin.scale = 0.5;
  penguin.setCollider ("rectangle", 0, 0, 350, 140);

  invisibleGround = createSprite (500, 690, 1000, 10);
  invisibleGround.visible = false;

  icebergGroup = createGroup ();


}

function draw() {
  background(215);

  if (keyDown (32) && gameState === "start") {
    gameState = "play";
  }

  if (gameState === "play") {

    bg.velocityX = -1.5;
    if (bg.x < 0) {
      bg.x = 500;
    }

  if (keyDown (32) && penguin.y >= 40) {
    penguin.velocityY = -10;
  }

  penguin.velocityY += 0.8;

  spawnIcebergs1 ();
  spawnIcebergs2 ();
  if (icebergGroup.isTouching (penguin)) {
    gameState = "end";
  }  
}
 if (gameState === "end") {
  bg.velocityX = 0;
  icebergGroup.setVelocityXEach (0);
  penguin.velocityY = 0;
  textSize (35);
  fill ("yellow");
  text ("GAME OVER !!!!!", 480, 350);
 }
 
 penguin.collide (invisibleGround);
  drawSprites ();
}

function spawnIcebergs1 () {
if (frameCount % 100 === 0) {
iceberg = createSprite (1000, Math.round(random (580, 700)));
iceberg.addImage (icebergImg);
iceberg.velocityX = -6;
iceberg.scale = 0.8;
iceberg.setCollider("rectangle", 0, 0, 140, 470);

icebergGroup.add (iceberg);
}
}

function spawnIcebergs2 () {
  if (frameCount % 100 === 0) {
  iceberg = createSprite (1000, Math.round(random (150, 20)));
  iceberg.addImage (icebergImg);
  iceberg.velocityX = -6;
  iceberg.scale = 0.8;
  iceberg.setCollider("rectangle", 0, 0, 140, 470);

  icebergGroup.add (iceberg);
  }
  }