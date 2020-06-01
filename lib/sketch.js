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

function getRndInteger(min, max) 
{
  return Math.floor(Math.random() * (max - min) ) + min;
}

var p = new Point(0, 0, 10);
var mapLimitX = 600;
var mapLimitY = 600;
var gravity = 9.81;
var friction = 0.1;

var balls = [];
var ballNumber = 0;
let button;

function setup() 
{
  // put setup code here
  createCanvas(mapLimitX, mapLimitY);

  createElement('br');

  button = createButton('Add Ball');
  button.mousePressed(AddBall);

  button = createButton('Clear All');
  button.mousePressed(ClearAll);

  button = createButton('Restart');
  button.mousePressed(RestartGame);

  frameRate(60);

  var i;
  for (i = 0; i < ballNumber; i++) 
  {
    balls[i] = new Point(getRndInteger(0, mapLimitX), getRndInteger(0, mapLimitY), 10);
    balls[i].vx = getRndInteger(0, 200);
    balls[i].vy = getRndInteger(0, 200);
  }

}

function RestartGame()
{
  var i;
  for (i = 0; i < ballNumber; i++) 
  {
    balls[i].x = getRndInteger(0, mapLimitX);
    balls[i].y = getRndInteger(0, mapLimitY);

    balls[i].radius = 10;

    balls[i].vx = getRndInteger(0, 200);
    balls[i].vy = getRndInteger(0, 200);
  }
  console.log(balls.length);
}

function AddBall()
{

    ballNumber = balls.push();

    balls[ballNumber] = new Point(getRndInteger(0, mapLimitX), getRndInteger(0, mapLimitY), 10);
    balls[ballNumber].vx = getRndInteger(0, 200);
    balls[ballNumber].vy = getRndInteger(0, 200);

    ballNumber++;
    console.log(ballNumber);
}

function ClearAll()
{

 balls = [];
 ballNumber = 0;

}

function draw() 
{

  background(255);

  //Move Logic
  var i;
  strokeWeight(1);
  stroke(4);
  for (i = 0; i < ballNumber; i++) 
  {
    balls[i].move();
    // put drawing code here
    ellipse(balls[i].x, balls[i].y, balls[i].radius, balls[i].radius);
  }

  strokeWeight(4);
  rect(0, 0, mapLimitX, mapLimitY);
  noFill();
  
}