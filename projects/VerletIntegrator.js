class Point
{

  constructor(x, y, r)
  {
    this.x = x;
    this.y = y;

    this.old_x = x;
    this.old_y = y;
    this.acc_x = 0;
    this.acc_y -gravity;

    this.vx = 0;
    this.vy = 0;
    this.dt = 0.16;

    this.bounce = 0.9;

    this.radius = r;
  }

  move()
  {
      this.old_x = this.x;
      this.old_y = this.y;

      //Update particle position with 
      this.x = this.x + (this.vx * this.dt) + (0.5 * 0. * (this.dt * this.dt));
      this.y = this.y + (this.vy * this.dt) + (0.5 * gravity * (this.dt * this.dt));


      //BOTTOM LIMIT
      if (this.y > mapLimitY - this.radius)
      {
        this.y = mapLimitY - this.radius;
        this.vy *= -1 * this.bounce;
      }
      else if (this.y <= this.radius)
      {
        this.y = this.radius;
        this.vy *= -1 * this.bounce;
      }

      if (this.x >= mapLimitX - this.radius)
      {
        this.x = mapLimitX - this.radius;
        this.vx *= -1 * this.bounce;
      }
      else if (this.x <= this.radius)
      {
        this.x = this.radius;
        this.vx *= -1 * this.bounce;
      }
    
      //Velocity update for the next frame (and next position calculation)
      if (this.vx > 0)
      {
        this.vx = this.vx + (-friction * this.dt);
      }
      else if (this.vx < 0)
      {
        this.vx = this.vx + (friction * this.dt);
      }
      if (this.vx == 0) {
        this.vx = this.vx + (0 * this.dt);
      }
      this.vy = this.vy + (gravity * this.dt);
  }

};

let p = new Point(0, 0, 10);
var mapLimitX = 600;
var mapLimitY = 600;
var gravity = 9.81;
var friction = 0.1;

let balls = [];
let ballNumber = 0;
let button;

let selectedBall = null;

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

function setup() 
{
  // put setup code here
  mapLimitX = document.body.clientWidth;

  var canvas = createCanvas(mapLimitX, mapLimitY);
  // Move the canvas so it’s inside our <div id="sketch-holder">.
  canvas.parent('sketch-holder');

  createElement('br');

  button = createButton('Add Ball');
  button.mousePressed(AddBall);
  button.parent('sketch-holder');

  button = createButton('Restart');
  button.mousePressed(RestartGame);
  button.parent('sketch-holder');

  button = createButton('Clear All');
  button.mousePressed(ClearAll);
  button.parent('sketch-holder');

  frameRate(60);
}

function draw() 
{

  background(30, 30, 30);

  noStroke();
  textSize(16);
  textAlign(CENTER, CENTER);
  fill(250, 250, 250, 60);
  text("Collision correction between balls is cheap, needs a rework", mapLimitX / 2, mapLimitY / 2);
  
  //Move Logic
  fill(0, 255, 0, 150);
  strokeWeight(1);
  stroke(255, 255, 255);
  for (var i = 0; i < ballNumber; i++) 
  {
    balls[i].move();
    // put drawing code here
    
    circle(balls[i].x, balls[i].y, balls[i].radius * 2);
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
    line(mouseX, mouseY, selectedBall.x, selectedBall.y);
    console.log(selectedBall.radius);
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

function mousePressed()
{
  for (var i = 0; i < balls.length; i++)
  {
    if(IsPointInsideCircle(mouseX, mouseY, balls[i]))
    {
      selectedBall = balls[i];
    }

  }
}

function mouseReleased() 
{

  x = mouseX - selectedBall.x;
  y = mouseY - selectedBall.y;

	selectedBall.vx += x / 2;
	selectedBall.vy += y / 2;

  selectedBall = null;
}