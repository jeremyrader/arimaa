function displayLoginInfo() {
    
    var debugDiv = document.getElementById('debug');
    
    var timestamp = localStorage.getItem('cs2550timestamp');
    var data = timestamp.split(' ');
    
    var message = 'You logged in as ' + data[0] + ' on ' + data[1] + ' at ' + data[2];
    var textNode = document.createTextNode(message);
    
    debugDiv.appendChild(textNode);
    
}

function gameReady() {
    
    var gameGridTable = document.getElementById('game-squares');
    
    for (var i=6; i < board.rows; i++) {
        
        for (var j=0; j < board.cols; j++) {
            
            var cell = gameGridTable.rows[i].cells[j];
            cell.removeEventListener('click', cyclePieces, false);
        }
        
    }
    
    var parent = document.getElementById("sidebar");
    var child = document.getElementById("game-setup");
    parent.removeChild(child);
    
}


function startGame() {

    var name = document.getElementById('name-entry').value;
    var color = document.querySelector('input[name = "color"]:checked').value;
    var difficulty = document.getElementById('difficulty-select').value;
    
    game.setup(name, color, difficulty);
    
    game.ranks = [1,2,3,3,4,4,5,5,6,6,6,6,6,6,6,6]

    game.loop();

}

function setupGame() {
    
    var name = document.getElementById('name-entry').value;
    var color = document.querySelector('input[name = "color"]:checked').value;
    var difficulty = document.getElementById('difficulty-select').value;
    
    game.setup(name, color, difficulty);
    
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

    var white = document.createElement('input');
    white.name = 'color';
    white.type = 'radio';
    white.value = 'White';
    
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
    startButton.onclick = startGame;
   

    var buttonText = document.createTextNode('Start Game');
    startButton.appendChild(buttonText);


    buttonDiv.appendChild(startButton);   
    
    
}