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
        board.locations[0][i] = pieces.shift();
    }

    for (var i=0; i < board.cols; i++) {
        board.locations[1][i] = pieces.shift();
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
    board.locations[row][col] = piece;

}

Player.prototype.evaluate = function() {
    
    this.movesLeft--;
    
    if (this.movesLeft < 1) {
        game.evaluate();
        this.passTurn();    
    }
}

Player.prototype.evaluateCanMove = function() {
    
    var self = this;
    
    this.canMove = false;
    
    for (var i = 0; i < board.rows; i++) {
        for (var j = 0; j < board.cols; j++) {
            
            if (board.locations[i][j] !== null && self.color === board.locations[i][j].color && (board.locations[i][j].vacantSquares.length > 0 || board.locations[i][j].movableNeighbors.length > 0) ) {
                self.canMove = true;
            }

        }
    }

    
}