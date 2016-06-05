
function Bot(color, rank) {
    Player.call(this, color, rank);
}

Bot.prototype = Object.create(Player.prototype);
Bot.prototype.constructor = Bot;

Bot.prototype.populateInitialSquares = function() {
    
    let ranks = [1,2,3,3,4,4,5,5,6,6,6,6,6,6,6,6];
    let pieces = [];

    while (ranks.length > 0) {
        let randomIndex = Math.floor((Math.random() * ranks.length - 1) + 0);  
        let rank = ranks.splice(randomIndex, 1);
        
        let piece = new Piece(this.color, rank);

        pieces.push(piece);

    }
    
    for (let i=0; i < board.cols; i++) {
        
        let piece = pieces.shift();
        piece.location = [0, i];
        board.pieces[0][i] = piece;
        
        piece = pieces.shift();
        piece.location = [1, i];
        board.pieces[1][i] = piece;
        
    }
    
    this.ready = true;
    
    board.update()
    this.passTurn();

}           

Bot.prototype.processTurn = function() {

    this.movesLeft = generateRandom(2, this.movesLeft - 1);
 
    let intervalId = setInterval(() => {
        
        let botMovablePieces = bot.getMovablePieces();
        
        let piece = getRandomFromArray(botMovablePieces);

        //get random location to move to        
        let vacantSquare = getRandomFromArray(piece.vacantSquares);

        board.movePiece(piece.location, vacantSquare);
        
        let random = generateRandom(1, 3);
        document.getElementById('knock' + random).play();

        this.movesLeft--;
        console.log(this.movesLeft)
        if(this.movesLeft < 1) {
            clearInterval(intervalId);
            game.evaluate();
            this.passTurn();
        }

    }, 1000);
}

function generateRandom(min, max) {
    return Math.floor(Math.random() * (max)) + min;
}

function getRandomFromArray(array) {
    let index = generateRandom(0, array.length - 1);
    return array[index];
}

