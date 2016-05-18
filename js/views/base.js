function removeChildNodes(element) {
    while (element.hasChildNodes()) {
        element.removeChild(element.firstChild);
    }
}

function addTextNode(parent, text) {
    var textNode = document.createTextNode(text);
    parent.appendChild(textNode);
}

function isInArray(value, array) {
    return array.indexOf(value) > -1;
}