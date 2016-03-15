function Game() {
    this.turn = 'b',
    this.phase = 'setup',
    this.ranks = [1,2,3,3,4,4,5,5,6,6,6,6,6,6,6,6]
}

Game.prototype.evaluate = function() {
    
    var playerAReachedGoalRow;
    var playerBReachedGoalRow;

    //Check if a rabbit of player A reached goal. If so player A wins.
    for (var col = 0; col < this.columns; col++) {
        if (this.locations[0][col].color === this.turn.color && this.locations[0][col].rank === 6) {
            playerAReachedGoalRow = true;
        }
    }

    //Check if a rabbit of player B reached goal. If so player B wins.
    for (var col = 0; col < this.columns; col++) {
        if (this.locations[7][col].color === this.turn.color && this.locations[0][col].rank === 6) {
            playerBReachedGoalRow = true;
        }
    }

    if (playerAReachedGoalRow) {
        Game.winner = this.playerA;
        Game.phase = 'end';
    }
    else if (playerBReachedGoalRow) {
        Game.winner = this.playerB;
        Game.phase = 'end';
    }
    else if (playerB.rabbits === 0) {
        Game.winner = this.playerA;
        Game.phase = 'end';
    }
    else if (playerA.rabbits === 0) {
        Game.winner = this.playerB;
        Game.phase = 'end';
    }
    else if (playerB.canMove === false)
    {
        Game.winner = this.playerA;
        Game.phase = 'end';
    }
    else {
        //No one wins/loses. Continue game play   
    }

    //Will need to implement this at a later point
    //Check if the only moves player B has are 3rd time repetitions. If so player A wins.
    /*
    else if (playerBMovesAreInvalid)
    {
        //Player A wins
    }
    */

}

Game.prototype.setup = function(playerName, playerColor, difficulty) {
    
    var botName = difficulty + '-bot';
    var botColor = playerColor === 'White' ? 'b' : 'w';
    var playerColor = playerColor === 'White' ? 'w' : 'b';

    human = new Player(playerName, playerColor);
    bot = new Bot(botName, botColor);
    
    game.phase = 'setup';

}

Game.prototype.loop = function() {
    
    if (game.phase === 'setup') {
        
        if(game.turn === human.color) {
            renderPieceSelectors();
            
            //if all pieces are placed then pass turn and loop
        }
        else {
            this.ranks = [1,2,3,3,4,4,5,5,6,6,6,6,6,6,6,6];
            bot.populateInitialSquares();
            
            
            gameReady();
            this.phase = 'play';
            bot.passTurn();
            board.update();
        }
        
    }
    else if (game.phase = 'play') {
        console.log('game phase is play');
        if(game.turn === human.color) {
        //wait for player input
        
        }
        else {

            var botMovablePieces = [];

            for (var i = 0; i < board.rows; i++) {
                for (var j = 0; j < board.cols; j++) {
                    var piece = board.locations[i][j];

                    if(piece != null && piece.color === bot.color && piece.vacantSquares.length > 0) {
                        botMovablePieces.push(piece);
                    }

                }
            }

            var random = Math.floor((Math.random() * 4) + 2);

            var intervalId = setInterval(function() {

                var randomPiece = Math.floor((Math.random() * (botMovablePieces.length - 1)) + 0);
                var piece = botMovablePieces[randomPiece];

                //get random location to move to
                var randomSquare = Math.floor((Math.random() * (piece.vacantSquares.length - 1)) + 0);
                var vacantSquare = piece.vacantSquares[randomSquare]; 

                board.movePiece(piece.location, vacantSquare);

                random--;

                if(random < 1) {
                    clearInterval(intervalId);
                    console.log('i am passing my turn ' + bot.movesLeft);
                    bot.passTurn();
                }

            }, 1000);

        }
    }

}