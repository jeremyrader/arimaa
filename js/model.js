var Game = {

    init : function(rows, columns) {

        this.rows = rows;
        this.columns = columns;

        for (var i = 1; i <= columns; i++) {
            for (var j = 1; j <= rows; j++) {
                this.locations = null;
            }
        }
        
        this.turn = 'b';
        this.selectedPiece = [1,3];
        
        this.locations = [
            [
                { loyalty : 'w', rank : '6' },
                { loyalty : 'b', rank : '6' },
                null,
                null,
                null,
                { loyalty : 'b', rank : '6' },
                null,
                null
            ],
            [
                { loyalty : 'b', rank : '4' },
                { loyalty : 'w', rank : '6' },
                { loyalty : 'w', rank : '6' },
                { loyalty : 'b', rank : '1' },
                null,
                { loyalty : 'b', rank : '6' },
                null,
                null
            ],
            [
                null,
                { loyalty : 'b', rank : '2' },
                { loyalty : 'b', rank : '6' },
                { loyalty : 'w', rank : '3' },
                { loyalty : 'w', rank : '1' },
                null,
                null,
                null
            ], 
            [
                { loyalty : 'w', rank : '6' },
                { loyalty : 'w', rank : '5' },
                { loyalty : 'w', rank : '3' },
                { loyalty : 'b', rank : '5' },
                null,
                { loyalty : 'b', rank : '6' },
                null,
                null
            ],
            [
                null,
                null,
                null,
                null,
                null,
                null,
                { loyalty : 'w', rank : '2' },
                null
            ],
            [
                null,
                null,
                null,
                null,
                { loyalty : 'b', rank : '6' },
                null,
                null,
                null
            ],
            [
                { loyalty : 'w', rank : '6' },
                null,
                { loyalty : 'w', rank : '4' },
                null,
                null,
                null,
                { loyalty : 'b', rank : '5' },
                { loyalty : 'b', rank : '6' }
            ],
            [
                { loyalty : 'w', rank : '6' },
                { loyalty : 'w', rank : '6' },
                null,
                null,
                null,
                null,
                null,
                { loyalty : 'b', rank : '6' }
            ],
        ];

        for (var i = 0; i < rows; i++) {

            for (var j = 0; j < columns; j++) {
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

};