var Game = {};

function init() {
    
}


<li>pieces: Array of all pieces to track current game state</li>
				<li>turn: string Black or white to signify which player has the turn</li>
				<li>evaluate : function. Evaluate whether a win/lose condition applies.</li>
				<li>pits : Array of pit locations
					["C3", "F3", "C6", "F6" ]   
				</li>
				<li>initialTiles : Array of locations that players may place their pieces during game setup</li>