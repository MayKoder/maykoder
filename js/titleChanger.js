function toggleHideProjects() {
    var x = document.getElementById("show-projects");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
}

function toggleHideSkills() {
    var x = document.getElementById("show-skills");
    var button = document.getElementById("show-skills-button");
    if (x.style.display === "none") {
        button.textContent = "SHOW LESS";
      x.style.display = "block";
    } else {
        button.textContent = "SHOW ALL";
      x.style.display = "none";
    }
}

fetch("assets/projects.json")
.then(response => response.json())
.then(json => {

    var topProjectFrag = document.createDocumentFragment();
    for (const value in json.top) {
        var div = document.createElement("div");
        div.className = "col-md p-3";
        div.innerHTML = 
        `
        <div class="border bg-light project-display" style="position: relative;">
          <img src=${json.top[value].background} class="img-fluid" alt="...">

          <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
            <div class="d-flex align-items-center" style="height: 100%;">
              <div class="container">
                <div class="row">
                  <div class="col-xl-12">
                    <h1 class="display-6 text-wrap section-text" style="word-wrap: break-word; color: rgba(255, 255, 255, 0.575);">${json.top[value].name}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="hide-project-info position-absolute top-0 start-0"  style="width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.8);">
            <div class="d-flex align-items-center" style="height: 100%;">
              <div class="container aos-init aos-animate" data-aos="zoom-out" data-aos-delay="100">
                <div class="row">
                  <div class="col-xl-12">
                    <p class="text-wrap">Feature under development</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        `;
        topProjectFrag.appendChild(div);
    }
    document.getElementById("topProjects").appendChild(topProjectFrag);




    var projectFrag = document.createDocumentFragment();
    for (const value in json.projects) {
        var div = document.createElement("div");
        div.className = "col-md";
        div.innerHTML = 
        `
        <div class="border bg-light project-display" style="position: relative;">
        <img src=${json.projects[value].background} class="img-fluid" alt="...">

        ${
            (json.projects[value].renderText == true) ? 
            `
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
            <div class="d-flex align-items-center" style="height: 100%;">
            <div class="container">
                <div class="row">
                <div class="col-xl-12">
                <h1 class="display-6 text-wrap section-text" style="word-wrap: break-word; color: rgba(255, 255, 255, 0.575); text-shadow: 2px 2px #000000;">${json.projects[value].name}</h1>
                </div>
                </div>
            </div>
            </div>
        </div>
        ` : ""
        }

        <div class="hide-project-info"  style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.8);">
            <div class="d-flex align-items-center" style="height: 100%;">
            <div class="container">
                <div class="row">
                <div class="col">
                    <span style="word-wrap: break-word;">Feature under development</span>
                </div>
                </div>
            </div>
            </div>
        </div>

        </div>
        `;
        projectFrag.appendChild(div);
    }
    document.getElementById("allProjects").appendChild(projectFrag);

});


fetch("assets/skills.json")
.then(response => response.json())
.then(json => {

    var skillsFrag = document.createDocumentFragment();
    
    for (const value in json.skills) {
        var div = document.createElement("div");
        div.className = "col-md";
        div.innerHTML = `<div class='p-3 white-text'><img src=${json.skills[value].icon} width='30%' alt='gmail' class='img-fluid svg-white'/><h4 style='margin-top: 2vh;'>${json.skills[value].name}</h4></div>`;
    
        skillsFrag.appendChild(div);
    }

    document.getElementById("skills").appendChild(skillsFrag); 
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var phrasesToDisplay = [
    "LOADING",
    "A SOFTWARE DEVELOPER",
    "A GAME DEVELOPER",
    "READY TO LEARN",
    "A FLUTTER DEVELOPER",
    "AN IOS DEVELOPER",
    "AN ANDROID DEVELOPER",
    "MONKE",

];

var textIndicator = 0;
var charIndicator = 0;
var timeType = 100;
var timeDelete = 70;
var typeInState = true;
var textDocument = document.getElementById("typeText");

async function demo() {
    await sleep(1500);
    while(true) {

        if(typeInState){
            textDocument.innerHTML += phrasesToDisplay[textIndicator].charAt(charIndicator);
            charIndicator++;
            if(charIndicator >= phrasesToDisplay[textIndicator].length){
                typeInState = false;
                await sleep(3500);
            }
            await sleep(timeType);
        }else{
            textDocument.innerHTML = textDocument.innerHTML.slice(0, -1);
            charIndicator--;
            if(charIndicator <= 0){
                typeInState = true;

                (textIndicator >= phrasesToDisplay.length-1) ? textIndicator = 0 : textIndicator++;

                await sleep(1000);
            }
            await sleep(timeDelete);
        }

    }
}

demo();