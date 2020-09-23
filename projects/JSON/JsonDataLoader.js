$(function() {

$.getJSON('projects/JSON/projectData.json', function(data) {
    
    $.each(data.projects, function(i, item) 
    { 

    var apItem = "";
    if(item.displayType == "video")
    {

        apItem = '<div class="item-' + (i + 1).toString() + '">' 
            + '<a class="card" href=' + item.projectLink + ' target="_blank">' 
            + '<div class="iframe-container">'
                + '<iframe class="thumbFrame" src=' + item.display + ' frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
            + '</div>' 
            + '<article>' 
                + '<h1 style="text-decoration: underline;">'+ item.name + '</h1>'
                + '<p style="font-family: Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif;">' + item.description + '</p>'
                + '<span>' + item.codeType + '</span>' 
                + '<!-- <span href="https://www.w3schools.com/" class="card-git">GitHub</span> -->'
            + '</article>' 
            + '</a>' 
        + '</div>'

    }
    else if(item.displayType == "image")
    {
        apItem = '<div class="item-' + (i + 1).toString() + '">' 
            + '<a class="card" href=' + item.projectLink + ' target="_blank">'
            + '<div class="thumb" style="background-image: url('+ item.display + ');">'
            + '</div>'
            + '<article>'
                + '<h1 style="text-decoration: underline;">'+ item.name + '</h1>'
                + '<p style="font-family: Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif;">' + item.description + '</p>'
                + '<span>' + item.codeType + '</span>'
            + '</article>'
            + '</a>'
        + '</div>'
    }

    $(apItem).appendTo("#JsonProjectData");
        // var tblRow = "<tr>" + "<td>" + f.display + "</td>" +
        // "<td>" + f.name + "</td>" + "<td>" + f.description + "</td>" + "<td>" + f.codeType + "</td>" + "</tr>"
        // $(tblRow).appendTo("#userdata");
    });

});

});
