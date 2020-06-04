var mapLimitX = 600;
var mapLimitY = 600;

let fadeOutSize = 255;
let resize = false;

let inconsolata;
function preload() {
  inconsolata = loadFont('fonts/montserrat/MontserratAlternates-Black.otf');
}


function setup() 
{

    mapLimitX = windowWidth-1;
    mapLimitY = windowHeight-1;

    var cnv = createCanvas(mapLimitX, mapLimitY, WEBGL);
    cnv.style('display', 'block');
    cnv.position(0, 0);

    textFont(inconsolata);
    textSize(width / 15);
    textAlign(CENTER, CENTER);

  }

function draw() 
{
    
    clear();


    fill(30, 30, 30);
    let time = millis();

    
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
    // clear();

    // strokeWeight(fadeOutSize);
    // noFill();
    // rect(0, 0, windowWidth-1, windowHeight-1);

    // if(fadeOutSize >= 0)
    // {
    //     fadeOutSize -= 10 * (deltaTime / 100);

    // }else
    // {
    //     fadeOutSize = 0;
    //     remove();
    // }

ReSizeWindow();
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