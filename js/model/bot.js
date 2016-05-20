
function Bot(color, rank) {
    Player.call(this, color, rank);
}

Bot.prototype = Object.create(Player.prototype);
Bot.prototype.constructor = Bot;

Bot.prototype.populateInitialSquares = function() {
    
    var ranks = [1,2,3,3,4,4,5,5,6,6,6,6,6,6,6,6];
    var ranksCopy = ranks;
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
        board.pieces[0][i] = piece;
    }

    for (var i=0; i < board.cols; i++) {
        
        var piece = pieces.shift();
        piece.location = [1, i];
        board.pieces[1][i] = piece;
    }
    
    game.ranks = [1,2,3,3,4,4,5,5,6,6,6,6,6,6,6,6];
    
    bot.ready = true;
    
    board.update()
    bot.passTurn();

}           

Bot.prototype.processTurn = function() {
    
    var self = this;

    this.movesLeft = Math.floor(Math.random() * (this.movesLeft - 1)) + 2;
    
    var intervalId = setInterval(function() {
        
        var botMovablePieces = [];
    
        //Grab each of the pieces that the bot may move
        for (var i = 0; i < board.rows; i++) {
            for (var j = 0; j < board.cols; j++) {
                var piece = board.pieces[i][j];

                if(piece != null && piece.color === bot.color && piece.vacantSquares.length > 0) {
                    botMovablePieces.push(piece);
                }

            }
        }

        var randomPiece = Math.floor((Math.random() * (botMovablePieces.length - 1)) + 0);
        var piece = botMovablePieces[randomPiece];

        //get random location to move to
        var randomSquare = Math.floor((Math.random() * (piece.vacantSquares.length - 1)) + 0);
        var vacantSquare = piece.vacantSquares[randomSquare];

        board.movePiece(piece.location, vacantSquare);
        
        var random = Math.floor((Math.random() * 3) + 1);
        document.getElementById('knock' + random).play();

        self.movesLeft--;

        if(self.movesLeft < 1) {
            clearInterval(intervalId);
            game.evaluate();
            bot.passTurn();
        }

    }, 1000);
}

