
var jsonData;
var openStatus = false;
var itemsToShow = 8;

$(document).ready(function() 
{

    var LoadItem = function(item, i)
    {
        var apItem = "";


        if(item.displayType == "video"){
            apItem = '<article id="item-' + (i).toString() + '" style="display: ' + ((i < itemsToShow) ? "inline" : "none") + ';">' 
            + '<a href='+ item.projectLink +' class="image" target="_blank"><img src="images/pic04.jpg" alt=""/></a>'
            + '<h3 class="major">' + item.name + '</h3>'
            + '<p>' + item.description + '</p>'
            + '<a href="#" class="special">Learn more</a>'
            + '</article>'
        }else{            
            apItem = '<article id="item-' + (i).toString() + '" style="display: ' + ((i < itemsToShow) ? "inline" : "none") + ';">' 
            + '<a href='+ item.projectLink +' class="image" target="_blank"><img src=' + item.display + ' alt=""/></a>'
            + '<h3 class="major">' + item.name + '</h3>'
            + '<p>' + item.description + '</p>'
            + '<a href="#" class="special">Learn more</a>'
            + '</article>'
        }


        $(apItem).appendTo("#JsonProjectData");
    };

    $.getJSON('JSON/projectData.json', function(data) {
        jsonData = data;

        // for (let index = 0; index < 6; index++) {
        //     const element = data.projects[index];
        //     console.log("A");
            
        // }

        $.each(data.projects, function(i, item) 
        { 
        // if(item.displayType == "video")
        // {


        //     // <a href="#" class="image"><img src="images/pic04.jpg" alt="" /></a>
        //     // <h3 class="major">Sed feugiat lorem</h3>
        //     // <p>Lorem ipsum dolor sit amet, consectetur adipiscing vehicula id nulla dignissim dapibus ultrices.</p>
        //     // <a href="#" class="special">Learn more</a>


        //     apItem = '<article class="item-' + (i + 1).toString() + '">' 
        //         + '<a class="card" href=' + item.projectLink + ' target="_blank">' 
        //         + '<div class="iframe-container">'
        //             + '<iframe class="thumbFrame" src=' + item.display + ' frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
        //         + '</div>' 
        //         + '<article>' 
        //             + '<h1 style="text-decoration: underline;">'+ item.name + '</h1>'
        //             + '<p style="font-family: Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif;">' + item.description + '</p>'
        //             + '<span>' + item.codeType + '</span>'
        //         + '</article>' 
        //         + '</a>' 
        //     + '</article>'

        // }
        // else 
        // if(item.displayType == "image")
        // {
            LoadItem(item, i);
        // }

            // var tblRow = "<tr>" + "<td>" + f.display + "</td>" +
            // "<td>" + f.name + "</td>" + "<td>" + f.description + "</td>" + "<td>" + f.codeType + "</td>" + "</tr>"
            // $(tblRow).appendTo("#userdata");
        });

    });

    $("#showButton").click(function (e) 
    { 
        e.preventDefault();
        openStatus = !openStatus;

        for (let index = itemsToShow; index < jsonData.projects.length; ++index) 
        {
            console.log($("#item-" + (index).toString()));
            $("#item-" + (index).toString()).attr("style", "display:" + ((openStatus == true) ? "inline" : "none") + ";");
        }
        $("#showButtonTxt").html("Show " + ((openStatus == true) ? "LESS" : "ALL"));
        
        if(openStatus == false){
            $('html,body').animate({
                scrollTop: $("#showButton").offset().top - $(window).height()/2
             }, 1000);
        }

        
    });

});




// function codeAddress() 
// {
//     var json = JSON.parse("JSON/projectData.json");
//     console.log(json);
// }
// window.onload = codeAddress;