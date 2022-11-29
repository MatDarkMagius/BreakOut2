var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":[],"propsByKey":{}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

//Criação das variáveis


var tampar = createSprite(1000, 200, 400, 50);
    tampar.shapeColor = "white";

var baixo = createSprite(200, 399, 400, 0.2);
    baixo.shapeColor = "white";
    
var littleBoxArray = new Array();   

var boxArray = new Array();

for (var i = 0; i < 16; i++) {
  boxArray[i] = createSprite(25 + 50*(i%8), 75+50*(Math.floor(i/8)), 50, 50);
  boxArray[i].shapeColor = rgb(randomNumber(0, 255),randomNumber(0, 255),randomNumber(0, 255));
}

for (var i = 0; i < 8; i++) {
  littleBoxArray[i] = createSprite(25 + 50*i, 75, 40, 40);
  littleBoxArray[i].shapeColor = rgb(randomNumber(0, 255),randomNumber(0, 255),randomNumber(0, 255));
}

var score = boxArray.length + littleBoxArray.length;

var paddle = createSprite(200,390,100,20);

var ball = createSprite(200,200,20,20);

var retangulo = createSprite(1000, 220, 400, 70);
    retangulo.shapeColor= "black";
    
var retangulo2 = createSprite(1000, 200, 400, 110);
    retangulo2.shapeColor= "black";    

createEdgeSprites();

function draw() {
  
  background("white");
  
  
//Movimentos Start
  if(keyWentDown("space")){
      
    ball.velocityX = 5;
    ball.velocityY = 10;
    
    tampar.x = 200;
}

//Pontução    
  

  for (var i = 0; i < 16; i++) {
    if(ball.bounceOff(boxArray[i])){
      boxArray[i].x = 1000;
    
      score = score - 1;
      
    }
  }
  
    for (var i = 0; i < 8; i++) {
    if(ball.bounceOff(littleBoxArray[i])){
      littleBoxArray[i].x = 1000;
    
      score = score - 1;
      
    }
  }
  
//Aumentar velocidade  
  if (ball.bounceOff(paddle)) {
    ball.velocityX = (ball.x - paddle.x) / 4;
  
    ball.velocityY = ball.velocityY - 1;
  }

//Raquete  
  paddle.x = World.mouseX;

//Bounces e collide
  ball.bounceOff(paddle);
  
  ball.bounceOff(rightEdge);
  
  ball.bounceOff(leftEdge);
  
  ball.bounceOff(topEdge);
  
  ball.collide(bottomEdge);
  
  for (var i = 0; i < 16; i++) {
    ball.bounceOff(boxArray[i]);
    
  }
  
  paddle.collide(edges);
 
//Faltam (quadrados) 
  fill("black");
  noStroke();
  textSize(50);
  text("Faltam " + score, 100 , 40);
  
//Mudar de fundo
    if(score == 12){
    background("black");
    paddle.shapeColor = "black";
  }
  
    if(score == 11){
    paddle.shapeColor = "gray";
  }  
  
  if(score == 8){
    background("black");
    paddle.shapeColor = "black";
  }
  
  if(score == 7){
    paddle.shapeColor = "gray";
  }  
  
  if(score == 6){
    background("red");
    paddle.shapeColor = "red";
  }  
  
  if(score == 5){
    paddle.shapeColor = "gray";
  }  
  
  if(score == 4){
    background("black");
    paddle.shapeColor = "black";
  }  
  
  if(score == 3){
    background("red");
    paddle.shapeColor = "red";
  } 
  
  if(score == 2){
    background("red");
    paddle.shapeColor = "red";
  }  
  
  if(score == 1){
    background("red");
    paddle.shapeColor = "red";
  }  
 
  
  fill("black");
  noStroke();
  textSize(30);
  text("Aperte espaço para começar", 10, 200);


  drawSprites();

//Vitória e derrota  
  if(ball.isTouching(baixo)){
  
    fill("red");  
    noStroke();
    textSize(50);
    text("Acabou o jogo", 0, 190);
  
    fill("yellow");
    noStroke();
    textSize(45);
    text("Você não pegou: " + score, 0, 240);
  
    ball.velocityX = 0;
  
    paddle.y = 1000;
  
    retangulo2.x = 200; 
    
  }
  
  if(score == 0){
    
    fill("green");  
    noStroke();
    textSize(70);
    text("Você venceu?", 0, 240);
    
    retangulo.x = 200; 
    
    ball.velocityX = 0;
    
    ball.velocityY = 0;
  
    paddle.y = 1000; 
    
  }
  
}  
// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
