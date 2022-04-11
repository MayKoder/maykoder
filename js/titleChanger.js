let hideProjectAtIndex = 15;
function toggleHideProjects() {
    var x = document.getElementById("allProjects");
    var indexIndicator = 0;
  console.log(x.children);
    for (let index = 0; index < x.children.length; index++) {
      const element = x.children[index];
      if(indexIndicator >= hideProjectAtIndex)
      {        
        if (element.style.display === "none") {
          element.style.display = "block";
        } else {
          element.style.display = "none";
        }
      }
      indexIndicator++; 
    }
    fitTextInsideDynamicParents();
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

function fitTextInsideDynamicParents(){
  document.getElementsByName("fit").forEach((child) => 
  {
    var parent = child.parentElement.parentElement.parentElement.parentElement.parentElement;
    // console.log(child.getBoundingClientRect().height);
    // console.log(parent.getBoundingClientRect().height);
    
    if(child.getBoundingClientRect().height > 0 && parent.getBoundingClientRect().height > 0){
      //parent.style.visibility = "visible";
      child.style.fontSize = "1px";
      var fontSize = 1;
      while(child.getBoundingClientRect().height < parent.getBoundingClientRect().height)
      {
        child.style.fontSize = `${fontSize}px`;
        fontSize++;
      }
      child.style.fontSize = `${(fontSize*0.8)}px`;
    }
  });
}

fetch("assets/projects.json")
.then(response => response.json())
.then(json => {

    var topProjectFrag = document.createDocumentFragment();
    for (const value in json.top) {
        const element = json.top[value];
        var div = document.createElement("div");
        div.className = "col-md p-3";
        div.innerHTML = 
        `
        <div class="border bg-light project-display" style="position: relative;">
          <img src=${element.background} class="img-fluid" alt="...">

          <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
            <div class="d-flex align-items-center" style="height: 100%;">
              <div class="container">
                <div class="row">
                  <div class="col-xl-12">
                    <h1 class="display-6 text-wrap main-text" style="word-wrap: break-word; color: rgba(255, 255, 255, 0.575);">${json.top[value].name}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <a href=${element.link} target="_blank" class="hide-project-info hyperlink-no-style position-absolute top-0 start-0"  style="width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.8);">
            <div class="d-flex align-items-center" style="height: 100%;">
              <div class="container">
                <div class="row">
                  <div class="col-xl-12">
                    <div class="hyperlink-no-style text-wrap" style="font-size: 90%" name="fit">${element.desc}</div>
                  </div>
                </div>
              </div>
            </div>
          </a>

        </div>
        `;
        topProjectFrag.appendChild(div);
    }
    document.getElementById("topProjects").appendChild(topProjectFrag);




    var projectFrag = document.createDocumentFragment();
    var indexIndicator = 0;
    for (const value in json.projects) {
        const element = json.projects[value];
        var div = document.createElement("div");
        div.className = "col-md";
        div.style.display = (indexIndicator >= hideProjectAtIndex) ? "none" : "block";
        div.innerHTML = 
        `
        <div class="border bg-light project-display" style="position: relative;">
        <img src=${element.background} class="img-fluid" alt="...">

        ${
            (element.renderText == true) ? 
            `
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
            <div class="d-flex align-items-center" style="height: 100%;">
            <div class="container">
                <div class="row">
                <div class="col-xl-12">
                <h1 class="display-6 text-wrap main-text" style="word-wrap: break-word; color: rgba(255, 255, 255, 0.575); text-shadow: 2px 2px #000000;">${element.name}</h1>
                </div>
                </div>
            </div>
            </div>
        </div>
        ` : ""
        }

        <a href=${element.link} target="_blank" class=" hide-project-info hyperlink-no-style"  style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.8);">
            <div class="d-flex align-items-center" style="height: 100%;">
            <div class="container">
                <div class="row">
                <div class="col">
                    <div class="hyperlink-no-style" style="style="font-size: 90%"; word-wrap: break-word;" name="fit">${element.desc}</div>
                </div>
                </div>
            </div>
            </div>
        </a>

        </div>
        `;
        projectFrag.appendChild(div);
        indexIndicator++;
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


    var skillsTable = document.createDocumentFragment();

    var table = document.createElement("thead");
    var tableBody = document.createElement("tbody");
    var headersElement = document.createElement("tr");
    
    let tableArrays= [];
    for (const value in json.tableSkills) {
      headersElement.innerHTML += `<th scope='col'>${json.tableSkills[value].name}</th>`;
      tableArrays.push(json.tableSkills[value].data);
    }

    let allArraysOverflowed = false;
    let numOfIterations = 0;
    let numOfNullChecks = 0;
    //A smart person would get the max of the sub-array length and just use a for loop, but while goes brbrbr
    while(!allArraysOverflowed){

      let result = "";
      for (let index = 0; index < tableArrays.length; index++) {
        const element = tableArrays[index];
        
        if(element.length < numOfIterations+1){
          result += "<td></td>";
          numOfNullChecks += 1;
        }else{
          result += `<td>${element[numOfIterations]}</td>`;
        }
      }
      
      
      if(numOfNullChecks >= tableArrays.length){
        allArraysOverflowed = true;
        console.log("Array overflowed at " + numOfNullChecks);
      }else{
        //Append as new body part
        //console.log(result);
        let subTableRow = document.createElement("tr");

        subTableRow.innerHTML = result;
        tableBody.appendChild(subTableRow);
      }

      numOfIterations += 1;
      numOfNullChecks = 0;
    }
    
    table.appendChild(headersElement);
    skillsTable.appendChild(table);
    skillsTable.appendChild(tableBody);
    document.getElementById("skillsTable").appendChild(skillsTable);

});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var phrasesToDisplay = [
    "LOADING...",
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

window.addEventListener('load', () => {
  setTimeout(function () {
    fitTextInsideDynamicParents();
}, 1000);
});
// document.onreadystatechange = function () {
//   if (document.readyState == "complete") {
//     fitTextInsideDynamicParents();
//   }
// }
window.addEventListener('resize', () => {
  fitTextInsideDynamicParents();
  
  if(window.innerWidth > 415 && window.innerWidth < 425)
  {
    
    document.getElementById("githubContact").innerHTML = "MayKoder";
    console.log(document.getElementById("githubContact"));

  }else
  {
    document.getElementById("githubContact").innerHTML = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspMayKoder&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp";
  }
  
});
demo();