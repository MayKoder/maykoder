var mapLimitX = 600;
var mapLimitY = 600;

let fadeOutSize = 255;
let resize = false;
let infoText = 'Click in a project with the "JavaScript" tag to execite it here, if the project is not made with JS, clicking on it will open a new tab to GitHub or a page where you can play it. IF YOU CHANGE THE PROJECCT 3 TIMES THE JAVA FILE CRASHES';

let inconsolata;
function preload() {
  inconsolata = loadFont('fonts/montserrat/MontserratAlternates-Black.otf');
}

function setup() 
{

    mapLimitX = windowWidth-1;
    mapLimitY = 600;

    var cnv = createCanvas(mapLimitX, 600);
    cnv.parent('pj-canvas');
    
    textFont(inconsolata);
    textSize(width / 100);
    textAlign(CENTER, CENTER);
    
    canvas = cnv;
    oldJSName= 'ProjectPageInfo.js'
    currentProject = this;

  }

function draw() 
{
    
    clear();


    background(30, 30, 30);

    fill(255, 255, 255);
    noStroke();
    text(infoText, 0 + mapLimitX * 0.05,0, mapLimitX * 0.9, mapLimitY);

    if(mapLimitX != document.body.clientWidth)
    {
        resizeCanvas(document.body.clientWidth, mapLimitY);
        mapLimitX = document.body.clientWidth;
    }

}

function ChangeStuff(id, jsName) 
{
    if(document.getElementById(id) == null)
    {
        var script = document.createElement("script");

        script.id = id;
        script.type = "text/javascript";
        script.src = jsName;
        
        document.body.appendChild(script);
        
        clear();
        removeJS(oldJSName);
        // remove();
        
        console.log(oldJSName);
    } 
    smoothScroll('body', 1000);
}
