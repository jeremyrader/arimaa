function Piece (color, rank) {
    this.rank = rank;
    this.color = color;
    this.vacantSquares = [];
    this.occupiedSquares = [];
    this.movableNeighbors = [];
    this.friendlyNearby = false;
    this.strongerEnemyNearby = false;
}

Piece.prototype.evaluate = function(row, col) {
    
    function arrayContainsPiece(array1, array2) {

        var valuePresent = false;

        array1.forEach(function(index) {
           if(index[0] === array2[0] && index[1] === array2[2]) {
               valuePresent = true;
           }
        });

        return valuePresent;
    }
    
    var self = this;

    var neighborRow = board.pieces[row];
    
    if (neighborRow !== undefined) {
        
        var neighbor = board.pieces[row][col];

        if (neighbor !== undefined) {
        
            if(neighbor !== null) {

                if(this.color !== neighbor.color && this.rank > neighbor.rank) {
                    this.strongerEnemyNearby = true;
                }
                
                if(this.color === neighbor.color) {
                    this.friendlyNearby = true;
                }
                
                if(!arrayContainsPiece(this.occupiedSquares, [row,col])) {
                    self.occupiedSquares.push([row, col]); 
                }

            }
            else {

               if(!arrayContainsPiece(this.vacantSquares, [row,col])) {
                    self.vacantSquares.push([row, col]); 
                }

            }
        
        }
     
    }
        
}



