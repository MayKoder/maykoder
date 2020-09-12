const VerletIntegrator = VerletIntegrator => {

  
  var mapLimitX = 600;
  var mapLimitY = 600;
  var gravity = 9.81;
  var friction = 0.1;

  let balls = [];
  let ballNumber = 0;
  let button;

  let selectedBall = null;


  VerletIntegrator.setup = function() 
  {
    // put setup code here
    mapLimitX = document.body.clientWidth;

    if(!canvas)
    {
      canvas = VerletIntegrator.createCanvas(mapLimitX, mapLimitY);
    }
  
    //SUPER IMPORTANT
    oldJSName = 'VerletIntegrator.js';
  
    button = VerletIntegrator.createButton('Add Ball');
    button.mousePressed(AddBall);
    button.parent('pj-canvas');
  
    button = VerletIntegrator.createButton('Restart');
    button.mousePressed(RestartGame);
    button.parent('pj-canvas');
  
    button = VerletIntegrator.createButton('Clear All');
    button.mousePressed(ClearAll);
    button.parent('pj-canvas');
  
    VerletIntegrator.frameRate(60);
  };

  VerletIntegrator.draw = function() 
  {
    VerletIntegrator.background(30, 30, 30);
  
    VerletIntegrator.noStroke();
    VerletIntegrator.textSize(16);
    VerletIntegrator.textAlign(VerletIntegrator.CENTER, VerletIntegrator.CENTER);
    VerletIntegrator.fill(250, 250, 250, 60);
    VerletIntegrator.text("Collision correction between balls is cheap, needs a rework", mapLimitX / 2, mapLimitY / 2);
    
    //Move Logic
    VerletIntegrator.fill(0, 255, 0, 150);
    VerletIntegrator.strokeWeight(1);
    VerletIntegrator.stroke(255, 255, 255);
    for (var i = 0; i < ballNumber; i++) 
    {
      balls[i].move(gravity, friction);
      // put drawing code here
      
      VerletIntegrator.circle(balls[i].x, balls[i].y, balls[i].radius * 2);
    }
  
    //Check collisions
    for (var i = 0; i < balls.length; i++)
    {
      for (var j = 0; j < balls.length; j++)
      {
  
        if(balls[i] != balls[j])
        {
            if (pow((balls[i].x - balls[j].x), 2) + pow((balls[j].y - balls[i].y), 2) <= pow((balls[j].radius + balls[i].radius), 2))
            {
              OnCollision(balls[i], balls[j]);
            }
        }
      }
    }
  
    //Dragg logic
    if(selectedBall != null)
    {
      VerletIntegrator.line(mouseX, mouseY, selectedBall.x, selectedBall.y);
      console.log(selectedBall.radius);
    }
  
    if(mapLimitX != document.body.clientWidth)
    {
      VerletIntegrator.resizeCanvas(document.body.clientWidth, mapLimitY);
      mapLimitX = document.body.clientWidth;
    }
  };


  function RestartGame()
  {
    let i;
    for (i = 0; i < ballNumber; i++) 
    {
      balls[i].x = getRndInteger(0, mapLimitX);
      balls[i].y = getRndInteger(0, mapLimitY);
  
      balls[i].vx = getRndInteger(0, 200);
      balls[i].vy = getRndInteger(0, 200);
    }
    console.log(balls.length);
  }
  
  function AddBall()
  {
  
    ballNumber = balls.push();
  
    balls[ballNumber] = new Point(getRndInteger(0, mapLimitX), getRndInteger(0, mapLimitY), getRndInteger(10, 30));
    balls[ballNumber].vx = getRndInteger(0, 100);
    balls[ballNumber].vy = getRndInteger(0, 100);
  
    ballNumber++;
  }
  
  function ClearAll()
  {
  
   balls = [];
   ballNumber = 0;
  
  }
  
  function OnCollision(p, check_Point)
  {
    p.vx *= -1 * p.bounce;
    p.vy *= -1 * p.bounce;
  
    //Ball collision correction
    var fDistance = sqrt((check_Point.x - p.x)*(check_Point.x - p.x) + (check_Point.y - p.y)*(check_Point.y - p.y));
    var fOverlap = 0.5 * (fDistance - check_Point.radius - p.radius) - 1;
  
    //Move objects outside collision + dt to fix overlap?
    check_Point.x -= fOverlap * (check_Point.x - p.x) / fDistance;
    check_Point.y -= fOverlap * (check_Point.y - p.y) / fDistance;
    p.x += fOverlap * (check_Point.x - p.x) / fDistance;
    p.y += fOverlap * (check_Point.y - p.y) / fDistance;
  
    //Invert velocity to simulate elastic collision
    check_Point.vx = p.vx;
    check_Point.vx *= -1 * check_Point.bounce;
    check_Point.vy = p.vy;
    check_Point.vy *= -1 * check_Point.bounce;
  }

  
  
  VerletIntegrator.mousePressed =  function()
  {
    for (var i = 0; i < balls.length; i++)
    {
      if(IsPointInsideCircle(mouseX, mouseY, balls[i]))
      {
        selectedBall = balls[i];
      }
  
    }
  }
  
  VerletIntegrator.mouseReleased =  function() 
  {
  
    if(selectedBall)
    {
      x = mouseX - selectedBall.x;
      y = mouseY - selectedBall.y;
    
      selectedBall.vx += x / 2;
      selectedBall.vy += y / 2;
    
      selectedBall = null;
    }
  }

};