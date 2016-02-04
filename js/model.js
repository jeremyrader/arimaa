var Game = {

    init : function(rows, columns) {

        this.rows = rows;
        this.columns = columns;

        for (var i = 1; i <= columns; i++) {

            for (var j = 1; j <= rows; j++) {
                var location = String.fromCharCode(96 + i).toUpperCase() + j;
                this.locations[location] = null;
            }

        }

        //Instantiate one piece for now for testing
        this.locations['B8'] = { loyalty : 'w', rank : '5', weakerEnemies : [] };

        this.turn = 'w';

    },

    evaluate : function(location) {

        var self = this;

        var selectedSquare = location.split('');
        var selectedPiece = this.locations[location];

        var row = selectedSquare[0];
        var column = selectedSquare[1];

        var vacantSquares = [];
        var occupiedSquares = [];

        var rowChar = row.charCodeAt(0);
        var columnNum = parseInt(column);

        //Evaluate one square to the right
        if(rowChar+1 <= (65 + this.rows)) {

            var rightLocation = String.fromCharCode(rowChar+1) + column;

            if(this.locations[rightLocation] === null) {
                vacantSquares.push(rightLocation);
            }
            else {
                occupiedSquares.push(rightLocation);
            }
        }

        //Evaluate one square to the left
        if(rowChar-1 >= 65) {

            var leftLocation = String.fromCharCode(rowChar-1) + column;

            if(this.locations[leftLocation] === null) {
                vacantSquares.push(leftLocation);
            }
            else {
                occupiedSquares.push(leftLocation);
            }
        }

        //Evaluate one square up
        if(columnNum+1 <= this.columns) {

            var upLocation = row + (columnNum+1);

            if(this.locations[upLocation] === null) {
                vacantSquares.push(upLocation);
            }
            else {
                occupiedSquares.push(upLocation);
            }

        }

        //Evaluate one square down
        if(columnNum-1 >= 1) {

            var downLocation = row + (columnNum-1);

            if(this.locations[downLocation] === null) {
                vacantSquares.push(downLocation);
            }
            else {
                occupiedSquares.push(downLocation);
            }

        }

        this.locations[location].vacantSquares = vacantSquares;

        //Evaluate each adjacent piece to determine whether it is a weaker enemny
        occupiedSquares.forEach(function(occupiedSquare) {

            var evaluatedPiece = self.locations[occupiedSquare];

            if(selectedPiece.loyalty !== evaluatedPiece.loyalty && selectedPiece.rank < evaluatedPiece.rank) {
                selectedPiece.weakerEnemies.push(occupiedSquare);
            }

        });

    },

    rows : null,
    columns : null,
    locations : [],

};