function renderGameBoard() {
    
    renderGameGrid(8,8);

    Game.init(8,8);
    
    if (Game.phase === 'setup') {
        renderGameSetup();    
    }
    
    displayLoginInfo();
    
    startAnimation();

}

function displayLoginInfo() {
    
    var debugDiv = document.getElementById('debug');
    
    var timestamp = localStorage.getItem('cs2550timestamp');
    var data = timestamp.split(' ');
    
    var message = 'You logged in as ' + data[0] + ' on ' + data[1] + ' at ' + data[2];
    var textNode = document.createTextNode(message);
    
    debugDiv.appendChild(textNode);
    
}


function renderGameGrid(rows, columns) {
    
    var gameGridDiv = document.getElementById('game-grid');
    
    var table = document.createElement('table'); 
    table.setAttribute('id', 'game-squares');
    
    gameGridDiv.appendChild(table);
    
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

        
function renderPieces() {
    
    var gridTable = document.getElementById('game-squares');

    for(var row = 0; row < Game.rows; row++) {

        for(var column = 0; column < Game.columns;  column++) {
            
            var cell = gridTable.rows[row].cells[column];
            var piece = Game.locations[row][column];

            if (piece !== null && piece !== 'initial') {
                cell.innerHTML = '<img src=\"../images/' + piece.loyalty + '-' + piece.rank + '.svg\" width=100% height=100%">';
            }

        }
           
    }

}

function drawAvailableActions() {
    
    var selectedPiece = Game.selectedPiece;

    if (selectedPiece) {
        
        var gridTable = document.getElementById('game-squares');
        var vacantSquares = Game.locations[selectedPiece[0]][selectedPiece[1]].vacantSquares;
        var movablePieces = Game.locations[selectedPiece[0]][selectedPiece[1]].movablePieces;

        movablePieces.forEach(function(piece) {
            var cell = gridTable.rows[piece[0]].cells[piece[1]];
            cell.className += 'interact';
        });

        vacantSquares.forEach(function(square) { 
            var cell = gridTable.rows[square[0]].cells[square[1]];
            cell.className += 'move';
        });
    }
    
}

function addPiece(row, col) {
    
    var color = Game.stagedPiece[0];
    var rank = Game.stagedPiece[1];
    
    Game.locations[row][col] = { loyalty : color, rank : rank }
}

function removePieceFromSetup(name) {

    var parent = document.getElementById("staged-pieces");
    var child = document.getElementsByName(name)[0];

    parent.removeChild(child);
}

function startGame() {
    var parent = document.getElementById("sidebar");
    var child = document.getElementById("game-setup");
    parent.removeChild(child);
}

var whiteElephantImg, blackElephantImg, msPerFrame, frameCount, moveDist, elephantsDivWidth;
var botLeft;
var botRight;
var whiteElephantLeft;
var blackElephantLeft;
var center = 804;
var margin = 10;

function startAnimation() {
    
    whiteElephantImg = document.getElementById("white-elephant-img");
    blackElephantImg = document.getElementById("black-elephant-img");
    
    whiteElephantLeft = 804;
    blackElephantLeft = 804;
    
    msPerFrame =10;
    moveDist = 1;

    setTimeout(whiteRearBack, msPerFrame);

}


function whiteRearBack() {

    whiteElephantLeft -= moveDist;

    whiteElephantImg.style.left = whiteElephantLeft + "px";
    
    if (whiteElephantLeft > center - whiteElephantImg.width - margin) {
	   setTimeout(whiteRearBack, msPerFrame);
    }
    else {
        setTimeout(function() {
            setTimeout(whiteCharge, msPerFrame);
        }, 500);
        
    }

}

function whiteCharge() {
    
    whiteElephantLeft += moveDist;

    whiteElephantImg.style.left = whiteElephantLeft + "px";
    
    msPerFrame =3;
    
    if (whiteElephantLeft < center) {
	   setTimeout(whiteCharge, msPerFrame);
    }
    else {
       setTimeout(blackReact, msPerFrame);
    }
}

function blackReact() {

    blackElephantLeft += moveDist;

    blackElephantImg.style.left = blackElephantLeft + "px";
    
    msPerFrame = 3;
    
    if (blackElephantLeft < center + 25) {
        setTimeout(blackReact, msPerFrame);
    }
    else {
        setTimeout(function() {
            setTimeout(blackReturnToCenter, 100);
        }, 500);
        
    }
}

function blackReturnToCenter() {
    blackElephantLeft -= moveDist;

    blackElephantImg.style.left = blackElephantLeft + "px";
    
    msPerFrame = 50;
    
    if (blackElephantLeft > center) {
        setTimeout(blackReturnToCenter, msPerFrame);
    }
    else {
        setTimeout(function() {
            setTimeout(blackRearBack, msPerFrame);
        }, 500);
    }

}

function blackRearBack() {

    blackElephantLeft += moveDist;
    
    msPerFrame = 10;

    blackElephantImg.style.left = blackElephantLeft + "px";
    
    if (blackElephantLeft < center + whiteElephantImg.width + margin) {
	   setTimeout(blackRearBack, msPerFrame);
    }
    else {
        setTimeout(function() {
            setTimeout(blackCharge, msPerFrame);
        }, 500);
        
    }

}

function blackCharge() {
    
    blackElephantLeft -= moveDist;

    blackElephantImg.style.left = blackElephantLeft + "px";
    
    msPerFrame =3;
    
    if (blackElephantLeft > center) {
	   setTimeout(blackCharge, msPerFrame);
    }
    else {
       setTimeout(whiteReact, msPerFrame);
    }
}

function whiteReact() {

    whiteElephantLeft -= moveDist;

    whiteElephantImg.style.left = whiteElephantLeft + "px";
    
    msPerFrame = 3;
    
    if (whiteElephantLeft > center - 25) {
        setTimeout(whiteReact, msPerFrame);
    }
    else {
        setTimeout(function() {
            setTimeout(whiteReturnToCenter, 100);
        }, 500);
        
    }
}

function whiteReturnToCenter() {
    whiteElephantLeft += moveDist;

    whiteElephantImg.style.left = whiteElephantLeft + "px";
    
    msPerFrame = 50;
    
    if (whiteElephantLeft < center) {
        setTimeout(whiteReturnToCenter, msPerFrame);
    }

}

function checkRankOptions() {
    
    var optionsLeft = true;
    
    pieces.forEach(function(piece) {
        if (pieces.length < 1) {
            
        }
    });
    
    return optionsLeft;
}

var ranks = [1,2,3,3,4,4,5,5,6,6,6,6,6,6,6,6];

function isInArray(value, array) {
    return array.indexOf(value) > -1;
}


function renderPieceSelectors() {
    
    var colorSelectors = document.getElementsByName('color');
    
    for (i=0; i < colorSelectors.length; i++) {
        colorSelectors[i].setAttribute('disabled', true);
    }
    
    var gameGridTable = document.getElementById('game-squares');
    var color = this.value === 'White' ? 'w' : 'b';

    var rows = Game.rows;
    var columns = Game.columns;

    for (var i=6; i < rows; i++) {
        for (var j=0; j < columns; j++) {

            //Initialize each starting square
            Game.locations[i][j] = { rank : 0 };

            //Set an opaque square
            var selectDiv = document.createElement('div');
            selectDiv.setAttribute('class', 'select-piece');

            var cell = gameGridTable.rows[i].cells[j];
            cell.appendChild(selectDiv);
            
            cell.addEventListener('click', cyclePieces, false);

        }
    }
    
    function cyclePieces() {

        var self = this; //refers to this cell

        removeChildNodes(this);

        var row = this.parentNode.rowIndex;
        var col = this.cellIndex

        //Load square state
        var rank = Game.locations[row][col].rank;

        //Save copy of square state
        var temp = rank; //6
        
        do {
            
            rank++;

            if(rank > 6) {
                rank = 0;
            }
            
        } while (rank != 0 ? !isInArray(rank,ranks) : false)
        
        
        Game.locations[row][col].rank = rank;
        
        //Add previous rank back in
        if (temp !=0) {
            ranks.push(temp);
        }
        
        var index = ranks.indexOf(rank);

        if (index > -1) {
            ranks.splice(index, 1);
        }


       if (rank != 0) {
            renderPlayerPiece(color, rank);
       }
        
        if (ranks.length < 1) {
            console.log('ready');
            var gameStartBtn = document.getElementById('start-btn');
            gameStartBtn.setAttribute('disabled', 'false');
        }

    }
    
}


function renderPlayerPiece(color, rank) {
    
    var color = this.value === 'White' ? 'w' : 'b';
    
    var playerPiece = document.createElement('img');

    playerPiece.setAttribute('name', color + rank);
    playerPiece.setAttribute('src', '../images/' + color + '-' + rank + '.svg');
    playerPiece.setAttribute('height', '100%');
    playerPiece.setAttribute('width', '100%');
    playerPiece.setAttribute('z-index', 1500);
    playerPiece.addEventListener('click', function() {
        //do something here
    }, false);

    this.appendChild(playerPiece);

}


function renderGameSetup() {
    
    var gameGridTable = document.getElementById('game-squares');
    
    for(var i=0; i < Game.rows; i++) {
        for(var j=0; j < Game.columns; j++) {
            
            var cell = gameGridTable.rows[i].cells[j];
            
            if(i===6 || i===7) {
                //cell.addEventListener('click', selectPiece, false);
            }
            
        }
    }

    var sideBarDiv = document.getElementById('sidebar');
    
    var gameSetupDiv = document.createElement('div');
    gameSetupDiv.setAttribute('id', 'game-setup');

    var heading = document.createElement('h1');
    heading.text = 'Game Setup';
    gameSetupDiv.appendChild(heading);
    
    var nameEntryDiv = document.createElement('div');
    nameEntryDiv.setAttribute('id', 'name-entry');
    gameSetupDiv.appendChild(nameEntryDiv);
    
    var colorSelectDiv = document.createElement('div');
    colorSelectDiv.setAttribute('id', 'color-select');
    gameSetupDiv.appendChild(colorSelectDiv);
    
    var difficultySelectDiv = document.createElement('div');
    difficultySelectDiv.setAttribute('id', 'difficulty-select');
    gameSetupDiv.appendChild(difficultySelectDiv);

    var startGameDiv = document.createElement('div');
    startGameDiv.setAttribute('id', 'start-game');
    gameSetupDiv.appendChild(startGameDiv);

    var debugDiv = document.createElement('div');
    debugDiv.setAttribute('id', 'debug');
    gameSetupDiv.appendChild(debugDiv);
    
    var clearLocalStorageBtn = document.createElement('button');
    clearLocalStorageBtn.type = 'button';
    clearLocalStorageBtn.addEventListener('click', clearLocalStorage, false);
    
    var buttonTxt = document.createTextNode('Clear Local Storage');
    clearLocalStorageBtn.appendChild(buttonTxt);
    
    debugDiv.appendChild(clearLocalStorageBtn);

    sideBarDiv.appendChild(gameSetupDiv);
    
    renderNameEntry();
    renderColorSelect();
    renderDifficultySelect();
    renderGameStart();
    

}

function clearLocalStorage() {
    localStorage.clear();
    var debugDiv = document.getElementById('debug');
    
    while (debugDiv.firstChild) {
        debugDiv.removeChild(debugDiv.firstChild);
    }
}

function renderColorSelect() {
    
    var colorSelectDiv = document.getElementById('color-select');
    
    var p1 = document.createElement('p');
    var prompt = document.createTextNode('Which color would you like to play as?');
    p1.appendChild(prompt);
    
    var black = document.createElement('input');
    black.setAttribute('name', 'color');
    black.setAttribute('type', 'radio');
    black.setAttribute('value', 'Black');
    black.addEventListener('click', renderPieceSelectors, false);

    var white = document.createElement('input');
    white.name = 'color';
    white.type = 'radio';
    white.value = 'White';
    white.addEventListener('click', renderPieceSelectors, false);
    
    var txt1 = document.createTextNode('White');
    var txt2 = document.createTextNode('Black');
    
    colorSelectDiv.appendChild(p1);
    colorSelectDiv.appendChild(white);
    colorSelectDiv.appendChild(txt1);
    colorSelectDiv.appendChild(black);
    colorSelectDiv.appendChild(txt2);
}

function renderNameEntry() {
    
    var nameEntryDiv = document.getElementById('name-entry');
    
    var nameInput = document.createElement('input');
    nameInput.setAttribute('placeholder', 'name');
    nameInput.onkeypress = function() {
        if (event.keyCode==13) {
            alert('You entered your name as ' + this.value); 
        } 
    };
    
    var p1 = document.createElement('p');
    var prompt = document.createTextNode('What name would you like to display?');
    p1.appendChild(prompt);
    
    nameEntryDiv.appendChild(p1);
    nameEntryDiv.appendChild(nameInput);
}

function renderDifficultySelect() {
    
    var difficultySelectDiv = document.getElementById('difficulty-select');
    
    var p1 = document.createElement('p');
    var prompt = document.createTextNode('Please select a difficulty setting : ');
    p1.appendChild(prompt);
    
    var select = document.createElement('select');
    select.onchange = function() {
        alert('You chose ' + this.value + ' difficulty');
    }

    var opt1 = document.createElement('option');
    var txt1 = document.createTextNode('Easy');
    opt1.appendChild(txt1)

    var opt2 = document.createElement('option');
    var txt2 = document.createTextNode('Medium');
    opt2.appendChild(txt2)

    var opt3 = document.createElement('option');
    var txt3 = document.createTextNode('Hard');
    opt3.appendChild(txt3)

    select.appendChild(opt1);
    select.appendChild(opt2);
    select.appendChild(opt3);
    
    difficultySelectDiv.appendChild(prompt);
    difficultySelectDiv.appendChild(select);
}

function renderGameStart() {
    
    var buttonDiv = document.getElementById('start-game');
    buttonDiv.setAttribute('class', 'play');

    var startButton = document.createElement('button');
    startButton.setAttribute('id', 'start-btn');
    startButton.setAttribute('class', 'play');
    startButton.setAttribute('disabled', 'true');
    
    var buttonText = document.createTextNode('Start Game');
    startButton.onclick = startGame;
    startButton.setAttribute('disabled', 'true');
    startButton.appendChild(buttonText);
    
    buttonDiv.appendChild(startButton);   
}

function overlay() {
    
	el = document.getElementById("overlay");
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
    
    renderStagedPieces(this);
}


function removeChildNodes(element) {
    while (element.hasChildNodes()) {
        element.removeChild(element.firstChild);
    }
}

function renderStagedPieces(clickedCell) {
    
    //Get color for displaying pieces
    var color;

    var colorOptions = document.getElementsByName('color');

    for (var i=0; i < colorOptions.length; i++) {
        colorOptions[i].setAttribute('disabled', 'true');
        if ( colorOptions[i].checked ) {
            color = (colorOptions[i].value === 'White') ? 'w' : 'b';
        }
    }
    
    
    var stagedPiecesTable = document.getElementById('staged-pieces');
    
    removeChildNodes(stagedPiecesTable);

    
    var row1 = document.createElement('tr');
    row1.setAttribute('id', 'stagedPieces1');
    stagedPiecesTable.appendChild(row1);
    
    renderStagedPiece(row1, clickedCell, color, 1);
    renderStagedPiece(row1, clickedCell, color, 2);
    
    for (var i=0; i < 2; i++) {
        renderStagedPiece(row1, clickedCell, color, 3);
        renderStagedPiece(row1, clickedCell, color, 4);
        renderStagedPiece(row1, clickedCell, color, 5);
    }
    
    var row2 = document.createElement('tr');
    row2.setAttribute('id', 'stagedPieces1');
    stagedPiecesTable.appendChild(row2);
    
    for(var i=0; i < 8; i++) {
        renderStagedPiece(row2, clickedCell, color, 6);
    }

}

function renderStagedPiece(row, clickedCell, color, rank) {

    var cell = document.createElement('td');
    row.appendChild(cell);
    
    var playerPiece = document.createElement('img');

    playerPiece.setAttribute('name', color + rank);
    playerPiece.setAttribute('src', '../images/' + color + '-' + rank + '.svg');
    playerPiece.addEventListener('click', function() {
        
        var col = clickedCell.cellIndex
        var row = clickedCell.parentNode.rowIndex;
        
        overlay();
        
        Game.addPiece(color, rank, row, col);
        
        
        cell.removeChild(playerPiece);
        
        console.log(Game.locations);
        
        renderPieces();

    }, false);

    cell.appendChild(playerPiece);

}


