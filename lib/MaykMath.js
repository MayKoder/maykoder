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