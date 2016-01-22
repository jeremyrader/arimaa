var locations = {
    
    "A8" : { loyalty : 'b', rank : '6' },
    "B8" : { loyalty : 'b', rank : '6' },
    "B7" : { loyalty : 'b', rank : '5' },
    "D7" : { loyalty : 'w', rank : '2' },
    "B7" : { loyalty : 'b', rank : '5' },
    "E6" : { loyalty : 'b', rank : '6' },
    "G6" : { loyalty : 'b', rank : '6' },
    "H6" : { loyalty : 'b', rank : '6' },
    "C5" : { loyalty : 'b', rank : '6' },
    "F5" : { loyalty : 'w', rank : '1' },
    "E4" : { loyalty : 'b', rank : '5' },
    "F4" : { loyalty : 'w', rank : '3' },
    "G4" : { loyalty : 'b', rank : '1' },
    "B3" : { loyalty : 'w', rank : '4' },
    "E3" : { loyalty : 'w', rank : '3' },
    "F3" : { loyalty : 'b', rank : '6' },
    "G3" : { loyalty : 'w', rank : '6' },
    "A2" : { loyalty : 'w', rank : '6' },
    "E2" : { loyalty : 'w', rank : '5' },
    "F2" : { loyalty : 'b', rank : '2' },
    "G2" : { loyalty : 'w', rank : '6' },
    "H2" : { loyalty : 'b', rank : '6' },
    "A1" : { loyalty : 'w', rank : '6' },
    "B1" : { loyalty : 'w', rank : '6' },
    "E1" : { loyalty : 'w', rank : '6' },
    "F1" : { loyalty : 'w', rank : '6' },
    "G1" : { loyalty : 'b', rank : '4' },
    "H1" : { loyalty : 'w', rank : '6' },
}


function showGameBoard() {
    var gameGrid = document.getElementById('game-grid');
    gameGrid.innerHTML = generateTable(8,8);
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

        column += td + generateGamePieceImg(location) + '</td>';
    }

    return column;
}

function generateGamePieceImg(location) {

    var gamePieceImg = '';

    var square = locations[location];
    
    if (square !== undefined) {
        gamePieceImg = '<img src=\"../images/' + square.loyalty + '-' + square.rank + '.svg\" width=100% height=100%">';
    }
    
    return gamePieceImg;
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




