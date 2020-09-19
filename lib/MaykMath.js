let canvas;
let oldJSName= 'ProjectPageInfo.js';
let currentProject = null;


function getRndInteger(min, max) 
{
  return Math.floor(Math.random() * (max - min) ) + min;
}

function IsPointInsideCircle(x, y, circle)
{
  if(pow((x - circle.x),2) + pow((y - circle.y),2) < pow(circle.radius, 2))
  {
    return true;
  }
  return false;
}

function PixelToGrid(x, y, width, height)
{
  return createVector(int(x/width), int(y/height));
}

function removeJS(filename, addName)
{
  var tags = document.getElementsByTagName('script');

  for (var i = tags.length; i >= 0; i--)
  { //search backwards within nodelist for matching elements to remove
   if (tags[i] && tags[i].getAttribute('src') != null && tags[i].getAttribute('src').indexOf(filename) != -1)
    tags[i].parentNode.removeChild(tags[i]); //remove element by calling parentNode.removeChild()
  }
 }

 function smoothScroll(target, duration) 
{
    var target = document.querySelector(target);
    var targetPosition = target.getBoundingClientRect().top;
    var startPosition = window.pageYOffset;
    var distance = targetPosition - startPosition;
    var startTime = null;

    function animation(currentTime)
    {
        if(startTime == null){
            startTime = currentTime;
        }
        var timeElapsed = currentTime - startTime;
        var run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);

        if(timeElapsed < duration)requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

function ChangeProject(projectName)
{
  // ChangeStuff('verletIntegrator', 'projects/VerletIntegrator.js');

  if(currentProject)
    currentProject.remove();
  switch(projectName)
  {

    case "Verlet":
      currentProject = new p5(VerletIntegrator);
      break;



  }

}

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

  move(gravity, friction)
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

class Rect
{
  constructor(x, y, w, h)
  {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
}

function CheckCollision(rect, r)
{

	var detectedX = false;
	var detectedY = false;
	//Check if rect is full inside of r
	if (rect.x > r.x && rect.x + rect.w < r.x + r.w)
	{
    console.log("Hola");
		detectedX = true;
	}

	if (rect.y < r.y + r.h && rect.y + rect.h > r.y)
	{
		detectedY = true;
	}

	return detectedX && detectedY;

}