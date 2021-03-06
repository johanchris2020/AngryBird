const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var gameState = "onSling";
var sling;
var engine, world;
var ground, platform;
var box1, box2, box3, box4, box5;
var pig1, pig2;
var log1, log2, log3, log4, constrainedLog;
var bird;
var backgroundImage;
var score = 0;

function preload(){
//backgroundImage = loadImage("sprites/bg.png")
getTime();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;
    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);
    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810,350);
    log1 = new Log(810,260,300,PI/2);
    
    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig2 = new Pig(810,220);
    log2 = new Log(810,180,300,PI/2);

    box5 = new Box(810,160,70,70);
    log3 = new Log(760,120,150,PI/7);
    log4 = new Log(870,120,150,-PI/7);

    bird = new Bird(100,100);
 // constrainedLog = new Log(230, 180, 80, PI/2);
    sling = new SlingShot(bird.body,{x: 200, y: 50});
}

function draw(){
    if(backgroundImage){
    background(backgroundImage);
    }
    fill("white");
    textSize(25);
    text("Score: "+score, 600,50);
    Engine.update(engine);
    box1.display();
    box2.display();
    ground.display();
    platform.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig2.display();
    pig2.score();
    log2.display();

    box5.display();
    log3.display();
    log4.display();

    bird.display();
//  constrainedLog.display();
    sling.display();


    
}

function mouseDragged(){
    if (gameState !== "launch"){
        Matter.Body.setPosition(bird.body, {x: mouseX, y: mouseY});
    }
}

function mouseReleased(){
   sling.fly();
   gameState = "launch";
}

function keyPressed(){
    if(keyCode === 32){
        bird.trajectory= [];
        Matter.Body.setPosition(bird.body, {x: 200, y:50})
        sling.attach(bird.body);
        gameState = "onSling";
    }
}

 async function getTime(){
    var response = await fetch("https://worldtimeapi.org/api/timezone/Europe/London");
    var responseJSON =  await response.json();
    
    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour >= 7 && hour <= 19){
        bg = "sprites/bg.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }
    backgroundImage = loadImage(bg);
    console.log(backgroundImage)
}