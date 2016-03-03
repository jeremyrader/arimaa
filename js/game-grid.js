function renderGameBoard() {
    
    var gameGrid = document.getElementById('game-grid');
    gameGrid.innerHTML = generateTable(8,8);

    Game.init(8,8);
    
    drawPits();
    addClickHandlers();
    
    
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


function generateTable(rows, columns) {
    
    var table = '<table id="game-squares">';
    
    //Generate new rows
    for (var i = rows; i > 0; i--) {
        var rowNumber = i.toString();
        table += generateRow(columns, rowNumber);
    }

    table += '</table>';
    
    return table;
         
}

function generateRow(columns, number) {
    return '<tr>' + generateColumn(columns, number) + '</tr>';
}

function generateColumn(columns, number) {

    var column = '';

    //Iterate over columns to create cells
    for (var i = 1; i < columns + 1; i++) {
        column += '<td></td>';
    }

    return column;
}
        
function drawPieces() {
    
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

function drawPits() {
    
    var gridTable = document.getElementById('game-squares');
    
    var cell1 = gridTable.rows[2].cells[2];
    var cell2 = gridTable.rows[5].cells[5];
    var cell3 = gridTable.rows[2].cells[5];
    var cell4 = gridTable.rows[5].cells[2];

    cell1.className += 'pit';
    cell2.className += 'pit';  
    cell3.className += 'pit';  
    cell4.className += 'pit';
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

function addClickHandlers() {

    var cells = document.getElementsByTagName('td');
    
    for (var i=0; i < cells.length; i++) {
        cells[i].addEventListener('click', handleCellClick, false);
        cells[i].addEventListener('blur', function() {
            var gridTable = document.getElementById('game-squares');
            var cell = gridTable.rows[row].cells[col];
            cell.className = '';
        }, false);
    }
    
}
    
function handleCellClick() {
    
    var col = this.cellIndex;
    var row = this.parentNode.rowIndex;

    var debugDiv = document.getElementById('debug');
    debugDiv.innerHTML = 'You clicked at position: ' + col + ' ' + row;

    var gridTable = document.getElementById('game-squares');
    var cell = gridTable.rows[row].cells[col];

    if(cell.className !== 'move' && cell.className != 'pit') {
        cell.className += 'move';
    }
        
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


function renderGameSetup() {

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
    
    var stagedPiecesDiv = document.createElement('div');
    stagedPiecesDiv.setAttribute('id', 'staged-pieces');
    gameSetupDiv.appendChild(stagedPiecesDiv);
    
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
    black.addEventListener('click', function() {
        alert('You chose to play as black');
    }, false);

    var white = document.createElement('input');
    white.name = 'color';
    white.type = 'radio';
    white.value = 'White';
    white.addEventListener('click', function() {
        alert('You chose to play as white');
    }, false);
    
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
    startButton.setAttribute('class', 'play');
    startButton.setAttribute('disabled', 'true');
    
    var buttonText = document.createTextNode('Start Game');
    startButton.onclick = startGame;
    startButton.setAttribute('disabled', 'true');
    startButton.appendChild(buttonText);
    
    buttonDiv.appendChild(startButton);   
}
