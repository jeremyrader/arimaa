function Board(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.locations = [];
}

Board.prototype.initialize = function() {
    
    for (var i = 0; i < this.rows; i++) {
            
        this.locations.push([]);
        for (var j = 0; j < this.cols; j++) {
            this.locations[i].push(null);
        }
    }

    for (var i = this.rows-2; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
            this.locations[i][j] = 'initial';
        }
    }

}

Board.prototype.getLocation = function(row, col) {

    return this.locations[row][col];
}

Board.prototype.evaluate = function() {
    for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
            this.evaluateLocation(i, j);
        }
    }
}

Board.prototype.update = function() {
    
    this.evaluate();
    renderPieces();
    
    if (game.phase === 'play') {
         if(game.turn === human.color) {
        enablePieces(human.color);
        }
        else {
            disablePieces(human.color);
        } 
    }
   

}

Board.prototype.movePiece = function(currentLocation, newLocation) {
    
    console.log(currentLocation + ' ' + newLocation);
    var temp = board.locations[currentLocation[0]][currentLocation[1]];
    this.locations[newLocation[0]][newLocation[1]] = temp;
    this.locations[currentLocation[0]][currentLocation[1]] = null;
    
    var piece = board.locations[newLocation[0]][newLocation[1]];
    piece.location = newLocation;
    
    this.update();

}

Board.prototype.evaluateLocation = function(row, col) {

    var self = this;

    var piece = this.getLocation(row,col);
    
    if (piece !== null) {
        
        //reset neighbor state
        piece.occupiedSquares = [];
        piece.vacantSquares = [];

        //evaluate one cell to the left
        piece.evaluate(row, col-1);

        //evaluate one cell to the right
        piece.evaluate(row, col+1);

        //evaluate one cell down
        piece.evaluate(row+1, col);

        //evaluate one cell up
        piece.evaluate(row-1, col);

        //If piece is not frozen then it may move
       //piece.vacantSquares = false && piece.strongerEnemyNearby && !piece.friendlyNearby ? [] : piece.vacantSquares;

        if(!piece.strongerEnemyNearby) {

            //evaluate each adjacent piece to determine whether it is a weaker enemy
            piece.occupiedSquares.forEach(function(occupiedSquare) {

                var neighbor = self.locations[occupiedSquare[0]][occupiedSquare[1]];

                if(piece.color !== neighbor.color && piece.rank < neighbor.rank) {
                    piece.movableNeighbors.push([occupiedSquare[0],occupiedSquare[1]]);
                }
            });
        }

    }

}