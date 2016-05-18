function gameReady() {
    
    human.ready = true;

    var gameGridTable = document.getElementById('game-squares');

    for (var i=6; i < board.rows; i++) {
        for (var j=0; j < board.cols; j++) {

            var cell = gameGridTable.rows[i].cells[j];
            removeChildNodes(cell);

        }
    }
    
    human.passTurn();

}


function startGame() {


    var name = document.getElementById('name-input').value;
    var color = document.querySelector('input[name = "color"]:checked').value;
    var experience = document.getElementById('music-select').value;

    game.setup(name, color, experience);
    
    game.ranks = [1,2,3,3,4,4,5,5,6,6,6,6,6,6,6,6];

    game.loop();

}

function renderPrompt(id, promptText, inputElement, parentElement) {
    
    var promptDiv = document.createElement('div');
    promptDiv.setAttribute('id', id);
           
    addTextNode(promptDiv, promptText);
    promptDiv.appendChild(inputElement);
    
    parentElement.appendChild(promptDiv);
    
}

function renderGameSetup() {

    var sideBarDiv = document.getElementById('game-controls');
    removeChildNodes(sideBarDiv);
    

    var nameInput = document.createElement('input');
    nameInput.setAttribute('id', 'name-input');
    nameInput.setAttribute('placeholder', 'name');
    nameInput.addEventListener('keypress', validateInputs, false);
    
    renderPrompt('name-entry', 'Please choose a display name', nameInput, sideBarDiv);
    
    
    var colorSelectDiv = document.createElement('div');
    colorSelectDiv.setAttribute('id', 'color-select');
    
    var black = document.createElement('input');
    black.setAttribute('name', 'color');
    black.setAttribute('type', 'radio');
    black.setAttribute('value', 'Black');
    black.addEventListener('click', validateInputs, false);
    
    var white = document.createElement('input');
    white.name = 'color';
    white.type = 'radio';
    white.value = 'White';
    white.addEventListener('click', validateInputs, false);

    
    addTextNode(colorSelectDiv, 'Black');
    colorSelectDiv.appendChild(black);
    
    addTextNode(colorSelectDiv, 'White');
    colorSelectDiv.appendChild(white);
    
    
    renderPrompt('color-select', 'Select a color:', colorSelectDiv, sideBarDiv);
    
    
    var musicSelect = document.createElement('select');
    musicSelect.setAttribute('id', 'music-select');

    var opt1 = document.createElement('option');
    opt1.setAttribute('value', 'relaxed');
    addTextNode(opt1, 'Relaxed');

    var opt2 = document.createElement('option');
    opt2.setAttribute('value', 'intense');
    addTextNode(opt2, 'Intense');

    musicSelect.appendChild(opt1);
    musicSelect.appendChild(opt2);
    
    renderPrompt('music-selection', 'Select a game-play experience:', musicSelect, sideBarDiv);
    

    var startButton = document.createElement('button');
    startButton.setAttribute('id', 'start-btn');
    startButton.addEventListener('click', game.setup, false);
    startButton.setAttribute('disabled', 'true', false);
    
    addTextNode(startButton, 'Start Game');
    sideBarDiv.appendChild(startButton);
    

    var loadGameBtn = document.createElement('button');
    loadGameBtn.setAttribute('id', 'load-btn');
    loadGameBtn.type = 'button';
    loadGameBtn.addEventListener('click', game.importGameState, false);
    
    addTextNode(loadGameBtn, 'Load Game');
    
    if(localStorage.getItem('gameSave')) {
        sideBarDiv.appendChild(loadGameBtn);
    };

}

