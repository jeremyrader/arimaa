function Board() {
    this.rows = 8;
    this.cols = 8;
    this.pieces = [];
    
    for (var i = 0; i < this.rows; i++) {
            
        this.pieces.push([]);
        for (var j = 0; j < this.cols; j++) {
            this.pieces[i].push(null);
        }
    }
    
    renderArimaaBoard(this.rows, this.cols);
}

Board.prototype.initializePlayerPieces = function(color) {

    for (var i=6; i < this.rows; i++) {
        for (var j=0; j < this.cols; j++) {

            //Initialize each starting square
            this.pieces[i][j] = new Piece(color, 0);

        }
    }

}

Board.prototype.getLocation = function(row, col) {
    return this.pieces[row][col];
}

Board.prototype.evaluate = function() {
    for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
            this.evaluateLocation(i, j);
        }
    }
}

Board.prototype.update = function() {
    
    removeHighlights();
    this.evaluate();

    renderPieces();
    
    if(game.phase === 'setup') {
        renderPieceSelectors();
    }
    
    if (game.phase === 'play') {
        
        if(game.turn === human.color) {
            enablePieces();
        }
        else {
            disablePieces();
        } 
    }
   
}

Board.prototype.movePiece = function(currentLocation, newLocation) {

    var temp = board.pieces[currentLocation[0]][currentLocation[1]];
    this.pieces[newLocation[0]][newLocation[1]] = temp;
    this.pieces[currentLocation[0]][currentLocation[1]] = null;
    
    var piece = board.pieces[newLocation[0]][newLocation[1]];

    piece.location = newLocation;
    
    
    this.update();

}

Board.prototype.removePiece = function(piece) {
    
    var location = piece.location;
    
    if (piece.rank === 6) {
        
        if (piece.color === human.color) {
            human.rabbits--;   
        }
        else if (piece.color === bot.color) {
            bot.rabbits--;   
        }

    }
    
    piece.location = null;
    board.pieces[location[0]][location[1]] = null;

}

Board.prototype.evaluateLocation = function(row, col) {

    var self = this;

    var piece = this.getLocation(row,col);

    if (piece !== null) {
            
        piece.location = [row, col];
        
        //reset neighbor state
        piece.occupiedSquares = [];
        piece.vacantSquares = [];
        piece.movableNeighbors = [];
        piece.strongerEnemyNearby = false;
        piece.friendlyNearby = false;

        //evaluate one cell to the left
        piece.evaluate(row, col-1);

        //evaluate one cell to the right
        piece.evaluate(row, col+1);

        //evaluate one cell down
        piece.evaluate(row+1, col);

        //evaluate one cell up
        piece.evaluate(row-1, col);
        
        
        var frozen = piece.strongerEnemyNearby && !piece.friendlyNearby;
        
        if (game.turn === piece.color && frozen) {
            piece.vacantSquares = [];
        }   

        if(!piece.strongerEnemyNearby) {

            //evaluate each adjacent piece to determine whether it is a weaker enemy
            piece.occupiedSquares.forEach(function(occupiedSquare) {

                var neighbor = self.pieces[occupiedSquare[0]][occupiedSquare[1]];

                if(piece.color !== neighbor.color && piece.rank < neighbor.rank) {
                    piece.movableNeighbors.push([occupiedSquare[0],occupiedSquare[1]]);
                }
            });
        }

    }

}