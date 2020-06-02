var mapLimitX = 600;
var mapLimitY = 600;

var gridNodes = [];

function setup() 
{
  // put setup code here
  mapLimitX = document.body.clientWidth;

  var canvas = createCanvas(mapLimitX, mapLimitY);
  // Move the canvas so it’s inside our <div id="sketch-holder">.
  canvas.parent('node-grid');

  createElement('br');

  frameRate(60);
}

function draw() 
{
    
    
    background(30, 30, 30);
    
    noStroke();
    textSize(16);
    textAlign(CENTER, CENTER);
    fill(200, 200, 200);
    //text("Grid based project base", mapLimitX / 2, mapLimitY / 2);
    stroke(255, 255, 255, 100);
    for(var y = 0; y <= mapLimitY; y += 20)
    {
        for(var x = 0; x <= mapLimitX; x += 20)
        {
            rect(x, y, 20, 20);
        }
    }
    
    if(mapLimitX != document.body.clientWidth)
    {
        resizeCanvas(document.body.clientWidth, mapLimitY);
        mapLimitX = document.body.clientWidth;
    }




  // noFill();
  // strokeWeight(4);
  // stroke(255, 255, 255);
  // rect(0, 0, mapLimitX, mapLimitY);
}