function renderGamePlayActions() {
    
    var sideBarDiv = document.getElementById('game-controls');
    removeChildNodes(sideBarDiv);
    
    var passTurnBtn = document.createElement('button');
    passTurnBtn.setAttribute('id', 'pass-turn');
    passTurnBtn.addEventListener('click', human.passTurn, false);
    addTextNode(passTurnBtn, 'Pass Turn');
    
    sideBarDiv.appendChild(passTurnBtn);
    
     var interactOptionsDiv = document.createElement('div');
    interactOptionsDiv.setAttribute('id','interact-options');

    
    sideBarDiv.appendChild(interactOptionsDiv);
    
    var saveGameBtn = document.createElement('button');
    saveGameBtn.setAttribute('id','save-game-btn');
    saveGameBtn.type = 'button';
    saveGameBtn.addEventListener('click', game.exportGameState, false);
    
    addTextNode(saveGameBtn, 'Save Game');
    
    sideBarDiv.appendChild(saveGameBtn);
    
    var newGameBtn = document.createElement('button');
    newGameBtn.setAttribute('id','new-game');
    newGameBtn.type = 'button';
    newGameBtn.addEventListener('click', game.reset, false);
    
    addTextNode(newGameBtn, 'New Game');
    
    sideBarDiv.appendChild(newGameBtn);
    
    
}

function renderGameSetupControls() {
    
    var sideBarDiv = document.getElementById('game-controls');
    removeChildNodes(sideBarDiv);
    
    var turnStateDiv = document.createElement('div');
    turnStateDiv.setAttribute('id', 'turn-state');
    sideBarDiv.appendChild(turnStateDiv);
    
    
    var readyBtn = document.createElement('button');
    readyBtn.setAttribute('id', 'ready-btn');
    readyBtn.type = 'button';
    readyBtn.disabled = true;
    readyBtn.addEventListener('click', gameReady, false);
    
    addTextNode(readyBtn, 'Ready to start');
    
    sideBarDiv.appendChild(readyBtn);
    
}

function validateInputs() {
    
    var nameEntered = document.getElementById('name-input').value !== '';
    var colorSelected = document.querySelector('input[name = "color"]:checked') != null;

    if(nameEntered && colorSelected) {
        var startBtn = document.getElementById('start-btn');
        startBtn.disabled = false;
    }
}

function renderTurnState(name, difficulty) {
    
    var turnStateDiv = document.getElementById('turn-state');
    
    var p1 = document.createElement('p');
    addTextNode(p1, name + ' vs. ' + difficulty);
    
    var p2 = document.createElement('p');
    p2.setAttribute('id', 'current-player');
    
    var p3 = document.createElement('p');
    p3.setAttribute('id', 'player-moves-left');
    
    turnStateDiv.appendChild(p1);
    turnStateDiv.appendChild(p2);
    turnStateDiv.appendChild(p3);
    
}

function renderTurn() {

    
    var playerMovesLeft = document.getElementById('player-moves-left');
    removeChildNodes(playerMovesLeft);
    
    
    var turn, movesLeft;
    
    if (game.turn === human.color) {
        turn = human.name;
        movesLeft = human.movesLeft;
    }
    else {
        turn = bot.name;
        movesLeft = bot.movesLeft;
    }
    
    addTextNode(currentPlayer);

    var txtNode1 = document.createTextNode('Turn: ' + turn);
    var txtNode2 = document.createTextNode('Moves Left: ' + movesLeft);
    
    currentPlayer.appendChild(txtNode1);
    playerMovesLeft.appendChild(txtNode2);
}

function renderInteractOptions() {
    
    var interactOptionsDiv = document.getElementById('interact-options');
    removeChildNodes(interactOptionsDiv);
    
    var pullBtn = document.createElement('button');
    pullBtn.setAttribute('id', 'pull');
    pullBtn.addEventListener('click', pull);
    
    addTextNode(pullBtn, 'Pull');
    
    var pushBtn = document.createElement('button');
    pushBtn.setAttribute('id', 'pull');
    pushBtn.addEventListener('click', push);
    
    addTextNode(pushBtn,'Push');

    
    if (human.selectedPiece.vacantSquares.length > 0) {
        interactOptionsDiv.appendChild(pullBtn);
    }
    
    if (human.enemyPiece.vacantSquares.length > 0) {
        interactOptionsDiv.appendChild(pushBtn);
    }
    
}

function clearInteractOptions() {
    var interactOptionsDiv = document.getElementById('interact-options');
    removeChildNodes(interactOptionsDiv);
}