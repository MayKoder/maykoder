class Player
{

  constructor(x, y, w, h)
  {
    this.position = new Rect(x, y, w, h);
  }

  Draw()
  {
    rect(this.position.x - (this.position.w / 2), this.position.y - this.position.h, this.position.w, this.position.h);
    circle(this.position.x, this.position.y, 10)
  }

  Move(x, y)
  {
    this.position.x += x;
    this.position.y += y;
  }

}
class Collider
{

  constructor(x, y, w, h)
  {
    this.rect = new Rect(x, y, w, h);
  }

  Draw()
  {
    rect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);
    circle(this.GetMiddleX(), this.GetMiddleY(), 10)
  }

  GetMiddleX() 
  {
    return this.rect.x + (this.rect.w / 2);
  }
  GetMiddleY() 
  {
    return this.rect.y + (this.rect.h / 2);
  }

}


var mapLimitX = 600;
var mapLimitY = 600;

let fadeOutSize = 255;
let resize = false;

let cPlayer = new Player(0, 0, 10, 50);
let GAMESTATE = 0;
var colliders = [];

let inconsolata;

function InputHandler()
{

  var speed = 250 * (deltaTime / 1000)
  //Apply gravity (mapLimitY / 3) == ground level
  if(cPlayer.position.y <= (mapLimitY / 3))
  {
    cPlayer.Move(0, speed);
  }

  if (keyIsDown(65)) 
  {
    cPlayer.Move(-speed, 0);
  }

  if (keyIsDown(68)) 
  {
    cPlayer.Move(speed, 0);
  }

  if (keyIsDown(32)) 
  {
    cPlayer.Move(0, -speed * 2);
  }



}

function preload() {
  inconsolata = loadFont('fonts/montserrat/MontserratAlternates-Black.otf');
}

function setup() 
{

  mapLimitX = windowWidth-1;
  mapLimitY = windowHeight-1;

  var cnv = createCanvas(mapLimitX, mapLimitY, WEBGL);
  cnv.parent('intro-canvas');
  cnv.style('display', 'block');
  cnv.position(0, 0);

    //SUPER IMPORTANT
  oldJSName = 'HomePageText.js';

  textFont(inconsolata);
  textSize(width / 15);
  textAlign(CENTER, CENTER);

  //Load colliders and map
  colliders.push(new Collider(0, 0, 300, 30));


  frameRate(60);

}

function draw() 
{
   
  clear();

  switch (GAMESTATE)
  {

    //Intro
    case 0:

      fill(255, 255, 255);
  
  
      // let angle = Math.atan2(mouseY-width/2, mouseX-width/2);
      // rotateY(angle + radians(90));
      
      // console.log(angle + radians(90) - 1.4);
    
      let a = atan2(0 - height / 2, mouseX - width / 2);
      a = constrain(a, -2, -1.1);
      
      rotateY(a - radians(-90));
      text('MayKoder', 0, - width/15/2);
    
      push();
      textSize(width/40);
      text('Portfolio', 0, 0+width/15 / 2);
      pop();

      break;

    //Main loop game
    case 1:
      
      //Input && Movement
      InputHandler();

      //Collision engine
      for (i = 0; i < colliders.length; i++) 
      {
        if(CheckCollision(cPlayer.position, colliders[i].rect))
        {
          var cVectorX = colliders[i].GetMiddleX() - cPlayer.position.x;
          var cVectorY = colliders[i].GetMiddleY() - cPlayer.position.y;

          // var mag = Math.sqrt(Math.pow(cVectorX, 2) + Math.pow(cVectorY, 2));
          // cVectorX = (cVectorX / mag);
          // cVectorY = (cVectorY / mag);

          console.log(cVectorX, cVectorY);

          cPlayer.Move(-cVectorX, -cVectorY);
        }
      }
      
      //Render
      for (i = 0; i < colliders.length; i++) 
      {
        colliders[i].Draw();
      }

      cPlayer.Draw();
      // text(deltaTime, 0, 0);

      break;
  }


  ReSizeWindow();
}

function mousePressed() 
{
  if(GAMESTATE < 1)
    ++GAMESTATE;
}

function ReSizeWindow()
{
    textSize(width / 15);
    if(mapLimitX != windowWidth-1 || mapLimitY != windowHeight-1)
    {

        mapLimitX = windowWidth-1;
        mapLimitY = windowHeight-1;
        resizeCanvas(mapLimitX, mapLimitY);
    }
}