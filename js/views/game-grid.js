function loadGame() {
    
    game = new Game();
    board = new Board();
    
    game.loop();

}

function renderArimaaBoard(rows, columns) {
    
    var arimaaBoardDiv = document.getElementById('arimaa-board');
    
    var table = document.createElement('table'); 
    table.setAttribute('id', 'game-squares');
    
    arimaaBoardDiv.appendChild(table);
    
    //Generate new rows
    for (var i=0; i < rows; i++) {
        
        var row = document.createElement('tr');
        row.setAttribute('class', 'game-cell');
        table.appendChild(row);

        //Iterate over columns to create cells
        for (var j=0; j < columns; j++) {

            var cell = document.createElement('td');
            cell.setAttribute('class', 'game-cell');
            
            if((i===2 && j===2) || (i===2 && j===5) || (i===5 && j===2) || (i===5 && j===5) ) {
                cell.className += ' pit';    
            }
            
            row.appendChild(cell);
            
        }
        
    }

}

function renderPieceSelectors() {
    
    var colorSelectors = document.getElementsByName('color');
    
    for (i=0; i < colorSelectors.length; i++) {
        colorSelectors[i].setAttribute('disabled', true);
    }

    var gameGridTable = document.getElementById('game-squares');
    var color = this.value === 'White' ? 'w' : 'b';

    var rows = board.rows;
    var cols = board.cols;

    for (var i=6; i < rows; i++) {
        for (var j=0; j < cols; j++) {

            var cell = gameGridTable.rows[i].cells[j];
            
            var leftArrow = document.createElement('i');
            leftArrow.setAttribute('class', 'fa fa-arrow-circle-o-left');
            leftArrow.addEventListener('click', getPreviousPiece, false);

            var rightArrow = document.createElement('i');
            rightArrow.setAttribute('class', 'fa fa-arrow-circle-o-right');
            rightArrow.addEventListener('click', getNextPiece, false);
            
            
            var selectorDiv = document.createElement('div');
            selectorDiv.setAttribute('class', 'selector');
            
            
            selectorDiv.appendChild(leftArrow);
            selectorDiv.appendChild(rightArrow);
            
            cell.appendChild(selectorDiv);

        }
    }
    
}


function getNextPiece() {
    
    var self = this.parentNode.parentNode;

    //removeChildNodes(this);

    var row = self.parentNode.rowIndex;
    var col = self.cellIndex

    //Load square state
    var rank = board.pieces[row][col].rank;
    var color = board.pieces[row][col].color;
    var ranks = game.ranks;

    //Save copy of square state
    var temp = rank; //6
    do {

        rank++;

        if(rank > 6) {
            rank = 0;
        }

    } while (rank != 0 ? !isInArray(rank, ranks) : false)

    human.addPiece(row, col, color, rank);

    //Add previous rank back in
    if (temp !=0) {
        ranks.push(temp);
    }

    var index = ranks.indexOf(rank);

    if (index > -1) {
        ranks.splice(index, 1);
    }

    board.update();

    if (ranks.length < 1) {
        
        this.ranks = [1,2,3,3,4,4,5,5,6,6,6,6,6,6,6,6];
        
        var readyBtn = document.getElementById('ready-btn');
        readyBtn.disabled=false;

    }
    
}

function getPreviousPiece() {
    var self = this.parentNode.parentNode; //refers to this cell

    //removeChildNodes(this);

    var row = self.parentNode.rowIndex;
    var col = self.cellIndex

    //Load square state
    var rank = board.pieces[row][col].rank;
    var color = board.pieces[row][col].color;
    var ranks = game.ranks;

    //Save copy of square state
    var temp = rank; //6
    do {

        rank--;

        if(rank < 0) {
            rank = 6;
        }

    } while (rank != 0 ? !isInArray(rank, ranks) : false)


    human.addPiece(row, col, color, rank);

    //Add previous rank back in
    if (temp !=0) {
        ranks.push(temp);
    }

    var index = ranks.indexOf(rank);

    if (index > -1) {
        ranks.splice(index, 1);
    }

/*
   if (rank != 0) {
        renderPlayerPiece(row, col);
   }
   */
     
     board.update();

    if (ranks.length < 1) {
        
        this.ranks = [1,2,3,3,4,4,5,5,6,6,6,6,6,6,6,6];
        

        gameReady();
        
        //Create a 'Ready' button
        human.passTurn();
        
    }
}

function renderHighlights(playerPiece, interact) {
    
    //var playerPiece = board.pieces[human.selectedPiece[0]][human.selectedPiece[1]];

    //var playerPiece = board.pieces[human.selectedPiece[0]][human.selectedPiece[1]]
    var gridTable = document.getElementById('game-squares');

    var vacantSquares = playerPiece.vacantSquares;
    var movableNeighbors = playerPiece.movableNeighbors;


    if(human.movesLeft >= 2) {
        
        movableNeighbors.forEach(function(piece) {
            var cell = gridTable.rows[piece[0]].cells[piece[1]];

            (function() {
                cell.classList.add('interact');
                cell.addEventListener('click', moveEnemyPiece, false);
                
                if(interact) {
                    cell.addEventListener('click', interact, false);
                }
                
            })(cell);

        });
        
    }
    
    vacantSquares.forEach(function(square) { 
        var cell = gridTable.rows[square[0]].cells[square[1]];
        
        (function() {
            cell.classList.add('move');
            cell.addEventListener('click', movePiece, false);
        })(cell);

    });   
    
}

function removeHighlights() {

    var gridTable = document.getElementById('game-squares');

    for (var i = 0; i < board.rows; i++) {
        for (var j = 0; j < board.cols; j++) {
            
            var cell = gridTable.rows[i].cells[j];

            (function() {
                cell.classList.remove('move');
                cell.classList.remove('interact');
                cell.removeEventListener('click', pullPiece, false);
                cell.removeEventListener('click', pushPiece, false);
                cell.removeEventListener('click', movePiece, false);
                cell.removeEventListener('click', moveEnemyPiece, false);
            })(cell);

        }
    }   
}




function playFromQueue(index, list) {
    
    var intense = [
        "../audio/Corruption.mp3",
        "../audio/Clash%20Defiant.mp3",
        "../audio/Hitman.mp3",
    ];
    
    var relaxed = [
      "../audio/Fretless.mp3",
      "../audio/Hyperfun.mp3",
      "../audio/Life of Riley.mp3"
    ];
    
    var audioSources;
    
    var audioDiv = document.getElementById('audioList');
    audioDiv.volume = 0.5;
    
    if (list === 'relaxed') {
        audioSources = relaxed;
        audioDiv.setAttribute('src', audioSources[index]);
    }
    else if (list === 'intense') {
        audioSources = intense;
        audioDiv.setAttribute('src', audioSources[index]);
    }
    
    audioDiv.addEventListener('ended', function() {
        
        index++;
        
        if (index > audioSources.length) {
            index = 0;   
        }
        
        playFromQueue(index);

    }, false);
    
    audioDiv.play();
    
}

function stopAudio() {
    var audioDiv = document.getElementById('audioList');
    audioDiv.pause();
}