function showGameBoard() {
    
    var gameGrid = document.getElementById('game-grid');
    gameGrid.innerHTML = generateTable(8,8);

    Game.init(8,8);
    
    drawPits();
    drawPieces();
    drawAvailableActions();

}


function generateTable(rows, columns) {
    
    var table = '<table id="game-squares">';
    
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
        column += '<td></td>';
    }

    return column;
}
        
function drawPieces() {
    
    var gridTable = document.getElementById('game-squares');

    for(var row = 0; row < Game.rows; row++) {

        for(var column = 0; column < Game.columns;  column++) {
            
            var cell = gridTable.rows[row].cells[column];
            var piece = Game.locations[row][column];
            
            if (piece !== null) {
                cell.innerHTML = '<img src=\"../images/' + piece.loyalty + '-' + piece.rank + '.svg\" width=100% height=100%">';
            }

        }
           
    }

}

function drawPits() {
    
    var gridTable = document.getElementById('game-squares');
    
    var cell1 = gridTable.rows[2].cells[2];
    var cell2 = gridTable.rows[5].cells[5];
    var cell3 = gridTable.rows[2].cells[5];
    var cell4 = gridTable.rows[5].cells[2];

    cell1.className += 'pit';
    cell2.className += 'pit';  
    cell3.className += 'pit';  
    cell4.className += 'pit';
}

function drawAvailableActions() {
    
    var selectedPiece = Game.selectedPiece;

    var gridTable = document.getElementById('game-squares');
    var vacantSquares = Game.locations[selectedPiece[0]][selectedPiece[1]].vacantSquares;
    var movablePieces = Game.locations[selectedPiece[0]][selectedPiece[1]].movablePieces;

    movablePieces.forEach(function(piece) {
        var cell = gridTable.rows[piece[0]].cells[piece[1]];
        cell.className += 'interact';
    });

    vacantSquares.forEach(function(square) { 
        var cell = gridTable.rows[square[0]].cells[square[1]];
        cell.className += 'move';
    });
    
}