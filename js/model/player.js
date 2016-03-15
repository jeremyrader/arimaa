function Player(name, color) {
    this.name = name;
    this.color = color;
    this.movesLeft = 4;
    this.canMove = true;
    this.rabbits = 6;
    this.pieces = [];
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
    
    /*
    if(game.turn === human.color) {
        enablePieces(human.color);
    }
    else {
        disablePieces(human.color);
    }
    */
    
    game.loop();
}

Player.prototype.addPiece = function(row, col, color, rank) {

    var piece = new Piece(color, rank);
    
    piece.location = [row, col];
    board.locations[row][col] = piece;

}

Player.prototype.removePiece = function(row, col) {
    
    var piece = board.locations[row][col];
    
    if (piece.rank === 6) {
        this.rabbits--;   
    }
    
    piece.location = null;
    board.locations[row][col] = null;

}

Player.prototype.movePiece = function(currentLocation, newLocation) {
    
    console.log(currentLocation + ' ' + newLocation);
    var temp = board.locations[currentLocation[0]][currentLocation[1]];
    board.locations[newLocation[0]][newLocation[1]] = temp;
    board.locations[currentLocation[0]][currentLocation[1]] = null;
    
    var piece = board.locations[newLocation[0]][newLocation[1]];
    piece.location = newLocation;
    
    board.update();

    this.movesLeft--;

    if (this.movesLeft < 1) {
        this.passTurn();
    }

}

Player.prototype.moveEnemyPiece = function() {

    /*
    var temp = Game.locations[currentLocation[0]][currentLocation[1]];
    Game.locations[newLocation[0]][newLocation[1]] = temp;
    Game.locations[currentLocation[0]][currentLocation[1]] = null;
    */
    
    
    this.movesLeft--;
    
    if (this.movesLeft < 1) {
        this.passTurn();   
    }

}

Player.prototype.evaluate = function() {
    
    this.movesLeft--;
    
    if (this.movesLeft < 1) {
        this.passTurn();    
    }
}