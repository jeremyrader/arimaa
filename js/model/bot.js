
function Bot(color, rank) {
    Player.call(this, color, rank);
}

Bot.prototype = Object.create(Player.prototype);
Bot.prototype.constructor = Bot;

Bot.prototype.populateInitialSquares = function() {
    
    var ranksCopy = game.ranks;
    var pieces = [];


    while (ranksCopy.length > 0) {
        var randomIndex = Math.floor((Math.random() * ranksCopy.length - 1) + 0);  
        var rank = ranksCopy.splice(randomIndex, 1)[0];
        
        var piece = new Piece(this.color, rank);

        pieces.push(piece);

    }

    for (var i=0; i < board.cols; i++) {
        
        var piece = pieces.shift();
        piece.location = [0, i];
        board.locations[0][i] = piece;
    }

    for (var i=0; i < board.cols; i++) {
        
        var piece = pieces.shift();
        piece.location = [1, i];
        board.locations[1][i] = piece;
    }

}

Bot.prototype.moveRandomPiece = function() {
    
    var botMovablePieces = [];
    
    for (var i = 0; i < board.rows; i++) {
        for (var j = 0; j < board.cols; j++) {
            var piece = board.locations[i][j];
            
            if(piece != null && piece.color === this.color && piece.vacantSquares.length > 0) {
                botMovablePieces.push(piece);
            }
            
        }
    }
    
    
    var randomPiece = Math.floor((Math.random() * (botMovablePieces.length - 1)) + 0);
    var piece = botMovablePieces[randomPiece];
    
    //get random location to move to
    var randomSquare = Math.floor((Math.random() * (piece.vacantSquares.length - 1)) + 0);
    var vacantSquare = piece.vacantSquares[randomSquare]; 

    this.movePiece(piece.location, vacantSquare);
}

