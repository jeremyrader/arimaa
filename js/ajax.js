function loadAjaxLoginRequest() {
    
    var loginStatusSpan = document.getElementById('loginStatus');
    
    while (loginStatusSpan.firstChild) {
        loginStatusSpan.removeChild(loginStatusSpan.firstChild);
    }
    
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var data = 'userName=' + username + '&password=' + password;
    
    var request = new XMLHttpRequest();
    
    request.open('POST', 'http://universe.tc.uvu.edu/cs2550/assignments/PasswordCheck/check.php', false);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(data);
    
    if (request.status == 200) {
        
        var loginStatusSpan = document.getElementById('loginStatus');
        var responseJson = JSON.parse(request.responseText);
        
        if (responseJson['result'] === 'valid') {
            
            var loginInfo = responseJson['userName'] + ' ' + responseJson['timestamp'];
            localStorage.setItem('cs2550timestamp', loginInfo);

            window.location.href = '/html/game-grid.html';   
            
        }
        else {
            var textNode = document.createTextNode('Your password is ' + responseJson['result']);
            loginStatusSpan.appendChild(textNode);
        }

    }
  
}

function loadSyncPost() {

    var localRequest = new XMLHttpRequest();

    // PASSING false AS THE THIRD PARAMETER TO open SPECIFIES SYNCHRONOUS
    localRequest.open("GET", "../gamestate.json", false);
    localRequest.setRequestHeader("Content-Type", "application/json");
    localRequest.send(null);


	var dataDiv = document.getElementById("content");

	// FOR MORE INFORMATION ABOUT JSON SEE http://json.org
	var responseJson = JSON.parse(localRequest.responseText);
    
    var human = responseJson["human"];
    var bot = responseJson["bot"];
    
     var p = document.createElement('p');
        var txtNode = document.createTextNode('Turn :' + responseJson['turn']);
        p.appendChild(txtNode);
        dataDiv.appendChild(p);   
    
     var p = document.createElement('p');
        var txtNode = document.createTextNode('Phase: ' + responseJson["phase"]);
        p.appendChild(txtNode);
        dataDiv.appendChild(p);
    
    var br1 = document.createElement('br');
    dataDiv.appendChild(br1);
    
    for (var obj in human) {
        var p = document.createElement('p');
        var txtNode = document.createTextNode(obj + ':' + human[obj]);
        p.appendChild(txtNode);
        dataDiv.appendChild(p);   
    }
    
    var br2 = document.createElement('br');
    dataDiv.appendChild(br2);

    for (var obj in bot) {
        var p = document.createElement('p');
        var txtNode = document.createTextNode(obj + ':' + bot[obj]);
        p.appendChild(txtNode);
        dataDiv.appendChild(p);   
    }
    
    
    var gameGridTable = document.getElementById('game-squares');
    var pieceLocations = responseJson['pieceLocations'];

    for (var i=0; i < 8; i++) {
        for (var j=0; j < 8; j++) {

            var cell = gameGridTable.rows[i].cells[j];
            
            var p = document.createElement('p');
            p.setAttribute('style', 'color:white;font-size:20px;');
            
            if(pieceLocations[i] && pieceLocations[i][j]) {
                var rank = pieceLocations[i][j].rank;
                var color = pieceLocations[i][j].color;

                var txtNode = document.createTextNode(color + rank);

                p.appendChild(txtNode);

                cell.appendChild(p);
                
            }
            
            

        }
    }
    
    
    

}