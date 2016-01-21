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
    var str = '87654321';
    
    
    for (var i = 0; i < rows; i++) {
        table += generateRow(columns, str.charAt(i));
    }
    
    table += '</table>';
    
    return table;
         
}

function getPieceImageSrc(loyalty, rank) {
    
    var animal = '';
    
    switch(rank) {
        case '1' :
            animal = 'elephant';
            break;
        case '2' :
            animal = 'camel';
            break;
        case '3' : 
            animal = 'horse';
            break;
        case '4' :
            animal = 'dog';
            break;
        case '5' :
            animal = 'cat';
            break;
        case '6' :
            animal = 'rabbit';
            break;
    }
    
    return '<img src=\"../images/' + loyalty + '-' + rank + '-' + animal + '.svg\" width=100% height=100%">';
  
}

function generateRow(columns, number) {

    var row = '';
    
    row += '<tr>'
    row += generateColumn(columns, number);
    row += '</tr>';
    
    return row;
}

function generateColumn(columns, number) {
    
    var column = '';
    var str = 'ABCDEFGH';
   
    for (var i = 0; i < columns; i++) {
        
        var td = '<td>'; 
        
        
        var location = str.charAt(i) + number;
        if (location === 'C3' || location === 'F3' || location === 'C6' || location === 'F6') {
            
            td = addClass(td, 'pit');
 
            column += td;
        }
        else if (location === 'C7' || location === 'D8' || location === 'D6' || location === 'E7') {
            td = addClass(td, 'square');
            column += td;
        }
        else {
            column += '<td>';
        }

        column += generateGamePiece(location);
        column += '</td>';
    }

    return column;
}

function generateGamePiece(location) {

    var gamePieceImage = '';

    var piece = locations[location];
    
    if (piece !== undefined) {
        gamePieceImage = getPieceImageSrc(piece.loyalty, piece.rank);
    }
    
    return gamePieceImage;
}

function addClass(element, className) {
    
    var tagFragments = element.split('>');
    
    element = tagFragments[0] + ' class=\"' + className + '\">'; 
    
    return element;
}




