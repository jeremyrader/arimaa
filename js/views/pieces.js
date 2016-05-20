function renderPlayerPiece(row, col) {
    
    var gridTable = document.getElementById('game-squares');
    
    var cell = gridTable.rows[row].cells[col];
    var piece = board.pieces[row][col];
    
    var playerPiece = document.createElement('img');
    
    playerPiece.setAttribute('name', piece.color === 'w' ? 'w' : 'b');
    playerPiece.setAttribute('class', 'piece');
    playerPiece.setAttribute('src', '../images/' + piece.color + '-' + piece.rank + '.svg');

    
    cell.appendChild(playerPiece);

}

function renderPieces() {

    
    var gridTable = document.getElementById('game-squares');

    for(var row = 0; row < board.rows; row++) {

        for(var column = 0; column < board.cols;  column++) {
            
            var cell = gridTable.rows[row].cells[column];
            removeChildNodes(cell);
            
            var piece = board.pieces[row][column];

            if (piece !== null) {
                if (piece.rank > 0) {
                    renderPlayerPiece(row, column);
                }
                
            }

        }
           
    }

}

function disablePieces() {
    
    //Disable player pieces when it is the bot's turn
    var playerPieces = document.getElementsByName(human.color);

    for (var i=0; i < playerPieces.length; i++) {
        playerPieces[i].removeEventListener('click', onSelectPiece, false);
    }
    
}

function enablePieces() {
    
    //Enable all player pieces
    var playerPieces = document.getElementsByName(human.color);

    for (var i=0; i < playerPieces.length; i++) {
        (function() {
            playerPieces[i].addEventListener('click', onSelectPiece, false);
        }(i))
    }
    
}

function onSelectPiece() {
    
    var cell = this.parentNode;
    
    var row = cell.parentNode.rowIndex;
    var col = cell.cellIndex
    
    var playerPiece = board.pieces[row][col];
    playerPiece.location = [row, col];
    
    removeHandlers();
    renderHighlights(playerPiece);
    
    human.selectedPiece = playerPiece;
    
}

function pushPiece() {
    
    //removeHandlers();

    var row = this.parentNode.rowIndex;
    var col = this.cellIndex
    
    var oldLocation;
    
    
    if(human.enemyPiece) {
        oldLocation = human.enemyPiece.location;
        human.enemyPiece = null;
        
        board.movePiece(oldLocation, [row,col]);
        
        var strongerPieceOldLocation = human.selectedPiece.location;
        human.selectedPiece = null;
        
        board.movePiece(strongerPieceOldLocation, oldLocation);
        
    }
    else {
        oldLocation = human.selectedPiece.location;
        human.selectedPiece = null;
        
        board.movePiece(oldLocation, [row,col]);
    }
    
    
    
    
    human.evaluate();
    board.update();

    
    document.getElementById('knock2x').play();
    
    //this.removeEventListener('click', movePiece, false);

}

function movePiece() {
    
    //removeHandlers();

    var row = this.parentNode.rowIndex;
    var col = this.cellIndex
    
    var oldLocation;

    oldLocation = human.selectedPiece.location;
    human.selectedPiece = null;

    board.movePiece(oldLocation, [row,col]);

    human.evaluate();
    board.update();
    
    var random = Math.floor((Math.random() * 3) + 1);
    
    document.getElementById('knock' + random).play();

}

function pullPiece() {
    
    //removeHandlers();
    console.log('pull');

    var row = this.parentNode.rowIndex;
    var col = this.cellIndex
    
    var oldLocation;
    
    console.log('enemy piece: ' + human.enemyPiece);
    if(human.enemyPiece) {
        oldLocation = human.enemyPiece.location;
        human.enemyPiece = null;
        
        var strongerPieceOldLocation = human.selectedPiece.location;
        human.selectedPiece = null;
        
        console.log('stronger: ' + strongerPieceOldLocation);
        
        board.movePiece(strongerPieceOldLocation, [row,col]);
        board.movePiece(oldLocation, strongerPieceOldLocation);
        
    }
    else {
        oldLocation = human.selectedPiece.location;
        human.selectedPiece = null;
        
        board.movePiece(oldLocation, [row,col]);
    }
    
    human.evaluate();
    board.update();

    document.getElementById('knock2x').play();
    clearInteractOptions();
    //this.removeEventListener('click', movePiece, false);

}

function push() {

    //renderHighlights(human.enemyPiece, pushPiece);
    
    var gridTable = document.getElementById('game-squares');

    var vacantSquares = human.enemyPiece.vacantSquares;
    
    vacantSquares.forEach(function(square) { 
        var cell = gridTable.rows[square[0]].cells[square[1]];
        
        (function() {
            cell.classList.add('move');
            cell.addEventListener('click', pushPiece, false);
        })(cell);

    });  
    
    human.movesLeft--;

}

function pull() {
    
    var gridTable = document.getElementById('game-squares');

    var vacantSquares = human.selectedPiece.vacantSquares;
    
    vacantSquares.forEach(function(square) { 
        var cell = gridTable.rows[square[0]].cells[square[1]];
        
        (function() {
            cell.classList.add('move');
            cell.addEventListener('click', pullPiece, false);
        })(cell);

    });  
    
    human.movesLeft--;
    
}

function moveEnemyPiece() {
    
    var row = this.parentNode.rowIndex;
    var col = this.cellIndex;
    
    
    var enemyPiece = board.pieces[row][col];
    
    human.enemyPiece = enemyPiece;
    renderInteractOptions(enemyPiece);
    
    removeHandlers(human.selectedPiece);
    
}
