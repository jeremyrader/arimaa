function Game() {
    this.turn = 'b',
    this.phase = 'creation',
    this.ranks = [1,2,3,3,4,4,5,5,6,6,6,6,6,6,6,6]
}

Game.prototype.evaluate = function() {
    
     function checkPit(row, col) {
        
        var piece = board.locations[row][col];
        
        if (piece && !piece.friendlyNearby) {
            board.removePiece(piece);   
        }
    }
        
    checkPit(2,2);
    checkPit(2,5);
    checkPit(5,2);
    checkPit(5,5);
    
    var playerAReachedGoalRow;
    var playerBReachedGoalRow;
    
    if(this.turn === human.color) {
        human.evaluateCanMove();
    }
    else if (this.turn === bot.color) {
        bot.evaluateCanMove();
    }

    //Check if a rabbit of current player reached goal. If so current player wins.
    for (var col = 0; col < board.cols; col++) {
        
        if (board.locations[0][col] !== null && board.locations[0][col].color === human.color && board.locations[0][col].rank === 6) {
            alert('rabbit reached goal!');
            playerAReachedGoalRow = true;
        }
    }

    //Check if a rabbit of opposing player reached goal. If so opposing player wins.
    for (var col = 0; col < board.cols; col++) {
        if (board.locations[7][col] !== null && board.locations[7][col].color === bot.color && board.locations[0][col].rank === 6) {
            playerBReachedGoalRow = true;
        }
    }

    if (playerBReachedGoalRow) {
        game.winner = this.turn;
        alert(game.winner);
        game.phase = 'end';
    }
    else if (playerAReachedGoalRow) {
        game.winner = opposingPlayer;
        alert(game.winner);
        game.phase = 'end';
    }
    else if (this.turn === human.color && bot.rabbits === 0) {
        game.winner = human.color;
        alert(game.winner);
        game.phase = 'end';
    }
     else if (this.turn === human.color && human.rabbits === 0) {
        game.winner = bot.color
        alert(game.winner);
        game.phase = 'end';
    }
    else if (this.turn === bot.color && human.rabbits === 0) {
        game.winner = bot.color;
        alert(game.winner);
        game.phase = 'end';
    }
    else if (this.turn === bot.color && bot.rabbits === 0) {
        game.winner = human.color;
        alert(game.winner);
        game.phase = 'end';
    }
    else if (this.turn === human.color && !human.canMove)
    {
        game.winner = bot.color;
        alert('cant move');
        alert(game.winner);
        game.phase = 'end';
    }
     else if (this.turn === bot.color && !bot.canMove)
    {
        game.winner = human.color;
        alert('cant move');
        alert(game.winner);
        game.phase = 'end';
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

Game.prototype.processTurn = function() {
    
    function checkPit(row, col) {
        
        var piece = board.locations[row][col];
        
        if (piece && !piece.friendlyNearby) {
            board.removePiece(piece);   
        }
    }
        
    checkPit(2,2);
    checkPit(2,5);
    checkPit(5,2);
    checkPit(5,5);
}

Game.prototype.setup = function() {
    
    var name = document.getElementById('name-input').value;
    var color = document.querySelector('input[name = "color"]:checked').value;
    var experience = document.getElementById('music-select').value;
    
    var botName = 'Easy-bot';
    var botColor = color === 'White' ? 'b' : 'w';
    var playerColor = color === 'White' ? 'w' : 'b';

    human = new Player(name, playerColor);
    bot = new Bot(botName, botColor);

    game.ranks = [1,2,3,3,4,4,5,5,6,6,6,6,6,6,6,6];
    game.experience = experience;
    game.phase = 'setup';
    game.loop();

}

Game.prototype.loop = function() {
    
    var heading, content;

    if(this.phase === 'creation') {
        
        heading = 'Create Game';
        content = [
            'Please choose a display name',
            'Select which color you would like to play as. Black goes first',
            'Please indicate whether you would like your experience to be relaxed or intense',
            'OR you may load a previously saved game if one exists'
        ];
        
        renderInstructions(heading, content);
        renderGameSetup();
        
    }
    else if (this.phase === 'setup') {
        
        heading = 'Game Setup';
        content = [
            'Players place pieces in the first two rows closest to them. Black goes first',
            'Keep in mind that the strongest pieces are 1. Elephant 2. Camel, 3. Horse, 4. Dog, 5. Cat, 6. Rabbit',
            'Use left and right arrows to select a piece for each location',
            'Click "Ready to Start" when you are finished placing pieces'
        ];
        
        renderInstructions(heading, content);
        renderGameSetupControls();
        renderTurnState(human.name, bot.name);
        
        if (human.ready && bot.ready) {

            this.phase = 'play';
            playFromQueue(0, game.experience);

            this.loop();
        }
        else {
            
            if(this.turn === human.color) {
                board.initializePlayerPieces(human.color);
                renderPieceSelectors();
            }
            else {
                bot.populateInitialSquares();
            }
            
        }
        
    }
    else if (this.phase === 'play') {
        
        heading = 'Game Play';
        content = [
            'On each turn you may move the pieces a total of 4 steps. These steps may be distributed among multiple pieces. You may also pass your turn',
            'Stronger pieces may move the opponents weaker pieces. Opponents that can be moved will be highlighted in blue. Weaker pieces that are adjacent to stronger pieces remain frozen              if there is no friendly neighbor nearby', 
            'To PULL an enemy piece click "Pull" and then move your piece to an adjacent square',
            'To PUSH an enemy piece click "Push", and then move the enemy piece to an adjacent square',
            'If any piece is left in a pit with no friendly neighbor adjecent to it by the end of the turn it will be removed',
            'Get one of your rabbits to the opposite end of the board and you will win'
        ];
        renderInstructions(heading, content);
        renderGamePlayActions();
        
        if(this.turn === bot.color) {
            bot.processTurn();
        }

        board.update();

    }
    
    else if (this.phase === 'end') {
        
        heading = 'Game Finished';
        content = [
            'The game is over. ' + game.winner + ' has won the game!'
        ];
        renderInstructions(heading, content);
        disablePieces();
    }

}

Game.prototype.reset = function() {
    
    var gameGridDiv = document.getElementById('game-grid');
    removeChildNodes(gameGridDiv);
    
    stopAudio();
    
    game.phase = 'creation';
    game.turn = 'b',
    game.experience = null;
    
    game.ranks = [1,2,3,3,4,4,5,5,6,6,6,6,6,6,6,6];
    
    board = new Board();
    
    game.loop();
}

Game.prototype.exportGameState = function() {
    
    var gameState = {
        pieceLocations : board.locations,
        human : {
            name : human.name,
            color : human.color,
            movesLeft : human.movesLeft,
            rabbits : human.rabbits,
            
        },
        bot : {
            name : bot.name,
            color : bot.color,
            movesLeft : bot.movesLeft,
            rabbits : bot.rabbits,
            
        },
        experience : game.experience
        
    }

    
    gameState = JSON.stringify(gameState);
    
    localStorage.setItem('gameSave', gameState);
}

Game.prototype.importGameState = function() {
    
    var json = localStorage.getItem('gameSave');
    
    var gameState = JSON.parse(json);
    
    var humanState = gameState.human;
    var botState = gameState.bot;
    
    human = new Player(humanState.name, humanState.color);
    bot = new Bot(botState.name, botState.color);
    
    human.movesLeft = humanState.movesLeft;
    human.rabbits = humanState.rabbits;
    
    bot.movesLeft = botState.movesLeft;
    bot.rabbits = botState.rabbits;

    game.turn = 'b',
    game.phase = 'play';
    
    game.experience = gameState.experience;
    playFromQueue(0, game.experience);
    
      
    var pieceLocations = gameState.pieceLocations;
    
    pieceLocations.forEach(function(row, rowIndex) {
       
        row.forEach(function(col, colIndex) {
            
            if (col != null) {
                var newPiece = new Piece(col.color, col.rank);
                board.locations[rowIndex][colIndex] = newPiece;
            }
            
           
        });
        
    });
    
    game.loop();

    
}