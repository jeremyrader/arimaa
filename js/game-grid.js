function showGameBoard() {
    var gameGrid = document.getElementById('game-grid');
    gameGrid.innerHTML = generateTable(8,8);

    Game.init(8,8);
    Game.evaluate('B8');

}


function generateTable(rows, columns) {
    
    var table = '<table>';
    
    //Generate new rows
    for (var i = rows; i > 0; i--) {
        var rowNumber = i.toString();
        table += generateRow(columns, rowNumber);
    }

    table += '</table>';
    
    return table;
         
}

function generateRow(columns, number) {
    return '<tr>' + generateColumn(columns, number) + '</tr>';
}

function generateColumn(columns, number) {

    var column = '';

    //Iterate over columns to create cells
    for (var i = 1; i < columns + 1; i++) {
        
        var td = '<td>'; 

        var location = String.fromCharCode(96 + i).toUpperCase() + number;

        td = addId(td, location);

         //Change the class of these 4 squares to create pits
        if (location === 'C3' || location === 'F3' || location === 'C6' || location === 'F6') {
            td = addClass(td, 'pit');
        }

        //Logic to be added later for determining which squares are available for the
        //currently selected piece
        //==========================================================================================
        //For the current selected piece (white elephant) add borders to the squares that the piece may move to.
        if (location === 'E5' || location === 'G5' || location === 'F6') {
            td = addClass(td, 'move');
        }

        //For the current selected piece (white elephant) add borders to the squares that the piece may interact with
        if (location === 'F4')
        {
            td = addClass(td, 'interact');
        }
        //==========================================================================================

        column += td + '</td>';
    }

    return column;
}



function addClass(element, className) {
    
    var tagFragments;
    
    //If the element already has a class attribute then append the new class
    //Otherwise, add the class attribute and the class
    if (element.indexOf('class') > -1) {
        tagFragments = element.split('class=\"');
        element = tagFragments[0] + 'class=\"' + className + ' ' + tagFragments[1];
    }
    else {
        tagFragments = element.split('>');
        element = tagFragments[0] + ' class=\"' + className + '\">';
    }

    return element;
}


function addId(element, id) {

    var tagFragments = element.split('>');

    return tagFragments[0] + ' id=\"' + id + '\">';

}