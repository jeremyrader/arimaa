
function renderInstructions(heading, content) {
    
    var contentDiv = document.getElementById('tutorial');
    removeChildNodes(contentDiv);

    var h1 = document.createElement('h1');
    addTextNode(h1, heading);
    contentDiv.appendChild(h1);
    
    content.forEach(function(section) {
        var p = document.createElement('p');
        addTextNode(p, section);
        contentDiv.appendChild(p);
    });
    
    
}