function Player(name, color) {
    this.name = name;
    this.color = color;
    this.movesLeft = 4;
    this.canMove = true;
    this.rabbits = 6;
    this.pieces = [];
    this.ready = false;
}

Player.prototype.populateInitialSquares = function() {
        
    var ranksCopy = game.ranks;
    var pieces = [];

    while (ranksCopy.length > 0) {
        var randomIndex = Math.floor((Math.random() * ranksCopy.length - 1) + 0);  
        var rank = ranksCopy.splice(randomIndex, 1);
        pieces.push({ color : this.color, rank : rank});

    }

    for (var i=0; i < board.cols; i++) {
        board.pieces[0][i] = pieces.shift();
    }

    for (var i=0; i < board.cols; i++) {
        board.pieces[1][i] = pieces.shift();
    }
        
}

Player.prototype.passTurn = function() {
    
    this.movesLeft = 4;
    game.turn = (this.color === 'w') ? 'b' : 'w';
    
    game.loop();
}

Player.prototype.addPiece = function(row, col, color, rank) {

    var piece = new Piece(color, rank);
    
    piece.location = [row, col];
    board.pieces[row][col] = piece;

}

Player.prototype.evaluate = function() {
    
    this.movesLeft--;
    
    if (this.movesLeft < 1) {
        game.evaluate();
        this.passTurn();    
    }
}

Player.prototype.getMovablePieces = function() {
    
    let pieces = [];
    
    for (var i = 0; i < board.rows; i++) {
        for (var j = 0; j < board.cols; j++) {
            
            let piece = board.pieces[i][j]
            
            if (piece !== null && this.color === piece.color && (piece.vacantSquares.length > 0 || piece.movableNeighbors.length > 0) ) {
                pieces.push(piece);
            }

        }
    }
    
    return pieces;
}