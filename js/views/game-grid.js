function loadGame() {
    
    renderGameGrid(8,8);
    renderGameSetup();
    
    board = new Board(8,8);
    board.initialize();
    
    game = new Game();
    
    if(localStorage.getItem('cs2550timestamp')) {
       displayLoginInfo();
    }

}


function renderGameGrid(rows, columns) {
    
    var gameGridDiv = document.getElementById('game-grid');
    
    var table = document.createElement('table'); 
    table.setAttribute('id', 'game-squares');
    
    gameGridDiv.appendChild(table);
    
    //Generate new rows
    for (var i=0; i < rows; i++) {
        
        var row = document.createElement('tr');
        row.setAttribute('class', 'game-cell');
        table.appendChild(row);

        //Iterate over columns to create cells
        for (var j=0; j < columns; j++) {

            var cell = document.createElement('td');
            cell.setAttribute('class', 'game-cell');
            
            if((i===2 && j===2) || (i===2 && j===5) || (i===5 && j===2) || (i===5 && j===5) ) {
                cell.className += ' pit';    
            }
            
            row.appendChild(cell);
            
        }
        
    }

}

        
function renderPieces() {
    
    var gridTable = document.getElementById('game-squares');

    for(var row = 0; row < board.rows; row++) {

        for(var column = 0; column < board.cols;  column++) {
            
            var cell = gridTable.rows[row].cells[column];
            removeChildNodes(cell);
            
            var piece = board.locations[row][column];

            if (piece !== null) {
                renderPlayerPiece(row, column);
            }

        }
           
    }

}

function renderAvailableActions() {

    this.focus();

    var cell = this.parentNode;
    
    var row = cell.parentNode.rowIndex;
    var col = cell.cellIndex
    
    human.selectedPiece = [row, col];
    
    var playerPiece = board.locations[row][col];

    var gridTable = document.getElementById('game-squares');
    
    var vacantSquares = playerPiece.vacantSquares;
    var movableNeighbors = playerPiece.movableNeighbors;
    
    console.log(vacantSquares);
    movableNeighbors.forEach(function(piece) {
        var cell = gridTable.rows[piece[0]].cells[piece[1]];
        cell.classList.add('interact');
        //cell.addEventListener('click', moveEnemyPiece, false);
    });

    vacantSquares.forEach(function(square) { 
        var cell = gridTable.rows[square[0]].cells[square[1]];
        cell.classList.add('move');
        cell.addEventListener('click', movePiece, false);
    });

}


function moveEnemyPiece() {
    
    var row = this.parentNode.rowIndex;
    var col = this.cellIndex
    
    //human.movePiece(Game.selectedPiece, [row, col]);
    
    this.removeEventListener('click', moveEnemyPiece, false);
    
    game.loop();
}

function movePiece() {

    console.log('move piece');
    var row = this.parentNode.rowIndex;
    var col = this.cellIndex

    board.movePiece(human.selectedPiece, [row,col]);
    //human.movePiece(human.selectedPiece, [row, col]);
    
    human.evaluate();

    this.removeEventListener('click', movePiece, false);

}


function removeAvailableActions() {

    console.log('actions removed');
    var cell = this.parentNode;
    
    var row = cell.parentNode.rowIndex;
    var col = cell.cellIndex
    
    var playerPiece = board.locations[row][col];

    var gridTable = document.getElementById('game-squares');
    
    var vacantSquares = playerPiece.vacantSquares;
    var movableNeighbors = playerPiece.movableNeighbors;
    
    movableNeighbors.forEach(function(piece) {
        var cell = gridTable.rows[piece[0]].cells[piece[1]];
        cell.classList.remove('interact');
        cell.removeEventListener('click', moveEnemyPiece, false);
    });
    
    vacantSquares.forEach(function(square) { 
        console.log('aha');
        var cell = gridTable.rows[square[0]].cells[square[1]];
        cell.classList.remove('move');
        cell.removeEventListener('click', movePiece, false);
    });

}

function checkRankOptions() {
    
    var optionsLeft = true;
    
    pieces.forEach(function(piece) {
        if (pieces.length < 1) {
            
        }
    });
    
    return optionsLeft;
}

function isInArray(value, array) {
    return array.indexOf(value) > -1;
}


function renderPieceSelectors() {
    
    var colorSelectors = document.getElementsByName('color');
    
    for (i=0; i < colorSelectors.length; i++) {
        colorSelectors[i].setAttribute('disabled', true);
    }

    var gameGridTable = document.getElementById('game-squares');
    var color = this.value === 'White' ? 'w' : 'b';

    var rows = board.rows;
    var cols = board.cols;

    for (var i=6; i < rows; i++) {
        for (var j=0; j < cols; j++) {

            //Initialize each starting square
            board.locations[i][j] = new Piece(human.color, 0);
            //Set an opaque square
            var selectDiv = document.createElement('div');
            selectDiv.setAttribute('class', 'select-piece');

            var cell = gameGridTable.rows[i].cells[j];
            cell.appendChild(selectDiv);
            
            cell.addEventListener('click', cyclePieces, false);

        }
    }
    
   
    
}

 function cyclePieces() {

    var self = this; //refers to this cell

    removeChildNodes(this);

    var row = this.parentNode.rowIndex;
    var col = this.cellIndex

    //Load square state
    var rank = board.locations[row][col].rank;
    var color = board.locations[row][col].color;
    var ranks = game.ranks;

    //Save copy of square state
    var temp = rank; //6

    do {

        rank++;

        if(rank > 6) {
            rank = 0;
        }

    } while (rank != 0 ? !isInArray(rank, ranks) : false)


    human.addPiece(row, col, color, rank);

    //Add previous rank back in
    if (temp !=0) {
        ranks.push(temp);
    }

    var index = ranks.indexOf(rank);

    if (index > -1) {
        ranks.splice(index, 1);
    }


   if (rank != 0) {
        renderPlayerPiece(row, col);
   }

    if (ranks.length < 1) {
        
        //Create a 'Ready' button
        human.passTurn();
        
    }

}


function enablePieces(color) {
    console.log('pieces enabled');
    var playerPieces = document.getElementsByName(color);
    
    for (var i=0; i < playerPieces.length; i++) {
        playerPieces[i].addEventListener('click', renderAvailableActions, false);
        //playerPieces[i].addEventListener('blur', removeAvailableActions, false);
    }

}

function disablePieces(color) {
    console.log('pieces disabled');
    var playerPieces = document.getElementsByName(color);
    
    for (var i=0; i < playerPieces.length; i++) {
        playerPieces[i].removeEventListener('click', renderAvailableActions, false);
        //playerPieces[i].removeEventListener('blur', removeAvailableActions, false);
    }

}

function renderPlayerPiece(row, col) {
    
    var gridTable = document.getElementById('game-squares');
    
    var cell = gridTable.rows[row].cells[col];
    var piece = board.locations[row][col];
    
    var playerPiece = document.createElement('img');
    
    playerPiece.setAttribute('name', piece.color === 'w' ? 'w' : 'b');
    playerPiece.setAttribute('src', '../images/' + piece.color + '-' + piece.rank + '.svg');
    playerPiece.setAttribute('height', '100%');
    playerPiece.setAttribute('width', '100%');
    playerPiece.setAttribute('z-index', 1500);
    playerPiece.setAttribute('tabIndex', '-1');
    
    cell.appendChild(playerPiece);

}

function removeChildNodes(element) {
    while (element.hasChildNodes()) {
        element.removeChild(element.firstChild);
    }
}