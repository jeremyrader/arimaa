var Game = {

    init : function(rows, columns) {

        this.rows = rows;
        this.columns = columns;
        this.locations = [];
        
        for (var i = 0; i < rows; i++) {
            
            this.locations.push([]);
            for (var j = 0; j < columns; j++) {
                this.locations[i].push(null);
            }
        }
        
        for (var i = rows-2; i < rows; i++) {
            for (var j = 0; j < columns; j++) {
                this.locations[i][j] = 'initial';
            }
        }
        
        this.phase = 'setup';
        
        
    },
    
    evaluateBoard : function() {
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.columns; j++) {
                this.evaluateSquare(i, j);
            }
        }
    },

    evaluateSquare : function(row, column) {
        
        var self = this;
        
        var vacantSquares = [];
        var occupiedSquares = [];
        var strongerEnemyNearby = false;
        var friendlyNearby = false;
        
        var square = this.locations[row][column];

        if (square !== null) {
            
            //evaluateSquare one square to the left
            var adjacentLeft = this.locations[row][column-1];

            if (adjacentLeft !== undefined) {

                if(adjacentLeft !== null && square.loyalty !== adjacentLeft.loyalty && square.rank > adjacentLeft.rank) {
                    strongerEnemyNearby = true;
                }

                if(adjacentLeft !== null && square.loyalty === adjacentLeft.loyalty) {
                    friendlyNearby = true;
                }

                if (adjacentLeft === null) {
                    vacantSquares.push([row, column-1]);   
                }
                else {
                    occupiedSquares.push([row, column-1]);   
                }
            }

            //evaluateSquare one square to the right
            var adjacentRight = this.locations[row][column+1];

            if (adjacentRight !== undefined) {

                if(adjacentRight !== null && square.loyalty !== adjacentRight.loyalty && square.rank > adjacentRight.rank) {
                    strongerEnemyNearby = true;
                }

                if(adjacentRight !== null && square.loyalty === adjacentRight.loyalty) {
                    friendlyNearby = true;
                }

                if (adjacentRight === null) {
                    vacantSquares.push([row, column+1]);   
                }
                else {
                    occupiedSquares.push([row, column+1]);   
                }
            }


            var rowevaluateSquare = this.locations[row + 1];
            if (rowevaluateSquare !== undefined) {

                 //evaluateSquare one square down
                var adjacentDown = this.locations[row + 1][column];



                if (adjacentRight !== undefined) {

                    if(adjacentDown !== null && square.loyalty !== adjacentDown.loyalty && square.rank > adjacentDown.rank) {
                        strongerEnemyNearby = true;
                    }

                    if(adjacentDown !== null && square.loyalty === adjacentDown.loyalty) {
                        friendlyNearby = true;
                    }

                    if (adjacentDown === null) {
                        vacantSquares.push([row+1,column]);   
                    }
                    else {
                        occupiedSquares.push([row+1,column]);   
                    }
                }
            }

            var rowevaluateSquare = this.locations[row - 1];
            if (rowevaluateSquare !== undefined) {

                 //evaluateSquare one square up
                var adjacentUp = this.locations[row - 1][column];

                if (adjacentUp !== undefined) {

                    if(adjacentUp !== null && square.loyalty !== adjacentUp.loyalty && square.rank > adjacentUp.rank) {
                        strongerEnemyNearby = true;
                    }

                    if(adjacentUp !== null && square.loyalty === adjacentUp.loyalty) {
                        friendlyNearby = true;
                    }

                    if (adjacentUp === null) {
                        vacantSquares.push([row-1,column]);   
                    }
                    else {
                        occupiedSquares.push([row-1,column]);   
                    }
                }
            }

            square.vacantSquares = false && strongerEnemyNearby && !friendlyNearby ? [] : vacantSquares;
            square.movablePieces = [];

            if(!strongerEnemyNearby) {

                //evaluateSquare each adjacent piece to determine whether it is a weaker enemy
                occupiedSquares.forEach(function(occupiedSquare) {
  
                    var evaluateSquaredPiece = self.locations[occupiedSquare[0]][occupiedSquare[1]];

                    if(square.loyalty !== evaluateSquaredPiece.loyalty && square.rank < evaluateSquaredPiece.rank) {
                        square.movablePieces.push([occupiedSquare[0],occupiedSquare[1]]);
                    }
                });
            }
            
        }
        
    },
    
    evaluateGameStatus : function() {
        
        var playerAReachedGoalRow;
        var playerBReachedGoalRow;
        
        //Check if a rabbit of player A reached goal. If so player A wins.
        for (var col = 0; col < this.columns; col++) {
            if (this.locations[0][col].loyalty === this.turn.color && this.locations[0][col].rank === 6) {
                playerAReachedGoalRow = true;
            }
        }
        
        //Check if a rabbit of player B reached goal. If so player B wins.
        for (var col = 0; col < this.columns; col++) {
            if (this.locations[7][col].loyalty === this.turn.color && this.locations[0][col].rank === 6) {
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
        
    },
    
    pass : function(player) {
        Game.turn = player.color;       
    },
    
    setup : function(name, color, difficulty) {
        
        var playerA = color === 'White' ? name : dificulty + '-bot';
        var playerB = playerA === name ? difficulty + '-bot' : name;
        
        this.playerA = {
            name : playerA,
            color : 'White',
            movesLeft : 4,
            canMove : true,
            rabbits : 6,
        };
        
        this.playerB = {
            name : playerB,
            color : 'Black',
            movesLeft : 4,
            canMove : true,
            rabbits : 6,
        };
        
        Game.phase = 'play';
        
        this.turn = playerA;
    },
    
    addPiece : function(color, rank, row, col) {
        this.locations[row][col] = {
            rank : rank,
            loyalty : color,
        }
    },
    
    removePiece : function(row, col) {
        
        //If piece removed is a rabbit then update player info
        if (this.locations[row][col].rank === 6) {
            if (this.locations[row][col].loyalty === 'White') {
                playerA.rabbits--;   
            }
            else {
                playerB.rabbits--;   
            }
        }
        
        this.locations[row][col] = null;
        
    },
    
    movePiece : function(currentLocation, newLocation) {
        
        var temp = this.locations[currentLocation[0]][currentLocation[1]];
        this.locations[newLocation[0]][newLocation[1]] = temp;
        temp = null;
        
    }

};