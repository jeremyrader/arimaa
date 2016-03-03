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